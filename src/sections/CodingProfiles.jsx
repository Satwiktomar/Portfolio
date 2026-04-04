import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { codingProfiles } from '../data/portfolio'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'

export default function CodingProfiles() {
  const [profiles, setProfiles] = useState(codingProfiles)

  useEffect(() => {
    let isMounted = true;
    
    // Helper to incrementally update a single platform's rating safely
    const updateProfile = (platform, newRating) => {
      if (!isMounted) return;
      setProfiles(prev => prev.map(p => p.platform === platform ? { ...p, rating: newRating } : p));
    };

    // 1. Fetch live LeetCode stats
    // We don't await this so it doesn't block the other fetches if Heroku sleeps/times out
    fetch('https://leetcode-stats-api.herokuapp.com/satwickk49')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.totalSolved) {
          updateProfile('LeetCode', `${data.totalSolved} Problems Solved`);
        }
      })
      .catch(err => console.warn('LeetCode fetch failed', err));

    // 2. Fetch live Codeforces stats
    fetch('https://codeforces.com/api/user.info?handles=satwickk49')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'OK' && data.result?.[0]) {
          const user = data.result[0];
          let rank = user.rank || user.maxRank || 'Active';
          rank = rank.charAt(0).toUpperCase() + rank.slice(1);
          
          if (user.rating) {
            updateProfile('Codeforces', `${rank} (${user.rating})`);
          } else {
            updateProfile('Codeforces', rank); // Fallback for unrated/newbie
          }
        }
      })
      .catch(err => console.warn('Codeforces fetch failed', err));

    // 3. Fetch live GitHub stats (Total Contributions)
    fetch('https://github-contributions-api.deno.dev/Satwiktomar.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.totalContributions !== undefined) {
          updateProfile('GitHub', `${data.totalContributions} Contributions`);
        }
      })
      .catch(err => console.warn('GitHub fetch failed', err));
    
    return () => { isMounted = false; };
  }, []);
  return (
    <SectionWrapper id="coding">
      <SectionHeading
        title="Coding Profiles"
        subtitle="My active presences across competitive programming and open-source platforms."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-[85rem] mx-auto w-full px-2 sm:px-0">
        {profiles.map((profile, index) => {
          const Icon = profile.icon;
          return (
            <motion.a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 xl:p-10 rounded-[2rem] border border-white/10 flex flex-col items-center justify-center text-center gap-6 group hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]"
            >
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white/5 transition-transform duration-300 group-hover:scale-110 shadow-lg border border-white/5"
                style={{ color: profile.color }}
              >
                <Icon className="text-5xl drop-shadow-lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide group-hover:text-accent-light transition-colors">{profile.platform}</h3>
                <p className="text-base text-text-secondary font-medium">{profile.rating}</p>
              </div>
            </motion.a>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
