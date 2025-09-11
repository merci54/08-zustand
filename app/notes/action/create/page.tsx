import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./NoteCreate.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Create new note`,
  description: `Here you can create new note`,
  openGraph: {
    title: `Create new note`,
    description: `Here you can create new note`,
    url: `https://soliq.rest/notes/action/create`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function Create() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
