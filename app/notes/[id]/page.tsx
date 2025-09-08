import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetails from "./NoteDetails.client";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SingleNotePage({ params }: Props) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", { id: id }],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetails />
      </HydrationBoundary>
    </div>
  );
}
