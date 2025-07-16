import { component$, Slot, useSignal, useTask$ } from "@builder.io/qwik";
import {
  routeLoader$,
  useLocation,
  type DocumentHead,
} from "@builder.io/qwik-city";
import SearchResults from "~/components/search-results";
import Sidebar from "~/components/sidebar";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import {
  getArticles,
  sortArticlesByDate,
  extractAllTags,
  limitArticles,
  searchArticles,
} from "~/utils/getArticles";
import { type ArticleFrontmatter } from "~/utils/articleSchema";
import { createArticleHead } from "~/utils/createArticleHead";

export const head: DocumentHead = ({ head }) => {
  if (head?.frontmatter) {
    // Cast forcé
    return createArticleHead(head.frontmatter as ArticleFrontmatter);
  }
  return head;
};

export const useArticles = routeLoader$(async () => {
  const articles = await getArticles();
  return articles;
});

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
      isLoading.value = false;
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
  const tags = extractAllTags(sortedArticles);
  const recentArticles = limitArticles(sortedArticles, 3);
  const isSearchActive =
    (location.url.searchParams.get("search") || "").length >= 2;

  return (
    <>
      <div class="container mx-auto px-4 py-8">
        <Navbar />

        <main class="container mx-auto flex-1 px-4 py-8">
          <div class="flex w-full flex-col gap-8 lg:flex-row">
            {/* Colonne de contenu principale */}
            <div class="flex-1">
              {/* Résultats de recherche */}
              <div class="mb-8">
                <SearchResults
                  results={filteredArticles.value}
                  isLoading={isLoading.value}
                  searchQuery={location.url.searchParams.get("search") || ""}
                />
              </div>

              {/* Contenu normal */}
              {!isSearchActive && (
                <div class="mx-auto max-w-3xl">
                  <article
                    class={`prose prose-pre:bg-base-200 prose-pre:rounded-box prose-pre:border prose-pre:border-base-content/10 prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:text-base-content prose-code:bg-base-200 prose-code:rounded-btn prose-code:px-1.5 prose-code:py-0.5 prose-code:text-base-content prose-code:before:content-none prose-code:after:content-none dark:prose-invert dark:prose-pre:bg-base-300 dark:prose-code:bg-base-300 max-w-none`}
                  >
                    <Slot />
                  </article>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <Sidebar
              recentArticles={recentArticles}
              tags={tags}
              searchQuery={location.url.searchParams.get("search") || ""}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
});
