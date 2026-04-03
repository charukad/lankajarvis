import { useEffect, useState, useRef, useCallback } from 'react';

export type MessageType = 'system' | 'echo' | 'chat' | 'task' | 'error';

export interface WSMessage {
  type: MessageType;
  text: string;
  [key: string]: any;
}

export function useOrchestrator(url: string = 'ws://localhost:8000') {
  const [messages, setMessages] = useState<WSMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setIsConnected(true);
      console.log('Connected to Orchestrator');
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      console.log('Disconnected from Orchestrator');
      // Simple reconnect
      setTimeout(connect, 3000);
    };

    ws.current.onmessage = (event) => {
      try {
        const data: WSMessage = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      } catch (err) {
        console.error('Failed to parse WS message:', err);
      }
    };
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      ws.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback((text: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(text);
      // We don't manually add it to messages here because the server echoes it back (for now)
      // or the UI handles the input state.
    }
  }, []);

  return { messages, isConnected, sendMessage };
}
