import { defineArrayMember, defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      description: 'The opening poster section with the book title.',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'bylineLabel',
          title: 'Byline Label',
          type: 'string',
          description: 'Lead-in to the author name, e.g. "A memoir by".',
        }),
        defineField({
          name: 'titleLine1',
          title: 'Title — Line 1',
          type: 'string',
          description: 'e.g. "THE FIGHTIN\'".',
        }),
        defineField({
          name: 'titleLine2',
          title: 'Title — Line 2',
          type: 'string',
          description: 'e.g. "TENTH".',
        }),
        defineField({
          name: 'hud',
          title: 'HUD Readouts',
          type: 'array',
          description: 'The 5 small data rows in the top-right corner.',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'hudRow',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "Squadron".' }),
                defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. "10 TFS".' }),
                defineField({ name: 'accent', title: 'Accent (highlight blue)', type: 'boolean', initialValue: false }),
              ],
              preview: { select: { title: 'label', subtitle: 'value' } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'telemetryItems',
      title: 'Telemetry Marquee',
      type: 'array',
      description: 'The horizontal scrolling strip just below the hero.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'telemetryItem',
          fields: [
            defineField({ name: 'em', title: 'Highlight (small caps)', type: 'string', description: 'Optional bold leading text.' }),
            defineField({ name: 'text', title: 'Text', type: 'string', validation: (r) => r.required() }),
          ],
          preview: {
            select: { em: 'em', text: 'text' },
            prepare: ({ em, text }) => ({ title: em ? `${em} · ${text}` : text }),
          },
        }),
      ],
    }),
    defineField({
      name: 'aboutBook',
      title: 'About the Book Section',
      type: 'object',
      description: 'The "The Book" section with cover image and 3 Acts.',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'kicker', title: 'Kicker', type: 'string', description: 'e.g. "The Book".' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'First line of the heading, e.g. "A squadron, a Viper,".' }),
        defineField({ name: 'headingEm', title: 'Heading Italic Line', type: 'string', description: 'Italic continuation, e.g. "and the years that defined them.".' }),
        defineField({ name: 'lede', title: 'Lede', type: 'text', rows: 4, description: 'The intro paragraph under the heading.' }),
        defineField({
          name: 'acts',
          title: 'Acts',
          type: 'array',
          description: 'The 3 numbered acts ("Act One · 1987–1989", etc.).',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'act',
              fields: [
                defineField({ name: 'num', title: 'Numeral', type: 'string', description: 'e.g. "I.".' }),
                defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "Act One · 1987–1989".' }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
              ],
              preview: { select: { title: 'label', subtitle: 'title' } },
            }),
          ],
          validation: (r) => r.max(3).warning('More than 3 Acts will overflow the layout.'),
        }),
      ],
    }),
    defineField({
      name: 'patchInterlude',
      title: 'Squadron Mark Section',
      type: 'object',
      description: 'The dark interlude with the squadron patch + mantra quote.',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'topLabel', title: 'Patch Top Label', type: 'string', description: 'e.g. "10 TFS".' }),
        defineField({ name: 'bottomLabel', title: 'Patch Bottom Label', type: 'string', description: 'e.g. "Sabres".' }),
        defineField({ name: 'mantra', title: 'Mantra Quote', type: 'text', rows: 3 }),
        defineField({ name: 'mantraSource', title: 'Mantra Source', type: 'string', description: 'e.g. "— from The Fightin\' Tenth".' }),
      ],
    }),
    defineField({
      name: 'ctaBanner',
      title: 'Call-to-Action Banner',
      type: 'object',
      description: 'The bottom section with audiences and "Order on Amazon" button.',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'kicker', title: 'Kicker', type: 'string', description: 'e.g. "Who It\'s For".' }),
        defineField({
          name: 'audiences',
          title: 'Audiences',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Short list shown as chips, e.g. ["Veterans", "Aviation buffs", …].',
        }),
        defineField({ name: 'tagline', title: 'Tagline', type: 'text', rows: 3, description: 'The "— and anyone who\'s ever wondered…" line.' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Home Page' }),
  },
});
