interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose?: () => void;
}

export function Notification({
  message,
  type,
  onClose,
}: NotificationProps) {
  const styles = {
    success: 'bg-green-50 text-green-900 border-green-200',
    error: 'bg-red-50 text-red-900 border-red-200',
    info: 'bg-blue-50 text-blue-900 border-blue-200',
  };

  return (
    <div
      className={`p-4 rounded-md border ${styles[type]} flex items-center justify-between`}
    >
      <p>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-sm font-medium hover:underline"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}
