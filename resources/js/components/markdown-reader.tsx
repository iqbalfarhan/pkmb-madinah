import { cn } from '@/lib/utils';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  content: string;
  className?: string;
};

const MarkdownReader: FC<Props> = ({ content, className }) => {

  return (
    <article className={cn('prose prose-lg max-w-full dark:prose-invert', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
};

export default MarkdownReader;
