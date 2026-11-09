'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  totalFound: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  totalFound,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="搜尋商品名稱（例如：耳機、手錶、滑鼠）..."
          className="w-full pl-10 pr-10 py-2 bg-white border border-gray-300 rounded-lg text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:border-[#4caf50] transition-all shadow-2xs"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="清除搜尋"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {value && (
        <p className="mt-1.5 text-xs text-gray-500 text-center">
          找到 <span className="font-semibold text-gray-800">{totalFound}</span> 項商品
        </p>
      )}
    </div>
  );
};
