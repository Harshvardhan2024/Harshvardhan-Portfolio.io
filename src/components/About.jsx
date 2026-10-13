import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { content } from '../content';

const About = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 bg-bg text-text transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center mt-6">
          
          {/* Simple Clean Photo with 3px --accent border and 20px rounded corners */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="md:col-span-5 flex justify-center md:justify-start"
          >
            <div className="w-[260px] sm:w-[320px] aspect-[4/5] rounded-[20px] border-[3px] border-accent overflow-hidden shadow-theme bg-surface">
              <img
                src={content.about.photo}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div style={{ display: 'none' }} className="w-full h-full bg-surface-2 items-center justify-center">
                <span className="text-text-muted font-display text-sm">PHOTO</span>
              </div>
            </div>
          </motion.div>
          
          {/* About Text & Quick Stats */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.1 }}
            className="md:col-span-7 text-center md:text-left"
          >
            <p className="text-base sm:text-lg text-text/90 font-body leading-relaxed mb-8">
              {content.about.paragraph}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8">
              {content.about.stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="bg-surface border border-border p-5 rounded-xl shadow-theme transition-all duration-300 hover:border-accent text-center md:text-left"
                >
                  <div className="text-2xl sm:text-3xl font-display font-bold text-accent-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-heading text-text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
