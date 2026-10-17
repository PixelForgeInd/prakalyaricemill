import { createFileRoute } from '@tanstack/react-router';
import { GrainScreen } from '@/components/grain/screen';
export const Route = createFileRoute('/not-found')({
 head: () => ({ meta: [{ title: 'A Path Less Traveled | Praklaya Modern Rice Mill' }, { name: 'description', content: 'A Path Less Traveled at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:title', content: 'A Path Less Traveled | Praklaya Modern Rice Mill' }, { property: 'og:description', content: 'A Path Less Traveled at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: () => <GrainScreen screen={13} />,
});
