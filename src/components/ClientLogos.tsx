'use client';

export function AG1Logo() {
  return (
    <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto" role="img" aria-label="AG1 logo">
      <text
        x="60"
        y="28"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="system-ui, sans-serif"
        fontSize="28"
        fontWeight="900"
        letterSpacing="4"
      >
        AG1
      </text>
    </svg>
  );
}

export function AnastasiaLogo() {
  return (
    <svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto" role="img" aria-label="Anastasia Beverly Hills logo">
      <text
        x="100"
        y="16"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, serif"
        fontSize="13"
        fontWeight="400"
        letterSpacing="3"
        style={{ textTransform: 'uppercase' }}
      >
        ANASTASIA
      </text>
      <text
        x="100"
        y="32"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, serif"
        fontSize="10"
        fontWeight="400"
        letterSpacing="5"
      >
        BEVERLY HILLS
      </text>
    </svg>
  );
}

export function ATTLogo() {
  return (
    <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto" role="img" aria-label="AT&amp;T logo">
      <text
        x="60"
        y="29"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="system-ui, sans-serif"
        fontSize="24"
        fontWeight="700"
        letterSpacing="1"
      >
        AT&amp;T
      </text>
    </svg>
  );
}

export function VerizonLogo() {
  return (
    <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto" role="img" aria-label="Verizon logo">
      <text
        x="60"
        y="28"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="system-ui, sans-serif"
        fontSize="22"
        fontWeight="400"
        letterSpacing="1"
      >
        verizon
      </text>
    </svg>
  );
}

export function UnderArmourLogo() {
  return (
    <svg viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto" role="img" aria-label="Under Armour logo">
      <text
        x="80"
        y="17"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="system-ui, sans-serif"
        fontSize="14"
        fontWeight="800"
        letterSpacing="3"
      >
        UNDER
      </text>
      <text
        x="80"
        y="34"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="system-ui, sans-serif"
        fontSize="14"
        fontWeight="800"
        letterSpacing="3"
      >
        ARMOUR
      </text>
    </svg>
  );
}

export function SnapchatLogo() {
  return (
    <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto" role="img" aria-label="Snapchat logo">
      <text
        x="60"
        y="28"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="system-ui, sans-serif"
        fontSize="20"
        fontWeight="600"
        fontStyle="italic"
        letterSpacing="0"
      >
        Snapchat
      </text>
    </svg>
  );
}

export function MonarchMoneyLogo() {
  return (
    <svg viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto" role="img" aria-label="Monarch Money logo">
      <text
        x="80"
        y="28"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, serif"
        fontSize="18"
        fontWeight="500"
        letterSpacing="1"
      >
        Monarch Money
      </text>
    </svg>
  );
}

export function RhoNutritionLogo() {
  return (
    <svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto" role="img" aria-label="Rho Nutrition logo">
      <text
        x="70"
        y="27"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="system-ui, sans-serif"
        fontSize="24"
        fontWeight="300"
        letterSpacing="6"
      >
        RHO
      </text>
      <text
        x="70"
        y="38"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="system-ui, sans-serif"
        fontSize="7"
        fontWeight="500"
        letterSpacing="4"
      >
        NUTRITION
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Additional current-client wordmarks                                */
/* ------------------------------------------------------------------ */

function Wordmark({
  label,
  text,
  fontFamily = 'system-ui, sans-serif',
  fontWeight = 700,
  fontSize = 20,
  letterSpacing = 1,
  width = 150,
}: {
  label: string;
  text: string;
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: number;
  letterSpacing?: number;
  width?: number;
}) {
  return (
    <svg viewBox={`0 0 ${width} 40`} xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto" role="img" aria-label={`${label} logo`}>
      <text
        x={width / 2}
        y="27"
        textAnchor="middle"
        fill="currentColor"
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
        letterSpacing={letterSpacing}
      >
        {text}
      </text>
    </svg>
  );
}

export const AuraHealthLogo = () => <Wordmark label="Aura Health" text="aura" fontWeight={500} fontSize={24} letterSpacing={2} width={120} />;
export const LightyearLogo = () => <Wordmark label="Lightyear" text="Lightyear" fontWeight={600} fontSize={20} width={150} />;
export const CapezioLogo = () => <Wordmark label="Capezio" text="CAPEZIO" fontFamily="Georgia, serif" fontWeight={400} fontSize={18} letterSpacing={3} width={150} />;
export const DovetailLogo = () => <Wordmark label="Dovetail Furniture" text="Dovetail" fontFamily="Georgia, serif" fontWeight={500} fontSize={20} letterSpacing={1} width={150} />;

/* ------------------------------------------------------------------ */
/*  Logo groups                                                        */
/*  IMPORTANT: keep these two lists separate. Google-era brands are    */
/*  founder experience from their time at Google - NOT Tiger Tracks    */
/*  clients - and must never appear under a "client" label.            */
/* ------------------------------------------------------------------ */

// Current Tiger Tracks clients (each has a case study or testimonial).
export const clientLogos = [
  { key: 'ag1', Component: AG1Logo },
  { key: 'anastasia', Component: AnastasiaLogo },
  { key: 'monarchmoney', Component: MonarchMoneyLogo },
  { key: 'rhonutrition', Component: RhoNutritionLogo },
  { key: 'aura', Component: AuraHealthLogo },
  { key: 'lightyear', Component: LightyearLogo },
  { key: 'capezio', Component: CapezioLogo },
  { key: 'dovetail', Component: DovetailLogo },
] as const;

// Brands the founders built while at Google (founder experience, NOT TT clients).
export const googleEraLogos = [
  { key: 'att', Component: ATTLogo },
  { key: 'verizon', Component: VerizonLogo },
  { key: 'underarmour', Component: UnderArmourLogo },
  { key: 'snapchat', Component: SnapchatLogo },
] as const;
