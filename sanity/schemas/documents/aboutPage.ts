import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Small caps line above the heading, e.g. "The story".',
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'text',
      rows: 2,
      description: 'The single short line under the heading.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The main biography.',
    }),
    defineField({
      name: 'personalNote',
      title: 'Personal Note',
      type: 'text',
      rows: 3,
      description: 'Short paragraph about family / present-day life.',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
});
