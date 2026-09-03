import { type ExtensionAPI, isToolCallEventType } from "@earendil-works/pi-coding-agent";
import { injectOmpShellContext } from "./context.js";

type ShellToolInput = {
  env?: Record<string, string>;
};

export default function ompShellContext(pi: ExtensionAPI): void {
  pi.on("tool_call", (event, ctx) => {
    if (!isToolCallEventType("bash", event) && !isToolCallEventType("powershell", event)) return;

    const input = event.input as typeof event.input & ShellToolInput;
    input.env = injectOmpShellContext(input.env, {
      sessionId: ctx.sessionManager.getSessionId(),
      sessionFile: ctx.sessionManager.getSessionFile(),
      provider: ctx.model?.provider,
      model: ctx.model?.id,
      reasoningLevel: pi.getThinkingLevel(),
    });
  });
}
