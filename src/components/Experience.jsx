import React, { useRef, useState, useEffect } from 'react';
import { content } from '../content';
import MediaCarousel from './MediaCarousel';

const RoleCard = ({ exp }) => {
  return (
    <div className="w-full box-border bg-surface border border-border rounded-xl sm:rounded-2xl overflow-hidden shadow-theme transition-all duration-300 hover:-translate-y-0.5 hover:border-accent">
      {/* Media Frame - compact preview */}
      {exp.media && exp.media.length > 0 && (
        <div className="p-3 sm:p-4 pb-0 w-full overflow-hidden box-border">
          <div className="rounded-lg sm:rounded-xl overflow-hidden slant-clip w-full bg-black/40 max-h-52 sm:max-h-60">
            <MediaCarousel media={exp.media} />
          </div>
        </div>
      )}

      <div className="p-4 sm:p-6 pt-5 w-full box-border">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Logo Badge */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 flex items-center justify-center border border-border text-accent-text font-display font-bold text-sm sm:text-base rounded-lg sm:rounded-xl bg-surface-2 shadow-sm">
              {exp.logo || 'TC'}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-heading font-bold text-text truncate">
                {exp.role}
              </h3>
              <div className="text-accent-text font-display tracking-wider text-xs sm:text-sm font-semibold truncate">
                {exp.organization}
              </div>
            </div>
          </div>
          
          {/* Date Pill */}
          <div className="self-start sm:self-auto flex items-center gap-1.5 bg-surface-2 border border-border px-3 py-1 rounded-full flex-shrink-0">
            {exp.dates.toLowerCase().includes('present') && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            )}
            <span className="text-[11px] sm:text-xs font-mono text-text-muted">{exp.dates}</span>
          </div>
        </div>

        {/* Meta line */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-display text-text-muted mb-3 sm:mb-4 uppercase tracking-[0.1em]">
          <span>{exp.location}</span>
          <span className="w-1 h-1 rounded-full bg-border"></span>
          <span>{exp.type}</span>
        </div>

        {/* Bullet points */}
        <ul className="space-y-2 mb-4">
          {exp.points.map((point, i) => (
            <li key={i} className="text-text/90 font-body flex items-start text-xs sm:text-sm leading-relaxed">
              <span className="text-accent mr-2.5 mt-1 text-[8px] sm:text-[9px] flex-shrink-0">◆</span>
              <span className="break-words">{point}</span>
            </li>
          ))}
        </ul>

        {/* Tool / Skill Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {exp.tags.map(tag => (
            <span 
              key={tag} 
              className="text-[11px] sm:text-xs font-body px-2.5 py-0.5 bg-surface-2/60 text-accent-text border border-border rounded-full hover:border-accent transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Key Metrics Chips (Optional) */}
        {exp.metrics && exp.metrics.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-3 border-t border-border/80">
            {exp.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-lg sm:text-xl font-display font-bold text-accent-text">
                  {metric.value}
                </span>
                <span className="text-[9px] font-heading uppercase tracking-widest text-text-muted">
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

const Experience = () => {
  const cardRefs = useRef([]);
  const [activeCards, setActiveCards] = useState(new Set([content.experience[0]?.id]));

  useEffect(() => {
    const observers = [];
    content.experience.forEach((exp, idx) => {
      const el = cardRefs.current[idx];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveCards((prev) => new Set([...prev, exp.id]));
          }
        },
        { threshold: 0.2, rootMargin: "-5% 0px -10% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section id="experience" className="py-20 sm:py-24 bg-bg text-text transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full box-border">
        <h2 className="section-title">Experience</h2>
        
        {/* Segmented Timeline List with 3 Detached Vertical Slot Lines (No circles) */}
        <div className="flex flex-col gap-6 sm:gap-8 w-full box-border">
          {content.experience.map((exp, idx) => {
            const isLit = activeCards.has(exp.id);

            return (
              <div 
                key={exp.id} 
                id={`role-${exp.id}`}
                ref={(el) => (cardRefs.current[idx] = el)}
                className="flex items-stretch gap-3 sm:gap-5 w-full box-border"
              >
                {/* Detached Vertical Slot Line for this progressive step */}
                <div 
                  className="w-1.5 sm:w-2 rounded-full bg-border/50 relative overflow-hidden flex-shrink-0 self-stretch my-3 transition-colors duration-300"
                  aria-hidden="true"
                >
                  <div 
                    className={`w-full h-full rounded-full transition-all duration-500 ease-out ${
                      isLit 
                        ? 'bg-accent shadow-[0_0_10px_rgba(154,98,18,0.7)]' 
                        : 'bg-transparent'
                    }`}
                  />
                </div>

                {/* Scaled Compact Role Card */}
                <div className="flex-1 min-w-0">
                  <RoleCard exp={exp} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Experience;
