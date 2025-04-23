import React, { createContext, useContext, useState } from "react";

const SelectedProductsContext = createContext();

export const useSelectedProducts = () => useContext(SelectedProductsContext);

export const SelectedProductsProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const addProduct = (name) => {
    setSelectedItems((prev) => {
      const exists = prev.find((item) => item.name === name);
      if (exists) {
        return prev.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { name, quantity: 1 }];
      }
    });
  };

  return (
    <SelectedProductsContext.Provider value={{ selectedItems, addProduct }}>
      {children}
    </SelectedProductsContext.Provider>
  );
};
