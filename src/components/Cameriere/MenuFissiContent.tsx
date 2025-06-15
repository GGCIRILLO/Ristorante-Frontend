import { useState } from "react";
import { useMenuFissi } from "../../hooks/menuFissi";
import { useAggiungiMenuFissoOrdine } from "../../hooks/pietanze";
import type { MenuFissoCompleto } from "../../types";

interface MenuFissiContentProps {
  ordineId: string | null;
}

export const MenuFissiContent: React.FC<MenuFissiContentProps> = ({
  ordineId,
}) => {
  const { data: menuFissi, isLoading } = useMenuFissi();
  const aggiungiMenuMutation = useAggiungiMenuFissoOrdine();
  const [menuSelezionato, setMenuSelezionato] = useState<number | null>(null);

  // Formatta il prezzo per la visualizzazione
  const formatPrice = (price: number): string => {
    return price.toFixed(2).replace(".", ",") + " €";
  };

  // Funzione per aggiungere un menu fisso all'ordine
  const aggiungiMenuAllOrdine = (idMenuFisso: number) => {
    if (!ordineId) return;

    aggiungiMenuMutation.mutate({
      idOrdine: ordineId,
      idMenuFisso: idMenuFisso,
    });

    // Resetta il menu selezionato dopo l'aggiunta
    setMenuSelezionato(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!menuFissi || menuFissi.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Nessun menu fisso disponibile.
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Menu Fissi disponibili
      </h2>

      <div className="overflow-hidden border border-gray-200 rounded-lg mb-6">
        <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Dettagli
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Prezzo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {menuFissi.map((menuFisso: MenuFissoCompleto) => (
                <tr
                  key={menuFisso.menu.id}
                  className={
                    menuSelezionato === menuFisso.menu.id
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }
                  onClick={() => setMenuSelezionato(menuFisso.menu.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {menuFisso.menu.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {menuFisso.menu.nome}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>
                      {menuFisso.menu.descrizione && (
                        <p className="mb-2 italic">
                          {menuFisso.menu.descrizione}
                        </p>
                      )}
                      <p className="font-medium mb-1">Pietanze incluse:</p>
                      <ul className="list-disc pl-5">
                        {menuFisso.pietanze.map((pietanza) => (
                          <li key={pietanza.id}>{pietanza.nome}</li>
                        ))}
                      </ul>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatPrice(menuFisso.menu.prezzo)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {aggiungiMenuMutation.isSuccess && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Menu fisso aggiunto all'ordine con successo!
              </p>
            </div>
          </div>
        </div>
      )}

      {aggiungiMenuMutation.isError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Errore nell'aggiunta del menu fisso all'ordine. Riprova.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sezione pulsante di aggiunta all'ordine */}
      <div className="mt-4">
        <button
          onClick={() => {
            if (menuSelezionato) {
              aggiungiMenuAllOrdine(menuSelezionato);
            }
          }}
          disabled={
            !menuSelezionato || !ordineId || aggiungiMenuMutation.isPending
          }
          className={`w-full py-3 px-4 rounded-md flex items-center justify-center text-white font-medium
            ${
              !menuSelezionato || !ordineId || aggiungiMenuMutation.isPending
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            }`}
        >
          {aggiungiMenuMutation.isPending ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Aggiungendo...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Aggiungi Menu all'ordine
            </>
          )}
        </button>
      </div>

      {!ordineId && (
        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Seleziona prima un tavolo per creare un nuovo ordine.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
