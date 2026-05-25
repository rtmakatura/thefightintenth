import { defineField, defineType } from 'sanity';

export const excerpt = defineType({
  name: 'excerpt',
  title: 'Excerpt',
  type: 'document',
  fields: [
    defineField({
      name: 'chapterNumber',
      title: 'Chapter Number',
      type: 'number',
      description: 'Used to sort excerpts in chronological order.',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'chapterLabel',
      title: 'Chapter Label',
      type: 'string',
      description: 'e.g. "Chapter 1". Shown above the title.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
  ],
  orderings: [
    {
      title: 'Chapter order',
      name: 'chapterAsc',
      by: [{ field: 'chapterNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: { chapter: 'chapterLabel', title: 'title' },
    prepare: ({ chapter, title }) => ({
      title: title ?? 'Untitled',
      subtitle: chapter,
    }),
  },
});
