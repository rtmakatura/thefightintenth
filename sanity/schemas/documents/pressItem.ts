import { defineField, defineType } from 'sanity';

export const pressItem = defineType({
  name: 'pressItem',
  title: 'Press Item',
  type: 'document',
  fields: [
    defineField({
      name: 'outlet',
      title: 'Outlet',
      type: 'string',
      description: 'e.g. "Pass the Torch", "Air Force Magazine".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'MMMM D, YYYY' },
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: 'Manual order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { headline: 'headline', outlet: 'outlet', date: 'date' },
    prepare: ({ headline, outlet, date }) => ({
      title: headline ?? 'Untitled',
      subtitle: [outlet, date].filter(Boolean).join(' · '),
    }),
  },
});
