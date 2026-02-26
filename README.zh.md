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

**MCP 工具，用于辅助功能证据的捕获和诊断。**

---

## 工具

### `a11y.evidence`

从 HTML 文件、CLI 日志或其他输入中捕获具有防篡改功能的证据包。

**功能：**
- 标准化 HTML 归一化
- DOM 快照提取
- SHA-256 完整性校验
- provenance（来源）记录

### `a11y.diagnose`

对证据包进行确定性的辅助功能检查。

**功能：**
- WCAG 2.2 AA 规则检查
- 基于证据的发现（JSON Pointer、CSS 选择器、行范围）
- 仅提供 SAFE 修复建议（意图补丁，而非直接修改）
- provenance 验证

---

## 安装

```bash
npm install -g @mcptoolshop/a11y-mcp-tools
```

---

## 使用方法

### 命令行界面 (CLI) (推荐)

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

**退出码 (适用于 CI 环境)：**
- `0` - 成功（未发现或未超过 `--fail-on` 的问题）
- `2` - 发现问题（工具成功运行，但发现了一些问题）
- `3` - 捕获/验证失败（输入错误或模式错误）
- `4` - provenance 验证失败（校验和不匹配）

### 作为 MCP 服务器

```bash
a11y-mcp
```

---

## WCAG 规则 (v0.1)

| Rule | 发现 ID | WCAG | 描述 |
| ------ | ----------- | ------ | ------------- |
| `lang` | `a11y.lang.missing` | 3.1.1 | html 元素缺少 lang 属性 |
| `alt` | `a11y.img.missing_alt` | 1.1.1 | img 元素缺少 alt 属性 |
| `button-name` | `a11y.button.missing_name` | 4.1.2 | 按钮没有可访问的名称 |
| `link-name` | `a11y.link.missing_name` | 4.1.2 | 链接没有可访问的名称 |
| `label` | `a11y.input.missing_label` | 1.3.1 | 表单输入缺少标签 |

---

## 方法 ID 目录 (v0.1)

用于 provenance 跟踪的稳定方法 ID。有关完整文档，请参阅 [PROV_METHODS_CATALOG.md](PROV_METHODS_CATALOG.md)。

| 方法 ID | 描述 |
| ----------- | ------------- |
| `adapter.wrap.envelope_v0_1` | 封装在 MCP 封套中 |
| `adapter.provenance.record_v0_1` | 创建 provenance 记录 |
| `adapter.integrity.sha256_v0_1` | SHA-256 完整性验证 |
| `engine.capture.html_canonicalize_v0_1` | HTML 捕获，并进行归一化 |
| `engine.capture.dom_snapshot_v0_1` | DOM 快照提取 |
| `engine.diagnose.wcag_rules_v0_1` | WCAG 规则评估 |
| `engine.extract.evidence.json_pointer_v0_1` | JSON Pointer 证据提取 |
| `engine.extract.evidence.selector_v0_1` | CSS 选择器证据提取 |

---

## 模式

提供 JSON 模式以进行验证：

- [`envelope.schema.v0.1.json`](src/schemas/envelope.schema.v0.1.json) - MCP 封套格式
- [`evidence.bundle.schema.v0.1.json`](src/schemas/evidence.bundle.schema.v0.1.json) - 证据包格式
- [`diagnosis.schema.v0.1.json`](src/schemas/diagnosis.schema.v0.1.json) - 诊断输出格式

---

## 相关

- [prov-spec](https://github.com/mcp-tool-shop-org/prov-spec) - provenance 规范
- [a11y-evidence-engine](https://github.com/mcp-tool-shop-org/a11y-evidence-engine) - CLI 扫描器
- [a11y-assist](https://github.com/mcp-tool-shop-org/a11y-assist) - 修复建议工具
- [a11y-demo-site](https://github.com/mcp-tool-shop-org/a11y-demo-site) - 带有 CI 工作流的演示站点

---

## 许可证

[MIT](LICENSE)
