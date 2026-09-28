import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AgentCard } from "@/components/praxis/agent-card";
import {
  ActivityPanel,
  BlockersPanel,
  DeliverablesPanel,
  TasksPanel,
  TimelinePanel,
} from "@/components/praxis/execution-panels";
import { Eyebrow, Meter, MetaLabel, StatusTag } from "@/components/praxis/primitives";
import { SiteFooter, SiteHeader } from "@/components/praxis/site-chrome";
import { activeExecution, agents, executions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Execution Dashboard — Praxis" },
      {
        name: "description",
        content:
          "Mission control for your Praxis executions: live agent activity, progress timeline, tasks, blockers and deliverables.",
      },
      { property: "og:title", content: "Execution Dashboard — Praxis" },
      {
        property: "og:description",
        content: "Live agent activity, timeline, tasks, blockers and deliverables in one workspace.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-5 py-8 sm:px-8">
        {/* Execution header */}
        <div className="panel">
          <div className="flex flex-wrap items-start justify-between gap-6 p-5">
            <div>
              <div className="flex items-center gap-3">
                <MetaLabel>{activeExecution.id}</MetaLabel>
                <StatusTag tone="signal" pulse>
                  In progress
                </StatusTag>
              </div>
              <h1 className="mt-3 font-display text-2xl font-medium sm:text-3xl">
                {activeExecution.name}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                {activeExecution.objective}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-8">
              <div>
                <MetaLabel>Started</MetaLabel>
                <p className="mt-1.5 text-sm">{activeExecution.startedAt}</p>
              </div>
              <div>
                <MetaLabel>ETA</MetaLabel>
                <p className="mt-1.5 text-sm">{activeExecution.etaDays} days</p>
              </div>
              <div>
                <MetaLabel>Progress</MetaLabel>
                <p className="mt-1.5 font-display text-2xl leading-none text-signal">
                  {activeExecution.progress}%
                </p>
              </div>
            </div>
          </div>
          <Meter value={activeExecution.progress} />
        </div>

        {/* Executions switcher */}
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {executions.map((execution) => (
            <button
              key={execution.id}
              type="button"
              className={cn(
                "panel flex flex-col gap-3 p-4 text-left transition-colors hover:border-border-strong",
                execution.id === activeExecution.id && "border-signal-dim",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <MetaLabel>{execution.id}</MetaLabel>
                <StatusTag
                  tone={
                    execution.status === "in_progress"
                      ? "signal"
                      : execution.status === "review"
                        ? "warn"
                        : "muted"
                  }
                  pulse={execution.status === "in_progress"}
                >
                  {execution.status.replace("_", " ")}
                </StatusTag>
              </div>
              <p className="text-sm font-medium">{execution.name}</p>
              <Meter
                value={execution.progress}
                tone={execution.status === "shipped" ? "muted" : "signal"}
              />
            </button>
          ))}
        </div>

        <div className="mt-8">
          <TimelinePanel />
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            <TasksPanel />
            <BlockersPanel />
          </div>
          <div className="space-y-4">
            <ActivityPanel />
            <DeliverablesPanel />
          </div>
        </div>

        {/* Agent system */}
        <div className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Agent system</Eyebrow>
              <h2 className="mt-4 font-display text-xl font-medium sm:text-2xl">
                Team assigned to {activeExecution.name}
              </h2>
            </div>
            <Link
              to="/start"
              className="label-mono group inline-flex items-center gap-3 border border-border-strong px-5 py-3 transition-colors hover:border-signal hover:text-signal"
            >
              New execution
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
