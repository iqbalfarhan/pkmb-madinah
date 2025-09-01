import { useAppearance } from '@/hooks/use-appearance';
import { Monitor, Moon, Sun } from 'lucide-react';
import { FC } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

type Props = {
  size?: 'default' | 'icon';
};

const ThemeToggler: FC<Props> = ({ size = 'default' }) => {
  const { appearance, updateAppearance } = useAppearance();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} size={size}>
          {appearance === 'light' && <Sun />}
          {appearance === 'dark' && <Moon />}
          {appearance === 'system' && <Monitor />}
          {size === 'default' && (
            <span className="hidden md:block">
              {appearance === 'light' && 'Terang'}
              {appearance === 'dark' && 'Gelap'}
              {appearance === 'system' && 'Sistem'}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => updateAppearance('light')}>
          <Sun />
          <span>Terang</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateAppearance('dark')}>
          <Moon />
          <span>Gelap</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateAppearance('system')}>
          <Monitor />
          <span>Sistem</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggler;
