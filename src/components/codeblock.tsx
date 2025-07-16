// src/components/CodeBlock.tsx
import { component$ } from '@builder.io/qwik';

interface CodeBlockProps {
  code: string;
  lang?: string;
  highlightedCode?: string;
}

export default component$<CodeBlockProps>(({ highlightedCode, code }) => {
  return (
    <div class="mockup-code not-prose my-4">
      {highlightedCode
        ? <div dangerouslySetInnerHTML={highlightedCode} />
        : <pre><code>{code}</code></pre>
      }
    </div>
  );
});
