import type { Metadata } from 'next';
import AboutContent from '@/components/AboutContent';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Software Engineer (Ex-Googler) & Game Developer (Design / Code / Art).',
  alternates: { canonical: '/about/' },
};

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[860px] px-6 pt-6 sm:pt-12">
      <h1 className="mb-6 text-[28px] font-medium tracking-tight sm:text-[32px]">
        About
      </h1>

      <AboutContent />

      <section className="mt-16 grid border-t border-line md:grid-cols-[11.5rem_1fr]">
        <h2 className="py-5 text-sm">Elsewhere</h2>
        <ul>
          {[
            ['GitHub', SITE.links.github, true],
            ['LinkedIn', SITE.links.linkedin, true],
            ['Email', `mailto:${SITE.email}`, false],
          ].map(([label, href, external]) => (
            <li key={label as string}>
              <a
                href={href as string}
                {...(external ? ext : {})}
                className="flex items-center justify-between border-b border-line py-5 text-[15px] font-medium transition-colors hover:text-muted"
              >
                {label as string}
                <span className="text-[13px] font-normal text-muted">
                  {(href as string).replace(/^(https?:\/\/(www\.)?|mailto:)/, '')}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
