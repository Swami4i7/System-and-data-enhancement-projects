// src/contexts/SearchContext.tsx
'use client'
import React, { createContext, useContext, useState, useCallback } from 'react';
import { debounce } from '@/utils/debounce';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTermState] = useState('');

  const debouncedSetSearchTerm = useCallback(
    debounce((term: string) => {
      setSearchTermState(term);
    }, 300), // 300ms debounce
    []
  );

  const setSearchTerm = (term: string) => debouncedSetSearchTerm(term);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearchContext must be used within a SearchProvider');
  return context;
};
