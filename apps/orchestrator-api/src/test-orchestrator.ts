import { intentRouter } from './intent-router';
import { planner } from './planner';
import { eventBus, JavisEvent } from 'event-bus';
import { TaskStatus } from './planner/types';

async function testOrchestrator() {
  console.log('--- Orchestrator Validation ---');
  console.log('Planner loaded:', !!planner);

  // Test 1: Intent Routing
  const testInput = 'open the Chrome app';
  const intentResult = intentRouter.classify(testInput);
  console.log('Intent Routing Test:', intentResult.category === 'open_app' ? 'PASSED' : 'FAILED');
  console.log('Entities:', JSON.stringify(intentResult.entities));

  // Test 2: Planner & Event Bus
  console.log('Testing Planner Task Flow...');
  
  return new Promise<void>((resolve) => {
    let taskCreated = false;
    let taskRunning = false;
    let taskCompleted = false;

    eventBus.on(JavisEvent.TASK_CREATED, (payload) => {
      console.log('[EVENT] Task Created:', payload.taskId);
      taskCreated = true;
    });

    eventBus.on(JavisEvent.TASK_UPDATED, (payload) => {
      console.log('[EVENT] Task Updated:', payload.taskId, payload.status);
      if (payload.status === TaskStatus.RUNNING) taskRunning = true;
      if (payload.status === TaskStatus.COMPLETED) taskCompleted = true;
    });

    eventBus.on(JavisEvent.TASK_COMPLETED, (payload) => {
      console.log('[EVENT] Task Completed:', payload.taskId);
      if (taskCreated && taskRunning && taskCompleted) {
        console.log('Planner & Event Bus Test: PASSED');
      } else {
        console.log('Planner & Event Bus Test: FAILED', { taskCreated, taskRunning, taskCompleted });
      }
      resolve();
    });

    // Trigger the flow
    eventBus.emit(JavisEvent.INTENT_CLASSIFIED, intentResult as any);
  });
}

testOrchestrator().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
