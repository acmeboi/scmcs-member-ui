import React from 'react';
import { useToken } from '@/hooks/useToken';

export const SidebarIllustration: React.FC = () => {
  const token = useToken();

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.08,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Subtle geometric patterns */}
      <circle cx="50" cy="100" r="40" fill={token.colorPrimary} opacity="0.3" />
      <circle cx="250" cy="200" r="50" fill={token.colorPrimary} opacity="0.3" />
      <circle cx="80" cy="400" r="35" fill={token.colorPrimary} opacity="0.3" />
      <circle cx="220" cy="500" r="45" fill={token.colorPrimary} opacity="0.3" />
      <circle cx="60" cy="650" r="40" fill={token.colorPrimary} opacity="0.3" />
      <circle cx="240" cy="700" r="30" fill={token.colorPrimary} opacity="0.3" />
      
      {/* Flowing lines */}
      <path
        d="M 50 100 Q 150 150, 250 200"
        stroke={token.colorPrimary}
        strokeWidth="2"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M 80 400 Q 150 450, 220 500"
        stroke={token.colorPrimary}
        strokeWidth="2"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M 60 650 Q 150 675, 240 700"
        stroke={token.colorPrimary}
        strokeWidth="2"
        fill="none"
        opacity="0.2"
      />
      
      {/* Small accent dots */}
      <circle cx="150" cy="300" r="3" fill={token.colorPrimary} opacity="0.25" />
      <circle cx="100" cy="550" r="3" fill={token.colorPrimary} opacity="0.25" />
      <circle cx="200" cy="600" r="3" fill={token.colorPrimary} opacity="0.25" />
    </svg>
  );
};

