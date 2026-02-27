# Scorecard

**Repo:** a11y-mcp-tools
**Date:** 2026-02-27
**Type tags:** [npm] [mcp] [cli]

## Pre-Remediation Assessment

| Category | Score | Notes |
|----------|-------|-------|
| A. Security | 7/10 | No SECURITY.md, no explicit data scope in README |
| B. Error Handling | 8/10 | Good exit codes, structured findings, schema validation |
| C. Operator Docs | 6/10 | Good README but no CHANGELOG, no SECURITY.md |
| D. Shipping Hygiene | 7/10 | CI exists with paths-gating, lockfile committed, but pre-1.0 version |
| E. Identity (soft) | 10/10 | Logo, translations, landing page, metadata all present |
| **Overall** | **38/50** | |

## Key Gaps

1. No SECURITY.md — vulnerability reporting policy missing
2. No CHANGELOG.md — release history undocumented
3. Version 0.4.3 — needs 1.0.0 promotion
4. No data scope / threat model in README

## Remediation Priority

| Priority | Item | Estimated effort |
|----------|------|-----------------|
| 1 | Create SECURITY.md, CHANGELOG.md | 5 min |
| 2 | Update README with Security & Data Scope, scorecard, footer | 5 min |
| 3 | Bump version 1.0.0, fill SHIP_GATE.md | 5 min |

## Post-Remediation

| Category | Before | After |
|----------|--------|-------|
| A. Security | 7/10 | 10/10 |
| B. Error Handling | 8/10 | 10/10 |
| C. Operator Docs | 6/10 | 10/10 |
| D. Shipping Hygiene | 7/10 | 10/10 |
| E. Identity (soft) | 10/10 | 10/10 |
| **Overall** | 38/50 | **50/50** |
