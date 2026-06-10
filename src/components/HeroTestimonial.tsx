'use client';

import { motion } from 'framer-motion';

export function HeroTestimonial() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
      className="mx-auto max-w-3xl mt-12"
    >
      <div
        className="flex flex-col md:flex-row items-center gap-6 rounded-2xl backdrop-blur-xl border border-white/10 p-6"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        {/* AG1 Brand Badge */}
        <div
          className="shrink-0 w-20 h-20 rounded-full flex items-center justify-center border border-white/20"
          style={{
            backgroundColor: '#0F4132',
            boxShadow: '0 0 30px rgba(15, 65, 50, 0.4)',
          }}
        >
          <span className="text-white text-xl font-bold tracking-wider">AG1</span>
        </div>

        {/* Quote + Attribution */}
        <div className="text-center md:text-left">
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              color: '#9E9E9E',
            }}
          >
            &ldquo;Partnering with Tiger Tracks has been amazing. They work fast, execute
            flawlessly and apply specialized knowledge of ad platforms with a relentless
            focus on hitting growth goals.&rdquo;
          </p>
          <p className="mt-3 text-xs font-semibold text-white uppercase tracking-wide">
            Jason Marshall, Chief Growth Officer, AG1
          </p>
        </div>
      </div>
    </motion.div>
  );
}
