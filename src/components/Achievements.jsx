import React, { useState, useRef, useEffect } from 'react';
import { content } from '../content';

const Achievements = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [mobileCenterIndex, setMobileCenterIndex] = useState(0);
  const [heldId, setHeldId] = useState(null);
  
  const achievements = content.achievements.slice(0, 6); // Exactly SIX panels
  
  // Mobile horizontal auto-scroll & center detection
  const mobileScrollRef = useRef(null);
  const isInteractingRef = useRef(false);
  const rafScrollId = useRef(null);

  useEffect(() => {
    const el = mobileScrollRef.current;
    if (!el) return;

    // Detect panel nearest center
    const handleScroll = () => {
      const containerRect = el.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      const children = Array.from(el.children);
      let closestIdx = 0;
      let minDistance = Infinity;

      children.forEach((child, idx) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const dist = Math.abs(centerX - childCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx % achievements.length;
        }
      });

      setMobileCenterIndex(closestIdx);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth subtle auto-scroll on mobile when not interacting and not held
    const autoScrollSpeed = 0.5; // pixels per frame
    const scrollStep = () => {
      if (!isInteractingRef.current && !heldId && el) {
        el.scrollLeft += autoScrollSpeed;
        // Loop back smoothly if reached near end
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
          el.scrollLeft = 1;
        }
      }
      rafScrollId.current = requestAnimationFrame(scrollStep);
    };

    rafScrollId.current = requestAnimationFrame(scrollStep);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (rafScrollId.current) cancelAnimationFrame(rafScrollId.current);
    };
  }, [achievements.length, heldId]);

  const onTouchStart = () => {
    isInteractingRef.current = true;
  };

  const onTouchEnd = () => {
    // Resume auto-scroll after 2s of inactivity
    setTimeout(() => {
      isInteractingRef.current = false;
    }, 2000);
  };

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
          className="flex absolute left-0 will-change-transform no-scrollbar py-8"
          style={{
            width: 'max-content',
            animation: 'achievementRail 45s linear infinite',
            animationPlayState: hoveredId !== null ? 'paused' : 'running'
          }}
        >
          {[0, 1, 2].map((setIdx) => (
            <div key={`set-${setIdx}`} className="flex gap-6 pr-6 flex-shrink-0">
              {achievements.map((item) => {
                const uniqueId = `desktop-${item.id}-${setIdx}`;
                const isHovered = hoveredId === uniqueId;
                const isAnyHovered = hoveredId !== null;

                return (
                  <div
                    key={uniqueId}
                    onMouseEnter={() => setHoveredId(uniqueId)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`relative h-[340px] w-[260px] transition-all duration-300 ease-out cursor-pointer origin-center flex-shrink-0 ${
                      isHovered
                        ? 'scale-[1.3] z-30 shadow-theme ring-2 ring-accent'
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
          ))}
        </div>
      </div>

      {/* ========================================================
          MOBILE: DYNAMIC HORIZONTAL CONTINUOUS RAIL
          ======================================================== */}
      <div 
        className="md:hidden relative w-full overflow-hidden py-4"
        onClick={() => setHeldId(null)}
      >
        <div
          ref={mobileScrollRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onPointerDown={onTouchStart}
          onPointerUp={onTouchEnd}
          className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory gap-6 px-16 py-8 items-center"
          style={{
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Double items on mobile for continuous loop */}
          {[...achievements, ...achievements].map((item, idx) => {
            const actualIndex = idx % achievements.length;
            const isEnlarged = heldId ? heldId === item.id : mobileCenterIndex === actualIndex;

            return (
              <div 
                key={`mobile-${item.id}-${idx}`}
                id={`mobile-${item.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setHeldId(heldId === item.id ? null : item.id);
                }}
                className={`snap-center relative h-[310px] w-[230px] flex-shrink-0 transition-all duration-300 ease-out cursor-pointer origin-center ${
                  isEnlarged 
                    ? 'scale-[1.25] z-20 shadow-theme ring-2 ring-accent opacity-100 mx-5' 
                    : 'scale-[0.9] opacity-60 z-10'
                }`}
                style={{
                  clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0% 100%)'
                }}
              >
                {/* Image */}
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
                <div className={`absolute inset-0 flex flex-col justify-end p-5 pb-7 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300`}>
                  <div className="transform skew-x-12 ml-2">
                    <h3 className="text-accent-text font-display font-bold text-base leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className={`text-[#FFF8E7] text-xs font-body leading-snug transition-all duration-300 ${
                      isEnlarged ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
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
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes achievementRail {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
      `}} />
    </section>
  );
};

export default Achievements;
