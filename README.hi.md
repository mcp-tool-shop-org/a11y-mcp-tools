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

**MCP उपकरण सुलभता के प्रमाणों को कैप्चर करने और निदान करने के लिए।**

---

## उपकरण

### `a11y.evidence`

HTML फ़ाइलों, CLI लॉग या अन्य इनपुट से छेड़छाड़-रोधी प्रमाणों के बंडलों को कैप्चर करें।

**क्षमताएं:**
- मानक HTML सामान्यीकरण
- DOM स्नैपशॉट निष्कर्षण
- SHA-256 अखंडता डाइजेस्ट
- प्रामाणिकता रिकॉर्ड

### `a11y.diagnose`

प्रमाण बंडलों पर नियतात्मक सुलभता जांच चलाएं।

**क्षमताएं:**
- WCAG 2.2 AA नियम जांच
- प्रमाण-आधारित निष्कर्ष (JSON पॉइंटर, CSS चयनकर्ता, लाइन स्पैन)
- केवल SAFE-आधारित सुधार मार्गदर्शन (इरादे वाले पैच, प्रत्यक्ष लेखन नहीं)
- प्रामाणिकता सत्यापन

---

## स्थापना

```bash
npm install -g @mcptoolshop/a11y-mcp-tools
```

---

## उपयोग

### CLI (अनुशंसित)

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

**एग्जिट कोड (CI-नेटिव):**
- `0` - सफलता (कोई निष्कर्ष नहीं / `--fail-on` से ऊपर)
- `2` - निष्कर्ष मौजूद हैं (उपकरण सफल रहा, लेकिन समस्याएं पाई गईं)
- `3` - कैप्चर/सत्यापन विफलता (खराब इनपुट, स्कीमा त्रुटि)
- `4` - प्रामाणिकता सत्यापन विफल (डाइजेस्ट मिसमैच)

### MCP सर्वर के रूप में

```bash
a11y-mcp
```

---

## WCAG नियम (v0.1)

| Rule | निष्कर्ष आईडी | WCAG | विवरण |
| ------ | ----------- | ------ | ------------- |
| `lang` | `a11y.lang.missing` | 3.1.1 | HTML तत्व पर 'lang' विशेषता गायब है |
| `alt` | `a11y.img.missing_alt` | 1.1.1 | img तत्व पर 'alt' विशेषता गायब है |
| `button-name` | `a11y.button.missing_name` | 4.1.2 | पहुंच योग्य नाम के बिना बटन |
| `link-name` | `a11y.link.missing_name` | 4.1.2 | पहुंच योग्य नाम के बिना लिंक |
| `label` | `a11y.input.missing_label` | 1.3.1 | लेबल के बिना फॉर्म इनपुट |

---

## विधि आईडी कैटलॉग (v0.1)

प्रामाणिकता ट्रैकिंग के लिए स्थिर विधि आईडी। पूर्ण दस्तावेज़ के लिए [PROV_METHODS_CATALOG.md](PROV_METHODS_CATALOG.md) देखें।

| विधि आईडी | विवरण |
| ----------- | ------------- |
| `adapter.wrap.envelope_v0_1` | MCP लिफाफे में लपेटें |
| `adapter.provenance.record_v0_1` | प्रामाणिकता रिकॉर्ड निर्माण |
| `adapter.integrity.sha256_v0_1` | SHA-256 अखंडता सत्यापन |
| `engine.capture.html_canonicalize_v0_1` | मानककरण के साथ HTML कैप्चर |
| `engine.capture.dom_snapshot_v0_1` | DOM स्नैपशॉट निष्कर्षण |
| `engine.diagnose.wcag_rules_v0_1` | WCAG नियम मूल्यांकन |
| `engine.extract.evidence.json_pointer_v0_1` | JSON पॉइंटर प्रमाण निष्कर्षण |
| `engine.extract.evidence.selector_v0_1` | CSS चयनकर्ता प्रमाण निष्कर्षण |

---

## स्कीमा

सत्यापन के लिए JSON स्कीमा प्रदान किए गए हैं:

- [`envelope.schema.v0.1.json`](src/schemas/envelope.schema.v0.1.json) - MCP लिफाफे का प्रारूप
- [`evidence.bundle.schema.v0.1.json`](src/schemas/evidence.bundle.schema.v0.1.json) - प्रमाण बंडल का प्रारूप
- [`diagnosis.schema.v0.1.json`](src/schemas/diagnosis.schema.v0.1.json) - निदान आउटपुट प्रारूप

---

## संबंधित

- [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) - प्रामाणिकता विनिर्देश
- [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) - CLI स्कैनर
- [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) - सुधार सलाहकार
- [a11y-demo-site](https://github.com/mcp-tool-shop-org/a11y-demo-site) - CI वर्कफ़्लो के साथ डेमो

---

## लाइसेंस

[MIT](LICENSE)
