// Types communs pour l'API
export type MessageResponse = {
  message: string;
};

export type ErrorResponse = {
  error: string;
  status: number;
};

// Types pour les Pokémons
export type Pokemon = {
  id: number;
  name: string;
  type: string;
  hp: number;
  attack: number;
  defense: number;
  image: string;
  abilities: string[];
};

// Types pour les Emojis
export type EmojiResponse = string[];

// Types pour les requêtes
export type PaginationQuery = {
  page?: number;
  limit?: number;
};

export type PokemonQuery = {
  type?: string;
  name?: string;
} & PaginationQuery;
