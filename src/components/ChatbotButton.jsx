import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageCircle, FiX, FiSend, FiUser, FiCode } from 'react-icons/fi'
import { chatbotKnowledge, personalInfo } from '../data/portfolio'

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: chatbotKnowledge.greetings[0], isBot: true },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const quickPrompts = [
    "What is your tech stack?",
    "Tell me about BeaverAI",
    "Where have you worked?",
    "What are your certifications?"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Simple keyword-based intent matching specific to Satwik
  const getBotResponse = (query) => {
    const q = query.toLowerCase()
    
    // Project specific queries
    if (q.includes('beaver') || q.includes('interview')) return chatbotKnowledge.projects.beaverai
    if (q.includes('alignithm') || q.includes('resume') || q.includes('ats')) return chatbotKnowledge.projects.alignithmai
    if (q.includes('edna') || q.includes('sih') || q.includes('aqua') || q.includes('genesis')) return chatbotKnowledge.projects.aquagenesis
    if (q.includes('review') || q.includes('nexus') || q.includes('maps')) return chatbotKnowledge.projects.reviewnexus
    if (q.includes('medipal') || q.includes('health')) return chatbotKnowledge.projects.medipal
    
    // General queries
    if (q.includes('project') || q.includes('built') || q.includes('made') || q.includes('work')) {
      return `Satwik has built numerous AI projects! His featured ones are BeaverAI (Interview Platform), AlignithmAI, and AquaGenesis. You can ask me specifically about any of these!`
    }
    
    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('know')) {
      return chatbotKnowledge.skills
    }
    
    if (q.includes('experience') || q.includes('work') || q.includes('intern') || q.includes('job') || q.includes('padho')) {
      return chatbotKnowledge.experience
    }
    
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('github') || q.includes('linkedin')) {
      return chatbotKnowledge.contact
    }
    
    if (q.includes('education') || q.includes('study') || q.includes('college') || q.includes('university') || q.includes('gpa') || q.includes('degree')) {
      return chatbotKnowledge.education
    }

    if (q.includes('certificat') || q.includes('oracle') || q.includes('oci')) {
      return chatbotKnowledge.certifications
    }

    if (q.includes('achieve') || q.includes('gate') || q.includes('ctf') || q.includes('hackathon')) {
      return chatbotKnowledge.achievements
    }

    if (q.includes('competitive') || q.includes('leetcode') || q.includes('dsa') || q.includes('codechef') || q.includes('problem')) {
      return `Satwik is an active competitive programmer. He has solved over 150 DSA problems across LeetCode, CodeChef, and Codeforces, focusing heavily on algorithms and optimization.`
    }
    
    if (q.includes('hello') || q.includes('hi ') || q.includes('hey')) {
      return `Hello! I'm Satwik's AI assistant. How can I help you learn more about his background?`
    }
    
    if (q.includes('who are you') || q.includes('what are you') || q.includes('name')) {
      return `I am a custom AI assistant built into Satwik's portfolio. My knowledge is restricted to answering questions about Satwik Tomar's professional background, skills, and projects.`
    }

    // Default fallback
    return chatbotKnowledge.fallback
  }

  const handleSend = (textQuery) => {
    // textQuery can be an event or a string
    let userQuery = ''
    if (typeof textQuery === 'object') {
      textQuery.preventDefault()
      userQuery = input.trim()
    } else {
      userQuery = textQuery.trim()
    }

    if (!userQuery) return

    setMessages((prev) => [...prev, { text: userQuery, isBot: false }])
    setInput('')
    setIsTyping(true)

    // Simulate network delay for natural feel
    setTimeout(() => {
      const response = getBotResponse(userQuery)
      setMessages((prev) => [...prev, { text: response, isBot: true }])
      setIsTyping(false)
    }, 800 + Math.random() * 500)
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <div className="relative flex flex-col items-end">
              {/* Floating Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  opacity: { delay: 1.5, duration: 0.5 },
                  scale: { delay: 1.5, duration: 0.5, type: 'spring' },
                  y: { repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 1.5 }
                }}
                className="absolute -top-16 right-2 bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] text-white text-xs px-4 py-2.5 rounded-2xl rounded-br-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] whitespace-nowrap font-medium z-10"
              >
                Have some questions? 
                <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-white/[0.05] border-r border-b border-white/[0.1] rotate-45 backdrop-blur-md" />
              </motion.div>

              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="w-16 h-16 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.1] shadow-[0_0_30px_rgba(99,102,241,0.3)] flex items-center justify-center text-white cursor-pointer relative overflow-hidden transition-transform z-20 group"
              >
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-20 transition-opacity z-10" />
                {/* The Mascot Image (Scaled to fix built-in padding) */}
                <img src="/assets/mascot.png" alt="Assistant Mascot" className="w-full h-full object-cover scale-[1.35] group-hover:scale-[1.45] transition-transform duration-500" />
              </motion.button>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="absolute bottom-0 right-0 w-[90vw] sm:w-[380px] h-[550px] max-h-[85vh] glass-strong rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(99,102,241,0.1)] border border-white/[0.08] flex flex-col overflow-hidden backdrop-blur-3xl"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/[0.05] bg-white/[0.02] flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-50" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative w-10 h-10">
                    <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0a] border border-white/[0.1] shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                      <img src="/assets/mascot.png" alt="Mascot" className="w-full h-full object-cover scale-[1.35]" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#121212] shadow-[0_0_8px_rgba(74,222,128,0.5)] z-10" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-[15px] tracking-wide">Satwik's Assistant</h3>
                    <p className="text-accent-light text-xs font-medium opacity-80 mt-0.5">Online • Always Ready</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:bg-white/[0.1] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5 scroll-smooth custom-scrollbar">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} items-end gap-2`}
                  >
                    {msg.isBot && (
                      <div className="w-6 h-6 rounded-full bg-[#0a0a0a] border border-white/[0.1] flex items-center justify-center shrink-0 mb-1 overflow-hidden">
                        <img src="/assets/mascot.png" alt="Bot" className="w-full h-full object-cover scale-[1.35]" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] px-4 py-3 text-[13px] leading-relaxed shadow-sm ${
                        msg.isBot
                          ? 'bg-white/[0.04] border border-white/[0.06] text-text-primary rounded-2xl rounded-bl-sm backdrop-blur-sm'
                          : 'bg-gradient-to-tr from-accent to-purple-600 text-white rounded-2xl rounded-br-sm shadow-[0_4px_20px_rgba(99,102,241,0.25)]'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Quick Prompts */}
                <AnimatePresence>
                  {messages.length === 1 && (
                    <motion.div 
                      key="quick-prompts"
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, opacity: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col items-end gap-2.5 w-full mt-8"
                    >
                      {quickPrompts.map((prompt, idx) => (
                        <motion.button
                          key={prompt}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                          onClick={() => handleSend(prompt)}
                          className="px-5 py-3 text-[13px] font-medium tracking-wide rounded-2xl rounded-br-sm bg-[#0a0a0a]/60 border border-white/[0.08] text-white/90 hover:text-white hover:bg-white/[0.08] hover:border-accent/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] active:scale-95 transition-all duration-300 cursor-pointer text-right max-w-[90%] group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span className="relative z-10">{prompt}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start items-end gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0a0a0a] border border-white/[0.1] flex items-center justify-center shrink-0 mb-1 overflow-hidden">
                      <img src="/assets/mascot.png" alt="Bot Typying" className="w-full h-full object-cover opacity-80 scale-[1.35]" />
                    </div>
                    <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 shadow-sm backdrop-blur-sm">
                      <motion.span animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} className="h-2" />
              </div>

              {/* Input Area */}
              <form
                onSubmit={handleSend}
                className="p-4 pb-5 border-t border-white/[0.05] bg-white/[0.01] shrink-0"
              >
                <div className="relative flex items-center group">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-full py-3.5 pl-5 pr-14 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent/40 focus:bg-white/[0.06] focus:ring-4 focus:ring-accent/10 transition-all font-light tracking-wide"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gradient-to-tr from-accent to-purple-500 text-white flex items-center justify-center disabled:opacity-40 disabled:scale-100 disabled:shadow-none hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] cursor-pointer"
                  >
                    <FiSend size={15} className="ml-[-2px] mt-[1px]" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
