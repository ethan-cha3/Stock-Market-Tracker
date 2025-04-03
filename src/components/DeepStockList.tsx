import "../css/DeepStockList.css";
import { useStock } from "../contexts/StockContext";
import { Link } from "react-router-dom";

function DeepStockList() {
  const { stocks, stockPrices, removeStock } = useStock();

  function onDeleteClick(stock: string) {
    removeStock(stock);
  }

  return (
    <>
      <h1>Watch List</h1>
      <div className="deep-stock-list">
        <div className="deep-stock-list-item header-row">
          <p className="deep-stock-symbol-header">Symbol</p>
          <p className="deep-stock-price">Current Price</p>
          <p className="deep-change">Price Change</p>
          <p className="deep-percent-change">Percent Change</p>
          <p className="deep-high-price">High Price</p>
          <p className="deep-low-price">Low Price</p>
          <p className="deep-open-price">Open Price</p>
          <p className="deep-previous-close-price">Previous Close</p>
        </div>
        {stocks.map((item, index) => {
          const stockData = stockPrices[item];
          const currentPrice = stockData?.currentPrice ?? 0;
          const priceChange = stockData?.priceChange ?? 0;
          const percentChange = stockData?.percentChange ?? 0;
          const highPrice = stockData?.highPrice ?? 0;
          const lowPrice = stockData?.lowPrice ?? 0;
          const openPrice = stockData?.openPrice ?? 0;
          const previousClosePrice = stockData?.previousClosePrice ?? 0;

          return (
            <div className="deep-stock-list-item" key={index}>
              <div>
                <Link
                  to={`/companyprofile/${item}`}
                  className="deep-stock-symbol"
                >
                  {item}
                </Link>
              </div>
              <div className="deep-stock-price">${currentPrice}</div>
              <div className="deep-change">${priceChange}</div>
              <div className="deep-percent-change">{percentChange}%</div>
              <div className="deep-high-price">${highPrice}</div>
              <div className="deep-low-price">${lowPrice}</div>
              <div className="deep-open-price">${openPrice}</div>
              <div className="deep-previous-close-price">
                ${previousClosePrice}
              </div>
              <button
                className="deep-delete-btn"
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

export default DeepStockList;
