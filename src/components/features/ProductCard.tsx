'use client';

import React, { useState } from 'react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="group bg-white rounded-xl border border-gray-200 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between p-4">
      <div>
        {/* Product Image Area with Real Image & Graceful Placeholder Fallback */}
        <div className="aspect-[4/3] w-full rounded-lg bg-[#e9ecef] mb-4 overflow-hidden relative flex items-center justify-center">
          {product.image && !imgError ? (
            <>
              {/* Skeleton/Placeholder while image is loading */}
              {!imgLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 animate-pulse">
                  <span className="text-3xl font-light text-gray-300">片</span>
                  <span className="text-xs ml-1 text-gray-400">圖片載入中...</span>
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${
                  imgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </>
          ) : (
            <div className="flex items-center gap-2 text-gray-400 select-none">
              <span className="text-3xl font-light text-gray-300">片</span>
              <span className="text-sm tracking-wide text-gray-500">圖片載入中...</span>
            </div>
          )}

          {/* Optional Category Badge */}
          {product.category && (
            <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-2xs px-2 py-0.5 rounded-md font-medium">
              {product.category}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>

        {/* Product Price in NT$ red/coral */}
        <p className="text-lg font-bold text-[#ff4d4f] mb-4">
          NT$ {product.price}
        </p>
      </div>

      {/* Solid Green Add to Cart Button matching screenshot */}
      <button
        type="button"
        onClick={() => onAddToCart(product)}
        className="w-full py-2.5 bg-[#4caf50] hover:bg-[#43a047] active:bg-[#388e3c] text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
      >
        加入購物車
      </button>
    </div>
  );
};
