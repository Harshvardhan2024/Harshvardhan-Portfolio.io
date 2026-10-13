import React from 'react';
import { content } from '../content';
import { ArrowUp } from 'lucide-react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const iconMap = {
  linkedin: <FaLinkedin size={20} />,
  github: <FaGithub size={20} />,
  email: <FaEnvelope size={20} />
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface text-text-muted py-14 border-t border-border transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center gap-6">
        
        {/* Monogram & Closing Line */}
        <div>
          <div className="text-2xl font-display font-bold text-text mb-2">
            {content.personal.monogram}
          </div>
          <p className="text-sm max-w-md mx-auto leading-relaxed">
            {content.contact.closingLine}
          </p>
        </div>
        
        {/* Social Icons (Touch target >= 44px) */}
        <div className="flex gap-4 justify-center items-center">
          {content.personal.socials.map((social, idx) => (
            <a 
              key={idx} 
              href={social.url} 
              target="_blank" 
              rel="noreferrer"
              className="w-11 h-11 bg-surface-2 border border-border text-text-muted hover:text-accent-text hover:border-accent rounded-full flex items-center justify-center transition-colors duration-300 min-w-[44px] min-h-[44px]"
              aria-label={social.name}
            >
              {iconMap[social.icon]}
            </a>
          ))}
        </div>
        
        {/* Resume Download */}
        <a 
          href={content.personal.resumeUrl} 
          download 
          className="text-sm font-medium text-text hover:text-accent-text transition-colors min-h-[44px] inline-flex items-center"
        >
          Download Resume
        </a>
        
        {/* Back to top button & Copyright */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <button 
            onClick={scrollToTop}
            className="w-11 h-11 bg-surface-2 border border-border text-text-muted hover:text-accent-text hover:border-accent rounded-full flex items-center justify-center transition-colors duration-300 min-w-[44px] min-h-[44px] shadow-sm"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </button>
          <p className="text-xs text-text-muted/80">
            &copy; {new Date().getFullYear()} {content.personal.name}. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
