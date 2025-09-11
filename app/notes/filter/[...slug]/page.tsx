import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Note } from "@/types/note";
import NotesPage from "./Notes.client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug[0]} notes`,
    description: `Here you can find ${slug[0]} notes`,
    openGraph: {
      title: `${slug[0]} notes`,
      description: `Here you can find ${slug[0]} notes`,
      url: `https://soliq.rest/${slug[0]}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

export default async function Notes({ params }: Props) {
  const { slug } = await params;
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
