import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { strLimit } from '@/lib/utils';
import { SharedData } from '@/types';
import { Score } from '@/types/score';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ScoreBulkDeleteDialog from './components/score-bulk-delete-dialog';
import ScoreBulkEditSheet from './components/score-bulk-edit-sheet';
import ScoreDeleteDialog from './components/score-delete-dialog';
import ScoreFilterSheet from './components/score-filter-sheet';
import ScoreFormSheet from './components/score-form-sheet';

type Props = {
  scores: Score[];
  query: { [key: string]: string };
};

const ScoreList: FC<Props> = ({ scores, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Scores"
      description="Manage your scores"
      actions={
        <>
          {permissions?.canAdd && (
            <ScoreFormSheet purpose="create">
              <Button>
                <Plus />
                Create new score
              </Button>
            </ScoreFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search scores..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <ScoreFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </ScoreFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <ScoreBulkEditSheet scoreIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </ScoreBulkEditSheet>
            <ScoreBulkDeleteDialog scoreIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </ScoreBulkDeleteDialog>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === scores.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(scores.map((score) => score.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Student name</TableHead>
            <TableHead>Lesson label</TableHead>
            <TableHead>Nilai</TableHead>
            <TableHead>Catatan</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores
            .filter((score) => JSON.stringify(score).toLowerCase().includes(cari.toLowerCase()))
            .map((score) => (
              <TableRow key={score.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(score.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, score.id]);
                          } else {
                            setIds(ids.filter((id) => id !== score.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{score.student.name}</TableCell>
                <TableCell>{score.lesson.name}</TableCell>
                <TableCell>{score.score}</TableCell>
                <TableCell>{strLimit(score.remark)}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('score.show', score.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <ScoreFormSheet purpose="edit" score={score}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </ScoreFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <ScoreDeleteDialog score={score}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </ScoreDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default ScoreList;
