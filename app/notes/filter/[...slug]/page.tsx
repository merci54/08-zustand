import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Note } from "@/types/note";
import NotesPage from "./Notes.client";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  // const tag =
  //   slug?.[0] && slug[0] !== "all"
  //     ? ((slug[0].charAt(0).toUpperCase() + slug[0].slice(1)) as Note["tag"])
  //     : undefined;

  const tag = slug[0] === "All" ? undefined : (slug[0] as Note["tag"]);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, query: "", tag }],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesPage tag={tag} />
      </HydrationBoundary>
    </div>
  );
}
