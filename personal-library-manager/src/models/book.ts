export interface Book {
    id: number | null;
    date: number | null;
    name: string | null;
    author: string;
    genre: string[];
    bookmark: number;
    read: boolean;
  }

export type Library = Book[];

export interface BookFormProps {
  initialValues: Book;
  onSubmit?: (values: Book) => void;
  deleteBook?: (id: number | null) => void;
}