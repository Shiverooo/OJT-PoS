// Selected Products Context

import React, { createContext, useContext, useState } from "react";

// Create context for selected products
const SelectedProductsContext = createContext();

// Custom hook to access the selected products context
export const useSelectedProducts = () => useContext(SelectedProductsContext);

// Provider component to wrap the application and provide selected products data
export const SelectedProductsProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]); // State to store selected items

  // Function to add a product to selected items
  const addProduct = (product) => {
    setSelectedItems((prev) => {
      const exists = prev.find((item) => item.name === product.name);
      if (exists) {
        // If product exists, increase quantity by 1
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If product doesn't exist, add it with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to clear all selected items
  const clearItems = () => {
    setSelectedItems([]);
  };

  return (
    <SelectedProductsContext.Provider
      value={{ selectedItems, addProduct, clearItems }}
    >
      {children} {/* Render children components with access to the context */}
    </SelectedProductsContext.Provider>
  );
};
