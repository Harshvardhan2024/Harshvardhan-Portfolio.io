import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../content';

// FontAwesome
import { FaUserTie, FaComments, FaStar } from 'react-icons/fa';

// Simple Icons (brand logos)
import { SiAutocad, SiAnsys, SiPython } from 'react-icons/si';

// Material Design Icons
import { MdPrecisionManufacturing, MdEngineering } from 'react-icons/md';

// Tabler Icons
import {
  TbAssembly,
  TbRuler,
  TbRocket,
  TbWind,
  TbBuildingBridge2,
  TbHexagon3D,
  TbGizmo,
} from 'react-icons/tb';

// Game Icons
import { GiMechanicalArm } from 'react-icons/gi';

// Icon size shared class
const S = 'w-10 h-10';

const iconMap = {
  // CAD
  solidworks: <MdPrecisionManufacturing className={`${S} text-[#C9462A]`} />,   // Solidworks red
  autocad:    <SiAutocad               className={`${S} text-[#CC0000]`} />,    // AutoCAD red
  gdt:        <TbRuler                 className={`${S} text-accent`} />,        // GD&T → ruler
  fdm:        <TbHexagon3D             className={`${S} text-accent`} />,        // Fused Deposition → 3-D hex
  catia:      <MdEngineering           className={`${S} text-[#005B8E]`} />,     // CATIA → engineering icon (Dassault blue)
  fusion360:  <GiMechanicalArm         className={`${S} text-[#F79420]`} />,     // Fusion 360 → mechanical arm (Autodesk orange)
  plm:        <TbAssembly              className={`${S} text-accent`} />,        // PLM → assembly

  // Simulation & Programming
  ansys:      <SiAnsys                 className={`${S} text-[#FFB71B]`} />,    // Ansys yellow
  matlab:     <TbGizmo                 className={`${S} text-[#0076A8]`} />,    // Matlab → gizmo (Mathworks blue)
  python:     <SiPython                className={`${S} text-[#3776AB]`} />,    // Python blue

  // Engineering
  propulsion:   <TbRocket             className={`${S} text-accent`} />,
  aerodynamics: <TbWind               className={`${S} text-accent`} />,
  structures:   <TbBuildingBridge2    className={`${S} text-accent`} />,

  // Soft Skills
  leadership:    <FaUserTie           className={`${S} text-accent`} />,
  communication: <FaComments          className={`${S} text-accent`} />,

  // Fallback
  star: <FaStar className={`${S} text-accent`} />,
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredSkills = activeCategory === 'All' 
    ? content.skills.items 
    : content.skills.items.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 bg-bg text-text transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Skills</h2>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center md:justify-start">
          {content.skills.categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-display text-xs sm:text-sm tracking-wider transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-accent text-on-accent font-semibold shadow-sm' 
                  : 'bg-surface text-text-muted border border-border hover:border-accent hover:text-accent-text'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          <AnimatePresence>
            {filteredSkills.map(skill => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25 }}
                key={skill.name}
                className="group relative bg-surface p-6 rounded-2xl border border-border shadow-theme flex flex-col items-center justify-center gap-3.5 hover:border-accent transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {iconMap[skill.icon] || <FaStar className="w-10 h-10 text-text-muted" />}
                </div>
                <span className="font-heading font-medium text-text text-sm sm:text-base text-center">
                  {skill.name}
                </span>
                
                {/* Level Tooltip */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-surface-2 border border-border text-text text-[11px] py-1 px-3 rounded-lg pointer-events-none whitespace-nowrap shadow-sm">
                  {skill.level}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
