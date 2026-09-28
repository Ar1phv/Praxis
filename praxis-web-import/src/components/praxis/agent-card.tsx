import { Compass, FileText, Hammer, PenTool, ShieldCheck } from "lucide-react";
import type { Agent, AgentId, AgentStatus } from "@/lib/mock-data";
import { Meter, MetaLabel, StatusTag } from "./primitives";
import { cn } from "@/lib/utils";

const icons: Record<AgentId, typeof Compass> = {
  orchestrator: Compass,
  product: FileText,
  builder: Hammer,
  designer: PenTool,
  qa: ShieldCheck,
};

const statusTone: Record<AgentStatus, "signal" | "muted" | "warn" | "danger"> = {
  executing: "signal",
  complete: "signal",
  queued: "muted",
  idle: "muted",
  blocked: "danger",
};

const statusLabel: Record<AgentStatus, string> = {
  executing: "Executing",
  complete: "Complete",
  queued: "Queued",
  idle: "Idle",
  blocked: "Blocked",
};

export function AgentCard({ agent, className }: { agent: Agent; className?: string }) {
  const Icon = icons[agent.id];
  const tone = statusTone[agent.status];

  return (
    <article
      className={cn(
        "panel group flex flex-col transition-colors hover:border-border-strong",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3 border-b border-border p-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center border border-border",
              tone === "signal" ? "text-signal" : "text-muted-foreground",
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={1.5} />
          </span>
          <div>
            <h3 className="text-sm font-medium">{agent.name}</h3>
            <MetaLabel className="mt-1 normal-case tracking-normal">{agent.role}</MetaLabel>
          </div>
        </div>
        <StatusTag tone={tone} pulse={agent.status === "executing"}>
          {statusLabel[agent.status]}
        </StatusTag>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <MetaLabel>Current task</MetaLabel>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{agent.currentTask}</p>
        </div>
        <div>
          <MetaLabel>Output generated</MetaLabel>
          <div className="mt-1.5 flex items-baseline justify-between gap-3">
            <p className="font-mono text-sm text-foreground/90">{agent.output}</p>
            <span className="label-mono text-muted-foreground">{agent.outputMeta}</span>
          </div>
        </div>
        <div className="mt-auto">
          <div className="mb-2 flex items-center justify-between">
            <MetaLabel>Utilization</MetaLabel>
            <span className="label-mono text-foreground/80">{agent.utilization}%</span>
          </div>
          <Meter value={agent.utilization} tone={tone === "danger" ? "danger" : tone} />
        </div>
      </div>
    </article>
  );
}
