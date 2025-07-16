import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <footer class="footer p-10 bg-base-200 text-base-content">
      <div class="w-full max-w-6xl mx-auto">
        {/* Conteneur principal flex en colonne pour mobile, ligne pour desktop */}
        <div class="flex flex-col md:flex-row gap-8 justify-between items-center">

          {/* Section Logo - Centrée et responsive */}
          <div class="flex-1 flex justify-center md:justify-start">
            <a href="/" class="text-3xl font-bold">
              <span class="text-primary">Proacti</span>
              <span class="text-base-content">Tech</span>
            </a>
          </div>

          {/* Section Contact - Alignée à droite */}
          <div class="flex-1 flex justify-center md:justify-end">
            <a
              href="mailto:info@proactitech.com"
              class="btn btn-ghost text-lg hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              info@proactitech.com
            </a>
          </div>
        </div>

        {/* Séparateur avec marge contrôlée */}
        <div class="divider my-6 mx-auto w-3/4"></div>

        {/* Copyright centré */}
        <div class="text-center text-sm opacity-75">
          © {new Date().getFullYear()} ProactiTech - Tous droits réservés
        </div>
      </div>
    </footer>
  );
});
