import "../css/StockList.css";
import { useStock } from "../contexts/StockContext";

function StockList() {
  const { stocks, stockPrices, removeStock } = useStock();

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
