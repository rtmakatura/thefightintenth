import { defineArrayMember, defineField, defineType } from 'sanity';

export const photoChapter = defineType({
  name: 'photoChapter',
  title: 'Photo Chapter',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 100,
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Eyebrow text above the title, e.g. "Chapter I".',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Hahn Air Base · Germany".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'dates',
      title: 'Dates',
      type: 'string',
      description: 'e.g. "1988 — 1990".',
    }),
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
      rows: 3,
      description: 'Short intro paragraph for the chapter.',
    }),
    defineField({
      name: 'plates',
      title: 'Plates',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'plate',
          title: 'Plate',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'span',
              title: 'Span',
              type: 'string',
              options: {
                list: [
                  { title: 'Square (1×1)', value: 'square' },
                  { title: 'Wide (2×1)', value: 'wide' },
                  { title: 'Tall (1×2)', value: 'tall' },
                  { title: 'Wide & Tall (2×2)', value: 'wide-tall' },
                ],
                layout: 'radio',
              },
              initialValue: 'square',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Short title shown under the plate, e.g. "Two-ship · Hunsrück".',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'text',
              rows: 2,
              description: 'Longer caption shown in the lightbox.',
            }),
          ],
          preview: {
            select: { media: 'image', title: 'label', subtitle: 'caption' },
          },
        }),
      ],
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
    select: { title: 'title', subtitle: 'dates', media: 'plates.0.image' },
  },
});
