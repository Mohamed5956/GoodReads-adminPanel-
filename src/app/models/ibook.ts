import { Iauthor } from './iauthor';
import { Icategory } from './icategory';

export interface Ibook {
  _id?: string;
  title?: string;
  description?: string;
  categoryId?: Icategory | string;
  authorId?: Iauthor | string;
  reviewId?: string;
  image?: string;
  // page?: number
}
