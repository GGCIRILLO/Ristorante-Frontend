import type { FC } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs } from "../components/Cameriere/Tabs";
import { SelectTavoloModal } from "../components/Cameriere/SelectTavoloModal";
import { PietanzeContent } from "../components/Cameriere/PietanzeContent";
import { MenuFissiContent } from "../components/Cameriere/MenuFissiContent";
import { OrdineCorrenteContent } from "../components/Cameriere/OrdineCorrenteContent";
import { Icons } from "../assets";

const CamerierePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Stato locale per l'ID dell'ordine
  const [ordineId, setOrdineId] = useState<string | null>(id || null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ordineCreato, setOrdineCreato] = useState<boolean>(Boolean(ordineId));

  // Se non c'è un ID dell'ordine, mostra la modale
  useEffect(() => {
    if (!ordineId) {
      setIsModalOpen(true);
      setOrdineCreato(false);
    } else {
      setIsModalOpen(false);
      setOrdineCreato(true);
    }
  }, [ordineId]);

  // Callback che viene chiamata quando un nuovo ordine viene creato dalla modale
  const handleOrdineCreato = (nuovoOrdineId: number) => {
    setOrdineId(String(nuovoOrdineId));
    setOrdineCreato(true);
  };

  // Gestisce la chiusura della modale
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const tabs = [
    {
      id: "pietanze",
      label: "Pietanze",
      icon: Icons.pietanze,
      content: <PietanzeContent ordineId={ordineId} />,
    },
    {
      id: "menu_fissi",
      label: "Menu Fissi",
      icon: Icons.menu,
      content: <MenuFissiContent ordineId={ordineId} />,
    },
    {
      id: "ordine_corrente",
      label: "Ordine Corrente",
      icon: Icons.ordine,
      content: <OrdineCorrenteContent ordineId={ordineId} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="top-0 z-10 h-16 bg-[#0080c8] flex items-center shadow-md px-4">
        <button
          onClick={() => navigate("/")}
          className="text-white font-bold text-lg mr-4"
        >
          GESTIONE ORDINI - CAMERIERE
        </button>
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
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Seleziona Tavolo
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modale per la selezione del tavolo */}
      <SelectTavoloModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onOrdineCreato={handleOrdineCreato}
      />
    </div>
  );
};

export default CamerierePage;
