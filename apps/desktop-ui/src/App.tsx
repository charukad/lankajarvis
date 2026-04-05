import { useState, useEffect, useRef } from "react";
import { Mic, Send, Settings, Activity, MessageSquare } from "lucide-react";
import { useOrchestrator } from "./hooks/useOrchestrator";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const { messages, isConnected, sendMessage } = useOrchestrator();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText("");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[var(--color-dark-bg)] overflow-hidden select-none text-gray-200">
      
      {/* Sidebar / Settings Drawer Skeleton */}
      <div className="w-16 flex flex-col items-center py-4 bg-[var(--color-dark-panel)] border-r border-[var(--color-dark-border)] gap-6">
        <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
          <MessageSquare size={24} />
        </div>
        <div className="p-2 rounded-xl hover:bg-gray-800 text-gray-400 cursor-pointer transition-colors relative">
          <Activity size={24} />
          {isConnected && <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.8)]" />}
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
          <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${isConnected ? 'bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.6)] animate-pulse' : 'bg-gray-700 shadow-none grayscale opacity-50'}`}>
            <div className={`w-14 h-14 rounded-full bg-blue-400 opacity-80 mix-blend-screen ${isConnected ? '' : 'bg-gray-500'}`} />
          </div>
        </div>

        {/* Panels Area */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Transcript Panel */}
          <div className="flex-1 flex flex-col p-6 overflow-y-auto" ref={scrollRef}>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Conversation</h2>
            </div>
            <div className="flex flex-col gap-4">
              {messages.length === 0 && (
                <div className="self-start max-w-[80%] bg-[var(--color-dark-panel)] border border-[var(--color-dark-border)] rounded-2xl rounded-tl-sm px-4 py-3 text-sm italic text-gray-500">
                  {isConnected ? 'Conversation started.' : 'Waiting for connection...'}
                </div>
              )}
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`self-start max-w-[80%] border rounded-2xl px-4 py-3 text-sm ${
                    msg.type === 'error' ? 'bg-red-900/20 border-red-500/50 text-red-200' :
                    msg.type === 'system' ? 'bg-blue-900/10 border-blue-500/30 text-blue-200 italic' :
                    'bg-[var(--color-dark-panel)] border-[var(--color-dark-border)] rounded-tl-sm'
                  }`}
                >
                  {msg.text}
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
                {isConnected ? 'Javis initialized and ready.' : 'Connecting to orchestrator...'}
              </div>
              {messages.filter(m => m.type === 'system' || m.type === 'tool').map((msg, i) => (
                <div key={i} className={`text-xs p-3 rounded-lg border ${msg.type === 'tool' ? 'bg-blue-500/10 border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.1)]' : 'bg-black/30 border-[var(--color-dark-border)]'}`}>
                  <span className={`${msg.type === 'tool' ? 'text-blue-300' : 'text-gray-500'} font-mono block mb-1`}>
                    {msg.type === 'tool' ? '[TOOL]' : '[EVENT]'}
                  </span>
                  {msg.text}
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
              placeholder={isConnected ? "Ask Javis or type a command..." : "Orchestrator offline..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={!isConnected}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
            />
          </div>
          
          <button 
            onClick={handleSend}
            className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors shrink-0 focus:outline-none ${inputText.trim() && isConnected ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-gray-800 text-gray-500'}`}
            disabled={!inputText.trim() || !isConnected}
          >
            <Send size={18} className={inputText.trim() ? 'ml-1' : ''} />
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
