import React from 'react';
import { useToken } from '@/hooks/useToken';

interface AuthIllustrationProps {
  variant?: 'login' | 'signup' | 'reset';
}

export const AuthIllustration: React.FC<AuthIllustrationProps> = ({ variant = 'login' }) => {
  const token = useToken();

  const illustrations = {
    login: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '140%',
          height: '140%',
          opacity: 0.2,
          pointerEvents: 'none',
        }}
      >
        {/* Large background circles */}
        <circle cx="200" cy="200" r="120" fill={token.colorPrimary} opacity="0.6" />
        <circle cx="1000" cy="150" r="100" fill={token.colorPrimary} opacity="0.6" />
        <circle cx="300" cy="650" r="150" fill={token.colorPrimary} opacity="0.6" />
        <circle cx="900" cy="700" r="110" fill={token.colorPrimary} opacity="0.6" />
        
        {/* Medium circles */}
        <circle cx="600" cy="100" r="60" fill={token.colorPrimary} opacity="0.5" />
        <circle cx="150" cy="500" r="70" fill={token.colorPrimary} opacity="0.5" />
        <circle cx="1050" cy="500" r="80" fill={token.colorPrimary} opacity="0.5" />
        
        {/* Flowing curves */}
        <path
          d="M 200 200 Q 400 300, 600 250 Q 800 200, 1000 150"
          stroke={token.colorPrimary}
          strokeWidth="3"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M 300 650 Q 500 500, 700 550 Q 900 600, 900 700"
          stroke={token.colorPrimary}
          strokeWidth="3"
          fill="none"
          opacity="0.4"
        />
        
        {/* Geometric shapes */}
        <rect x="500" y="300" width="120" height="120" rx="25" fill={token.colorPrimary} transform="rotate(45 560 360)" opacity="0.5" />
        <ellipse cx="600" cy="400" rx="100" ry="50" fill={token.colorPrimary} opacity="0.5" />
        
        {/* Small accent dots */}
        <circle cx="400" cy="350" r="8" fill={token.colorPrimary} opacity="0.6" />
        <circle cx="800" cy="450" r="8" fill={token.colorPrimary} opacity="0.6" />
        <circle cx="450" cy="550" r="8" fill={token.colorPrimary} opacity="0.6" />
        <circle cx="750" cy="300" r="8" fill={token.colorPrimary} opacity="0.6" />
      </svg>
    ),
    signup: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '140%',
          height: '140%',
          opacity: 0.2,
          pointerEvents: 'none',
        }}
      >
        {/* Hexagonal patterns */}
        <polygon points="150,150 250,100 350,150 350,250 250,300 150,250" fill={token.colorPrimary} opacity="0.55" />
        <polygon points="850,200 950,150 1050,200 1050,300 950,350 850,300" fill={token.colorPrimary} opacity="0.55" />
        <polygon points="200,550 300,500 400,550 400,650 300,700 200,650" fill={token.colorPrimary} opacity="0.55" />
        
        {/* Flowing curves */}
        <path
          d="M 150 150 C 300 100, 450 150, 600 200 C 750 250, 900 200, 1050 200"
          stroke={token.colorPrimary}
          strokeWidth="3"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M 200 550 C 400 450, 600 500, 800 550 C 1000 600, 1100 550, 1000 650"
          stroke={token.colorPrimary}
          strokeWidth="3"
          fill="none"
          opacity="0.4"
        />
        
        {/* Star shapes */}
        <path
          d="M 500 300 L 520 360 L 580 360 L 530 400 L 550 460 L 500 430 L 450 460 L 470 400 L 420 360 L 480 360 Z"
          fill={token.colorPrimary}
          opacity="0.5"
        />
        <path
          d="M 700 500 L 710 530 L 740 530 L 720 550 L 730 580 L 700 570 L 670 580 L 680 550 L 660 530 L 690 530 Z"
          fill={token.colorPrimary}
          opacity="0.5"
        />
        
        {/* Small decorative circles */}
        <circle cx="400" cy="400" r="40" fill={token.colorPrimary} opacity="0.5" />
        <circle cx="800" cy="400" r="50" fill={token.colorPrimary} opacity="0.5" />
        <circle cx="600" cy="600" r="45" fill={token.colorPrimary} opacity="0.5" />
      </svg>
    ),
    reset: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '140%',
          height: '140%',
          opacity: 0.2,
          pointerEvents: 'none',
        }}
      >
        {/* Concentric circles */}
        <circle cx="600" cy="400" r="200" stroke={token.colorPrimary} strokeWidth="2" fill="none" opacity="0.5" />
        <circle cx="600" cy="400" r="150" stroke={token.colorPrimary} strokeWidth="2" fill="none" opacity="0.5" />
        <circle cx="600" cy="400" r="100" stroke={token.colorPrimary} strokeWidth="2" fill="none" opacity="0.5" />
        <circle cx="600" cy="400" r="50" fill={token.colorPrimary} opacity="0.6" />
        
        {/* Additional circles */}
        <circle cx="200" cy="200" r="80" stroke={token.colorPrimary} strokeWidth="2" fill="none" opacity="0.4" />
        <circle cx="1000" cy="200" r="80" stroke={token.colorPrimary} strokeWidth="2" fill="none" opacity="0.4" />
        <circle cx="200" cy="600" r="80" stroke={token.colorPrimary} strokeWidth="2" fill="none" opacity="0.4" />
        <circle cx="1000" cy="600" r="80" stroke={token.colorPrimary} strokeWidth="2" fill="none" opacity="0.4" />
        
        {/* Refresh/Arrow symbols */}
        <path
          d="M 300 300 L 350 300 L 330 280 M 350 300 L 330 320"
          stroke={token.colorPrimary}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M 900 500 L 850 500 L 870 480 M 850 500 L 870 520"
          stroke={token.colorPrimary}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
        
        {/* Circular arrow paths */}
        <path
          d="M 400 400 A 100 100 0 1 1 500 400"
          stroke={token.colorPrimary}
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M 700 400 A 100 100 0 1 0 800 400"
          stroke={token.colorPrimary}
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />
        
        {/* Dots pattern */}
        <circle cx="150" cy="150" r="10" fill={token.colorPrimary} opacity="0.55" />
        <circle cx="1050" cy="150" r="10" fill={token.colorPrimary} opacity="0.55" />
        <circle cx="150" cy="650" r="10" fill={token.colorPrimary} opacity="0.55" />
        <circle cx="1050" cy="650" r="10" fill={token.colorPrimary} opacity="0.55" />
        <circle cx="400" cy="200" r="8" fill={token.colorPrimary} opacity="0.55" />
        <circle cx="800" cy="600" r="8" fill={token.colorPrimary} opacity="0.55" />
      </svg>
    ),
  };

  return <>{illustrations[variant]}</>;
};

