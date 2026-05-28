export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  subtitle,
  author,
  preorderUrl,
  contactEmail,
  social,
  shareImage
}`;

export const bookQuery = `*[_type == "book"][0]{
  coverImage,
  pageCount,
  pubDate,
  softcover,
  hardcover,
  description
}`;

export const homePageQuery = `*[_type == "homePage"][0]{
  heroImage,
  heroKicker,
  ctaBannerImage,
  ctaBannerQuote
}`;

export const featuredEndorsementsQuery = `*[_type == "endorsement" && featured == true] | order(order asc){
  _id,
  name,
  "role": title,
  detail,
  quote
}`;

export const allEndorsementsQuery = `*[_type == "endorsement"] | order(order asc){
  _id,
  name,
  "role": title,
  detail,
  quote,
  rank
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  eyebrow,
  title,
  leftPhoto,
  rightPhoto,
  kicker,
  heading,
  body
}`;

export const excerptsQuery = `*[_type == "excerpt"] | order(chapterNumber asc){
  _id,
  "chapter": chapterLabel,
  "chapterNum": chapterNumber,
  title,
  setting,
  pages,
  readMin,
  callsign,
  tag,
  photo,
  opener,
  preview,
  body,
  "inlineImage": select(
    defined(inlineImage.image) => {
      "image": inlineImage.image,
      "alt": inlineImage.alt,
      "caption": inlineImage.caption,
      "afterParagraph": inlineImage.afterParagraph
    }
  )
}`;

export const blogPostsQuery = `*[_type == "blogPost"] | order(date desc){
  _id,
  title,
  date,
  kicker,
  lede,
  "excerpt": summary,
  body,
  signOff
}`;

export const blogIntroQuery = `*[_type == "blogIntro"][0]{
  kicker,
  question,
  lede,
  body
}`;

export const pressItemsQuery = `*[_type == "pressItem"] | order(order asc, date desc){
  _id,
  outlet,
  type,
  kicker,
  date,
  headline,
  description,
  url,
  featured,
  order
}`;

export const pressPageQuery = `*[_type == "pressPage"][0]{
  factSheet,
  contact,
  availability,
  talkingPoints,
  pullQuotes,
  appearances
}`;

export const photoChaptersQuery = `*[_type == "photoChapter"] | order(order asc){
  _id,
  order,
  kicker,
  title,
  dates,
  blurb,
  plates[]{
    image,
    span,
    label,
    caption
  }
}`;
