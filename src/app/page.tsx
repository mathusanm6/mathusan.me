import React, { FC, SVGProps } from 'react';
import { SocialLink } from '@/types'; 

// --- Helper Components & Data ---

// 1. Inline SVG Icons
const icons: { [key: string]: FC<SVGProps<SVGSVGElement>> } = {
  linkedin: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect width="4" height="12" x="2" y="9"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  ),
  github: (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  ),
  mail: (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  )
};

// 2. Social Links Data
const socialLinks: SocialLink[] = [
    { name: 'LinkedIn', icon: icons.linkedin, url: 'https://www.linkedin.com/in/mathusan-selvakumar/' },
    { name: 'GitHub', icon: icons.github, url: 'https://github.com/mathusanm6' },
    { name: 'Email', icon: icons.mail, url: 'mailto:hi@mathusan.me' },
];

// --- Main Page Component ---
export default function HomePage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 overflow-hidden p-4">
      <div className="text-center z-20">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 tracking-tight inline-flex items-baseline">
          <span className="selectable-name">Mathusan Selvakumar</span>
          <span 
            style={{ 
              width: '0.2em', 
              height: '0.2em', 
              backgroundColor: '#EF4444',
              marginLeft: '0.2em',
            }}
          ></span>
        </h1>
        
        <div className="flex justify-center items-center space-x-8 mt-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="social-icon text-gray-500 transition-colors duration-300 hover:text-gray-900"
            >
              <link.icon />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}