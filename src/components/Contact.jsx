import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { content } from '../content';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const iconMap = {
  linkedin: <FaLinkedin size={22} />,
  github: <FaGithub size={22} />,
  email: <FaEnvelope size={22} />
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const shouldReduceMotion = useReducedMotion();

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) nextErrors.email = 'Please enter your email.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = 'Please enter a valid email address.';
    if (!formData.message.trim()) nextErrors.message = 'Please enter a message.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('sending');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "affcd3f3-4488-413e-8c38-d9a22628cebf",
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-bg text-text transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Leave a Message</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-4">
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            className="text-center lg:text-left"
          >
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text mb-4">
              Reach Out
            </h3>
            <p className="text-text-muted font-body mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {content.contact.intro}
            </p>
            
            <div className="space-y-5 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-4 text-text bg-surface border border-border p-3.5 rounded-xl shadow-theme">
                <div className="w-11 h-11 bg-surface-2 border border-border rounded-lg flex items-center justify-center text-accent-text flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs text-text-muted font-heading uppercase tracking-wider">Email</div>
                  <div className="font-medium text-sm sm:text-base truncate">{content.personal.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-text bg-surface border border-border p-3.5 rounded-xl shadow-theme">
                <div className="w-11 h-11 bg-surface-2 border border-border rounded-lg flex items-center justify-center text-accent-text flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs text-text-muted font-heading uppercase tracking-wider">Phone</div>
                  <div className="font-medium text-sm sm:text-base truncate">{content.personal.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-text bg-surface border border-border p-3.5 rounded-xl shadow-theme">
                <div className="w-11 h-11 bg-surface-2 border border-border rounded-lg flex items-center justify-center text-accent-text flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs text-text-muted font-heading uppercase tracking-wider">Location</div>
                  <div className="font-medium text-sm sm:text-base truncate">{content.personal.location}</div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8 justify-center lg:justify-start">
              {content.personal.socials.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-12 h-12 bg-surface border border-border text-text rounded-full flex items-center justify-center hover:bg-accent hover:text-on-accent hover:border-accent transition-colors duration-300 shadow-theme min-w-[48px] min-h-[48px]"
                  aria-label={social.name}
                >
                  {iconMap[social.icon]}
                </a>
              ))}
            </div>
          </motion.div>
          
          {/* Contact Form Card */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.1 }}
            className="bg-surface p-6 sm:p-8 rounded-2xl shadow-theme border border-border relative"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-heading uppercase tracking-wider text-text-muted mb-2">
                  Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className="w-full px-4 py-3 bg-surface-2 border border-border rounded-xl focus:border-accent focus:ring-1 focus:ring-accent outline-none text-text placeholder:text-text-muted/60 transition-all text-sm min-h-[44px]"
                  placeholder="Your Name"
                />
                {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-heading uppercase tracking-wider text-text-muted mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="w-full px-4 py-3 bg-surface-2 border border-border rounded-xl focus:border-accent focus:ring-1 focus:ring-accent outline-none text-text placeholder:text-text-muted/60 transition-all text-sm min-h-[44px]"
                  placeholder="your.email@example.com"
                />
                {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-heading uppercase tracking-wider text-text-muted mb-2">
                  Message
                </label>
                <textarea 
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className="w-full px-4 py-3 bg-surface-2 border border-border rounded-xl focus:border-accent focus:ring-1 focus:ring-accent outline-none text-text placeholder:text-text-muted/60 transition-all text-sm resize-none"
                  placeholder="Your message here..."
                />
                {errors.message && <p id="message-error" className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full btn-gold py-3.5 text-base font-semibold min-h-[48px] shadow-sm"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              
              {status === 'success' && (
                <p className="text-green-600 dark:text-green-400 text-center text-sm font-medium">
                  Message sent successfully!
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-center text-xs font-medium">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;