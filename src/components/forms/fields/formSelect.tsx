import { useEffect, useId, useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type SelectProps = {
  label: string;
  options: string[];
  defaultValue?: string;
  value?: string;
  loading?: boolean;
  name: string;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (value: string) => void;
};

export default function FormSelect({
  label,
  options = [],
  defaultValue,
  loading,
  disabled,
  readonly,
  onChange = () => {},
  ...props
}: SelectProps) {
  const [value, setValue] = useState(() => defaultValue || options[0]);
  const id = useId();

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    if (!options.includes(value)) {
      setValue(options[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useEffect(() => {
    if (loading) setValue('Loading...');
  }, [loading]);

  const loadingOptions = loading ? ['Loading...'] : options;

  return (
    <div className="flex flex-col">
      <Label htmlFor={id} className="mb-3">
        {label}
      </Label>
      <Select
        value={value}
        onValueChange={handleChange}
        disabled={disabled}
        {...props}
      >
        <SelectTrigger id={id} aria-readonly={readonly}>
          <SelectValue aria-label={value}>{value}</SelectValue>
        </SelectTrigger>

        <SelectContent position="item-aligned">
          {loadingOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
