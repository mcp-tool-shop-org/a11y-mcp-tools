# a11y-mcp-tools

MCP tools for accessibility evidence capture and diagnosis.

## What It Does

Provides two MCP tools — `a11y.evidence` for capturing tamper-evident evidence bundles from HTML, and `a11y.diagnose` for running deterministic WCAG 2.2 AA checks over those bundles. Works as both a CLI and an MCP server.

## Key Features

- **Evidence capture** — canonical HTML, DOM snapshots, SHA-256 digests
- **WCAG diagnosis** — rule-based checking with evidence-anchored findings
- **SAFE-only fixes** — intent patches, never direct writes
- **Provenance verification** — end-to-end integrity chain
- **CI-native exit codes** — 0 (clean), 2 (findings), 3 (failure), 4 (provenance mismatch)

## Install

```bash
npm install -g a11y-mcp-tools
```

## Quick Start

```bash
# Capture evidence
a11y evidence --target index.html --dom-snapshot --out evidence.json

# Diagnose
a11y diagnose --bundle evidence.json --fix
```

## Links

- [GitHub Repository](https://github.com/mcp-tool-shop-org/a11y-mcp-tools)
- [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) — CLI scanner
- [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) — Fix advisor
- [MCP Tool Shop](https://github.com/mcp-tool-shop-org)
