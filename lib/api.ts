import { Note } from "@/types/note";
import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] =
  `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export const menuTags = [
  "All",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

interface fetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  query: string,
  tag: Note["tag"] | undefined
) => {
  const res = await axios.get<fetchNotesProps>("/notes", {
    params: {
      page,
      search: query,
      tag,
    },
  });
  return res.data;
};

export const deleteNote = async (id: Note["id"]) => {
  const res = await axios.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (
  newNote: Omit<Note, "id" | "createdAt" | "updatedAt">
) => {
  const res = await axios.post<Note>("/notes", newNote);
  return res.data;
};

export const fetchNoteById = async (noteId: Note["id"]): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${noteId}`);
  return res.data;
};
