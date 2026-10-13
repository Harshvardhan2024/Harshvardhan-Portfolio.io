import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Mail, Download } from 'lucide-react';
import { content } from '../content';

const Navbar = ({ toggleTheme, isDark }) => {
  const [isHeroInView, setIsHeroInView] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const dropdownRef = useRef(null);

  const fullName = "Harshvardhan Patil";
  const shortName = "H. Patil";

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  // IntersectionObserver on #hero to control navbar collapse/expand
  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  // Track active section for highlights
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

  // Close on Escape key
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
        className={`fixed top-0 w-full z-50 transition-all duration-[250ms] ease-out border-b ${
          isCompact
            ? 'bg-bg/92 backdrop-blur-md shadow-theme border-border py-2.5 sm:py-3'
            : 'bg-bg/60 backdrop-blur-sm border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center relative">
          
          {/* LEFT SIDE */}
          {isCompact ? (
            /* Compact mode name */
            <a 
              href="#" 
              className="flex items-center min-w-0 font-display font-bold text-text hover:text-accent-text transition-colors"
            >
              <span className="hidden sm:inline text-lg sm:text-xl tracking-wide truncate">
                {fullName}
              </span>
              <span className="sm:hidden text-base tracking-wide truncate max-w-[150px]">
                {shortName}
              </span>
            </a>
          ) : (
            /* Full mode monogram */
            <a 
              href="#" 
              className="font-display font-bold text-2xl tracking-widest text-text hover:text-accent-text transition-colors"
            >
              {content.personal.monogram}
            </a>
          )}

          {/* RIGHT SIDE */}
          {isCompact ? (
            /* Compact Mode Controls */
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Desktop Buttons (>= 640px) */}
              <div className="hidden sm:flex items-center gap-2.5">
                <a 
                  href="#contact" 
                  className="btn-ghost py-1.5 px-4 text-xs font-semibold"
                >
                  Contact Me
                </a>
                <a 
                  href={content.personal.resumeUrl} 
                  download 
                  className="btn-gold py-1.5 px-4 text-xs font-semibold shadow-sm"
                >
                  Resume
                </a>
              </div>

              {/* Mobile Buttons (< 640px) */}
              <div className="flex sm:hidden items-center gap-1.5">
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
              </div>

              {/* Hamburger Icon */}
              <button 
                onClick={toggleMenu}
                className="p-2 sm:p-2.5 rounded-full text-text hover:text-accent-text hover:bg-surface-2/60 transition-colors"
                aria-label="Open navigation menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          ) : (
            /* Full Mode Controls */
            <div className="flex items-center gap-4">
              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                {navLinks.map(link => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <a 
                      key={link.name} 
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`text-sm font-medium transition-colors relative py-1 ${
                        isActive
                          ? 'text-accent-text font-semibold'
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

              {/* Mobile Full Mode (Theme toggle + Hamburger) */}
              <div className="flex lg:hidden items-center gap-1.5">
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-text hover:text-accent-text transition-colors"
                  aria-label="Toggle Theme"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                
                <button 
                  onClick={toggleMenu}
                  className="p-2 rounded-full text-text hover:text-accent-text transition-colors"
                  aria-label="Toggle Menu"
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          )}

        </div>
      </header>

      {/* DROPDOWN MENU (Compact dropdown panel on desktop, overlay on mobile) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop for closing on outside click */}
            <div 
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]" 
              onClick={closeMenu} 
            />

            {/* Menu Panel */}
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`fixed z-50 ${
                isCompact
                  ? 'md:absolute md:right-4 md:top-[60px] md:w-72 md:rounded-2xl md:bg-surface md:border md:border-border md:shadow-theme md:p-5 inset-x-0 top-[56px] bg-bg/98 border-b border-border p-6 shadow-theme'
                  : 'inset-0 bg-bg text-text flex flex-col items-center justify-center gap-6 px-6 pt-16 overflow-y-auto'
              }`}
            >
              {isCompact ? (
                /* Compact Dropdown Content */
                <div className="flex flex-col gap-2 max-w-sm mx-auto md:max-w-none">
                  <div className="text-[11px] font-display uppercase tracking-widest text-text-muted px-2 py-1 mb-1">
                    Navigation
                  </div>
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={closeMenu}
                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                          isActive
                            ? 'bg-accent/10 text-accent-text font-bold border-l-4 border-accent'
                            : 'text-text hover:bg-surface-2 hover:text-accent-text'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>}
                      </a>
                    );
                  })}

                  <div className="border-t border-border/80 my-2 pt-3 flex items-center justify-between px-2">
                    <span className="text-xs text-text-muted font-heading">Appearance</span>
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2 border border-border text-xs text-text hover:text-accent-text transition-colors"
                      aria-label="Toggle Theme"
                    >
                      {isDark ? <Sun size={15} /> : <Moon size={15} />}
                      <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Full Mode Mobile Overlay Content */
                <div className="flex flex-col items-center gap-6 w-full max-w-xs">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={closeMenu}
                        className={`text-2xl font-display font-medium transition-colors py-1 ${
                          isActive ? 'text-accent-text border-b-2 border-accent' : 'text-text hover:text-accent-text'
                        }`}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                  
                  <div className="mt-4 flex flex-col items-center gap-5 w-full">
                    <a 
                      href={content.personal.resumeUrl} 
                      download 
                      onClick={closeMenu} 
                      className="btn-gold text-base py-3 px-8 w-full text-center shadow-sm"
                    >
                      Download Resume
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
