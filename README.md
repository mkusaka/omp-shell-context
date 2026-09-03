# OMP Shell Context

[![CI](https://github.com/mkusaka/omp-shell-context/actions/workflows/ci.yml/badge.svg)](https://github.com/mkusaka/omp-shell-context/actions/workflows/ci.yml)

Oh My Pi plugin that exposes an OMP-prefixed shell-context contract to LLM-callable Bash and PowerShell commands.

## Install

After the package is published to npm, install it globally and restart Oh My Pi:

```sh
omp install npm:omp-shell-context
```

For local development:

```sh
pnpm install
omp -e ./src/index.ts
```

## Shell contract

The plugin injects these variables immediately before every LLM-callable `bash` or `powershell` tool command:

| Variable              | Value                                                     |
| --------------------- | --------------------------------------------------------- |
| `OMP_CODING_AGENT`    | `true`                                                    |
| `OMP_SESSION_ID`      | Current OMP session ID                                    |
| `OMP_SESSION_FILE`    | Absolute session JSONL path; unset for ephemeral sessions |
| `OMP_PROVIDER`        | Currently selected model provider                         |
| `OMP_MODEL`           | Currently selected model ID                               |
| `OMP_REASONING_LEVEL` | Current reasoning level                                   |

The runtime context overrides a caller-supplied value. For ephemeral sessions, `OMP_SESSION_FILE` is removed so a child process cannot inherit a stale path.

This is the OMP-namespaced counterpart to Pi's native `PI_CODING_AGENT`, `PI_SESSION_ID`, `PI_SESSION_FILE`, `PI_PROVIDER`, `PI_MODEL`, and `PI_REASONING_LEVEL` contract. Upstream Pi already injects its own `PI_*` variables; this package is for OMP, which does not natively inject equivalent `OMP_*` values.

The plugin does not affect user-entered `!` or `!!` commands. It does not inject credentials, task identifiers, Git metadata, or other derived state.

## Release and trusted publishing

`publish.yml` publishes tags matching `v*.*.*` to npm using GitHub Actions OIDC. It uses no `NPM_TOKEN` or other repository secret.

npm trusted publishers can only be configured for an existing npm package. Because `omp-shell-context` is not yet published, bootstrap it once from an authenticated developer machine:

```sh
pnpm install --frozen-lockfile
pnpm run check
npm publish --access public
```

Then configure npm at [package settings](https://www.npmjs.com/package/omp-shell-context/access):

- **Publisher:** GitHub Actions
- **Organization or user:** `mkusaka`
- **Repository:** `omp-shell-context`
- **Workflow filename:** `publish.yml`
- **Environment:** leave empty
- **Allowed action:** `npm publish`

Subsequent releases must have a package version matching the tag. Commit the version change, then create and push the matching tag:

```sh
git tag v0.1.0
git push origin main --tags
```

The release workflow checks this match, runs the same quality gate as CI, and invokes `npm publish --provenance --access public` through npm OIDC.

## Development

```sh
pnpm install
pnpm run check
```

`pnpm run check` runs formatting, linting, TypeScript validation, and unit tests. `pnpm pack --dry-run` verifies the npm archive contents.
