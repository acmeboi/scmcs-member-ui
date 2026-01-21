import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';

interface NotificationOptions {
  duration?: number;
  placement?: NotificationPlacement;
}

export const useNotification = () => {
  const showSuccess = (
    message: string,
    description?: string,
    options?: NotificationOptions
  ) => {
    notification.success({
      message,
      description,
      duration: options?.duration || 4.5,
      placement: options?.placement || 'topRight',
    });
  };

  const showError = (
    message: string,
    description?: string,
    options?: NotificationOptions
  ) => {
    notification.error({
      message,
      description,
      duration: options?.duration || 4.5,
      placement: options?.placement || 'topRight',
    });
  };

  const showWarning = (
    message: string,
    description?: string,
    options?: NotificationOptions
  ) => {
    notification.warning({
      message,
      description,
      duration: options?.duration || 4.5,
      placement: options?.placement || 'topRight',
    });
  };

  const showInfo = (
    message: string,
    description?: string,
    options?: NotificationOptions
  ) => {
    notification.info({
      message,
      description,
      duration: options?.duration || 4.5,
      placement: options?.placement || 'topRight',
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

