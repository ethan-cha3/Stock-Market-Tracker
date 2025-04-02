import React, { createContext, useState, useContext, useEffect } from "react";
import { getStockList, addStockAPI, deleteStockAPI } from "../services/api.ts";

// Define the API Gateway URL (replace with your actual URL)
const username = "admin";

interface StockContextType {
  stocks: string[];
  addStock: (stock: string) => void;
  removeStock: (stock: string) => void;
  fetchStocksFromAPI: () => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stocks, setStocks] = useState<string[]>([]);

  const fetchStocksFromAPI = async () => {
    try {
      const data = await getStockList(username);
      setStocks(data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const addStock = async (stock: string) => {
    try {
      await addStockAPI(username, stock);
      setStocks((prevStocks) => [...prevStocks, stock]);
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  const removeStock = async (stock: string) => {
    try {
      await deleteStockAPI(username, stock);
      setStocks((prevStocks) => prevStocks.filter((s) => s !== stock));
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  useEffect(() => {
    fetchStocksFromAPI();
  }, []);

  return (
    <StockContext.Provider
      value={{ stocks, addStock, removeStock, fetchStocksFromAPI }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStock = (): StockContextType => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStock must be used within a StockProvider");
  }
  return context;
};
