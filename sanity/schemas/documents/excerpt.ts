import { defineField, defineType } from 'sanity';

export const excerpt = defineType({
  name: 'excerpt',
  title: 'Excerpt',
  type: 'document',
  fields: [
    defineField({
      name: 'chapterNumber',
      title: 'Chapter Number',
      type: 'number',
      description: 'Used to sort excerpts in chronological order.',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'chapterLabel',
      title: 'Chapter Label',
      type: 'string',
      description: 'e.g. "Chapter 1". Shown above the title.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'setting',
      title: 'Setting',
      type: 'string',
      description: 'Subtitle for the photo caption, e.g. "Brahma Flight · September 22, 1990".',
    }),
    defineField({
      name: 'pages',
      title: 'Pages',
      type: 'string',
      description: 'Source page range, e.g. "pp. 9–11".',
    }),
    defineField({
      name: 'readMin',
      title: 'Read Time (min)',
      type: 'number',
    }),
    defineField({
      name: 'callsign',
      title: 'Callsign / Unit',
      type: 'string',
      description: 'Plate-style label, e.g. "BRAHMA · 10 TFS".',
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'Right-side meta tag, e.g. "TRAINING · COLD WAR".',
    }),
    defineField({
      name: 'opener',
      title: 'Opener',
      type: 'text',
      rows: 3,
      description: 'First sentence(s), shown with a drop cap.',
    }),
    defineField({
      name: 'preview',
      title: 'Preview',
      type: 'text',
      rows: 6,
      description: 'Card preview text. Should contain the opener as its first sentence.',
    }),
    defineField({
      name: 'body',
      title: 'Body Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 6 }],
      description: 'Each item is one paragraph of the full excerpt body.',
    }),
    defineField({
      name: 'photo',
      title: 'Card Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Large photo shown on the excerpt card.',
    }),
    defineField({
      name: 'inlineImage',
      title: 'Inline Image',
      type: 'object',
      description: 'Optional image inserted into the modal body after a paragraph.',
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
        defineField({
          name: 'afterParagraph',
          title: 'Insert After Paragraph #',
          type: 'number',
          description: '0-based paragraph index to insert the image after.',
        }),
      ],
      options: { collapsible: true, collapsed: false },
    }),
  ],
  orderings: [
    {
      title: 'Chapter order',
      name: 'chapterAsc',
      by: [{ field: 'chapterNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: { chapter: 'chapterLabel', title: 'title', media: 'photo' },
    prepare: ({ chapter, title, media }) => ({
      title: title ?? 'Untitled',
      subtitle: chapter,
      media,
    }),
  },
});
