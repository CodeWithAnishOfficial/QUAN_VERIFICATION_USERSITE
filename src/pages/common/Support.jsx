import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  MessageSquare, 
  HelpCircle, 
  Shield, 
  Search, 
  ChevronRight,
  Headphones,
  Paperclip,
  Smile,
  MoreVertical,
  CheckCheck,
  Info,
  Circle
} from 'lucide-react';

const Support = () => {
  const [activeTopic, setActiveTopic] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  
  // Topic-specific message histories
  const [conversations, setConversations] = useState({
    1: [
      { id: 1, type: 'bot', text: "Welcome to Identity Verification Support! 👋", time: '10:00 AM' },
      { id: 2, type: 'bot', text: "I'm here to help you with your verification process. What's on your mind?", time: '10:00 AM' }
    ],
    2: [
      { id: 1, type: 'bot', text: "Account Settings Support. How can I help with your profile?", time: '11:20 AM' }
    ],
    3: [
      { id: 1, type: 'bot', text: "Hello! Company Portal support here. Are you having trouble registering your organization?", time: '09:45 AM' }
    ],
    4: [
      { id: 1, type: 'bot', text: "Security Protocols Support. Your data safety is our priority.", time: '08:30 AM' }
    ]
  });

  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const currentMessages = conversations[activeTopic] || [];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const newUserMsg = {
      id: Date.now(),
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update conversation state
    setConversations(prev => ({
      ...prev,
      [activeTopic]: [...(prev[activeTopic] || []), newUserMsg]
    }));
    
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: getBotResponse(input),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setConversations(prev => ({
        ...prev,
        [activeTopic]: [...(prev[activeTopic] || []), botResponse]
      }));
      setIsTyping(false);
      inputRef.current?.focus();
    }, 1500);
  };

  const getBotResponse = (userInput) => {
    const text = userInput.toLowerCase();
    if (text.includes('hello') || text.includes('hi')) return "Hello! How can I assist you today?";
    if (text.includes('status')) return "You can check your verification status in your User Dashboard under the 'Documents' section.";
    if (text.includes('time')) return "Standard verification takes 2-3 business days depending on the institution response time.";
    return "I've logged your query. A specialist will look into this and get back to you within 2 minutes. Is there anything else?";
  };

  const topics = [
    { id: 1, title: "Identity Verification", icon: <Shield size={18} />, desc: "Verify your credentials" },
    { id: 2, title: "Account Settings", icon: <User size={18} />, desc: "Manage profile & data" },
    { id: 3, title: "Company Portals", icon: <Headphones size={18} />, desc: "Business & Org tools" },
    { id: 4, title: "Security Protocols", icon: <HelpCircle size={18} />, desc: "2FA & Data safety" }
  ];

  const activeTopicData = topics.find(t => t.id === activeTopic);

  return (
    <div className="h-[calc(100vh-72px)] bg-[#F0F2F5] flex overflow-hidden">
      {/* Sidebar - Topics & FAQs */}
      <div className="w-full max-w-[380px] bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-black text-quanverification-brand mb-4">Help & Support</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search help topics..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-quanverification-brand/10"
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto py-4">
          <div className="px-6 mb-4">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Support Channels</span>
          </div>
          <div className="space-y-1 px-3">
            {topics.map((topic) => (
              <button 
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  activeTopic === topic.id ? 'bg-quanverification-light-brand text-quanverification-brand' : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  activeTopic === topic.id ? 'bg-quanverification-brand text-white shadow-lg' : 'bg-gray-100'
                }`}>
                  {topic.icon}
                </div>
                <div className="text-left overflow-hidden">
                  <p className="font-bold text-[15px] truncate">{topic.title}</p>
                  <p className="text-[12px] opacity-70 truncate">{topic.desc}</p>
                </div>
                {activeTopic === topic.id && (
                  <motion.div layoutId="active-dot" className="ml-auto w-2 h-2 bg-quanverification-brand rounded-full"></motion.div>
                )}
              </button>
            ))}
          </div>

          <div className="px-6 mt-8 mb-4">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Help Articles</span>
          </div>
          <div className="px-6 space-y-4">
            {["Password Reset", "Verification Timeline", "Data Privacy"].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-quanverification-brand transition-colors group">
                {item}
                <ChevronRight size={16} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex items-center gap-3">
          <div className="w-10 h-10 bg-quanverification-brand rounded-full flex items-center justify-center text-white font-bold text-sm">QV</div>
          <div>
            <p className="text-[13px] font-bold">QuanVerification Help</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-[11px] text-gray-500">System Secure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col bg-white">
        {/* Chat Header */}
        <div className="h-[72px] px-8 border-b border-gray-100 flex items-center justify-between shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-quanverification-brand rounded-full flex items-center justify-center text-white font-black text-lg">QV</div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
            </div>
            <div>
              <h2 className="font-black text-gray-900 text-lg">{activeTopicData?.title} Support</h2>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-green-600 font-bold">Online Now</span>
                <span className="text-gray-300">•</span>
                <span className="text-[12px] text-gray-500">Replies in seconds</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors"><Info size={20} /></button>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-grow overflow-y-auto p-8 space-y-6 bg-[#F8F9FA] custom-scrollbar">
          <div className="flex justify-center mb-8">
            <span className="px-4 py-1.5 bg-white shadow-sm border border-gray-100 rounded-full text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Today
            </span>
          </div>

          <AnimatePresence initial={false}>
            {currentMessages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex flex-col gap-1 max-w-[70%] ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-5 py-3.5 rounded-3xl shadow-sm text-[15px] leading-relaxed ${
                    msg.type === 'user' 
                      ? 'bg-quanverification-brand text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                  }`}>
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1.5 px-1">
                    <span className="text-[11px] text-gray-400 font-medium">{msg.time}</span>
                    {msg.type === 'user' && <CheckCheck size={14} className="text-quanverification-brand opacity-60" />}
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white px-5 py-4 rounded-3xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={chatEndRef} className="h-4" />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center gap-3">
            <div className="flex items-center gap-1 shrink-0">
              <button type="button" className="p-3 text-gray-400 hover:text-quanverification-brand hover:bg-quanverification-light-brand rounded-full transition-all">
                <Smile size={24} />
              </button>
              <button type="button" className="p-3 text-gray-400 hover:text-quanverification-brand hover:bg-quanverification-light-brand rounded-full transition-all">
                <Paperclip size={24} />
              </button>
            </div>
            
            <div className="flex-grow relative">
              <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write your message here..." 
                disabled={isTyping}
                className="w-full py-4 pl-6 pr-16 bg-gray-50 border border-gray-100 rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-quanverification-brand/10 focus:bg-white transition-all shadow-inner disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-quanverification-brand text-white rounded-xl hover:bg-quanverification-dark-brand transition-all disabled:opacity-20 shadow-lg active:scale-95"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
          <p className="text-center text-[11px] text-gray-400 mt-4 font-medium uppercase tracking-widest">
            End-to-end encrypted support session • Secure Data Transfer
          </p>
        </div>
      </div>
    </div>
  );
};

const User = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default Support;
