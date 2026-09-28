import { Link } from "@tanstack/react-router";
import { PraxisMark, Wordmark } from "./primitives";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Overview" },
  { to: "/start", label: "Start" },
  { to: "/dashboard", label: "Execution" },
] as const;

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-6 px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5 text-foreground">
          <PraxisMark className="text-signal" />
          <Wordmark />
        </Link>

        <nav className="ml-auto flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="label-mono rounded-sm px-3 py-2 text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-signal"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/start"
            className="label-mono ml-2 hidden items-center border border-signal px-4 py-2 text-signal transition-colors hover:bg-signal hover:text-primary-foreground sm:inline-flex"
          >
            Start an Execution
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2.5 text-muted-foreground">
          <PraxisMark className="h-4 w-4" />
          <Wordmark className="text-xs" />
        </div>
        <p className="label-mono text-muted-foreground">
          The shortest path between conviction and reality.
        </p>
        <p className="label-mono text-signal">Mission in. Product out.</p>
      </div>
    </footer>
  );
}
