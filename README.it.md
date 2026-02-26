<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/mcp-tool-shop-org/brand/main/logos/a11y-mcp-tools/readme.png" alt="a11y-mcp-tools" width="400">
</p>

<p align="center">
  <a href="https://github.com/mcp-tool-shop-org/a11y-mcp-tools/actions/workflows/ci.yml"><img src="https://github.com/mcp-tool-shop-org/a11y-mcp-tools/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://www.npmjs.com/package/@mcptoolshop/a11y-mcp-tools"><img src="https://img.shields.io/npm/v/@mcptoolshop/a11y-mcp-tools" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License"></a>
  <a href="https://mcp-tool-shop-org.github.io/a11y-mcp-tools/"><img src="https://img.shields.io/badge/Landing_Page-live-blue" alt="Landing Page"></a>
</p>

**Strumenti MCP per la raccolta e la diagnosi di elementi di accessibilità.**

---

## Strumenti

### `a11y.evidence`

Acquisisce pacchetti di dati (evidence) immutabili da file HTML, log della riga di comando o altre fonti.

**Funzionalità:**
- Normalizzazione HTML canonica
- Estrazione di snapshot del DOM
- Calcolo degli hash di integrità SHA-256
- Registri di provenienza conformi allo standard prov-spec

### `a11y.diagnose`

Esegue controlli di accessibilità deterministici sui pacchetti di dati.

**Funzionalità:**
- Verifica delle regole WCAG 2.2 AA
- Risultati (findings) ancorati ai dati (JSON Pointer, selettore CSS, intervalli di riga)
- Suggerimenti per la correzione basati su modifiche "SAFE" (patch di intento, non scritture dirette)
- Verifica della provenienza

---

## Installazione

```bash
npm install -g @mcptoolshop/a11y-mcp-tools
```

---

## Utilizzo

### Riga di comando (CLI) (Consigliato)

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

**Codici di uscita (compatibili con CI):**
- `0` - Successo (nessun risultato trovato o al di sopra di `--fail-on`)
- `2` - Risultati trovati (lo strumento ha avuto successo, ma sono stati rilevati problemi)
- `3` - Errore di acquisizione/validazione (input non valido, errore di schema)
- `4` - Verifica della provenienza fallita (mancanza di corrispondenza dell'hash)

### Come server MCP

```bash
a11y-mcp
```

---

## Regole WCAG (v0.1)

| Rule | ID del risultato | WCAG | Descrizione |
| ------ | ----------- | ------ | ------------- |
| `lang` | `a11y.lang.missing` | 3.1.1 | Attributo "lang" mancante nell'elemento HTML |
| `alt` | `a11y.img.missing_alt` | 1.1.1 | Attributo "alt" mancante nell'elemento "img" |
| `button-name` | `a11y.button.missing_name` | 4.1.2 | Pulsante senza nome accessibile |
| `link-name` | `a11y.link.missing_name` | 4.1.2 | Link senza nome accessibile |
| `label` | `a11y.input.missing_label` | 1.3.1 | Input di un modulo senza etichetta |

---

## Catalogo degli ID dei metodi (v0.1)

ID dei metodi stabili per il tracciamento della provenienza. Consultare [PROV_METHODS_CATALOG.md](PROV_METHODS_CATALOG.md) per la documentazione completa.

| ID del metodo | Descrizione |
| ----------- | ------------- |
| `adapter.wrap.envelope_v0_1` | Inclusione in un involucro MCP |
| `adapter.provenance.record_v0_1` | Creazione di un record di provenienza |
| `adapter.integrity.sha256_v0_1` | Verifica dell'integrità SHA-256 |
| `engine.capture.html_canonicalize_v0_1` | Acquisizione di HTML con canonizzazione |
| `engine.capture.dom_snapshot_v0_1` | Estrazione di snapshot del DOM |
| `engine.diagnose.wcag_rules_v0_1` | Valutazione delle regole WCAG |
| `engine.extract.evidence.json_pointer_v0_1` | Estrazione di evidenze tramite JSON Pointer |
| `engine.extract.evidence.selector_v0_1` | Estrazione di evidenze tramite selettore CSS |

---

## Schemi

Sono forniti schemi JSON per la validazione:

- [`envelope.schema.v0.1.json`](src/schemas/envelope.schema.v0.1.json) - Formato dell'involucro MCP
- [`evidence.bundle.schema.v0.1.json`](src/schemas/evidence.bundle.schema.v0.1.json) - Formato del pacchetto di dati
- [`diagnosis.schema.v0.1.json`](src/schemas/diagnosis.schema.v0.1.json) - Formato dell'output della diagnosi

---

## Correlati

- [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) - Specifiche di provenienza
- [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) - Scanner della riga di comando
- [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) - Consigliatore per la correzione
- [a11y-demo-site](https://github.com/mcp-tool-shop-org/a11y-demo-site) - Demo con flussi di lavoro CI

---

## Licenza

[MIT](LICENSE)
