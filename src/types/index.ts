/* ---------- ristorante ---------- */
export interface Ristorante {
  id: number;
  nome: string;
  numero_tavoli: number;
  costo_coperto: number;
}

/* ---------- tavolo ---------- */
export interface Tavolo {
  id: number;
  max_posti: number;
  stato: "libero" | "occupato";
  id_ristorante: number;
}

/* ---------- ingrediente ---------- */
export interface Ingrediente {
  id: number;
  nome: string;
  quantita_disponibile: number;
  unita_misura: string;
  soglia_riordino: number;
}

/* ---------- categoria_pietanza ---------- */
export interface CategoriaPietanza {
  id: number;
  nome: string;
}

/* ---------- pietanza ---------- */
export interface Pietanza {
  id: number;
  nome: string;
  prezzo: number;
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
  id: number;
  nome: string;
  descrizione: string;
  id_pietanza: number;
  tempo_preparazione: number | null; // minuti, può essere null
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
  id: number;
  nome: string;
  prezzo: number;
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
  id: number;
  id_tavolo: number;
  num_persone: number;
  data_ordine: string; // ISO timestamp
  stato: StatoOrdine;
  id_ristorante: number;
  costo_totale: number;
}

/* ---------- dettaglio_ordine ---------- */
export interface DettaglioOrdine {
  id: number;
  id_ordine: number;
  id_pietanza: number;
  quantita: number;
  parte_di_menu: boolean;
  id_menu: number | null;
}

/* ---------- dettaglio ordine con più informazioni ---------- */
export interface DettaglioOrdineCompleto extends DettaglioOrdine {
  nome_pietanza: string;
  prezzo_pietanza: number;
  nome_menu?: string;
}

/* ---------- nuovi tipi per ordini completi ---------- */
export interface DettaglioPietanza {
  id: number;
  id_ordine: number;
  pietanza: Pietanza;
  quantita: number;
  parte_di_menu: boolean;
  id_menu: number | null;
}

export interface DettaglioMenuFisso {
  menu: MenuFisso;
  pietanze: DettaglioPietanza[];
}

export interface OrdineCompleto {
  ordine: Ordine;
  pietanze: DettaglioPietanza[];
  menu_fissi?: DettaglioMenuFisso[];
}

export interface MenuFissoCompleto {
  menu: MenuFisso;
  pietanze: Pietanza[];
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
  data_pagamento: string | null; // ISO timestamp, può essere null se non ancora pagato
}

export const CategoriePietanze: CategoriaPietanza[] = [
  { id: 1, nome: "Antipasti" },
  { id: 2, nome: "Primi" },
  { id: 3, nome: "Secondi" },
  { id: 4, nome: "Contorni" },
  { id: 5, nome: "Insalate" },
  { id: 6, nome: "Dolci" },
  { id: 7, nome: "Bevande" },
];

export interface RicettaCompleta {
  ricetta: Ricetta;
  ingredienti: {
    ingrediente: Ingrediente;
    quantita: number; // Quantità necessaria per la ricetta
  }[];
}

// {
//     "ricetta": {
//         "id": 1,
//         "nome": "Bruschetta pomodoro e basilico",
//         "descrizione": "Fette di pane casereccio tostate e condite con pomodoro fresco, basilico e olio d oliva",
//         "id_pietanza": 1,
//         "tempo_preparazione": 10,
//         "istruzioni": "Tagliare il pane a fette, tostarlo, strofinare con aglio, condire con pomodoro fresco a cubetti, basilico, sale e olio extravergine d oliva."
//     },
//     "ingredienti": [
//         {
//             "ingrediente": {
//                 "id": 1,
//                 "nome": "Pomodoro",
//                 "quantita_disponibile": 49.599999999999994,
//                 "unita_misura": "kg",
//                 "soglia_riordino": 10
//             },
