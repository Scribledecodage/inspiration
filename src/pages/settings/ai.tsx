import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useAuth } from '@lib/context/auth-context';
import { saveAiSettings } from '@lib/firebase/users';
import { withAiDefaults } from '@lib/ai';
import { ContactLink } from '@components/common/contact-link';
import { AiSettingsCard } from '@components/settings/ai-settings-card';
import {
  SettingsCard,
  SettingsShell,
  settingsPageLayout
} from '@components/settings/settings-shell';
import type { AiSettings } from '@lib/types/ai';

export default function SettingsAiPage(): JSX.Element {
  const { user } = useAuth();

  const [settings, setSettings] = useState<AiSettings>(() =>
    withAiDefaults(user?.aiSettings)
  );
  const [saving, setSaving] = useState(false);

  /* La clé est souvent copiée avec son préfixe « Bearer » : on le retire
     pour ne pas stocker une clé inutilisable. */
  const clean = (next: AiSettings): AiSettings => ({
    ...next,
    apiKey: next.apiKey.trim().replace(/^bearer\s+/i, '')
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedRef = useRef<string>(JSON.stringify(withAiDefaults(user?.aiSettings)));

  const persist = (next: AiSettings, immediate: boolean): void => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const run = async (): Promise<void> => {
      if (!user) return;

      setSaving(true);

      try {
        await saveAiSettings(user.id, clean(next));

        savedRef.current = JSON.stringify(clean(next));
      } catch {
        toast.error('Impossible d’enregistrer les réglages.');
      } finally {
        setSaving(false);
      }
    };

    if (immediate) void run();
    else timerRef.current = setTimeout(() => void run(), 600);
  };

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  /* Le profil est écouté en direct : un réglage modifié ailleurs (autre
     onglet, autre appareil) s'applique ici aussi. */
  useEffect(() => {
    const incoming = JSON.stringify(withAiDefaults(user?.aiSettings));

    if (incoming === savedRef.current) return;

    setSettings(withAiDefaults(user?.aiSettings));
    savedRef.current = incoming;
  }, [user?.aiSettings]);

  /* Un interrupteur s'applique tout de suite ; un texte est enregistré
     après un court délai, pour ne pas écrire à chaque frappe. */
  const handleChange = (next: AiSettings): void => {
    setSettings(next);

    const toggled =
      next.enabled !== settings.enabled ||
      next.assistantEnabled !== settings.assistantEnabled ||
      next.translateEnabled !== settings.translateEnabled;

    persist(next, toggled);
  };

  return (
    <SettingsShell
      description='Assistant dans la messagerie, traduction des messages et reformulations.'
      seoTitle='Intelligence artificielle / Réglages / Inspiration'
      title='Intelligence artificielle'
    >
      <SettingsCard
        description='Ce que l’assistant peut faire, et ce que vous gardez sous votre contrôle.'
        iconName='auto_awesome_mosaic'
        title='Fonctions d’assistance'
      >
        <AiSettingsCard
          onChange={handleChange}
          saving={saving}
          settings={settings}
        />
      </SettingsCard>

      <SettingsCard
        description='L’assistant est à portée de main dans votre messagerie.'
        iconName='chat_bubble'
        title='Discuter avec l’assistant'
      >
        <div className='flex flex-col gap-3'>
          <p className='text-sm leading-6 text-light-secondary dark:text-dark-secondary'>
            Une conversation dédiée à l’assistant est disponible dans votre
            messagerie, en haut de la liste. Vous y posez vos questions, vous
            lui demandez de reformuler un texte, et il
            répond dans la langue que vous avez choisie.
          </p>
          <Link href='/messages'>
            <a className='w-fit rounded-full bg-main-accent px-4 py-2 text-sm font-bold text-white transition hover:brightness-90'>
              Ouvrir la messagerie
            </a>
          </Link>
        </div>
      </SettingsCard>

      <SettingsCard
        description='Ce qui est envoyé à un modèle, et ce que vous pouvez refuser.'
        iconName='lock'
        title='Vos données'
      >
        <article className='flex flex-col gap-3 text-sm font-normal leading-6 text-light-secondary dark:text-dark-secondary'>
          <p>
            Seuls les contenus que vous choisissez de soumettre sont traités :
            un message que vous demandez à traduire, un texte à reformuler, ou
            votre conversation avec l’assistant. Rien n’est envoyé en arrière
            plan, et aucune publication n’est publiée, modifiée ou supprimée
            sans une action explicite de votre part.
          </p>
          <p>
            Le traitement est réalisé par le fournisseur d’intelligence
            artificielle que vous avez choisi. Vos contenus privés ne servent
            pas à entraîner des modèles et ne sont ni vendus ni cédés à des
            fins publicitaires. Vous pouvez à tout moment couper l’ensemble
            des fonctions, changer de fournisseur ou supprimer votre clé.
          </p>
          <p>
            Un système d’intelligence artificielle peut se tromper : vérifiez
            toujours ses réponses avant de les utiliser. Pour toute question,
            utilisez le contact ci-dessous : <ContactLink />
          </p>
        </article>
      </SettingsCard>
    </SettingsShell>
  );
}

SettingsAiPage.getLayout = settingsPageLayout;
