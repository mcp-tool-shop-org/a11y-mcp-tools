# a11y-mcp-tools

MCP (Model Context Protocol) tools for accessibility evidence capture and diagnosis.

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

## Installation

```bash
npm install -g a11y-mcp-tools
```

## Usage

### CLI (Recommended)

```bash
# Capture evidence from HTML file
a11y evidence --target index.html --dom-snapshot --out evidence.json

# Diagnose captured evidence
a11y diagnose --bundle evidence.json --fix

# One-liner capture and diagnose
a11y evidence --target page.html --dom-snapshot | a11y diagnose --fix
```

**Exit Codes:**
- `0` - Success (no findings)
- `1` - Error
- `2` - Findings detected

### As MCP Server

```bash
a11y-mcp
```

### MCP Tool Requests

**Evidence capture:**
```json
{
  "tool": "a11y.evidence",
  "input": {
    "targets": [
      { "kind": "file", "path": "html/index.html" }
    ],
    "capture": {
      "html": { "canonicalize": true },
      "dom": { "snapshot": true }
    }
  }
}
```

**Diagnosis:**
```json
{
  "tool": "a11y.diagnose",
  "input": {
    "bundle_id": "bundle-uuid",
    "rules": { "include": ["lang", "alt", "button-name"] },
    "output": {
      "include_fix_guidance": true
    }
  }
}
```

## Schemas

JSON Schemas are provided for validation:

- [`evidence.bundle.schema.v0.1.json`](src/schemas/evidence.bundle.schema.v0.1.json) - Evidence bundle format
- [`diagnosis.schema.v0.1.json`](src/schemas/diagnosis.schema.v0.1.json) - Diagnosis output format

## Method ID Catalog (v0.1)

Stable method IDs for provenance tracking:

| Method ID | Description |
|-----------|-------------|
| `engine.capture.html_canonicalize_v0_1` | HTML capture with canonicalization |
| `engine.capture.dom_snapshot_v0_1` | DOM snapshot extraction |
| `adapter.integrity.sha256_v0_1` | SHA-256 integrity verification |
| `adapter.provenance.record_v0_1` | Provenance record creation |
| `engine.diagnose.wcag_rules_v0_1` | WCAG rule evaluation |
| `engine.extract.evidence.json_pointer_v0_1` | JSON Pointer evidence extraction |
| `engine.extract.evidence.selector_v0_1` | CSS selector evidence extraction |

## Shared Artifact Model

Both tools work with a shared artifact/provenance model:

- **Artifacts**: Captured content with digests and metadata
- **Evidence Anchors**: Pointers back to artifact locations (JSON Pointer, selector, line span)
- **Provenance**: prov-spec records documenting capture and analysis

## WCAG Rules (v0.1)

| Rule | Finding ID | WCAG | Description |
|------|-----------|------|-------------|
| `lang` | `a11y.lang.missing` | 3.1.1 | Missing lang attribute on html element |
| `alt` | `a11y.img.missing_alt` | 1.1.1 | Missing alt attribute on img element |
| `button-name` | `a11y.button.missing_name` | 4.1.2 | Button without accessible name |
| `link-name` | `a11y.link.missing_name` | 4.1.2 | Link without accessible name |
| `label` | `a11y.input.missing_label` | 1.3.1 | Form input without label |

## Related

- [prov-spec](https://github.com/mcp-tool-shop/prov-spec) - Provenance specification
- [a11y-evidence-engine](https://github.com/mcp-tool-shop/a11y-evidence-engine) - CLI scanner
- [a11y-assist](https://github.com/mcp-tool-shop/a11y-assist) - Fix advisor
- [a11y-demo-site](https://github.com/mcp-tool-shop/a11y-demo-site) - Demo with CI workflows

## License

MIT
