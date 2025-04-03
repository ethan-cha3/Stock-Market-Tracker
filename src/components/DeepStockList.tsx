import "../css/DeepStockList.css";
import { useEffect, useState } from "react";
import { getStockInfo } from "../services/api.ts";
import { useStock } from "../contexts/StockContext";

function StockList() {
  // retrieve stock list from AWSDynamoDB
  const { stocks, removeStock } = useStock();
  // retrieve stock prices for each stock in the list from Finnhub
  const [stockPrices, setStockPrices] = useState<{
    [key: string]: { currentPrice: number; priceChange: number };
  }>({});

  useEffect(() => {
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

    fetchStockPrices();
  }, [stocks]);

  function onDeleteClick(stock: string) {
    removeStock(stock);
  }

  return (
    <>
      <h1>Watch List</h1>
      <div className="stock-list">
        {stocks.map((item, index) => {
          const stockData = stockPrices[item];
          const currentPrice =
            stockData?.currentPrice !== undefined
              ? `$${stockData.currentPrice.toFixed(2)}`
              : "--";
          const priceChange = stockData?.priceChange ?? 0;
          const priceClass =
            priceChange > 0
              ? "stock-price-pos"
              : priceChange < 0
              ? "stock-price-neg"
              : "stock-price-neutral";

          return (
            <div className="stock-list-item" key={index}>
              <p className="stock-symbol">{item}</p>
              <div className={priceClass}>{currentPrice}</div>
              <button
                className="delete-btn"
                onClick={() => onDeleteClick(item)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default StockList;
