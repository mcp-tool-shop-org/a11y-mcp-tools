---
title: Tools
description: a11y.evidence and a11y.diagnose in detail.
sidebar:
  order: 2
---

## a11y.evidence

Capture tamper-evident evidence bundles from HTML files, CLI logs, or other inputs.

**Capabilities:**

- Canonical HTML normalization
- DOM snapshot extraction
- SHA-256 integrity digests
- prov-spec provenance records

**CLI usage:**

```bash
a11y evidence --target index.html --dom-snapshot --out evidence.json
```

## a11y.diagnose

Run deterministic accessibility checks over evidence bundles.

**Capabilities:**

- WCAG 2.2 AA rule checking
- Evidence-anchored findings (JSON Pointer, CSS selector, line spans)
- SAFE-only fix guidance (intent patches, not direct writes)
- Provenance verification

**CLI usage:**

```bash
a11y diagnose --bundle evidence.json --fix
```

## Exit codes

| Code | Meaning |
|------|---------|
| `0` | No findings at/above `--fail-on` |
| `2` | Findings exist (tool succeeded, but issues found) |
| `3` | Capture/validation failure (bad input, schema error) |
| `4` | Provenance verification failed (digest mismatch) |
