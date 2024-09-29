export enum Genre {
  type_Fiction = "Fiction",
  type_NonFiction = "Non-Fiction",
  type_Science = "Science",
  type_History = "History",
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  publishedYear: number;
  availability: boolean;
}
