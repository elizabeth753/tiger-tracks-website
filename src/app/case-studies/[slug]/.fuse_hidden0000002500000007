import { notFound } from 'next/navigation';
import { caseStudies } from '@/data/caseStudies';
import { CaseStudyPageClient } from '@/components/CaseStudyPageClient';

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyPageClient caseStudy={caseStudy} />;
}
