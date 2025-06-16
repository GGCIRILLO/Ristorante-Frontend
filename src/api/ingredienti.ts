import type { Ingrediente } from "../types";

export async function getIngredienteDaRiordinare(): Promise<Ingrediente[]> {
  const response = await fetch("/api/ingredienti/da-riordinare");

  if (!response.ok) {
    throw new Error(
      `Errore nel caricamento degli ingredienti da riordinare: ${response.status}`
    );
  }

  return response.json();
}

export async function getIngredienti(): Promise<Ingrediente[]> {
  const response = await fetch("/api/ingredienti");

  if (!response.ok) {
    throw new Error(
      `Errore nel caricamento degli ingredienti: ${response.status}`
    );
  }

  return response.json();
}
