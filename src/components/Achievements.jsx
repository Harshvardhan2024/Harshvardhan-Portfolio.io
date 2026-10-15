import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { content } from '../content';

const AchievementCard = ({ item, isEnlarged = false, isDimmed = false }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className={clsx(
        "relative w-full h-full rounded-2xl overflow-hidden border border-border/70 bg-surface shadow-md transition-all duration-300 ease-out origin-center select-none",
        isEnlarged && "scale-[1.35] z-30 ring-2 ring-accent shadow-2xl",
        isDimmed && "opacity-40"
      )}
    >
      {/* Single image layer — fills card with object-cover, no gaps */}
      {!imgFailed ? (
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-2 text-text-muted p-4 text-center">
          <span className="font-display font-bold text-accent-text text-sm mb-1">{item.title}</span>
          <span className="text-xs font-body">Achievement Image</span>
        </div>
      )}

      {/* Bottom frosted-glass band — absolute, no margin, backdrop-blur */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] px-3.5 py-2.5 sm:px-4 sm:py-3 bg-black/40 backdrop-blur-md border-t border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] text-left">
        <h3 className="font-heading font-bold text-white text-sm sm:text-base truncate leading-snug block">
          {item.title}
        </h3>
        <p className="font-body text-xs sm:text-sm text-white/80 truncate leading-snug block mt-0.5">
          {item.description}
        </p>
      </div>
    </div>
  );
};

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
    <section id="achievements" className="py-16 sm:py-20 bg-bg text-text overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
        <h2 className="section-title">Achievements</h2>
      </div>

      {/* ========================================================
          DESKTOP: CONTINUOUS AUTO-SCROLLING RAIL (768px and up)
          - Fixed-size slots (360px x 225px, 16/10 aspect ratio)
          - In-place hover scale: 1.35 without affecting layout
          - Pauses smoothly with animationPlayState: paused (no jump)
          - Compact height (340px) with overflow-visible so cards never clip
          ======================================================== */}
      <div className="hidden md:flex relative w-full h-[340px] items-center overflow-visible">
        <div 
          className="flex gap-6 absolute left-0 will-change-transform no-scrollbar py-6"
          style={{ 
            width: 'max-content', 
            animation: 'achievementRail 45s linear infinite',
            animationPlayState: hoveredId !== null ? 'paused' : 'running'
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
                className="w-[360px] h-[225px] flex-shrink-0 relative flex items-center justify-center cursor-pointer"
              >
                <AchievementCard 
                  item={item}
                  isEnlarged={isHovered}
                  isDimmed={!isHovered && isAnyHovered}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          MOBILE: CAROUSEL-BASED SLIDER WITH PEEKING CARDS (< 768px)
          - Fixed-size cards (280px x 175px, 16/10 aspect ratio)
          - Centered card slightly enlarged in place (scale 1.08)
          - Snap-scrolling with neighbors peeking
          - Left/Right 44px tap target arrow buttons and pagination dots
          ======================================================== */}
      <div className="md:hidden relative w-full overflow-hidden py-2">
        {/* Swipable Carousel with Scroll-Snap */}
        <div
          ref={mobileContainerRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory gap-4 px-[calc(50vw-140px)] py-5 items-center"
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
                className={clsx(
                  "snap-center relative h-[175px] w-[280px] flex-shrink-0 transition-transform duration-300 ease-out cursor-pointer origin-center rounded-2xl overflow-hidden",
                  isCentered ? "scale-[1.08] z-20" : "scale-[0.95] z-10"
                )}
              >
                <AchievementCard 
                  item={item}
                  isEnlarged={false}
                  isDimmed={!isCentered}
                />
              </div>
            );
          })}
        </div>

        {/* Mobile Navigation Controls: Arrows and Dots */}
        <div className="flex items-center justify-between px-6 mt-2 max-w-sm mx-auto">
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
