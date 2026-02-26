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

**MCPツール：アクセシビリティに関する証拠の収集と診断**

---

## ツール

### `a11y.evidence`

HTMLファイル、CLIログ、またはその他の入力から、改ざん防止機能付きの証拠データを収集します。

**機能：**
- 標準HTMLの正規化
- DOMスナップショットの抽出
- SHA-256による整合性チェック
- プロヴェナンスレコード（prov-spec準拠）

### `a11y.diagnose`

収集された証拠データに対して、アクセシビリティチェックを実行します。

**機能：**
- WCAG 2.2 AAのルールチェック
- 証拠データに基づいた問題点の特定（JSON Pointer、CSSセレクタ、行範囲）
- SAFE（Secure and Accessible Fix Environment）に準拠した修正提案（意図された修正パッチ、直接的なコード変更は行わない）
- プロヴェナンスの検証

---

## インストール

```bash
npm install -g @mcptoolshop/a11y-mcp-tools
```

---

## 使用方法

### CLI（推奨）

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

**終了コード（CI環境向け）：**
- `0` - 成功（`--fail-on`以下の問題点なし）
- `2` - 問題点の存在（ツールは成功したが、問題が見つかった）
- `3` - 収集/検証の失敗（不正な入力、スキーマエラー）
- `4` - プロヴェナンスの検証失敗（ダイジェストの不一致）

### MCPサーバーとして

```bash
a11y-mcp
```

---

## WCAGルール（v0.1）

| Rule | 問題点ID | WCAG | 説明 |
| ------ | ----------- | ------ | ------------- |
| `lang` | `a11y.lang.missing` | 3.1.1 | HTML要素にlang属性が設定されていない |
| `alt` | `a11y.img.missing_alt` | 1.1.1 | img要素にalt属性が設定されていない |
| `button-name` | `a11y.button.missing_name` | 4.1.2 | アクセシブルな名前を持たないボタン |
| `link-name` | `a11y.link.missing_name` | 4.1.2 | アクセシブルな名前を持たないリンク |
| `label` | `a11y.input.missing_label` | 1.3.1 | ラベルのないフォーム入力 |

---

## メソッドIDカタログ（v0.1）

プロヴェナンス追跡のための安定したメソッドID。詳細については、[PROV_METHODS_CATALOG.md](PROV_METHODS_CATALOG.md)を参照してください。

| メソッドID | 説明 |
| ----------- | ------------- |
| `adapter.wrap.envelope_v0_1` | MCPエンベロープでラップ |
| `adapter.provenance.record_v0_1` | プロヴェナンスレコードの作成 |
| `adapter.integrity.sha256_v0_1` | SHA-256による整合性検証 |
| `engine.capture.html_canonicalize_v0_1` | 正規化されたHTMLの収集 |
| `engine.capture.dom_snapshot_v0_1` | DOMスナップショットの抽出 |
| `engine.diagnose.wcag_rules_v0_1` | WCAGルールの評価 |
| `engine.extract.evidence.json_pointer_v0_1` | JSON Pointerによる証拠データの抽出 |
| `engine.extract.evidence.selector_v0_1` | CSSセレクタによる証拠データの抽出 |

---

## スキーマ

検証用のJSONスキーマを提供しています。

- [`envelope.schema.v0.1.json`](src/schemas/envelope.schema.v0.1.json) - MCPエンベロープの形式
- [`evidence.bundle.schema.v0.1.json`](src/schemas/evidence.bundle.schema.v0.1.json) - 証拠データの形式
- [`diagnosis.schema.v0.1.json`](src/schemas/diagnosis.schema.v0.1.json) - 診断結果の形式

---

## 関連

- [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) - プロヴェナンス仕様
- [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) - CLIスキャナ
- [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) - 修正アドバイザー
- [a11y-demo-site](https://github.com/mcp-tool-shop-org/a11y-demo-site) - CIワークフローを使用したデモサイト

---

## ライセンス

[MIT](LICENSE)
