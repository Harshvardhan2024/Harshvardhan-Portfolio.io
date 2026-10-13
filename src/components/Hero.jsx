import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { content } from '../content';

const Hero = ({ isDark }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = content.hero.slides;

  // Slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    let animationFrameId;
    let isVisible = true;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const mouse = { x: -1000, y: -1000, active: false, radius: 160 };
    let shockwave = { active: false, x: 0, y: 0, radius: 0, power: 0 };
    
    // ONE single color only: Dark mode gold #E8B930, Light mode coffee #5A3A1E
    const particleColor = isDark ? '#E8B930' : '#5A3A1E';
    
    // Pre-rendered radial glow sprite for high performance (no shadowBlur)
    const spriteCanvas = document.createElement('canvas');
    const spriteSize = 48;
    spriteCanvas.width = spriteSize;
    spriteCanvas.height = spriteSize;
    const sCtx = spriteCanvas.getContext('2d');
    const half = spriteSize / 2;
    const grad = sCtx.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0, particleColor);
    grad.addColorStop(0.3, particleColor);
    grad.addColorStop(0.7, isDark ? 'rgba(232, 185, 48, 0.3)' : 'rgba(90, 58, 30, 0.3)');
    grad.addColorStop(1, 'transparent');
    sCtx.fillStyle = grad;
    sCtx.beginPath();
    sCtx.arc(half, half, half, 0, Math.PI * 2);
    sCtx.fill();

    let particles;
    const STRIDE = 10;
    let particleCount = 0;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const isMobile = width < 768;
      mouse.radius = isMobile ? 120 : 170;
      // Capped count: about 700 on desktop, 300 on mobile
      particleCount = isMobile ? 300 : 700;
      
      particles = new Float32Array(particleCount * STRIDE);
      
      let i = 0;
      while (i < particleCount) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        
        // Gentle dune-like density
        const nx = x / width;
        const ny = y / height;
        const n = (Math.sin(nx * 10) + Math.cos(ny * 10 + nx * 3) + Math.sin((nx + ny) * 16)) / 3;
        const prob = Math.pow((n + 1) / 2, 2) * 0.7 + 0.3;
        
        if (Math.random() < prob) {
          const idx = i * STRIDE;
          const isLargeGlow = Math.random() < 0.15; // ~15% larger with halo
          const baseSize = isLargeGlow ? (3.0 + Math.random() * 1.0) : (1.5 + Math.random() * 1.0);
          const cycle = 2.0 + Math.random() * 3.0; // 2-5 seconds per twinkle cycle

          particles[idx]     = x;                         // 0: hx
          particles[idx + 1] = y;                         // 1: hy
          particles[idx + 2] = x;                         // 2: current x
          particles[idx + 3] = y;                         // 3: current y
          particles[idx + 4] = 0;                         // 4: vx
          particles[idx + 5] = 0;                         // 5: vy
          particles[idx + 6] = baseSize;                  // 6: size
          particles[idx + 7] = isLargeGlow ? 1 : 0;       // 7: isGlowing flag
          particles[idx + 8] = cycle;                     // 8: twinkle cycle duration in seconds
          particles[idx + 9] = Math.random() * Math.PI * 2; // 9: phase
          i++;
        }
      }
    };

    let lastTime = performance.now();
    let lastFrameTime = lastTime;

    const draw = (currentTime) => {
      animationFrameId = requestAnimationFrame(draw);
      
      // Pause when hidden or off-screen
      if (!isVisible || document.hidden) {
        lastTime = currentTime; 
        return;
      }
      
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const elapsed = currentTime - lastFrameTime;
        if (elapsed < 1000 / 30) return;
        lastFrameTime = currentTime - (elapsed % (1000 / 30));
      }

      const deltaTime = Math.min(currentTime - lastTime, 50); 
      lastTime = currentTime;
      const timeSec = currentTime * 0.001;
      const isReducedMotion = mediaQuery.matches;

      ctx.clearRect(0, 0, width, height);

      // Advance shockwave
      if (shockwave.active) {
        shockwave.radius += 11 * (deltaTime / 16);
        shockwave.power *= Math.pow(0.88, deltaTime / 16);
        if (shockwave.power < 0.01) shockwave.active = false;
      }

      const mX = mouse.x, mY = mouse.y, mRadius = mouse.radius;
      const timeScale = deltaTime / 16.66;

      ctx.fillStyle = particleColor;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * STRIDE;
        const hx = particles[idx];
        const hy = particles[idx + 1];
        let x = particles[idx + 2];
        let y = particles[idx + 3];
        let vx = particles[idx + 4];
        let vy = particles[idx + 5];
        
        let dx = hx - x;
        let dy = hy - y;
        
        // Gentle wave drift
        if (!isReducedMotion) {
          dx += Math.sin(hy * 0.01 + timeSec * 0.6) * 10;
          dy += Math.cos(hx * 0.01 + timeSec * 0.5) * 10;
        }
        
        let forceX = dx * 0.016;
        let forceY = dy * 0.016;
        let mForce = 0;
        
        // Disperse when cursor is near
        if (mouse.active) {
          const mxDistX = x - mX;
          const mxDistY = y - mY;
          const mDistSq = mxDistX * mxDistX + mxDistY * mxDistY;
          const mRadiusSq = mRadius * mRadius;
          
          if (mDistSq < mRadiusSq) {
            const mDist = Math.sqrt(mDistSq) || 1;
            mForce = Math.pow(1 - mDist / mRadius, 1.4);
            const push = mForce * 1.9;
            forceX += (mxDistX / mDist) * push;
            forceY += (mxDistY / mDist) * push;
            forceX += (-mxDistY / mDist) * push * 0.2;
            forceY += (mxDistX / mDist) * push * 0.2;
          }
        }
        
        // Click/tap shockwave
        if (shockwave.active) {
          const sx = x - shockwave.x;
          const sy = y - shockwave.y;
          const sDistSq = sx * sx + sy * sy;
          if (sDistSq > 0) {
            const sDist = Math.sqrt(sDistSq);
            const ringDist = Math.abs(sDist - shockwave.radius);
            if (ringDist < 40) {
              const sForce = (1 - ringDist / 40) * shockwave.power;
              forceX += (sx / sDist) * sForce * 4.5;
              forceY += (sy / sDist) * sForce * 4.5;
            }
          }
        }
        
        vx = (vx + forceX * timeScale) * Math.pow(0.85, timeScale);
        vy = (vy + forceY * timeScale) * Math.pow(0.85, timeScale);
        x += vx * timeScale;
        y += vy * timeScale;
        
        particles[idx + 2] = x;
        particles[idx + 3] = y;
        particles[idx + 4] = vx;
        particles[idx + 5] = vy;
        
        // Twinkle calculation: pulses between 0.25 and 1.0 on a 2-5s sine cycle
        const cycle = particles[idx + 8];
        const phase = particles[idx + 9];
        const twinkle = isReducedMotion 
          ? 0.7 
          : 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(timeSec * (Math.PI * 2 / cycle) + phase));
        
        const finalAlpha = Math.min(1, twinkle + mForce * 0.35);
        ctx.globalAlpha = finalAlpha;
        
        const size = particles[idx + 6] + (mForce * 1.0);
        const isGlowing = particles[idx + 7] === 1;

        if (isGlowing) {
          // Pre-rendered sprite draw for glowing halo
          const haloSize = size * 3.5;
          ctx.drawImage(spriteCanvas, x - haloSize / 2, y - haloSize / 2, haloSize, haloSize);
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        } else {
          ctx.fillRect(x, y, size, size);
        }
      }

      ctx.globalAlpha = 1;
    };

    init();
    draw(performance.now());

    // Event listeners on window/section so pointer-events-none canvas doesn't block UI
    let rafMoveId = null;
    const handlePointerMove = (e) => {
      if (rafMoveId) return;
      rafMoveId = requestAnimationFrame(() => {
        rafMoveId = null;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
      });
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
        shockwave = { active: true, x: mouse.x, y: mouse.y, radius: 0, power: 1 };
      }
    };

    const handleClick = (e) => {
      shockwave = { active: true, x: e.clientX, y: e.clientY, radius: 0, power: 1 };
    };

    const handleResize = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      init();
      lastTime = performance.now();
      draw(lastTime);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });

    if (sectionRef.current) observer.observe(sectionRef.current);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handlePointerLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handlePointerLeave);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (rafMoveId) cancelAnimationFrame(rafMoveId);
    };
  }, [isDark]);

  return (
    <section 
      ref={sectionRef} 
      id="hero" 
      className="relative min-h-screen w-full overflow-hidden bg-bg text-text flex items-center justify-center pt-20 pb-16"
    >
      {/* Particle Canvas with pointer-events: none to avoid blocking UI */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 block pointer-events-none"
      />

      {/* Center Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-6 text-center max-w-5xl mx-auto pointer-events-none">
        
        <div className="min-h-[190px] sm:min-h-[220px] md:min-h-[250px] flex flex-col justify-center items-center pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center max-w-4xl"
            >
              {/* Reduced Headline Size: clamp(2rem, 5.5vw, 4.5rem) */}
              <h1 
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  textShadow: isDark ? 'var(--hero-glow)' : 'var(--title-shadow)',
                }}
                className="mb-5"
              >
                <span className="block text-headline-1">{slides[currentSlide].headline}</span>
                <span className="block text-headline-2">{slides[currentSlide].headlineGold}</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-body text-text-muted max-w-xl mx-auto px-2 leading-relaxed text-center">
                {slides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center pointer-events-auto">
          <a href="#projects" className="btn-gold min-w-[140px]">
            View Work
          </a>
          <a href="#contact" className="btn-ghost min-w-[140px]">
            Contact Me
          </a>
        </div>
        
        {/* Slide Controls */}
        <div className="flex gap-2 mt-8 justify-center pointer-events-auto" role="tablist" aria-label="Hero slide indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide 
                  ? 'w-8 bg-accent' 
                  : 'w-3.5 bg-surface-2 hover:bg-border'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-auto">
        <a href="#about" className="flex flex-col items-center text-text-muted hover:text-accent-text transition-colors duration-300">
          <span className="text-[11px] font-display tracking-[0.2em] mb-1.5 uppercase font-medium">SEE MORE</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={22} />
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
