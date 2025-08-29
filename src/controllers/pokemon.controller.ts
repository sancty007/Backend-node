import type { Request, Response } from "express";

import { z } from "zod";

import type { Pokemon, PokemonQuery } from "../types/index.js";

import { PokemonService } from "../services/pokemon.service.js";

export const PokemonUpdateSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  type: z.string().min(1, "Le type est requis"),
});

export class PokemonController {
  ;

  /**
   * GET /api/v1/pokemons - Récupère tous les Pokémons
   */
  static async getAllPokemons(req: Request, res: Response): Promise<void> {
    try {
      const query: PokemonQuery = {
        page: req.query.page ? Number.parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? Number.parseInt(req.query.limit as string) : 10,
        type: req.query.type as string,
        name: req.query.name as string,
      };

      const result = PokemonService.getAllPokemons(query);

      res.json({
        success: true,
        data: result.pokemons,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          pages: Math.ceil(result.total / result.limit),
        },
      });
    }
    catch (error) {
      res.status(500).json({
        success: false,
        error: `Erreur lors de la récupération des Pokémons ${error}`,
      });
    }
  }

  /**
   * GET /api/v1/pokemons/:id - Récupère un Pokémon par ID
   */
  static async getPokemonById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number.parseInt(req.params.id);

      if (Number.isNaN(id)) {
        res.status(400).json({
          success: false,
          error: "ID invalide",
        });
        return;
      }

      const pokemon: Pokemon | null = PokemonService.getPokemonById(id);

      if (!pokemon) {
        res.status(404).json({
          success: false,
          error: "Pokémon non trouvé",
        });
        return;
      }

      res.json({
        success: true,
        data: pokemon,
      });
    }
    catch (error) {
      res.status(500).json({
        success: false,
        error: `Erreur lors de la récupération du Pokémon  : ${error}`,
      });
    }
  }

  /**
   * GET /api/v1/pokemons/type/:type - Récupère les Pokémons par type
   */
  static async getPokemonsByType(req: Request, res: Response): Promise<void> {
    try {
      const type = req.params.type;
      const pokemons = PokemonService.getPokemonsByType(type);

      res.json({
        success: true,
        data: pokemons,
        count: pokemons.length,
      });
    }
    catch (error) {
      res.status(500).json({
        success: false,
        error: `Erreur lors de la récupération des Pokémons par type : ${error}`,
      });
    }
  }

  /**
   * GET /api/v1/pokemons/stats - Récupère les statistiques des Pokémons
   */
  static async getPokemonStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = PokemonService.getPokemonStats();

      res.json({
        success: true,
        data: stats,
      });
    }
    catch (error) {
      res.status(500).json({
        success: false,
        error: ` Erreur lors de la récupération des statistiques : ${error}`,
      });
    }
  }

  /**
   * PUT /api/v1/pokemons/:id - Modifier un pokemon
   */
  static async putPokemonById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number.parseInt(req.params.id);

      if (Number.isNaN(id)) {
        res.status(400).json({ success: false, error: "ID invalide" });
        return;
      }

      const pokemon = PokemonService.getPokemonById(id);

      if (!pokemon) {
        res.status(404).json({
          success: false,
          error: "Pokemon non trouvé",
        });
        return;
      }

      // Validate  with zod

      const { success, data, error } = PokemonUpdateSchema.safeParse(req.body);

      if (!success) {
        res.status(400).json({
          success: false,
          error: error.errors.map(e => `${e.path} is ${e.message}`),

        });
        console.warn("======>", error.errors.map(e => `${e.path} is  ${e.message}`));
      }

      const updatedPokemon = PokemonService.updatePokemonById(id, data as Partial<Pokemon>);

      if (!updatedPokemon) {
        res.status(404).json({
          success: false,
          error: "Pokemon non trouvé pour la mise à jour",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: updatedPokemon,
      });
    }
    catch (err) {
      res.status(500).json({
        success: false,
        error: `Erreur lors de la modification du Pokemon: ${err}`,
      });
    }
  }
}
