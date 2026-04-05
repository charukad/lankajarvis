import { EventEmitter } from 'events';

export enum JavisEvent {
  // Voice Events
  WAKE_WORD_DETECTED = 'voice:wake_word_detected',
  SPEECH_STARTED = 'voice:speech_started',
  SPEECH_ENDED = 'voice:speech_ended',
  TRANSCRIPT_PARTIAL = 'voice:transcript_partial',
  TRANSCRIPT_FINAL = 'voice:transcript_final',

  // Intent Events
  INTENT_CLASSIFIED = 'intent:classified',

  // Task Events
  TASK_CREATED = 'task:created',
  TASK_UPDATED = 'task:updated',
  TASK_COMPLETED = 'task:completed',
  TASK_FAILED = 'task:failed',
  TASK_CANCELLED = 'task:cancelled',

  // Tool Events
  TOOL_REQUESTED = 'tool:requested',
  TOOL_STARTED = 'tool:started',
  TOOL_COMPLETED = 'tool:completed',
  TOOL_FAILED = 'tool:failed',

  // Brain Events
  BRAIN_TASK_STARTED = 'brain:task_started',
  BRAIN_STREAM = 'brain:stream',
  BRAIN_COMPLETED = 'brain:completed',

  // System Events
  SYSTEM_LOG = 'system:log',
  SYSTEM_ERROR = 'system:error',
}

export interface EventPayloads {
  [JavisEvent.WAKE_WORD_DETECTED]: { word: string; confidence: number };
  [JavisEvent.TRANSCRIPT_FINAL]: { text: string; language: string };
  [JavisEvent.INTENT_CLASSIFIED]: { intent: string; entities: any };
  [JavisEvent.TASK_CREATED]: { taskId: string; intent: string };
  [JavisEvent.TASK_UPDATED]: { taskId: string; status: string; progress?: number };
  [JavisEvent.SYSTEM_LOG]: { level: 'info' | 'warn' | 'error'; message: string };
  [key: string]: any;
}

export class JavisEventBus {
  private emitter = new EventEmitter();

  emit<K extends JavisEvent>(event: K, payload: EventPayloads[K]): boolean {
    return this.emitter.emit(event, payload);
  }

  on<K extends JavisEvent>(event: K, listener: (payload: EventPayloads[K]) => void): this {
    this.emitter.on(event, listener);
    return this;
  }

  off<K extends JavisEvent>(event: K, listener: (payload: EventPayloads[K]) => void): this {
    this.emitter.off(event, listener);
    return this;
  }
}

export const eventBus = new JavisEventBus();
