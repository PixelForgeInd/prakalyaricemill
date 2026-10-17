import { createFileRoute } from '@tanstack/react-router';
import { GrainScreen } from '@/components/grain/screen';
export const Route = createFileRoute('/export')({
 head: () => ({ meta: [{ title: 'Global Partnerships at Scale | Praklaya Modern Rice Mill' }, { name: 'description', content: 'Global Partnerships at Scale at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:title', content: 'Global Partnerships at Scale | Praklaya Modern Rice Mill' }, { property: 'og:description', content: 'Global Partnerships at Scale at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: () => <GrainScreen screen={11} />,
});
