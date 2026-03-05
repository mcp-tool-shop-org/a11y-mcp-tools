---
title: Reference
description: Provenance, related tools, and security.
sidebar:
  order: 4
---

## Provenance

Each evidence bundle includes prov-spec provenance records that are independently verifiable. This allows external auditors to confirm findings without trusting the engine.

## Related tools

| Tool | Description |
|------|-------------|
| [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) | Provenance specification |
| [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) | CLI scanner |
| [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) | Fix advisor |
| [a11y-ci](https://github.com/mcp-tool-shop-org/a11y-ci) | CI gate for scorecards |
| [a11y-lint](https://github.com/mcp-tool-shop-org/a11y-lint) | Accessibility linter |
| [a11y-demo-site](https://github.com/mcp-tool-shop-org/a11y-demo-site) | Demo with CI workflows |

## Security and data scope

- **Data accessed:** Reads HTML files from disk for evidence capture. Processes DOM snapshots for accessibility diagnosis
- **Data NOT accessed:** No network requests. No telemetry. No user data storage. No credentials or tokens
- **Permissions required:** Read access to target HTML files. Write access for evidence bundle output
