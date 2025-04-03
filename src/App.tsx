import "./css/App.css";
import Home from "./pages/Home";
import WatchList from "./pages/WatchList";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { StockProvider } from "./contexts/StockContext";
import CompanyProfile from "./pages/CompanyProfile";

const App = () => {
  return (
    <div>
      <StockProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route
              path="/companyprofile/:stockSymbol"
              element={<CompanyProfile />}
            />
          </Routes>
        </main>
      </StockProvider>
    </div>
  );
};

export default App;
