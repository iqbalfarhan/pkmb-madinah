import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Score } from '@/types/score';
import { File } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  score: Score;
};

const ScoreAnswerPopup: FC<Props> = ({ children, score }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="space-y-6">
        <p>{score.answer}</p>
        {score.media.map((m) => (
          <Button className="w-full" asChild>
            <a href={m.original_url}>
              <File />
              <span className="line-clamp-1">{m.file_name}</span>
            </a>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default ScoreAnswerPopup;
