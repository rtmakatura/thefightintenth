import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Full-bleed background behind the title.',
    }),
    defineField({
      name: 'heroKicker',
      title: 'Hero Kicker',
      type: 'string',
      description: 'Small caps text above the title, e.g. "A Memoir by Captain Michael Makatura".',
    }),
    defineField({
      name: 'ctaBannerImage',
      title: 'CTA Banner Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Background image for the pre-order CTA section near the bottom of the home page.',
    }),
    defineField({
      name: 'ctaBannerQuote',
      title: 'CTA Banner Quote',
      type: 'text',
      rows: 4,
      description: 'The italicized line above the bottom pre-order button.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Home Page' }),
  },
});
