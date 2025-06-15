import type { Ordine } from "../types";

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
