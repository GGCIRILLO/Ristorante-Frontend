import type { Pietanza } from "../types";

export async function getPietanze(): Promise<Pietanza[]> {
  const response = await fetch("/api/pietanze");

  if (!response.ok) {
    throw new Error(
      `Errore nel caricamento delle pietanze: ${response.status}`
    );
  }

  return response.json();
}

export async function aggiungiPietanzaOrdine(
  idOrdine: string | number,
  idPietanza: number,
  quantita: number
) {
  const response = await fetch(`/api/pietanze/ordine/${idOrdine}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_pietanza: idPietanza,
      quantita: quantita,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Errore nell'aggiunta della pietanza all'ordine: ${response.status}-${response.statusText}`
    );
  }

  return response.json();
}

export async function aggiungiMenuFissoOrdine(
  idOrdine: string | number,
  idMenuFisso: number
) {
  const response = await fetch(`/api/pietanze/menu-fisso/ordine/${idOrdine}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_menu: idMenuFisso,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Errore nell'aggiunta del menu fisso all'ordine: ${response.status}-${response.statusText}`
    );
  }

  return response.json();
}
