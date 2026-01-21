import { useToken } from '@/hooks/useToken';
import React from 'react';

interface SCMCSLogoProps {
  collapsed?: boolean;
}

export const SCMCSLogo: React.FC<SCMCSLogoProps> = ({ collapsed = false }) => {
  const token = useToken();

  if (collapsed) {
    // Compact icon-only version - "SC" monogram
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle with gradient */}
        <circle cx="20" cy="20" r="18" fill={token.colorPrimary} opacity="0.1" />
        
        {/* Stylized "SC" monogram */}
        {/* S - curved savings symbol */}
        <path
          d="M 12 14 Q 12 20, 16 20 Q 20 20, 20 26 Q 20 30, 16 30"
          stroke={token.colorPrimary}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* C - credit/coin symbol integrated */}
        <circle cx="28" cy="20" r="6" stroke={token.colorPrimary} strokeWidth="2.5" fill="none" />
        <circle cx="28" cy="20" r="3" fill={token.colorPrimary} opacity="0.3" />
      </svg>
    );
  }

  // Full logo with "SC" monogram and text
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circles with gradient effect */}
        <circle cx="28" cy="28" r="26" fill={token.colorPrimary} opacity="0.1" />
        <circle cx="28" cy="28" r="22" fill={token.colorPrimary} opacity="0.05" />
        
        {/* Stylized "SC" monogram - Savings & Credit */}
        {/* S - Savings symbol (curved, flowing) */}
        <path
          d="M 14 18 Q 14 24, 18 24 Q 22 24, 22 30 Q 22 36, 18 36 Q 14 36, 14 38"
          stroke={token.colorPrimary}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* C - Credit/Coin symbol (integrated circle) */}
        <circle cx="36" cy="28" r="8" stroke={token.colorPrimary} strokeWidth="3.5" fill="none" />
        <circle cx="36" cy="28" r="4.5" fill={token.colorPrimary} opacity="0.2" />
        
        {/* Connecting line between S and C (represents connection) */}
        <path
          d="M 22 28 L 28 28"
          stroke={token.colorPrimary}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
        />
        
        {/* Small accent dots */}
        <circle cx="12" cy="16" r="1.5" fill={token.colorPrimary} opacity="0.5" />
        <circle cx="42" cy="20" r="1.5" fill={token.colorPrimary} opacity="0.5" />
        <circle cx="42" cy="36" r="1.5" fill={token.colorPrimary} opacity="0.5" />
      </svg>
      
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: token.colorText,
            letterSpacing: '-0.3px',
            lineHeight: 1.2,
          }}
        >
          SCMCS
        </span>
      </div>
    </div>
  );
};

