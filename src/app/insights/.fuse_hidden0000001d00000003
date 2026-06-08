import { fetchBlogPosts } from '@/lib/notion';
import { IntelligenceHubClient } from '@/components/IntelligenceHubClient';

export const revalidate = 3600;

export default async function IntelligencePage() {
  const posts = await fetchBlogPosts();

  return <IntelligenceHubClient posts={posts} />;
}
