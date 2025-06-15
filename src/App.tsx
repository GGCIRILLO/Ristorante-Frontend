import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CuocoPage from "./pages/CuocoPage";
import CassierePage from "./pages/CassierePage";
import DirettorePage from "./pages/DirettorePage";
import GestioneOrdinePage from "./pages/GestioneOrdinePage";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cameriere" element={<GestioneOrdinePage />} />
          <Route
            path="/cameriere/ordini/:id"
            element={<GestioneOrdinePage />}
          />
          <Route path="/cuoco" element={<CuocoPage />} />
          <Route path="/cassiere" element={<CassierePage />} />
          <Route path="/direttore" element={<DirettorePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
