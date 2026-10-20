import { useState } from 'react';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { chatWithAi } from '@lib/ai';
import { AI_LANGUAGES, AI_MODELS } from '@lib/types/ai';
import { MaterialIcon } from '@components/ui/material-icon';
import { CustomIcon } from '@components/ui/custom-icon';
import { Toggle } from '@components/ui/toggle';
import type { AiSettings } from '@lib/types/ai';
import type { ReactNode } from 'react';

type AiSettingsCardProps = {
  settings: AiSettings;
  onChange: (settings: AiSettings) => void;
  onSave: () => Promise<void>;
  saving: boolean;
};

function Row({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <div className='flex items-center justify-between gap-4 px-4 py-3.5'>
      <div className='min-w-0'>
        <p className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
          {title}
        </p>
        {description && (
          <p className='mt-0.5 text-xs leading-5 text-light-secondary dark:text-dark-secondary'>
            {description}
          </p>
        )}
      </div>
      <div className='shrink-0'>{children}</div>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  label
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  label: string;
}): JSX.Element {
  return (
    <select
      aria-label={label}
      className='rounded-lg border border-light-border bg-main-background px-3 py-1.5 text-sm font-semibold text-light-primary outline-none transition focus-visible:ring-2 focus-visible:ring-main-accent/80 dark:border-dark-border dark:bg-dark-primary'
      onChange={(event): void => onChange(event.target.value)}
      value={value}
    >
      {options.map((option) => (
        <option key={option || 'default'} value={option}>
          {option || 'Par défaut'}
        </option>
      ))}
    </select>
  );
}

/**
 * Réglages des fonctions d'intelligence artificielle.
 *
 * Tout est rangé dans le profil de la personne : elle garde la main sur ce
 * qui est envoyé à un modèle, et peut tout couper d'un geste.
 */
export function AiSettingsCard({
  settings,
  onChange,
  onSave,
  saving
}: AiSettingsCardProps): JSX.Element {
  const [testing, setTesting] = useState(false);

  const update = (patch: Partial<AiSettings>): void => {
    onChange({ ...settings, ...patch });
  };

  const handleTest = async (): Promise<void> => {
    setTesting(true);

    try {
      const reply = await chatWithAi(
        [{ role: 'user', content: 'Dis bonjour en une phrase.' }],
        settings
      );

      toast.success(reply.slice(0, 120));
    } catch (error) {
      toast.error(
        (error as Error)?.message ??
          'Impossible de contacter le service d’intelligence artificielle.'
      );
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='overflow-hidden rounded-xl border border-light-border bg-main-background dark:border-dark-border'>
        <div className='divide-y divide-light-border dark:divide-dark-border'>
          <Row
            description='Coupe d’un geste l’assistant, la traduction et les résumés.'
            title='Activer l’intelligence artificielle'
          >
            <Toggle
              checked={settings.enabled}
              label='Activer l’intelligence artificielle'
              onChange={(enabled): void => update({ enabled })}
            />
          </Row>

          <Row
            description='L’assistant répond dans la messagerie, dans une conversation dédiée.'
            title='Assistant dans la messagerie'
          >
            <Toggle
              checked={settings.assistantEnabled}
              disabled={!settings.enabled}
              label='Activer l’assistant'
              onChange={(assistantEnabled): void => update({ assistantEnabled })}
            />
          </Row>

          <Row
            description='Un bouton « Traduire » apparaît sous les messages reçus.'
            title='Traduction des messages'
          >
            <Toggle
              checked={settings.translateEnabled}
              disabled={!settings.enabled}
              label='Activer la traduction'
              onChange={(translateEnabled): void => update({ translateEnabled })}
            />
          </Row>
        </div>
      </div>

      <div className='overflow-hidden rounded-xl border border-light-border bg-main-background dark:border-dark-border'>
        <div className='divide-y divide-light-border dark:divide-dark-border'>
          <Row
            description='Langue dans laquelle l’assistant répond.'
            title='Langue de l’assistant'
          >
            <Select
              label='Langue de l’assistant'
              onChange={(language): void => update({ language })}
              options={AI_LANGUAGES}
              value={settings.language}
            />
          </Row>

          <Row
            description='Langue dans laquelle les messages sont traduits.'
            title='Langue de traduction'
          >
            <Select
              label='Langue de traduction'
              onChange={(translateLanguage): void => update({ translateLanguage })}
              options={AI_LANGUAGES}
              value={settings.translateLanguage}
            />
          </Row>

          <Row
            description='Laissez vide pour utiliser le modèle par défaut du serveur.'
            title='Modèle'
          >
            <Select
              label='Modèle'
              onChange={(model): void => update({ model })}
              options={AI_MODELS}
              value={settings.model}
            />
          </Row>
        </div>
      </div>

      <div className='flex flex-col gap-2 rounded-xl border border-light-border bg-main-background p-4 dark:border-dark-border'>
        <label
          className='text-sm font-semibold text-light-primary dark:text-dark-primary'
          htmlFor='ai-system-prompt'
        >
          Consigne donnée à l’assistant
        </label>
        <p className='text-xs leading-5 text-light-secondary dark:text-dark-secondary'>
          Le ton, la longueur des réponses, les sujets à éviter… Cette consigne
          est envoyée au modèle à chaque échange.
        </p>
        <textarea
          className='min-h-[5rem] w-full resize-y rounded-lg border border-light-border bg-main-search-background/40 px-3 py-2 text-sm leading-6 text-light-primary outline-none transition focus-visible:ring-2 focus-visible:ring-main-accent/80 dark:border-dark-border dark:bg-dark-primary'
          id='ai-system-prompt'
          onChange={(event): void => update({ systemPrompt: event.target.value })}
          placeholder='Ex. : réponds brièvement, en français, sans jargon.'
          value={settings.systemPrompt}
        />
      </div>

      <div className='flex flex-col gap-2 rounded-xl border border-light-border bg-main-background p-4 dark:border-dark-border'>
        <label
          className='text-sm font-semibold text-light-primary dark:text-dark-primary'
          htmlFor='ai-api-key'
        >
          Clé du fournisseur
        </label>
        <p className='text-xs leading-5 text-light-secondary dark:text-dark-secondary'>
          Si le site n’a pas de clé configurée, indiquez la vôtre : elle reste
          sur votre compte et n’est jamais transmise à un tiers.
        </p>
        <input
          autoComplete='off'
          className='w-full rounded-lg border border-light-border bg-main-search-background/40 px-3 py-2 text-sm text-light-primary outline-none transition focus-visible:ring-2 focus-visible:ring-main-accent/80 dark:border-dark-border dark:bg-dark-primary'
          id='ai-api-key'
          onChange={(event): void => update({ apiKey: event.target.value })}
          placeholder='sk-…'
          type='password'
          value={settings.apiKey}
        />
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        <button
          className='flex items-center gap-2 rounded-full bg-main-accent px-4 py-2 text-sm font-bold text-white transition hover:brightness-90 disabled:opacity-60'
          disabled={saving || testing}
          onClick={(): void => void onSave()}
          type='button'
        >
          {saving && <CustomIcon className='h-4 w-4' iconName='SpinnerIcon' />}
          Enregistrer
        </button>
        <button
          className={cn(
            'flex items-center gap-2 rounded-full border border-light-border px-4 py-2 text-sm font-bold transition',
            'text-light-primary hover:bg-light-primary/5 disabled:opacity-60',
            'dark:border-dark-border dark:text-dark-primary dark:hover:bg-dark-primary/5'
          )}
          disabled={saving || testing || !settings.enabled}
          onClick={(): void => void handleTest()}
          type='button'
        >
          {testing ? (
            <CustomIcon className='h-4 w-4' iconName='SpinnerIcon' />
          ) : (
            <MaterialIcon className='h-4 w-4' iconName='bolt' />
          )}
          Tester le modèle
        </button>
      </div>
    </div>
  );
}
