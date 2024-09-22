export interface IInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ILocation {
  id: number;
  name: string; // "Earth (C-137)"
  type: string;
  dimension: string; // "Dimension C-137"
  residents: string[]; // Lista de URLs de residentes
  url: string; // URL de la ubicación
  created: string; // Fecha de creación
}

export interface ILocationApiResponse {
  info: IInfo;
  results: ILocation[];
}
