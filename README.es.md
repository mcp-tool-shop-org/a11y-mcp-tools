<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/mcp-tool-shop-org/a11y-mcp-tools/main/assets/logo-a11y-mcp-tools.png" alt="a11y-mcp-tools" width="400">
</p>

<p align="center">
  <a href="https://github.com/mcp-tool-shop-org/a11y-mcp-tools/actions/workflows/ci.yml"><img src="https://github.com/mcp-tool-shop-org/a11y-mcp-tools/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://www.npmjs.com/package/@mcptoolshop/a11y-mcp-tools"><img src="https://img.shields.io/npm/v/@mcptoolshop/a11y-mcp-tools" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License"></a>
  <a href="https://mcp-tool-shop-org.github.io/a11y-mcp-tools/"><img src="https://img.shields.io/badge/Landing_Page-live-blue" alt="Landing Page"></a>
</p>

**Herramientas de MCP para la captura y el diagnóstico de evidencia de accesibilidad.**

---

## Herramientas

### `a11y.evidence`

Captura paquetes de evidencia con protección contra manipulaciones a partir de archivos HTML, registros de la línea de comandos u otras fuentes.

**Capacidades:**
- Normalización canónica de HTML
- Extracción de instantáneas del DOM
- Sumas de comprobación de integridad SHA-256
- Registros de procedencia según la especificación prov

### `a11y.diagnose`

Realiza comprobaciones de accesibilidad deterministas sobre los paquetes de evidencia.

**Capacidades:**
- Comprobación de reglas WCAG 2.2 AA
- Resultados vinculados a la evidencia (puntero JSON, selector CSS, rangos de líneas)
- Sugerencias de corrección solo con SAFE (parches de intención, no escrituras directas)
- Verificación de la procedencia

---

## Instalación

```bash
npm install -g @mcptoolshop/a11y-mcp-tools
```

---

## Uso

### Línea de comandos (CLI) (Recomendado)

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

**Códigos de salida (nativos de CI):**
- `0` - Éxito (no se encontraron problemas o todos los problemas están por debajo de `--fail-on`)
- `2` - Se encontraron problemas (la herramienta tuvo éxito, pero se encontraron problemas)
- `3` - Fallo en la captura/validación (entrada incorrecta, error de esquema)
- `4` - Fallo en la verificación de la procedencia (desajuste en la suma de comprobación)

### Como servidor MCP

```bash
a11y-mcp
```

---

## Reglas WCAG (v0.1)

| Rule | ID del hallazgo | WCAG | Descripción |
| ------ | ----------- | ------ | ------------- |
| `lang` | `a11y.lang.missing` | 3.1.1 | Atributo "lang" faltante en el elemento HTML |
| `alt` | `a11y.img.missing_alt` | 1.1.1 | Atributo "alt" faltante en el elemento img |
| `button-name` | `a11y.button.missing_name` | 4.1.2 | Botón sin nombre accesible |
| `link-name` | `a11y.link.missing_name` | 4.1.2 | Enlace sin nombre accesible |
| `label` | `a11y.input.missing_label` | 1.3.1 | Campo de formulario sin etiqueta |

---

## Catálogo de ID de métodos (v0.1)

ID de métodos estables para el seguimiento de la procedencia. Consulte [PROV_METHODS_CATALOG.md](PROV_METHODS_CATALOG.md) para obtener documentación completa.

| ID del método | Descripción |
| ----------- | ------------- |
| `adapter.wrap.envelope_v0_1` | Envolver en un paquete MCP |
| `adapter.provenance.record_v0_1` | Creación de registro de procedencia |
| `adapter.integrity.sha256_v0_1` | Verificación de integridad SHA-256 |
| `engine.capture.html_canonicalize_v0_1` | Captura de HTML con normalización |
| `engine.capture.dom_snapshot_v0_1` | Extracción de instantáneas del DOM |
| `engine.diagnose.wcag_rules_v0_1` | Evaluación de reglas WCAG |
| `engine.extract.evidence.json_pointer_v0_1` | Extracción de evidencia con puntero JSON |
| `engine.extract.evidence.selector_v0_1` | Extracción de evidencia con selector CSS |

---

## Esquemas

Se proporcionan esquemas JSON para la validación:

- [`envelope.schema.v0.1.json`](src/schemas/envelope.schema.v0.1.json) - Formato de paquete MCP
- [`evidence.bundle.schema.v0.1.json`](src/schemas/evidence.bundle.schema.v0.1.json) - Formato de paquete de evidencia
- [`diagnosis.schema.v0.1.json`](src/schemas/diagnosis.schema.v0.1.json) - Formato de salida de diagnóstico

---

## Relacionado

- [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) - Especificación de procedencia
- [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) - Escáner de línea de comandos
- [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) - Asesor de correcciones
- [a11y-demo-site](https://github.com/mcp-tool-shop-org/a11y-demo-site) - Demostración con flujos de trabajo de CI

---

## Licencia

[MIT](LICENSE)
