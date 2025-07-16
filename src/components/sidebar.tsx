// src/components/layout/Sidebar.tsx
import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { type ArticleFrontmatter } from '~/utils/articleSchema';
import SearchBar from '~/components/search'

interface SidebarProps {
  recentArticles: ArticleFrontmatter[];
  tags: string[];
  searchQuery: string;
}

export default component$<SidebarProps>(({
  recentArticles,
  tags,
  searchQuery
}) => {

  const location = useLocation(); // Utilisation directe dans le composant
  return (
    <div class="lg:w-80 space-y-6">
      {/* Search Bar Card - Added to Sidebar */}
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h3 class="card-title">Rechercher</h3>
          <SearchBar searchQuery={searchQuery} />
        </div>
      </div>

      {/* Rest of the Sidebar remains unchanged */}
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h3 class="card-title">À propos</h3>
          <p>Proactitech propose des produits et services aux professionnels de l'industrie.</p>
          <Link href='https://proactitech.com' class="card-actions justify-end">
            <button class="btn btn-ghost btn-sm">En savoir plus</button>
          </Link>
        </div>
      </div>

      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h3 class="card-title">Articles récents</h3>
          <div class="space-y-4">
            {recentArticles.map((article) => (
              <div key={article.slug} class="hover:bg-base-200 p-2 rounded">
                <Link href={`/articles/${article.slug}`} class="link link-hover">
                  {article.title}
                </Link>
                <div class="text-sm text-gray-500">
                  {new Date(article.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h3 class="card-title">Tags</h3>
          <div class="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`${location.url.pathname}?search=${encodeURIComponent(tag)}`}
                class="badge badge-outline hover:badge-primary"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
