import React, { useState, useRef, useEffect } from 'react';
import { content } from '../content';

const AchievementCard = ({ item }) => {
  return (
    <div className="relative h-[340px] w-[260px] sm:w-[280px] rounded-2xl overflow-hidden border border-border shadow-theme bg-surface group flex-shrink-0 cursor-pointer select-none">
      {/* 100% Full-Background Image with aggressive hover:scale-110 zoom */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 will-change-transform"
          onError={(e) => {
            e.target.style.display = 'none';
            if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div 
          style={{ display: 'none' }} 
          className="w-full h-full bg-surface-2 flex-col items-center justify-center p-4 text-center"
        >
          <span className="text-accent-text font-display font-bold text-sm mb-1">{item.title}</span>
          <span className="text-text-muted text-xs font-body">Achievement Image</span>
        </div>
      </div>

      {/* Blurred Bottom Overlay strictly anchored to bottom */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 backdrop-blur-md bg-black/60 dark:bg-black/75 border-t border-white/10 z-10 transition-colors">
        {/* Exactly two items: Bold Title + 1-line description summary */}
        <h3 className="text-base sm:text-lg font-heading font-bold text-white tracking-wide truncate mb-1 leading-snug">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm font-body text-white/85 line-clamp-1 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
};

const Achievements = () => {
  const [isPaused, setIsPaused] = useState(false);
  const achievements = content.achievements.slice(0, 6);

  // Marquee triplicate items for smooth infinite horizontal loop on desktop
  const desktopItems = [...achievements, ...achievements, ...achievements];

  // Mobile scroll reference
  const mobileScrollRef = useRef(null);

  return (
    <section id="achievements" className="py-20 sm:py-24 bg-bg text-text overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <h2 className="section-title">Achievements</h2>
      </div>

      {/* ========================================================
          DESKTOP: SEAMLESS HORIZONTAL MARQUEE RAIL
          ======================================================== */}
      <div 
        className="hidden md:flex relative w-full h-[380px] items-center overflow-visible"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="flex gap-6 absolute left-0 will-change-transform py-4"
          style={{ 
            width: 'max-content', 
            animation: isPaused ? 'none' : 'achievementMarquee 40s linear infinite' 
          }}
        >
          {desktopItems.map((item, idx) => (
            <AchievementCard 
              key={`desktop-${item.id}-${idx}`} 
              item={item} 
            />
          ))}
        </div>
      </div>

      {/* ========================================================
          MOBILE: TOUCH SCROLL RAIL WITH SNAP
          ======================================================== */}
      <div className="md:hidden relative w-full overflow-hidden py-2">
        <div
          ref={mobileScrollRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory gap-4 px-6 py-4 items-center"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {[...achievements, ...achievements].map((item, idx) => (
            <div 
              key={`mobile-${item.id}-${idx}`} 
              className="snap-center flex-shrink-0"
            >
              <AchievementCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes achievementMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.333% - 1rem)); }
        }
      `}} />
    </section>
  );
};

export default Achievements;
