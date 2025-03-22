import "../css/StockList.css";
import { useEffect, useState } from "react";
import { getStockInfo } from "../services/api.ts";

function StockList() {
  const items = ["MSFT", "AAPL", "VOO", "AMZN", "SCHD"];
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
  }, []);

  function onDeleteClick() {
    console.log("DELETE!");
  }

  return (
    <>
      <h1>Watch List</h1>
      <div className="stock-list">
        {items.map((item, index) => (
          <div className="stock-list-item" key={index}>
            <p>{item}</p>
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
