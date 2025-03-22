import StockList from "../components/StockList";
import { useState } from "react";
import "../css/Home.css";
import { searchStocks } from "../services/api.ts";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    searchStocks(searchQuery);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for stocks..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <StockList />
    </div>
  );
};

export default Home;
