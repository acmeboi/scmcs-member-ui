import { ROUTES } from '@/config/routes';
import { useToken } from '@/hooks/useToken';
import { storage } from '@/utils/storage';
import { useAuthViewModel } from '@/viewmodels/auth.viewmodel';
import {
  CreditCardOutlined,
  DashboardOutlined,
  FileTextOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Drawer, Dropdown, Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SCMCSLogo } from './SCMCSLogo';
import { SidebarIllustration } from './SidebarIllustration';
import BottomNavigation from './BottomNavigation';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthViewModel();
  const profile = storage.getProfile();
  const user = storage.getUser();
  const token = useToken();

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuVisible(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    {
      key: ROUTES.DASHBOARD,
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: ROUTES.LOANS,
      icon: <CreditCardOutlined />,
      label: 'Transactions',
    },
    {
      key: ROUTES.DEDUCTIONS,
      icon: <FileTextOutlined />,
      label: 'Deductions',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => {
        // TODO: Navigate to profile page
      },
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => logout(),
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    if (isMobile) {
      setMobileMenuVisible(false);
    }
  };

  const menuContent = (
    <>
      <div
        style={{
          height: collapsed && !isMobile ? 64 : 80,
          margin: 16,
          marginBottom: 24,
          background: 'transparent',
          borderRadius: token.borderRadius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
          padding: collapsed && !isMobile ? 0 : '0 12px',
          transition: 'all 0.2s',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <SCMCSLogo collapsed={collapsed && !isMobile} />
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          borderRight: 0,
          background: 'transparent',
          position: 'relative',
          zIndex: 1,
        }}
      />
    </>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Desktop Sider */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={250}
          breakpoint="lg"
          collapsedWidth={80}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            background: token.colorBgContainer,
            borderRight: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <SidebarIllustration />
          {menuContent}
        </Sider>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          title={
            <div style={{ color: token.colorText, fontWeight: token.fontWeightStrong }}>
              SCMCS Member
            </div>
          }
          placement="left"
          onClose={() => setMobileMenuVisible(false)}
          open={mobileMenuVisible}
          bodyStyle={{
            padding: 0,
            background: token.colorBgContainer,
            position: 'relative',
          }}
          headerStyle={{
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            padding: '16px 24px',
          }}
          style={{ zIndex: 1000 }}
        >
          <SidebarIllustration />
          {menuContent}
        </Drawer>
      )}

      <Layout style={{ marginLeft: isMobile ? 0 : (collapsed ? 80 : 250), transition: 'margin-left 0.2s' }}>
        <Header
          style={{
            padding: isMobile ? '0 16px' : '0 24px',
            background: token.colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Button
            type="text"
            icon={isMobile ? (mobileMenuVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />) : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
            onClick={() => {
              if (isMobile) {
                setMobileMenuVisible(!mobileMenuVisible);
              } else {
                setCollapsed(!collapsed);
              }
            }}
            style={{
              fontSize: 18,
              width: isMobile ? 48 : 64,
              height: 64,
              color: token.colorText,
            }}
          />
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <div
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 12px',
                borderRadius: token.borderRadius,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = token.colorBgElevated;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Avatar icon={<UserOutlined />} style={{ background: token.colorPrimary }} />
              {!isMobile && (
                <span style={{ color: token.colorText, fontWeight: 500 }}>
                  {profile?.name || user?.email || 'User'}
                </span>
              )}
            </div>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: isMobile ? '16px 8px' : '24px 16px',
            padding: isMobile ? 16 : 24,
            minHeight: 280,
            background: 'transparent',
            paddingBottom: isMobile ? 80 : 24, // Extra padding for bottom navigation
          }}
        >
          {children}
        </Content>
      </Layout>

      {/* Mobile Bottom Navigation */}
      {isMobile && <BottomNavigation />}
    </Layout>
  );
};

export default MainLayout;

