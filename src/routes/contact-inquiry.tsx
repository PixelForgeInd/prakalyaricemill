import { createFileRoute } from '@tanstack/react-router';
import { GrainScreen } from '@/components/grain/screen';
export const Route = createFileRoute('/contact-inquiry')({
 head: () => ({ meta: [{ title: 'Trade Inquiry | Praklaya Modern Rice Mill' }, { name: 'description', content: 'Trade Inquiry at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:title', content: 'Trade Inquiry | Praklaya Modern Rice Mill' }, { property: 'og:description', content: 'Trade Inquiry at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: () => <GrainScreen screen={8} />,
});
