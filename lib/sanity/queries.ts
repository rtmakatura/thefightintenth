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
  kicker,
  lede,
  body,
  personalNote,
  portrait
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
  inlineImage
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
  date,
  headline,
  description,
  url
}`;

export const photosQuery = `*[_type == "photo"] | order(order asc){
  _id,
  image,
  caption
}`;
