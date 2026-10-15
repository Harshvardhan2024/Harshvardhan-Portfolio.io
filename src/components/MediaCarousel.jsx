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
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.5 });

  const currentMedia = media[currentIndex] || {};
  const isPaused = isHovered || isCardHovered;

  // Auto-advance logic: pauses on hover
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

  const next = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % media.length); };
  const prev = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + media.length) % media.length); };
  const togglePlay = (e) => { e.stopPropagation(); setIsPlaying(!isPlaying); };
  const toggleMute = (e) => { e.stopPropagation(); setIsMuted(!isMuted); };
  
  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
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
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev(e); }
        if (e.key === 'ArrowRight') { e.preventDefault(); next(e); }
      }}
      aria-label="Media carousel"
    >
      <div className="absolute inset-0 w-full h-full" onClick={toggleFullscreen}>
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
              ) : <ErrorFallback />}
              <div style={{display: 'none'}} className="w-full h-full"><ErrorFallback /></div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top Controls Overlay (Play/Pause, Mute, Fullscreen) - inset 11% so inside slant-clip */}
      <div className="absolute top-3 right-[11%] z-20 flex gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
        {currentMedia.type === 'video' && (
          <>
            <button 
              onClick={togglePlay} 
              className="w-9 h-9 min-w-[36px] min-h-[36px] bg-black/60 rounded-full text-white hover:text-gold transition flex items-center justify-center"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button 
              onClick={toggleMute} 
              className="w-9 h-9 min-w-[36px] min-h-[36px] bg-black/60 rounded-full text-white hover:text-gold transition flex items-center justify-center"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </>
        )}
        <button 
          onClick={toggleFullscreen} 
          className="w-9 h-9 min-w-[36px] min-h-[36px] bg-black/60 rounded-full text-gold border border-gold/40 hover:bg-gold hover:text-dark transition flex items-center justify-center" 
          aria-label="Expand media"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* BOTH ARROWS VERTICALLY CENTERED, INSET 10% FROM EDGES (INSIDE SLANTED AREA) */}
      {/* 44px minimum tap targets, wrap-around navigation, visible on desktop and mobile */}
      {media.length > 1 && (
        <>
          {/* Left Arrow */}
          <button 
            onClick={prev}
            className="absolute left-[10%] top-1/2 -translate-y-1/2 z-20 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black/60 hover:bg-black/85 text-white hover:text-gold border border-white/25 transition-all duration-200 flex items-center justify-center shadow-lg opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button 
            onClick={next}
            className="absolute right-[10%] top-1/2 -translate-y-1/2 z-20 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black/60 hover:bg-black/85 text-white hover:text-gold border border-white/25 transition-all duration-200 flex items-center justify-center shadow-lg opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Pagination Dots at Bottom Center */}
      {media.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-auto">
          {media.map((_, idx) => (
            <button 
              key={idx}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
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
