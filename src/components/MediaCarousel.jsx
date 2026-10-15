import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';

export default function MediaCarousel({ media, className = '', isCardHovered = false }) {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hideTimerRef = useRef(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.5 });

  const currentMedia = media[currentIndex] || {};
  const isPaused = isHovered || isCardHovered;

  // Auto-hide controls after 3 seconds on tap
  const showControlsTemporarily = () => {
    setControlsVisible(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // Tapping the media area toggles controlsVisible (ignores clicks on buttons or links)
  const handleMediaTap = (e) => {
    if (e.target.closest('button, a')) return;
    if (controlsVisible) {
      setControlsVisible(false);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    } else {
      showControlsTemporarily();
    }
  };

  // Helper to restart 3-second timer on any control interaction
  const handleControlAction = (fn) => (e) => {
    e.stopPropagation();
    showControlsTemporarily();
    fn(e);
  };

  // Auto-advance logic: pauses on hover or video
  useEffect(() => {
    let timer;
    if (currentMedia.type === 'image' && !isPaused) {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % media.length);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [currentIndex, currentMedia.type, isPaused, media.length]);

  // Video auto-play/pause based on inView and hover
  useEffect(() => {
    if (videoRef.current) {
      if (inView && currentMedia.type === 'video' && isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView, currentIndex, isPlaying, isHovered, currentMedia.type]);

  const handleVideoEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const next = () => { setCurrentIndex((prev) => (prev + 1) % media.length); };
  const prev = () => { setCurrentIndex((prev) => (prev - 1 + media.length) % media.length); };
  const togglePlay = () => { setIsPlaying(!isPlaying); };
  const toggleMute = () => { setIsMuted(!isMuted); };
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const ErrorFallback = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
      <span className="font-display tracking-widest text-sm">MEDIA UNAVAILABLE</span>
    </div>
  );

  // Keyboard navigation when hovered
  useEffect(() => {
    if (!isHovered) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % media.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, media.length]);

  return (
    <div 
      ref={(node) => { containerRef.current = node; inViewRef(node); }}
      className={clsx("relative w-full aspect-video bg-black group overflow-hidden select-none", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleMediaTap}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      }}
      aria-label="Media carousel"
    >
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center bg-black"
          >
            <motion.div
              className="w-full h-full"
              animate={{ scale: !shouldReduceMotion && isHovered ? 1.05 : 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentMedia.type === 'image' ? (
                <img 
                  src={currentMedia.src} 
                  alt="Carousel media" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                />
              ) : currentMedia.type === 'video' ? (
                <video
                  ref={videoRef}
                  src={currentMedia.src}
                  className="w-full h-full object-cover"
                  muted={isMuted}
                  playsInline
                  onEnded={handleVideoEnded}
                  onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                />
              ) : currentMedia.type === 'link' ? (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <img 
                    src={currentMedia.src} 
                    alt={currentMedia.label || "Video thumbnail"} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                  />
                  <div style={{ display: 'none' }} className="w-full h-full">
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-300 p-4">
                      <a
                        href={currentMedia.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-col items-center gap-2 group/play pointer-events-auto"
                      >
                        <div className="w-14 h-14 rounded-full bg-accent/90 group-hover/play:bg-accent text-on-accent flex items-center justify-center shadow-lg transition-transform group-hover/play:scale-110">
                          <Play size={24} className="fill-current ml-1" />
                        </div>
                        <span className="text-xs font-heading font-medium tracking-wide text-white/90 group-hover/play:text-accent-text transition-colors">
                          {currentMedia.label || 'Watch video'}
                        </span>
                      </a>
                    </div>
                  </div>
                  {/* Centered play button and label */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <a 
                      href={currentMedia.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex flex-col items-center gap-2 group/play pointer-events-auto p-4 cursor-pointer"
                      aria-label={currentMedia.label || 'Watch video'}
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 group-hover/play:bg-accent text-white group-hover/play:text-on-accent border border-white/40 group-hover/play:border-accent flex items-center justify-center shadow-2xl backdrop-blur-sm transition-all group-hover/play:scale-110">
                        <Play size={26} className="fill-current ml-1" />
                      </div>
                      <span className="text-xs sm:text-sm font-heading font-medium tracking-wide text-white drop-shadow-md bg-black/50 px-3 py-1 rounded-full border border-white/20 group-hover/play:border-accent transition-colors">
                        {currentMedia.label || 'Watch video'}
                      </span>
                    </a>
                  </div>
                </div>
              ) : <ErrorFallback />}
              <div style={{display: 'none'}} className="w-full h-full"><ErrorFallback /></div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 
        CONTROLS WRAPPER (Arrows, expand, pause and mute buttons):
        - Hidden on touch by default (opacity-0, pointer-events-none)
        - Shows on tap with 200ms transition, auto-hiding after 3s
        - Shows on desktop hover (@media hover: hover / sm:group-hover)
      */}
      <div 
        className={clsx(
          "absolute inset-0 transition-opacity duration-200 z-20",
          controlsVisible 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto"
        )}
      >
        {/* Top-right controls: expand, and (only for video) pause & mute */}
        <div className="absolute top-3 right-[6%] sm:right-[7%] flex gap-1.5 pointer-events-auto">
          {currentMedia.type === 'video' && (
            <>
              <button 
                onClick={handleControlAction(togglePlay)} 
                className="w-9 h-9 min-w-[36px] min-h-[36px] bg-black/60 rounded-full text-white hover:text-gold transition flex items-center justify-center active:scale-95"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button 
                onClick={handleControlAction(toggleMute)} 
                className="w-9 h-9 min-w-[36px] min-h-[36px] bg-black/60 rounded-full text-white hover:text-gold transition flex items-center justify-center active:scale-95"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </>
          )}
          <button 
            onClick={handleControlAction(toggleFullscreen)} 
            className="w-9 h-9 min-w-[36px] min-h-[36px] bg-black/60 rounded-full text-gold border border-gold/40 hover:bg-gold hover:text-dark transition flex items-center justify-center active:scale-95" 
            aria-label="Expand media"
          >
            <Maximize2 size={16} />
          </button>
        </div>

        {/* Both arrows vertically centered at outer edges inside visible slanted area */}
        {media.length > 1 && (
          <>
            <button 
              onClick={handleControlAction(prev)}
              className="absolute left-[5.5%] sm:left-[6.5%] top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black/65 hover:bg-black/90 text-white hover:text-gold border border-white/25 transition-all duration-200 flex items-center justify-center shadow-lg active:scale-95 pointer-events-auto"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>

            <button 
              onClick={handleControlAction(next)}
              className="absolute right-[5.5%] sm:right-[6.5%] top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black/65 hover:bg-black/90 text-white hover:text-gold border border-white/25 transition-all duration-200 flex items-center justify-center shadow-lg active:scale-95 pointer-events-auto"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots at Bottom Center (Always Visible) */}
      {media.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-auto">
          {media.map((_, idx) => (
            <button 
              key={idx}
              onClick={(e) => { 
                e.stopPropagation(); 
                showControlsTemporarily(); 
                setCurrentIndex(idx); 
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={clsx(
                "h-2 rounded-full border border-transparent transition-all duration-300 hover:border-gold",
                idx === currentIndex ? "bg-gold w-6 border-gold" : "bg-white/50 w-2 hover:bg-white"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
