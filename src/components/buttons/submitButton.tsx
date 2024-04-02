'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

type SubmitButtonProps = {
  text: string;
  loadingText: string;
  disabled?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({
  text,
  loadingText,
  disabled,
  formAction,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      formAction={formAction}
      {...props}
    >
      <span className="mr-1">{pending ? loadingText : text}</span>
    </Button>
  );
}
