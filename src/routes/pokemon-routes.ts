import express from "express";

import { PokemonController } from "../controllers/pokemon-controller.js";

const router = express.Router();

// Routes pour les Pokémons
router.get("/", PokemonController.getAllPokemons);
router.get("/stats", PokemonController.getPokemonStats);
router.get("/type/:type", PokemonController.getPokemonsByType);
router.get("/:id", PokemonController.getPokemonById);

export default router;
