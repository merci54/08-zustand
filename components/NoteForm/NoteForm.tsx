"use client";

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import LoadingButton from "../LoadingButton/LoadingButton";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { Note } from "@/types/note";

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, updateDraft, clearDraft } = useNoteStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess() {
      clearDraft();
      router.push("/notes/filter/All");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as Pick<
      Note,
      "title" | "content" | "tag"
    >;
    mutate(values);
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    updateDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          defaultValue={draft?.title}
          onChange={handleChange}
          id="title"
          type="text"
          name="title"
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          defaultValue={draft?.content}
          onChange={handleChange}
          id="content"
          name="content"
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          defaultValue={draft?.tag}
          onChange={handleChange}
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
