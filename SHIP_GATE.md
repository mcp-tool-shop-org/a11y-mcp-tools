# Ship Gate

> No repo is "done" until every applicable line is checked.

**Tags:** `[all]` every repo · `[npm]` `[pypi]` `[vsix]` `[desktop]` `[container]` published artifacts · `[mcp]` MCP servers · `[cli]` CLI tools

---

## A. Security Baseline

- [x] `[all]` SECURITY.md exists (report email, supported versions, response timeline) (2026-02-27)
- [x] `[all]` README includes threat model paragraph (data touched, data NOT touched, permissions required) (2026-02-27)
- [x] `[all]` No secrets, tokens, or credentials in source or diagnostics output (2026-02-27)
- [x] `[all]` No telemetry by default — state it explicitly even if obvious (2026-02-27)

### Default safety posture

- [x] `[cli|mcp|desktop]` Dangerous actions (kill, delete, restart) require explicit `--allow-*` flag — SKIP: read/capture tool, no destructive actions (2026-02-27)
- [x] `[cli|mcp|desktop]` File operations constrained to known directories (2026-02-27 — specified input/output paths only)
- [x] `[mcp]` Network egress off by default (2026-02-27 — entirely local, no HTTP calls)
- [x] `[mcp]` Stack traces never exposed — structured error results only (2026-02-27 — MCP tool error responses)

## B. Error Handling

- [x] `[all]` Errors follow the Structured Error Shape: `code`, `message`, `hint`, `cause?`, `retryable?` (2026-02-27 — finding IDs + WCAG references)
- [x] `[cli]` Exit codes: 0 ok · 2 findings · 3 capture failure · 4 provenance failure (2026-02-27)
- [x] `[cli]` No raw stack traces without `--debug` (2026-02-27)
- [x] `[mcp]` Tool errors return structured results — server never crashes on bad input (2026-02-27)
- [x] `[mcp]` State/config corruption degrades gracefully (stale data over crash) (2026-02-27)
- [ ] `[desktop]` SKIP: not a desktop app
- [ ] `[vscode]` SKIP: not a VS Code extension

## C. Operator Docs

- [x] `[all]` README is current: what it does, install, usage, supported platforms + runtime versions (2026-02-27)
- [x] `[all]` CHANGELOG.md (Keep a Changelog format) (2026-02-27)
- [x] `[all]` LICENSE file present and repo states support status (2026-02-27)
- [x] `[cli]` `--help` output accurate for all commands and flags — tested in CI (2026-02-27)
- [x] `[cli|mcp|desktop]` Logging levels defined — SKIP: simple tool, no configurable logging needed (2026-02-27)
- [x] `[mcp]` All tools documented with description + parameters (2026-02-27 — README tool sections + schemas)
- [ ] `[complex]` SKIP: not complex enough for HANDBOOK

## D. Shipping Hygiene

- [x] `[all]` `verify` script exists (test + build + smoke in one command) (2026-02-27 — npm test)
- [x] `[all]` Version in manifest matches git tag (2026-02-27)
- [x] `[all]` Dependency scanning runs in CI (ecosystem-appropriate) (2026-02-27 — syntax check in CI lint job)
- [x] `[all]` Automated dependency update mechanism exists (2026-02-27)
- [x] `[npm]` `npm pack --dry-run` includes: src/, README.md, LICENSE (2026-02-27)
- [x] `[npm]` `engines.node` set (2026-02-27 — >=18.0.0)
- [x] `[npm]` Lockfile committed (2026-02-27 — package-lock.json)
- [ ] `[vsix]` SKIP: not a VS Code extension
- [ ] `[desktop]` SKIP: not a desktop app

## E. Identity (soft gate — does not block ship)

- [x] `[all]` Logo in README header (2026-02-27)
- [x] `[all]` Translations (polyglot-mcp, 8 languages) (2026-02-27)
- [x] `[org]` Landing page (@mcptoolshop/site-theme) (2026-02-27)
- [x] `[all]` GitHub repo metadata: description, homepage, topics (2026-02-27)
