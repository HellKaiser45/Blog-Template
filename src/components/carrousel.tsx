import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { type ArticleFrontmatter } from "~/utils/articleSchema";

interface ArticleSliderProps {
  articles: ArticleFrontmatter[];
}

export default component$<ArticleSliderProps>(({ articles }) => {
  // Define consistent image dimensions for all slides
  const imgWidth = 800;
  const imgHeight = 450; // 16:9 aspect ratio

  return (
    <div
      class="carousel rounded-box w-full"
      role="region"
      aria-label="Featured articles carousel"
    >
      {articles.map((article, index) => (
        <div
          id={`slide${index}`}
          key={article.slug}
          class="carousel-item relative w-full"
          role="group"
          aria-label={`Slide ${index + 1} of ${articles.length}`}
        >
          {/* Slide Content */}
          <article class="bg-base-100 rounded-box flex w-full flex-col gap-6 p-6 shadow-lg md:flex-row">
            {/* Article Image (if exists) */}
            {article.image && (
              <div class="max-w-md flex-1">
                <img
                  src={article.image}
                  alt={`Featured image for ${article.title}`}
                  width={imgWidth}
                  height={imgHeight}
                  class="h-64 w-full rounded-lg object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}

            {/* Article Content */}
            <div class={`flex-1 ${article.image ? "max-w-2xl" : ""}`}>
              <div class="flex h-full flex-col justify-between">
                <div>
                  {article.tags?.length > 0 && (
                    <div
                      class="mb-4 flex flex-wrap gap-2"
                      aria-label="Article tags"
                    >
                      {article.tags.map((tag) => (
                        <span key={tag} class="badge badge-outline">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 class="mb-2 text-3xl font-bold">
                    <Link
                      href={`/articles/${article.slug}`}
                      class="hover:text-primary focus-visible:outline-primary"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  {article.description && (
                    <p class="mb-4 text-lg opacity-90">{article.description}</p>
                  )}
                  <div class="mb-4 flex items-center gap-2 text-sm opacity-75">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString()}
                    </time>
                    {article.readingTime && (
                      <>
                        <span aria-hidden="true">•</span>
                        <span>{article.readingTime} min read</span>
                      </>
                    )}
                  </div>
                </div>
                <Link
                  href={`/articles/${article.slug}`}
                  class="btn btn-primary hover:bg-primary-focus focus-visible:bg-primary-focus mt-4 self-start"
                  prefetch={true}
                >
                  Read Article
                </Link>
              </div>
            </div>
          </article>

          {/* Navigation Arrows */}
          <div class="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between">
            <Link
              href={`#slide${index - 1 < 0 ? articles.length - 1 : index - 1}`}
              class="btn btn-circle opacity-70 hover:opacity-100"
              aria-label="Previous slide"
            >
              ❮
            </Link>
            <Link
              href={`#slide${(index + 1) % articles.length}`}
              class="btn btn-circle opacity-70 hover:opacity-100"
              aria-label="Next slide"
            >
              ❯
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
});
