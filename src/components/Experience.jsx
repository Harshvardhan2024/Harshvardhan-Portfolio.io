import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { content } from '../content';
import MediaCarousel from './MediaCarousel';

const RoleCard = ({ exp }) => {
  return (
    <div className="w-full max-w-full box-border bg-surface border border-border rounded-2xl overflow-hidden shadow-theme transition-all duration-300 hover:-translate-y-1 hover:border-accent will-change-transform">
      {/* Slanted Media Frame - clipped safely to container width */}
      {exp.media && exp.media.length > 0 && (
        <div className="p-3 sm:p-5 pb-0 w-full overflow-hidden box-border">
          <div className="rounded-xl overflow-hidden slant-clip w-full bg-black/40">
            <MediaCarousel media={exp.media} />
          </div>
        </div>
      )}

      <div className="p-5 sm:p-8 pt-6 w-full box-border">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Logo Badge */}
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-border text-accent-text font-display font-bold text-lg rounded-xl bg-surface-2 shadow-sm">
              {exp.logo || 'TC'}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-2xl font-heading font-bold text-text truncate">
                {exp.role}
              </h3>
              <div className="text-accent-text font-display tracking-wider text-xs sm:text-sm font-semibold truncate">
                {exp.organization}
              </div>
            </div>
          </div>
          
          {/* Date Pill */}
          <div className="self-start sm:self-auto flex items-center gap-2 bg-surface-2 border border-border px-3.5 py-1.5 rounded-full flex-shrink-0">
            {exp.dates.toLowerCase().includes('present') && (
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            )}
            <span className="text-xs font-mono text-text-muted">{exp.dates}</span>
          </div>
        </div>

        {/* Meta line */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-display text-text-muted mb-6 uppercase tracking-[0.1em]">
          <span>{exp.location}</span>
          <span className="w-1 h-1 rounded-full bg-border"></span>
          <span>{exp.type}</span>
        </div>

        {/* Bullet points */}
        <ul className="space-y-3 mb-6">
          {exp.points.map((point, i) => (
            <li key={i} className="text-text/90 font-body flex items-start text-sm sm:text-base leading-relaxed">
              <span className="text-accent mr-3 mt-1.5 text-[10px] flex-shrink-0">◆</span>
              <span className="break-words">{point}</span>
            </li>
          ))}
        </ul>

        {/* Tool / Skill Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {exp.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs font-body px-3 py-1 bg-surface-2/60 text-accent-text border border-border rounded-full hover:border-accent transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Key Metrics Chips (Optional) */}
        {exp.metrics && exp.metrics.length > 0 && (
          <div className="flex flex-wrap gap-6 pt-5 border-t border-border/80">
            {exp.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl font-display font-bold text-accent-text">
                  {metric.value}
                </span>
                <span className="text-[10px] font-heading uppercase tracking-widest text-text-muted mt-0.5">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ExperienceItem = ({ exp }) => {
  const itemRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll progress for THIS individual card as it scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 85%", "end 35%"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div 
      ref={itemRef} 
      id={`role-${exp.id}`}
      className="flex items-stretch gap-3.5 sm:gap-6 w-full box-border"
    >
      {/* Solid thin vertical line (about 3px, rounded ends) spanning full card height */}
      <div 
        className="w-[3px] rounded-full bg-border/40 relative overflow-hidden flex-shrink-0 self-stretch my-1" 
        aria-hidden="true"
      >
        <motion.div 
          className="w-full h-full bg-accent origin-top rounded-full shadow-[0_0_8px_rgba(154,98,18,0.4)]"
          style={{ 
            scaleY: shouldReduceMotion ? 1 : scaleY 
          }}
        />
      </div>

      {/* Experience Card */}
      <div className="flex-1 min-w-0">
        <RoleCard exp={exp} />
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-bg text-text transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full box-border">
        <h2 className="section-title">Experience</h2>
        
        {/* Experience List with individual 3px side guide lines */}
        <div className="flex flex-col gap-10 sm:gap-14 w-full box-border">
          {content.experience.map((exp) => (
            <ExperienceItem key={exp.id} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
