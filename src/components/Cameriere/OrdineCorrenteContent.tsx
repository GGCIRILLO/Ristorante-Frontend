import { useOrdineById } from "../../hooks/ordini";
import { useRistorante } from "../../hooks/ristorante";

interface OrdineCorrenteContentProps {
  ordineId: string | null;
}

export const OrdineCorrenteContent: React.FC<OrdineCorrenteContentProps> = ({
  ordineId,
}) => {
  const { data: ordineCompleto, isLoading: loadingOrdine } = useOrdineById(
    ordineId || ""
  );

  const { data: ristorante } = useRistorante();

  // Formatta il prezzo per la visualizzazione
  const formatPrice = (price: number): string => {
    return price.toFixed(2).replace(".", ",") + " €";
  };

  if (loadingOrdine) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!ordineId || !ordineCompleto) {
    return (
      <div className="p-4 text-center text-gray-500">
        Nessun ordine selezionato.
      </div>
    );
  }

  // Estrai l'ordine dal risultato completo
  const { ordine, pietanze, menu_fissi } = ordineCompleto;

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Ordine #{ordine.id}
        </h2>
        <p className="text-gray-600">
          Tavolo: {ordine.id_tavolo} | Coperti: {ordine.num_persone} | Stato:{" "}
          {ordine.stato}
        </p>
      </div>

      {/* Sezione menu fissi */}
      {menu_fissi && menu_fissi.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Menu fissi</h3>
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <div className="overflow-y-auto max-h-40">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nome menu
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Pietanze incluse
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
                  {menu_fissi.map((menuFisso) => (
                    <tr key={menuFisso.menu.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {menuFisso.menu.nome}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <ul className="list-disc pl-5">
                          {menuFisso.pietanze.map((pietanza) => (
                            <li key={pietanza.id}>
                              {pietanza.pietanza.nome} ({pietanza.quantita}x)
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(menuFisso.menu.prezzo)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sezione pietanze singole */}
      {pietanze?.filter((p) => !p.parte_di_menu).length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Pietanze singole
          </h3>
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <div className="overflow-y-auto max-h-40">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nome pietanza
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantità
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Prezzo unitario
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Totale
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pietanze
                    .filter((item) => !item.parte_di_menu)
                    .map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.pietanza.nome}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantita}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatPrice(item.pietanza.prezzo)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatPrice(item.pietanza.prezzo * item.quantita)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Riepilogo del conto */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Subtotale:</span>
          <span className="text-gray-900 font-medium">
            {formatPrice(ordineCompleto.ordine.costo_totale)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">
            Coperto ({ordine.num_persone}x{" "}
            {formatPrice(ristorante?.costo_coperto ?? 2.0)}):
          </span>
          <span className="text-gray-900 font-medium">
            {formatPrice(
              ordine.num_persone * (ristorante?.costo_coperto ?? 2.0)
            )}
          </span>
        </div>
        <div className="flex justify-between items-center font-semibold text-lg">
          <span>Totale:</span>
          <span>
            {formatPrice(
              ordine.costo_totale +
                ordine.num_persone * (ristorante?.costo_coperto ?? 2.0)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
