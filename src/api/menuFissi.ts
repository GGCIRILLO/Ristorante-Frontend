import type { MenuFissoCompleto } from "../types";

export async function getMenuFissi(): Promise<MenuFissoCompleto[]> {
  const response = await fetch("/api/menu-fissi/completi");

  if (!response.ok) {
    throw new Error(
      `Errore nel caricamento dei menu fissi: ${response.status}`
    );
  }

  return response.json();
}
