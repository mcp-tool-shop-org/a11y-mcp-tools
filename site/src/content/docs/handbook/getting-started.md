---
title: Getting Started
description: Install, capture evidence, diagnose findings.
sidebar:
  order: 1
---

## Install

```bash
npm install -g @accessibility-suite/mcp-tools
```

## Capture evidence

```bash
# From an HTML file
a11y evidence --target index.html --dom-snapshot --out evidence.json

# With MCP envelope
a11y evidence --target page.html --dom-snapshot --envelope
```

## Diagnose findings

```bash
# Diagnose captured evidence
a11y diagnose --bundle evidence.json --fix

# With provenance verification
a11y diagnose --bundle evidence.json --verify-provenance --fix

# Pipeline: capture and diagnose in one step
a11y evidence --target page.html --dom-snapshot | a11y diagnose --fix
```

## As MCP server

```bash
a11y-mcp
```

Add to your MCP client config:

```json
{
  "mcpServers": {
    "a11y": {
      "command": "npx",
      "args": ["-y", "@accessibility-suite/mcp-tools"]
    }
  }
}
```
