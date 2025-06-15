import type { Ordine, OrdineCompleto } from "../types";

interface CreateOrdinePayload {
  id_tavolo: number;
  num_persone: number;
  id_ristorante: number;
}

export async function createOrdine(
  payload: CreateOrdinePayload
): Promise<Ordine> {
  const response = await fetch("/api/ordini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Errore nella creazione dell'ordine: ${response.status}`);
  }

  return response.json();
}

export async function getOrdini(): Promise<Ordine[]> {
  const response = await fetch("/api/ordini");

  if (!response.ok) {
    throw new Error(`Errore nel caricamento degli ordini: ${response.status}`);
  }

  return response.json();
}

export async function getOrdineCompleto(
  id: number | string
): Promise<OrdineCompleto> {
  const response = await fetch(`/api/ordini/${id}/completo`);

  if (!response.ok) {
    throw new Error(`Errore nel caricamento dell'ordine: ${response.status}`);
  }

  return response.json();
}
