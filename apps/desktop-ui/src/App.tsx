import { useState, useEffect, useRef } from "react";
import { Mic, Send, Settings, Activity, MessageSquare } from "lucide-react";
import "./App.css";

interface LogMessage {
  id: string;
  sender: 'user' | 'system' | 'assistant';
  text: string;
}

function App() {
  const [inputText, setInputText] = useState("");
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Connect to Orchestrator API
    const socket = new WebSocket("ws://localhost:8000");

    socket.onopen = () => {
      console.log("Connected to Orchestrator");
      setLogs((prev) => [...prev, { id: Date.now().toString(), sender: 'system', text: 'WebSocket Connected.' }]);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLogs((prev) => [...prev, { id: Date.now().toString(), sender: data.type === 'echo' ? 'assistant' : 'system', text: data.text }]);
      } catch (err) {
        setLogs((prev) => [...prev, { id: Date.now().toString(), sender: 'system', text: event.data }]);
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from Orchestrator");
      setLogs((prev) => [...prev, { id: Date.now().toString(), sender: 'system', text: 'WebSocket Disconnected.' }]);
    };

    ws.current = socket;

    return () => socket.close();
  }, []);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    // Add user message to UI
    setLogs((prev) => [...prev, { id: Date.now().toString(), sender: 'user', text: inputText }]);
    
    // Send to backend
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(inputText);
    }
    
    setInputText("");
  };

  return (
    <div className="flex h-screen w-full bg-[var(--color-dark-bg)] overflow-hidden select-none text-gray-200">
      
      {/* Sidebar / Settings Drawer Skeleton */}
      <div className="w-16 flex flex-col items-center py-4 bg-[var(--color-dark-panel)] border-r border-[var(--color-dark-border)] gap-6">
        <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
          <MessageSquare size={24} />
        </div>
        <div className="p-2 rounded-xl hover:bg-gray-800 text-gray-400 cursor-pointer transition-colors">
          <Activity size={24} />
        </div>
        <div className="mt-auto p-2 rounded-xl hover:bg-gray-800 text-gray-400 cursor-pointer transition-colors">
          <Settings size={24} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* Top Header / Orb Area */}
        <div className="h-40 flex items-center justify-center border-b border-[var(--color-dark-border)] shrink-0 relative bg-[var(--color-dark-panel)]/50">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
          
          {/* Floating Assistant Orb */}
          <div className="w-20 h-20 rounded-full bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.6)] flex items-center justify-center animate-pulse">
            <div className="w-14 h-14 rounded-full bg-blue-400 opacity-80 mix-blend-screen" />
          </div>
        </div>

        {/* Panels Area */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Transcript Panel */}
          <div className="flex-1 flex flex-col p-6 overflow-y-auto">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Conversation</h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="self-start max-w-[80%] bg-[var(--color-dark-panel)] border border-[var(--color-dark-border)] rounded-2xl rounded-tl-sm px-4 py-3 text-sm">
                Hello! I am Javis. How can I help you today?
              </div>
              {logs.filter(l => l.sender !== 'system').map(log => (
                <div key={log.id} className={`max-w-[80%] border rounded-2xl px-4 py-3 text-sm ${log.sender === 'user' ? 'self-end bg-blue-600/20 border-blue-500/30 text-blue-100 rounded-tr-sm' : 'self-start bg-[var(--color-dark-panel)] border-[var(--color-dark-border)] rounded-tl-sm'}`}>
                  {log.text}
                </div>
              ))}
            </div>
          </div>

          {/* Task Log Panel */}
          <div className="w-72 bg-[var(--color-dark-panel)] border-l border-[var(--color-dark-border)] p-4 flex flex-col">
            <div className="mb-4 flex items-center gap-2">
              <Activity size={16} className="text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Activity Log</h2>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3">
              <div className="text-xs bg-black/30 p-3 rounded-lg border border-[var(--color-dark-border)]">
                <span className="text-blue-400 font-mono block mb-1">[SYSTEM]</span>
                Javis initialized and ready.
              </div>
              {logs.filter(l => l.sender === 'system').map(log => (
                 <div key={log.id} className="text-xs bg-black/30 p-3 rounded-lg border border-[var(--color-dark-border)]">
                   <span className="text-gray-500 font-mono block mb-1">[WS]</span>
                   {log.text}
                 </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* Input Bar */}
        <div className="h-20 border-t border-[var(--color-dark-border)] bg-[var(--color-dark-panel)] p-4 flex items-center gap-3 shrink-0">
          <button className="h-12 w-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 transition-colors shrink-0 focus:outline-none">
            <Mic size={20} />
          </button>
          
          <div className="flex-1 h-12 bg-[#0f1115] border border-[var(--color-dark-border)] rounded-full flex items-center px-4 focus-within:border-blue-500/50 transition-colors">
            <input
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-600"
              placeholder="Ask Javis or type a command..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
            />
          </div>
          
          <button 
            onClick={handleSend}
            className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors shrink-0 focus:outline-none ${inputText.trim() ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-gray-800 text-gray-500'}`}
            disabled={!inputText.trim()}
          >
            <Send size={18} className={inputText.trim() ? 'ml-1' : ''} />
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
