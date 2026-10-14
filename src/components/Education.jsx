import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../content';

const Education = () => {
  const items = content.education?.items || (Array.isArray(content.education) ? content.education : []);

  return (
    <section id="education" className="py-24 bg-bg text-text transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="section-title text-center">Education</h2>
        
        <div className="space-y-6 sm:space-y-8 mt-10">
          {items.map((edu, idx) => (
            <motion.div 
              key={edu.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-surface p-6 sm:p-8 rounded-2xl border border-border shadow-theme relative overflow-hidden transition-all duration-300 hover:border-accent hover:-translate-y-1"
            >
              {/* Left accent indicator bar */}
              <div className="absolute top-0 left-0 w-2 h-full bg-accent"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-text">
                  {edu.degree}
                </h3>
                <span className="text-accent-text font-mono text-xs sm:text-sm font-semibold self-start sm:self-auto bg-surface-2 border border-border px-3 py-1 rounded-full">
                  {edu.startYear ? `${edu.startYear} - ${edu.endYear || 'Present'}` : edu.dates}
                </span>
              </div>
              
              <div className="text-text/90 font-heading font-medium text-base sm:text-lg mb-3">
                {edu.institution}
              </div>
              
              {(edu.focus || edu.details) && (
                <p className="text-text-muted font-body text-sm sm:text-base leading-relaxed mb-4">
                  {edu.focus || edu.details}
                </p>
              )}
              
              {edu.score && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-heading text-accent-text font-semibold">
                  <span>Score: {edu.score}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
