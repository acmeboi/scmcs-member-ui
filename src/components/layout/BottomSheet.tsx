import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import { colors } from '@/config/theme';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  height?: number | string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  children,
  title,
  height = 'auto',
}) => {
  // Prevent body scroll when bottom sheet is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <Drawer
      placement="bottom"
      onClose={onClose}
      open={open}
      closable={false}
      maskClosable={true}
      height={height}
      style={{
        zIndex: 1001,
      }}
      bodyStyle={{
        padding: 0,
        background: colors.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '85vh',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
      }}
      maskStyle={{
        background: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(4px)',
      }}
      title={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 8,
            paddingBottom: title ? 12 : 8,
          }}
        >
          {/* Drag handle */}
          <div
            style={{
              width: 40,
              height: 4,
              background: colors.border,
              borderRadius: 2,
              marginBottom: title ? 12 : 0,
              cursor: 'grab',
            }}
          />
          {title && (
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: colors.text,
                textAlign: 'center',
              }}
            >
              {title}
            </span>
          )}
        </div>
      }
    >
      {children}
    </Drawer>
  );
};

