# @praxis/core

Drop 1 of the agent rollout: Hermes (Orchestrator).

## Install

1. Unzip at the REPO ROOT. The zip contains `packages/core/`. Nothing else is touched.
2. If the root package.json uses Bun workspaces, confirm `"packages/*"` is listed under `workspaces`. Do not edit anything else.
3. From `packages/core`: `bun install`
4. `bun test` (4 tests, no API key needed, no network)
5. `bun run typecheck`
6. Copy `.env.example` to `.env`, fill `ANTHROPIC_API_KEY`. Leave `PRAXIS_MODEL` empty to use the default. Never commit `.env`.

## Use

```ts
import { runHermes, AnthropicLLM } from "@praxis/core";
const result = await runHermes("Build a DEX on Injective", new AnthropicLLM(), (e) => console.log(e));
```

`result.status` is `"planned"` (with `brief` and `plan`) or `"rejected"` (with `reason`).

## Rules that must not change

- The model writes the task briefs. Code owns the order (Athena then Hephaestus), the input wiring and the demo constraint. See `assemble()` in `src/agents/hermes.ts`.
- No automatic retries. Errors throw; the UI shows them and the user taps retry.
- The objective is untrusted input. It stays wrapped in `<objective>` tags.
