'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { TestimonialCard } from '@/components/TestimonialCard';
import { CTASection } from '@/components/CTASection';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const whyCards = [
  {
    title: 'Ex-Google DNA',
    description:
      'Work alongside people who built campaigns for Google’s largest advertisers. The bar is high, and so is the learning curve.',
  },
  {
    title: 'Proprietary Technology',
    description:
      'We don’t just use tools. We build them. Wayfinder AI and our Feed Optimization Platform are built in-house.',
  },
  {
    title: 'Real Impact',
    description:
      'Work with brands like AG1, Anastasia Beverly Hills, and PE-backed portfolio companies. Your work directly drives measurable growth.',
  },
  {
    title: 'Growth Trajectory',
    description:
      'Inc. 5000 #123 with 2,954% revenue growth. We grew from 3 to 24 people in 4 years. There’s room to grow with us.',
  },
];

const howWeWork = [
  {
    number: '01',
    title: 'Performance First',
    description: 'Clear outcomes. No vanity metrics.',
  },
  {
    number: '02',
    title: 'True Partnership',
    description: 'We embed with clients. You’ll have real ownership.',
  },
  {
    number: '03',
    title: 'Tech-Enabled',
    description: 'Automation frees you for strategy, not busywork.',
  },
  {
    number: '04',
    title: 'Built to Scale',
    description: 'Pod-based teams. Playbooks that work. Room to lead.',
  },
];

const openRoles = [
  {
    title: 'Senior Media Buyer',
    location: 'Los Angeles / Remote',
    department: 'Media Buying',
  },
  {
    title: 'Performance Creative Strategist',
    location: 'New York / Remote',
    department: 'Creative',
  },
  {
    title: 'Analytics Engineer',
    location: 'Chicago / Remote',
    department: 'Analytics',
  },
  {
    title: 'Account Director',
    location: 'Los Angeles / Remote',
    department: 'Client Services',
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function CareersPage() {
  return (
    <main>
      {/* ── Section 1: Hero ── */}
      <section className="relative min-h-[50vh] flex items-center px-6 overflow-hidden" style={{
        background: `
          radial-gradient(ellipse 60% 50% at 50% 30%, rgba(232, 121, 58, 0.05) 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 30% 60%, rgba(91, 164, 164, 0.04) 0%, transparent 55%),
          #0A1119
        `,
      }}>
        {/* MJ careers-bokeh background */}
        <div className="pointer-events-none absolute inset-0 z-[0]" aria-hidden="true" style={{
          backgroundImage: 'url(/images/careers-bokeh.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
        }} />
        <div className="relative z-10 mx-auto max-w-7xl w-full py-24">
          <p className="text-tt-teal uppercase tracking-[4px] text-sm font-semibold mb-6">
            CAREERS
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-tt-white leading-tight max-w-4xl">
            Build the Future of Performance Marketing
          </h1>
          <p className="mt-8 text-xl text-tt-gray-400 max-w-3xl leading-relaxed">
            Join a team of ex-Google leaders and specialists building proprietary
            AI technology for the world&rsquo;s most ambitious brands.
          </p>
          <p className="text-tt-teal font-medium mt-4">
            Los Angeles &middot; Chicago &middot; New York
          </p>
        </div>
      </section>

      {/* ── Section 2: Why Tiger Tracks ── */}
      <section className="bg-tt-white py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-tt-gray-900 text-center mb-14">
            Why Tiger Tracks
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {whyCards.map((card) => (
              <div
                key={card.title}
                className="bg-tt-gray-50 rounded-2xl p-8"
              >
                <h3 className="text-xl font-bold text-tt-gray-900">
                  {card.title}
                </h3>
                <p className="mt-3 text-tt-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: How We Work ── */}
      <section className="bg-tt-gray-50 py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-tt-gray-900 text-center mb-14">
            How We Work
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {howWeWork.map((item) => (
              <div key={item.number} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-tt-teal flex items-center justify-center text-tt-black font-bold text-sm">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-semibold text-tt-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-tt-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: The Team ── */}
      <section className="bg-tt-white py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-tt-gray-900 text-center mb-12">
            The Team
          </h2>

          {/* Stats row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mb-14">
            <AnimatedCounter value="24" label="Team Members" />
            <AnimatedCounter value="3" label="Offices" />
            <AnimatedCounter value="100x" label="MRR Growth" />
          </div>

          {/* Team photo placeholder */}
          <div className="bg-tt-gray-100 rounded-2xl aspect-[21/9] flex items-center justify-center max-w-5xl mx-auto mb-14">
            <p className="text-tt-gray-400 text-lg">Team photos coming soon</p>
          </div>

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto">
            <TestimonialCard
              quote="The Tiger Tracks team has been a true partner in our company's growth. They're collaborative, nimble, and thoughtful, really acting as an extension of our own team."
              name="Connor Kreutz"
              title="Founder"
              company="Honeydew"
              featured={false}
            />
          </div>
        </div>
      </section>

      {/* ── Section 5: Open Roles ── */}
      <section id="open-roles" className="bg-tt-gray-50 py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-tt-gray-900 text-center">
            Open Positions
          </h2>
          <p className="mt-4 text-lg text-tt-gray-600 text-center max-w-2xl mx-auto mb-14">
            We&rsquo;re always looking for exceptional people. If you don&rsquo;t
            see a role that fits, reach out anyway.
          </p>

          <div className="max-w-4xl mx-auto space-y-4">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="bg-tt-white rounded-xl p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold text-tt-gray-900">
                    {role.title}
                  </h3>
                  <p className="text-sm text-tt-gray-500 mt-1">
                    {role.location}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-tt-teal/10 text-tt-teal-dark rounded-full px-3 py-1 text-xs font-medium">
                    {role.department}
                  </span>
                  <Link
                    href="#"
                    className="text-tt-teal font-semibold text-sm hover:text-tt-teal-dark transition whitespace-nowrap"
                  >
                    Apply &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="#"
              className="text-tt-teal font-semibold hover:text-tt-teal-dark transition"
            >
              View all positions on our careers portal &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 6: CTA ── */}
      <CTASection
        headline="Ready to Make an Impact?"
        subheadline="Send us your resume and tell us what drives you."
        primaryCTA={{ text: 'View Open Roles', href: '#open-roles' }}
        dark
      />
    </main>
  );
}
