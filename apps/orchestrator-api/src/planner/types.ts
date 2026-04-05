export enum TaskStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export interface Task {
  id: string;
  intent: string;
  entities: Record<string, any>;
  status: TaskStatus;
  result?: any;
  error?: string;
  createdAt: number;
  updatedAt: number;
}
