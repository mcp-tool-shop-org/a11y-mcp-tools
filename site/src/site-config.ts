import type { SiteConfig } from '@mcptoolshop/site-theme';

export const config: SiteConfig = {
  title: 'a11y-mcp-tools',
  description: 'MCP tools for accessibility evidence capture and diagnosis',
  logoBadge: 'A11Y',
  brandName: 'a11y-mcp-tools',
  repoUrl: 'https://github.com/mcp-tool-shop-org/a11y-mcp-tools',
  npmUrl: 'https://www.npmjs.com/package/@mcptoolshop/a11y-mcp-tools',
  footerText: 'MIT Licensed \u2014 built by <a href="https://github.com/mcp-tool-shop-org" style="color:var(--color-muted);text-decoration:underline">mcp-tool-shop-org</a>',

  hero: {
    badge: 'Node.js / MCP',
    headline: 'a11y-mcp-tools,',
    headlineAccent: 'accessibility with evidence.',
    description: 'MCP tools for accessibility evidence capture and diagnosis. Canonical HTML, DOM snapshots, SHA-256 digests, WCAG 2.2 AA rule checking, and prov-spec provenance \u2014 CLI and MCP server.',
    primaryCta: { href: '#quick-start', label: 'Get started' },
    secondaryCta: { href: '#features', label: 'Learn more' },
    previews: [
      { label: 'Install', code: 'npm install -g @mcptoolshop/a11y-mcp-tools' },
      { label: 'Capture', code: 'a11y evidence --target index.html --dom-snapshot' },
      { label: 'Diagnose', code: 'a11y diagnose --bundle evidence.json --fix' },
    ],
  },

  sections: [
    {
      kind: 'features',
      id: 'features',
      title: 'Why a11y-mcp-tools?',
      subtitle: 'Accessibility checks backed by tamper-evident evidence.',
      features: [
        { title: 'Evidence Capture', desc: 'Canonical HTML normalization, DOM snapshot extraction, SHA-256 integrity digests, and prov-spec provenance records.' },
        { title: 'WCAG Diagnosis', desc: 'Deterministic WCAG 2.2 AA rule checking with evidence-anchored findings via JSON Pointer, CSS selector, and line spans.' },
        { title: 'SAFE Fix Guidance', desc: 'Intent patches, not direct writes. Fix suggestions preserve developer control with SAFE-only guidance.' },
        { title: 'Provenance Built In', desc: 'Every capture and diagnosis produces prov-spec records. Verify the chain from HTML to findings.' },
        { title: 'CLI + MCP Server', desc: 'Run from the command line with pipeable output, or serve over MCP with structured envelope format.' },
        { title: 'CI-Native Exit Codes', desc: 'Exit 0 for clean, 2 for findings, 3 for capture failure, 4 for provenance mismatch. Drop into any pipeline.' },
      ],
    },
    {
      kind: 'code-cards',
      id: 'quick-start',
      title: 'Quick Start',
      cards: [
        {
          title: 'Capture & diagnose',
          code: 'npm install -g @mcptoolshop/a11y-mcp-tools\n\n# Capture evidence from HTML\na11y evidence --target index.html --dom-snapshot --out evidence.json\n\n# Diagnose with fix suggestions\na11y diagnose --bundle evidence.json --fix\n\n# One-liner pipeline\na11y evidence --target page.html --dom-snapshot | a11y diagnose --fix',
        },
        {
          title: 'With provenance',
          code: '# Verify provenance chain before diagnosis\na11y diagnose --bundle evidence.json --verify-provenance --fix\n\n# Output with MCP envelope\na11y evidence --target page.html --dom-snapshot --envelope\n\n# Run as MCP server\na11y-mcp',
        },
      ],
    },
    {
      kind: 'data-table',
      id: 'tools',
      title: 'Tools',
      subtitle: 'Two tools that compose through a shared artifact model.',
      columns: ['Tool', 'Purpose'],
      rows: [
        ['a11y.evidence', 'Capture tamper-evident evidence bundles from HTML, CLI logs, or other inputs'],
        ['a11y.diagnose', 'Run deterministic WCAG checks over evidence bundles with fix guidance'],
      ],
    },
    {
      kind: 'data-table',
      id: 'wcag-rules',
      title: 'WCAG Rules',
      subtitle: 'Deterministic checks against WCAG 2.2 AA.',
      columns: ['Finding ID', 'WCAG', 'Description'],
      rows: [
        ['a11y.lang.missing', '3.1.1', 'Missing lang attribute on html element'],
        ['a11y.img.missing_alt', '1.1.1', 'Missing alt attribute on img element'],
        ['a11y.button.missing_name', '4.1.2', 'Button without accessible name'],
        ['a11y.link.missing_name', '4.1.2', 'Link without accessible name'],
        ['a11y.input.missing_label', '1.3.1', 'Form input without label'],
      ],
    },
    {
      kind: 'data-table',
      id: 'exit-codes',
      title: 'Exit Codes',
      subtitle: 'CI-native status reporting.',
      columns: ['Code', 'Meaning'],
      rows: [
        ['0', 'Success \u2014 no findings at or above --fail-on threshold'],
        ['2', 'Findings exist \u2014 tool succeeded, but accessibility issues found'],
        ['3', 'Capture/validation failure \u2014 bad input, schema error'],
        ['4', 'Provenance verification failed \u2014 digest mismatch'],
      ],
    },
    {
      kind: 'data-table',
      id: 'methods',
      title: 'Provenance Method IDs',
      subtitle: 'Stable method IDs for provenance tracking.',
      columns: ['Method ID', 'Description'],
      rows: [
        ['adapter.wrap.envelope_v0_1', 'Wrap in MCP envelope'],
        ['adapter.provenance.record_v0_1', 'Provenance record creation'],
        ['adapter.integrity.sha256_v0_1', 'SHA-256 integrity verification'],
        ['engine.capture.html_canonicalize_v0_1', 'HTML capture with canonicalization'],
        ['engine.capture.dom_snapshot_v0_1', 'DOM snapshot extraction'],
        ['engine.diagnose.wcag_rules_v0_1', 'WCAG rule evaluation'],
      ],
    },
  ],
};
