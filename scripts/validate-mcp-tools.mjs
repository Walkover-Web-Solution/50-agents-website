/**
 * Axien act.mcp-tool-quality checks for the public /mcp tool list.
 */
import fs from 'node:fs';
import path from 'node:path';

const toolsPath = path.join(process.cwd(), 'src/lib/mcp-tools.json');
let tools;
try {
  tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
} catch (e) {
  console.error('validate-mcp-tools: cannot read mcp-tools.json:', e.message);
  process.exit(1);
}

if (!Array.isArray(tools) || tools.length === 0) {
  console.error('validate-mcp-tools: at least one tool is required');
  process.exit(1);
}

const names = new Set();
for (const tool of tools) {
  if (typeof tool.name !== 'string' || !/^[a-z][a-z0-9_]{0,63}$/.test(tool.name)) {
    console.error(`validate-mcp-tools: invalid tool name ${JSON.stringify(tool.name)}`);
    process.exit(1);
  }
  if (names.has(tool.name)) {
    console.error(`validate-mcp-tools: duplicate tool name ${tool.name}`);
    process.exit(1);
  }
  names.add(tool.name);

  if (typeof tool.description !== 'string' || tool.description.length < 40) {
    console.error(`validate-mcp-tools: ${tool.name} description must be 40+ characters`);
    process.exit(1);
  }

  const props = tool.inputSchema?.properties;
  if (props && typeof props === 'object') {
    for (const [key, schema] of Object.entries(props)) {
      if (!schema?.description || String(schema.description).length < 8) {
        console.error(`validate-mcp-tools: ${tool.name}.${key} missing parameter description`);
        process.exit(1);
      }
    }
  }

  const ann = tool.annotations;
  if (!ann || typeof ann.readOnlyHint !== 'boolean' || typeof ann.destructiveHint !== 'boolean') {
    console.error(`validate-mcp-tools: ${tool.name} needs readOnlyHint and destructiveHint annotations`);
    process.exit(1);
  }
}

console.log(`validate-mcp-tools: OK (${tools.length} tool(s))`);