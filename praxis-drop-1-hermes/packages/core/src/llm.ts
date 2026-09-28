import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

export interface LLM {
  generate<T>(args: {
    system: string;
    user: string;
    schema: z.ZodType<T>;
    toolName: string;
    maxTokens?: number;
  }): Promise<T>;
}

export class LLMError extends Error {}

// v1: Anthropic only. The interface exists so tests can fake it,
// and so a second provider is a new class, not a rewrite.
export class AnthropicLLM implements LLM {
  private client: Anthropic;
  constructor(
    private model = process.env.PRAXIS_MODEL ?? "claude-sonnet-5",
    apiKey = process.env.ANTHROPIC_API_KEY,
  ) {
    if (!apiKey) throw new LLMError("ANTHROPIC_API_KEY is not set.");
    this.client = new Anthropic({ apiKey });
  }

  async generate<T>(args: {
    system: string;
    user: string;
    schema: z.ZodType<T>;
    toolName: string;
    maxTokens?: number;
  }): Promise<T> {
    const { $schema: _omit, ...inputSchema } = z.toJSONSchema(args.schema) as Record<string, unknown>;

    const res = await this.client.messages.create({
      model: this.model,
      max_tokens: args.maxTokens ?? 4000,
      system: args.system,
      messages: [{ role: "user", content: args.user }],
      tools: [
        {
          name: args.toolName,
          description: "Return the result. This is the only way to answer.",
          input_schema: inputSchema as Anthropic.Tool.InputSchema,
        },
      ],
      tool_choice: { type: "tool", name: args.toolName },
    });

    const block = res.content.find((b) => b.type === "tool_use");
    if (!block || block.type !== "tool_use") {
      throw new LLMError("Model returned no structured output.");
    }
    const parsed = args.schema.safeParse(block.input);
    if (!parsed.success) {
      throw new LLMError(`Model output failed validation: ${parsed.error.message}`);
    }
    return parsed.data;
  }
}
