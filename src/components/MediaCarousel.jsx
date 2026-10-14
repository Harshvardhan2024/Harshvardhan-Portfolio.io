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

  return (
    <div 
      ref={(node) => { containerRef.current = node; inViewRef(node); }}
      className={clsx("relative w-full aspect-video bg-black group overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={toggleFullscreen}
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
              animate={{ scale: !shouldReduceMotion && isHovered ? 1.1 : 1 }}
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

        {/* Controls Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="flex justify-end gap-2">
            {currentMedia.type === 'video' && (
              <>
                <button onClick={togglePlay} className="p-2 bg-black/50 rounded-full text-white hover:text-gold transition">
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button onClick={toggleMute} className="p-2 bg-black/50 rounded-full text-white hover:text-gold transition">
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </>
            )}
            <button onClick={toggleFullscreen} className="p-2 bg-black/50 rounded-full text-gold border border-gold/40 hover:bg-gold hover:text-dark transition" aria-label="Expand media">
              <Maximize2 size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between w-full mt-auto">
            <button onClick={prev} className="p-2 bg-black/50 rounded-full text-white hover:text-gold transition">
              <ChevronLeft size={24} />
            </button>
            
            {/* Thumbnails / Dots */}
            <div className="flex gap-2 bg-black/50 p-2 rounded-full backdrop-blur-sm">
              {media.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={clsx("w-2 h-2 rounded-full border border-transparent transition-all duration-300 hover:border-gold", !shouldReduceMotion && "hover:scale-110", idx === currentIndex ? "bg-gold w-6 border-gold" : "bg-white/50 hover:bg-white")}
                />
              ))}
            </div>

            <button onClick={next} className="p-2 bg-black/50 rounded-full text-white hover:text-gold transition">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
