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
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'Tag shown above the headline, e.g. "Feature", "Review", "Interview".',
      options: {
        list: [
          'Feature',
          'Review',
          'Interview',
          'Conversation',
          'Profile',
          'Radio',
          'Podcast',
          'Op-Ed',
        ],
      },
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Short outlet detail, e.g. "Digital magazine", "Episode 142 · 58 min".',
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
      title: 'Deck / Description',
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
      name: 'featured',
      title: 'Featured (top of page)',
      type: 'boolean',
      description: 'Shown as the large featured article at the top of the press page.',
      initialValue: false,
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
