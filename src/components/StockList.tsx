import "../css/StockList.css";
import { useEffect, useState } from "react";
import { getStockInfo, getStockList } from "../services/api.ts";

function StockList() {
  // retrieve stock list from AWSDynamoDB
  const username = "admin";
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    const fetchStockList = async () => {
      let stockSymbols: string[] = [];
      try {
        const data = await getStockList(username);
        stockSymbols = data;
      } catch (error) {
        console.error(`Error fetching stock list from server:`, error);
        setItems([]);
      }
      setItems(stockSymbols);
    };

    fetchStockList();
  }, []);

  // retrieve stock prices for each stock in the list from Finnhub
  const [stockPrices, setStockPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchStockPrices = async () => {
      const prices: { [key: string]: number } = {};

      for (const symbol of items) {
        try {
          const data = await getStockInfo(symbol);
          prices[symbol] = data.c;
        } catch (error) {
          console.error(`Error fetching stock info for ${symbol}:`, error);
          prices[symbol] = -1;
        }
      }

      setStockPrices(prices);
    };

    fetchStockPrices();
  }, [items]);

  function onDeleteClick() {
    console.log("DELETE!");
  }

  return (
    <>
      <h1>Watch List</h1>
      <div className="stock-list">
        {items.map((item, index) => (
          <div className="stock-list-item" key={index}>
            <p className="stock-symbol">{item}</p>
            <div className="stock-price">
              {stockPrices[item] !== undefined
                ? `$${stockPrices[item].toFixed(2)}`
                : "Loading..."}
            </div>
            <button className="delete-btn" onClick={onDeleteClick}>
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default StockList;
