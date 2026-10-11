import IntroCard from '@/components/IntroCard';
import PostRows from '@/components/PostRows';
import { getAllPosts, groupByYear } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();
  const years = groupByYear(posts);

  return (
    <div className="mx-auto w-full max-w-[860px] px-6">
      <section className="pb-16 pt-6 sm:pt-12">
        <h1
          aria-label="Hi, I'm Mathusan Selvakumar"
          className="group mb-8 inline-flex cursor-default items-center text-[28px] font-medium tracking-tight sm:text-[32px]"
        >
          <span>Hi, I&apos;m Mat</span>
          <span
            aria-hidden
            className="inline-grid grid-cols-[0fr] opacity-0 transition-[grid-template-columns,opacity] duration-300 ease-out group-hover:grid-cols-[1fr] group-hover:opacity-100"
          >
            <span className="overflow-hidden whitespace-pre">
              husan Selvakumar
            </span>
          </span>
          <span
            aria-hidden
            className="ml-2 mt-1 inline-block size-[7px] shrink-0 rounded-[2px] bg-accent"
          />
        </h1>
        <IntroCard />
      </section>

      {years.length === 0 ? (
        <p className="border-t border-line py-10 text-sm text-muted">
          Nothing published yet.
        </p>
      ) : (
        years.map(({ year, posts: yearPosts }) => (
          <section
            key={year}
            className="grid border-t border-line pb-12 md:grid-cols-[11.5rem_1fr]"
          >
            <h2 className="pt-5 text-sm md:py-5">{year}</h2>
            <PostRows posts={yearPosts} />
          </section>
        ))
      )}
    </div>
  );
}
