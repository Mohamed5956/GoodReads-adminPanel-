import { Iauthor } from "./iauthor";
import { Ibook } from "./ibook";
import { Icategory } from "./icategory";

export interface Ipopular {
  book: { bookId: Ibook }
  category: Icategory
  author: Iauthor
}
