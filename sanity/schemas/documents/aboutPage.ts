import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the page title, e.g. "The Author".',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Large heading at the top of the page, e.g. "About the Author".',
    }),
    defineField({
      name: 'leftPhoto',
      title: 'Left Photo',
      type: 'object',
      description: 'The "then" photo on the left (e.g. 2nd Lt. Makatura · Hahn AB · 1989).',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Shown below the photo, e.g. "2ND LT. MAKATURA · HAHN AB · 1989".',
        }),
      ],
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: 'rightPhoto',
      title: 'Right Photo',
      type: 'object',
      description: 'The "now" photo on the right (e.g. Author Portrait · 2025).',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Small caps label above the biography heading, e.g. "Captain Michael Makatura".',
    }),
    defineField({
      name: 'heading',
      title: 'Biography Heading',
      type: 'string',
      description: 'The bold sentence above the biography, e.g. "From a Pittsburgh kid to the 10th TFS.".',
    }),
    defineField({
      name: 'body',
      title: 'Body Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 6 }],
      description: 'Each item is one paragraph of the author biography.',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'rightPhoto.image' },
    prepare: ({ title, media }) => ({ title: title ?? 'About Page', media }),
  },
});
