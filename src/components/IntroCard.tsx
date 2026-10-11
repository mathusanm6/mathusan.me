'use client';

import { useState } from 'react';

type PassionKey = 'swe' | 'gamedev';

const PASSIONS: Record<
  PassionKey,
  {
    label: string;
    role: string;
    focus: string[];
  }
> = {
  swe: {
    label: 'Software Engineer',
    role: 'Software Engineer (Ex-Googler)',
    focus: [
      'agentic workflows',
      'llm evaluation & reliability',
      'large-scale code migrations',
      'developer infrastructure',
    ],
  },
  gamedev: {
    label: 'Game Developer',
    role: 'Game Developer (Design / Code / Art)',
    focus: ['Godot', 'GDScript', 'Procreate', 'Affinity Designer'],
  },
};

function Str({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="text-muted">&quot;</span>
      {children}
      <span className="text-muted">&quot;</span>
    </>
  );
}

/** A small "intro.json" window that switches between my two passions. */
export default function IntroCard() {
  const [active, setActive] = useState<PassionKey>('swe');
  const current = PASSIONS[active];

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-soft">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full border border-line bg-bg" />
            <span className="size-2.5 rounded-full border border-line bg-bg" />
            <span className="size-2.5 rounded-full border border-line bg-bg" />
          </div>
          <span className="font-mono text-xs text-muted">intro.json</span>
        </div>

        <div
          role="tablist"
          aria-label="Switch passion"
          className="flex items-center gap-1 rounded-lg border border-line bg-bg p-0.5 font-mono text-xs"
        >
          {(Object.keys(PASSIONS) as PassionKey[]).map((key) => {
            const isSelected = active === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActive(key)}
                className={`cursor-pointer rounded-md px-2.5 py-1 transition-colors ${
                  isSelected
                    ? 'bg-soft font-medium text-fg shadow-2xs'
                    : 'text-muted hover:text-fg'
                }`}
              >
                {PASSIONS[key].label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-7 sm:px-7 sm:py-6 sm:text-sm">
        <div className="text-muted">{'{'}</div>
        <dl className="grid grid-cols-[max-content_1fr] gap-x-[2ch] pl-[2ch]">
          <dt className="text-muted">&quot;role&quot;:</dt>
          <dd>
            <Str>{current.role}</Str>
            <span className="text-muted">,</span>
          </dd>

          <dt className="text-muted">&quot;focus&quot;:</dt>
          <dd>
            <span className="text-muted">[</span>
            <div className="pl-[2ch]">
              {current.focus.map((item, i) => (
                <div key={item}>
                  <Str>{item}</Str>
                  {i < current.focus.length - 1 && (
                    <span className="text-muted">,</span>
                  )}
                </div>
              ))}
            </div>
            <span className="text-muted">]</span>
          </dd>
        </dl>
        <div className="text-muted">{'}'}</div>
      </div>
    </div>
  );
}

