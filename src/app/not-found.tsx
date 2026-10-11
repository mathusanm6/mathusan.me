import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[860px] px-6 pt-6 sm:pt-12">
      <h1 className="text-[28px] font-medium tracking-tight sm:text-[32px]">
        Page not found
      </h1>
      <p className="mb-8 mt-3 text-sm text-muted">
        That page doesn&apos;t exist (anymore).
      </p>
      <Link href="/" className="keyword text-sm">
        Back to the journal
      </Link>
    </div>
  );
}
