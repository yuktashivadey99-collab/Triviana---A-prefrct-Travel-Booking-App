import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, Mic, RefreshCw, Lightbulb } from "lucide-react";

const QUICK_PROMPTS = [
  "Best beaches in India under ₹15,000",
  "Honeymoon packages in Maldives",
  "Family trip to Rajasthan — 6 days",
  "International trips in June under ₹50,000",
  "Weekend getaways from Mumbai",
];

const SAMPLE_RESPONSES = {
  "Best beaches in India under ₹15,000": `🏖️ **Top Budget Beach Destinations:**

**1. Goa** — India's most popular beach destination
- Best time: October–March
- Avg budget: ₹8,000–₹12,000/person (4N/5D)
- Don't miss: Baga, Calangute, Palolem beaches

**2. Andaman Islands** — Crystal-clear waters
- Best time: November–April  
- Avg budget: ₹13,000–₹15,000 (5N/6D with flights)

**3. Varkala, Kerala** — Cliffside beauty
- Best time: October–February
- Budget: ₹6,000–₹10,000 (3N/4D)

Want me to check live prices and availability? 🤔`,

  default: `✈️ Great question! I'm **Diya**, your AI travel companion powered by Triviana.

I can help you with:
- 🏨 Finding the best hotels & resorts
- ✈️ Cheapest flights & deals
- 🗺️ Custom itineraries
- 📅 Seasonal recommendations
- 💰 Budget planning

Just tell me where you'd like to go, and I'll craft your perfect trip! What's your dream destination? 🌍`
};

export default function DiyaAI() {
  const [open, setOpen]       = useState(false);
  const [messages, setMsgs]   = useState([
    { role: "ai", text: "Hi! I'm **Diya** 👋, your AI travel assistant. Tell me about your dream trip and I'll make it happen!" }
  ]);
  const [input, setInput]     = useState("");
  const [typing, setTyping]   = useState(false);
  const bottomRef             = useRef(null);
  const inputRef              = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = (text) => {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setMsgs(m => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const response = SAMPLE_RESPONSES[userMsg] ?? SAMPLE_RESPONSES.default;
      setMsgs(m => [...m, { role: "ai", text: response }]);
      setTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const renderText = (text) =>
    text.split("\n").map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: bold }} />;
    });

  return (
    <>
      {/* ── Floating AI Button ─────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {!open && (
          <div className="animate-bounce-soft">
            <div className="bg-dark-800 border border-dark-600 text-slate-300 text-xs px-3 py-1.5 rounded-full mb-2 whitespace-nowrap shadow-lg">
              Chat with Diya AI ✨
            </div>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            open
              ? "bg-dark-700 hover:bg-dark-600 border border-dark-600"
              : "bg-gradient-to-br from-purple-600 to-primary-500 ai-glow hover:scale-110"
          }`}
        >
          {open
            ? <X className="w-5 h-5 text-slate-300" />
            : <Sparkles className="w-6 h-6 text-white" />
          }
        </button>
      </div>

      {/* ── Chat Window ───────────────────────────────────── */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] glass-dark border border-dark-600/80 rounded-3xl shadow-2xl overflow-hidden animate-fade-up">

          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-dark-600/60 bg-gradient-to-r from-purple-900/40 to-dark-800/60">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-primary-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-dark-800" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Diya AI</p>
              <p className="text-emerald-400 text-xs">Online · Travel Expert</p>
            </div>
            <button onClick={() => setMsgs([{ role: "ai", text: "Hi! I'm **Diya** 👋, your AI travel assistant. Tell me about your dream trip and I'll make it happen!" }])}
              className="ml-auto p-1.5 rounded-lg hover:bg-dark-700 text-slate-500 hover:text-white transition-all">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-4 space-y-3 hide-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.role === "ai"
                    ? "bg-gradient-to-br from-purple-500 to-primary-500"
                    : "bg-dark-600"
                }`}>
                  {msg.role === "ai"
                    ? <Sparkles className="w-3.5 h-3.5 text-white" />
                    : <User className="w-3.5 h-3.5 text-slate-300" />
                  }
                </div>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm space-y-1 ${
                  msg.role === "ai"
                    ? "bg-dark-700 text-slate-200 rounded-tl-sm"
                    : "bg-primary-500/20 text-white border border-primary-500/30 rounded-tr-sm"
                }`}>
                  {renderText(msg.text)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-purple-500 to-primary-500">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-dark-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  <span className="loading-dot" /><span className="loading-dot" /><span className="loading-dot" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-4 py-2 border-t border-dark-600/40">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
              {QUICK_PROMPTS.map(p => (
                <button key={p} onClick={() => send(p)}
                  className="flex-shrink-0 text-[10px] bg-dark-700 hover:bg-primary-500/20 hover:border-primary-500/40 text-slate-400 hover:text-primary-300 border border-dark-600 rounded-full px-3 py-1 transition-all flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" /> {p.length > 25 ? p.slice(0,25)+"…" : p}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-dark-600/60 flex gap-2">
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send(input))}
              placeholder="Ask Diya about your trip…"
              className="flex-1 bg-dark-700 border border-dark-600 text-white placeholder-slate-500 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-500/60 transition-all" />
            <button onClick={() => send(input)}
              className="w-10 h-10 bg-gradient-to-br from-purple-600 to-primary-500 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
