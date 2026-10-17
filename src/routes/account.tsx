import { createFileRoute } from '@tanstack/react-router';
import { GrainScreen } from '@/components/grain/screen';
export const Route = createFileRoute('/account')({
 head: () => ({ meta: [{ title: 'Your Account | Praklaya Modern Rice Mill' }, { name: 'description', content: 'Your Account at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:title', content: 'Your Account | Praklaya Modern Rice Mill' }, { property: 'og:description', content: 'Your Account at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: () => <GrainScreen screen={12} />,
});
