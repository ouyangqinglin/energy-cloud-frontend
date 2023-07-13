import type { ReactNode } from 'react';

export type CardInfo = {
  title: string;
  icon: ReactNode;
  value: number;
  description: string;
  items: CardInfoItem[];
};

export type CardInfoItem = {
  label: string;
  value: number;
};
