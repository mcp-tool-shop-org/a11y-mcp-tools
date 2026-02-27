# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | Yes       |
| < 1.0   | No        |

## Reporting a Vulnerability

**Email:** 64996768+mcp-tool-shop@users.noreply.github.com

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

**Response timeline:**
- Acknowledgment: within 48 hours
- Assessment: within 7 days
- Fix (if confirmed): within 30 days

## Scope

a11y-mcp-tools is an **MCP server** that:
- **Reads:** HTML files from disk for accessibility evidence capture. DOM snapshots for diagnosis.
- **Writes:** Evidence bundles and diagnosis reports as JSON to specified output paths.
- **Does NOT:** make network requests, collect telemetry, store user data, or access credentials.

### Security Properties

| Property | Implementation |
|----------|---------------|
| Input validation | Schema-validated evidence bundles and diagnosis outputs |
| No network egress | Entirely local — no HTTP calls, no telemetry |
| No secrets | Does not read or process credentials, tokens, or keys |
| File operations | Constrained to specified input/output paths |
| Structured errors | MCP tool error responses, no raw stack traces to client |
