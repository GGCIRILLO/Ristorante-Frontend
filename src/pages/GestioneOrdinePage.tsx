import type { FC } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs } from "../components/Tabs";
import { SelectTavoloModal } from "../components/SelectTavoloModal";

const GestioneOrdinePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("ID Ordine:", id);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ordineCreato, setOrdineCreato] = useState<boolean>(Boolean(id));

  // Se non c'è un ID nell'URL, mostra la modale
  useEffect(() => {
    if (!id) {
      setIsModalOpen(true);
      setOrdineCreato(false);
    } else {
      setIsModalOpen(false);
      setOrdineCreato(true);
    }
  }, [id]);

  // Gestisce la chiusura della modale
  const handleCloseModal = () => {
    if (!ordineCreato) {
      // Se l'utente chiude la modale senza creare un ordine, torna alla home
      navigate("/");
    } else {
      setIsModalOpen(false);
    }
  };

  const tabs = [
    {
      id: "pietanze",
      label: "Pietanze",
      content: (
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-700">
            Pietanze del menu
          </h2>
          <p className="text-gray-500 mt-2">Contenuto in fase di sviluppo...</p>
        </div>
      ),
    },
    {
      id: "menu_fissi",
      label: "Menu Fissi",
      content: (
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-700">
            Menu Fissi disponibili
          </h2>
          <p className="text-gray-500 mt-2">Contenuto in fase di sviluppo...</p>
        </div>
      ),
    },
    {
      id: "ordine_corrente",
      label: "Ordine Corrente",
      content: (
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-700">
            Riepilogo ordine #{id}
          </h2>
          <p className="text-gray-500 mt-2">Contenuto in fase di sviluppo...</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="top-0 z-10 h-16 bg-[#0080c8] flex items-center shadow-md px-4">
        <h1 className="ml-4 text-xl font-bold text-white">
          GESTIONE ORDINI - CAMERIERE
        </h1>
      </header>

      <main className="container mx-auto py-6 px-4">
        {ordineCreato ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Tabs tabs={tabs} defaultTabId="pietanze" />

            <div className="mt-6 flex justify-start">
              <button
                onClick={() => {
                  // Torna alla home quando si clicca su indietro
                  navigate("/");
                }}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Indietro
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <div className="text-center">
              <p className="text-lg text-gray-600">
                Seleziona un tavolo per iniziare l'ordine
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Modale per la selezione del tavolo */}
      <SelectTavoloModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default GestioneOrdinePage;
