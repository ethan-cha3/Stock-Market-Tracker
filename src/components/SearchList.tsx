import "../css/SearchList.css";

interface SearchItem {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

interface Props {
  items: SearchItem[];
}

function onAddClick() {
  console.log("ADD!");
}

const SearchList = ({ items }: Props) => {
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
              <button className="add-btn" onClick={onAddClick}>
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
