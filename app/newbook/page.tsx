"use client";

import Link from "next/link";
import React, { useRef } from "react";

export default function Page() {
  const nameInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLInputElement>(null);
  const coverInput = useRef<HTMLInputElement>(null);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (
        !nameInput.current?.value ||
        !descriptionInput.current?.value ||
        !coverInput.current?.value
      ) {
        throw new Error("Заполните все поля!");
      }

      const data = {
        name: nameInput.current?.value,
        description: descriptionInput.current?.value,
        cover: coverInput.current?.value,
      };

      await fetch("http://localhost:3000/api/new-book", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Книга добавлена!");
      nameInput.current.value = "";
      descriptionInput.current.value = "";
      coverInput.current.value = "";
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen">
      <h1 className="my-10 text-2xl font-semibold text-black">Новая Книга</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={formSubmitHandler}
      >
        <input
          ref={nameInput}
          placeholder="Название"
          className="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
        ></input>

        <input
          ref={descriptionInput}
          placeholder="Описание"
          className="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
        ></input>

        <input
          ref={coverInput}
          placeholder="Ссылка на картинку"
          className="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
        ></input>

        <button
          className="bg-gray-900 hover:shadow-gray-900/20 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Добавить
        </button>
      </form>
      <Link
        className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase
         text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none absolute bottom-20 right-50"
        href="/"
      >
        На главную страницу
      </Link>
    </main>
  );
}
