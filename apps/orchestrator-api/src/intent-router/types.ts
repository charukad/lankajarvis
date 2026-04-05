export enum IntentCategory {
  CASUAL_CHAT = 'casual_chat',
  OPEN_APP = 'open_app',
  CLOSE_APP = 'close_app',
  SEARCH_WEB = 'search_web',
  RUN_COMMAND = 'run_command',
  OPEN_FILE = 'open_file',
  OPEN_FOLDER = 'open_folder',
  SYSTEM_CONTROL = 'system_control',
  CODING_HELP = 'coding_help',
  UNKNOWN = 'unknown',
}

export interface IntentResult {
  category: IntentCategory;
  confidence: number;
  entities: Record<string, any>;
  originalText: string;
}
