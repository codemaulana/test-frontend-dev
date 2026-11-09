'use client';

import { useState, useMemo } from 'react';
import { Product } from '../types';

export function useSearch(products: Product[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) return products;

    return products.filter((product) => {
      const matchName = product.name.toLowerCase().includes(trimmed);
      const matchDesc = product.description ? product.description.toLowerCase().includes(trimmed) : false;
      const matchCategory = product.category ? product.category.toLowerCase().includes(trimmed) : false;
      return matchName || matchDesc || matchCategory;
    });
  }, [products, searchTerm]);

  const clearSearch = () => setSearchTerm('');

  return {
    searchTerm,
    setSearchTerm,
    clearSearch,
    filteredProducts,
  };
}
