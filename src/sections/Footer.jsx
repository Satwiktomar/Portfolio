import { personalInfo, socialLinks } from '../data/portfolio'
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiCode, FiMapPin } from 'react-icons/fi'

const footerLinks = [
  { icon: FiGithub, href: socialLinks.github, label: 'GitHub' },
  { icon: FiLinkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
  { icon: FiCode, href: socialLinks.leetcode, label: 'LeetCode' },
  { icon: FiMail, href: socialLinks.email, label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] w-full flex justify-center">
      <div className="w-full max-w-4xl px-4 py-16 flex flex-col items-center justify-center text-center gap-10">
          
          {/* Brand */}
          <div className="flex flex-col items-center gap-4">
            <span className="font-display font-bold text-white text-3xl tracking-tight">Satwik Tomar</span>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 mt-2 text-text-secondary">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-white transition-colors text-base">
                <FiMail size={18} className="text-accent" />
                {personalInfo.email}
              </a>
              <div className="flex items-center gap-2 text-base">
                <FiMapPin size={18} className="text-accent" />
                {personalInfo.location}
              </div>
            </div>
          </div>

          {/* Social Links Layout */}
          <div className="flex items-center justify-center gap-8">
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors text-base font-medium">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
                <FiGithub size={20} />
              </div>
              <span>GitHub</span>
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors text-base font-medium">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
                <FiLinkedin size={20} />
              </div>
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="w-full max-w-2xl h-px bg-white/[0.06] mt-4" />
          <p className="text-text-muted text-sm flex items-center justify-center gap-1.5">
            © {new Date().getFullYear()} Satwik Tomar. Built with <FiHeart size={14} className="text-accent" /> and React.
          </p>
        </div>
    </footer>
  )
}
