import React from "react";
import { book } from "@/app/page";

type bookProps = {
  book: book;
};

const Book = ({ book }: bookProps) => {
  return (
    <>
      <h2 className="h-6">{book?.name}</h2>
      <img src={book?.cover} alt={`обложка книги ${book?.name}`} />
      <p className="h-6 text-sm truncate">{book?.description}</p>
    </>
  );
};

export default Book;
