import { getCollection, type CollectionEntry } from 'astro:content';
export type Project = CollectionEntry<'projects'>;
export const projectUrl = (project: Project) => `projects/#${project.id}`;
export async function getProjects() {
  return (await getCollection('projects', ({ data }) => !data.draft)).sort((a, b) => b.data.sortKey - a.data.sortKey || a.data.title.localeCompare(b.data.title));
}
export function timelineProjects(projects: Project[]) {
  return projects.filter(({ data }) => data.showOnTimeline && data.year !== undefined).sort((a, b) => a.data.year! - b.data.year! || a.data.sortKey - b.data.sortKey || a.id.localeCompare(b.id));
}
