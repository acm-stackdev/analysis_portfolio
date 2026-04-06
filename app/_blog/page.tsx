// app/blog/page.tsx

import { ArrowUpRight, Newspaper, Clock, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Look up your Page ID on your Facebook Page's "About" tab
const PAGE_ID = "314980118370300";
const TOKEN = process.env.FACEBOOK_PAGE_TOKEN;

async function getFacebookPosts() {
  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${PAGE_ID}/posts?fields=message,full_picture,created_time,permalink_url&access_token=${TOKEN}`,
      { next: { revalidate: 3600 } },
    );

    // If it fails, extract and print the EXACT error from Meta
    if (!res.ok) {
      const errorData = await res.json();
      console.error("META API ERROR:", JSON.stringify(errorData, null, 2));
      return []; // Return empty array so the page doesn't crash completely
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("NETWORK ERROR:", error);
    return [];
  }
}

type Post = {
  id: string;
  message?: string;
  full_picture?: string;
  created_time: string;
  permalink_url: string;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Featured (first) post ──────────────────────────────────────────────────
function FeaturedPost({ post }: { post: Post }) {
  const excerpt = post.message
    ? post.message.length > 260
      ? post.message.slice(0, 260) + "…"
      : post.message
    : null;

  return (
    <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="grid md:grid-cols-2">
        {post.full_picture ? (
          <div className="relative h-64 md:h-full overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.full_picture}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>
        ) : (
          <div className="hidden md:flex items-center justify-center bg-muted h-full min-h-[280px]">
            <Newspaper className="size-16 text-muted-foreground/30" />
          </div>
        )}

        <CardContent className="flex flex-col justify-between gap-6 p-7 md:p-9">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="text-xs tracking-widest uppercase font-medium"
            >
              Latest post
            </Badge>
            {excerpt && (
              <p className="text-foreground/80 leading-relaxed text-[0.95rem]">
                {excerpt}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <CalendarDays className="size-3.5" />
              <span>{formatDate(post.created_time)}</span>
              <span className="text-muted-foreground/50">·</span>
              <Clock className="size-3.5" />
              <span>{formatTime(post.created_time)}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              asChild
              className="gap-1.5 group/btn"
            >
              <a
                href={post.permalink_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Facebook
                <ArrowUpRight className="size-3.5 transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// ── Regular post card ──────────────────────────────────────────────────────
function PostCard({ post }: { post: Post }) {
  const excerpt = post.message
    ? post.message.length > 140
      ? post.message.slice(0, 140) + "…"
      : post.message
    : null;

  return (
    <Card className="group overflow-hidden border-border/60 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      {post.full_picture && (
        <div className="relative h-44 overflow-hidden bg-muted shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.full_picture}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      )}

      <CardContent className="flex flex-col justify-between gap-4 p-5 flex-1">
        <p className="text-sm text-foreground/75 leading-relaxed flex-1">
          {excerpt ?? (
            <span className="italic text-muted-foreground">No caption</span>
          )}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <CalendarDays className="size-3" />
            <span>{formatDate(post.created_time)}</span>
          </div>

          <a
            href={post.permalink_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline underline-offset-4 transition-colors"
          >
            Read more
            <ArrowUpRight className="size-3 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Empty state ────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center gap-4">
      <div className="rounded-full border border-border p-5 text-muted-foreground/40">
        <Newspaper className="size-8" />
      </div>
      <div className="space-y-1">
        <p className="font-medium text-foreground/70">No posts yet</p>
        <p className="text-sm text-muted-foreground">
          Check back soon — updates will appear here.
        </p>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function BlogPage() {
  const posts: Post[] = await getFacebookPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <div className="border-b border-border/60 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-primary/10 p-1.5">
              <Newspaper className="size-4 text-primary" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight">Blog</h1>
          </div>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </Badge>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {featured && <FeaturedPost post={featured} />}

            {rest.length > 0 && (
              <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground whitespace-nowrap">
                  More posts
                </span>
                <Separator className="flex-1" />
              </div>
            )}

            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
