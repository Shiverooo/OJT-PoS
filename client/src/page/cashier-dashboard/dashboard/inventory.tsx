import React, { useEffect, useState } from "react";
import "../../../styles/cashier/inventory.css";
import searchIcon from "../../../assets/images/search-icon.svg";
import SearchBar from "../../../components/cashier/inventory/inventory-search.tsx";
import TableHeader from "../../../components/cashier/inventory/inventory-header.tsx";
import TableBody from "../../../components/cashier/inventory/inventory-table.tsx";

// Define the type for inventory items
interface InventoryItem {
  barcode: string;
  name: string;
  category: string;
  supplier: string;
  price: string;
  dateAdded: string;
  stocks: number;
  status: "IN-STOCK" | "LOW" | "OUT-OF-STOCK"; 
}

function Inventory() {
  // Set the page title when component mounts
  useEffect(() => {
    document.title = "Infinitum PoS | Inventory";
  }, []);

  // State for inventory items
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

  // State to handle search by name and barcode
  const [nameSearch, setNameSearch] = useState("");
  const [barcodeSearch, setBarcodeSearch] = useState("");

  // Filter data based on search criteria
  const filteredData = inventoryItems.filter((item) => {
    const matchesName = nameSearch
      ? item.name.toLowerCase().includes(nameSearch.toLowerCase())
      : true;
    const matchesBarcode = barcodeSearch
      ? item.barcode.includes(barcodeSearch)
      : true;
    return matchesName && matchesBarcode;
  });

  // Inside the useEffect where products are loaded
  const getProductStatus = (quantity: number) => {
    if (quantity === 0) return "OUT-OF-STOCK";
    if (quantity < 5) return "LOW";
    return "IN-STOCK";
  };

  useEffect(() => {
    const loadProducts = () => {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        // Transform the products to match the inventory item structure
        const transformedProducts = products.map((product: any) => ({
          barcode: product.barcode,
          name: product.name,
          category: product.category,
          supplier: product.supplier,
          price: `₱${parseFloat(product.price).toLocaleString()}`,
          dateAdded: new Date(product.dateAdded).toLocaleDateString(),
          stocks: product.quantity,
          status: getProductStatus(product.quantity)
        }));
        setInventoryItems(transformedProducts);
      }
    };

    loadProducts();

    // Add event listener for storage changes
    window.addEventListener('storage', loadProducts);

    // Cleanup
    return () => {
      window.removeEventListener('storage', loadProducts);
    };
  }, []);

  return (
    <div className="inventory-container">
      <SearchBar
        nameSearch={nameSearch}
        barcodeSearch={barcodeSearch}
        onNameSearchChange={setNameSearch}
        onBarcodeSearchChange={setBarcodeSearch}
      />
      <TableHeader />
      <TableBody items={filteredData} />
    </div>
  );
}

export default Inventory;
