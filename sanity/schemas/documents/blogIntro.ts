import { defineField, defineType } from 'sanity';

export const blogIntro = defineType({
  name: 'blogIntro',
  title: 'Blog Intro',
  type: 'document',
  fields: [
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Eyebrow above the question, e.g. "From the Author".',
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'Lead-in line, e.g. "The first question I usually get asked is…".',
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'string',
      description: 'The featured question itself, e.g. "Why did you write this book?".',
    }),
    defineField({
      name: 'body',
      title: 'Body Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 6 }],
      description: 'Each item is one paragraph of the intro response.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Blog Intro' }),
  },
});
