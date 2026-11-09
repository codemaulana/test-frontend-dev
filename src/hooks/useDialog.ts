'use client';

import { useState, useCallback } from 'react';
import { DialogConfig } from '../types';

export function useDialog() {
  const [config, setConfig] = useState<DialogConfig>({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    isDestructive: false,
    onConfirm: () => {},
  });

  const openDialog = useCallback(
    (options: Omit<DialogConfig, 'isOpen'>) => {
      setConfig({
        isOpen: true,
        confirmLabel: options.confirmLabel ?? 'Confirm',
        cancelLabel: options.cancelLabel ?? 'Cancel',
        isDestructive: options.isDestructive ?? false,
        ...options,
      });
    },
    []
  );

  const closeDialog = useCallback(() => {
    setConfig((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return {
    dialogConfig: config,
    openDialog,
    closeDialog,
  };
}
