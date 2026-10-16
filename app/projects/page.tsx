import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { ProjectsGrid } from "../components/projects-grid";
import { getProjectsList } from "@/actions/projects";

export const revalidate = 300;

export default async function ProjectsPage() {
  const projects = (await getProjectsList()).filter((p) => p.slug);

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-16">
        <ProjectsGrid projects={projects} />
      </main>
      <Footer />
    </>
  );
}
