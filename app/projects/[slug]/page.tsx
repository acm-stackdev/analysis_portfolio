import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { NotionBlocks } from "../../components/notion-blocks";
import { Badge } from "@/components/ui/badge";
import { getProjectBySlug, getProjectsList } from "@/actions/projects";

export const revalidate = 300;

export async function generateStaticParams() {
  const projects = await getProjectsList();
  return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-28 md:pt-32 md:pb-20">
        <article className="max-w-3xl mx-auto px-6 md:px-0">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          {project.coverImage && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border mb-8">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 700px, 100vw"
                quality={100}
                className="object-cover"
                priority
              />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {project.title}
          </h1>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-medium">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {project.summary && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {project.summary}
            </p>
          )}

          <NotionBlocks blocks={project.blocks} />
        </article>
      </main>
      <Footer />
    </>
  );
}
