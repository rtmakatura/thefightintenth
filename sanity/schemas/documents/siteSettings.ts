import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Shown under the title in the hero, e.g. "Cold War to Desert Storm".',
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'preorderUrl',
      title: 'Pre-Order URL',
      type: 'url',
      description: 'Amazon (or other retailer) pre-order link used by the CTA buttons site-wide.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Used on the contact page.',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', type: 'url' }),
        defineField({ name: 'linkedin', type: 'url' }),
        defineField({ name: 'instagram', type: 'url' }),
      ],
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: 'shareImage',
      title: 'Share Image',
      type: 'image',
      description: 'Used when the site is shared on social media or in messages.',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
