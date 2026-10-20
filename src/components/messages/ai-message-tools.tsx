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
};

/**
 * Traduction d'un message par l'intelligence artificielle.
 *
 * Le résultat est affiché sous la bulle. Rien n'est écrit dans la
 * messagerie : la traduction est une aide de lecture, elle ne modifie pas le
 * message d'origine.
 */
export function AiMessageTools({
  message,
  settings,
  mine
}: AiMessageToolsProps): JSX.Element | null {
  const [busy, setBusy] = useState(false);
  const [translation, setTranslation] = useState<string | null>(null);

  if (!settings.enabled) return null;
  if (!settings.translateEnabled) return null;
  if (!message.text?.trim()) return null;
  if (message.fromAI) return null;
  if (message.id.startsWith('pending-')) return null;

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
      {!translation && (
        <div
          className={cn(
            'mt-1 flex items-center gap-2 text-xs',
            mine ? 'justify-end' : 'justify-start'
          )}
        >
          <button
            className='flex items-center gap-1 rounded-full px-1.5 py-0.5 font-semibold text-light-secondary transition hover:bg-light-primary/5 hover:text-main-accent disabled:opacity-50 dark:text-dark-secondary dark:hover:bg-dark-primary/5'
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
        </div>
      )}

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
