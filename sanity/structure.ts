import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Book')
        .id('book')
        .child(S.document().schemaType('book').documentId('book')),
      S.divider(),
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('About Page')
        .id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem()
        .title('Blog Intro')
        .id('blogIntro')
        .child(S.document().schemaType('blogIntro').documentId('blogIntro')),
      S.listItem()
        .title('Press Page')
        .id('pressPage')
        .child(S.document().schemaType('pressPage').documentId('pressPage')),
      S.divider(),
      S.documentTypeListItem('endorsement').title('Endorsements'),
      S.documentTypeListItem('excerpt').title('Excerpts'),
      S.documentTypeListItem('blogPost').title('Blog Posts'),
      S.documentTypeListItem('pressItem').title('Press Coverage'),
      S.documentTypeListItem('photoChapter').title('Photo Chapters'),
    ]);
