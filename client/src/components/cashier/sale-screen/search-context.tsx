// Search Context Provider Component

import React, { createContext, useState, ReactNode } from "react";

// Define context types
interface SearchContextProps {
  query: string;
  setQuery: (query: string) => void;
}

// Create context with default values
export const SearchContext = createContext<SearchContextProps>({
  query: "",
  setQuery: () => {},
});

// Create provider component
export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState("");

  // Provide context value to children
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
