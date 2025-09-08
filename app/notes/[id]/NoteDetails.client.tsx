"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./NoteDetailsClient.module.css";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function NoteDetails() {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ["note", { id: id }],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data?.title}</h2>
        </div>
        <p className={css.content}>{data?.content}</p>
        <p className={css.date}>{data?.createdAt}</p>
      </div>
      <Link className={css.back} href="/notes/filter/All">
        Back to all notes
      </Link>
    </div>
  );
}
