import { useState } from "react";
import type { FC } from "react";
import {
  useIngredienti,
  useIngredientiDaRiordinare,
} from "../../hooks/ingredienti";
import type { Ingrediente } from "../../types";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const ReportIngredientiContent: FC = () => {
  const navigate = useNavigate();
  const { data: ingredienti, isLoading } = useIngredienti();
  const { data: ingredientiDaRiordinare } = useIngredientiDaRiordinare();
  const [reportGenerato, setReportGenerato] = useState(false);

  const queryClient = useQueryClient();

  // Funzione per generare il report
  const handleGeneraReport = () => {
    // Invalidate queries to ensure fresh data
    queryClient.invalidateQueries({ queryKey: ["ingredienti"] });
    queryClient.invalidateQueries({ queryKey: ["ingredientiDaRiordinare"] });
    setReportGenerato(true);
  };

  // Funzione per determinare lo stato di un ingrediente
  const getStatoIngrediente = (
    ingrediente: Ingrediente
  ): "ok" | "da_ordinare" => {
    return ingrediente.quantita_disponibile < ingrediente.soglia_riordino
      ? "da_ordinare"
      : "ok";
  };

  // Calcolo delle statistiche
  const totaleIngredienti = ingredienti?.length || 0;
  const totaleIngredientiDaOrdinare = ingredientiDaRiordinare?.length || 0;
  const totaleIngredientiOk = totaleIngredienti - totaleIngredientiDaOrdinare;

  // Funzione per stampare il report
  const handleStampaReport = () => {
    window.print();
  };

  return (
    <div className="w-[1080px] h-[720px] bg-white rounded-lg shadow-md p-6 mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Genera Report – Ingredienti
        </h2>
        <button
          onClick={handleGeneraReport}
          className="bg-[#0077b6] hover:bg-[#00629a] text-white font-semibold py-2 px-4 rounded"
        >
          Genera Report
        </button>
      </div>

      {reportGenerato ? (
        <>
          {/* Tabella degli ingredienti con scroll */}
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
            <div className="overflow-y-auto max-h-[380px]">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ingrediente
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Qtà disponibile
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      UM
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Soglia
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
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        Caricamento ingredienti...
                      </td>
                    </tr>
                  ) : ingredienti && ingredienti.length > 0 ? (
                    // Ordina gli ingredienti: prima quelli sotto soglia, poi quelli sopra soglia
                    [...ingredienti]
                      .sort((a, b) => {
                        // Prima ordina per stato (da riordinare in cima)
                        const statoA = getStatoIngrediente(a);
                        const statoB = getStatoIngrediente(b);

                        if (
                          statoA === "da_ordinare" &&
                          statoB !== "da_ordinare"
                        )
                          return -1;
                        if (
                          statoA !== "da_ordinare" &&
                          statoB === "da_ordinare"
                        )
                          return 1;

                        // A parità di stato, ordina alfabeticamente per nome
                        return a.nome.localeCompare(b.nome);
                      })
                      .map((ingrediente) => (
                        <tr
                          key={ingrediente.id}
                          className={
                            getStatoIngrediente(ingrediente) === "da_ordinare"
                              ? "bg-red-50"
                              : ""
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {ingrediente.nome}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {ingrediente.quantita_disponibile}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {ingrediente.unita_misura}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {ingrediente.soglia_riordino}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                                getStatoIngrediente(ingrediente) === "ok"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {getStatoIngrediente(ingrediente) === "ok"
                                ? "OK"
                                : "Da ordinare"}
                            </span>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        Nessun ingrediente trovato.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Box delle statistiche */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-center mb-4">
              Statistiche Ingredienti
            </h3>
            <div className="flex justify-center gap-8">
              <div className="border-2 border-[#0077b6] text-[#0077b6] rounded-lg p-4 w-40 text-center">
                <div className="text-2xl font-bold">{totaleIngredienti}</div>
                <div className="text-sm font-medium">Totale</div>
              </div>

              <div className="border-2 border-[#b0281a] text-[#b0281a] rounded-lg p-4 w-40 text-center">
                <div className="text-2xl font-bold">
                  {totaleIngredientiDaOrdinare}
                </div>
                <div className="text-sm font-medium">Da ordinare</div>
              </div>

              <div className="border-2 border-[#2eaf6e] text-[#2eaf6e] rounded-lg p-4 w-40 text-center">
                <div className="text-2xl font-bold">{totaleIngredientiOk}</div>
                <div className="text-sm font-medium">Disponibili</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-80 flex items-center justify-center text-gray-500 border border-gray-200 rounded-lg">
          Premi il pulsante "Genera Report" per visualizzare i dati degli
          ingredienti
        </div>
      )}

      {/* Pulsanti in basso */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#b0281a] hover:bg-[#961d11] text-white font-semibold py-2 px-6 rounded"
        >
          ← Indietro
        </button>

        {reportGenerato && (
          <button
            onClick={handleStampaReport}
            className="bg-[#d97908] hover:bg-[#c06e06] text-white font-semibold py-2 px-6 rounded"
          >
            Stampa Report
          </button>
        )}
      </div>
    </div>
  );
};

export default ReportIngredientiContent;
