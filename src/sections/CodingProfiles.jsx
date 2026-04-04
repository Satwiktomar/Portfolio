import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { codingProfiles } from '../data/portfolio'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'

export default function CodingProfiles() {
  const [profiles, setProfiles] = useState(codingProfiles)

  useEffect(() => {
    let isMounted = true;
    
    const fetchLiveStats = async () => {
      // Create a deep copy of the static profiles to safely mutate
      const liveProfiles = codingProfiles.map(p => ({ ...p }));

      // 1. Fetch live LeetCode stats
      try {
        const lcRes = await fetch('https://leetcode-stats-api.herokuapp.com/satwickk49');
        const lcData = await lcRes.json();
        if (lcData.status === 'success' && lcData.totalSolved) {
          const lcIndex = liveProfiles.findIndex(p => p.platform === 'LeetCode');
          if (lcIndex !== -1) liveProfiles[lcIndex].rating = `${lcData.totalSolved} Problems Solved`;
        }
      } catch (err) { console.warn('LeetCode fetch failed, falling back to static.'); }

      // 2. Fetch live Codeforces stats
      try {
        const cfRes = await fetch('https://codeforces.com/api/user.info?handles=satwickk49');
        const cfData = await cfRes.json();
        if (cfData.status === 'OK' && cfData.result?.[0]?.rating) {
          const cfIndex = liveProfiles.findIndex(p => p.platform === 'Codeforces');
          if (cfIndex !== -1) {
            const rating = cfData.result[0].rating;
            let rank = cfData.result[0].rank || 'Active';
            rank = rank.charAt(0).toUpperCase() + rank.slice(1); // Capitalize
            liveProfiles[cfIndex].rating = `${rank} (${rating})`;
          }
        }
      } catch (err) { console.warn('Codeforces fetch failed, falling back to static.'); }

      // 3. Fetch live GitHub stats (Total Contributions)
      try {
        const ghRes = await fetch('https://github-contributions-api.deno.dev/Satwiktomar.json');
        const ghData = await ghRes.json();
        if (ghData && ghData.totalContributions !== undefined) {
          const ghIndex = liveProfiles.findIndex(p => p.platform === 'GitHub');
          if (ghIndex !== -1) liveProfiles[ghIndex].rating = `${ghData.totalContributions} Contributions`;
        }
      } catch (err) { console.warn('GitHub contributions fetch failed, falling back to static.'); }

      if (isMounted) {
        setProfiles(liveProfiles);
      }
    };

    fetchLiveStats();
    
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
