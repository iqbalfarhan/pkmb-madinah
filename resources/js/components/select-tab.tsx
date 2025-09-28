import { useIsMobile } from '@/hooks/use-mobile';
import { NavItem } from '@/types';
import { FC } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

type Props = {
  value?: string;
  onValueChange?: (value: string) => void;
  options: NavItem[];
};

const SelectTab: FC<Props> = ({ options, value, onValueChange }) => {
  const mobile = useIsMobile();

  if (mobile) {
    return (
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="contoh" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item, index) => (
            <SelectItem key={index} value={item.href}>
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  } else {
    return (
      <Tabs value={value} onValueChange={onValueChange}>
        <TabsList>
          {options.map((item, index) => (
            <TabsTrigger key={index} value={item.href}>
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    );
  }
};

export default SelectTab;
