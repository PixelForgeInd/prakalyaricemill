import { createFileRoute } from '@tanstack/react-router';
import { GrainScreen } from '@/components/grain/screen';
export const Route = createFileRoute('/terms')({
 head: () => ({ meta: [{ title: 'Terms of Global Engagement | Praklaya Modern Rice Mill' }, { name: 'description', content: 'Terms of Global Engagement at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:title', content: 'Terms of Global Engagement | Praklaya Modern Rice Mill' }, { property: 'og:description', content: 'Terms of Global Engagement at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: () => <GrainScreen screen={6} />,
});
