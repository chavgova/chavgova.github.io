import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const categories = ['Industry ML', 'NLP / LLMs', 'Computer Vision', 'Research', 'Robotics', 'Earlier Work'] as const;
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    summary: z.string(),
    year: z.number().int().min(2000).max(2100).optional(),
    dateLabel: z.string().optional(),
    sortKey: z.number().default(0),
    categories: z.array(z.enum(categories)).min(1),
    tags: z.array(z.string()).min(1),
    featured: z.boolean().default(false),
    showOnTimeline: z.boolean().default(false),
    role: z.string(),
    context: z.string(),
    provenance: z.string(),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    coverCaption: z.string().optional(),
    gallery: z.array(z.object({ image: image(), alt: z.string(), caption: z.string() })).default([]),
    diagram: z.array(z.string()).optional(),
    links: z.array(z.object({ label: z.string(), url: z.url().refine((url) => /^https?:\/\//.test(url), 'Use a real HTTP(S) URL') })).default([]),
    confidential: z.boolean().default(false),
    draft: z.boolean().default(false),
  }).superRefine((data, ctx) => {
    if (data.showOnTimeline && !data.year) ctx.addIssue({ code: 'custom', message: 'Timeline projects need a verified year.', path: ['year'] });
    if (data.cover && !data.coverAlt) ctx.addIssue({ code: 'custom', message: 'Provide descriptive alt text.', path: ['coverAlt'] });
  }),
});
export const collections = { projects };
