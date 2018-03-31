export class Book {
  name: string;
  owner: string;
  author: string;
  content: Array<BookContent>
  entry: string;
  _id: string;
}

export class BookContent {
  id: number;
  content: string;
  parents: Array<number>;
  neededAssets: Array<number>;
}

export class BookListItem {
  name: string;
  owner: string;
  author: string;
  anyOtherInfo: string;
  _id: string;
}
