import type { Pokemon, PokemonQuery } from "../types/index.js";

import { pokemons } from "../data/data.js";

export class PokemonService {
  /**
   * Récupère tous les Pokémons avec pagination et filtres
   */
  static getAllPokemons(query: PokemonQuery = {}): {
    pokemons: Pokemon[];
    total: number;
    page: number;
    limit: number;
  } {
    const { page = 1, limit = 10, type, name } = query;

    let filteredPokemons = [...pokemons];

    // Filtrage par type
    if (type) {
      filteredPokemons = filteredPokemons.filter(pokemon =>
        pokemon.type.toLowerCase().includes(type.toLowerCase()),
      );
    }

    // Filtrage par nom
    if (name) {
      filteredPokemons = filteredPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPokemons = filteredPokemons.slice(startIndex, endIndex);

    return {
      pokemons: paginatedPokemons,
      total: filteredPokemons.length,
      page,
      limit,
    };
  }

  /**
   * Récupère un Pokémon par son ID
   */
  static getPokemonById(id: number): Pokemon | null {
    return pokemons.find(pokemon => pokemon.id === id) || null;
  }

  /**
   * Récupère les Pokémons par type
   */
  static getPokemonsByType(type: string): Pokemon[] {
    return pokemons.filter(pokemon =>
      pokemon.type.toLowerCase().includes(type.toLowerCase()),
    );
  }

  /**
   * Récupère les statistiques des Pokémons
   */
  static getPokemonStats(): {
    total: number;
    types: Record<string, number>;
    averageStats: {
      hp: number;
      attack: number;
      defense: number;
    };
  } {
    const types: Record<string, number> = {};

    pokemons.forEach((pokemon) => {
      const type = pokemon.type;
      types[type] = (types[type] || 0) + 1;
    });

    const totalHp = pokemons.reduce((sum, pokemon) => sum + pokemon.hp, 0);
    const totalAttack = pokemons.reduce((sum, pokemon) => sum + pokemon.attack, 0);
    const totalDefense = pokemons.reduce((sum, pokemon) => sum + pokemon.defense, 0);

    return {
      total: pokemons.length,
      types,
      averageStats: {
        hp: Math.round(totalHp / pokemons.length),
        attack: Math.round(totalAttack / pokemons.length),
        defense: Math.round(totalDefense / pokemons.length),
      },
    };
  }
}
