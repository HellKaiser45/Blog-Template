import { isDev } from "@builder.io/qwik/build";
import { type ArticleFrontmatter, FrontmatterSchema } from "./articleSchema";
import { z } from "zod";

export const getArticles = async (): Promise<ArticleFrontmatter[]> => {
  // 1. Chargement des fichiers MDX
  const articlesGlob = import.meta.glob("/src/routes/articles/**/index.mdx", {
    eager: !isDev,
    import: "frontmatter",
  });

  if (isDev) {
    const modules = await Promise.all(
      Object.values(articlesGlob).map((loader) => loader()),
    );

    return z.array(FrontmatterSchema).parse(modules);
  }

  return z.array(FrontmatterSchema).parse(Object.values(articlesGlob));
};

/**
 * Trie les articles par date (du plus récent au plus ancien)
 * @param articles Liste d'articles
 * @returns Articles triés par date
 */
export const sortArticlesByDate = (
  articles: ArticleFrontmatter[],
): ArticleFrontmatter[] => {
  return [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

/**
 * Filtre les articles pour ne garder que les featured
 * @param articles Liste d'articles
 * @returns Articles featured seulement
 */
export const filterFeaturedArticles = (
  articles: ArticleFrontmatter[],
): ArticleFrontmatter[] => {
  return articles.filter((article) => article.featured);
};

/**
 * Limite le nombre d'articles retournés
 * @param articles Liste d'articles
 * @param limit Nombre maximum d'articles à retourner
 * @returns Sous-ensemble d'articles
 */
export const limitArticles = (
  articles: ArticleFrontmatter[],
  limit: number,
): ArticleFrontmatter[] => {
  return articles.slice(0, limit);
};

/**
 * Extrait tous les tags uniques des articles
 * @param articles Liste d'articles
 * @returns Tableau de tags uniques
 */
export const extractAllTags = (articles: ArticleFrontmatter[]): string[] => {
  const allTags = articles.flatMap((article) => article.tags || []);
  return [...new Set(allTags)]; // Supprime les doublons
};

/**
 * Filtre les articles contenant le terme de recherche dans le titre, description, auteur ou tags
 * @param articles Liste d'articles
 * @param searchTerm Terme à rechercher (case insensitive)
 * @returns Articles correspondant à la recherche
 */
export const searchArticles = (
  articles: ArticleFrontmatter[],
  searchTerm: string,
): ArticleFrontmatter[] => {
  const term = searchTerm.toLowerCase();
  return articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(term) ||
      article.description.toLowerCase().includes(term) ||
      article.author.toLowerCase().includes(term) ||
      (article.tags || []).some((tag) => tag.toLowerCase().includes(term))
    );
  });
};
