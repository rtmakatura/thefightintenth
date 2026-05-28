import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'MMMM D, YYYY' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Eyebrow text above the title, e.g. "Holiday dispatch".',
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'text',
      rows: 2,
      description: 'One-line deck that runs under the title.',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Shown on the blog list. One or two sentences.',
    }),
    defineField({
      name: 'body',
      title: 'Body Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 6 }],
      description: 'Each item is one paragraph of the post.',
    }),
    defineField({
      name: 'signOff',
      title: 'Sign-Off',
      type: 'string',
      description: 'Signature at the end of the post, e.g. "Mak". Leave blank for none.',
      initialValue: 'Mak',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', date: 'date' },
    prepare: ({ title, date }) => ({
      title: title ?? 'Untitled',
      subtitle: date ?? 'No date',
    }),
  },
});
