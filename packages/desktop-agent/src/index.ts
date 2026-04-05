import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class CommandSafety {
  private static BLOCKED_COMMANDS = [
    'rm -rf',
    ':(){ :|:& };:', // Fork bomb
    'mkfs',
    'dd',
    'chmod -R 777',
    'chown',
    'sudo',
    '> /dev/sda',
    'shutdown',
    'reboot',
  ];

  private static BLOCKED_PATTERNS = [
    /rm\s+-rf\s+\//,
    /mv\s+.*?\s+\/dev\/null/,
    />\s+\/etc\//,
  ];

  static validate(command: string): { safe: boolean; reason?: string } {
    const trimmed = command.trim().toLowerCase();

    for (const blocked of this.BLOCKED_COMMANDS) {
      if (trimmed.includes(blocked.toLowerCase())) {
        return { safe: false, reason: `Command contains forbidden string: ${blocked}` };
      }
    }

    for (const pattern of this.BLOCKED_PATTERNS) {
      if (pattern.test(trimmed)) {
        return { safe: false, reason: 'Command matches a dangerous pattern' };
      }
    }

    return { safe: true };
  }
}

export const openApplication = async (appName: string) => {
  console.log(`[DESKTOP] Opening application: ${appName}`);
  await execAsync(`open -a "${appName}"`);
  return { success: true, message: `Opened ${appName}` };
};

export const openUrl = async (url: string) => {
  console.log(`[DESKTOP] Opening URL: ${url}`);
  await execAsync(`open "${url}"`);
  return { success: true, message: `Opened URL: ${url}` };
};

export const runCommand = async (command: string) => {
  console.log(`[DESKTOP] Running command: ${command}`);
  
  const safety = CommandSafety.validate(command);
  if (!safety.safe) {
    throw new Error(`Safety Block: ${safety.reason}`);
  }

  const { stdout, stderr } = await execAsync(command);
  return { success: true, stdout, stderr };
};

export const openFolder = async (path: string) => {
  console.log(`[DESKTOP] Opening folder: ${path}`);
  await execAsync(`open "${path}"`);
  return { success: true, message: `Opened folder: ${path}` };
};
