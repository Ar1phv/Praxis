import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Praxis glyph — two abutting pillars forming a gateway. */
export function PraxisMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-5 w-5", className)} aria-hidden="true">
      <path d="M4 21V7l6-4v18" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M20 21V7l-6-4v18" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-[0.95rem] font-medium tracking-[0.42em] uppercase", className)}>
      Praxis
    </span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("label-mono text-signal", className)}>{children}</p>;
}

export function MetaLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("label-mono text-muted-foreground", className)}>{children}</p>;
}

type Tone = "signal" | "muted" | "warn" | "danger";

const toneDot: Record<Tone, string> = {
  signal: "bg-signal",
  muted: "bg-border-strong",
  warn: "bg-warning",
  danger: "bg-destructive",
};

export function StatusDot({ tone = "signal", pulse = false }: { tone?: Tone; pulse?: boolean }) {
  return (
    <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
      {pulse && (
        <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", toneDot[tone])} />
      )}
      <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", toneDot[tone])} />
    </span>
  );
}

export function StatusTag({
  children,
  tone = "muted",
  pulse = false,
}: {
  children: ReactNode;
  tone?: Tone;
  pulse?: boolean;
}) {
  const text: Record<Tone, string> = {
    signal: "text-signal",
    muted: "text-muted-foreground",
    warn: "text-warning",
    danger: "text-destructive",
  };
  return (
    <span className={cn("label-mono inline-flex items-center gap-2", text[tone])}>
      <StatusDot tone={tone} pulse={pulse} />
      {children}
    </span>
  );
}

export function Panel({
  children,
  className,
  title,
  aside,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  aside?: ReactNode;
}) {
  return (
    <section className={cn("panel flex flex-col", className)}>
      {(title || aside) && (
        <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <p className="label-mono text-muted-foreground">{title}</p>
          {aside}
        </header>
      )}
      {children}
    </section>
  );
}

export function Meter({ value, tone = "signal" }: { value: number; tone?: Tone }) {
  const bar: Record<Tone, string> = {
    signal: "bg-signal",
    muted: "bg-border-strong",
    warn: "bg-warning",
    danger: "bg-destructive",
  };
  return (
    <div className="h-[3px] w-full bg-surface-2">
      <div
        className={cn("h-full transition-[width] duration-700", bar[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-border pl-4">
      <p className="font-display text-2xl leading-none tracking-tight">{value}</p>
      <p className="label-mono mt-2 text-muted-foreground">{label}</p>
    </div>
  );
}
