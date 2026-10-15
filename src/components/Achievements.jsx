import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { content } from '../content';

const Achievements = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  
  const achievements = content.achievements.slice(0, 6); // Exactly SIX panels
  
  // Triplicate for infinite seamless marquee loop on desktop (UNTOUCHED)
  const desktopRailItems = [...achievements, ...achievements, ...achievements];

  // Mobile carousel refs
  const mobileContainerRef = useRef(null);
  const cardRefs = useRef([]);

  // Detect which card is nearest center on mobile scroll
  useEffect(() => {
    const el = mobileContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const containerRect = el.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      let closestIdx = 0;
      let minDistance = Infinity;

      cardRefs.current.forEach((child, idx) => {
        if (!child) return;
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const dist = Math.abs(centerX - childCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveMobileIndex(closestIdx);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMobileIndex = (index) => {
    const newIndex = Math.max(0, Math.min(index, achievements.length - 1));
    setActiveMobileIndex(newIndex);
    const targetCard = cardRefs.current[newIndex];
    if (targetCard && mobileContainerRef.current) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  };

  const prevMobile = () => scrollToMobileIndex(activeMobileIndex - 1);
  const nextMobile = () => scrollToMobileIndex(activeMobileIndex + 1);

  return (
    <section id="achievements" className="py-24 bg-bg text-text overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <h2 className="section-title">Achievements</h2>
      </div>

      {/* ========================================================
          DESKTOP: CONTINUOUS SLANTED-PANEL MARQUEE RAIL
          ======================================================== */}
      <div className="hidden md:flex relative w-full h-[460px] items-center overflow-visible">
        <div 
          className={`flex gap-6 absolute left-0 will-change-transform no-scrollbar py-8 ${
            hoveredId !== null ? 'animate-none' : ''
          }`}
          style={{ 
            width: 'max-content', 
            animation: hoveredId !== null ? 'none' : 'achievementRail 45s linear infinite' 
          }}
        >
          {desktopRailItems.map((item, idx) => {
            const uniqueId = `desktop-${item.id}-${idx}`;
            const isHovered = hoveredId === uniqueId;
            const isAnyHovered = hoveredId !== null;
            
            return (
              <div 
                key={uniqueId}
                onMouseEnter={() => setHoveredId(uniqueId)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative h-[340px] w-[260px] transition-all duration-300 ease-out cursor-pointer origin-center flex-shrink-0 ${
                  isHovered 
                    ? 'scale-[1.3] z-30 mx-8 shadow-theme ring-2 ring-accent' 
                    : isAnyHovered 
                      ? 'opacity-40 scale-95 z-10' 
                      : 'hover:scale-105 z-10'
                }`}
                style={{
                  clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0% 100%)'
                }}
              >
                {/* Image Background */}
                <div className="absolute inset-0 w-full h-full bg-surface">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover scale-125"
                    onError={(e) => { 
                      e.target.style.display = 'none'; 
                      e.target.nextSibling.style.display = 'flex'; 
                    }}
                  />
                  <div style={{ display: 'none' }} className="w-full h-full bg-surface-2 items-center justify-center">
                    <span className="text-text-muted font-display text-xs">IMG</span>
                  </div>
                </div>

                {/* Embedded Description Overlay inside slanted panel */}
                <div className={`absolute inset-0 flex flex-col justify-end p-5 pb-7 transition-all duration-300 ${
                  isHovered 
                    ? 'bg-gradient-to-t from-black/95 via-black/75 to-transparent' 
                    : 'bg-gradient-to-t from-black/85 via-black/50 to-transparent'
                }`}>
                  <div className="transform skew-x-12 ml-3">
                    <h3 className="text-accent-text font-display font-bold text-lg leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className={`text-[#FFF8E7] text-xs font-body transition-all duration-300 leading-snug ${
                      isHovered ? 'opacity-100 max-h-24 mt-1.5' : 'opacity-85 line-clamp-2'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          MOBILE: CAROUSEL-BASED SLIDER WITH PEEKING CARDS
          ======================================================== */}
      <div className="md:hidden relative w-full overflow-hidden py-4">
        {/* Swipable Carousel with Scroll-Snap */}
        <div
          ref={mobileContainerRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory gap-4 px-[calc(50vw-120px)] py-6 items-center"
          style={{
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {achievements.map((item, idx) => {
            const isCentered = idx === activeMobileIndex;

            return (
              <div 
                key={`mobile-${item.id}-${idx}`}
                id={`mobile-${item.id}`}
                ref={(el) => (cardRefs.current[idx] = el)}
                onClick={() => scrollToMobileIndex(idx)}
                className={`snap-center relative h-[320px] w-[240px] flex-shrink-0 transition-all duration-300 ease-out cursor-pointer origin-center ${
                  isCentered 
                    ? 'scale-[1.08] z-20 shadow-theme ring-2 ring-accent opacity-100' 
                    : 'scale-[0.92] opacity-60 z-10'
                }`}
                style={{
                  clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0% 100%)'
                }}
              >
                {/* Image Background */}
                <div className="absolute inset-0 w-full h-full bg-surface">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover scale-125"
                    onError={(e) => { 
                      e.target.style.display = 'none'; 
                      e.target.nextSibling.style.display = 'flex'; 
                    }}
                  />
                  <div style={{ display: 'none' }} className="w-full h-full bg-surface-2 items-center justify-center">
                    <span className="text-text-muted font-display text-xs">IMG</span>
                  </div>
                </div>

                {/* Embedded description overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 pb-7 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300">
                  <div className="transform skew-x-12 ml-2">
                    <h3 className="text-accent-text font-display font-bold text-base leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className={`text-[#FFF8E7] text-xs font-body leading-snug transition-all duration-300 ${
                      isCentered ? 'opacity-100 max-h-20' : 'opacity-85 line-clamp-2'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Navigation Controls: Arrows and Dots */}
        <div className="flex items-center justify-between px-6 mt-3 max-w-sm mx-auto">
          {/* Left Arrow Button (44px min tap target) */}
          <button
            onClick={prevMobile}
            disabled={activeMobileIndex === 0}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-surface border border-border text-text hover:text-accent-text disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition shadow-sm active:scale-95"
            aria-label="Previous achievement"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Pagination Dots */}
          <div className="flex gap-2 bg-surface/80 border border-border/80 px-3.5 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
            {achievements.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToMobileIndex(idx)}
                aria-label={`Go to achievement ${idx + 1}`}
                className={clsx(
                  "h-2 rounded-full transition-all duration-300",
                  idx === activeMobileIndex ? "bg-accent w-6" : "bg-text-muted/40 w-2 hover:bg-text-muted"
                )}
              />
            ))}
          </div>

          {/* Right Arrow Button (44px min tap target) */}
          <button
            onClick={nextMobile}
            disabled={activeMobileIndex === achievements.length - 1}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-surface border border-border text-text hover:text-accent-text disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition shadow-sm active:scale-95"
            aria-label="Next achievement"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes achievementRail {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.333% - 1.5rem)); }
        }
      `}} />
    </section>
  );
};

export default Achievements;
