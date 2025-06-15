import type { FC } from "react";
import type { OrdineCompleto } from "../../types";

interface OrdiniDaPreparareProps {
  ordiniDaPreparare: OrdineCompleto[];
  isLoading: boolean;
  selectedOrdine: OrdineCompleto | null;
  onSelectOrdine: (ordine: OrdineCompleto) => void;
  formatDate: (date: string) => string;
}

export const OrdiniDaPreparare: FC<OrdiniDaPreparareProps> = ({
  ordiniDaPreparare,
  isLoading,
  selectedOrdine,
  onSelectOrdine,
  formatDate,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Ordini da Preparare
      </h2>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-y-auto max-h-64">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID Ordine
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tavolo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Persone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ora
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stato
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Caricamento ordini...
                  </td>
                </tr>
              ) : ordiniDaPreparare.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Nessun ordine da preparare.
                  </td>
                </tr>
              ) : (
                ordiniDaPreparare.map((ordine) => (
                  <tr
                    key={ordine.ordine.id}
                    onClick={() => onSelectOrdine(ordine)}
                    className={`hover:bg-gray-50 cursor-pointer ${
                      selectedOrdine?.ordine.id === ordine.ordine.id
                        ? "bg-blue-200"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ordine.ordine.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ordine.ordine.id_tavolo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ordine.ordine.num_persone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(ordine.ordine.data_ordine)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ordine.ordine.stato}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
