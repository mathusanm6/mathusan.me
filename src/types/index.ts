import { FC, SVGProps } from 'react';

export interface SocialLink {
  name: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  url: string;
}