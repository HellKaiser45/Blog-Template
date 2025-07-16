import type { DocumentHeadValue } from "@builder.io/qwik-city";
import type { ArticleFrontmatter } from "./articleSchema";

export function createArticleHead(
  frontmatter: ArticleFrontmatter,
): DocumentHeadValue {
  const {
    title,
    description = "",
    image,
    slug,
    author = "anonymous",
    date,
    tags = [],
    readingTime,
  } = frontmatter;

  const siteUrl = "https://blog.proactitech.com";
  const canonical = `${siteUrl}/articles/${slug}`;
  const imageAlt = `Illustration de l'article : ${title}`;
  const keywords = tags.join(", ");

  return {
    title,
    meta: [
      { name: "description", content: description },
      { name: "author", content: author },
      { name: "keywords", content: keywords },

      // Open Graph
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: canonical },
      ...(image ? [{ property: "og:image", content: image }] : []),
      ...(image ? [{ property: "og:image:alt", content: imageAlt }] : []),
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "Blog Proactitech" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@ProActiTech" },
      { name: "twitter:creator", content: "@ProActiTech" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(image ? [{ name: "twitter:image", content: image }] : []),
      ...(image ? [{ name: "twitter:image:alt", content: imageAlt }] : []),

      // Extra metadata
      { name: "article:published_time", content: date },
      ...(readingTime
        ? [
            { name: "twitter:label1", content: "Temps de lecture" },
            { name: "twitter:data1", content: `${readingTime} min` },
          ]
        : []),
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}
