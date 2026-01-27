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

### As MCP Server

```bash
a11y-mcp
```

### Tool Requests

**Evidence capture:**
```json
{
  "tool": "a11y.evidence",
  "input": {
    "targets": [
      { "kind": "file", "path": "html/index.html" }
    ],
    "capture": {
      "html": { "canonicalize": true }
    },
    "integrity": {
      "hash": "sha256"
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
    "profile": "wcag-2.2-aa",
    "output": {
      "include_fix_guidance": true,
      "include_evidence": true
    }
  }
}
```

## Shared Artifact Model

Both tools work with a shared artifact/provenance model:

- **Artifacts**: Captured content with digests and metadata
- **Evidence Anchors**: Pointers back to artifact locations (JSON Pointer, selector, line span)
- **Provenance**: prov-spec records documenting capture and analysis

## Related

- [prov-spec](https://github.com/mcp-tool-shop/prov-spec) - Provenance specification
- [a11y-evidence-engine](https://github.com/mcp-tool-shop/a11y-evidence-engine) - CLI scanner
- [a11y-assist](https://github.com/mcp-tool-shop/a11y-assist) - Fix advisor

## License

MIT
