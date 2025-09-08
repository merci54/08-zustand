"use client";

import css from "./NotePreview.module.css";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

export default function NotePreview() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <div>
      {note && (
        <Modal onClose={() => router.back()}>
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{note.title}</h2>
              </div>
              <p className={css.content}>{note.content}</p>
              <p className={css.tag}>{note.tag}</p>
              <p className={css.date}>{note.createdAt}</p>
            </div>
            <button onClick={() => router.back()}>Close</button>
          </div>
        </Modal>
      )}
      {isError && (
        <Modal onClose={() => router.back()}>
          <div>Error...</div>
        </Modal>
      )}
      {isLoading && (
        <Modal onClose={() => router.back()}>
          <div>Loading note preview...</div>
        </Modal>
      )}
    </div>
  );
}
