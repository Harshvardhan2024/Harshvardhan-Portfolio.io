import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Download } from 'lucide-react';
import { content } from '../content';

const Navbar = ({ toggleTheme, isDark }) => {
  const [isHeroInView, setIsHeroInView] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const fullName = content.personal.name || 'Harshvardhan Patil';
  const brandMark = content.personal.monogram || 'HP';

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = ['hero', ...navLinks.map(({ href }) => href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.1, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      {/* 
        1. HERO STATE: Full-width top bar with frosted glass (backdrop-blur-md)
        2. SCROLLED STATE: Centered floating capsule/pill (backdrop-blur-none, bg-slate-900 border border-slate-800 shadow-2xl)
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isHeroInView
            ? 'w-full bg-surface/85 dark:bg-slate-950/50 backdrop-blur-md border-b border-border/60 dark:border-white/10 py-3.5 sm:py-4 px-4 sm:px-8'
            : 'w-full flex justify-center px-3 sm:px-4 pointer-events-none pt-3 sm:pt-4'
        }`}
      >
        <div
          className={`w-full flex justify-between items-center transition-all duration-300 ease-out ${
            isHeroInView
              ? 'max-w-7xl mx-auto'
              : 'max-w-5xl mx-auto rounded-full bg-surface dark:bg-slate-900 border border-border dark:border-slate-800 shadow-2xl px-4 sm:px-6 py-2.5 sm:py-3 pointer-events-auto backdrop-blur-none'
          }`}
        >
          {/* BRANDING: Stylized "HP" box + full name */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0 min-w-0"
            aria-label="Home"
          >
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-accent/20 border border-accent/40 text-accent-text flex items-center justify-center text-xs sm:text-sm font-bold font-display shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
              {brandMark}
            </span>
            <span className="text-sm sm:text-base font-heading font-bold text-text tracking-wide group-hover:text-accent-text transition-colors truncate max-w-[130px] sm:max-w-none">
              {fullName}
            </span>
          </a>

          {/* VISIBLE RIGHT-SIDE CONTROLS (Only Theme Toggle, Resume, 3-Bar Menu) */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Theme Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full text-text hover:text-accent-text hover:bg-surface-2/70 transition-colors flex-shrink-0"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} className="sm:w-5 sm:h-5" /> : <Moon size={18} className="sm:w-5 sm:h-5" />}
            </button>

            {/* Resume Button */}
            <a
              href={content.personal.resumeUrl}
              download
              className="btn-gold text-xs sm:text-sm py-1.5 px-3 sm:px-4 shadow-sm flex items-center gap-1.5 flex-shrink-0"
              aria-label="Resume"
            >
              <Download size={13} className="sm:w-4 sm:h-4" />
              <span>Resume</span>
            </a>

            {/* 3-Bar Hamburger Menu Icon (Always visible on right) */}
            <button
              onClick={toggleMenu}
              className="p-1.5 sm:p-2 rounded-full text-text hover:text-accent-text hover:bg-surface-2/70 transition-colors flex items-center justify-center flex-shrink-0 ml-0.5"
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* 3-BAR MENU DRAWER (Contains all section links: About, Projects, Experience, Achievements, Education, Contact) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={closeMenu}
            />

            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed z-50 top-16 sm:top-20 right-4 sm:right-6 md:right-12 w-[92%] sm:w-80 max-w-sm bg-surface dark:bg-slate-900 border border-border dark:border-slate-800 p-5 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col gap-1">
                <div className="text-[11px] font-display uppercase tracking-widest text-text-muted px-3 py-1 mb-1">
                  Navigation
                </div>

                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={closeMenu}
                      className={`px-4 py-2 rounded-xl text-sm sm:text-base font-heading font-medium transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-accent/15 text-accent-text font-bold border-r-2 border-accent'
                          : 'text-text hover:bg-surface-2 hover:text-accent-text'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-accent"></span>}
                    </a>
                  );
                })}

                <div className="border-t border-border/80 dark:border-slate-800 my-2 pt-2.5 flex items-center justify-between px-3">
                  <span className="text-xs text-text-muted font-heading">Appearance</span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-heading text-text hover:text-accent-text transition-colors"
                  >
                    {isDark ? <Sun size={14} /> : <Moon size={14} />}
                    <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
