import type { LLM } from "../llm";
import { Brief, PlanDraft, type Emit, type Plan } from "../schemas";
import { INTERPRET_SYSTEM, PLAN_SYSTEM } from "./hermes.prompt";

export const MAX_OBJECTIVE_CHARS = 4000;

// Code owns guardrails. The model does not get a vote.
export const DEMO_BUILDER_CONSTRAINT =
  "Demo mode: output an architecture diagram and a file tree only. Do not generate source code.";
export const NO_ARCH_IN_PRODUCT_CONSTRAINT =
  "Do not make architecture or technology decisions. That belongs to Hephaestus.";
export const NO_PRODUCT_IN_BUILDER_CONSTRAINT =
  "Do not change requirements or scope. Build against Athena's output exactly.";

export type HermesResult =
  | { status: "planned"; brief: Brief; plan: Plan }
  | { status: "rejected"; brief: Brief; reason: string };

export class HermesError extends Error {}

const noop: Emit = () => {};

export async function runHermes(
  objective: string,
  llm: LLM,
  emit: Emit = noop,
): Promise<HermesResult> {
  const text = objective.trim();
  if (!text) throw new HermesError("Objective is empty.");
  if (text.length > MAX_OBJECTIVE_CHARS) {
    throw new HermesError(`Objective is too long. Limit is ${MAX_OBJECTIVE_CHARS} characters.`);
  }
  const wrapped = `<objective>\n${text}\n</objective>`;

  // Step 1: interpret
  emit({ type: "step_started", agent: "hermes", message: "Reading the objective." });
  const brief = await llm.generate({
    system: INTERPRET_SYSTEM,
    user: wrapped,
    schema: Brief,
    toolName: "emit_brief",
  });

  if (brief.scope === "out_of_scope") {
    emit({ type: "rejected", agent: "hermes", message: brief.scopeNote });
    return { status: "rejected", brief, reason: brief.scopeNote };
  }
  emit({ type: "step_done", agent: "hermes", message: "Brief created." });

  // Step 2: plan
  emit({ type: "step_started", agent: "hermes", message: "Briefing the agents." });
  const draft = await llm.generate({
    system: PLAN_SYSTEM,
    user: `${wrapped}\n\n<brief>\n${JSON.stringify(brief, null, 2)}\n</brief>`,
    schema: PlanDraft,
    toolName: "emit_plan",
  });

  const plan = assemble(draft);
  emit({ type: "step_done", agent: "hermes", message: `Plan ready: ${plan.title}` });
  return { status: "planned", brief, plan };
}

// The graph is hardcoded. Athena, then Hephaestus. No model can reorder it.
export function assemble(draft: PlanDraft): Plan {
  return {
    title: draft.title,
    summary: draft.summary,
    tasks: [
      {
        id: "task-1",
        agent: "athena",
        dependsOn: [],
        status: "pending",
        brief: {
          ...draft.athena,
          inputs: ["brief"],
          constraints: [...draft.athena.constraints, NO_ARCH_IN_PRODUCT_CONSTRAINT],
        },
      },
      {
        id: "task-2",
        agent: "hephaestus",
        dependsOn: ["task-1"],
        status: "pending",
        brief: {
          ...draft.hephaestus,
          inputs: ["brief", "task-1.output"],
          constraints: [
            ...draft.hephaestus.constraints,
            NO_PRODUCT_IN_BUILDER_CONSTRAINT,
            DEMO_BUILDER_CONSTRAINT,
          ],
        },
      },
    ],
  };
}
