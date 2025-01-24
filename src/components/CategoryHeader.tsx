import { cn } from "@/lib/utils";

interface CategoryHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export function CategoryHeader({
  title,
  description,
  className,
}: CategoryHeaderProps) {
  return (
    <div className={cn("text-center mb-8", className)}>
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
