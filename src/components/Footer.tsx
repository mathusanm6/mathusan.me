import { SITE } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  const link = 'transition-colors hover:text-fg';
  return (
    <footer className="mx-auto mt-24 w-full max-w-[860px] px-6 pb-10">
      <div className="flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} Mathusan Selvakumar</span>
        <div className="flex gap-5">
          <a href={SITE.links.github} target="_blank" rel="noopener noreferrer" className={link}>
            GitHub
          </a>
          <a href={SITE.links.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
            LinkedIn
          </a>
          <a href={`mailto:${SITE.email}`} className={link}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
