import { useMemo, useState } from 'react';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { chatWithAi } from '@lib/ai';
import { AI_LANGUAGES } from '@lib/types/ai';
import { MaterialIcon } from '@components/ui/material-icon';
import { CustomIcon } from '@components/ui/custom-icon';
import { Toggle } from '@components/ui/toggle';
import { SearchSelect } from '@components/ui/search-select';
import type { AiSettings } from '@lib/types/ai';
import type { ReactNode } from 'react';

type AiSettingsCardProps = {
  settings: AiSettings;
  /** Chaque changement est enregistré automatiquement par la page. */
  onChange: (settings: AiSettings) => void;
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
    <div className='flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between'>
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
      <div className='shrink-0 sm:w-64'>{children}</div>
    </div>
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
  saving
}: AiSettingsCardProps): JSX.Element {
  const [testing, setTesting] = useState(false);

  const update = (patch: Partial<AiSettings>): void => {
    onChange({ ...settings, ...patch });
  };

  const languageOptions = useMemo(
    () =>
      AI_LANGUAGES.map((language) => ({ value: language, label: language })),
    []
  );

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
            description='Coupe d’un geste l’assistant et la traduction.'
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
              onChange={(assistantEnabled): void =>
                update({ assistantEnabled })
              }
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
              onChange={(translateEnabled): void =>
                update({ translateEnabled })
              }
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
            <SearchSelect
              onChange={(language): void => update({ language })}
              options={languageOptions}
              placeholder='Choisir une langue'
              searchPlaceholder='Rechercher une langue…'
              value={settings.language}
            />
          </Row>

          <Row
            description='Langue dans laquelle les messages sont traduits.'
            title='Langue de traduction'
          >
            <SearchSelect
              onChange={(translateLanguage): void =>
                update({ translateLanguage })
              }
              options={languageOptions}
              placeholder='Choisir une langue'
              searchPlaceholder='Rechercher une langue…'
              value={settings.translateLanguage}
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
          className='min-h-[5rem] w-full resize-y rounded-lg border border-light-line-reply bg-transparent px-3 py-2 text-sm leading-6 text-light-primary outline-none transition focus:border-main-accent focus:ring-2 focus:ring-main-accent/20 dark:border-dark-line-reply dark:text-dark-primary'
          id='ai-system-prompt'
          onChange={(event): void =>
            update({ systemPrompt: event.target.value })
          }
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
          sur votre compte et n’est jamais transmise à un tiers. Le préfixe{' '}
          <code className='rounded bg-main-search-background px-1 py-0.5 text-[10px]'>
            Bearer
          </code>{' '}
          est retiré automatiquement.
        </p>
        <input
          autoComplete='off'
          className='w-full rounded-lg border border-light-line-reply bg-transparent px-3 py-2 text-sm text-light-primary outline-none transition focus:border-main-accent focus:ring-2 focus:ring-main-accent/20 dark:border-dark-line-reply dark:text-dark-primary'
          id='ai-api-key'
          onChange={(event): void => update({ apiKey: event.target.value })}
          placeholder='sk-or-v1-…'
          type='password'
          value={settings.apiKey}
        />
      </div>

      <div className='flex flex-wrap items-center gap-3'>
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

        {/* Tout est enregistré tout seul : l'indicateur rassure, sans
            obliger à cliquer sur « Enregistrer ». */}
        <span className='flex items-center gap-1.5 text-xs text-light-secondary dark:text-dark-secondary'>
          {saving ? (
            <>
              <CustomIcon className='h-3.5 w-3.5' iconName='SpinnerIcon' />
              Enregistrement…
            </>
          ) : (
            <>
              <MaterialIcon className='h-3.5 w-3.5' iconName='check_circle' />
              Enregistré — les changements s’appliquent immédiatement
            </>
          )}
        </span>
      </div>
    </div>
  );
}
