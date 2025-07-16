import { routeLoader$, useLocation, DocumentHead } from "@builder.io/qwik-city";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import {
  getArticles,
  sortArticlesByDate,
  filterFeaturedArticles,
  extractAllTags,
  limitArticles,
  searchArticles,
} from "~/utils/getArticles";
import Slider from "~/components/carrousel";
import ArticleCard from "~/components/article-card";
import SearchResults from "~/components/search-results";
import Sidebar from "~/components/sidebar";
import Hero from "~/components/Hero";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import { type ArticleFrontmatter } from "~/utils/articleSchema";

export const useArticles = routeLoader$(async () => {
  const articles = await getArticles();
  return articles;
});

export const head: DocumentHead = {
  title: "Tech Blog Proactitech ",
  meta: [
    {
      name: "description",
      content:
        "Découvrez nos articles sur la tech et le developpement, cas pratiques et tutoriels pour vos projets web.",
    },
    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://blog.proactitech.com/" },
    {
      property: "og:title",
      content:
        "Tech Blog Proactitech | Expertise Technique pour le développement",
    },
    {
      property: "og:description",
      content:
        "Ressources pour développeurs et projetes divers autour du développement.",
    },
    {
      property: "og:image",
      content:
        "https://res.cloudinary.com/ddismuu6q/image/upload/v1739179995/logo-titre.png",
    },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Tech Blog Proactitech" },
    {
      name: "twitter:description",
      content: "Partage de connaissances techniques pour la communauté dev.",
    },
    {
      name: "twitter:image",
      content:
        "https://res.cloudinary.com/ddismuu6q/image/upload/v1739179995/logo-titre.png",
    },
  ],
  links: [{ rel: "canonical", href: "https://blog.proactitech.com/" }],
};

export default component$(() => {
  const articles = useArticles();
  const location = useLocation();

  const filteredArticles = useSignal<ArticleFrontmatter[]>([]);
  const isLoading = useSignal(false);

  useTask$(({ track, cleanup }) => {
    track(() => location.url.search);

    const searchText = location.url.searchParams.get("search");

    if ((searchText?.length || 0) < 2) {
      filteredArticles.value = [];
      isLoading.value = false; // Cette ligne est cruciale pour cacher le spinner
      return;
    }

    isLoading.value = true;
    const timerId = setTimeout(() => {
      if (searchText) {
        filteredArticles.value = searchArticles(articles.value, searchText);
      }
      isLoading.value = false;
    }, 300);

    cleanup(() => clearTimeout(timerId));
  });

  const sortedArticles = sortArticlesByDate(articles.value);
  const featuredArticles = filterFeaturedArticles(sortedArticles);
  const tags = extractAllTags(sortedArticles);
  const recentArticles = limitArticles(sortedArticles, 3);

  const isSearchActive =
    (location.url.searchParams.get("search") || "").length >= 2;

  return (
    <>
      <div class="container mx-auto px-4 py-8">
        <Navbar />
        <Hero
          title="Tech Blog Proactitech"
          description="Cas pratiques, tutoriels et innovations pour vos projets."
        />
        {/* Conteneur principal avec flex */}
        <div class="flex w-full flex-col gap-8 lg:flex-row">
          {/* Colonne de contenu principale */}
          <div class="flex-1">
            {/* Résultats de recherche en haut de la colonne principale */}
            <div class="mb-4">
              <SearchResults
                results={filteredArticles.value}
                isLoading={isLoading.value}
                searchQuery={location.url.searchParams.get("search") || ""}
              />
            </div>
            {/* Contenu normal (masqué pendant la recherche) */}
            {!isSearchActive && (
              <>
                {featuredArticles.length > 0 && (
                  <div class="mb-12">
                    <h2 class="mb-6 text-3xl font-bold">Articles à la une</h2>
                    <div class="grid gap-6 md:grid-cols-2">
                      {featuredArticles.map((article: ArticleFrontmatter) => (
                        <ArticleCard key={article.slug} frontmatter={article} />
                      ))}
                    </div>
                  </div>
                )}

                <h1 class="mb-6 text-3xl font-bold">Tous les articles</h1>
                <Slider articles={sortedArticles} />
              </>
            )}
          </div>
          {/* Sidebar - position fixe inchangée */}
          <Sidebar
            recentArticles={recentArticles}
            tags={tags}
            searchQuery={location.url.searchParams.get("search") || ""}
          />
        </div>
      </div>
      <Footer />
    </>
  );
});
