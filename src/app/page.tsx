'use client';

import React, { FC, SVGProps, useEffect, useState, useMemo, useRef } from 'react';
import { SocialLink } from '@/types'; 

// --- Helper Components & Data ---

// 1. Floating Particles Background Component
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// 2. Inline SVG Icons
const icons: { [key: string]: FC<SVGProps<SVGSVGElement>> } = {
  linkedin: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect width="4" height="12" x="2" y="9"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  ),
  github: (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  ),
  mail: (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  )
};

// 3. Social Links Data
const socialLinks: SocialLink[] = [
    { name: 'LinkedIn', icon: icons.linkedin, url: 'https://www.linkedin.com/in/mathusan-selvakumar/' },
    { name: 'GitHub', icon: icons.github, url: 'https://github.com/mathusanm6' },
    { name: 'Email', icon: icons.mail, url: 'mailto:hi@mathusan.me' },
];

// 4. Skill Pills Component
const SkillPills = () => {
  const skills = useMemo(() => ['Python', 'C++', 'Java'], []);
  const [visibleSkills, setVisibleSkills] = useState<number[]>([]);

  useEffect(() => {
    skills.forEach((_, index: number) => {
      setTimeout(() => {
        setVisibleSkills(prev => [...prev, index]);
      }, 2000 + index * 200);
    });
  }, [skills]);

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 max-w-sm sm:max-w-md mx-auto mobile-skills">
      {skills.map((skill: string, index: number) => (
        <span
          key={skill}
          className={`skill-pill px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 border border-gray-200 rounded-full text-xs sm:text-sm text-gray-700 font-medium transition-all duration-500 hover:bg-gray-200 hover:scale-105 no-select ${
            visibleSkills.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ 
            animationDelay: `${index * 100}ms` 
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

// --- Main Page Component ---
export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleTooltipTouch = () => {
    // Clear any existing timeout
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    
    // Show tooltip
    setShowTooltip(true);
    
    // Set timeout to hide after 3 seconds
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };

  const handleTooltipMouseEnter = () => {
    // Clear any existing timeout
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setShowTooltip(true);
  };

  const handleTooltipMouseLeave = () => {
    // Clear any existing timeout
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setShowTooltip(false);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  return (
    <main className={`relative min-h-screen bg-white overflow-hidden transition-all duration-1000 flex flex-col justify-center items-center px-4 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Custom Selection Styling */}
      <style jsx global>{`
        /* Default selection for general text */
        ::selection {
          background-color: rgba(59, 130, 246, 0.15);
          color: inherit;
        }
        ::-moz-selection {
          background-color: rgba(59, 130, 246, 0.15);
          color: inherit;
        }
        
        /* Name selection with red accent to match the dot */
        .selectable-name::selection {
          background-color: rgba(239, 68, 68, 0.12);
          color: inherit;
        }
        .selectable-name::-moz-selection {
          background-color: rgba(239, 68, 68, 0.12);
          color: inherit;
        }
        
        /* Blue highlight for Google-related text */
        .blue-highlight::selection {
          background-color: rgba(37, 99, 235, 0.12);
          color: inherit;
        }
        .blue-highlight::-moz-selection {
          background-color: rgba(37, 99, 235, 0.12);
          color: inherit;
        }
        
        /* Purple highlight for university-related text */
        .purple-highlight::selection {
          background-color: rgba(147, 51, 234, 0.12);
          color: inherit;
        }
        .purple-highlight::-moz-selection {
          background-color: rgba(147, 51, 234, 0.12);
          color: inherit;
        }
        
        /* Highlighted role selection - matches background */
        .role-blue::selection {
          background-color: rgba(59, 130, 246, 0.2);
          color: inherit;
        }
        .role-blue::-moz-selection {
          background-color: rgba(59, 130, 246, 0.2);
          color: inherit;
        }
        
        .role-violet::selection {
          background-color: rgba(139, 92, 246, 0.2);
          color: inherit;
        }
        .role-violet::-moz-selection {
          background-color: rgba(139, 92, 246, 0.2);
          color: inherit;
        }
        
        /* Disable selection for non-text elements */
        .no-select {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
      
      {/* Animated Background */}
      <FloatingParticles />
      
      {/* Main Content */}
      <div className={`text-center z-20 transform transition-all duration-1000 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Main Heading - Clean Name */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold tracking-wide mb-4 sm:mb-6 text-gray-900 select-text mobile-title">
          <span className="selectable-name font-sans">Mathusan Selvakumar</span>
          <span 
            className="inline-block ml-2 no-select"
            style={{ 
              width: '0.15em', 
              height: '0.15em', 
              backgroundColor: '#EF4444',
              borderRadius: '2px',
            }}
          />
        </h1>
        
        {/* Subtitle with Typing Effect */}
        <div className="mb-6 sm:mb-8 text-lg sm:text-xl md:text-2xl text-gray-600 font-light leading-relaxed select-text mobile-subtitle">
          <div className="inline-block space-y-2">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="bg-blue-50 text-gray-800 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-semibold role-blue mobile-role-badge">Software Engineer Apprentice <span 
                className="text-red-500 cursor-help no-select"
                onMouseEnter={handleTooltipMouseEnter}
                onMouseLeave={handleTooltipMouseLeave}
                onClick={handleTooltipTouch}
                role="button"
                tabIndex={0}
                aria-label="Tap for explanation"
              >
                *
              </span></span>
              
              <span className="text-blue-600 font-medium blue-highlight">@Google</span>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 sm:mt-3">
              <span className="bg-violet-50 text-gray-800 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-semibold role-violet mobile-role-badge">MSc Data Science Student</span>
              <span className="text-purple-600 font-medium purple-highlight">@Université Paris-Saclay</span>
            </div>
          </div>
        </div>

        {/* Skill Pills */}
        <SkillPills />

        {/* Enhanced Social Links */}
        <div className="flex justify-center items-center space-x-8 sm:space-x-12 mt-8 sm:mt-12 mobile-social-container">{socialLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className={`social-icon group relative text-gray-500 transition-all duration-500 hover:text-gray-900 transform ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${200 + index * 100}ms` 
              }}
            >
              {/* Glow Effect - Hidden on mobile */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl scale-150 hidden sm:block" />
              
              {/* Icon */}
              <div className="relative z-10">
                <link.icon />
              </div>
              
              {/* Tooltip - Hidden on mobile */}
              <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden sm:block">
                {link.name}
              </span>
            </a>
          ))}
        </div>

        {/* Call to Action Buttons */}
        <div className={`mt-8 sm:mt-12 transform transition-all duration-1000 delay-700 flex justify-center w-full ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap mobile-btn-group items-center w-full">
            <button 
              onClick={() => window.open('mailto:hi@mathusan.me', '_blank')}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-900/25 active:scale-95 no-select mobile-btn"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                Let&apos;s Connect
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              
              {/* Subtle overlay on hover - desktop only */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Gentle ripple effect for touch */}
              <div className="absolute inset-0 bg-white/10 scale-0 group-active:scale-100 transition-transform duration-200 rounded-lg" />
            </button>

            <button 
              onClick={() => window.open('https://github.com/mathusanm6', '_blank')}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-gray-900 hover:bg-gray-50 text-gray-900 font-medium rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-900/10 active:scale-95 no-select mobile-btn"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                View Projects
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
              
              {/* Subtle overlay on hover - desktop only */}
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Gentle ripple effect for touch */}
              <div className="absolute inset-0 bg-gray-900/5 scale-0 group-active:scale-100 transition-transform duration-200 rounded-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Right Tooltip */}
      <div className={`fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 bg-gray-900 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium max-w-xs sm:max-w-xs transition-all duration-300 z-50 mobile-tooltip ${
        showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}>
        <div className="flex items-start gap-2">
          <span className="text-red-400 font-bold">*</span>
          <span>In France, Apprentice = MSc Student alternating between studies and full-time work experience</span>
        </div>
      </div>
    </main>
  );
}