import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

const VIDEO_EXT = /\.(mp4|webm)(\?.*)?$/i;

/**
 * Open absolute links in a new tab, lazy-load images, and turn an image
 * whose source is a video file into a muted, looping, inline <video>:
 *   ![alt text](/posts/<slug>/demo.mp4)
 */
function rehypeLinksAndImages() {
  return (tree: HastNode) => {
    const walk = (node: HastNode) => {
      if (node.type === 'element') {
        const props = (node.properties ??= {});
        if (node.tagName === 'a') {
          const href = String(props.href ?? '');
          if (/^https?:\/\//.test(href)) {
            props.target = '_blank';
            props.rel = 'noopener noreferrer';
          }
        }
        if (node.tagName === 'img' && VIDEO_EXT.test(String(props.src ?? ''))) {
          node.tagName = 'video';
          props.ariaLabel = String(props.alt ?? '');
          delete props.alt;
          props.autoPlay = true;
          props.muted = true;
          props.loop = true;
          props.playsInline = true;
          props.controls = true;
          props.preload = 'metadata';
        } else if (node.tagName === 'img') {
          props.loading = 'lazy';
          props.decoding = 'async';
        }
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: 'append',
    properties: { className: ['anchor'], ariaLabel: 'Link to this section' },
    content: { type: 'text', value: '#' },
  })
  .use(rehypeShiki, {
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
    fallbackLanguage: 'text',
  })
  .use(rehypeLinksAndImages)
  .use(rehypeStringify);

export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await processor.process(markdown);
  return String(file);
}
