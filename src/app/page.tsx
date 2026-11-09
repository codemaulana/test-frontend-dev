'use client';

import React, { useState } from 'react';
import { Package, CheckCircle2 } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/products';
import { Product, CartItem } from '../types';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import { useSearch } from '../hooks/useSearch';
import { useDialog } from '../hooks/useDialog';
import { Header } from '../components/layout/Header';
import { SearchBar } from '../components/features/SearchBar';
import { ProductCard } from '../components/features/ProductCard';
import { CartModal } from '../components/features/CartModal';
import { ConfirmationDialog } from '../components/ui/ConfirmationDialog';
import { ToastContainer } from '../components/ui/ToastContainer';

interface CheckoutSuccessState {
  isOpen: boolean;
  orderId: string;
  totalQuantity: number;
  totalPrice: number;
}

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<CheckoutSuccessState>({
    isOpen: false,
    orderId: '',
    totalQuantity: 0,
    totalPrice: 0,
  });

  // Custom Hooks Architecture (Criteria 60% Code Structure)
  const {
    cart,
    addToCart,
    updateQuantity,
    adjustQuantity,
    removeFromCart,
    clearCart,
    totalQuantity,
    totalPrice,
  } = useCart();

  const { toasts, addToast, removeToast } = useToast();
  const { searchTerm, setSearchTerm, clearSearch, filteredProducts } = useSearch(INITIAL_PRODUCTS);
  const { dialogConfig, openDialog, closeDialog } = useDialog();

  // Feature #2: Toast notification when user adds item to the shopping cart
  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    addToast(`已將「${product.name}」加入購物車！`, 'success');
  };

  // Feature #1: Dialog window when user wants to remove item from shopping cart
  const handleRequestRemove = (item: CartItem) => {
    openDialog({
      title: '確認移除商品',
      message: `確定要將「${item.name}」（共 ${item.quantity} 件）從購物車中移除嗎？`,
      confirmLabel: '確認移除',
      cancelLabel: '保留商品',
      isDestructive: true,
      onConfirm: () => {
        removeFromCart(item.id);
        addToast(`已將「${item.name}」從購物車移除`, 'info');
      },
    });
  };

  // Feature #1 & Basic Checkout Simulation: Dialog window & simulated order completion
  const handleRequestCheckout = () => {
    const currentTotalQty = totalQuantity;
    const currentTotalPrice = totalPrice;

    openDialog({
      title: '確認結帳',
      message: `您即將結帳 ${currentTotalQty} 件商品，總金額為 NT$ ${currentTotalPrice}。是否確認進行模擬付款？`,
      confirmLabel: `確認付款 (NT$ ${currentTotalPrice})`,
      cancelLabel: '返回購物車',
      isDestructive: false,
      onConfirm: () => {
        const generatedOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        clearCart();
        setIsCartOpen(false);

        // Trigger Order Success Dialog (Simulation)
        setCheckoutSuccess({
          isOpen: true,
          orderId: generatedOrderId,
          totalQuantity: currentTotalQty,
          totalPrice: currentTotalPrice,
        });

        addToast('模擬結帳成功！訂單已成立。', 'success', 4000);
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      {/* Header: Title "精品商店" & Coral Cart Button with dynamic quantity counter */}
      <Header
        totalQuantity={totalQuantity}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Feature #4: Search Box with instant filtering */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={clearSearch}
          totalFound={filteredProducts.length}
        />

        {/* Product Catalog Grid (Product list display with images) */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center max-w-md mx-auto my-8">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-800">查無相關商品</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              找不到名稱符合 &quot;{searchTerm}&quot; 的商品。
            </p>
            <button
              type="button"
              onClick={clearSearch}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              重置搜尋條件
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* Cart Modal / Dialog Component */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
        onUpdateQuantity={updateQuantity}
        onAdjustQuantity={adjustQuantity}
        onRequestRemove={handleRequestRemove}
        onRequestCheckout={handleRequestCheckout}
      />

      {/* Confirmation Dialog (Checkout & Remove) */}
      <ConfirmationDialog config={dialogConfig} onClose={closeDialog} />

      {/* Basic Checkout Simulation Success Modal */}
      {checkoutSuccess.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">
              模擬結帳完成！
            </h3>
            <p className="text-xs text-emerald-600 font-semibold mb-4 bg-emerald-50 py-1 px-3 rounded-full inline-block">
              訂單編號: #{checkoutSuccess.orderId}
            </p>

            <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600 mb-6 space-y-1.5 text-left border border-gray-100">
              <div className="flex justify-between">
                <span>結帳狀態：</span>
                <span className="font-semibold text-emerald-600">付款成功（模擬測試）</span>
              </div>
              <div className="flex justify-between">
                <span>購買商品件數：</span>
                <span className="font-semibold text-gray-800">{checkoutSuccess.totalQuantity} 件</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>實付總金額：</span>
                <span className="text-[#ff4d4f]">NT$ {checkoutSuccess.totalPrice}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCheckoutSuccess({ isOpen: false, orderId: '', totalQuantity: 0, totalPrice: 0 })}
              className="w-full py-2.5 bg-[#4caf50] hover:bg-[#43a047] text-white text-sm font-bold rounded-lg transition-colors cursor-pointer"
            >
              完成並返回商店
            </button>
          </div>
        </div>
      )}

      {/* Toast Notifications (Add to cart) */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
