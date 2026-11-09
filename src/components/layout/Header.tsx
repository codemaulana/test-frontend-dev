'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  totalQuantity: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ totalQuantity, onOpenCart }) => {
  return (
    <header className="bg-[#333333] text-white py-4 px-6 sm:px-10 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Title matching screenshot: 精品商店 */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          精品商店
        </h1>

        {/* Shopping Cart Button matching screenshot */}
        <button
          type="button"
          onClick={onOpenCart}
          className="relative inline-flex items-center gap-2 px-4 py-2 bg-[#f26c6c] hover:bg-[#e85b5b] active:bg-[#d94a4a] text-white rounded-lg font-medium text-sm transition-colors cursor-pointer"
          aria-label={`購物車，共有 ${totalQuantity} 件商品`}
        >
          <ShoppingCart className="w-4 h-4 pointer-events-none" />
          <span>購物車</span>

          {/* Red badge with real-time total quantity counter */}
          <span
            className="absolute -top-2 -right-2 bg-[#e53935] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-xs notranslate"
            translate="no"
          >
            {totalQuantity}
          </span>
        </button>
      </div>
    </header>
  );
};
