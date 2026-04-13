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
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

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

  // Advanced keyword-based intent matching with scoring
  const getBotResponse = (query) => {
    const q = query.toLowerCase();

    const intents = [
      {
        keywords: ['beaverai', 'beaver', 'interview', 'proctoring', 'whisper', 'mediapipe', 'camera', 'video', 'tts', 'audio'],
        response: chatbotKnowledge.projects.beaverai,
        weight: 2
      },
      {
        keywords: ['alignithmai', 'alignithm', 'resume', 'ats', 'analyzer', 'gemini', 'scoring', 'similarity'],
        response: chatbotKnowledge.projects.alignithmai,
        weight: 2
      },
      {
        keywords: ['cryptael', 'crypt', 'vault', 'encryption', 'aes', 'blockchain', 'django', 'seed phrase', 'cybersecurity'],
        response: chatbotKnowledge.projects.cryptael,
        weight: 2
      },
      {
        keywords: ['aquagenesis', 'edna', 'sih', 'aqua', 'genesis', 'bio', 'taxa', 'classifier', 'hdbscan', 'cnn'],
        response: chatbotKnowledge.projects.aquagenesis,
        weight: 2
      },
      {
        keywords: ['reviewnexus', 'nexus', 'map', 'maps', 'sentiment', 'scraper', 'playwright', 'distilbert', 'review'],
        response: chatbotKnowledge.projects.reviewnexus,
        weight: 2
      },
      {
        keywords: ['medipal', 'health', 'doctor', 'patient', 'medical', 'hospital'],
        response: chatbotKnowledge.projects.medipal,
        weight: 2
      },
      {
        keywords: ['project', 'built', 'made', 'work on', 'portfolio', 'develop', 'create', 'github'],
        response: `Satwik has built numerous AI projects! His featured ones are Cryptael Vault (Blockchain/Custom Crypto), BeaverAI (Interview Platform), and AlignithmAI. You can ask me specifically about any of these!`,
        weight: 1
      },
      {
        keywords: ['skill', 'tech', 'stack', 'language', 'know', 'python', 'c++', 'sql', 'react', 'machine learning', 'ml', 'ai', 'framework', 'database', 'docker', 'tool'],
        response: chatbotKnowledge.skills,
        weight: 1
      },
      {
        keywords: ['experience', 'work', 'intern', 'job', 'padho', 'padho.ai', 'role', 'hire', 'company', 'employ'],
        response: chatbotKnowledge.experience,
        weight: 1.5
      },
      {
        keywords: ['contact', 'email', 'reach', 'github', 'linkedin', 'phone', 'call', 'message', 'social', 'connect'],
        response: chatbotKnowledge.contact,
        weight: 1
      },
      {
        keywords: ['education', 'study', 'college', 'university', 'gpa', 'degree', 'dsce', 'dayananda', 'student', 'graduate', 'grade'],
        response: chatbotKnowledge.education,
        weight: 1
      },
      {
        keywords: ['certificat', 'oracle', 'oci', 'credential', 'vector', 'generative ai', 'certified'],
        response: chatbotKnowledge.certifications,
        weight: 1.5
      },
      {
        keywords: ['achieve', 'gate', 'ctf', 'hackathon', 'award', 'competition', 'sandbox', 'glitchcraft', 'win', 'won'],
        response: chatbotKnowledge.achievements,
        weight: 1.5
      },
      {
        keywords: ['competitive', 'leetcode', 'dsa', 'codechef', 'problem', 'codeforces', 'rating', 'star', 'solving', 'algorithm'],
        response: `Satwik is an active competitive programmer. He has solved over 150 DSA problems across LeetCode, CodeChef, and Codeforces, focusing heavily on algorithms and optimization.`,
        weight: 1.5
      },
      {
        keywords: ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'what\'s up', 'sup'],
        response: `Hello! I'm ViT, Satwik's personal assistant. How can I help you learn more about his background?`,
        weight: 0.8
      },
      {
        keywords: ['who are you', 'what are you', 'name', 'bot', 'assistant', 'vit'],
        response: `I am ViT, a custom assistant built into Satwik's portfolio. My knowledge is restricted to answering questions about Satwik Tomar's professional background, skills, and projects.`,
        weight: 2
      },
      {
        keywords: ['about', 'who is', 'tell me about satwik', 'background', 'intro', 'bio'],
        response: chatbotKnowledge.about,
        weight: 1
      }
    ];

    let bestIntent = null;
    let maxScore = 0;

    for (const intent of intents) {
      let score = 0;
      for (const kw of intent.keywords) {
        // Escape special regex characters
        const escapedKw = kw.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedKw}\\b`, 'i');
        
        if (regex.test(q)) {
          // Score matches heavily based on the keyword's length to favor specificity
          score += (kw.length * intent.weight);
        } else if (q.includes(kw) && kw.length >= 5) {
          // Catch partial matches on substantive words as a fallback
          score += (kw.length * 0.5 * intent.weight);
        }
      }
      
      if (score > maxScore) {
        maxScore = score;
        bestIntent = intent;
      }
    }

    if (maxScore >= 4 && bestIntent) { // threshold to prevent single letter false positives
      return bestIntent.response;
    }

    return chatbotKnowledge.fallback;
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
      <div ref={modalRef} className="fixed bottom-6 right-6 z-50">
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
                className="chatbot-bubble absolute -top-12 right-0 hidden sm:block bg-[#111] border border-white/10 text-white/90 text-xs px-4 py-2 rounded-2xl rounded-br-sm shadow-xl whitespace-nowrap font-medium z-10"
              >
                Have some questions?
                <div className="chatbot-bubble-tail absolute -bottom-1 right-4 w-2 h-2 bg-[#111] border-r border-b border-white/10 rotate-45" />
              </motion.div>

              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                transition={{
                  scale: { type: 'spring', stiffness: 200, damping: 20 },
                  y: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
                }}
                className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center cursor-pointer relative z-20 group focus:outline-none"
              >
                <img 
                  src="/assets/mascot.png" 
                  alt="Assistant Tutorial" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(99,102,241,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(99,102,241,0.8)] transition-all duration-500" 
                />
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
              transition={{ type: 'spring', bounce: 0.25 }}
              className="chatbot-panel absolute bottom-0 right-0 w-[calc(100vw-3rem)] sm:w-[380px] h-[550px] max-h-[85vh] bg-[#0c0c0c]/90 rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden backdrop-blur-2xl"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <img src="/assets/mascot.png" alt="Mascot" className="w-[120%] h-[120%] object-contain filter drop-shadow-[0_0_10px_rgba(99,102,241,0.4)]" />
                    <span className="absolute bottom-1 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0c0c0c]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-[15px]">ViT</h3>
                    <p className="text-white/50 text-[11px] uppercase tracking-wide font-medium mt-0.5">Satwik's Assistant • Ready</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-y-auto p-5 pb-2 space-y-4 scroll-smooth custom-scrollbar flex flex-col">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} gap-2`}
                  >
                    {msg.isBot && (
                      <div className="w-8 h-8 flex shrink-0 items-end justify-center mt-auto">
                        <img src="/assets/mascot.png" alt="Bot" className="w-[120%] h-[120%] object-contain filter drop-shadow-[0_0_8px_rgba(99,102,241,0.3)] mb-[-2px]" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] px-4 py-2.5 text-[14px] leading-relaxed ${msg.isBot
                          ? 'bg-white/5 text-white/90 rounded-2xl rounded-bl-sm border border-white/5'
                          : 'bg-accent text-white rounded-2xl rounded-br-sm'
                        }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Quick Prompts - Repositioned & Stylized */}
                <AnimatePresence>
                  {messages.length === 1 && (
                    <motion.div
                      key="quick-prompts"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-wrap gap-2 mt-4"
                    >
                      {quickPrompts.map((prompt, idx) => (
                        <motion.button
                          key={prompt}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          onClick={() => handleSend(prompt)}
                          className="px-3 py-1.5 text-[12px] font-medium rounded-full bg-accent/10 border border-accent/20 text-accent-light hover:bg-accent hover:text-white hover:border-transparent active:scale-95 transition-all text-left"
                        >
                          {prompt}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start gap-2 mt-auto pb-2"
                  >
                    <div className="w-8 h-8 flex shrink-0 items-end justify-center mt-auto">
                      <img src="/assets/mascot.png" alt="Bot" className="w-[120%] h-[120%] object-contain filter drop-shadow-[0_0_8px_rgba(99,102,241,0.3)] mb-[-2px] opacity-70" />
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                      <motion.span animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <motion.span animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} className="h-2 shrink-0" />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-black/20 shrink-0">
                <form
                  onSubmit={handleSend}
                  className="relative flex items-center h-11"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="w-full h-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="absolute right-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white disabled:opacity-40 disabled:bg-white/10 hover:bg-accent-light active:scale-95 transition-all outline-none"
                  >
                    <FiSend size={14} className={input.trim() ? "translate-x-[-1px] translate-y-[1px]" : ""} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
