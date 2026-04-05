import { eventBus, JavisEvent } from 'event-bus';
import { IntentResult, IntentCategory } from '../intent-router/types';
import { Task, TaskStatus } from './types';
import { v4 as uuidv4 } from 'uuid';
import { toolRegistry } from 'tool-registry';

export class Planner {
  private tasks: Map<string, Task> = new Map();

  constructor() {
    this.setupListeners();
  }

  private setupListeners() {
    eventBus.on(JavisEvent.INTENT_CLASSIFIED, (payload) => {
      this.handleIntent(payload as unknown as IntentResult);
    });
  }

  private async handleIntent(result: IntentResult) {
    const taskId = uuidv4();
    const task: Task = {
      id: taskId,
      intent: result.category,
      entities: result.entities,
      status: TaskStatus.PENDING,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.tasks.set(taskId, task);
    eventBus.emit(JavisEvent.TASK_CREATED, { taskId, intent: result.category });

    this.updateTaskStatus(taskId, TaskStatus.RUNNING);

    try {
      const tool = toolRegistry.get(result.category);
      
      if (tool) {
        eventBus.emit(JavisEvent.TOOL_REQUESTED, { taskId, toolName: tool.name, input: result.entities });
        
        console.log(`Planner: Executing tool ${tool.name} for task ${taskId}`);
        const toolResult = await tool.execute(result.entities);
        
        eventBus.emit(JavisEvent.TOOL_COMPLETED, { taskId, toolName: tool.name, result: toolResult });
        this.updateTaskStatus(taskId, TaskStatus.COMPLETED, toolResult);
      } else {
        console.log(`Planner: No tool found for intent ${result.category}`);
        // For casual chat or unknown intents, we just complete with a message for now
        this.updateTaskStatus(taskId, TaskStatus.COMPLETED, { 
          message: result.category === IntentCategory.CASUAL_CHAT 
            ? 'Processed as casual chat.' 
            : `No automated tool for ${result.category}` 
        });
      }
    } catch (err: any) {
      console.error(`Planner: Task ${taskId} failed:`, err);
      this.updateTaskStatus(taskId, TaskStatus.FAILED, undefined, err.message);
    }
  }

  private updateTaskStatus(taskId: string, status: TaskStatus, result?: any, error?: string) {
    const task = this.tasks.get(taskId);
    if (!task) return;

    task.status = status;
    task.updatedAt = Date.now();
    if (result) task.result = result;
    if (error) task.error = error;

    this.tasks.set(taskId, task);
    eventBus.emit(JavisEvent.TASK_UPDATED, { taskId, status, progress: status === TaskStatus.COMPLETED ? 100 : 0 });
    
    if (status === TaskStatus.COMPLETED) {
      eventBus.emit(JavisEvent.TASK_COMPLETED, { taskId, result });
    } else if (status === TaskStatus.FAILED) {
      eventBus.emit(JavisEvent.TASK_FAILED, { taskId, error });
    }
  }
}

export const planner = new Planner();
