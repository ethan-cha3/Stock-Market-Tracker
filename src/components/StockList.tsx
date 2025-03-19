import "../css/StockList.css";

function StockList() {
  const items = ["MSFT", "APPL", "VOO", "AMZN", "SCHD"];
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
            <div className="stock-price"></div>
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
