import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import cn from 'clsx';
import type { ReactNode } from 'react';

type AiMarkdownProps = {
  text: string;
  className?: string;
};

/* Les composants de react-markdown ne sont pas typés : on précise nous-mêmes
   ce qu'on attend de chacun. */
type MarkdownCodeProps = {
  children?: ReactNode;
  className?: string;
} & Record<string, unknown>;

/**
 * Rendu d'une réponse de l'assistant.
 *
 * Les modèles écrivent en Markdown : sans cette étape, les astérisques des
 * mots en gras et les listes apparaissent tels quels dans la bulle.
 *
 * La pile retenue est celle que le projet installe déjà :
 *   - `react-markdown` : le rendu (contenu statique, pas de streaming) ;
 *   - `remark-gfm` : tables, listes de tâches, barré, liens automatiques ;
 *   - `remark-math` + `rehype-katex` : les formules.
 *
 * Le HTML brut n'est pas interprété (react-markdown l'échappe par défaut) :
 * une réponse de modèle ne peut donc pas injecter de balise.
 */
export function AiMarkdown({ text, className }: AiMarkdownProps): JSX.Element {
  return (
    <div className={cn('ai-markdown break-words', className)}>
      <ReactMarkdown
        rehypePlugins={[rehypeKatex]}
        /* Dans une conversation, un retour à la ligne doit rester un retour à
           la ligne (comme dans n'importe quel chat) : c'est le rôle de
           `remark-breaks`, que react-markdown n'embarque plus. */
        remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
        components={{
          a: ({ children, ...props }) => (
            <a
              className='text-main-accent underline underline-offset-2 hover:brightness-90'
              rel='noopener noreferrer nofollow'
              target='_blank'
              {...props}
            >
              {children}
            </a>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className='my-2 border-l-2 border-current/25 pl-3 italic opacity-80'
              {...props}
            >
              {children}
            </blockquote>
          ),
          code: ({ children, className: codeClass, ...props }: MarkdownCodeProps) => {
            /* Le bloc de code est traité plus bas (dans `pre`). */
            const isBlock = codeClass?.startsWith('language-') ?? false;

            if (isBlock) return <code {...props}>{children}</code>;

            return (
              <code
                className='rounded bg-black/10 px-1 py-0.5 font-mono text-[0.85em] dark:bg-white/10'
                {...props}
              >
                {children}
              </code>
            );
          },
          h1: ({ children, ...props }) => (
            <h1 className='mb-1.5 mt-3 text-base font-bold' {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className='mb-1.5 mt-3 text-[15px] font-bold' {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className='mb-1 mt-2 text-[15px] font-bold' {...props}>
              {children}
            </h3>
          ),
          hr: (props) => <hr className='my-3 opacity-20' {...props} />,
          li: ({ children, ...props }) => (
            <li className='ml-1' {...props}>
              {children}
            </li>
          ),
          ol: ({ children, ...props }) => (
            <ol className='mb-2 list-decimal space-y-1 pl-5' {...props}>
              {children}
            </ol>
          ),
          p: ({ children, ...props }) => (
            <p className='mb-2 last:mb-0' {...props}>
              {children}
            </p>
          ),
          pre: ({ children, ...props }) => (
            <pre
              className='my-2 overflow-x-auto rounded-xl bg-black/5 p-3 text-[13px] leading-5 dark:bg-white/10'
              {...props}
            >
              {children}
            </pre>
          ),
          strong: ({ children, ...props }) => (
            <strong className='font-bold' {...props}>
              {children}
            </strong>
          ),
          table: ({ children, ...props }) => (
            <div className='my-2 overflow-x-auto'>
              <table className='w-full text-sm' {...props}>
                {children}
              </table>
            </div>
          ),
          tbody: ({ children, ...props }) => (
            <tbody {...props}>{children}</tbody>
          ),
          td: ({ children, ...props }) => (
            <td className='border border-current/15 px-2 py-1 align-top' {...props}>
              {children}
            </td>
          ),
          th: ({ children, ...props }) => (
            <th className='border border-current/15 px-2 py-1 font-bold' {...props}>
              {children}
            </th>
          ),
          thead: ({ children, ...props }) => (
            <thead className='bg-black/5 dark:bg-white/10' {...props}>
              {children}
            </thead>
          ),
          tr: ({ children, ...props }) => (
            <tr {...props}>{children}</tr>
          ),
          ul: ({ children, ...props }) => (
            <ul className='mb-2 list-disc space-y-1 pl-5' {...props}>
              {children}
            </ul>
          )
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
