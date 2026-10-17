import { createFileRoute } from '@tanstack/react-router';
import { GrainScreen } from '@/components/grain/screen';
export const Route = createFileRoute('/contact')({
 head: () => ({ meta: [{ title: 'Cultivating Global Partnerships | Praklaya Modern Rice Mill' }, { name: 'description', content: 'Cultivating Global Partnerships at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:title', content: 'Cultivating Global Partnerships | Praklaya Modern Rice Mill' }, { property: 'og:description', content: 'Cultivating Global Partnerships at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: () => <GrainScreen screen={9} />,
});
