import { AlertTriangle, ArrowUpRight, Check, CircleDashed, Loader2 } from "lucide-react";
import {
  AGENT_LABELS,
  activityFeed,
  blockers,
  deliverables,
  tasks,
  timeline,
  type Task,
  type TaskState,
} from "@/lib/mock-data";
import { Meter, MetaLabel, Panel, StatusTag } from "./primitives";
import { cn } from "@/lib/utils";

export function TimelinePanel() {
  return (
    <Panel title="Progress timeline" aside={<MetaLabel>5 phases</MetaLabel>}>
      <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-5 sm:divide-x sm:divide-y-0">
        {timeline.map((phase) => (
          <div key={phase.id} className="flex flex-col gap-3 p-4">
            <div className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "label-mono",
                  phase.state === "active"
                    ? "text-signal"
                    : phase.state === "complete"
                      ? "text-foreground"
                      : "text-muted-foreground",
                )}
              >
                {phase.name}
              </span>
              {phase.state === "complete" ? (
                <Check className="h-3.5 w-3.5 text-signal" />
              ) : phase.state === "active" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-signal" />
              ) : (
                <CircleDashed className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </div>
            <Meter value={phase.progress} tone={phase.state === "pending" ? "muted" : "signal"} />
            <p className="text-xs leading-relaxed text-muted-foreground">{phase.summary}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function ActivityPanel() {
  return (
    <Panel
      title="Agent activity"
      className="min-h-0"
      aside={<StatusTag tone="signal" pulse>Live</StatusTag>}
    >
      <ul className="max-h-[420px] divide-y divide-border overflow-y-auto">
        {activityFeed.map((entry) => (
          <li key={entry.id} className="flex gap-3 px-4 py-3">
            <span className="label-mono w-12 shrink-0 pt-0.5 text-muted-foreground">
              {entry.timestamp}
            </span>
            <div className="min-w-0">
              <span
                className={cn(
                  "label-mono",
                  entry.level === "warn"
                    ? "text-warning"
                    : entry.level === "signal"
                      ? "text-signal"
                      : "text-muted-foreground",
                )}
              >
                {AGENT_LABELS[entry.agent]}
              </span>
              <p className="mt-1 text-sm leading-relaxed text-foreground/85">{entry.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

const taskTone: Record<TaskState, "signal" | "muted" | "danger"> = {
  in_progress: "signal",
  queued: "muted",
  complete: "signal",
  blocked: "danger",
};

function TaskRow({ task }: { task: Task }) {
  return (
    <li className="flex items-start gap-3 px-4 py-3">
      <span className="label-mono w-12 shrink-0 pt-0.5 text-muted-foreground">{task.id}</span>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm",
            task.state === "complete" ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {task.title}
        </p>
        <p className="label-mono mt-1.5 text-muted-foreground">
          {AGENT_LABELS[task.agent]} · {task.detail}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <StatusTag tone={taskTone[task.state]} pulse={task.state === "in_progress"}>
          {task.state.replace("_", " ")}
        </StatusTag>
        <span className="label-mono text-muted-foreground">{task.updatedAt}</span>
      </div>
    </li>
  );
}

export function TasksPanel() {
  const current = tasks.filter((t) => t.state !== "complete");
  const done = tasks.filter((t) => t.state === "complete");

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Current tasks" aside={<MetaLabel>{current.length} open</MetaLabel>}>
        <ul className="divide-y divide-border">
          {current.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </ul>
      </Panel>
      <Panel title="Completed tasks" aside={<MetaLabel>{done.length} shipped</MetaLabel>}>
        <ul className="divide-y divide-border">
          {done.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </ul>
      </Panel>
    </div>
  );
}

export function BlockersPanel() {
  return (
    <Panel
      title="Blockers"
      aside={<StatusTag tone="danger">{blockers.length} active</StatusTag>}
    >
      <ul className="divide-y divide-border">
        {blockers.map((blocker) => (
          <li key={blocker.id} className="flex gap-3 px-4 py-4">
            <AlertTriangle
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                blocker.severity === "high" ? "text-destructive" : "text-warning",
              )}
              strokeWidth={1.5}
            />
            <div>
              <p className="text-sm font-medium">{blocker.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{blocker.detail}</p>
              <p className="label-mono mt-2 text-warning">{blocker.owner}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function DeliverablesPanel() {
  return (
    <Panel title="Deliverables" aside={<MetaLabel>{deliverables.length} artifacts</MetaLabel>}>
      <ul className="divide-y divide-border">
        {deliverables.map((item) => (
          <li key={item.id} className="group flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm">{item.name}</p>
              <p className="label-mono mt-1 text-muted-foreground">
                {item.type} · {item.size}
              </p>
            </div>
            <StatusTag
              tone={item.state === "shipped" ? "signal" : item.state === "review" ? "warn" : "muted"}
              pulse={item.state === "generating"}
            >
              {item.state}
            </StatusTag>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </li>
        ))}
      </ul>
    </Panel>
  );
}
