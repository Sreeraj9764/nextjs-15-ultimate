interface Question {
  _id: string;
  title: string;
  description: string;
  tags: Tag[];
  author: Author;
  upvotes: int;
  answers: int;
  views: int;
  createdAt: Date;
}

interface Tag {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
}
