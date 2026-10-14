import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { content } from '../content';

// Large line-art SVG icons with 1.5px stroke
const GraduationCapIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const UniversityIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 21h18"/>
    <path d="M5 21V11"/>
    <path d="M19 21V11"/>
    <path d="M9 21V11"/>
    <path d="M15 21V11"/>
    <path d="M2 11l10-7 10 7"/>
    <circle cx="12" cy="7" r="1"/>
  </svg>
);

const SchoolIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/>
    <path d="M18 22V5l-6-3-6 3v17"/>
    <path d="M4 10h4"/>
    <path d="M16 10h4"/>
    <path d="M4 15h4"/>
    <path d="M16 15h4"/>
    <circle cx="12" cy="7" r="1.5"/>
  </svg>
);

const getEducationIcon = (iconName, className) => {
  if (iconName === 'GraduationCap') return <GraduationCapIcon className={className} />;
  if (iconName === 'BookOpen') return <UniversityIcon className={className} />;
  return <SchoolIcon className={className} />;
};

const Education = () => {
  const { items = [], languages = [] } = content.education || {};
  const defaultId = items[0]?.id || null;
  const [activeId, setActiveId] = useState(defaultId);

  return (
    <section 
      id="education" 
      className="py-24 bg-bg text-text transition-colors duration-300 overflow-visible"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Education</h2>

        {/* ========================================================
            DESKTOP: 3-CARD SIDEWAYS ENLARGE SHOWCASE (flex-grow)
            ======================================================== */}
        <div 
          className="hidden md:flex flex-row gap-5 lg:gap-6 h-[460px] items-stretch w-full box-border"
          onMouseLeave={() => setActiveId(defaultId)}
        >
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveId(item.id)}
                onClick={() => setActiveId(item.id)}
                className={`relative rounded-[20px] bg-surface cursor-pointer box-border overflow-hidden select-none transition-all duration-[280ms] ${
                  isActive 
                    ? 'border border-accent shadow-theme ring-1 ring-accent/30 opacity-100' 
                    : 'border border-border opacity-75 hover:opacity-95'
                }`}
                style={{
                  flex: isActive ? 3.2 : 1,
                  transition: 'flex 280ms cubic-bezier(0.22, 1, 0.36, 1), border-color 280ms ease, box-shadow 280ms ease, opacity 280ms ease'
                }}
              >
                {/* Soft radial gold glow behind the icon (wide card highlight) */}
                <div 
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: 'radial-gradient(circle at 50% 35%, rgba(154, 98, 18, 0.18) 0%, rgba(154, 98, 18, 0.04) 50%, transparent 75%)'
                  }}
                  aria-hidden="true"
                />

                {isActive ? (
                  /* =========================================
                     WIDE HIGHLIGHTED CARD
                     ========================================= */
                  <div className="h-full flex flex-col p-6 lg:p-8 box-border relative z-10 justify-between">
                    {/* Top Row: Pill Tag + Year Range */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full border border-accent/40 bg-surface-2 px-3.5 py-1 text-[11px] font-display uppercase tracking-wider text-accent-text font-bold">
                        {item.level || 'ACADEMIC'}
                      </span>
                      <span className="font-mono text-xs tracking-wider text-accent-text font-semibold">
                        {item.startYear} {item.endYear ? `— ${item.endYear}` : ''}
                      </span>
                    </div>

                    {/* Middle: Prominent Gold Line-Art Icon + Degree Title */}
                    <div className="flex items-center gap-6 my-auto pt-2">
                      <div className="flex-shrink-0 w-24 h-24 lg:w-28 lg:h-28 text-accent drop-shadow-[0_0_12px_rgba(154,98,18,0.35)]">
                        {getEducationIcon(item.icon, 'w-full h-full')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading text-xl lg:text-2xl font-bold uppercase leading-snug text-text">
                          {item.degree}
                        </h3>
                        <p className="mt-1.5 text-sm lg:text-base text-text/90 font-body">
                          {item.institution}
                        </p>
                      </div>
                    </div>

                    {/* Fading Details (opacity 200ms with 80ms delay) */}
                    <div 
                      className="border-t border-border/80 pt-4 mt-auto"
                      style={{
                        transition: 'opacity 200ms ease 80ms'
                      }}
                    >
                      <p className="text-xs lg:text-sm text-text-muted font-body leading-relaxed max-w-xl mb-4 line-clamp-2">
                        {item.focus}
                      </p>

                      <div className="flex items-end justify-between gap-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-display uppercase tracking-widest text-text-muted font-semibold">
                            {item.caption || 'SCORE'}
                          </span>
                          <span className="font-display text-2xl lg:text-3xl font-bold text-accent-text">
                            {item.score}
                          </span>
                        </div>

                        {/* Language Chips */}
                        {languages && languages.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 justify-end">
                            {languages.map((lang, lIdx) => (
                              <span 
                                key={lIdx} 
                                className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-body tracking-wide text-text-muted bg-surface-2/60"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* =========================================
                     NARROW CARD (Centered icon, pill tag, title, year)
                     ========================================= */
                  <div className="h-full flex flex-col items-center justify-between p-5 text-center box-border relative z-10">
                    {/* Top-Left Pill Tag */}
                    <div className="w-full flex justify-center">
                      <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[9px] font-display uppercase tracking-wider text-text-muted font-bold whitespace-nowrap">
                        {item.level || 'ACADEMIC'}
                      </span>
                    </div>
                    
                    {/* Center: Large Greyscale Line-Art Icon (1.5px stroke) */}
                    <div className="w-20 h-20 text-text-muted/70 flex items-center justify-center my-auto transition-colors duration-280 hover:text-text-muted">
                      {getEducationIcon(item.icon, 'w-full h-full')}
                    </div>

                    {/* Bottom: Title & Year */}
                    <div className="w-full">
                      <h4 className="font-heading font-semibold text-xs lg:text-sm text-text/80 line-clamp-2 uppercase tracking-wide leading-tight px-1">
                        {item.degree}
                      </h4>
                      <span className="font-mono text-[11px] text-text-muted block mt-1.5">
                        {item.startYear}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ========================================================
            MOBILE: VERTICAL ACCORDION STACK (Height transition 280ms)
            ======================================================== */}
        <div className="flex md:hidden flex-col gap-4 w-full box-border">
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <div
                key={`mobile-${item.id}`}
                onClick={() => setActiveId(isActive ? null : item.id)}
                className={`rounded-[20px] bg-surface border transition-all duration-[280ms] overflow-hidden cursor-pointer p-5 box-border ${
                  isActive 
                    ? 'border-accent shadow-theme ring-1 ring-accent/30' 
                    : 'border-border'
                }`}
              >
                {/* Header Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 flex-shrink-0 transition-colors ${
                      isActive ? 'text-accent' : 'text-text-muted'
                    }`}>
                      {getEducationIcon(item.icon, 'w-full h-full')}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-display uppercase tracking-wider text-accent-text font-bold block">
                        {item.level || 'ACADEMIC'}
                      </span>
                      <span className="font-mono text-xs text-text-muted">
                        {item.startYear} {item.endYear ? `— ${item.endYear}` : ''}
                      </span>
                    </div>
                  </div>

                  <div className={`transition-transform duration-[280ms] text-text-muted ${isActive ? 'rotate-180 text-accent-text' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </div>

                {/* Degree Title */}
                <h3 className="font-heading text-base font-bold uppercase text-text mt-3 text-left">
                  {item.degree}
                </h3>

                {/* Accordion Expanded Details */}
                {isActive && (
                  <div className="mt-3 pt-3 border-t border-border/80 flex flex-col gap-3 text-left animate-fadeIn">
                    <p className="text-sm text-text/90 font-body">
                      {item.institution}
                    </p>
                    <p className="text-xs text-text-muted font-body leading-relaxed">
                      {item.focus}
                    </p>

                    <div className="flex items-end justify-between pt-2">
                      <span className="text-[10px] font-display uppercase tracking-widest text-text-muted font-semibold">
                        {item.caption || 'SCORE'}
                      </span>
                      <span className="font-display text-xl font-bold text-accent-text">
                        {item.score}
                      </span>
                    </div>

                    {languages && languages.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {languages.map((lang, lIdx) => (
                          <span 
                            key={lIdx} 
                            className="rounded-full border border-border px-2 py-0.5 text-[9px] font-body text-text-muted bg-surface-2/60"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Education;
