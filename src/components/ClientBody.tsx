'use client';

import { LenisProvider } from '@/components/LenisProvider';
import { CustomCursor } from '@/components/CustomCursor';

export function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      {children}
      <CustomCursor />
    </LenisProvider>
  );
}
