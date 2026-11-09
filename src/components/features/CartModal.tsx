'use client';

import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  onUpdateQuantity: (id: number, qty: number | string) => void;
  onAdjustQuantity: (id: number, delta: number) => void;
  onRequestRemove: (item: CartItem) => void;
  onRequestCheckout: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cart,
  totalQuantity,
  totalPrice,
  onUpdateQuantity,
  onAdjustQuantity,
  onRequestRemove,
  onRequestCheckout,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity notranslate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      translate="no"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-gray-700 pointer-events-none" />
            <h2 id="cart-title" className="text-lg font-bold text-gray-900">
              購物車清單
            </h2>
            <span
              className="ml-2 bg-[#f26c6c] text-white text-xs px-2.5 py-0.5 rounded-full font-semibold notranslate"
              translate="no"
            >
              共 {totalQuantity} 件商品
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
            aria-label="關閉購物車"
          >
            <X className="w-5 h-5 pointer-events-none" />
          </button>
        </div>

        {/* Modal Items List with Product Images */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center text-gray-400">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3 text-gray-300">
                <ShoppingBag className="w-8 h-8 pointer-events-none" />
              </div>
              <h3 className="text-base font-semibold text-gray-700 mb-1">購物車是空的</h3>
              <p className="text-xs text-gray-400">趕快去挑選喜歡的商品吧！</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {cart.map((item) => {
                const itemPrice = Number(item.price) || 0;
                const itemQty = Number(item.quantity) || 1;
                const itemSubtotal = itemPrice * itemQty;

                return (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    {/* Thumbnail Image with fallback */}
                    <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-xs text-gray-400">片</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        單價：
                        <span className="text-[#ff4d4f] font-semibold notranslate" translate="no">
                          NT$ {itemPrice}
                        </span>
                      </p>
                    </div>

                    {/* Quantity Controller with Multiples Support (Feature #5) */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-2xs">
                        <button
                          type="button"
                          onClick={() => onAdjustQuantity(item.id, -1)}
                          disabled={itemQty <= 1}
                          className="px-2.5 py-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-500 hover:bg-gray-100 transition-colors notranslate cursor-pointer"
                          translate="no"
                          aria-label="減少數量"
                        >
                          <Minus className="w-3 h-3 pointer-events-none" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => onUpdateQuantity(item.id, e.target.value)}
                          onBlur={(e) => {
                            if (!e.target.value || parseInt(e.target.value, 10) < 1) {
                              onUpdateQuantity(item.id, 1);
                            }
                          }}
                          className="w-12 text-center text-xs font-bold text-gray-900 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none notranslate"
                          translate="no"
                          aria-label="商品數量"
                        />
                        <button
                          type="button"
                          onClick={() => onAdjustQuantity(item.id, 1)}
                          className="px-2.5 py-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors notranslate cursor-pointer"
                          translate="no"
                          aria-label="增加數量"
                        >
                          <Plus className="w-3 h-3 pointer-events-none" />
                        </button>
                      </div>

                      {/* Quick Multiples Step: +5 button */}
                      <button
                        type="button"
                        onClick={() => onAdjustQuantity(item.id, 5)}
                        className="px-2 py-1 text-2xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded border border-gray-200 transition-colors notranslate cursor-pointer"
                        translate="no"
                        title="快速增加 5 件"
                      >
                        +5
                      </button>
                    </div>

                    {/* Subtotal: Updates in real-time immediately when quantity changes */}
                    <div className="text-right min-w-[100px]">
                      <span className="text-sm font-bold text-[#ff4d4f] notranslate" translate="no">
                        NT$ {itemSubtotal}
                      </span>
                    </div>

                    {/* Remove Button triggering confirmation dialog (Feature #1) */}
                    <button
                      type="button"
                      onClick={() => onRequestRemove(item)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      aria-label={`移除 ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4 pointer-events-none" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer Summary with Basic Checkout Simulation */}
        {cart.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="text-xs text-gray-500">
                商品數量總計：
                <span className="font-bold text-gray-800 notranslate" translate="no">
                  {totalQuantity} 件
                </span>
              </div>
              <div className="text-base font-bold text-gray-900 mt-0.5">
                訂單總金額：
                <span className="text-[#ff4d4f] text-lg font-extrabold notranslate" translate="no">
                  NT$ {totalPrice}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                繼續購物
              </button>
              {/* Checkout Button triggering confirmation dialog (Feature #1 & Basic Checkout Simulation) */}
              <button
                type="button"
                onClick={onRequestCheckout}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-[#4caf50] hover:bg-[#43a047] active:bg-[#388e3c] text-white text-sm font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <span>立即結帳</span>
                <ArrowRight className="w-4 h-4 pointer-events-none" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
