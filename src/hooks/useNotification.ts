import { useState, useCallback } from 'react';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  message: string;
  type: NotificationType;
}

export function useNotification() {
  const [notification, setNotification] =
    useState<Notification | null>(null);

  const showSuccess = useCallback((message: string) => {
    setNotification({ message, type: 'success' });
  }, []);

  const showError = useCallback((message: string) => {
    setNotification({ message, type: 'error' });
  }, []);

  const showInfo = useCallback((message: string) => {
    setNotification({ message, type: 'info' });
  }, []);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    notification,
    showSuccess,
    showError,
    showInfo,
    clearNotification,
  };
}
