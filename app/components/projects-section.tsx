import { ProjectsPreview } from "./projects-preview";
import { getProjectsList } from "@/actions/projects";

export const ProjectsSection = async () => {
  const projects = (await getProjectsList()).filter((p) => p.slug);
  return <ProjectsPreview projects={projects} />;
};
