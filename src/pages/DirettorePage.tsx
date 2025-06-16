import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import ReportIngredientiContent from "../components/Direttore/ReportIngredientiContent";

const DirettorePage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="top-0 z-10 h-16 bg-[#0080c8] flex items-center shadow-md px-4">
        <button
          className="text-white font-bold text-lg"
          onClick={() => navigate("/")}
        >
          GESTIONE RISTORANTE - Direttore
        </button>
      </header>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Gestione Statistiche
        </h1>

        {/* Sezione Report Ingredienti */}
        <ReportIngredientiContent />
      </main>
    </div>
  );
};

export default DirettorePage;
