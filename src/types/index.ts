/* ---------- ristorante ---------- */
export interface Ristorante {
  id_ristorante: number;
  nome: string;
  numero_tavoli: number;
  costo_coperto: number;
}

/* ---------- tavolo ---------- */
export interface Tavolo {
  id_tavolo: number;
  max_posti: number;
  stato: "libero" | "occupato";
  id_ristorante: number;
}

/* ---------- ingrediente ---------- */
export interface Ingrediente {
  id_ingrediente: number;
  nome: string;
  quantita_disponibile: number;
  unita_misura: string;
  soglia_riordino: number;
}

/* ---------- categoria_pietanza ---------- */
export interface CategoriaPietanza {
  id_categoria: number;
  nome: string;
}

/* ---------- pietanza ---------- */
export interface Pietanza {
  id_pietanza: number;
  nome: string;
  prezzo: number; // DECIMAL(10,2)
  id_categoria: number | null;
  disponibile: boolean;
}

/* ---------- menu (relazione ristorante ↔ pietanza) ---------- */
export interface Menu {
  id_ristorante: number;
  id_pietanza: number;
}

/* ---------- ricetta ---------- */
export interface Ricetta {
  id_ricetta: number;
  nome: string;
  descrizione: string;
  id_pietanza: number;
  tempo_preparazione: number | null; // minuti
  istruzioni: string | null;
}

/* ---------- ricetta_ingrediente ---------- */
export interface RicettaIngrediente {
  id_ricetta: number;
  id_ingrediente: number;
  quantita: number;
}

/* ---------- menu_fisso ---------- */
export interface MenuFisso {
  id_menu: number;
  nome: string;
  prezzo: number; // DECIMAL(10,2)
  descrizione: string | null;
}

/* ---------- composizione_menu_fisso ---------- */
export interface ComposizioneMenuFisso {
  id_menu: number;
  id_pietanza: number;
}

/* ---------- ordine ---------- */
export type StatoOrdine =
  | "in_attesa"
  | "in_preparazione"
  | "pronto"
  | "consegnato"
  | "pagato";

export interface Ordine {
  id_ordine: number;
  id_tavolo: number;
  num_persone: number;
  data_ordine: string; // ISO timestamp
  stato: StatoOrdine;
  id_ristorante: number;
  costo_totale: number;
}

/* ---------- dettaglio_ordine_pietanza ---------- */
export interface DettaglioOrdinePietanza {
  id_dettaglio: number;
  id_ordine: number;
  id_pietanza: number;
  quantita: number;
  parte_di_menu: boolean;
  id_menu: number | null;
}

/* ---------- scontrino ---------- */
export interface Scontrino {
  id_ordine: number;
  id_tavolo: number;
  data_ordine: string; // ISO timestamp
  costo_totale: number;
  num_coperti: number;
  costo_coperto: number;
  importo_coperto: number;
  totale_complessivo: number;
  data_pagamento: string | null; // ISO timestamp
}
