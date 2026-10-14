import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Mail, Download } from 'lucide-react';
import { content } from '../content';

const Navbar = ({ toggleTheme, isDark }) => {
  const [isHeroInView, setIsHeroInView] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const fullName = content.personal.name || "Harshvardhan Patil";
  const brandMark = content.personal.monogram || "Harsh";

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
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isCompact = !isHeroInView;

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out border-b ${
          isCompact
            ? 'bg-bg/95 backdrop-blur-md shadow-theme border-border py-3'
            : 'bg-bg/70 backdrop-blur-sm border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center relative">
          
          {/* LOGO / BRAND MARK */}
          <a 
            href="#" 
            className="flex items-center gap-2.5 font-display font-bold text-text hover:text-accent-text transition-colors tracking-widest"
          >
            <span className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/40 text-accent-text flex items-center justify-center text-sm font-bold shadow-sm">
              {brandMark}
            </span>
            <span className={`text-base sm:text-lg font-heading tracking-wide transition-opacity duration-200 ${
              isCompact ? 'inline-block' : 'hidden sm:inline-block'
            }`}>
              {isCompact ? fullName : brandMark}
            </span>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a 
                  key={link.name} 
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-heading font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-accent-text font-bold'
                      : 'text-text/80 hover:text-accent-text'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full" 
                    />
                  )}
                </a>
              );
            })}
            
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-text hover:text-accent-text hover:bg-surface-2/60 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <a href={content.personal.resumeUrl} download className="btn-gold text-sm py-2 px-5 shadow-sm">
              Resume
            </a>
          </nav>

          {/* MOBILE CONTROLS */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-text hover:text-accent-text hover:bg-surface-2/60 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <a 
              href="#contact" 
              className="w-9 h-9 rounded-full border border-border text-text flex items-center justify-center hover:border-accent hover:text-accent-text transition-colors"
              aria-label="Contact Me"
            >
              <Mail size={16} />
            </a>

            <a 
              href={content.personal.resumeUrl} 
              download 
              className="w-9 h-9 rounded-full bg-accent text-on-accent flex items-center justify-center hover:bg-accent-hover transition-colors shadow-sm"
              aria-label="Download Resume"
            >
              <Download size={16} />
            </a>

            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full text-text hover:text-accent-text hover:bg-surface-2/60 transition-colors"
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </header>

      {/* UNIFIED MOBILE DRAWER OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md" 
              onClick={closeMenu} 
            />

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed z-50 inset-x-4 top-[68px] bg-surface border border-border p-6 rounded-2xl shadow-2xl max-w-lg mx-auto overflow-hidden"
            >
              <div className="flex flex-col gap-1.5">
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
                      className={`px-4 py-2.5 rounded-xl text-base font-heading font-medium transition-all flex items-center justify-between ${
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

                <div className="border-t border-border/80 my-2 pt-3 flex items-center justify-between px-3">
                  <span className="text-xs text-text-muted font-heading">Appearance</span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-border text-xs font-heading text-text hover:text-accent-text transition-colors"
                  >
                    {isDark ? <Sun size={15} /> : <Moon size={15} />}
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
