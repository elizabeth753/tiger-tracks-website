'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const adSpendOptions = [
  'Under $100k/mo',
  '$100k - $500k/mo',
  '$500k - $1M+/mo',
];

const auditAreas = [
  {
    number: '01',
    title: 'Paid Channels',
    description:
      'Deep dive into account structures, bidding strategies, and wasted spend across Meta, Google, TikTok, and CTV.',
    accent: '#E8793A',
  },
  {
    number: '02',
    title: 'Organic & Search',
    description:
      'Analysis of technical SEO, generative engine optimization (GEO), and your organic footprint against competitors.',
    accent: '#229FA1',
  },
  {
    number: '03',
    title: 'Creative & Conversion',
    description:
      'Review of ad creative win-rates, landing page friction, and full-funnel conversion rate optimization opportunities.',
    accent: '#E8793A',
  },
  {
    number: '04',
    title: 'Attribution & Data',
    description:
      'Evaluation of your measurement stack, pixel health, first-party data capture, and incrementality modeling.',
    accent: '#229FA1',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GetStartedPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    adSpend: '',
  });
  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { ref: auditRef, inView: auditInView } = useInView({ threshold: 0.1 });
  const { ref: stepsRef, inView: stepsInView } = useInView({ threshold: 0.1 });

  /* ── Calendly embed script ── */
  const calendlyRef = useRef<HTMLDivElement>(null);
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    if (!formData.firstName.trim()) errors.firstName = 'Required';
    if (!formData.email.trim()) {
      errors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email';
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
        setFormData({ firstName: '', lastName: '', email: '', adSpend: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <main className="min-h-screen text-white font-sans animated-mesh-bg pb-24 selection:bg-orange-500 selection:text-white">
      {/* ============================================================ */}
      {/*  ABOVE THE FOLD: SPLIT SCREEN                                */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 pt-32 lg:pt-40 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* ---- Left Column: Value Prop & Trust ---- */}
        <div className="space-y-8 pr-0 lg:pr-8">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.08]">
              Your Revenue Is Leaking.{' '}
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #E8793A, #FF9F6B)',
                }}
              >
                We&rsquo;ll Find Where.
              </span>
            </h1>
            <p
              className="text-xl leading-relaxed max-w-lg"
              style={{ color: '#9E9E9E' }}
            >
              A 90-day roadmap built around your actual numbers, across paid,
              organic, creative, and attribution. No commitment. No fluff.
              Just findings.
            </p>
          </div>

          {/* Fast Facts */}
          <div
            className="flex flex-wrap gap-4 text-sm font-medium py-6"
            style={{
              color: '#d1d1d8',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {[
              '7-10 days to complete',
              '$0 cost to you',
              '100% yours to keep',
              '5+ channels covered',
            ].map((fact) => (
              <span key={fact} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: '#E8793A' }}
                />
                {fact}
              </span>
            ))}
          </div>

          {/* Testimonial */}
          <div className="glass-panel p-6 rounded-xl mt-8">
            <p className="italic mb-4" style={{ color: '#d1d1d8' }}>
              &ldquo;Partnering with Tiger Tracks has been amazing. They work
              fast, execute flawlessly and apply specialized knowledge with a
              relentless focus on hitting growth goals.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: 'rgba(232, 121, 58, 0.15)',
                  color: '#E8793A',
                }}
              >
                AG1
              </div>
              <div>
                <p className="font-semibold text-sm text-white">
                  Jason Marshall
                </p>
                <p className="text-xs" style={{ color: '#7B7B8E' }}>
                  Chief Growth Officer, AG1
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Right Column: Form Card ---- */}
        <div className="glass-panel p-8 lg:p-10 rounded-2xl shadow-2xl relative lg:sticky lg:top-32">
          {formStatus === 'success' ? (
            <div className="text-center py-8">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(34,159,161,0.15)' }}
              >
                <svg
                  className="w-8 h-8"
                  style={{ color: '#229FA1' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p
                className="text-2xl font-bold mb-2"
                style={{ color: '#229FA1' }}
              >
                Thank you!
              </p>
              <p style={{ color: '#9E9E9E' }}>
                We&rsquo;ve received your request. A team member will be in
                touch within 1 business day.
              </p>
              <button
                type="button"
                onClick={() => setFormStatus('idle')}
                className="mt-6 text-sm underline transition"
                style={{ color: '#229FA1' }}
              >
                Submit another request
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-6">
                Request Your Diagnostic
              </h3>

              {formStatus === 'error' && (
                <div
                  className="rounded-lg p-4 text-sm mb-4"
                  style={{
                    backgroundColor: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    color: '#fca5a5',
                  }}
                >
                  Something went wrong. Please try again or email us directly.
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9E9E9E' }}>
                      First Name <span style={{ color: '#E8793A' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full rounded-lg p-3 text-white focus:outline-none transition-colors"
                      style={{
                        backgroundColor: 'rgba(10,17,25,0.5)',
                        border: fieldErrors.firstName
                          ? '1px solid rgba(239,68,68,0.5)'
                          : '1px solid rgba(255,255,255,0.08)',
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = '#E8793A')
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor =
                          'rgba(255,255,255,0.08)')
                      }
                      placeholder="Jane"
                    />
                    {fieldErrors.firstName && (
                      <p className="text-xs" style={{ color: '#f87171' }}>
                        {fieldErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9E9E9E' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full rounded-lg p-3 text-white focus:outline-none transition-colors"
                      style={{
                        backgroundColor: 'rgba(10,17,25,0.5)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = '#E8793A')
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor =
                          'rgba(255,255,255,0.08)')
                      }
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9E9E9E' }}>
                    Work Email <span style={{ color: '#E8793A' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg p-3 text-white focus:outline-none transition-colors"
                    style={{
                      backgroundColor: 'rgba(10,17,25,0.5)',
                      border: fieldErrors.email
                        ? '1px solid rgba(239,68,68,0.5)'
                        : '1px solid rgba(255,255,255,0.08)',
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = '#E8793A')
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor =
                        'rgba(255,255,255,0.08)')
                    }
                    placeholder="jane@company.com"
                  />
                  {fieldErrors.email && (
                    <p className="text-xs" style={{ color: '#f87171' }}>
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#9E9E9E' }}>
                    Monthly Media Spend
                  </label>
                  <select
                    name="adSpend"
                    value={formData.adSpend}
                    onChange={handleChange}
                    className="w-full rounded-lg p-3 text-white focus:outline-none transition-colors appearance-none"
                    style={{
                      backgroundColor: 'rgba(10,17,25,0.5)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <option value="">Select a range</option>
                    {adSpendOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full font-bold py-4 rounded-lg transition-all mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#E8793A', color: '#fff' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#D4662A')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#E8793A')
                  }
                >
                  {formStatus === 'submitting'
                    ? 'Submitting...'
                    : 'Start The Process'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-xs" style={{ color: '#7B7B8E' }}>
                  Or bypass the form and{' '}
                </span>
                <a
                  href="#calendly"
                  className="text-xs underline underline-offset-4 transition-colors"
                  style={{ color: '#E8793A' }}
                >
                  schedule directly here
                </a>
                .
              </div>
            </>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHAT WE AUDIT: 2x2 GRID                                     */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <h2 className="text-3xl font-bold mb-12 text-center">
          What We Audit
        </h2>
        <div
          ref={auditRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${
            auditInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {auditAreas.map((area) => (
            <div
              key={area.number}
              className="glass-panel p-8 rounded-xl transition-colors duration-300"
              style={{
                borderColor: 'rgba(255,255,255,0.05)',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = `${area.accent}40`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')
              }
            >
              <h4 className="text-xl font-semibold mb-3 flex items-center gap-3">
                <span style={{ color: area.accent }}>{area.number}</span>
                {area.title}
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#9E9E9E' }}
              >
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  THREE STEPS: HORIZONTAL TIMELINE                             */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 mt-32 text-center">
        <h2 className="text-3xl font-bold mb-16">How It Works</h2>
        <div
          ref={stepsRef}
          className={`flex flex-col md:flex-row justify-between items-start gap-8 relative transition-all duration-700 ${
            stepsInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px -z-10"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
          />

          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6"
              style={{
                backgroundColor: '#1B2126',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              1
            </div>
            <h4 className="text-lg font-semibold mb-2">Grant Access</h4>
            <p className="text-sm max-w-xs" style={{ color: '#9E9E9E' }}>
              You provide read-only access to your ad platforms and analytics.
            </p>
          </div>

          {/* Step 2 (highlighted) */}
          <div className="flex-1 flex flex-col items-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white mb-6"
              style={{
                backgroundColor: '#E8793A',
                border: '1px solid #E8793A',
                boxShadow: '0 0 15px rgba(232, 121, 58, 0.5)',
              }}
            >
              2
            </div>
            <h4 className="text-lg font-semibold mb-2">We Audit</h4>
            <p className="text-sm max-w-xs" style={{ color: '#9E9E9E' }}>
              Our ex-Google team and Wayfinder AI analyze the data for 7-10
              days.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6"
              style={{
                backgroundColor: '#1B2126',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              3
            </div>
            <h4 className="text-lg font-semibold mb-2">The Readout</h4>
            <p className="text-sm max-w-xs" style={{ color: '#9E9E9E' }}>
              We present a custom, actionable 90-day growth roadmap on a
              45-min call.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CALENDLY EMBED                                               */}
      {/* ============================================================ */}
      <section id="calendly" className="max-w-7xl mx-auto px-6 mt-32">
        <h2 className="text-3xl font-bold text-center mb-4">
          Or Schedule Directly
        </h2>
        <p
          className="text-center mb-10 max-w-2xl mx-auto"
          style={{ color: '#9E9E9E' }}
        >
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
      </section>
    </main>
  );
}
