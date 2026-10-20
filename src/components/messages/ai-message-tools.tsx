import { useState } from 'react';
import cn from 'clsx';
import { toast } from 'react-hot-toast';
import { summarizeWithAi, translateWithAi } from '@lib/ai';
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

type Tool = 'translate' | 'summarize';

type Result = {
  tool: Tool;
  text: string;
};

/**
 * Actions d'intelligence artificielle sur un message : traduction et résumé.
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
  const [busy, setBusy] = useState<Tool | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  if (!settings.enabled) return null;
  if (!message.text?.trim()) return null;
  if (message.fromAI) return null;
  if (message.id.startsWith('pending-')) return null;

  const hasTranslation = results.some((result) => result.tool === 'translate');
  const hasSummary = results.some((result) => result.tool === 'summarize');

  const run = async (tool: Tool): Promise<void> => {
    setBusy(tool);

    try {
      const text =
        tool === 'translate'
          ? await translateWithAi(message.text as string, settings)
          : await summarizeWithAi(message.text as string, settings);

      setResults((current) => [
        ...current.filter((result) => result.tool !== tool),
        { tool, text }
      ]);
    } catch (error) {
      toast.error(
        (error as Error)?.message ??
          'Impossible de contacting le service d’intelligence artificielle.'
      );
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <div
        className={cn(
          'mt-1 flex items-center gap-2 text-xs',
          mine ? 'justify-end' : 'justify-start'
        )}
      >
        {settings.translateEnabled && !hasTranslation && (
          <button
            className='flex items-center gap-1 rounded-full px-1.5 py-0.5 font-semibold text-light-secondary transition hover:bg-light-primary/5 hover:text-main-accent disabled:opacity-50 dark:text-dark-secondary dark:hover:bg-dark-primary/5'
            disabled={busy !== null}
            onClick={(): void => void run('translate')}
            type='button'
          >
            {busy === 'translate' ? (
              <CustomIcon className='h-3.5 w-3.5' iconName='SpinnerIcon' />
            ) : (
              <MaterialIcon className='h-3.5 w-3.5' iconName='translate' />
            )}
            Traduire
          </button>
        )}
        {!hasSummary && (
          <button
            className='flex items-center gap-1 rounded-full px-1.5 py-0.5 font-semibold text-light-secondary transition hover:bg-light-primary/5 hover:text-main-accent disabled:opacity-50 dark:text-dark-secondary dark:hover:bg-dark-primary/5'
            disabled={busy !== null}
            onClick={(): void => void run('summarize')}
            type='button'
          >
            {busy === 'summarize' ? (
              <CustomIcon className='h-3.5 w-3.5' iconName='SpinnerIcon' />
            ) : (
              <MaterialIcon
                className='h-3.5 w-3.5'
                iconName='auto_awesome_mosaic'
              />
            )}
            Résumer
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div
          className={cn(
            'mt-1 flex w-full flex-col gap-1.5',
            mine ? 'items-end' : 'items-start'
          )}
        >
          {results.map((result) => (
            <div
              className='max-w-[85%] rounded-xl border border-light-border bg-main-search-background/50 px-3 py-2 text-sm leading-5 text-light-primary dark:border-dark-border dark:bg-dark-primary/[0.06] dark:text-dark-primary'
              key={result.tool}
            >
              <p className='mb-0.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary'>
                <MaterialIcon
                  className='h-3.5 w-3.5'
                  iconName={
                    result.tool === 'translate'
                      ? 'translate'
                      : 'auto_awesome_mosaic'
                  }
                />
                {result.tool === 'translate' ? 'Traduction' : 'Résumé'}
              </p>
              <p className='whitespace-pre-wrap break-words'>{result.text}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
