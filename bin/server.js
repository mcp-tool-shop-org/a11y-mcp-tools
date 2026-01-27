#!/usr/bin/env node
"use strict";

/**
 * MCP Server for a11y tools.
 *
 * Implements the Model Context Protocol for:
 * - a11y.evidence: Evidence capture
 * - a11y.diagnose: Accessibility diagnosis
 */

const readline = require("readline");
const { evidence, diagnose, tools } = require("../src/tools/index.js");

// In-memory bundle store for the session
const bundleStore = {};

/**
 * Handle incoming MCP request.
 */
async function handleRequest(request) {
  const { id, method, params } = request;

  try {
    switch (method) {
      case "initialize":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: {
              tools: {},
            },
            serverInfo: {
              name: "a11y-mcp-tools",
              version: "0.1.0",
            },
          },
        };

      case "tools/list":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            tools: tools.map((t) => ({
              name: t.name,
              description: t.description,
              inputSchema: t.inputSchema,
            })),
          },
        };

      case "tools/call":
        return await handleToolCall(id, params);

      default:
        return {
          jsonrpc: "2.0",
          id,
          error: {
            code: -32601,
            message: `Method not found: ${method}`,
          },
        };
    }
  } catch (err) {
    return {
      jsonrpc: "2.0",
      id,
      error: {
        code: -32603,
        message: err.message,
      },
    };
  }
}

/**
 * Handle tool call.
 */
async function handleToolCall(id, params) {
  const { name, arguments: args } = params;

  let result;

  switch (name) {
    case "a11y.evidence":
      result = await evidence.execute(args);
      // Store bundle for later diagnosis
      if (result.ok && result.bundle) {
        bundleStore[result.bundle.bundle_id] = result.bundle;
      }
      break;

    case "a11y.diagnose":
      result = await diagnose.execute(args, bundleStore);
      break;

    default:
      return {
        jsonrpc: "2.0",
        id,
        error: {
          code: -32602,
          message: `Unknown tool: ${name}`,
        },
      };
  }

  return {
    jsonrpc: "2.0",
    id,
    result: {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    },
  };
}

/**
 * Main entry point.
 */
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  console.error("a11y-mcp-tools server started");

  for await (const line of rl) {
    if (!line.trim()) continue;

    try {
      const request = JSON.parse(line);
      const response = await handleRequest(request);
      console.log(JSON.stringify(response));
    } catch (err) {
      console.error("Parse error:", err.message);
      console.log(
        JSON.stringify({
          jsonrpc: "2.0",
          id: null,
          error: {
            code: -32700,
            message: "Parse error",
          },
        })
      );
    }
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
