import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-[860px] items-center justify-between px-6 py-8 sm:py-10">
      <Link
        href="/"
        aria-label="Mathusan Selvakumar — home"
        className="inline-flex items-center transition-transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden
          className="size-8"
        >
          <rect width="32" height="32" rx="8" fill="var(--fg)" />
          <path
            d="M8 23V10.5h2.6l5.4 8 5.4-8H24V23h-2.7v-8l-5.3 7.9-5.3-7.9v8z"
            fill="var(--bg)"
          />
          <rect
            x="24.5"
            y="22"
            width="3"
            height="3"
            rx="0.6"
            fill="var(--accent)"
          />
        </svg>
      </Link>
      <nav className="flex items-center gap-5 text-[13px] text-fg">
        <Link href="/about/" className="transition-colors hover:text-muted">
          About
        </Link>
        <Link href="/categories/" className="transition-colors hover:text-muted">
          Categories
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
