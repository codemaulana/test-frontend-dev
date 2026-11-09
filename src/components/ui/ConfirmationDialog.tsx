'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, HelpCircle, X } from 'lucide-react';
import { DialogConfig } from '../../types';

interface ConfirmationDialogProps {
  config: DialogConfig;
  onClose: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ config, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && config.isOpen) {
        onClose();
      }
    };
    if (config.isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [config.isOpen, onClose]);

  if (!config.isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs notranslate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      translate="no"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-full shrink-0 ${
                config.isDestructive ? 'bg-red-100 text-red-600' : 'bg-green-100 text-[#4caf50]'
              }`}
            >
              {config.isDestructive ? (
                <AlertTriangle className="w-6 h-6 pointer-events-none" />
              ) : (
                <HelpCircle className="w-6 h-6 pointer-events-none" />
              )}
            </div>

            <div className="flex-1">
              <h3 id="dialog-title" className="text-lg font-bold text-gray-900">
                {config.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{config.message}</p>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
              aria-label="關閉對話框"
            >
              <X className="w-5 h-5 pointer-events-none" />
            </button>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {config.cancelLabel || '取消'}
          </button>
          <button
            type="button"
            onClick={() => {
              config.onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm font-bold text-white rounded-lg shadow-xs transition-colors cursor-pointer ${
              config.isDestructive
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-[#4caf50] hover:bg-[#43a047]'
            }`}
          >
            {config.confirmLabel || '確認'}
          </button>
        </div>
      </div>
    </div>
  );
};
