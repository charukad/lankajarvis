import { IntentCategory, IntentResult } from './types';

export class IntentRouter {
  private patterns: Array<{ category: IntentCategory; regex: RegExp; extractor?: (match: RegExpExecArray) => Record<string, any> }> = [
    {
      category: IntentCategory.OPEN_APP,
      regex: /open\s+(?:the\s+)?([\w\s]+?)(?:\s+app)?$/i,
      extractor: (match) => ({ appName: match[1].trim() }),
    },
    {
      category: IntentCategory.CLOSE_APP,
      regex: /close\s+(?:the\s+)?([\w\s]+?)(?:\s+app)?$/i,
      extractor: (match) => ({ appName: match[1].trim() }),
    },
    {
      category: IntentCategory.SEARCH_WEB,
      regex: /(?:search|google|find)\s+(?:for\s+)?(?:the\s+)?(.+)$/i,
      extractor: (match) => ({ query: match[1].trim() }),
    },
    {
      category: IntentCategory.OPEN_FOLDER,
      regex: /open\s+(?:the\s+)?folder\s+(.+)$/i,
      extractor: (match) => ({ path: match[1].trim() }),
    },
    {
      category: IntentCategory.RUN_COMMAND,
      regex: /(?:run|execute)\s+(?:command\s+)?`(.+?)`$/i,
      extractor: (match) => ({ command: match[1].trim() }),
    },
    {
      category: IntentCategory.SYSTEM_CONTROL,
      regex: /(?:set|turn)\s+(volume|brightness)\s+to\s+(\d+)/i,
      extractor: (match) => ({ target: match[1], value: parseInt(match[2]) }),
    },
  ];

  classify(text: string): IntentResult {
    const trimmedText = text.trim();

    for (const pattern of this.patterns) {
      const match = pattern.regex.exec(trimmedText);
      if (match) {
        return {
          category: pattern.category,
          confidence: 0.9,
          entities: pattern.extractor ? pattern.extractor(match) : {},
          originalText: trimmedText,
        };
      }
    }

    // Default to casual chat for now
    return {
      category: IntentCategory.CASUAL_CHAT,
      confidence: 0.5,
      entities: {},
      originalText: trimmedText,
    };
  }
}

export const intentRouter = new IntentRouter();
