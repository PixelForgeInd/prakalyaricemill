import { createFileRoute } from '@tanstack/react-router';
import { GrainScreen } from '@/components/grain/screen';
export const Route = createFileRoute('/journal')({
 head: () => ({ meta: [{ title: 'The Culinary Journal | Praklaya Modern Rice Mill' }, { name: 'description', content: 'The Culinary Journal at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:title', content: 'The Culinary Journal | Praklaya Modern Rice Mill' }, { property: 'og:description', content: 'The Culinary Journal at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: () => <GrainScreen screen={10} />,
});
