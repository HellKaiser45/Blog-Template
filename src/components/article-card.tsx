import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { type ArticleFrontmatter } from "~/utils/articleSchema";

export default component$(
  ({ frontmatter }: { frontmatter: ArticleFrontmatter }) => {
    // Default image dimensions (adjust to match your actual image aspect ratio)
    const imgWidth = 600;
    const imgHeight = 338; // 600 / 16:9 aspect ratio

    return (
      <article class="card bg-base-100 h-full shadow-lg transition-shadow duration-300 hover:shadow-xl">
        {/* Image with dimensions and proper alt text */}
        <figure class="aspect-video overflow-hidden">
          <img
            src={frontmatter.image || "/default-article-image.webp"}
            alt={
              frontmatter.image
                ? `Illustration for ${frontmatter.title}`
                : "Default article illustration"
            }
            width={imgWidth}
            height={imgHeight}
            class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div class="card-body p-6">
          {/* Tags with aria-label for accessibility */}
          {frontmatter.tags?.length > 0 && (
            <div class="mb-3 flex flex-wrap gap-2" aria-label="Article tags">
              {frontmatter.tags.slice(0, 3).map((tag) => (
                <span key={tag} class="badge badge-outline text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Heading with proper hierarchy */}
          <h2 class="card-title mb-2 line-clamp-2 text-xl">
            <Link
              href={`/articles/${frontmatter.slug}`}
              class="hover:text-primary focus-visible:outline-primary"
              aria-label={`Read article: ${frontmatter.title}`}
            >
              {frontmatter.title}
            </Link>
          </h2>

          {/* Description */}
          {frontmatter.description && (
            <p class="text-base-content/80 mb-4 line-clamp-3">
              {frontmatter.description}
            </p>
          )}

          {/* Metadata with semantic time element */}
          <div class="text-base-content/60 mt-auto flex items-center justify-between text-sm">
            <time dateTime={frontmatter.date}>
              {new Date(frontmatter.date).toLocaleDateString()}
            </time>
            {frontmatter.readingTime && (
              <span>{frontmatter.readingTime} min read</span>
            )}
          </div>

          {/* Button with proper contrast */}
          <div class="card-actions mt-4">
            <Link
              href={`/articles/${frontmatter.slug}`}
              class="btn btn-primary hover:bg-primary-focus focus-visible:bg-primary-focus w-full"
              prefetch={true}
            >
              Lire l'article
            </Link>
          </div>
        </div>
      </article>
    );
  },
);
