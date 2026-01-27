"use strict";

/**
 * Provenance record utilities.
 *
 * Creates prov-spec compatible records for evidence capture and diagnosis.
 */

const crypto = require("crypto");

/**
 * Create a provenance record for evidence capture.
 *
 * @param {Object} params
 * @param {string[]} params.methods - Method IDs applied
 * @param {string[]} params.inputs - Input paths/IDs
 * @param {string[]} params.outputs - Output artifact IDs
 * @param {string} [params.agentName] - Agent name
 * @param {string} [params.agentVersion] - Agent version
 * @returns {Object} Provenance record
 */
function createProvenanceRecord({
  methods,
  inputs,
  outputs,
  agentName = "a11y-mcp-tools",
  agentVersion = "0.1.0",
}) {
  const recordId = `prov:record:${crypto.randomUUID()}`;

  return {
    record_id: recordId,
    methods,
    inputs,
    outputs,
    verified: false,
    timestamp: new Date().toISOString(),
    agent: {
      name: agentName,
      version: agentVersion,
    },
  };
}

/**
 * Create a full prov.record.v0.1 structure.
 *
 * @param {Object} params
 * @param {string} params.methodId - Primary method ID
 * @param {Object[]} params.inputArtifacts - Input artifact refs
 * @param {Object[]} params.outputArtifacts - Output artifact refs
 * @param {string} [params.agentName]
 * @param {string} [params.agentVersion]
 * @returns {Object} prov.record.v0.1 structure
 */
function createProvRecordV01({
  methodId,
  inputArtifacts,
  outputArtifacts,
  agentName = "a11y-mcp-tools",
  agentVersion = "0.1.0",
}) {
  return {
    "prov.record.v0.1": {
      method_id: methodId,
      timestamp: new Date().toISOString(),
      inputs: inputArtifacts.map((a) => ({
        "artifact.v0.1": {
          name: a.name || a.artifact_id,
          uri: a.uri || `artifact://${a.artifact_id}`,
          digest: a.digest,
        },
      })),
      outputs: outputArtifacts.map((a) => ({
        "artifact.v0.1": {
          name: a.name || a.artifact_id,
          content: a.content,
          digest: a.digest,
        },
      })),
      agent: {
        name: agentName,
        version: agentVersion,
      },
    },
  };
}

/**
 * Method IDs for evidence capture.
 */
const EVIDENCE_METHODS = {
  CAPTURE_HTML: "engine.capture.html_v0_1",
  CAPTURE_DOM: "engine.extract.evidence.dom_snapshot_v0_1",
  CAPTURE_FILE: "engine.capture.file_v0_1",
  CANONICALIZE: "adapter.canonicalize.html_v0_1",
  INTEGRITY_SHA256: "integrity.digest.sha256",
  WRAP_ENVELOPE: "adapter.wrap.envelope_v0_1",
  PROVENANCE_RECORD: "adapter.provenance.record_v0_1",
};

/**
 * Method IDs for diagnosis.
 */
const DIAGNOSE_METHODS = {
  WCAG_RULES: "engine.diagnose.wcag_rules_v0_1",
  EXTRACT_POINTER: "engine.extract.evidence.json_pointer",
  GENERATE_FIX: "engine.generate.fix_guidance_v0_1",
};

module.exports = {
  createProvenanceRecord,
  createProvRecordV01,
  EVIDENCE_METHODS,
  DIAGNOSE_METHODS,
};
