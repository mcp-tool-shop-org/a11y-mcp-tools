<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.md">English</a> | <a href="README.pt-BR.md">Português (BR)</a>
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

**Strumenti MCP per la raccolta e la diagnosi di evidenze di accessibilità.**

---

## Strumenti

### `a11y.evidence`

Acquisisce pacchetti di evidenze protette da manomissioni da file HTML, log della riga di comando o altre fonti.

**Funzionalità:**
- Normalizzazione HTML canonica
- Estrazione di snapshot del DOM
- Calcoli di integrità SHA-256
- Registri di provenienza conformi allo standard prov-spec

### `a11y.diagnose`

Esegue controlli deterministici di accessibilità sui pacchetti di evidenze.

**Funzionalità:**
- Verifica delle regole WCAG 2.2 AA
- Risultati ancorati alle evidenze (JSON Pointer, selettore CSS, intervalli di riga)
- Suggerimenti per la correzione basati solo su modifiche sicure (patch di intento, non scritture dirette)
- Verifica della provenienza

---

## Installazione

```bash
npm install -g @mcptoolshop/a11y-mcp-tools
```

---

## Utilizzo

### Riga di comando (consigliato)

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
- `0` - Successo (nessun risultato trovato o superiore alla soglia `--fail-on`)
- `2` - Risultati trovati (lo strumento ha avuto successo, ma sono stati rilevati problemi)
- `3` - Errore di acquisizione/validazione (input non valido, errore di schema)
- `4` - Verifica della provenienza fallita (mancanza di corrispondenza dell'hash)

### Come server MCP

```bash
a11y-mcp
```

---

## Regole WCAG (v0.1)

| Regola | ID del risultato | WCAG | Descrizione |
|------|-----------|------|-------------|
| `lang` | `a11y.lang.missing` | 3.1.1 | Attributo "lang" mancante nell'elemento HTML |
| `alt` | `a11y.img.missing_alt` | 1.1.1 | Attributo "alt" mancante nell'elemento "img" |
| `button-name` | `a11y.button.missing_name` | 4.1.2 | Pulsante senza nome accessibile |
| `link-name` | `a11y.link.missing_name` | 4.1.2 | Link senza nome accessibile |
| `label` | `a11y.input.missing_label` | 1.3.1 | Campo di input del modulo senza etichetta |

---

## Catalogo degli ID dei metodi (v0.1)

ID dei metodi stabili per il tracciamento della provenienza. Consultare [PROV_METHODS_CATALOG.md](PROV_METHODS_CATALOG.md) per la documentazione completa.

| ID del metodo | Descrizione |
|-----------|-------------|
| `adapter.wrap.envelope_v0_1` | Includere nell'involucro MCP |
| `adapter.provenance.record_v0_1` | Creazione del registro di provenienza |
| `adapter.integrity.sha256_v0_1` | Verifica dell'integrità SHA-256 |
| `engine.capture.html_canonicalize_v0_1` | Acquisizione HTML con canonizzazione |
| `engine.capture.dom_snapshot_v0_1` | Estrazione di snapshot del DOM |
| `engine.diagnose.wcag_rules_v0_1` | Valutazione delle regole WCAG |
| `engine.extract.evidence.json_pointer_v0_1` | Estrazione di evidenze tramite JSON Pointer |
| `engine.extract.evidence.selector_v0_1` | Estrazione di evidenze tramite selettore CSS |

---

## Schemi

Sono forniti schemi JSON per la validazione:

- [`envelope.schema.v0.1.json`](src/schemas/envelope.schema.v0.1.json) - Formato dell'involucro MCP
- [`evidence.bundle.schema.v0.1.json`](src/schemas/evidence.bundle.schema.v0.1.json) - Formato del pacchetto di evidenze
- [`diagnosis.schema.v0.1.json`](src/schemas/diagnosis.schema.v0.1.json) - Formato dell'output della diagnosi

---

## Correlati

- [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) - Specifiche di provenienza
- [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) - Scanner della riga di comando
- [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) - Consigliatore per la correzione
- [a11y-demo-site](https://github.com/mcp-tool-shop-org/a11y-demo-site) - Dimostrazione con flussi di lavoro CI

---

## Sicurezza e ambito dei dati

- **Dati accessibili:** Legge i file HTML dal disco per l'acquisizione delle evidenze. Elabora gli snapshot del DOM per la diagnosi dell'accessibilità.
- **Dati NON accessibili:** Nessuna richiesta di rete. Nessuna telemetria. Nessun archivio di dati utente. Nessuna credenziale o token.
- **Autorizzazioni richieste:** Accesso in lettura ai file HTML di destinazione. Accesso in scrittura per l'output del pacchetto di evidenze.

## Tabella di valutazione

| Gate | Stato |
|------|--------|
| A. Baseline di sicurezza | PASS |
| B. Gestione degli errori | PASS |
| C. Documentazione per gli operatori | PASS |
| D. Igiene di distribuzione | PASS |
| E. Identità | PASS |

## Licenza

[MIT](LICENSE)

---

Creato da <a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a>
