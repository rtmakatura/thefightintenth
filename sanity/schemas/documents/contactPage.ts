import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'readout',
      title: 'Status Readout Strip',
      type: 'object',
      description: 'The three-column strip below the title (STATION / HRS / REPLY).',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'stationLabel', title: 'Station Label', type: 'string', initialValue: 'STATION' }),
        defineField({ name: 'stationValue', title: 'Station Value', type: 'string', description: 'e.g. "Winter Garden, FL · 28.56°N · 81.58°W".' }),
        defineField({ name: 'hoursLabel', title: 'Hours Label', type: 'string', initialValue: 'HRS' }),
        defineField({ name: 'hoursValue', title: 'Hours Value', type: 'string', description: 'e.g. "Mon–Fri · 0900–1700 ET".' }),
        defineField({ name: 'replyLabel', title: 'Reply Label', type: 'string', initialValue: 'REPLY' }),
        defineField({ name: 'replyValue', title: 'Reply Value', type: 'string', description: 'e.g. "3–5 business days".' }),
      ],
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'text',
      rows: 4,
      description: 'The longer intro paragraph (e.g. "Whether you flew with the Tenth…").',
    }),
    defineField({
      name: 'subLede',
      title: 'Sub-Lede',
      type: 'string',
      description: 'Short line under the lede, e.g. "I read every message myself.".',
    }),
    defineField({
      name: 'directCard',
      title: 'Direct Channel Card',
      type: 'object',
      description: 'The "Write to Mak" card with the author email.',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'tag', title: 'Tag', type: 'string', description: 'e.g. "Direct · Author".' }),
        defineField({ name: 'title', title: 'Title', type: 'string', description: 'e.g. "Write to Mak".' }),
        defineField({
          name: 'note',
          title: 'Note',
          type: 'text',
          rows: 3,
          description: 'Paragraph below the email address.',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
});
