import { defineField, defineType } from 'sanity';

export const endorsement = defineType({
  name: 'endorsement',
  title: 'Endorsement',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title / Rank',
      type: 'string',
      description: 'e.g. "Colonel (Ret), USAF".',
    }),
    defineField({
      name: 'detail',
      title: 'Detail',
      type: 'string',
      description: 'Role / squadron / dates, shown under the title.',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 8,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Home',
      type: 'boolean',
      description: 'Show this endorsement in the three-card preview on the home page.',
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
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', quote: 'quote' },
    prepare: ({ title, subtitle, quote }) => ({
      title,
      subtitle: subtitle ? `${subtitle} — ${quote?.slice(0, 50)}…` : quote?.slice(0, 60),
    }),
  },
});
