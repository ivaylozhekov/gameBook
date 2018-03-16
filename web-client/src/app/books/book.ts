export class Book {
  name: string;
  owner: string;
  author: string;
  content: Array<BookContent>
  entry: string;
  ref: string;
}

export class BookContent {
  id: number;
  content: string;
  parents: Array<number>;
  neededAssets: Array<number>;
}
