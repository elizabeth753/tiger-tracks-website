'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { TestimonialCard } from '@/components/TestimonialCard';
import { CTASection } from '@/components/CTASection';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const auditAreas = [
  {
    title: 'Paid Channels',
    description:
      'Meta, Google, TikTok, Amazon. Budget allocation vs. opportunity. Bid strategy, audience overlap, creative fatigue. Wasted vs. underinvested spend.',
  },
  {
    title: 'Organic & Search',
    description:
      'SEO fundamentals, brand search share, GEO/AEO visibility, organic revenue contribution vs. paid reliance.',
  },
  {
    title: 'Creative & Conversion',
    description:
      'Testing cadence & volume, UGC vs. studio performance, landing page CVR vs. benchmarks, CRO above the fold.',
  },
  {
    title: 'Attribution & Unit Economics',
    description:
      'Pixel/event accuracy, attribution model vs. actual customer path, CAC by channel, LTV:CAC ratio and EBITDA-tied efficiency.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Grant Access',
    description:
      'Share view-only access to your ad platforms. Takes 2 minutes.',
    timeline: 'Day 1',
  },
  {
    number: '02',
    title: 'We Audit',
    description:
      'Full program audit: campaigns, creative, organic, tracking, unit economics.',
    timeline: 'Days 2–10',
  },
  {
    number: '03',
    title: 'We Walk You Through It',
    description:
      '60-minute walkthrough with findings and your personalized 90-day roadmap.',
    timeline: 'Day 14',
  },
];

const auditResults = [
  { client: 'Rho Nutrition', metric: '+78% Revenue' },
  { client: 'Monarch Money', metric: '+368% Users' },
  { client: 'Aura Health', metric: '-37% Cost per Trial' },
  { client: 'ABH', metric: '+22% Meta ROAS' },
];

const proofStats = [
  { value: '7–10 days', label: 'to complete' },
  { value: '$0', label: 'cost to you' },
  { value: '100%', label: 'yours to keep' },
  { value: '5+', label: 'channels covered' },
];

const adSpendOptions = [
  '$10K–$20K',
  '$20K–$50K',
  '$50K–$200K',
  '$200K–$500K',
  '$500K–$1M',
  '$1M+',
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function GetStartedPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    company: '',
    email: '',
    website: '',
    adSpend: '',
    hearAbout: '',
    anything: '',
  });
  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const calendlyRef = useRef<HTMLDivElement>(null);

  /* ── Calendly embed script ── */
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear field error on change
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required.';
    if (!formData.company.trim()) errors.company = 'Company name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus('submitting');
    const formspreeId =
      process.env.NEXT_PUBLIC_FORMSPREE_ID || 'YOUR_FORM_ID';

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({
          firstName: '',
          company: '',
          email: '',
          website: '',
          adSpend: '',
          hearAbout: '',
          anything: '',
        });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <main>
      {/* ── Section 1: Hero ── */}
      <section className="relative py-20 px-6 overflow-hidden" style={{
        background: `
          radial-gradient(ellipse 40% 50% at 20% 30%, rgba(232, 121, 58, 0.06) 0%, transparent 55%),
          #0A1119
        `,
      }}>
        {/* MJ getstarted-streaks background */}
        <div className="pointer-events-none absolute inset-0 z-[0]" aria-hidden="true" style={{
          backgroundImage: 'url(/images/getstarted-streaks.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
          opacity: 0.25,
        }} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-tt-white leading-tight max-w-4xl">
            Your Revenue Is Leaking. We&rsquo;ll Find Where.
          </h1>
          <p className="mt-8 text-xl text-tt-gray-400 max-w-3xl leading-relaxed">
            A 90-day roadmap built around your actual numbers, across
            paid, organic, creative, and attribution. No commitment. No fluff.
            Just findings.
          </p>
          <p className="text-sm text-tt-gray-500 mt-6">
            Founded by ex-Google &amp; in-house growth leaders &middot; Trusted
            by AG1, ABH &amp; 50+ brands &middot; Results in 7&ndash;10 days
          </p>
        </div>
      </section>

      {/* ── Section 2: Form + Social Proof ── */}
      <section className="bg-tt-white py-16 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-16">
          {/* Left column: Form */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-tt-gray-900 mb-8">
              Request a Strategic Diagnostic
            </h2>

            {formStatus === 'success' ? (
              <div className="bg-tt-teal/10 border border-tt-teal rounded-xl p-8 text-center">
                <p className="text-2xl font-bold text-tt-teal mb-2">
                  Thank you!
                </p>
                <p className="text-tt-gray-600">
                  We&rsquo;ve received your request. A team member will be in
                  touch within 1 business day.
                </p>
                <button
                  type="button"
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 text-sm text-tt-teal underline hover:text-tt-teal-dark transition"
                >
                  Submit another request
                </button>
              </div>
            ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {formStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                  Something went wrong. Please try again or email us directly.
                </div>
              )}

              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-tt-gray-700 mb-2"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tt-teal focus:border-transparent ${fieldErrors.firstName ? 'border-red-400' : 'border-tt-gray-200'}`}
                />
                {fieldErrors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.firstName}</p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-tt-gray-700 mb-2"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tt-teal focus:border-transparent ${fieldErrors.company ? 'border-red-400' : 'border-tt-gray-200'}`}
                />
                {fieldErrors.company && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.company}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-tt-gray-700 mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tt-teal focus:border-transparent ${fieldErrors.email ? 'border-red-400' : 'border-tt-gray-200'}`}
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                )}
              </div>

              {/* Website URL */}
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-tt-gray-700 mb-2"
                >
                  Website URL
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-tt-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tt-teal focus:border-transparent"
                />
              </div>

              {/* Monthly Ad Spend */}
              <div>
                <label
                  htmlFor="adSpend"
                  className="block text-sm font-medium text-tt-gray-700 mb-2"
                >
                  Monthly Ad Spend
                </label>
                <select
                  id="adSpend"
                  name="adSpend"
                  value={formData.adSpend}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-tt-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tt-teal focus:border-transparent bg-white"
                >
                  <option value="">Select a range</option>
                  {adSpendOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* How did you hear about us? */}
              <div>
                <label
                  htmlFor="hearAbout"
                  className="block text-sm font-medium text-tt-gray-700 mb-2"
                >
                  How did you hear about us?
                </label>
                <input
                  type="text"
                  id="hearAbout"
                  name="hearAbout"
                  value={formData.hearAbout}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-tt-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tt-teal focus:border-transparent"
                />
              </div>

              {/* Anything else? */}
              <div>
                <label
                  htmlFor="anything"
                  className="block text-sm font-medium text-tt-gray-700 mb-2"
                >
                  Anything else?
                </label>
                <textarea
                  id="anything"
                  name="anything"
                  rows={4}
                  value={formData.anything}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-tt-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tt-teal focus:border-transparent resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="bg-tt-orange hover:bg-tt-orange-dark disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full px-8 py-4 font-semibold w-full transition"
              >
                {formStatus === 'submitting'
                  ? 'Submitting...'
                  : 'Request a Strategic Diagnostic'}
              </button>
            </form>
            )}
          </div>

          {/* Right column: Social proof */}
          <div className="md:w-1/2 space-y-8">
            {/* Testimonial */}
            <TestimonialCard
              quote="Tiger Tracks delivers. They jumped in, diagnosed our issues fast, and built a plan that actually moved the needle. Not just smart, effective."
              name="Jason Marshall"
              title="VP of Growth"
              company="AG1"
              featured
            />

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              {proofStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-tt-gray-50 rounded-xl p-4 flex items-center gap-4"
                >
                  <span className="text-2xl font-bold text-tt-teal">
                    {stat.value}
                  </span>
                  <span className="text-sm text-tt-gray-600">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Calendly Embed ── */}
      <section className="bg-tt-gray-50 py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-tt-gray-900 text-center mb-4">
            Or Schedule Directly
          </h2>
          <p className="text-center text-tt-gray-500 mb-10 max-w-2xl mx-auto">
            Pick a time that works for you and we&rsquo;ll walk you through
            everything on a quick call.
          </p>
          <div
            ref={calendlyRef}
            className="calendly-inline-widget mx-auto max-w-4xl rounded-xl overflow-hidden"
            data-url={
              process.env.NEXT_PUBLIC_CALENDLY_URL ||
              'https://calendly.com/YOUR_CALENDLY_USER'
            }
            style={{ minWidth: '320px', minHeight: '650px' }}
          />
        </div>
      </section>

      {/* ── Section 3: What We Audit ── */}
      <section className="bg-tt-gray-50 py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-tt-gray-900 text-center mb-14">
            What We Audit
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {auditAreas.map((area) => (
              <div
                key={area.title}
                className="bg-tt-white rounded-xl p-8 border border-tt-gray-200"
              >
                <h3 className="text-xl font-bold text-tt-teal">
                  {area.title}
                </h3>
                <p className="mt-3 text-tt-gray-600 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: How It Works ── */}
      <section className="bg-tt-white py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-tt-gray-900 text-center mb-14">
            Three Steps to Your Growth Roadmap
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-tt-gray-50 rounded-2xl p-8 text-center"
              >
                <p className="text-5xl font-extrabold text-tt-teal">
                  {step.number}
                </p>
                <h3 className="text-xl font-bold text-tt-gray-900 mt-4">
                  {step.title}
                </h3>
                <p className="mt-3 text-tt-gray-600 leading-relaxed">
                  {step.description}
                </p>
                <p className="text-sm text-tt-gray-400 mt-4">{step.timeline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Audit Results Showcase ── */}
      <section className="bg-tt-gray-50 py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-tt-gray-900 text-center mb-14">
            What Our Audits Uncover
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {auditResults.map((result) => (
              <div
                key={result.client}
                className="bg-tt-white rounded-xl p-6 text-center"
              >
                <p className="text-sm text-tt-gray-500 uppercase tracking-wider">
                  {result.client}
                </p>
                <p className="text-3xl font-extrabold text-tt-teal mt-2">
                  {result.metric}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
