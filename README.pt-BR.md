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

**Ferramentas MCP para captura e diagnóstico de evidências de acessibilidade.**

---

## Ferramentas

### `a11y.evidence`

Captura pacotes de evidências invioláveis a partir de arquivos HTML, logs da linha de comando ou outras fontes.

**Funcionalidades:**
- Normalização canônica do HTML
- Extração de instantâneos do DOM
- Resumos de integridade SHA-256
- Registros de procedência de acordo com a especificação PROV

### `a11y.diagnose`

Executa verificações de acessibilidade determinísticas em pacotes de evidências.

**Funcionalidades:**
- Verificação de regras WCAG 2.2 AA
- Resultados vinculados a evidências (JSON Pointer, seletor CSS, intervalos de linhas)
- Orientações de correção baseadas em "SAFE" (patches de intenção, não modificações diretas)
- Verificação de procedência

---

## Instalação

```bash
npm install -g @mcptoolshop/a11y-mcp-tools
```

---

## Uso

### Linha de Comando (Recomendado)

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

**Códigos de Saída (compatível com CI):**
- `0` - Sucesso (nenhum resultado encontrado ou acima de `--fail-on`)
- `2` - Resultados encontrados (a ferramenta teve sucesso, mas problemas foram detectados)
- `3` - Falha na captura/validação (entrada inválida, erro de esquema)
- `4` - Verificação de procedência falhou (inconsistência no resumo)

### Como Servidor MCP

```bash
a11y-mcp
```

---

## Regras WCAG (v0.1)

| Rule | ID do Resultado | WCAG | Descrição |
| ------ | ----------- | ------ | ------------- |
| `lang` | `a11y.lang.missing` | 3.1.1 | Atributo "lang" ausente no elemento HTML |
| `alt` | `a11y.img.missing_alt` | 1.1.1 | Atributo "alt" ausente no elemento "img" |
| `button-name` | `a11y.button.missing_name` | 4.1.2 | Botão sem nome acessível |
| `link-name` | `a11y.link.missing_name` | 4.1.2 | Link sem nome acessível |
| `label` | `a11y.input.missing_label` | 1.3.1 | Campo de formulário sem rótulo |

---

## Catálogo de IDs de Métodos (v0.1)

IDs de métodos estáveis para rastreamento de procedência. Consulte [PROV_METHODS_CATALOG.md](PROV_METHODS_CATALOG.md) para documentação completa.

| ID do Método | Descrição |
| ----------- | ------------- |
| `adapter.wrap.envelope_v0_1` | Envolver em envelope MCP |
| `adapter.provenance.record_v0_1` | Criação de registro de procedência |
| `adapter.integrity.sha256_v0_1` | Verificação de integridade SHA-256 |
| `engine.capture.html_canonicalize_v0_1` | Captura de HTML com normalização |
| `engine.capture.dom_snapshot_v0_1` | Extração de instantâneo do DOM |
| `engine.diagnose.wcag_rules_v0_1` | Avaliação de regras WCAG |
| `engine.extract.evidence.json_pointer_v0_1` | Extração de evidências JSON Pointer |
| `engine.extract.evidence.selector_v0_1` | Extração de evidências CSS selector |

---

## Esquemas

Esquemas JSON são fornecidos para validação:

- [`envelope.schema.v0.1.json`](src/schemas/envelope.schema.v0.1.json) - Formato de envelope MCP
- [`evidence.bundle.schema.v0.1.json`](src/schemas/evidence.bundle.schema.v0.1.json) - Formato de pacote de evidências
- [`diagnosis.schema.v0.1.json`](src/schemas/diagnosis.schema.v0.1.json) - Formato de saída de diagnóstico

---

## Relacionado

- [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) - Especificação de procedência
- [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) - Scanner de linha de comando
- [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) - Consultor de correção
- [a11y-demo-site](https://github.com/mcp-tool-shop-org/a11y-demo-site) - Demonstração com fluxos de trabalho de CI

---

## Licença

[MIT](LICENSE)
