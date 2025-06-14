import type { FC } from "react";

const CamerierePage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="top-0 z-10 h-16 bg-[#0080c8] flex items-center shadow-md px-4">
        <h1 className="ml-4 text-xl font-bold text-white">
          GESTIONE RISTORANTE
        </h1>
      </header>

      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Pagina del Cameriere
        </h1>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Torna indietro
        </button>
      </main>
    </div>
  );
};

export default CamerierePage;
