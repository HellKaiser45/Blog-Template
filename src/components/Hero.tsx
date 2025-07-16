import { component$ } from '@builder.io/qwik';
import Image from '~/assets/logo-Proactitech.png?w=655;400;200&h=389;233;116&jsx';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
}

export default component$<HeroSectionProps>(({ title, description }) => (
  <div class="hero bg-base-200 py-12">
    <div class="hero-content flex-col lg:flex-row justify-evenly w-full max-w-7xl mx-auto gap-12">
      {/* Logo avec espacement contrôlé */}
      <div class="flex-1 max-w-md">
        <Image class="w-full h-auto object-contain" />
      </div>

      {/* Texte avec espacement amélioré */}
      <div class="flex-1 max-w-2xl space-y-6">
        <h1 class="text-5xl font-bold leading-tight">{title}</h1>
        <p class="text-xl leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
));
