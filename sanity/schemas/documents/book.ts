import { defineField, defineType } from 'sanity';

export const book = defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the cover for screen readers.',
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'pageCount',
      title: 'Page Count',
      type: 'number',
    }),
    defineField({
      name: 'pubDate',
      title: 'Publication Date',
      type: 'date',
      options: { dateFormat: 'MMMM D, YYYY' },
    }),
    defineField({
      name: 'softcover',
      title: 'Softcover',
      type: 'object',
      fields: [
        defineField({ name: 'price', title: 'Price', type: 'string', description: 'Include the currency, e.g. "$18.95".' }),
        defineField({ name: 'isbn', title: 'ISBN', type: 'string' }),
      ],
      options: { columns: 2 },
    }),
    defineField({
      name: 'hardcover',
      title: 'Hardcover',
      type: 'object',
      fields: [
        defineField({ name: 'price', title: 'Price', type: 'string' }),
        defineField({ name: 'isbn', title: 'ISBN', type: 'string' }),
      ],
      options: { columns: 2 },
    }),
    defineField({
      name: 'description',
      title: 'Description Paragraphs',
      type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], marks: { decorators: [{ title: 'Italic', value: 'em' }] } }],
      description: 'Used on the home page "About the Book" section.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Book' }),
  },
});
