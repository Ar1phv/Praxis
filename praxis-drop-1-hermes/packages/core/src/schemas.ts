import { z } from "zod";

export const AgentId = z.enum(["hermes", "athena", "hephaestus"]);
export type AgentId = z.infer<typeof AgentId>;

// Every agent receives this. Same shape, every time.
export const TaskBrief = z.object({
  objective: z.string().min(1),
  context: z.string().min(1),
  constraints: z.array(z.string()),
  inputs: z.array(z.string()),
  expectedOutput: z.string().min(1),
  qualityStandards: z.array(z.string()).min(1),
  nextStep: z.string().min(1),
});
export type TaskBrief = z.infer<typeof TaskBrief>;

// Hermes step 1: understand the goal.
export const Brief = z.object({
  objective: z.string().min(1),
  productType: z.enum(["web_app", "dapp", "landing_page", "api", "other"]),
  context: z.string(),
  constraints: z.array(z.string()),
  assumptions: z.array(z.string()),
  openQuestions: z.array(z.string()),
  approvalGates: z.array(z.string()),
  scope: z.enum(["in_scope", "out_of_scope"]),
  scopeNote: z.string(),
});
export type Brief = z.infer<typeof Brief>;

// Hermes step 2: what the model is allowed to write.
// The model writes briefs. It does not touch order or wiring.
export const PlanDraft = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  athena: TaskBrief,
  hephaestus: TaskBrief,
});
export type PlanDraft = z.infer<typeof PlanDraft>;

export const TaskStatus = z.enum(["pending", "running", "done", "failed"]);

export const Task = z.object({
  id: z.string(),
  agent: AgentId,
  dependsOn: z.array(z.string()),
  status: TaskStatus,
  brief: TaskBrief,
});
export type Task = z.infer<typeof Task>;

// What the rest of the system consumes.
export const Plan = z.object({
  title: z.string(),
  summary: z.string(),
  tasks: z.array(Task),
});
export type Plan = z.infer<typeof Plan>;

export type ExecutionEvent = {
  type: "step_started" | "step_done" | "rejected" | "error";
  agent: AgentId;
  message: string;
};
export type Emit = (e: ExecutionEvent) => void;
