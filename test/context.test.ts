import assert from "node:assert/strict";
import test from "node:test";
import { injectOmpShellContext } from "../src/context.ts";

test("injects OMP shell context over caller supplied values", () => {
  assert.deepEqual(
    injectOmpShellContext(
      {
        KEEP: "value",
        OMP_SESSION_ID: "stale",
        OMP_SESSION_FILE: "/stale.jsonl",
      },
      {
        sessionId: "session-1",
        sessionFile: "/sessions/session-1.jsonl",
        provider: "openai-codex",
        model: "gpt-5.6",
        reasoningLevel: "high",
      },
    ),
    {
      KEEP: "value",
      OMP_CODING_AGENT: "true",
      OMP_MODEL: "gpt-5.6",
      OMP_PROVIDER: "openai-codex",
      OMP_REASONING_LEVEL: "high",
      OMP_SESSION_FILE: "/sessions/session-1.jsonl",
      OMP_SESSION_ID: "session-1",
    },
  );
});

test("removes a stale session file for ephemeral sessions", () => {
  assert.deepEqual(
    injectOmpShellContext(
      { OMP_SESSION_FILE: "/stale.jsonl" },
      { sessionId: "session-2", reasoningLevel: "minimal" },
    ),
    {
      OMP_CODING_AGENT: "true",
      OMP_MODEL: "unknown",
      OMP_PROVIDER: "unknown",
      OMP_REASONING_LEVEL: "minimal",
      OMP_SESSION_ID: "session-2",
    },
  );
});
