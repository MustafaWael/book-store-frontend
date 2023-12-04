import { cn } from "@/lib/utils/utils";

type TagProps = {
  name: string;
} & React.ComponentPropsWithoutRef<"span">;

export default function Tag({ name, className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "bg-secondary text-sm md:text-base px-1.5 py-1 rounded-lg text-secondary-foreground capitalize",
        className
      )}
      {...props}
    >
      {name}
    </span>
  );
}
