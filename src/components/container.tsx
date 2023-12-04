import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

type ContainerProps = {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Container({
  asChild,
  className,
  ...props
}: ContainerProps) {
  const Comp = asChild ? Slot : 'div';
  return <Comp className={cn('container', className)} {...props} />;
}
