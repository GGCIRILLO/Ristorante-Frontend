import { useEffect, useState } from "react";
import { usePietanze, useAggiungiPietanzaOrdine } from "../../hooks/pietanze";
import { CategoriePietanze, type Pietanza } from "../../types";

interface PietanzeContentProps {
  ordineId: string | null;
}

export const PietanzeContent: React.FC<PietanzeContentProps> = ({
  ordineId,
}) => {
  const { data: pietanze, isLoading: loadingPietanze } = usePietanze();

  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(
    null
  );
  const [selectedPietanza, setSelectedPietanza] = useState<Pietanza | null>(
    null
  );
  const [quantita, setQuantita] = useState<number>(1);
  const [note, setNote] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Filtra le pietanze in base alla categoria selezionata
  const filteredPietanze = pietanze?.filter(
    (pietanza: Pietanza) =>
      selectedCategoria === null || pietanza.id_categoria === selectedCategoria
  );

  // Hook per aggiungere la pietanza all'ordine
  const aggiungiMutation = useAggiungiPietanzaOrdine();

  // Resetta i messaggi dopo 3 secondi
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // Trova la categoria di una pietanza
  const getCategoriaName = (id_categoria: number | null): string => {
    if (id_categoria === null) return "Non specificata";
    const categoria = CategoriePietanze?.find((cat) => cat.id === id_categoria);
    return categoria ? categoria.nome : "Non specificata";
  };

  // Gestisce il click su una pietanza nella tabella
  const handlePietanzaClick = (pietanza: Pietanza) => {
    setSelectedPietanza(pietanza);
    setErrorMessage("");
  };

  // Gestisce l'aggiunta della pietanza all'ordine
  const handleAggiungiPietanza = async () => {
    if (!selectedPietanza || !ordineId) return;

    try {
      await aggiungiMutation.mutateAsync({
        idOrdine: ordineId,
        idPietanza: selectedPietanza.id,
        quantita,
      });

      setSuccessMessage(`${selectedPietanza.nome} aggiunto all'ordine.`);
      setQuantita(1); // Reset quantità
      setNote(""); // Reset note
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Si è verificato un errore.");
      }
    }
  };

  // Formatta il prezzo per la visualizzazione
  const formatPrice = (price: number): string => {
    return price.toFixed(2).replace(".", ",") + " €";
  };

  if (loadingPietanze || !pietanze) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Pietanze disponibili
      </h2>

      {/* Dropdown per il filtro delle categorie */}
      <div className="mb-3">
        <label
          htmlFor="categoriaFilter"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Filtra per categoria
        </label>
        <select
          id="categoriaFilter"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={selectedCategoria === null ? "" : selectedCategoria}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedCategoria(value === "" ? null : Number(value));
          }}
        >
          <option value="">Tutte le categorie</option>
          {CategoriePietanze?.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Tabella delle pietanze */}
      <div className="overflow-hidden border border-gray-200 rounded-lg mb-3 flex-grow">
        <div className="overflow-y-auto absolute-bottom h-full">
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
                  Categoria
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
              {filteredPietanze?.map((pietanza: Pietanza) => (
                <tr
                  key={pietanza.id}
                  onClick={() => handlePietanzaClick(pietanza)}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    selectedPietanza?.id === pietanza.id ? "bg-blue-100" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {pietanza.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {pietanza.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getCategoriaName(pietanza.id_categoria)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatPrice(pietanza.prezzo)}
                  </td>
                </tr>
              ))}
              {filteredPietanze?.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Nessuna pietanza trovata.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sezione di aggiunta all'ordine - Questa parte sarà fissa in basso */}
      <div className="flex-shrink-0 border border-gray-200 rounded-md p-4 bg-white">
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 p-3 rounded-md">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-md">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="quantita"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantità
            </label>
            <input
              type="number"
              id="quantita"
              min="1"
              value={quantita}
              onChange={(e) =>
                setQuantita(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Note (opzionale)
            </label>
            <input
              type="text"
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Es. senza cipolla, ben cotto, etc."
            />
          </div>
        </div>

        <button
          onClick={handleAggiungiPietanza}
          disabled={
            !selectedPietanza || !ordineId || aggiungiMutation.isPending
          }
          className={`w-full py-2 px-4 rounded-md flex items-center justify-center text-white font-medium
            ${
              !selectedPietanza || !ordineId || aggiungiMutation.isPending
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {aggiungiMutation.isPending ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              Aggiungi all'ordine
            </>
          )}
        </button>
      </div>
    </div>
  );
};
