import { WebSocket } from 'ws';

const ws = new WebSocket('ws://localhost:8000');

ws.on('open', () => {
  console.log('Test client: Connected');
  ws.send('Hello from test client');
});

ws.on('message', (data) => {
  console.log('Test client: Received:', data.toString());
  ws.close();
  process.exit(0);
});

ws.on('error', (err) => {
  console.error('Test client: Error:', err);
  process.exit(1);
});

setTimeout(() => {
  console.error('Test client: Timeout');
  process.exit(1);
}, 5000);
