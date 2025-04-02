import "../css/StockList.css";
import { useEffect, useState } from "react";
import { getStockInfo } from "../services/api.ts";
import { useStock } from "../contexts/StockContext";

function StockList() {
  // retrieve stock list from AWSDynamoDB
  const { stocks, removeStock } = useStock();
  // retrieve stock prices for each stock in the list from Finnhub
  const [stockPrices, setStockPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchStockPrices = async () => {
      const prices: { [key: string]: number } = {};

      for (const symbol of stocks) {
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
  }, [stocks]);

  function onDeleteClick(stock: string) {
    removeStock(stock);
  }

  return (
    <>
      <h1>Watch List</h1>
      <div className="stock-list">
        {stocks.map((item, index) => (
          <div className="stock-list-item" key={index}>
            <p className="stock-symbol">{item}</p>
            <div className="stock-price">
              {stockPrices[item] !== undefined
                ? `$${stockPrices[item].toFixed(2)}`
                : "Loading..."}
            </div>
            <button className="delete-btn" onClick={() => onDeleteClick(item)}>
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default StockList;
