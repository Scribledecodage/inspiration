import { useState } from 'react';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { translateWithAi } from '@lib/ai';
import { MaterialIcon } from '@components/ui/material-icon';
import { CustomIcon } from '@components/ui/custom-icon';
import type { AiSettings } from '@lib/types/ai';
import type { ChatMessage } from '@lib/types/message';

type AiMessageToolsProps = {
  message: ChatMessage;
  settings: AiSettings;
  /** Le message a-t-il été écrit par la personne qui regarde ? */
  mine: boolean;
  /**
   * Heure affichée à côté des actions. Quand elle est là, elle remplace
   * celle qui est posée sous la bulle : les deux se chevauchaient.
   */
  time?: string;
};

/**
 * Le message a-t-il des actions d'assistance ?
 *
 * La réponse sert aussi à savoir s'il faut poser l'heure sous la bulle ou
 * sur la ligne des actions (les deux ne peuvent pas être au même endroit).
 */
export function hasAiActions(
  message: ChatMessage,
  settings: AiSettings
): boolean {
  if (message.id.startsWith('pending-')) return false;

  if (message.fromAI) return Boolean(message.text?.trim());

  return (
    settings.enabled &&
    settings.translateEnabled &&
    Boolean(message.text?.trim())
  );
}

/**
 * Actions d'assistance sur un message : traduction et copie.
 *
 * Elles sont posées sur la même ligne que l'heure, juste sous la bulle. La
 * traduction s'affiche ensuite sous cette ligne ; elle ne modifie jamais le
 * message d'origine.
 */
export function AiMessageTools({
  message,
  settings,
  mine,
  time
}: AiMessageToolsProps): JSX.Element | null {
  const [busy, setBusy] = useState(false);
  const [translation, setTranslation] = useState<string | null>(null);

  const isAi = Boolean(message.fromAI);

  const canTranslate =
    !isAi &&
    settings.enabled &&
    settings.translateEnabled &&
    Boolean(message.text?.trim());

  const canCopy = isAi && Boolean(message.text?.trim());

  if (!canTranslate && !canCopy) return null;

  const run = async (): Promise<void> => {
    setBusy(true);

    try {
      setTranslation(await translateWithAi(message.text as string, settings));
    } catch (error) {
      toast.error(
        (error as Error)?.message ??
          'Impossible de contacter le service d’intelligence artificielle.'
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          'mt-1 flex items-center gap-3 px-1 text-[11px] text-light-secondary dark:text-dark-secondary',
          mine ? 'justify-end' : 'justify-start'
        )}
      >
        {time && <span className='shrink-0 tabular-nums'>{time}</span>}

        {canTranslate && (
          <button
            className='flex items-center gap-1 rounded-full px-1.5 py-0.5 font-semibold transition hover:bg-light-primary/5 hover:text-main-accent disabled:opacity-50 dark:hover:bg-dark-primary/5'
            disabled={busy}
            onClick={(): void => void run()}
            type='button'
          >
            {busy ? (
              <CustomIcon className='h-3.5 w-3.5' iconName='SpinnerIcon' />
            ) : (
              <MaterialIcon className='h-3.5 w-3.5' iconName='translate' />
            )}
            Traduire
          </button>
        )}

        {canCopy && (
          <button
            className='flex items-center gap-1 rounded-full px-1.5 py-0.5 font-semibold transition hover:bg-light-primary/5 hover:text-main-accent dark:hover:bg-dark-primary/5'
            onClick={(): void => {
              void navigator.clipboard
                ?.writeText(message.text as string)
                .then(() => toast.success('Réponse copiée.'))
                .catch(() => toast.error('Impossible de copier la réponse.'));
            }}
            type='button'
          >
            <MaterialIcon className='h-3.5 w-3.5' iconName='content_copy' />
            Copier
          </button>
        )}
      </div>

      {translation && (
        <div
          className={cn(
            'mt-1 flex w-full flex-col gap-1.5',
            mine ? 'items-end' : 'items-start'
          )}
        >
          <div className='max-w-[85%] rounded-xl border border-light-border bg-main-search-background/50 px-3 py-2 text-sm leading-5 text-light-primary dark:border-dark-border dark:bg-dark-primary/[0.06] dark:text-dark-primary'>
            <p className='mb-0.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary'>
              <MaterialIcon className='h-3.5 w-3.5' iconName='translate' />
              Traduction
            </p>
            <p className='whitespace-pre-wrap break-words'>{translation}</p>
          </div>
        </div>
      )}
    </>
  );
}
