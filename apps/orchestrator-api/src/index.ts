import express from 'express';
import cors from 'cors';
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
import { db } from './db';
import { users } from './db/schema';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected via WebSocket');
  
  ws.send(JSON.stringify({ type: 'system', text: 'Connected to Javis Orchestrator' }));

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    ws.send(JSON.stringify({ type: 'echo', text: `Echo: ${message}` }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Orchestrator API running on http://localhost:${PORT}`);
});
