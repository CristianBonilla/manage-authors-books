import { Author } from '@interfaces/author';

export interface Book {
  title: string;
  chapters: number;
  pages: number;
  authors: Author[];
}
