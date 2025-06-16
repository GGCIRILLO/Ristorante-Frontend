import type { FC } from "react";
import type { OrdineCompleto, Scontrino } from "../../types";

interface ScontrinoDetailsProps {
  selectedTavoloId: number | null;
  scontrino: Scontrino | undefined;
  ordineCompleto: OrdineCompleto | undefined;
  loadingScontrino: boolean;
  loadingOrdine: boolean;
}

const ScontrinoDetails: FC<ScontrinoDetailsProps> = ({
  selectedTavoloId,
  scontrino,
  ordineCompleto,
  loadingScontrino,
  loadingOrdine,
}) => {
  if (!selectedTavoloId) return null;

  if (loadingScontrino) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-center text-gray-500">Caricamento scontrino...</p>
      </div>
    );
  }

  if (!scontrino) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-center text-gray-500">
          Nessuno scontrino disponibile per questo tavolo.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      {/* Intestazione dello scontrino */}
      <div className="flex-none">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Scontrino Tavolo {selectedTavoloId} - Ordine #
            {ordineCompleto?.ordine?.id}
          </h2>
          <p className="text-gray-600">
            Data: {new Date(scontrino.data_ordine).toLocaleDateString()}{" "}
            {new Date(scontrino.data_ordine).toLocaleTimeString()}
          </p>
        </div>

        <div className="grid grid-cols-3 font-medium mb-2 text-gray-700 border-t border-gray-200 pt-4">
          <span>Descrizione</span>
          <span className="text-right">Quantità</span>
          <span className="text-right">Prezzo</span>
        </div>
      </div>

      {/* Area scrollabile per i dettagli dell'ordine - contenuto che può scorrere */}
      <div className="flex-grow overflow-y-auto my-2 pr-2 max-h-[295px]">
        {loadingOrdine ? (
          <p className="text-center text-gray-500 py-2">
            Caricamento dettagli...
          </p>
        ) : ordineCompleto ? (
          <>
            {/* Pietanze individuali */}
            {ordineCompleto?.pietanze
              ?.filter((dettaglio) => !dettaglio.parte_di_menu)
              .map((dettaglio) => (
                <div
                  key={dettaglio.id}
                  className="grid grid-cols-3 py-1 text-gray-700"
                >
                  <span>{dettaglio.pietanza.nome}</span>
                  <span className="text-right">{dettaglio.quantita}</span>
                  <span className="text-right">
                    €
                    {(dettaglio.pietanza.prezzo * dettaglio.quantita).toFixed(
                      2
                    )}
                  </span>
                </div>
              ))}

            {/* Menu fissi */}
            {ordineCompleto?.menu_fissi?.map((menuFisso) => (
              <div key={menuFisso.menu.id} className="py-1">
                <div className="grid grid-cols-3 text-gray-700 font-medium">
                  <span>{menuFisso.menu.nome}</span>
                  <span className="text-right">1</span>
                  <span className="text-right">
                    €{menuFisso.menu.prezzo.toFixed(2)}
                  </span>
                </div>
                <div className="ml-4 text-gray-500 text-sm">
                  {menuFisso.pietanze.map((dettaglio) => (
                    <div key={dettaglio.id} className="grid grid-cols-3">
                      <span>- {dettaglio.pietanza.nome}</span>
                      <span className="text-right">{dettaglio.quantita}</span>
                      <span></span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-500 italic py-2">
            Dettagli consumazioni non disponibili
          </p>
        )}
      </div>

      {/* Totale*/}
      <div className="flex-none border-t border-gray-200 pt-4 pb-2 mt-auto bg-white">
        <div className="grid grid-cols-3 mb-2">
          <span className="font-medium">Totale consumazioni:</span>
          <span></span>
          <span className="text-right font-medium">
            €{scontrino.costo_totale.toFixed(2)}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>
              Totale coperto ({scontrino.num_coperti} × €
              {scontrino.costo_coperto.toFixed(2)}):
            </span>
            <span>€{scontrino.importo_coperto.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mb-2">
            <span>Totale complessivo:</span>
            <span>€{scontrino.totale_complessivo.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScontrinoDetails;
