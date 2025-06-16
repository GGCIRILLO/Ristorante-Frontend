import type { Tavolo } from "../types";

export async function getTavoliLiberi(): Promise<Tavolo[]> {
  const response = await fetch("/api/tavoli/liberi");

  if (!response.ok) {
    throw new Error(`Errore nel caricamento dei tavoli: ${response.status}`);
  }

  return response.json();
}

export async function getTavoliOccupati(): Promise<Tavolo[]> {
  const response = await fetch("/api/tavoli/occupati");

  if (!response.ok) {
    throw new Error(
      `Errore nel caricamento dei tavoli occupati: ${response.status}`
    );
  }

  return response.json();
}

export async function cambiaStatoTavolo(
  idTavolo: number,
  nuovoStato: "libero" | "occupato"
): Promise<void> {
  const response = await fetch(`/api/tavoli/${idTavolo}/stato`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stato: nuovoStato }),
  });

  if (!response.ok) {
    throw new Error(
      `Errore nel cambio di stato del tavolo: ${response.status}`
    );
  }
}
