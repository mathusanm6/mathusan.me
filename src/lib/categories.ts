import {
  Code,
  Gamepad2,
  GraduationCap,
  Heart,
  Palette,
  type LucideIcon,
} from 'lucide-react';

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'software-engineering',
    name: 'Software Engineering',
    description: 'Tools, workflows and lessons from building and running software.',
    icon: Code,
  },
  {
    slug: 'game-development',
    name: 'Game Development',
    description: 'Prototypes, mechanics and notes from making games.',
    icon: Gamepad2,
  },
  {
    slug: 'arts',
    name: 'Arts',
    description: 'Visual experiments, design and creative work.',
    icon: Palette,
  },
  {
    slug: 'studies',
    name: 'Studies',
    description: 'What I am learning at university, written down.',
    icon: GraduationCap,
  },
  {
    slug: 'thoughts',
    name: 'Thoughts',
    description: 'Shorter reflections and ideas in progress.',
    icon: Heart,
  },
];

/** Accepts either the display name ("Software Engineering") or the slug. */
export function findCategory(value: string): Category | undefined {
  const v = value.trim().toLowerCase();
  return CATEGORIES.find((c) => c.slug === v || c.name.toLowerCase() === v);
}
