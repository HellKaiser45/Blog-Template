import { component$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

interface SearchBarProps {
  searchQuery: string;
}

export default component$<SearchBarProps>(({ searchQuery }) => {
  const location = useLocation();
  const nav = useNavigate();

  return (
    <div class="mx-auto mb-12 max-w-2xl">
      <label class="input input-bordered flex items-center gap-2">
        <svg
          class="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          class="grow"
          onInput$={(_, target) => {
            const params = new URLSearchParams(location.url.search);
            if (target.value) {
              params.set("search", target.value);
            } else {
              params.delete("search");
            }
            nav(`?${params.toString()}`, { replaceState: true });
          }}
          placeholder="Rechercher des articles..."
          value={searchQuery}
        />
        <kbd class="kbd kbd-sm hidden md:flex">⌘</kbd>
        <kbd class="kbd kbd-sm hidden md:flex">K</kbd>
      </label>
    </div>
  );
});
