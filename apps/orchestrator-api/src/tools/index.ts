import { toolRegistry, ToolRiskLevel } from 'tool-registry';
import { openApplication, openUrl, runCommand, openFolder } from 'desktop-agent';

export function registerTools() {
  toolRegistry.register({
    name: 'open_app',
    description: 'Opens a macOS application',
    inputSchema: { appName: 'string' },
    riskLevel: ToolRiskLevel.LOW,
    execute: async (input) => openApplication(input.appName),
  });

  toolRegistry.register({
    name: 'search_web',
    description: 'Searches the web using default browser',
    inputSchema: { query: 'string' },
    riskLevel: ToolRiskLevel.LOW,
    execute: async (input) => openUrl(`https://www.google.com/search?q=${encodeURIComponent(input.query)}`),
  });

  toolRegistry.register({
    name: 'run_command',
    description: 'Runs a terminal command',
    inputSchema: { command: 'string' },
    riskLevel: ToolRiskLevel.HIGH,
    execute: async (input) => runCommand(input.command),
  });

  toolRegistry.register({
    name: 'open_folder',
    description: 'Opens a folder in Finder',
    inputSchema: { path: 'string' },
    riskLevel: ToolRiskLevel.LOW,
    execute: async (input) => openFolder(input.path),
  });
}
