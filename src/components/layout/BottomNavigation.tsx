import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { useToken } from '@/hooks/useToken';
import {
  DashboardOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

interface BottomNavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  route: string;
}

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useToken();

  const navItems: BottomNavItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
      route: ROUTES.DASHBOARD,
    },
    {
      key: 'transactions',
      label: 'Transactions',
      icon: <CreditCardOutlined />,
      route: ROUTES.LOANS,
    },
    {
      key: 'deductions',
      label: 'Deductions',
      icon: <FileTextOutlined />,
      route: ROUTES.DEDUCTIONS,
    },
  ];

  const handleNavClick = (route: string) => {
    navigate(route);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: token.colorBgContainer,
        borderTop: `1px solid ${token.colorBorderSecondary}`,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8px 0',
        paddingBottom: 'calc(8px + env(safe-area-inset-bottom))', // Safe area for iOS
        zIndex: 1000,
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.06)',
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.route;
        return (
          <button
            key={item.key}
            onClick={() => handleNavClick(item.route)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              padding: '8px 16px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              flex: 1,
              transition: 'all 0.2s',
              color: isActive ? token.colorPrimary : token.colorTextSecondary,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = token.colorText;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = token.colorTextSecondary;
              }
            }}
          >
            <span
              style={{
                fontSize: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'inherit',
              }}
            >
              {item.icon}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: isActive ? 600 : 400,
                color: 'inherit',
                lineHeight: 1.2,
              }}
            >
              {item.label}
            </span>
            {isActive && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 32,
                  height: 3,
                  background: token.colorPrimary,
                  borderRadius: '0 0 2px 2px',
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavigation;

