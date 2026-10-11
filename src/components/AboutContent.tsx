'use client';

import { useState } from 'react';
import Link from 'next/link';

type PassionKey = 'swe' | 'gamedev';

const TABS: { key: PassionKey; label: string; subtitle: string }[] = [
  {
    key: 'swe',
    label: 'Software Engineer',
    subtitle: 'Software Engineer (Ex-Googler)',
  },
  {
    key: 'gamedev',
    label: 'Game Developer',
    subtitle: 'Game Developer (Design / Code / Art)',
  },
];

export default function AboutContent() {
  const [active, setActive] = useState<PassionKey>('swe');

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <div
          role="tablist"
          aria-label="Switch about section"
          className="inline-flex items-center gap-1 rounded-lg border border-line bg-soft p-1 font-mono text-xs"
        >
          {TABS.map(({ key, label }) => {
            const isSelected = active === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActive(key)}
                className={`cursor-pointer rounded-md px-3 py-1.5 transition-colors ${
                  isSelected
                    ? 'bg-bg font-medium text-fg shadow-2xs'
                    : 'text-muted hover:text-fg'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <span className="font-mono text-xs text-muted">
          {TABS.find((t) => t.key === active)?.subtitle}
        </span>
      </div>

      {active === 'swe' ? (
        <div className="max-w-[560px] space-y-5 text-[15px] leading-relaxed">
          <p>
            I&apos;m Mathusan, a Software Engineer and former apprentice at{' '}
            <span className="keyword">Google</span>. I hold an MSc in Data
            Science from{' '}
            <span className="keyword">Université Paris-Saclay</span>.
          </p>
          <p>
            During my apprenticeship in France, I alternated between graduate
            studies and full-time engineering in production, which shaped how I
            like to work: pairing strong fundamentals with real-world systems.
          </p>
          <p>
            I focus on <span className="keyword">agentic workflows</span>,{' '}
            <span className="keyword">LLM evaluation &amp; reliability</span>,{' '}
            <span className="keyword">large-scale code migrations</span>, and{' '}
            <span className="keyword">developer infrastructure</span>. I write
            here about{' '}
            <Link href="/categories/software-engineering/" className="keyword">
              software engineering
            </Link>
            ,{' '}
            <Link href="/categories/studies/" className="keyword">
              studies
            </Link>
            , and{' '}
            <Link href="/categories/thoughts/" className="keyword">
              thoughts
            </Link>
            .
          </p>
          <p>I mostly work in Python, C++, and Java.</p>
        </div>
      ) : (
        <div className="max-w-[560px] space-y-5 text-[15px] leading-relaxed">
          <p>
            I&apos;m Mathusan, a Game Developer exploring the craft across{' '}
            <span className="keyword">design</span>,{' '}
            <span className="keyword">code</span>, and{' '}
            <span className="keyword">art</span>.
          </p>
          <p>
            I build games and interactive prototypes in{' '}
            <span className="keyword">Godot</span> using{' '}
            <span className="keyword">GDScript</span>, and draw my own 2D art,
            sprites, and concepts in <span className="keyword">Procreate</span> and <span className="keyword">Affinity Designer</span>.
          </p>
          <p>
            I love the full creative loop of solo game development — taking an
            idea from a rough sketch to gameplay systems and a playable world. I
            share my devlogs and artwork under{' '}
            <Link href="/categories/game-development/" className="keyword">
              game development
            </Link>
            ,{' '}
            <Link href="/categories/arts/" className="keyword">
              arts
            </Link>
            , and{' '}
            <Link href="/categories/thoughts/" className="keyword">
              thoughts
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
