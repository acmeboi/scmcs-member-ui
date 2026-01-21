import type { ThemeConfig } from 'antd';

// Effort Edge Color Palette
export const colors = {
  // Primary Blues
  primary: '#007bff',
  primaryDark: '#0056b3',
  primaryDarker: '#004085',
  primaryDarkest: '#002752',
  primaryLight: '#7abaff',
  primaryLighter: '#80bdff',
  primaryLightest: '#9fcdff',
  
  // Accent Colors
  accent: '#ffc107', // Gold
  accentLight: '#ffe8a1',
  accentOrange: '#fd7e14',
  
  // Semantic Colors
  success: '#28a745',
  successLight: '#8fd19e',
  error: '#dc3545',
  errorLight: '#f5c6cb',
  warning: '#ffc107',
  info: '#17a2b8',
  infoLight: '#86cfda',
  
  // Neutral Colors
  text: '#212529',
  textSecondary: '#666666',
  textTertiary: '#6c757d',
  border: '#dee2e6',
  borderLight: '#e9ecef',
  background: '#ffffff',
  backgroundLight: '#f8f9fa',
  backgroundLighter: '#f5f5f5',
  
  // Layout Colors
  headerBg: '#002752',
  siderBg: '#002752',
  siderHover: '#004085',
} as const;

export const themeConfig: ThemeConfig = {
  token: {
    // Primary color (Purple)
    colorPrimary: '#7c3aed', // Purple-600
    
    // Border radius
    borderRadius: 4,
    
    // Typography
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    lineHeight: 1.5,
    
    // Colors (Effort Edge palette)
    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorError: colors.error,
    colorInfo: colors.info,
    
    // Text colors
    colorText: colors.text,
    colorTextSecondary: colors.textSecondary,
    colorTextTertiary: colors.textTertiary,
    
    // Border colors
    colorBorder: colors.border,
    colorBorderSecondary: colors.borderLight,
    
    // Background colors
    colorBgContainer: colors.background,
    colorBgElevated: colors.backgroundLight,
    colorBgLayout: colors.backgroundLighter,
    
    // Spacing
    sizeUnit: 4,
    sizeStep: 4,
    
    // Control heights for responsive design
    controlHeight: 40,
    controlHeightSM: 32,
    controlHeightLG: 48,
  },
  components: {
    Button: {
      borderRadius: 4,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      primaryColor: colors.background,
      fontWeight: 500,
    },
    Input: {
      borderRadius: 4,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
    },
    Card: {
      borderRadius: 4,
      paddingLG: 24,
      padding: 16,
      headerBg: colors.backgroundLight,
    },
    Layout: {
      headerBg: colors.headerBg,
      headerHeight: 64,
      headerPadding: '0 24px',
      siderBg: colors.siderBg,
      bodyBg: colors.backgroundLighter,
    },
    Menu: {
      itemActiveBg: colors.backgroundLight,
      itemHoverBg: colors.backgroundLight,
      itemSelectedBg: '#7c3aed',
      itemSelectedColor: colors.background,
      itemColor: colors.text,
      subMenuItemBg: colors.backgroundLight,
      borderRadius: 4,
    },
    Typography: {
      colorText: colors.text,
      colorTextSecondary: colors.textSecondary,
    },
    Table: {
      borderRadius: 8,
      headerBg: colors.backgroundLight,
    },
            Statistic: {
              titleFontSize: 14,
              contentFontSize: 24,
              borderRadius: 4,
            },
  },
  // Responsive breakpoints
  algorithm: undefined, // Will use default responsive algorithm
};

