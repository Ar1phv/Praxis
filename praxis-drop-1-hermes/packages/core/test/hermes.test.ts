import { describe, expect, test } from "bun:test";
import { z } from "zod";
import type { LLM } from "../src/llm";
import { assemble, HermesError, runHermes, DEMO_BUILDER_CONSTRAINT } from "../src/agents/hermes";
import type { Brief, PlanDraft, TaskBrief } from "../src/schemas";

const tb = (o: string): TaskBrief => ({
  objective: o, context: "ctx", constraints: [], inputs: ["model wrote this"],
  expectedOutput: "out", qualityStandards: ["checkable"], nextStep: "next",
});

const brief = (scope: Brief["scope"]): Brief => ({
  objective: "Build a DEX", productType: "dapp", context: "", constraints: [],
  assumptions: [], openQuestions: [], approvalGates: [], scope, scopeNote: "note",
});

const draft: PlanDraft = { title: "DEX", summary: "s", athena: tb("prd"), hephaestus: tb("arch") };

function fake(responses: unknown[]): LLM {
  let i = 0;
  return { async generate<T>(a: { schema: z.ZodType<T> }) { return a.schema.parse(responses[i++]); } };
}

describe("hermes", () => {
  test("plans in fixed order and overwrites model wiring", async () => {
    const r = await runHermes("Build a DEX on Injective", fake([brief("in_scope"), draft]));
    expect(r.status).toBe("planned");
    if (r.status !== "planned") return;
    expect(r.plan.tasks.map((t) => t.agent)).toEqual(["athena", "hephaestus"]);
    expect(r.plan.tasks[1].dependsOn).toEqual(["task-1"]);
    expect(r.plan.tasks[1].brief.inputs).toEqual(["brief", "task-1.output"]);
    expect(r.plan.tasks[1].brief.constraints).toContain(DEMO_BUILDER_CONSTRAINT);
  });

  test("rejects out of scope without a second call", async () => {
    const r = await runHermes("Write me a poem", fake([brief("out_of_scope")]));
    expect(r.status).toBe("rejected");
  });

  test("empty and oversized objectives throw", async () => {
    await expect(runHermes("  ", fake([]))).rejects.toBeInstanceOf(HermesError);
    await expect(runHermes("x".repeat(4001), fake([]))).rejects.toBeInstanceOf(HermesError);
  });

  test("assemble is pure", () => {
    expect(assemble(draft).tasks).toHaveLength(2);
  });
});
