'use client';

import { useEffect, useRef } from 'react';

/** Thin bar at the top of the viewport showing progress through the article. */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = document.getElementById(targetId);
      if (!el || !bar.current) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const done = Math.min(Math.max(-rect.top + window.innerHeight * 0.2, 0), total);
      bar.current.style.transform = `scaleX(${total > 0 ? done / total : 0})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [targetId]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5" aria-hidden>
      <div
        ref={bar}
        className="h-full origin-left bg-fg"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
