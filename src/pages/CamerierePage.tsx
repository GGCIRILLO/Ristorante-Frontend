import type { FC } from "react";
import { useState, useEffect } from "react";
import { Icons } from "../assets";
import { SelectTavoloModal } from "../components/SelectTavoloModal";

const CamerierePage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Apre la modale automaticamente all'avvio della pagina
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
          >
            <span className="text-lg font-medium text-gray-800">
              Nuovo Ordine
            </span>
            <img src={Icons.restaurantMenu} alt="" className="w-8 h-8" />
          </button>

          <button
            className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition opacity-50 cursor-not-allowed"
            disabled
          >
            <span className="text-lg font-medium text-gray-800">
              Ordini in Corso
            </span>
            <img src={Icons.person} alt="" className="w-8 h-8" />
          </button>
        </div>

        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Torna indietro
          </button>
        </div>
      </main>

      {/* Modale per la creazione di un nuovo ordine */}
      <SelectTavoloModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default CamerierePage;
