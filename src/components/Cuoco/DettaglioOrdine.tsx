import type { FC } from "react";
import type { OrdineCompleto, DettaglioPietanza } from "../../types";

interface DettaglioOrdineProps {
  selectedOrdine: OrdineCompleto | null;
  selectedPietanza: DettaglioPietanza | null;
  onSelectPietanza: (pietanza: DettaglioPietanza) => void;
  getPietanzaTipo: (pietanza: DettaglioPietanza) => string;
}

export const DettaglioOrdine: FC<DettaglioOrdineProps> = ({
  selectedOrdine,
  selectedPietanza,
  onSelectPietanza,
  getPietanzaTipo,
}) => {
  return (
    <div className="mb-6 flex-grow">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Dettaglio Ordine Selezionato
      </h2>

      {!selectedOrdine ? (
        <div className="border rounded-lg p-4 text-center text-gray-500 bg-white">
          Seleziona un ordine per visualizzare i dettagli.
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-y-auto max-h-64">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tipo
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
                    Quantità
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Note
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Pietanze singole */}
                {selectedOrdine?.pietanze?.map((pietanza) => (
                  <tr
                    key={`pietanza-${pietanza.id}`}
                    onClick={() => onSelectPietanza(pietanza)}
                    className={`hover:bg-gray-50 cursor-pointer ${
                      selectedPietanza?.id === pietanza.id ? "bg-sky-100" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getPietanzaTipo(pietanza)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {pietanza.pietanza.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {pietanza.quantita}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Note della pietanza, se disponibili */}-
                    </td>
                  </tr>
                ))}

                {/* Se ci sono menu fissi, mostrare le pietanze individualmente */}
                {selectedOrdine?.menu_fissi?.map((menuFisso) =>
                  menuFisso.pietanze.map((pietanza) => (
                    <tr
                      key={`menu-${menuFisso.menu.id}-pietanza-${pietanza.id}`}
                      onClick={() => onSelectPietanza(pietanza)}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedPietanza?.id === pietanza.id ? "bg-sky-100" : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Menu: {menuFisso.menu.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {pietanza.pietanza.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pietanza.quantita}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        -
                      </td>
                    </tr>
                  ))
                )}

                {!(
                  selectedOrdine?.pietanze ||
                  selectedOrdine?.pietanze?.length === 0
                ) &&
                  (!selectedOrdine.menu_fissi ||
                    selectedOrdine.menu_fissi.length === 0) && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        Nessuna pietanza in questo ordine.
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
