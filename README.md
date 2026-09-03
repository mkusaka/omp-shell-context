# OMP Shell Context

Oh My Pi plugin that exposes an OMP-prefixed shell-context contract to Bash and PowerShell commands.

## Install

Install from npm and restart Oh My Pi:

```sh
omp install npm:omp-shell-context
```

For local development:

```sh
pnpm install
omp -e ./src/index.ts
```

## Shell environment

The plugin injects these variables before every LLM-callable `bash` or `powershell` tool command:

| Variable              | Value                                                     |
| --------------------- | --------------------------------------------------------- |
| `OMP_CODING_AGENT`    | `true`                                                    |
| `OMP_SESSION_ID`      | Current session ID                                        |
| `OMP_SESSION_FILE`    | Absolute session JSONL path; unset for ephemeral sessions |
| `OMP_PROVIDER`        | Currently selected model provider                         |
| `OMP_MODEL`           | Currently selected model ID                               |
| `OMP_REASONING_LEVEL` | Current reasoning level                                   |

This mirrors Pi's built-in `PI_CODING_AGENT`, `PI_SESSION_ID`, `PI_SESSION_FILE`, `PI_PROVIDER`, `PI_MODEL`, and `PI_REASONING_LEVEL` contract without asserting that Oh My Pi is upstream Pi.

The current runtime context wins over an `env` value supplied in the tool call. `OMP_SESSION_FILE` is removed when the session is ephemeral so a nested process cannot read stale session metadata.

Upstream Pi already injects its native `PI_*` shell context by default. This plugin is for Oh My Pi, which otherwise does not inject corresponding `OMP_*` values.

The plugin does not inject variables into user-entered `!` or `!!` commands, and it does not provide credentials, task identifiers, git metadata, or other derived state.

## Development

```sh
pnpm install
pnpm run check
```

Run the local source as an extension:

```sh
omp -e ./src/index.ts
```
