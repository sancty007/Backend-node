import express from "express";

import type { MessageResponse } from "../types/index.js";

import authRoutes from "../routes/auth.routes.js";
import pokemonRoutes from "../routes/pokemon.routes.js";

const router = express.Router();

router.get<object, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/pokemons", pokemonRoutes);
router.use("/auth", authRoutes);

export default router;
