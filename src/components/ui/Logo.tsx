import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'dark' | 'light' | 'gold';
}

export function Logo({ className = 'w-9 h-9', size = 36, variant = 'dark' }: LogoProps) {
  // Primary and accent colors based on theme
  const primaryStroke = variant === 'light' ? '#F7F6F2' : '#141414';
  const goldAccent = '#C5A880';
  const goldLight = '#DFCAA7';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AUREVANT GROUP Logo"
    >
      {/* Outer Geometric Diamond / Architectural Crest */}
      <polygon
        points="50,6 92,50 50,94 8,50"
        stroke={goldAccent}
        strokeWidth="3.5"
        strokeLinejoin="miter"
        fill="none"
      />
      
      {/* Inner Precision Structural Diamond */}
      <polygon
        points="50,14 84,50 50,86 16,50"
        stroke={primaryStroke}
        strokeWidth="1.5"
        strokeOpacity="0.4"
        fill="none"
      />

      {/* Modern Architectural Monogram "A" */}
      {/* Left Apex Strut */}
      <path
        d="M50 20 L28 76"
        stroke={primaryStroke}
        strokeWidth="5"
        strokeLinecap="square"
      />

      {/* Right Apex Strut */}
      <path
        d="M50 20 L72 76"
        stroke={goldAccent}
        strokeWidth="5"
        strokeLinecap="square"
      />

      {/* Transverse Crossbeam (Horizontal Gold Bar) */}
      <line
        x1="36"
        y1="56"
        x2="64"
        y2="56"
        stroke={goldLight}
        strokeWidth="3.5"
      />

      {/* Central Spire Pinnacle Dot */}
      <circle cx="50" cy="38" r="3" fill={goldAccent} />

      {/* Bottom Foundation Keystone */}
      <line
        x1="44"
        y1="82"
        x2="56"
        y2="82"
        stroke={goldAccent}
        strokeWidth="2"
      />
    </svg>
  );
}
