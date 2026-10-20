import { useEffect, useMemo, useState } from 'react';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { chatWithAi } from '@lib/ai';
import { AI_LANGUAGES } from '@lib/types/ai';
import { MaterialIcon } from '@components/ui/material-icon';
import { CustomIcon } from '@components/ui/custom-icon';
import { Toggle } from '@components/ui/toggle';
import { SearchSelect } from '@components/ui/search-select';
import type { AiModel, AiSettings } from '@lib/types/ai';
import type { ReactNode } from 'react';

type AiSettingsCardProps = {
  settings: AiSettings;
  onChange: (settings: AiSettings) => void;
  onSave: () => Promise<void>;
  saving: boolean;
};

/* Un modèle est « nouveau » pendant un mois après sa sortie. */
const NEW_MODEL_DAYS = 30;

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

/* Prix affiché : par million de jetons. */
function formatPrice(price: number): string {
  if (!price) return 'Gratuit';

  const perMillion = price * 1_000_000;

  if (perMillion < 0.01) return '< 0,01 $/M';

  return `${perMillion.toLocaleString('fr-FR', {
    maximumFractionDigits: 2
  })} $/M`;
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
  const [models, setModels] = useState<AiModel[]>([]);
  const [modelsLoading, setModelsLoading] = useState(true);
  const [modelsError, setModelsError] = useState<string | null>(null);

  const update = (patch: Partial<AiSettings>): void => {
    onChange({ ...settings, ...patch });
  };

  /* Les modèles viennent d'OpenRouter : la liste est à jour, et les prix
     aussi. */
  useEffect(() => {
    let cancelled = false;

    const load = async (): Promise<void> => {
      setModelsLoading(true);

      try {
        const response = await fetch('/api/ai/models');
        const payload = (await response.json()) as {
          models?: AiModel[];
          error?: string;
        };

        if (cancelled) return;

        if (!response.ok)
          throw new Error(payload.error ?? 'Liste des modèles indisponible.');

        setModels(payload.models ?? []);
        setModelsError(null);
      } catch (error) {
        if (cancelled) return;

        setModelsError(
          (error as Error)?.message ??
            'Impossible de joindre OpenRouter pour la liste des modèles.'
        );
      } finally {
        if (!cancelled) setModelsLoading(false);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  /* Les gratuits d'abord, puis les plus récents. */
  const modelOptions = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);

    return [...models]
      .sort((a, b) => {
        if (a.free !== b.free) return a.free ? -1 : 1;
        return b.created - a.created;
      })
      .map((model) => {
        const isNew = now - model.created < NEW_MODEL_DAYS * 24 * 3600;

        return {
          value: model.id,
          label: model.name,
          free: model.free,
          badge: isNew ? 'Nouveau' : undefined,
          hint: model.free ? 'Gratuit' : formatPrice(model.promptPrice)
        };
      });
  }, [models]);

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

          <Row
            description='Modèles proposés par OpenRouter : les gratuits d’abord, puis les plus récents.'
            title='Modèle'
          >
            <SearchSelect
              allowCustom
              emptyLabel={
                modelsError ?? 'Aucun modèle trouvé. Tapez un identifiant.'
              }
              loading={modelsLoading}
              onChange={(model): void => update({ model })}
              options={modelOptions}
              placeholder='Choisir un modèle'
              searchPlaceholder='Rechercher un modèle…'
              value={settings.model}
            />
          </Row>
        </div>
      </div>

      {modelsError && (
        <p className='flex items-start gap-2 rounded-lg border border-light-border bg-main-search-background/30 px-3 py-2 text-xs leading-5 text-light-secondary dark:border-dark-border dark:text-dark-secondary'>
          <MaterialIcon className='mt-0.5 h-4 w-4 shrink-0' iconName='info' />
          {modelsError} Vous pouvez tout de même saisir un identifiant de modèle
          à la main.
        </p>
      )}

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
          sur votre compte et n’est jamais transmise à un tiers.
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
