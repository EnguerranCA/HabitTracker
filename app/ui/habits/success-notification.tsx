'use client';

import { useEffect, useState } from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SuccessNotificationProps {
  message: string;
  onClose?: () => void;
}

export default function SuccessNotification({ message, onClose }: SuccessNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 5000); // Disparaît après 5 secondes

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="flex items-center space-x-3 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg min-w-80">
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
        <div className="flex-1">
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="text-green-600 hover:text-green-800 transition-colors"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}