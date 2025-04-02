import "../css/SearchList.css";
import { useStock } from "../contexts/StockContext";

interface SearchItem {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

interface Props {
  items: SearchItem[];
}

const SearchList = ({ items }: Props) => {
  const { addStock } = useStock();
  function onAddClick(stock: string) {
    addStock(stock);
  }

  return (
    <div className="search-list">
      {items.length === 0 ? (
        <p>No Results</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <div className="search-list-item" key={index}>
              <div className="text">
                <b>{item.displaySymbol}</b>
                <small>{item.description}</small>
              </div>
              <button
                className="add-btn"
                onClick={() => onAddClick(item.displaySymbol)}
              >
                +
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchList;
