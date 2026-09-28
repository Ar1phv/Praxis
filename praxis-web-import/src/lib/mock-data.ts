/**
 * Mock data layer for the Praxis frontend MVP.
 *
 * Every export here mirrors the shape a future API is expected to return, so
 * swapping in real endpoints only means replacing these constants with fetches.
 */

export type AgentId = "orchestrator" | "product" | "builder" | "designer" | "qa";

export type AgentStatus = "executing" | "queued" | "idle" | "blocked" | "complete";

export interface Agent {
  id: AgentId;
  name: string;
  role: string;
  status: AgentStatus;
  currentTask: string;
  output: string;
  outputMeta: string;
  utilization: number;
}

export type TaskState = "in_progress" | "queued" | "complete" | "blocked";

export interface Task {
  id: string;
  title: string;
  agent: AgentId;
  state: TaskState;
  detail: string;
  updatedAt: string;
}

export interface TimelinePhase {
  id: string;
  name: string;
  state: "complete" | "active" | "pending";
  progress: number;
  summary: string;
}

export interface ActivityEntry {
  id: string;
  agent: AgentId;
  message: string;
  timestamp: string;
  level: "info" | "signal" | "warn";
}

export interface Blocker {
  id: string;
  title: string;
  detail: string;
  severity: "high" | "medium" | "low";
  owner: string;
}

export interface Deliverable {
  id: string;
  name: string;
  type: string;
  state: "shipped" | "review" | "generating";
  size: string;
}

export interface Execution {
  id: string;
  name: string;
  objective: string;
  status: "in_progress" | "review" | "shipped";
  progress: number;
  startedAt: string;
  etaDays: number;
}

export const AGENT_LABELS: Record<AgentId, string> = {
  orchestrator: "ORCHESTRATOR",
  product: "PRODUCT AGENT",
  builder: "BUILDER AGENT",
  designer: "DESIGNER AGENT",
  qa: "QA AGENT",
};

export const activeExecution: Execution = {
  id: "EXC-0142",
  name: "Injective DEX",
  objective: "Build a decentralized exchange on Injective.",
  status: "in_progress",
  progress: 72,
  startedAt: "9 days ago",
  etaDays: 5,
};

export const executions: Execution[] = [
  activeExecution,
  {
    id: "EXC-0138",
    name: "Vault Analytics",
    objective: "Ship a portfolio analytics dashboard for DeFi vaults.",
    status: "review",
    progress: 94,
    startedAt: "21 days ago",
    etaDays: 1,
  },
  {
    id: "EXC-0121",
    name: "Merchant Onboarding",
    objective: "Automate KYC onboarding for merchant accounts.",
    status: "shipped",
    progress: 100,
    startedAt: "2 months ago",
    etaDays: 0,
  },
];

export const agents: Agent[] = [
  {
    id: "orchestrator",
    name: "Orchestrator",
    role: "Mission control · dependency routing",
    status: "executing",
    currentTask: "Sequencing settlement layer against QA gate 3",
    output: "Execution graph v11",
    outputMeta: "48 nodes · 6 critical path",
    utilization: 86,
  },
  {
    id: "product",
    name: "Product Agent",
    role: "Scope · requirements · acceptance criteria",
    status: "complete",
    currentTask: "Acceptance criteria signed off for orderbook module",
    output: "PRD + 34 user stories",
    outputMeta: "Frozen at v4",
    utilization: 41,
  },
  {
    id: "builder",
    name: "Builder Agent",
    role: "Implementation · integration · infrastructure",
    status: "executing",
    currentTask: "Implementing on-chain order matching client",
    output: "128 commits · 4 services",
    outputMeta: "Last push 4m ago",
    utilization: 93,
  },
  {
    id: "designer",
    name: "Designer Agent",
    role: "Interface systems · flows · design tokens",
    status: "queued",
    currentTask: "Awaiting trade panel spec from Product",
    output: "Design system v2 · 26 screens",
    outputMeta: "3 flows pending",
    utilization: 22,
  },
  {
    id: "qa",
    name: "QA Agent",
    role: "Verification · regression · security review",
    status: "blocked",
    currentTask: "Testnet RPC credentials required to run gate 3",
    output: "412 tests · 2 failing",
    outputMeta: "Coverage 88%",
    utilization: 12,
  },
];

export const timeline: TimelinePhase[] = [
  { id: "plan", name: "Plan", state: "complete", progress: 100, summary: "Objective decomposed into 6 milestones." },
  { id: "design", name: "Design", state: "complete", progress: 100, summary: "26 screens + token system delivered." },
  { id: "build", name: "Build", state: "active", progress: 68, summary: "Matching engine and wallet layer in progress." },
  { id: "test", name: "Test", state: "active", progress: 34, summary: "Gate 3 blocked on testnet credentials." },
  { id: "ship", name: "Ship", state: "pending", progress: 0, summary: "Deployment pipeline staged, awaiting green gates." },
];

export const activityFeed: ActivityEntry[] = [
  { id: "a1", agent: "builder", message: "Pushed order matching client — 14 files changed", timestamp: "00:04", level: "signal" },
  { id: "a2", agent: "qa", message: "Gate 3 halted: missing testnet RPC credential", timestamp: "00:11", level: "warn" },
  { id: "a3", agent: "orchestrator", message: "Re-routed design dependency to unblock build lane", timestamp: "00:19", level: "info" },
  { id: "a4", agent: "designer", message: "Trade panel spec requested from Product Agent", timestamp: "00:26", level: "info" },
  { id: "a5", agent: "product", message: "Acceptance criteria frozen for orderbook module", timestamp: "00:41", level: "signal" },
  { id: "a6", agent: "builder", message: "Wallet connection module verified on devnet", timestamp: "01:02", level: "signal" },
  { id: "a7", agent: "orchestrator", message: "Execution graph recomputed — critical path -1 day", timestamp: "01:18", level: "info" },
  { id: "a8", agent: "qa", message: "412 tests executed · 2 failing · coverage 88%", timestamp: "01:37", level: "info" },
];

export const tasks: Task[] = [
  { id: "T-31", title: "On-chain order matching client", agent: "builder", state: "in_progress", detail: "Injective exchange module bindings", updatedAt: "4m" },
  { id: "T-32", title: "Settlement reconciliation service", agent: "builder", state: "in_progress", detail: "Ledger diffing against chain state", updatedAt: "12m" },
  { id: "T-33", title: "Trade panel interface spec", agent: "designer", state: "queued", detail: "Depends on T-30 acceptance criteria", updatedAt: "26m" },
  { id: "T-34", title: "Security review — signing flow", agent: "qa", state: "blocked", detail: "Requires testnet RPC credential", updatedAt: "11m" },
  { id: "T-30", title: "Orderbook acceptance criteria", agent: "product", state: "complete", detail: "34 stories, frozen at v4", updatedAt: "41m" },
  { id: "T-28", title: "Wallet connection module", agent: "builder", state: "complete", detail: "Verified on devnet", updatedAt: "1h" },
  { id: "T-24", title: "Design system + 26 screens", agent: "designer", state: "complete", detail: "Tokens exported to repo", updatedAt: "2d" },
  { id: "T-19", title: "Technical architecture", agent: "orchestrator", state: "complete", detail: "4 services, 2 chains, 1 indexer", updatedAt: "6d" },
];

export const blockers: Blocker[] = [
  {
    id: "B-02",
    title: "Testnet RPC credential missing",
    detail: "QA gate 3 cannot execute signing regression without an authenticated Injective testnet endpoint.",
    severity: "high",
    owner: "Founder action required",
  },
  {
    id: "B-05",
    title: "Fee schedule undecided",
    detail: "Maker/taker split not specified. Product Agent proposed 0.05% / 0.10% pending approval.",
    severity: "medium",
    owner: "Awaiting decision",
  },
];

export const deliverables: Deliverable[] = [
  { id: "D-1", name: "Product plan", type: "Document", state: "shipped", size: "18 pages" },
  { id: "D-2", name: "Technical architecture", type: "Diagram + spec", state: "shipped", size: "4 services" },
  { id: "D-3", name: "Design system", type: "Interface kit", state: "shipped", size: "26 screens" },
  { id: "D-4", name: "Matching engine", type: "Service", state: "review", size: "9.4k LOC" },
  { id: "D-5", name: "Trade interface", type: "Application", state: "generating", size: "62% built" },
  { id: "D-6", name: "Audit report", type: "Verification", state: "generating", size: "gate 3 pending" },
];

/** Plan preview produced by the creation flow (static preview, not generated). */
export const planPreview = {
  product: [
    "Non-custodial spot exchange on Injective with orderbook trading.",
    "Wallet connect, portfolio view, and live position tracking.",
    "Maker/taker fee engine with transparent settlement history.",
  ],
  architecture: [
    "Injective exchange module bindings via CosmWasm client.",
    "Rust matching relay + indexer service with Postgres projection.",
    "React trade client, websocket market data, signed order relay.",
  ],
  roadmap: [
    { phase: "Plan", window: "Day 1–2", detail: "Scope freeze, acceptance criteria, execution graph." },
    { phase: "Design", window: "Day 2–5", detail: "Trade surface, portfolio, onboarding flows." },
    { phase: "Build", window: "Day 4–11", detail: "Matching relay, indexer, client integration." },
    { phase: "Test", window: "Day 9–13", detail: "Regression, signing security review, load gates." },
    { phase: "Ship", window: "Day 14", detail: "Mainnet deploy, monitoring, handover pack." },
  ],
};
