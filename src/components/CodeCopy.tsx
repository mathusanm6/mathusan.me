'use client';

import { useEffect } from 'react';

/** Adds a "Copy" button to every code block inside the article body. */
export default function CodeCopy({ targetId }: { targetId: string }) {
  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root) return;

    const cleanups: Array<() => void> = [];

    root.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');

      let timer: ReturnType<typeof setTimeout> | undefined;
      const onClick = async () => {
        const text = pre.querySelector('code')?.textContent ?? '';
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = 'Copied';
        } catch {
          btn.textContent = 'Failed';
        }
        clearTimeout(timer);
        timer = setTimeout(() => (btn.textContent = 'Copy'), 1600);
      };
      btn.addEventListener('click', onClick);
      pre.appendChild(btn);

      cleanups.push(() => {
        clearTimeout(timer);
        btn.removeEventListener('click', onClick);
        btn.remove();
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [targetId]);

  return null;
}
