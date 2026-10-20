import cn from 'clsx';
import { MaterialIcon } from '@components/ui/material-icon';
import { AiAvatar } from '@components/messages/ai-avatar';
import { UserAvatar } from '@components/user/user-avatar';
import type { MentionSuggestion } from '@lib/hooks/useMentionSuggestions';

type MentionSuggestionsProps = {
  suggestions: MentionSuggestion[];
  /** Suggestion sélectionnée au clavier. */
  activeIndex: number;
  onSelect: (suggestion: MentionSuggestion) => void;
  className?: string;
};

/**
 * La liste des personnes que l'on peut mentionner.
 *
 * Elle s'ouvre sous la zone de saisie, comme une complétion : le clavier
 * suffit (flèches pour choisir, Entrée pour valider).
 */
export function MentionSuggestions({
  suggestions,
  activeIndex,
  onSelect,
  className
}: MentionSuggestionsProps): JSX.Element | null {
  if (!suggestions.length) return null;

  return (
    <div
      className={cn(
        'absolute left-0 right-0 top-full z-30 mt-2 max-h-72 overflow-y-auto overscroll-contain rounded-xl border border-light-border bg-main-background py-1 shadow-xl dark:border-dark-border',
        className
      )}
    >
      {suggestions.map((suggestion, index) => (
        <button
          className={cn(
            'flex w-full items-center gap-3 px-3 py-2 text-left transition-colors',
            index === activeIndex
              ? 'bg-main-search-background'
              : 'hover:bg-main-search-background'
          )}
          key={suggestion.username}
          onClick={(): void => onSelect(suggestion)}
          onMouseDown={(event): void => event.preventDefault()}
          type='button'
        >
          {suggestion.ai ? (
            <AiAvatar size={32} />
          ) : (
            <UserAvatar
              alt={suggestion.name}
              size={32}
              src={suggestion.photoURL ?? ''}
            />
          )}

          <span className='min-w-0 flex-1'>
            <span className='flex items-center gap-1 truncate text-sm font-semibold text-light-primary dark:text-dark-primary'>
              {suggestion.name}
              {suggestion.verified && (
                <MaterialIcon
                  className='h-3.5 w-3.5 shrink-0 text-main-accent'
                  iconName='verified'
                />
              )}
              {suggestion.ai && (
                <span className='shrink-0 rounded-full bg-main-accent/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-main-accent'>
                  IA
                </span>
              )}
            </span>
            <span className='block truncate text-xs text-light-secondary dark:text-dark-secondary'>
              @{suggestion.username}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
