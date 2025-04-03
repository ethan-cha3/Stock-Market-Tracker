import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getStockList,
  addStockAPI,
  deleteStockAPI,
  getStockInfo,
} from "../services/api.ts";

const username = "admin";

interface StockContextType {
  stocks: string[];
  stockPrices: { [key: string]: { currentPrice: number; priceChange: number } };
  addStock: (stock: string) => void;
  removeStock: (stock: string) => void;
  fetchStocksFromAPI: () => void;
  fetchStockPrices: () => void;
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

  const [stockPrices, setStockPrices] = useState<{
    [key: string]: { currentPrice: number; priceChange: number };
  }>({});

  const fetchStockPrices = async () => {
    const prices: {
      [key: string]: { currentPrice: number; priceChange: number };
    } = {};

    for (const symbol of stocks) {
      try {
        const data = await getStockInfo(symbol);
        prices[symbol] = {
          currentPrice: data.c,
          priceChange: data.d,
        };
      } catch (error) {
        console.error(`Error fetching stock info for ${symbol}:`, error);
        prices[symbol] = { currentPrice: -1, priceChange: 0 };
      }
    }

    setStockPrices(prices);
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

  useEffect(() => {
    if (stocks.length > 0) {
      fetchStockPrices();
    }
  }, [stocks]);

  return (
    <StockContext.Provider
      value={{
        stocks,
        stockPrices,
        addStock,
        removeStock,
        fetchStocksFromAPI,
        fetchStockPrices,
      }}
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
