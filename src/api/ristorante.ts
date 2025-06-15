import type { Ristorante } from "../types";

export async function getRistoranti(): Promise<Ristorante> {
  const response = await fetch("/api/ristoranti");

  if (!response.ok) {
    throw new Error(
      `Errore nel caricamento delle informazioni del ristorante: ${response.status}`
    );
  }

  const data = await response.json();
  return data[0];
}
