import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./NoteCreate.module.css";

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
