import "./css/App.css";
import Home from "./pages/Home";
import WatchList from "./pages/WatchList";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<WatchList />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
