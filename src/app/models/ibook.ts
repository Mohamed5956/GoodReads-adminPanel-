import { Iauthor } from "./iauthor";
import { Icategory } from "./icategory";

export interface Ibook {
  _id?: string;
  title?: string;
  description?: string;
  categoryId?: Icategory;
  authorId?: Iauthor;
  reviewId?: string;
  image?: string;
}
