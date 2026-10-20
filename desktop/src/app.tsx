import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import {
  isPermissionGranted,
  requestPermission,
  sendNotification
} from '@tauri-apps/plugin-notification';
import { enable, disable, isEnabled } from '@tauri-apps/plugin-autostart';
import { AuthProvider, useAuth } from './lib/auth';
import {
  publishTweet,
  toggleBookmark,
  toggleLike,
  toggleRetweet,
  deleteTweet,
  useFeed,
  useNotifications,
  useProfile,
  useUsers
} from './lib/tweets';
import {
  checkForUpdates,
  installUpdate,
  onUpdateState,
  startUpdateWatcher,
  type UpdateState
} from './lib/updater';
import { openUrl } from './lib/platform';
import { Composer } from './components/Composer';
import { Avatar } from './components/Avatar';
import { Icon, type IconName } from './components/Icon';
import { TweetItem } from './components/TweetItem';
import type { Tweet } from './lib/types';
import './styles.css';

type View = 'home' | 'search' | 'notifications' | 'profile';

const VIEWS: { id: View; label: string; icon: IconName }[] = [
  { id: 'home', label: 'Accueil', icon: 'home' },
  { id: 'search', label: 'Découvrir', icon: 'search' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications' },
  { id: 'profile', label: 'Profil', icon: 'person' }
];

function App() {
  const { user, loading, error, signIn, signUp, signInWithGoogle, signOut } =
    useAuth();

  const [view, setView] = useState<View>('home');
  const [update, setUpdate] = useState<UpdateState>({ status: 'idle' });
  const [autostart, setAutostart] = useState(false);
  const [search, setSearch] = useState('');
  const [profileName, setProfileName] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  const { tweets, loading: feedLoading } = useFeed(Boolean(user));
  const feedAuthors = useUsers(tweets.map((tweet) => tweet.createdBy));
  const notifications = useNotifications(user?.id ?? null);

  const { profile, tweets: profileTweets } = useProfile(
    view === 'profile' ? (profileName ?? user?.username ?? null) : null
  );

  const profileAuthors = useUsers(
    profileTweets.map((tweet) => tweet.createdBy)
  );

  /* Le dernier identifiant vu : une publication plus récente déclenche
     une notification native (fenêtre en arrière-plan). */
  const lastSeen = useRef<string | null>(null);

  useEffect(() => {
    const stop = onUpdateState(setUpdate);
    const stopWatcher = startUpdateWatcher();

    void checkForUpdates();

    void isEnabled().then(setAutostart).catch(() => undefined);

    return () => {
      stop();
      stopWatcher();
    };
  }, []);

  useEffect(() => {
    if (!tweets.length) return;

    const first = tweets[0]?.id ?? null;

    if (lastSeen.current && first !== lastSeen.current) {
      const fresh = tweets[0];
      const author = fresh ? feedAuthors[fresh.createdBy] : undefined;

      void (async () => {
        if (await isPermissionGranted()) {
          sendNotification({
            title: author?.name ?? 'Nouvelle publication',
            body: (fresh?.text ?? 'Une nouvelle publication est arrivée.').slice(0, 140)
          });
        }
      })();
    }

    lastSeen.current = first;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweets[0]?.id]);

  const unread = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  );

  /* Les publications affichées dépendent de l'onglet courant. Le calcul et
     le hook qui suit doivent rester AVANT les retours anticipés : sinon le
     nombre de hooks change d'un rendu à l'autre (erreur React). */
  const visibleTweets =
    view === 'profile'
      ? profileTweets
      : view === 'search'
        ? tweets.filter((tweet) =>
            (tweet.text ?? '').toLowerCase().includes(search.toLowerCase())
          )
        : tweets;

  const visibleAuthors =
    view === 'profile' ? profileAuthors : feedAuthors;

  const toggleAutostart = async (): Promise<void> => {
    try {
      if (autostart) {
        await disable();
        setAutostart(false);
      } else {
        await enable();
        setAutostart(true);
      }
    } catch {
      /* Le démarrage automatique peut être refusé par le système. */
    }
  };

  const askNotificationPermission = async (): Promise<void> => {
    try {
      await requestPermission();
    } catch {
      /* Permission refusée : l'application fonctionne quand même. */
    }
  };

  if (loading) {
    return (
      <div className='login'>
        <p className='hint'>Chargement…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <LoginScreen
        error={error}
        onGoogle={signInWithGoogle}
        onSignIn={signIn}
        onSignUp={signUp}
      />
    );
  }

  const handleLike = (tweet: Tweet, liked: boolean): void => {
    void toggleLike(tweet, user.id, liked).catch(() => undefined);
  };

  const handleRetweet = (tweet: Tweet, retweeted: boolean): void => {
    void toggleRetweet(tweet, user.id, retweeted).catch(() => undefined);
  };

  const handleBookmark = (tweet: Tweet, bookmarked: boolean): void => {
    setBookmarks((current) => {
      const next = new Set(current);

      if (bookmarked) next.delete(tweet.id);
      else next.add(tweet.id);

      return next;
    });

    void toggleBookmark(tweet.id, user.id, bookmarked).catch(() => undefined);
  };

  const handleReply = (tweet: Tweet, text: string): void => {
    const author = feedAuthors[tweet.createdBy];

    void publishTweet(user.id, text, {
      id: tweet.id,
      username: author?.username ?? ''
    }).catch(() => undefined);
  };

  const handlePublish = (text: string): void => {
    void publishTweet(user.id, text).catch(() => undefined);
  };

  const handleDelete = (tweet: Tweet): void => {
    if (!window.confirm('Supprimer cette publication ?')) return;

    void deleteTweet(tweet.id).catch(() => undefined);
  };

  return (
    <div className='app'>
      <nav className='nav'>
        <div className='brand'>
          <img alt='' src='/logo.png' />
          <span>Inspiration</span>
        </div>

        {VIEWS.map((item) => (
          <button
            className={`nav-item ${view === item.id ? 'active' : ''}`}
            key={item.id}
            onClick={() => setView(item.id)}
            type='button'
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
            {item.id === 'notifications' && unread > 0 && (
              <span className='composer-count'>{unread}</span>
            )}
          </button>
        ))}

        <div className='nav-spacer' />

        <button
          className='nav-item'
          onClick={() => void openUrl('https://u-social.vercel.app')}
          title='Ouvrir le site web'
          type='button'
        >
          <Icon name='link' />
          <span>Version web</span>
        </button>

        <button
          className='nav-item'
          onClick={() => void signOut()}
          title='Se déconnecter'
          type='button'
        >
          <Icon name='logout' />
          <span>Déconnexion</span>
        </button>

        <button
          className='nav-user'
          onClick={() => {
            setProfileName(user.username);
            setView('profile');
          }}
          type='button'
        >
          <Avatar name={user.name} size={38} src={user.photoURL} />
          <div style='min-width:0'>
            <div className='nav-user-name'>{user.name}</div>
            <div className='nav-user-handle'>@{user.username}</div>
          </div>
        </button>
      </nav>

      <main className='center'>
        <header className='header'>
          <h1>
            {view === 'home'
              ? 'Accueil'
              : view === 'search'
                ? 'Découvrir'
                : view === 'notifications'
                  ? 'Notifications'
                  : `@${profile?.username ?? user.username}`}
          </h1>

          {update.status === 'downloading' && (
            <div className='progress' title='Téléchargement de la mise à jour'>
              <i style={`width:${update.progress ?? 0}%`} />
            </div>
          )}
        </header>

        {update.info && update.status === 'idle' && (
          <div className='update-banner'>
            <Icon name='update' />
            <span>
              La version {update.info.version} est disponible.
            </span>
            <span className='spacer' />
            <button
              className='button'
              onClick={() => void installUpdate()}
              type='button'
            >
              Installer
            </button>
            <button
              className='icon-button'
              onClick={() => setUpdate({ status: 'idle' })}
              type='button'
            >
              <Icon name='close' />
            </button>
          </div>
        )}

        {update.status === 'error' && update.error && (
          <div className='update-banner'>
            <Icon name='update' />
            <span>{update.error}</span>
            <span className='spacer' />
            <button
              className='icon-button'
              onClick={() => setUpdate({ status: 'idle' })}
              type='button'
            >
              <Icon name='close' />
            </button>
          </div>
        )}

        <div className='scroll'>
          {view === 'home' && (
            <Composer user={user} onPublish={handlePublish} />
          )}

          {view === 'notifications' ? (
            notifications.length ? (
              <div>
                {notifications.map((notification) => (
                  <div
                    className={`notice ${notification.read ? '' : 'unread'}`}
                    key={notification.id}
                  >
                    <Icon name='notifications' />
                    <div>
                      <p>{notification.body ?? 'Nouvelle notification'}</p>
                      <p className='trend-meta'>
                        {notification.createdAt?.toDate
                          ? notification.createdAt
                              .toDate()
                              .toLocaleString('fr-FR')
                          : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='empty'>
                <h2>Aucune notification</h2>
                <p>Les mentions et les réponses apparaîtront ici.</p>
              </div>
            )
          ) : visibleTweets.length ? (
            <div className='feed'>
              {visibleTweets.map((tweet) => (
                <TweetItem
                  author={visibleAuthors[tweet.createdBy]}
                  bookmarked={bookmarks.has(tweet.id)}
                  currentUserId={user.id}
                  key={tweet.id}
                  onBookmark={handleBookmark}
                  onDelete={handleDelete}
                  onLike={handleLike}
                  onOpenProfile={(username) => {
                    setProfileName(username);
                    setView('profile');
                  }}
                  onReply={handleReply}
                  onRetweet={handleRetweet}
                  tweet={tweet}
                />
              ))}
            </div>
          ) : (
            <div className='empty'>
              <h2>
                {feedLoading ? 'Chargement…' : 'Rien à afficher pour le moment'}
              </h2>
              <p>Revenez plus tard, ou publiez quelque chose.</p>
            </div>
          )}
        </div>
      </main>

      <aside className='aside'>
        <div className='search'>
          <input
            onInput={(event) =>
              setSearch((event.target as HTMLInputElement).value)
            }
            placeholder='Rechercher dans le fil'
            type='search'
            value={search}
          />
        </div>

        <div className='card'>
          <h2>À propos</h2>
          <div className='about'>
            <p>
              Inspiration est un réseau social. Cette application de bureau
              est légère et se met à jour toute seule.
            </p>
            <p style='margin-top:8px'>
              <a
                href='https://u-social.vercel.app'
                onClick={(event) => {
                  event.preventDefault();
                  void openUrl('https://u-social.vercel.app');
                }}
              >
                Ouvrir la version web
              </a>
            </p>
          </div>
        </div>

        <div className='card'>
          <h2>Application</h2>
          <div className='about' style='display:flex;flex-direction:column;gap:10px'>
            <label style='display:flex;align-items:center;gap:8px'>
              <input
                checked={autostart}
                onChange={() => void toggleAutostart()}
                type='checkbox'
              />
              Démarrer avec Windows
            </label>

            <label style='display:flex;align-items:center;gap:8px'>
              <input
                defaultChecked
                onChange={() => void askNotificationPermission()}
                type='checkbox'
              />
              Notifications natives
            </label>

            <button
              className='button ghost'
              onClick={() => void checkForUpdates(true)}
              type='button'
            >
              <Icon name='refresh' />
              Rechercher des mises à jour
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

type LoginScreenProps = {
  error: string | null;
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (
    email: string,
    password: string,
    name: string,
    username: string
  ) => Promise<void>;
  onGoogle: () => Promise<void>;
};

function LoginScreen({
  error,
  onSignIn,
  onSignUp,
  onGoogle
}: LoginScreenProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event: Event): Promise<void> => {
    event.preventDefault();

    if (busy) return;

    setBusy(true);

    try {
      if (mode === 'signin') await onSignIn(email, password);
      else await onSignUp(email, password, name, username);
    } catch {
      /* Le message d'erreur est affiché par le contexte. */
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className='login'>
      <form className='login-card' onSubmit={(event) => void submit(event)}>
        <div className='brand' style='padding:0'>
          <img alt='' src='/logo.png' />
          <span>Inspiration</span>
        </div>

        <h1>{mode === 'signin' ? 'Se connecter' : 'Créer un compte'}</h1>

        {error && <p className='error'>{error}</p>}

        {mode === 'signup' && (
          <>
            <div className='field'>
              <label for='name'>Nom</label>
              <input
                id='name'
                onInput={(event) =>
                  setName((event.target as HTMLInputElement).value)
                }
                required
                value={name}
              />
            </div>

            <div className='field'>
              <label for='username'>Pseudo</label>
              <input
                id='username'
                onInput={(event) =>
                  setUsername((event.target as HTMLInputElement).value)
                }
                required
                value={username}
              />
            </div>
          </>
        )}

        <div className='field'>
          <label for='email'>Adresse e-mail</label>
          <input
            id='email'
            onInput={(event) =>
              setEmail((event.target as HTMLInputElement).value)
            }
            required
            type='email'
            value={email}
          />
        </div>

        <div className='field'>
          <label for='password'>Mot de passe</label>
          <input
            id='password'
            onInput={(event) =>
              setPassword((event.target as HTMLInputElement).value)
            }
            required
            type='password'
            value={password}
          />
        </div>

        <button className='button' disabled={busy} type='submit'>
          {busy ? 'Un instant…' : mode === 'signin' ? 'Se connecter' : 'Créer le compte'}
        </button>

        <button
          className='button ghost'
          onClick={() => void onGoogle()}
          type='button'
        >
          Continuer avec Google
        </button>

        <p className='hint'>
          {mode === 'signin' ? (
            <>
              Pas encore de compte ?{' '}
              <span
                className='link'
                onClick={() => setMode('signup')}
              >
                Créer un compte
              </span>
            </>
          ) : (
            <>
              Déjà un compte ?{' '}
              <span
                className='link'
                onClick={() => setMode('signin')}
              >
                Se connecter
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
