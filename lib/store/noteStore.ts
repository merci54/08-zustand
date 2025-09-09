import { Note } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type NoteStore = {
  draft: Pick<Note, "title" | "content" | "tag">;

  updateDraft: (note: Partial<Note>) => void;
  clearDraft: () => void;
};

const initialDraft: Pick<Note, "title" | "content" | "tag"> = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      updateDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: "note-draft" }
  )
);
