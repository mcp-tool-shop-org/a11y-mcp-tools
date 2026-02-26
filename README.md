<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
</p>

<p align="center">
  
            <img src="https://raw.githubusercontent.com/mcp-tool-shop-org/brand/main/logos/a11y-mcp-tools/readme.png"
           alt="a11y-mcp-tools" width="400">
</p>

<p align="center">
  <a href="https://github.com/mcp-tool-shop-org/a11y-mcp-tools/actions/workflows/ci.yml"><img src="https://github.com/mcp-tool-shop-org/a11y-mcp-tools/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://www.npmjs.com/package/@mcptoolshop/a11y-mcp-tools"><img src="https://img.shields.io/npm/v/@mcptoolshop/a11y-mcp-tools" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License"></a>
  <a href="https://mcp-tool-shop-org.github.io/a11y-mcp-tools/"><img src="https://img.shields.io/badge/Landing_Page-live-blue" alt="Landing Page"></a>
</p>

**MCP tools for accessibility evidence capture and diagnosis.**

---

## Tools

### `a11y.evidence`

Capture tamper-evident evidence bundles from HTML files, CLI logs, or other inputs.

**Capabilities:**
- Canonical HTML normalization
- DOM snapshot extraction
- SHA-256 integrity digests
- prov-spec provenance records

### `a11y.diagnose`

Run deterministic accessibility checks over evidence bundles.

**Capabilities:**
- WCAG 2.2 AA rule checking
- Evidence-anchored findings (JSON Pointer, CSS selector, line spans)
- SAFE-only fix guidance (intent patches, not direct writes)
- Provenance verification

---

## Installation

```bash
npm install -g @mcptoolshop/a11y-mcp-tools
```

---

## Usage

### CLI (Recommended)

```bash
# Capture evidence from HTML file
a11y evidence --target index.html --dom-snapshot --out evidence.json

# Diagnose captured evidence
a11y diagnose --bundle evidence.json --fix

# With provenance verification
a11y diagnose --bundle evidence.json --verify-provenance --fix

# Output with MCP envelope
a11y evidence --target page.html --dom-snapshot --envelope

# One-liner capture and diagnose
a11y evidence --target page.html --dom-snapshot | a11y diagnose --fix
```

**Exit Codes (CI-native):**
- `0` - Success (no findings at/above `--fail-on`)
- `2` - Findings exist (tool succeeded, but issues found)
- `3` - Capture/validation failure (bad input, schema error)
- `4` - Provenance verification failed (digest mismatch)

### As MCP Server

```bash
a11y-mcp
```

---

## WCAG Rules (v0.1)

| Rule | Finding ID | WCAG | Description |
|------|-----------|------|-------------|
| `lang` | `a11y.lang.missing` | 3.1.1 | Missing lang attribute on html element |
| `alt` | `a11y.img.missing_alt` | 1.1.1 | Missing alt attribute on img element |
| `button-name` | `a11y.button.missing_name` | 4.1.2 | Button without accessible name |
| `link-name` | `a11y.link.missing_name` | 4.1.2 | Link without accessible name |
| `label` | `a11y.input.missing_label` | 1.3.1 | Form input without label |

---

## Method ID Catalog (v0.1)

Stable method IDs for provenance tracking. See [PROV_METHODS_CATALOG.md](PROV_METHODS_CATALOG.md) for full documentation.

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

---

## Schemas

JSON Schemas are provided for validation:

- [`envelope.schema.v0.1.json`](src/schemas/envelope.schema.v0.1.json) - MCP envelope format
- [`evidence.bundle.schema.v0.1.json`](src/schemas/evidence.bundle.schema.v0.1.json) - Evidence bundle format
- [`diagnosis.schema.v0.1.json`](src/schemas/diagnosis.schema.v0.1.json) - Diagnosis output format

---

## Related

- [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) - Provenance specification
- [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) - CLI scanner
- [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) - Fix advisor
- [a11y-demo-site](https://github.com/mcp-tool-shop-org/a11y-demo-site) - Demo with CI workflows

---

## License

[MIT](LICENSE)
