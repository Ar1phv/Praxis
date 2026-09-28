import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, X } from "lucide-react";
import gateway from "@/assets/gateway.jpg";
import { AgentCard } from "@/components/praxis/agent-card";
import { Eyebrow, MetaLabel, Panel, StatBlock, StatusTag } from "@/components/praxis/primitives";
import { SiteFooter, SiteHeader } from "@/components/praxis/site-chrome";
import { agents } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Praxis — Execution, automated." },
      {
        name: "description",
        content:
          "Praxis is the autonomous product execution platform. Describe what you want to build; coordinated AI agents plan, design, build, test and ship it.",
      },
      { property: "og:title", content: "Praxis — Execution, automated." },
      {
        property: "og:description",
        content:
          "Describe a product. Praxis coordinates specialized agents to plan, design, build, test and ship it.",
      },
    ],
  }),
  component: Landing,
});

const problems = [
  "Hiring takes too long",
  "Freelancers disappear",
  "Agencies are slow",
  "Managing consumes your time",
  "Context switching kills focus",
  "Projects stall. Nothing ships.",
];

const promises = [
  "Wake up to real progress",
  "A team that never sleeps",
  "End-to-end execution",
  "You stay in control",
  "Everything is verified",
  "Ship faster. Scale smarter.",
];

const transformation = [
  ["Manager", "Commander"],
  ["Coordinator", "Strategist"],
  ["Firefighter", "Visionary"],
  ["Reactive", "Proactive"],
  ["Uncertain", "In control"],
];

const pipeline = [
  { step: "01", name: "Plan", detail: "Objective decomposed into milestones, scope and acceptance criteria." },
  { step: "02", name: "Design", detail: "Interface systems, flows and a token-level design language." },
  { step: "03", name: "Build", detail: "Services, integrations and infrastructure implemented end to end." },
  { step: "04", name: "Test", detail: "Regression, security review and verification gates before release." },
  { step: "05", name: "Ship", detail: "Deployment, monitoring and a complete handover pack." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:py-24">
            <Eyebrow>Autonomous execution infrastructure</Eyebrow>
            <h1 className="mt-8 font-display text-4xl leading-[1.06] font-medium tracking-tight sm:text-5xl lg:text-[3.5rem]">
              You focus on
              <br />
              deciding.
              <br />
              <span className="text-signal">We handle
              <br />
              the execution.</span>
            </h1>
            <p className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
              Praxis is the autonomous product execution platform. Describe what you want to build
              and coordinated agents plan, design, build, test and ship it — without hiring or
              managing a team.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/start"
                className="label-mono group inline-flex items-center gap-3 bg-signal px-6 py-3.5 text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start an Execution
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/dashboard"
                className="label-mono inline-flex items-center gap-3 border border-border-strong px-6 py-3.5 text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                View live execution
              </Link>
            </div>

            <div className="mt-14 grid max-w-lg grid-cols-3 gap-6">
              <StatBlock value="24/7" label="Execution" />
              <StatBlock value="100%" label="Verified" />
              <StatBlock value="0" label="Meetings" />
            </div>
          </div>

          <div className="relative min-h-[380px] border-t border-border lg:border-t-0 lg:border-l">
            <img
              src={gateway}
              alt="Concrete gateway opening onto a distant mountain range"
              width={1024}
              height={1280}
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
            <div className="relative flex h-full flex-col justify-center gap-5 p-8">
              {[
                ["Mission protocol", "VER-01"],
                ["Status", "Standby"],
                ["Security", "Encrypted"],
                ["Gateway", "Active"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center gap-3">
                  <div>
                    <MetaLabel>{k}</MetaLabel>
                    <p className="label-mono mt-1 text-foreground">{v}</p>
                  </div>
                  <span className="mt-3 h-1.5 w-1.5 rounded-full bg-signal" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="px-5 py-12 sm:px-8">
            <Eyebrow>Positioning</Eyebrow>
            <h2 className="mt-6 max-w-md font-display text-2xl leading-snug font-medium sm:text-3xl">
              Execution certainty for founders building what's next.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Unlike assistants that answer questions, Praxis executes missions. One objective in,
              a shipped product out — planned, designed, built, tested and verified by a
              coordinated agent system you command.
            </p>
          </div>
          <div className="px-5 py-12 sm:px-8">
            <Eyebrow>The transformation</Eyebrow>
            <div className="mt-6 grid grid-cols-[1fr_auto_1fr] gap-x-6 gap-y-4">
              <MetaLabel className="text-signal">From</MetaLabel>
              <span />
              <MetaLabel className="text-signal">To</MetaLabel>
              {transformation.map(([from, to]) => (
                <div key={from} className="contents">
                  <span className="text-sm text-muted-foreground">{from}</span>
                  <span className="self-center text-border-strong">→</span>
                  <span className="text-sm text-foreground">{to}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM / PROMISE */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="px-5 py-12 sm:px-8">
            <Eyebrow className="text-destructive">The problem</Eyebrow>
            <ul className="mt-6 space-y-3.5">
              {problems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" strokeWidth={1.8} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-5 py-12 sm:px-8">
            <Eyebrow>The promise</Eyebrow>
            <ul className="mt-6 space-y-3.5">
              {promises.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" strokeWidth={1.8} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
          <Eyebrow>How an idea becomes a product</Eyebrow>
          <h2 className="mt-6 max-w-xl font-display text-2xl font-medium sm:text-3xl">
            One objective enters. Five phases execute. A product ships.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {pipeline.map((phase) => (
              <div key={phase.step} className="flex flex-col gap-3 bg-surface p-5">
                <span className="label-mono text-signal">{phase.step}</span>
                <h3 className="text-base font-medium">{phase.name}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{phase.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENTS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>The agent system</Eyebrow>
              <h2 className="mt-6 max-w-xl font-display text-2xl font-medium sm:text-3xl">
                Five specialists. One execution graph.
              </h2>
            </div>
            <StatusTag tone="signal" pulse>
              Live from EXC-0142
            </StatusTag>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
            <Panel className="items-start justify-center gap-4 p-6">
              <Eyebrow>Your mission</Eyebrow>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Give Praxis an objective. We assemble the team, execute the mission, and you ship.
              </p>
              <Link
                to="/start"
                className="label-mono group inline-flex items-center gap-3 border border-signal px-5 py-3 text-signal transition-colors hover:bg-signal hover:text-primary-foreground"
              >
                Start an Execution
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Panel>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grid-lines border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-20 text-center sm:px-8">
          <Eyebrow className="text-muted-foreground">Brand essence</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl leading-tight font-medium sm:text-4xl">
            Execution, <span className="text-signal">automated.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            The shortest path between conviction and reality. Mission in. Product out.
          </p>
          <Link
            to="/start"
            className="label-mono mt-9 inline-flex items-center gap-3 bg-signal px-7 py-3.5 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start an Execution
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
