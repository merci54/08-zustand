"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import css from "./NotesPage.module.css";
import { fetchNotes } from "@/lib/api";
import { useDebounce } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { Note } from "@/types/note";
import { useRouter } from "next/navigation";
import NoteList from "@/components/NoteList/NoteList";

interface NotesPageProps {
  tag: Note["tag"] | undefined;
}

export default function NotesPage({ tag }: NotesPageProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const [debouncedQuery] = useDebounce(query, 300);

  const { data } = useQuery({
    queryKey: ["notes", { page: page, query: debouncedQuery, tag }],
    queryFn: () => fetchNotes(page, debouncedQuery, tag),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (newQuery: string) => {
    setPage(1);
    setQuery(newQuery);
  };
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
        <button
          className={css.button}
          onClick={() => router.push("/notes/action/create")}
        >
          Create note +
        </button>
      </header>
      {data && <NoteList notes={data.notes} />}
    </div>
  );
}
