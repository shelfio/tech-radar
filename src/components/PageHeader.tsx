import { ReactNode } from "react";
import { cn } from "@/utils/cn";

export type PageHeaderProps = {
  title?: string;
  description?: string;
  logoSrc: string;
  logoAlt?: string;
  containerClassName?: string;
  className?: string;
  rightSlot?: ReactNode;
};

export function PageHeader({
  title,
  description,
  logoSrc,
  logoAlt = "Shelf",
  containerClassName,
  className,
  rightSlot,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/40 bg-white/70 py-4 backdrop-blur",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center gap-4",
          containerClassName ?? "max-w-6xl px-4",
        )}
      >
        <img
          src={logoSrc}
          alt={logoAlt}
          className="h-10 w-auto flex-shrink-0 min-w-[100px]"
        />

        {(title || description) && (
          <div className="flex-1 space-y-1">
            {title && (
              <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
            )}
            {description && (
              <p className="text-sm text-slate-500">{description}</p>
            )}
          </div>
        )}

        {rightSlot ? (
          <div className="ml-auto flex items-center gap-3">{rightSlot}</div>
        ) : null}
      </div>
    </header>
  );
}

export default PageHeader;
