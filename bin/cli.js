#!/usr/bin/env node
"use strict";

/**
 * a11y CLI - Command-line interface for a11y MCP tools.
 *
 * Maps directly to MCP tool calls with standard exit codes:
 *   0 = clean (no findings)
 *   1 = error
 *   2 = findings detected
 */

const fs = require("fs");
const path = require("path");
const { evidence, diagnose } = require("../src/tools/index.js");

const VERSION = "0.1.0";

// Exit codes
const EXIT_OK = 0;
const EXIT_ERROR = 1;
const EXIT_FINDINGS = 2;

/**
 * Parse command-line arguments.
 */
function parseArgs(args) {
  const result = {
    command: null,
    flags: {},
    positional: [],
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];

    if (!result.command && !arg.startsWith("-")) {
      result.command = arg;
      i++;
      continue;
    }

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const nextArg = args[i + 1];

      // Boolean flags vs value flags
      if (
        !nextArg ||
        nextArg.startsWith("-") ||
        key === "dom-snapshot" ||
        key === "canonicalize" ||
        key === "fix" ||
        key === "json" ||
        key === "help" ||
        key === "version"
      ) {
        result.flags[key] = true;
        i++;
      } else {
        result.flags[key] = nextArg;
        i += 2;
      }
    } else if (arg.startsWith("-")) {
      // Short flags
      const key = arg.slice(1);
      result.flags[key] = true;
      i++;
    } else {
      result.positional.push(arg);
      i++;
    }
  }

  return result;
}

/**
 * Print help message.
 */
function printHelp() {
  console.log(`
a11y - Accessibility evidence capture and diagnosis

USAGE:
  a11y <command> [options]

COMMANDS:
  evidence    Capture tamper-evident evidence bundles
  diagnose    Run accessibility diagnosis on evidence

EVIDENCE OPTIONS:
  --target <path>       File to capture (can be repeated)
  --dom-snapshot        Include DOM snapshot artifact
  --canonicalize        Canonicalize HTML content
  --label <label>       Add label to artifacts (can be repeated)
  --out <path>          Output bundle to file (default: stdout)

DIAGNOSE OPTIONS:
  --bundle <path>       Path to evidence bundle JSON
  --bundle-id <id>      Bundle ID (when using MCP server)
  --rules <rules>       Comma-separated rule names to run
  --exclude <rules>     Comma-separated rules to exclude
  --fix                 Include fix guidance in findings
  --out <path>          Output diagnosis to file (default: stdout)

GLOBAL OPTIONS:
  --json                Output as JSON (default)
  --help, -h            Show this help message
  --version, -v         Show version

EXIT CODES:
  0  Success (no findings)
  1  Error
  2  Findings detected

EXAMPLES:
  # Capture evidence from HTML file
  a11y evidence --target index.html --dom-snapshot --out evidence.json

  # Diagnose captured evidence
  a11y diagnose --bundle evidence.json --fix

  # One-liner capture and diagnose
  a11y evidence --target page.html --dom-snapshot | a11y diagnose --fix
`);
}

/**
 * Evidence command handler.
 */
async function handleEvidence(flags, positional) {
  // Collect targets
  const targets = [];

  // From --target flags (may be repeated)
  if (flags.target) {
    const targetPaths = Array.isArray(flags.target)
      ? flags.target
      : [flags.target];
    for (const p of targetPaths) {
      targets.push({ kind: "file", path: p });
    }
  }

  // From positional args
  for (const p of positional) {
    targets.push({ kind: "file", path: p });
  }

  if (targets.length === 0) {
    console.error("Error: No targets specified. Use --target <path>");
    process.exit(EXIT_ERROR);
  }

  // Build capture options
  const capture = {
    html: {},
    dom: {},
    environment: { include: ["os", "node", "tool_versions"] },
  };

  if (flags["dom-snapshot"]) {
    capture.dom.snapshot = true;
    capture.dom.include_css_selectors = true;
  }

  if (flags.canonicalize) {
    capture.html.canonicalize = true;
  }

  // Collect labels
  const labels = [];
  if (flags.label) {
    const labelList = Array.isArray(flags.label) ? flags.label : [flags.label];
    labels.push(...labelList);
  }

  // Execute
  const input = { targets, capture, labels };
  const result = await evidence.execute(input);

  if (!result.ok) {
    console.error(`Error: ${result.error.message}`);
    process.exit(EXIT_ERROR);
  }

  // Output
  const output = JSON.stringify(result.bundle, null, 2);

  if (flags.out) {
    fs.writeFileSync(flags.out, output + "\n");
    console.error(`Bundle written to: ${flags.out}`);
  } else {
    console.log(output);
  }

  process.exit(EXIT_OK);
}

/**
 * Diagnose command handler.
 */
async function handleDiagnose(flags, positional) {
  let bundle = null;

  // Load bundle from file
  if (flags.bundle) {
    const bundlePath = path.resolve(flags.bundle);
    if (!fs.existsSync(bundlePath)) {
      console.error(`Error: Bundle file not found: ${bundlePath}`);
      process.exit(EXIT_ERROR);
    }
    bundle = JSON.parse(fs.readFileSync(bundlePath, "utf8"));
  } else if (positional.length > 0) {
    // First positional as bundle path
    const bundlePath = path.resolve(positional[0]);
    if (!fs.existsSync(bundlePath)) {
      console.error(`Error: Bundle file not found: ${bundlePath}`);
      process.exit(EXIT_ERROR);
    }
    bundle = JSON.parse(fs.readFileSync(bundlePath, "utf8"));
  } else {
    // Read from stdin
    const stdin = fs.readFileSync(0, "utf8");
    try {
      bundle = JSON.parse(stdin);
    } catch (err) {
      console.error("Error: Failed to parse bundle from stdin");
      process.exit(EXIT_ERROR);
    }
  }

  // Build rules filter
  const rules = {};
  if (flags.rules) {
    rules.include = flags.rules.split(",").map((r) => r.trim());
  }
  if (flags.exclude) {
    rules.exclude = flags.exclude.split(",").map((r) => r.trim());
  }

  // Build output options
  const outputOptions = {};
  if (flags.fix) {
    outputOptions.include_fix_guidance = true;
  }

  // Execute
  const input = { bundle, rules, output: outputOptions };
  const result = await diagnose.execute(input);

  if (!result.ok) {
    console.error(`Error: ${result.error.message}`);
    process.exit(EXIT_ERROR);
  }

  // Output
  const output = JSON.stringify(result.diagnosis, null, 2);

  if (flags.out) {
    fs.writeFileSync(flags.out, output + "\n");
    console.error(`Diagnosis written to: ${flags.out}`);
  } else {
    console.log(output);
  }

  // Exit based on findings
  const findingsCount = result.diagnosis.summary.findings_total;
  if (findingsCount > 0) {
    console.error(`Found ${findingsCount} accessibility issue(s)`);
    process.exit(EXIT_FINDINGS);
  }

  process.exit(EXIT_OK);
}

/**
 * Main entry point.
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    printHelp();
    process.exit(EXIT_OK);
  }

  const { command, flags, positional } = parseArgs(args);

  // Global flags
  if (flags.help || flags.h) {
    printHelp();
    process.exit(EXIT_OK);
  }

  if (flags.version || flags.v) {
    console.log(`a11y v${VERSION}`);
    process.exit(EXIT_OK);
  }

  // Route to command handler
  switch (command) {
    case "evidence":
      await handleEvidence(flags, positional);
      break;

    case "diagnose":
      await handleDiagnose(flags, positional);
      break;

    default:
      if (command) {
        console.error(`Unknown command: ${command}`);
      }
      printHelp();
      process.exit(EXIT_ERROR);
  }
}

main().catch((err) => {
  console.error(`Fatal error: ${err.message}`);
  process.exit(EXIT_ERROR);
});
