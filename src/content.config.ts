import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({ loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }) });

export const collections = { blog };