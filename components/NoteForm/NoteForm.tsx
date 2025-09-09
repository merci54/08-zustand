"use client";

import css from "./NoteForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import LoadingButton from "../LoadingButton/LoadingButton";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { Note } from "@/types/note";

export default function NoteForm() {
  const router = useRouter();
  const { draft, updateDraft, clearDraft } = useNoteStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess() {
      clearDraft();
      router.push("/notes/filter/All");
    },
  });
  const handleSubmit = () => {
    mutate(draft);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          value={draft.title}
          onChange={(e) => updateDraft({ title: e.target.value })}
          id="title"
          type="text"
          name="title"
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          value={draft.content}
          onChange={(e) => updateDraft({ content: e.target.value })}
          id="content"
          name="content"
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          value={draft.tag}
          onChange={(e) => updateDraft({ tag: e.target.value as Note["tag"] })}
          id="tag"
          name="tag"
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          onClick={() => router.push("/notes/filter/All")}
          type="button"
          className={css.cancelButton}
        >
          Cancel
        </button>
        {isPending ? (
          <LoadingButton />
        ) : (
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        )}
      </div>
    </form>
  );
}
