export type ShellContext = {
  sessionId: string;
  sessionFile?: string;
  provider?: string;
  model?: string;
  reasoningLevel: string;
};

export function injectOmpShellContext(
  environment: Record<string, string> | undefined,
  context: ShellContext,
): Record<string, string> {
  const result: Record<string, string> = {
    ...environment,
    OMP_CODING_AGENT: "true",
    OMP_SESSION_ID: context.sessionId,
    OMP_PROVIDER: context.provider ?? "unknown",
    OMP_MODEL: context.model ?? "unknown",
    OMP_REASONING_LEVEL: context.reasoningLevel,
  };

  if (context.sessionFile) result.OMP_SESSION_FILE = context.sessionFile;
  else delete result.OMP_SESSION_FILE;

  return result;
}
