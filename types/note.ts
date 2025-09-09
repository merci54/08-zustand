export interface Note {
  id: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewNoteData {
  tag?: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
  title?: string;
  content?: string;
}
