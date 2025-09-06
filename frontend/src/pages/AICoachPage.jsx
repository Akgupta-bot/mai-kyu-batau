import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import AiAvatar from '../components/AiAvatar';

const AICoachPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I'm your AI Coach. Ask me anything about anti-doping, substances, or fair play. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      // send POST request to FastAPI backend
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: "user123",
          message: input,
        }),
      });

      const data = await res.json();

      const aiResponse = {
        sender: 'ai',
        text: data.reply || "Sorry, I couldn’t generate a response.",
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error talking to backend:", error);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: "⚠️ Server error. Please try again later." },
      ]);
    }
  };


  const suggestionPrompts = [
    'What are the side effects of steroids?',
    'Is caffeine a banned substance?',
    'How does a TUE work?',
    'What happens if I miss a drug test?',
  ];

  return (
    <div className="min-h-screen flex flex-col items-center pt-24 pb-8 px-4">
      <div className="w-full max-w-4xl mx-auto flex flex-col flex-grow">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-white">AI Coach</h1>
          <p className="text-slate-400 mt-2">Your personal guide to clean sport and fair play.</p>
        </div>

        <div className="flex-grow mb-6 overflow-y-auto p-4 rounded-lg border border-slate-800 bg-slate-900/50 min-h-[400px]">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`flex items-start gap-4 mb-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >

              {msg.sender === 'ai' && <AiAvatar />}

              <div className={`max-w-lg p-3 rounded-xl ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                <p>{msg.text}</p>
              </div>
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>


        <div className="grid grid-cols-2 gap-4 mb-4">
          {suggestionPrompts.map((prompt, index) => (
            <motion.button
              key={index}
              className="p-4 bg-slate-800 border border-slate-700 rounded-lg text-left text-slate-300 hover:bg-slate-700 transition-colors"
              whileHover={{ y: -2 }}
              onClick={() => setInput(prompt)}
            >
              {prompt}
            </motion.button>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-4 pl-4 pr-14 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-blue-400">
            <FiSend size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AICoachPage;