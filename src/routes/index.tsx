import { createFileRoute } from '@tanstack/react-router';
import { GrainScreen } from '@/components/grain/screen';
export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'Praklaya Modern Rice Mill | The Art of the Grain' }, { name: 'description', content: 'Premium heritage rice, generations of agricultural mastery, and precision global distribution.' }, { property: 'og:title', content: 'Praklaya Modern Rice Mill | The Art of the Grain' }, { property: 'og:description', content: 'Explore premium rice varieties and our seed-to-shore journey.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: () => <GrainScreen screen={4} />,
});
