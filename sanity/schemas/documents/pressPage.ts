import { defineArrayMember, defineField, defineType } from 'sanity';

export const pressPage = defineType({
  name: 'pressPage',
  title: 'Press Page',
  type: 'document',
  fields: [
    defineField({
      name: 'factSheet',
      title: 'Fact Sheet',
      type: 'object',
      description:
        'Book metadata for press kits. Stored here for use in downloadable PDF kits and outreach (not currently displayed on the page).',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
        defineField({ name: 'author', title: 'Author', type: 'string' }),
        defineField({ name: 'pubDate', title: 'Pub Date', type: 'string' }),
        defineField({ name: 'publisher', title: 'Publisher', type: 'string' }),
        defineField({ name: 'format', title: 'Format', type: 'string' }),
        defineField({ name: 'pages', title: 'Pages', type: 'string' }),
        defineField({ name: 'isbn', title: 'ISBN', type: 'string' }),
        defineField({ name: 'genre', title: 'Genre', type: 'string' }),
        defineField({ name: 'price', title: 'Price', type: 'string' }),
      ],
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'contact',
      title: 'Press Contact',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Label', type: 'string', description: 'e.g. "Press & Media Inquiries".' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'phone', title: 'Phone', type: 'string' }),
        defineField({ name: 'hours', title: 'Hours', type: 'string' }),
      ],
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Things Mak is available for (interviews, op-eds, talks, etc.). Not currently displayed; stored for press kit.',
    }),
    defineField({
      name: 'talkingPoints',
      title: 'Talking Points',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      description: 'Topics Mak can speak to. Not currently displayed; stored for press kit.',
    }),
    defineField({
      name: 'pullQuotes',
      title: 'Pull Quotes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pullQuote',
          fields: [
            defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: (r) => r.required() }),
            defineField({ name: 'who', title: 'Attribution', type: 'string', description: 'Outlet or speaker.' }),
          ],
          preview: { select: { title: 'quote', subtitle: 'who' } },
        }),
      ],
    }),
    defineField({
      name: 'appearances',
      title: 'Upcoming Appearances',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'appearance',
          fields: [
            defineField({ name: 'date', title: 'Date Display', type: 'string', description: 'Short display, e.g. "MAY 05".' }),
            defineField({ name: 'weekday', title: 'Weekday', type: 'string', description: 'Short, e.g. "TUE".' }),
            defineField({ name: 'time', title: 'Time', type: 'string', description: '24h, e.g. "1900".' }),
            defineField({ name: 'venue', title: 'Venue', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'kind', title: 'Kind', type: 'string', description: 'e.g. "Launch · reading + signing".' }),
            defineField({ name: 'url', title: 'Details URL', type: 'url', description: 'Optional link to event page.' }),
          ],
          preview: {
            select: { title: 'venue', kind: 'kind', date: 'date' },
            prepare: ({ title, kind, date }) => ({
              title: title ?? 'Untitled',
              subtitle: [date, kind].filter(Boolean).join(' · '),
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Press Page' }),
  },
});
