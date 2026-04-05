import express from 'express';
import cors from 'cors';
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
import { db } from './db';
import { eventBus, JavisEvent } from 'event-bus';
import { intentRouter } from './intent-router';
import { planner } from './planner';
import { registerTools } from './tools';

// Initialize all tools
registerTools();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Broadcast helper
const broadcast = (data: any) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Listen to all events and broadcast to UI
Object.values(JavisEvent).forEach((eventType) => {
  eventBus.on(eventType as JavisEvent, (payload) => {
    broadcast({ type: 'event', event: eventType, payload });
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected via WebSocket');
  
  eventBus.emit(JavisEvent.SYSTEM_LOG, { level: 'info', message: 'User connected to WebSocket' });

  ws.on('message', (message) => {
    const text = message.toString();
    console.log('Received:', text);
    
    // Use the real intent router
    const result = intentRouter.classify(text);
    
    eventBus.emit(JavisEvent.INTENT_CLASSIFIED, { 
      intent: result.category, 
      entities: result.entities 
    });

    ws.send(JSON.stringify({ 
      type: 'echo', 
      text: `Javis recognized intent: ${result.category}` 
    }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Orchestrator API running on http://localhost:${PORT}`);
});
