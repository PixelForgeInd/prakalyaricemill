import { createFileRoute } from '@tanstack/react-router';
import { GrainScreen } from '@/components/grain/screen';
export const Route = createFileRoute('/checkout')({
 head: () => ({ meta: [{ title: 'Secure Checkout | Praklaya Modern Rice Mill' }, { name: 'description', content: 'Secure Checkout at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:title', content: 'Secure Checkout | Praklaya Modern Rice Mill' }, { property: 'og:description', content: 'Secure Checkout at Praklaya Modern Rice Mill. Premium rice and precision global distribution.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: () => <GrainScreen screen={15} />,
});
