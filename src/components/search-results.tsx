import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { type ArticleFrontmatter } from "~/utils/articleSchema";

interface SearchResultsProps {
  results: ArticleFrontmatter[];
  isLoading: boolean;
  searchQuery: string;
}

export default component$<SearchResultsProps>(
  ({ results, isLoading, searchQuery }) => {
    // Define consistent thumbnail dimensions
    const thumbWidth = 48;
    const thumbHeight = 48;

    if (isLoading) {
      return (
        <div
          class="flex justify-center py-8"
          aria-live="polite"
          aria-busy="true"
        >
          <span class="loading loading-ring loading-lg text-primary"></span>
        </div>
      );
    }

    if (results.length > 0) {
      return (
        <div class="mt-4">
          <div class="bg-base-100 rounded-box overflow-hidden shadow-md">
            <div class="border-base-200 border-b p-4 pb-2 text-sm opacity-75">
              {results.length} {results.length > 1 ? "résultats" : "résultat"}{" "}
              trouvé{results.length > 1 ? "s" : ""}
            </div>
            <ul
              class="divide-base-200 divide-y"
              aria-label="Liste des résultats de recherche"
            >
              {results.map((article) => (
                <li
                  key={article.slug}
                  class="hover:bg-base-200 transition-colors"
                >
                  <Link
                    href={`/articles/${article.slug}`}
                    class="flex items-center gap-4 p-4 no-underline hover:no-underline"
                    prefetch={true}
                  >
                    {/* Thumbnail image with proper dimensions */}
                    {article.image && (
                      <div class="flex-shrink-0">
                        <img
                          class="size-12 rounded-lg object-cover"
                          src={article.image}
                          alt={`Miniature pour ${article.title}`}
                          width={thumbWidth}
                          height={thumbHeight}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    )}

                    {/* Text content */}
                    <div class="min-w-0 flex-1">
                      <h3 class="truncate text-base font-medium">
                        {article.title}
                      </h3>
                      <div class="mt-1 flex items-center gap-3">
                        {/* Formatted date */}
                        <time
                          dateTime={article.date}
                          class="text-base-content/60 text-xs"
                        >
                          {new Date(article.date).toLocaleDateString()}
                        </time>

                        {/* Tags */}
                        {article.tags?.length > 0 && (
                          <span class="text-primary truncate text-xs font-medium">
                            {article.tags.slice(0, 2).join(" • ")}
                            {article.tags.length > 2 ? "..." : ""}
                          </span>
                        )}
                      </div>

                      {/* Description (if available) */}
                      {article.description && (
                        <p class="text-base-content/70 mt-2 line-clamp-2 text-sm">
                          {article.description}
                        </p>
                      )}
                    </div>

                    {/* Chevron icon */}
                    <div class="text-base-content/50 hover:text-primary flex-shrink-0 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    if (searchQuery.length >= 2) {
      return (
        <div class="py-8 text-center" aria-live="polite">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-base-content/40 mx-auto mb-3"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <p class="text-base-content/70">
            Aucun résultat pour "
            <span class="text-base-content font-medium">{searchQuery}</span>"
          </p>
        </div>
      );
    }

    return null;
  },
);
