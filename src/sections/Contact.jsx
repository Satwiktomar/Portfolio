import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import { personalInfo, socialLinks } from '../data/portfolio'
import { FiSend, FiMail, FiMapPin, FiCheck, FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Contact(props) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const formRef = useRef()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setIsSending(true)

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          setIsSending(false)
          setSubmitted(true)
          setForm({ name: '', email: '', message: '' })
          setTimeout(() => setSubmitted(false), 4000)
          if (props.popupFn) props.popupFn()
        },
        (error) => {
          setIsSending(false)
          console.error("Failed to send message:", error)
        }
      )
  }

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        title="Get in Touch"
        subtitle="Have some questions or want to collaborate? Feel free to reach out."
      />

      <div className="w-full flex justify-center px-4 mt-8">
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong p-8 sm:p-14 space-y-8 w-full max-w-4xl"
        >
          <div>
            <label htmlFor="contact-name" className="block text-base font-medium text-text-secondary mb-3">Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full px-6 py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-text-muted text-base focus:outline-none focus:border-accent/40 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-base font-medium text-text-secondary mb-3">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full px-6 py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-text-muted text-base focus:outline-none focus:border-accent/40 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-base font-medium text-text-secondary mb-3">Message</label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Feel free to reach out..."
              rows={6}
              required
              className="w-full px-6 py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-text-muted text-base leading-relaxed focus:outline-none focus:border-accent/40 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all duration-300 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full glow-btn glow-btn-primary flex items-center justify-center gap-2 py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSend size={16} className={isSending ? "animate-pulse" : ""} />
            {isSending ? "SENDING MESSAGE..." : "Send Message"}
          </button>
        </motion.form>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-strong flex items-center gap-3 px-6 py-4 rounded-2xl shadow-[0_0_40px_rgba(99,102,241,0.15)]"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
              <FiCheck size={16} className="text-green-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Message sent successfully!</p>
              <p className="text-text-muted text-xs">I'll get back to you shortly.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
