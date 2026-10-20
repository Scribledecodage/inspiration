/*
 * Inspecte la fenêtre de l'application de bureau.
 *
 * Le WebView2 est lancé avec le port de débogage ouvert : on peut donc
 * interroger la page (comme le ferait la console des outils de
 * développement) pour trouver les éléments mal dimensionnés.
 *
 * Usage : node scripts/inspect.mjs
 */

const list = await fetch('http://127.0.0.1:9222/json').then((r) => r.json());

const page = list.find(
  (target) => target.type === 'page' && target.url.includes('tauri')
);

if (!page) {
  console.error('Aucune page trouvee.');
  process.exit(1);
}

console.log('Page :', page.url);

const socket = new WebSocket(page.webSocketDebuggerUrl);

const send = (id, method, params) =>
  socket.send(JSON.stringify({ id, method, params }));

const evaluate = (expression) =>
  new Promise((resolve) => {
    const handler = (event) => {
      const message = JSON.parse(event.data);

      if (message.id === id && message.result) {
        socket.removeEventListener('message', handler);
        resolve(message.result.result.value);
      }
    };

    socket.addEventListener('message', handler);
    send(id, 'Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
  });

socket.addEventListener('open', async () => {
  let id = 1;

  // Les éléments trop grands (icônes sans taille, images géantes…).
  const tooBig = await evaluate(`
    (() => {
      const out = [];
      document.querySelectorAll('*').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 90 || r.height > 90) {
          const style = getComputedStyle(el);
          if (el.tagName === 'svg' || el.tagName === 'IMG' || el.tagName === 'VIDEO') {
            out.push({
              tag: el.tagName,
              cls: (el.getAttribute('class') || '').slice(0, 90),
              w: Math.round(r.width),
              h: Math.round(r.height),
              src: (el.getAttribute('src') || '').slice(0, 120),
              width: el.getAttribute('width'),
              height: el.getAttribute('height')
            });
          }
        }
      });
      return out.slice(0, 25);
    })()
  `);

  console.log('\n=== Elements trop grands ===');
  console.log(JSON.stringify(tooBig, null, 2));

  // Les images qui n'ont pas été chargées.
  const broken = await evaluate(`
    (() => {
      const out = [];
      document.querySelectorAll('img').forEach((img) => {
        if (!img.complete || img.naturalWidth === 0) {
          out.push({
            cls: (img.getAttribute('class') || '').slice(0, 60),
            src: (img.getAttribute('src') || '').slice(0, 140),
            loading: img.getAttribute('loading'),
            opacity: getComputedStyle(img).opacity
          });
        }
      });
      return out.slice(0, 20);
    })()
  `);

  console.log('\n=== Images non chargees ===');
  console.log(JSON.stringify(broken, null, 2));

  socket.close();
  process.exit(0);
});

socket.addEventListener('error', (error) => {
  console.error('Erreur du socket :', error.message ?? error);
  process.exit(1);
});
