import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import React, { useCallback, useState } from 'react';

interface PopOptions {
  title?: string;
  content?: React.ReactNode;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  okType?: 'primary' | 'danger' | 'default';
  width?: number;
  maskClosable?: boolean;
}

export const usePop = () => {
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const open = useCallback((options: PopOptions) => {
    setModalProps({
      open: true,
      title: options.title,
      children: options.content,
      onOk: async () => {
        if (options.onOk) {
          await options.onOk();
        }
        setModalProps(null);
      },
      onCancel: () => {
        if (options.onCancel) {
          options.onCancel();
        }
        setModalProps(null);
      },
      okText: options.okText || 'OK',
      cancelText: options.cancelText || 'Cancel',
      okType: options.okType || 'primary',
      width: options.width,
      maskClosable: options.maskClosable !== false,
    });
  }, []);

  const confirm = useCallback((options: PopOptions) => {
    const ConfirmIcon = ExclamationCircleOutlined;
    Modal.confirm({
      title: options.title || 'Confirm',
      icon: React.createElement(ConfirmIcon),
      content: options.content,
      onOk: options.onOk,
      onCancel: options.onCancel,
      okText: options.okText || 'OK',
      cancelText: options.cancelText || 'Cancel',
      okType: options.okType || 'primary',
      maskClosable: options.maskClosable !== false,
    });
  }, []);

  const close = useCallback(() => {
    setModalProps(null);
  }, []);

  return {
    open,
    confirm,
    close,
    modalProps,
  };
};

