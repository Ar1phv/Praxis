import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Eyebrow, MetaLabel, Panel, StatusTag } from "@/components/praxis/primitives";
import { SiteFooter, SiteHeader } from "@/components/praxis/site-chrome";
import { planPreview } from "@/lib/mock-data";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Start an Execution — Praxis" },
      {
        name: "description",
        content:
          "Describe the product you want to build. Praxis returns a product plan, technical architecture and execution roadmap.",
      },
      { property: "og:title", content: "Start an Execution — Praxis" },
      {
        property: "og:description",
        content: "One objective in. Product plan, architecture and roadmap out.",
      },
    ],
  }),
  component: StartExecution,
});

const examples = [
  "Build a decentralized exchange on Injective.",
  "Ship an AI research assistant for biotech teams.",
  "Launch a payments dashboard for marketplace sellers.",
];

type Stage = "input" | "preparing" | "plan";

function StartExecution() {
  const [objective, setObjective] = useState("");
  const [stage, setStage] = useState<Stage>("input");

  // Frontend-only flow: no generation happens, the preview below is mock data
  // shaped like the future API response.
  function submit() {
    if (!objective.trim()) return;
    setStage("preparing");
    setTimeout(() => setStage("plan"), 1200);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1100px] flex-1 px-5 py-14 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <Eyebrow>New execution</Eyebrow>
          <MetaLabel>Step {stage === "plan" ? "02" : "01"} / 02</MetaLabel>
        </div>

        <h1 className="mt-7 font-display text-3xl font-medium sm:text-4xl">
          What do you want to build?
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          State the objective in one sentence. Praxis converts it into a product plan, a technical
          architecture and an execution roadmap before any agent starts work.
        </p>

        <div className="panel mt-9">
          <textarea
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            placeholder="Build a decentralized exchange on Injective."
            rows={4}
            className="w-full resize-none bg-transparent p-5 text-base leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3">
            <MetaLabel>{objective.trim().length} characters</MetaLabel>
            <button
              type="button"
              onClick={submit}
              disabled={!objective.trim() || stage === "preparing"}
              className="label-mono group inline-flex items-center gap-3 bg-signal px-5 py-3 text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {stage === "preparing" ? (
                <>
                  Assembling team
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                </>
              ) : (
                <>
                  Generate execution brief
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <MetaLabel className="mr-1">Examples</MetaLabel>
          {examples.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setObjective(example)}
              className="label-mono border border-border px-3 py-2 text-muted-foreground normal-case transition-colors hover:border-border-strong hover:text-foreground"
            >
              {example}
            </button>
          ))}
        </div>

        {stage === "plan" && (
          <div className="mt-14 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Eyebrow>Execution brief</Eyebrow>
              <StatusTag tone="signal">Ready for approval</StatusTag>
            </div>

            <Panel title="Objective">
              <p className="p-5 text-base leading-relaxed">{objective}</p>
            </Panel>

            <div className="grid gap-4 md:grid-cols-2">
              <Panel title="Product plan">
                <ul className="divide-y divide-border">
                  {planPreview.product.map((item) => (
                    <li key={item} className="flex gap-3 px-5 py-3.5 text-sm leading-relaxed">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" strokeWidth={1.8} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Panel>
              <Panel title="Technical architecture">
                <ul className="divide-y divide-border">
                  {planPreview.architecture.map((item) => (
                    <li key={item} className="flex gap-3 px-5 py-3.5 text-sm leading-relaxed">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" strokeWidth={1.8} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>

            <Panel title="Execution roadmap" aside={<MetaLabel>14 days</MetaLabel>}>
              <ol className="divide-y divide-border">
                {planPreview.roadmap.map((phase, i) => (
                  <li key={phase.phase} className="flex flex-wrap items-baseline gap-x-5 gap-y-1 px-5 py-4">
                    <span className="label-mono w-8 text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="w-20 text-sm font-medium">{phase.phase}</span>
                    <span className="label-mono w-24 text-muted-foreground">{phase.window}</span>
                    <span className="flex-1 text-sm text-muted-foreground">{phase.detail}</span>
                  </li>
                ))}
              </ol>
            </Panel>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/dashboard"
                className="label-mono group inline-flex items-center gap-3 bg-signal px-6 py-3.5 text-primary-foreground transition-opacity hover:opacity-90"
              >
                Approve and execute
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                type="button"
                onClick={() => setStage("input")}
                className="label-mono border border-border-strong px-6 py-3.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                Revise objective
              </button>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
