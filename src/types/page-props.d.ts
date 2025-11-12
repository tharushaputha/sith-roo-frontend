// src/types/page-props.d.ts
// Global type definitions for App Router pages to avoid build errors.

export type PageProps<P = Record<string, string>, S = Record<string, string | string[] | undefined>> = {
    params: P;
    searchParams: S;
};

// Book Page Props සඳහා නිශ්චිත Type එක
export type BookPageProps = PageProps<{ bookId: string }, { view?: string }>;

// Episode Page Props සඳහා නිශ්චිත Type එක
export type EpisodePageProps = PageProps<{ episodeId: string }>;