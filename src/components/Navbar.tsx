'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '@/components/MagneticButton';

/* ------------------------------------------------------------------ */
/*  Mega-menu data                                                     */
/* ------------------------------------------------------------------ */

interface MegaMenuItem {
  label: string;
  href: string;
  description: string;
}

interface MegaMenuConfig {
  items: MegaMenuItem[];
  feature: {
    title: string;
    description: string;
    href: string;
    image: string;
  };
}

const megaMenus: Record<string, MegaMenuConfig> = {
  Capabilities: {
    items: [
      {
        label: 'Paid Media',
        href: '/capabilities#paid-media',
        description: 'Google, Meta, TikTok, and CTV at scale',
      },
      {
        label: 'Organic & SEO',
        href: '/capabilities#organic',
        description: 'Technical SEO and generative engine optimization',
      },
      {
        label: 'Creative Strategy',
        href: '/capabilities#creative',
        description: 'Performance creative that converts',
      },
      {
        label: 'Analytics & Attribution',
        href: '/capabilities#analytics',
        description: 'Measurement stack and incrementality modeling',
      },
      {
        label: 'CRO & Landing Pages',
        href: '/capabilities#cro',
        description: 'Conversion rate optimization at every stage',
      },
    ],
    feature: {
      title: 'Explore Wayfinder AI',
      description:
        'Our proprietary engine that finds and fixes revenue leaks across your entire funnel.',
      href: '/wayfinder',
      image: '/images/nav-feature.png',
    },
  },
  'AI Tools': {
    items: [
      {
        label: 'Wayfinder Platform',
        href: '/ai-tools#wayfinder',
        description: 'Unified AI command center for media buying',
      },
      {
        label: 'Budget Allocator',
        href: '/ai-tools#budget',
        description: 'ML-driven spend optimization across channels',
      },
      {
        label: 'Creative Analyzer',
        href: '/ai-tools#creative',
        description: 'Computer vision scoring for ad creative',
      },
      {
        label: 'Anomaly Detection',
        href: '/ai-tools#anomaly',
        description: 'Real-time alerts on spend and performance shifts',
      },
    ],
    feature: {
      title: 'See AI Tools in Action',
      description:
        'Watch how Tiger Tracks AI surfaces insights human analysts miss.',
      href: '/ai-tools',
      image: '/images/nav-feature.png',
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Nav links                                                          */
/* ------------------------------------------------------------------ */

const navLinks = [
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Results', href: '/results' },
  { label: 'AI Tools', href: '/ai-tools' },
  { label: 'PE & VC Partners', href: '/pe-vc' },
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'Company', href: '/company' },
];

/* ------------------------------------------------------------------ */
/*  Desktop dropdown animation variants                                */
/* ------------------------------------------------------------------ */

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: { duration: 0.15, ease: 'easeIn' as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Mobile accordion sub-component                                     */
/* ------------------------------------------------------------------ */

function MobileAccordion({
  label,
  href,
  items,
  isOpen,
  onToggle,
  onNavigate,
  index,
  menuOpen,
}: {
  label: string;
  href: string;
  items: MegaMenuItem[];
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  index: number;
  menuOpen: boolean;
}) {
  return (
    <div
      className="border-b border-white/5"
      style={{ transitionDelay: menuOpen ? `${index * 50}ms` : '0ms' }}
    >
      {/* Accordion trigger row */}
      <div className="flex items-center">
        <Link
          href={href}
          onClick={onNavigate}
          className="flex-1 text-lg text-tt-gray-300 transition-all duration-300 hover:text-white py-3"
        >
          {label}
        </Link>
        <button
          onClick={onToggle}
          className="p-2 -mr-2 text-[#7B7B8E] hover:text-white transition-colors"
          aria-label={`Expand ${label} sub-menu`}
        >
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </button>
      </div>

      {/* Accordion body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="accordion-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-3 space-y-0.5">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className="block rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-white/[0.04]"
                >
                  <span className="block text-sm font-medium text-white/80 transition-colors duration-200 hover:text-[#229FA1]">
                    {item.label}
                  </span>
                  <span className="block text-xs mt-0.5 text-[#5A5A6A]">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Navbar                                                        */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close mega on outside click */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setMobileAccordion(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Close mobile menu on ESC */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setActiveMega(null);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const openMega = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(label);
  }, []);

  const scheduleMegaClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMega(null), 200);
  }, []);

  const cancelMegaClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileAccordion(null);
  }, []);

  const megaData = activeMega ? megaMenus[activeMega] : null;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/50 backdrop-blur-md border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'bg-black/50 backdrop-blur-md border-b border-transparent'
      }`}
    >
      {/* Scroll-progress gradient indicator bar */}
      <div
        className="absolute bottom-0 left-0 h-px"
        style={{
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, #5BA4A4, #E8793A)',
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="group relative flex items-center z-[60]">
          <Image
            src="/images/TT.LOGO-02.png"
            alt="Tiger Tracks"
            width={160}
            height={100}
            priority
            className="h-9 w-auto md:h-11 object-contain transition-all duration-300 brightness-0 invert group-hover:opacity-80 group-hover:drop-shadow-[0_0_12px_rgba(91,164,164,0.4)]"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const hasMega = link.label in megaMenus;
            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => hasMega && openMega(link.label)}
                onMouseLeave={scheduleMegaClose}
              >
                <Link
                  href={link.href}
                  className="relative text-sm text-tt-gray-400 transition-colors duration-300 hover:text-white group flex items-center gap-1"
                >
                  {link.label}
                  {hasMega && (
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeMega === link.label ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-tt-teal to-tt-teal/50 transition-all duration-300 group-hover:w-full" />
                </Link>
              </div>
            );
          })}

          {/* Magnetic-pull CTA */}
          <MagneticButton
            as="a"
            href="/get-started"
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-tt-orange to-tt-orange-dark px-6 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-tt-orange/20 active:translate-y-0 inline-block"
            attractRadius={60}
            strength={0.3}
            textParallax={1.8}
          >
            Request a Strategic Diagnostic
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="relative flex flex-col gap-1.5 lg:hidden p-2 -m-2 z-[60]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? 'opacity-0 scale-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* ============================================================ */}
      {/*  DESKTOP MEGA-MENU DROPDOWN (hidden on < lg)                  */}
      {/* ============================================================ */}
      <AnimatePresence>
        {megaData && (
          <motion.div
            key={activeMega}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 right-0 top-full z-40 hidden lg:block"
            onMouseEnter={cancelMegaClose}
            onMouseLeave={scheduleMegaClose}
          >
            <div
              className="mx-auto max-w-7xl px-6 py-8"
              style={{
                background: 'rgba(10, 17, 25, 0.80)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
                borderRight: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <div className="grid grid-cols-5 gap-8">
                {/* Left: Nav links */}
                <div className="col-span-3 grid grid-cols-2 gap-x-8 gap-y-1">
                  {megaData.items.map((item, i) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setActiveMega(null)}
                      className="group rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-white/[0.04]"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.04,
                          duration: 0.3,
                          ease: 'easeOut',
                        }}
                      >
                        <span className="block text-sm font-medium text-white transition-colors duration-200 group-hover:text-[#229FA1]">
                          {item.label}
                        </span>
                        <span className="block text-xs mt-0.5 text-[#7B7B8E] transition-colors duration-200 group-hover:text-[#9E9E9E]">
                          {item.description}
                        </span>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Right: Featured promo card */}
                <div className="col-span-2">
                  <Link
                    href={megaData.feature.href}
                    onClick={() => setActiveMega(null)}
                    className="group block rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.04]"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      background: 'rgba(27, 33, 38, 0.6)',
                    }}
                  >
                    {/* Image placeholder */}
                    <div className="relative w-full h-32 rounded-lg overflow-hidden mb-4 bg-[#1B2126]">
                      <Image
                        src={megaData.feature.image}
                        alt={megaData.feature.title}
                        fill
                        className="object-cover opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                        sizes="400px"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1119]/80 to-transparent" />
                    </div>
                    <p className="text-sm font-semibold text-white mb-1 transition-colors duration-200 group-hover:text-[#229FA1]">
                      {megaData.feature.title}
                    </p>
                    <p className="text-xs text-[#7B7B8E] leading-relaxed">
                      {megaData.feature.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-[#229FA1] transition-all duration-200 group-hover:gap-2">
                      Learn more
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/*  MOBILE FULL-SCREEN OVERLAY                                   */}
      {/* ============================================================ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm lg:hidden z-[51]"
              onClick={closeMobile}
            />

            {/* Slide-out panel */}
            <motion.div
              key="mobile-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring' as const,
                damping: 30,
                stiffness: 300,
              }}
              className="fixed inset-y-0 right-0 w-full max-w-sm lg:hidden z-[52] overflow-y-auto overscroll-contain"
              style={{
                background: 'rgba(10, 17, 25, 0.97)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {/* Close zone / top padding */}
              <div className="h-20" />

              <div className="flex flex-col px-8 pb-12">
                {navLinks.map((link, i) => {
                  const megaConfig = megaMenus[link.label];

                  /* Links WITH accordion sub-menus */
                  if (megaConfig) {
                    return (
                      <MobileAccordion
                        key={link.href}
                        label={link.label}
                        href={link.href}
                        items={megaConfig.items}
                        isOpen={mobileAccordion === link.label}
                        onToggle={() =>
                          setMobileAccordion(
                            mobileAccordion === link.label
                              ? null
                              : link.label
                          )
                        }
                        onNavigate={closeMobile}
                        index={i}
                        menuOpen={mobileOpen}
                      />
                    );
                  }

                  /* Standard links */
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className="text-lg text-tt-gray-300 transition-all duration-300 hover:text-white hover:translate-x-2 py-3 border-b border-white/5"
                      style={{
                        transitionDelay: mobileOpen
                          ? `${i * 50}ms`
                          : '0ms',
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* CTA */}
                <Link
                  href="/get-started"
                  onClick={closeMobile}
                  className="mt-8 text-center rounded-full py-3.5 font-semibold text-white text-sm transition-all duration-300"
                  style={{
                    background:
                      'linear-gradient(135deg, #E8793A 0%, #D4662A 100%)',
                    boxShadow:
                      '0 0 20px rgba(232, 121, 58, 0.3), 0 4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  Request a Strategic Diagnostic
                </Link>

                {/* Contact shortcut */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <p className="text-xs uppercase tracking-wider text-[#5A5A6A] mb-3 font-medium">
                    Get in touch
                  </p>
                  <a
                    href="mailto:hello@tigertracks.ai"
                    className="text-sm text-[#229FA1] hover:text-white transition-colors"
                  >
                    hello@tigertracks.ai
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
