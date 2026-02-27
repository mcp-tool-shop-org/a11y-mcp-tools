<p align="center">
  <a href="README.md">English</a> | <a href="README.zh.md">中文</a> | <a href="README.es.md">Español</a> | <a href="README.fr.md">Français</a> | <a href="README.hi.md">हिन्दी</a> | <a href="README.it.md">Italiano</a> | <a href="README.pt-BR.md">Português (BR)</a>
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

**アクセシビリティに関する証拠の収集と診断のためのMCPツール**

---

## ツール

### `a11y.evidence`

HTMLファイル、CLIログ、またはその他の入力から、改ざん防止機能付きの証拠バンドルを収集します。

**機能:**
- 標準HTMLの正規化
- DOMスナップショットの抽出
- SHA-256整合性チェックサム
- provenance（トレーサビリティ）レコード

### `a11y.diagnose`

証拠バンドルに対して、決定論的なアクセシビリティチェックを実行します。

**機能:**
- WCAG 2.2 AAルールのチェック
- 証拠に基づいた検出結果（JSON Pointer、CSSセレクタ、行範囲）
- SAFE（Secure and Automated Fix Environment）のみでの修正提案（直接的な書き換えではなく、意図された修正）
- provenanceの検証

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

**終了コード（CI環境向け）:**
- `0` - 成功（`--fail-on`以下の問題なし）
- `2` - 問題が検出された（ツールは成功したが、問題が見つかった）
- `3` - 収集/検証エラー（不正な入力、スキーマエラー）
- `4` - provenanceの検証に失敗（チェックサムの不一致）

### MCPサーバーとして

```bash
a11y-mcp
```

---

## WCAGルール（v0.1）

| ルール | 検出ID | WCAG | 説明 |
|------|-----------|------|-------------|
| `lang` | `a11y.lang.missing` | 3.1.1 | HTML要素にlang属性が設定されていない |
| `alt` | `a11y.img.missing_alt` | 1.1.1 | img要素にalt属性が設定されていない |
| `button-name` | `a11y.button.missing_name` | 4.1.2 | アクセシブルな名前を持たないボタン |
| `link-name` | `a11y.link.missing_name` | 4.1.2 | アクセシブルな名前を持たないリンク |
| `label` | `a11y.input.missing_label` | 1.3.1 | ラベルのないフォーム入力 |

---

## メソッドIDカタログ（v0.1）

provenance追跡のための安定したメソッドID。詳細については、[PROV_METHODS_CATALOG.md](PROV_METHODS_CATALOG.md)を参照してください。

| メソッドID | 説明 |
|-----------|-------------|
| `adapter.wrap.envelope_v0_1` | MCPエンベロープでラップ |
| `adapter.provenance.record_v0_1` | provenanceレコードの作成 |
| `adapter.integrity.sha256_v0_1` | SHA-256整合性検証 |
| `engine.capture.html_canonicalize_v0_1` | 正規化されたHTMLの収集 |
| `engine.capture.dom_snapshot_v0_1` | DOMスナップショットの抽出 |
| `engine.diagnose.wcag_rules_v0_1` | WCAGルールの評価 |
| `engine.extract.evidence.json_pointer_v0_1` | JSON Pointerによる証拠の抽出 |
| `engine.extract.evidence.selector_v0_1` | CSSセレクタによる証拠の抽出 |

---

## スキーマ

検証用のJSONスキーマが提供されています。

- [`envelope.schema.v0.1.json`](src/schemas/envelope.schema.v0.1.json) - MCPエンベロープの形式
- [`evidence.bundle.schema.v0.1.json`](src/schemas/evidence.bundle.schema.v0.1.json) - 証拠バンドルの形式
- [`diagnosis.schema.v0.1.json`](src/schemas/diagnosis.schema.v0.1.json) - 診断出力の形式

---

## 関連

- [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) - provenance仕様
- [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) - CLIスキャナ
- [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) - 修正アドバイザー
- [a11y-demo-site](https://github.com/mcp-tool-shop-org/a11y-demo-site) - CIワークフローを使用したデモ

---

## セキュリティとデータ範囲

- **アクセスされるデータ:** 証拠収集のために、ディスクからHTMLファイルを読み込みます。アクセシビリティ診断のために、DOMスナップショットを処理します。
- **アクセスされないデータ:** ネットワークリクエストはありません。テレメトリーはありません。ユーザーデータの保存はありません。認証情報やトークンも使用しません。
- **必要な権限:** ターゲットHTMLファイルへの読み取りアクセス。証拠バンドルの出力のための書き込みアクセス。

## スコアカード

| ゲート | ステータス |
|------|--------|
| A. セキュリティ基準 | 合格 |
| B. エラー処理 | 合格 |
| C. 運用ドキュメント | 合格 |
| D. ソフトウェアの品質 | 合格 |
| E. 識別 | 合格 |

## ライセンス

[MIT](LICENSE)

---

<a href="https://mcp-tool-shop.github.io/">MCP Tool Shop</a>によって作成されました。
