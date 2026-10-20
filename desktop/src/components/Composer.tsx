import { useState } from 'preact/hooks';
import { Avatar } from './Avatar';
import { Icon } from './Icon';
import type { AppUser } from '../lib/types';

const EMOJIS = [
  '😀', '😂', '🤣', '😊', '😍', '🥰', '😘', '😋', '😜', '🤪',
  '😎', '🤔', '🤨', '😐', '😴', '🤯', '🥳', '😤', '😭', '😡',
  '👍', '👎', '👏', '🙌', '🤝', '🙏', '💪', '✌️', '🤞', '👌',
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '💔', '💯',
  '🔥', '✨', '⭐', '🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '💎',
  '🐶', '🐱', '🐭', '🦊', '🐻', '🐼', '🦄', '🐸', '🐵', '🐔',
  '🍎', '🍓', '🍕', '🍔', '🍟', '🌮', '🍣', '🥗', '🍰', '☕',
  '✅', '❌', '⚠️', '💯', '🔴', '⚪', '🔺', '♻️', '💡', '🚀'
];

type ComposerProps = {
  user: AppUser | null;
  onPublish: (text: string) => Promise<void> | void;
  limit?: number;
  placeholder?: string;
};

export function Composer({
  user,
  onPublish,
  limit = 280,
  placeholder = 'Qu’est-ce qui se passe ?'
}: ComposerProps) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);

  const length = text.length;
  const over = length > limit;
  const remaining = limit - length;

  const publish = async (): Promise<void> => {
    if (!text.trim() || over || busy) return;

    setBusy(true);

    try {
      await onPublish(text);
      setText('');
    } finally {
      setBusy(false);
    }
  };

  const insertEmoji = (emoji: string): void => {
    setText((current) => current + emoji);
    setEmojiOpen(false);
  };

  return (
    <div className='composer'>
      <Avatar className='tweet-avatar' name={user?.name} src={user?.photoURL} />

      <div className='composer-main'>
        <textarea
          className='selectable'
          onInput={(event) => setText((event.target as HTMLTextAreaElement).value)}
          placeholder={placeholder}
          value={text}
        />

        <div className='composer-bar'>
          <div className='emoji-wrap'>
            <button
              aria-label='Insérer un emoji'
              className='icon-button'
              onClick={() => setEmojiOpen((value) => !value)}
              type='button'
            >
              <Icon name='mood' />
            </button>

            {emojiOpen && (
              <div className='emoji-panel'>
                {EMOJIS.map((emoji, index) => (
                  <button
                    key={`${emoji}-${index}`}
                    onClick={() => insertEmoji(emoji)}
                    type='button'
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style='display:flex;align-items:center;gap:12px'>
            {length > 0 && (
              <span className={`composer-count ${over ? 'over' : ''}`}>
                {over ? `${-remaining} trop` : remaining}
              </span>
            )}

            <button
              className='button'
              disabled={!text.trim() || over || busy}
              onClick={() => void publish()}
              type='button'
            >
              {busy ? 'Envoi…' : 'Publier'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
