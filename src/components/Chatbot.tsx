'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function ChatbotComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hey! 👋 I\'m GoVibe Assistant. How can I help you plan your trip today?' },
  ]);
  const [input, setInput] = useState('');

  const commonQuestions = [
    { q: 'Best time to visit?', a: 'Generally Oct–Mar offers pleasant weather across most of India. For beaches (Goa/Andaman), Nov–Feb; for Himalayas, Apr–Jun and Sep–Oct; for Kerala backwaters, Nov–Feb; avoid peak monsoon if you want clear skies.' },
    { q: 'Ideal trip duration?', a: 'City breaks: 2–3 days; region loops: 4–7 days; multi-city circuits: 7–10 days. Add +2 days if you want a relaxed pace with buffer time for travel delays.' },
    { q: 'Approx budget/cost?', a: 'Budget ranges per person per day: Budget ₹2k–4k, Mid ₹4k–8k, Comfort ₹8k–15k, Premium ₹15k+. Big drivers: stay type, internal flights, seasonality, activities.' },
    { q: 'Simple trip plan?', a: 'Day 1: Arrival + local highlights • Day 2: Major sights + signature activity • Day 3: Day trip/experience • Day 4+: Food walk, market, sunset/viewpoint; keep mornings for sights, evenings relaxed.' },
  ];

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: message }]);

    const text = message.toLowerCase();
    let reply = '';

    const isTime = text.includes('time') || text.includes('season') || text.includes('weather');
    const isDuration = text.includes('duration') || text.includes('days') || text.includes('how long');
    const isCost = text.includes('cost') || text.includes('budget') || text.includes('price');
    const isPlan = text.includes('plan') || text.includes('itinerary');

    if (isTime) reply = commonQuestions[0].a;
    else if (isDuration) reply = commonQuestions[1].a;
    else if (isCost) reply = commonQuestions[2].a;
    else if (isPlan) reply = commonQuestions[3].a;
    else reply = 'I can answer only four basics: Best time, Ideal duration, Approx cost, and a simple plan. Use the quick questions below.';

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', content: reply }]);
    }, 400);

    setInput('');
  };

  const handleQuickQuestion = (question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: question },
      { role: 'bot', content: answer },
    ]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-lg flex items-center justify-center z-[9999] hover:shadow-xl hover:shadow-amber-500/50 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xl">{isOpen ? '✕' : '💬'}</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-6 w-[90vw] max-w-md bg-gradient-to-br from-gray-900/98 to-black/98 border border-amber-500/30 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col z-[9998] max-h-[75vh]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 rounded-t-2xl">
              <h3 className="text-white font-bold text-lg">GoVibe Assistant</h3>
              <p className="text-white/80 text-xs">AI-powered travel assistant</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs ${
                      msg.role === 'user'
                        ? 'bg-amber-500 text-white'
                        : 'bg-white/10 text-gray-100 border border-white/20'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="px-4 py-3 border-t border-white/10">
              <p className="text-gray-400 text-xs mb-2">Quick questions:</p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {commonQuestions.map((item, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleQuickQuestion(item.q, item.a)}
                    className="w-full text-left text-xs px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-gray-300 hover:text-amber-400 transition"
                    whileHover={{ x: 2 }}
                  >
                    {item.q}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
                  placeholder="Ask: Best time • Duration • Cost • Simple plan"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400/50 text-sm"
                />
                <motion.button
                  onClick={() => handleSendMessage(input)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
