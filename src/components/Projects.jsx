import React, { useState, useRef, useEffect, useCallback } from 'react';
import { content } from '../content';
import MediaCarousel from './MediaCarousel';

const Projects = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeCardId, setActiveCardId] = useState(null);
  const activeTimerRef = useRef(null);

  // Activate a card's controls for 3 s on touch tap
  const activateCard = useCallback((id) => {
    setActiveCardId(id);
    if (activeTimerRef.current) clearTimeout(activeTimerRef.current);
    activeTimerRef.current = setTimeout(() => setActiveCardId(null), 3000);
  }, []);

  useEffect(() => () => {
    if (activeTimerRef.current) clearTimeout(activeTimerRef.current);
  }, []);

  // Only fires on touch devices; ignores taps that land on <a> or <button>
  const handleCardTap = useCallback((e, projectId) => {
    if (e.target.closest('a, button')) return;
    if (!window.matchMedia('(hover: none)').matches) return;
    activateCard(projectId);
  }, [activateCard]);

  return (
    <section id="projects" className="py-24 bg-bg text-text transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Projects</h2>
        
        {/* Container has padding so scale-[1.04] is never clipped by parents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 py-4 px-1 sm:px-2">
          {content.projects.map((project) => {
            return (
              <article
                key={project.id}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(e) => handleCardTap(e, project.id)}
                className="group relative bg-surface rounded-2xl overflow-hidden border border-border transition-all duration-300 ease-out will-change-transform shadow-theme flex flex-col cursor-pointer hover:scale-[1.04] hover:border-accent hover:shadow-theme z-0 hover:z-10"
              >
                {/* Full-bleed media — no padding, no slant-clip.
                    Card's overflow-hidden + rounded-2xl clips the top corners. */}
                <div className="w-full overflow-hidden">
                  <div className="transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.08]">
                    <MediaCarousel
                      media={project.media}
                      isCardHovered={hoveredId === project.id}
                      controlsVisible={activeCardId === project.id ? true : undefined}
                    />
                  </div>
                </div>
                
                <div className="p-6 sm:p-8 pt-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-text group-hover:text-accent-text transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-display tracking-wider text-accent-text bg-surface-2 border border-border px-3 py-1 rounded-full whitespace-nowrap font-medium">
                      {project.role}
                    </span>
                  </div>
                  
                  <p className="text-text/80 font-body text-sm sm:text-base mb-6 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Single "Link" pill tag — only rendered when project.link is non-empty */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-body px-3 py-1 bg-surface-2 text-text-muted rounded-md border border-border hover:border-accent hover:text-accent-text transition-colors"
                      >
                        Link
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
