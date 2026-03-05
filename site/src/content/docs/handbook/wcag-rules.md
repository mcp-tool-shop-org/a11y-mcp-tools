---
title: WCAG Rules
description: Rule catalog, method IDs, and schemas.
sidebar:
  order: 3
---

## Rules (v0.1)

| Rule | Finding ID | WCAG | Description |
|------|-----------|------|-------------|
| `lang` | `a11y.lang.missing` | 3.1.1 | Missing lang attribute on html element |
| `alt` | `a11y.img.missing_alt` | 1.1.1 | Missing alt attribute on img element |
| `button-name` | `a11y.button.missing_name` | 4.1.2 | Button without accessible name |
| `link-name` | `a11y.link.missing_name` | 4.1.2 | Link without accessible name |
| `label` | `a11y.input.missing_label` | 1.3.1 | Form input without label |

## Method ID catalog (v0.1)

Stable method IDs for provenance tracking:

| Method ID | Description |
|-----------|-------------|
| `adapter.wrap.envelope_v0_1` | Wrap in MCP envelope |
| `adapter.provenance.record_v0_1` | Provenance record creation |
| `adapter.integrity.sha256_v0_1` | SHA-256 integrity verification |
| `engine.capture.html_canonicalize_v0_1` | HTML capture with canonicalization |
| `engine.capture.dom_snapshot_v0_1` | DOM snapshot extraction |
| `engine.diagnose.wcag_rules_v0_1` | WCAG rule evaluation |
| `engine.extract.evidence.json_pointer_v0_1` | JSON Pointer evidence extraction |
| `engine.extract.evidence.selector_v0_1` | CSS selector evidence extraction |

## Schemas

JSON Schemas are provided for validation:

- `envelope.schema.v0.1.json` — MCP envelope format
- `evidence.bundle.schema.v0.1.json` — Evidence bundle format
- `diagnosis.schema.v0.1.json` — Diagnosis output format
