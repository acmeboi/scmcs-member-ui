import { theme } from 'antd';

/**
 * Reusable hook to access Ant Design theme tokens
 * Provides access to all theme colors, spacing, typography, and component tokens
 */
export const useToken = () => {
  const { token } = theme.useToken();

  return {
    // Color tokens
    colorPrimary: token.colorPrimary,
    colorSuccess: token.colorSuccess,
    colorWarning: token.colorWarning,
    colorError: token.colorError,
    colorInfo: token.colorInfo,
    colorText: token.colorText,
    colorTextSecondary: token.colorTextSecondary,
    colorTextTertiary: token.colorTextTertiary,
    colorTextQuaternary: token.colorTextQuaternary,
    colorBorder: token.colorBorder,
    colorBorderSecondary: token.colorBorderSecondary,
    colorBgContainer: token.colorBgContainer,
    colorBgElevated: token.colorBgElevated,
    colorBgLayout: token.colorBgLayout,
    colorBgSpotlight: token.colorBgSpotlight,
    colorFill: token.colorFill,
    colorFillSecondary: token.colorFillSecondary,
    colorFillTertiary: token.colorFillTertiary,
    colorFillQuaternary: token.colorFillQuaternary,

    // Typography tokens
    fontFamily: token.fontFamily,
    fontSize: token.fontSize,
    fontSizeLG: token.fontSizeLG,
    fontSizeSM: token.fontSizeSM,
    fontSizeXL: token.fontSizeXL,
    fontSizeHeading1: token.fontSizeHeading1,
    fontSizeHeading2: token.fontSizeHeading2,
    fontSizeHeading3: token.fontSizeHeading3,
    fontSizeHeading4: token.fontSizeHeading4,
    fontSizeHeading5: token.fontSizeHeading5,
    lineHeight: token.lineHeight,
    lineHeightLG: token.lineHeightLG,
    lineHeightSM: token.lineHeightSM,
    fontWeightStrong: token.fontWeightStrong,

    // Spacing tokens
    sizeUnit: token.sizeUnit,
    sizeStep: token.sizeStep,
    sizeXXL: token.sizeXXL,
    sizeXL: token.sizeXL,
    sizeLG: token.sizeLG,
    sizeMD: token.sizeMD,
    sizeMS: token.sizeMS,
    sizeSM: token.sizeSM,
    sizeXS: token.sizeXS,
    sizeXXS: token.sizeXXS,

    // Control heights
    controlHeight: token.controlHeight,
    controlHeightSM: token.controlHeightSM,
    controlHeightLG: token.controlHeightLG,
    controlHeightXS: token.controlHeightXS,

    // Border radius
    borderRadius: token.borderRadius,
    borderRadiusLG: token.borderRadiusLG,
    borderRadiusSM: token.borderRadiusSM,
    borderRadiusXS: token.borderRadiusXS,
    borderRadiusOuter: token.borderRadiusOuter,

    // Box shadow
    boxShadow: token.boxShadow,
    boxShadowSecondary: token.boxShadowSecondary,
    boxShadowTertiary: token.boxShadowTertiary,

    // Motion
    motionDurationFast: token.motionDurationFast,
    motionDurationMid: token.motionDurationMid,
    motionDurationSlow: token.motionDurationSlow,
    motionEaseInOut: token.motionEaseInOut,
    motionEaseOut: token.motionEaseOut,

    // Screen sizes (responsive breakpoints)
    screenXS: token.screenXS,
    screenSM: token.screenSM,
    screenMD: token.screenMD,
    screenLG: token.screenLG,
    screenXL: token.screenXL,
    screenXXL: token.screenXXL,

    // Full token object for advanced usage
    token,
  };
};

export type UseTokenReturn = ReturnType<typeof useToken>;

