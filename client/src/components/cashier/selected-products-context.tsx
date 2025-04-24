import React, { createContext, useContext, useState } from "react";

const SelectedProductsContext = createContext();

export const useSelectedProducts = () => useContext(SelectedProductsContext);

export const SelectedProductsProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const addProduct = (product) => {
    setSelectedItems((prev) => {
      const exists = prev.find((item) => item.name === product.name);
      if (exists) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <SelectedProductsContext.Provider value={{ selectedItems, addProduct }}>
      {children}
    </SelectedProductsContext.Provider>
  );
};
