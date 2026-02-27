<p align="center">
  <a href="README.ja.md">日本語</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.md">English</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
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

**Outils MCP pour la capture et le diagnostic des éléments d'accessibilité.**

---

## Outils

### `a11y.evidence`

Capture des ensembles de preuves inviolables à partir de fichiers HTML, de journaux de la ligne de commande ou d'autres sources.

**Fonctionnalités :**
- Normalisation HTML canonique
- Extraction de captures d'écran du DOM
- Sommes de contrôle d'intégrité SHA-256
- Enregistrements de provenance selon la spécification PROV

### `a11y.diagnose`

Effectue des vérifications d'accessibilité déterministes sur les ensembles de preuves.

**Fonctionnalités :**
- Vérification des règles WCAG 2.2 AA
- Résultats liés aux preuves (pointeur JSON, sélecteur CSS, intervalles de lignes)
- Conseils de correction basés sur SAFE uniquement (correctifs d'intention, pas d'écritures directes)
- Vérification de la provenance

---

## Installation

```bash
npm install -g @mcptoolshop/a11y-mcp-tools
```

---

## Utilisation

### Ligne de commande (recommandé)

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

**Codes de sortie (natifs pour l'intégration continue) :**
- `0` - Succès (aucune anomalie détectée ou au-dessus du seuil `--fail-on`)
- `2` - Anomalies détectées (l'outil a réussi, mais des problèmes ont été trouvés)
- `3` - Échec de la capture/de la validation (entrée incorrecte, erreur de schéma)
- `4` - Échec de la vérification de la provenance (incohérence des sommes de contrôle)

### En tant que serveur MCP

```bash
a11y-mcp
```

---

## Règles WCAG (v0.1)

| Règle | ID de l'anomalie | WCAG | Description |
|------|-----------|------|-------------|
| `lang` | `a11y.lang.missing` | 3.1.1 | Attribut "lang" manquant sur l'élément HTML |
| `alt` | `a11y.img.missing_alt` | 1.1.1 | Attribut "alt" manquant sur l'élément img |
| `button-name` | `a11y.button.missing_name` | 4.1.2 | Bouton sans nom accessible |
| `link-name` | `a11y.link.missing_name` | 4.1.2 | Lien sans nom accessible |
| `label` | `a11y.input.missing_label` | 1.3.1 | Champ de formulaire sans étiquette |

---

## Catalogue des ID de méthode (v0.1)

ID de méthode stables pour le suivi de la provenance. Consultez [PROV_METHODS_CATALOG.md](PROV_METHODS_CATALOG.md) pour une documentation complète.

| ID de méthode | Description |
|-----------|-------------|
| `adapter.wrap.envelope_v0_1` | Encapsuler dans une enveloppe MCP |
| `adapter.provenance.record_v0_1` | Création d'un enregistrement de provenance |
| `adapter.integrity.sha256_v0_1` | Vérification de l'intégrité SHA-256 |
| `engine.capture.html_canonicalize_v0_1` | Capture HTML avec canonisation |
| `engine.capture.dom_snapshot_v0_1` | Extraction de captures d'écran du DOM |
| `engine.diagnose.wcag_rules_v0_1` | Évaluation des règles WCAG |
| `engine.extract.evidence.json_pointer_v0_1` | Extraction de preuves par pointeur JSON |
| `engine.extract.evidence.selector_v0_1` | Extraction de preuves par sélecteur CSS |

---

## Schémas

Des schémas JSON sont fournis pour la validation :

- [`envelope.schema.v0.1.json`](src/schemas/envelope.schema.v0.1.json) - Format d'enveloppe MCP
- [`evidence.bundle.schema.v0.1.json`](src/schemas/evidence.bundle.schema.v0.1.json) - Format de l'ensemble de preuves
- [`diagnosis.schema.v0.1.json`](src/schemas/diagnosis.schema.v0.1.json) - Format de sortie du diagnostic

---

## Liés

- [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) - Spécification de la provenance
- [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) - Scanner en ligne de commande
- [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) - Conseiller de correction
- [a11y-demo-site](https://github.com/mcp-tool-shop-org/a11y-demo-site) - Démonstration avec des flux de travail d'intégration continue

---

## Sécurité et portée des données

- **Données accessibles :** Lecture des fichiers HTML à partir du disque pour la capture des preuves. Traitement des captures d'écran du DOM pour le diagnostic de l'accessibilité.
- **Données NON accessibles :** Aucune requête réseau. Aucune télémétrie. Aucun stockage de données utilisateur. Aucun identifiant ou jeton.
- **Autorisations requises :** Accès en lecture aux fichiers HTML cibles. Accès en écriture pour la sortie de l'ensemble de preuves.

## Tableau de bord

| Portail | Statut |
|------|--------|
| A. Base de sécurité | PASSÉ |
| B. Gestion des erreurs | PASSÉ |
| C. Documentation pour les opérateurs | PASSÉ |
| D. Hygiène de déploiement | PASSÉ |
| E. Identité | PASSÉ |

## Licence

[MIT](LICENSE)

---

Créé par <a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a>
