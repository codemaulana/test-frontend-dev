export interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
  description?: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}

export interface DialogConfig {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
}
