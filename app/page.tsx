"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import Book from "../Components/Book";

export type book = {
  name: string;
  description: string;
  cover: string;
};

export default function Home() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch(
        `http://localhost:3000/api/books?page=${page}&size=3`
      );
      const resBooks = await res.json();
      setTotalPages(resBooks.pages);
      setBooks(resBooks.items);
    };
    getBooks();
  }, [page, totalPages]);

  const nextPageHandler = (): void => {
    if (page === totalPages) {
      alert("Это последняя страница!!!");
      return;
    }
    setPage((prevState) => (prevState += 1));
  };

  const prevPageHandler = (): void => {
    if (page === 1) {
      alert("Это первая страница!!!");
      return;
    }
    setPage((prevState) => (prevState -= 1));
  };

  return (
    <main className="flex flex-col items-center">
      <h1 className="my-5 text-2xl font-semibold text-black"> Книги</h1>
      <ul className=" mx-10 grid grid-cols-3 gap-2 text-center ">
        {books.map((book: book) => (
          <li key={book.name} className="px-20">
            <Book book={book}></Book>
          </li>
        ))}
      </ul>
      <div className="inline-flex ">
        <button
          onClick={prevPageHandler}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          Назад
        </button>
        <button
          onClick={nextPageHandler}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          Далее
        </button>
      </div>
      <Link
        className="my-5 select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        href="/newbook"
      >
        Добавить книгу
      </Link>
    </main>
  );
}
