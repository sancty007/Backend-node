import express from "express";

import type { MessageResponse } from "../types/index.js";

import emojiRoutes from "../routes/emojiRoutes.js";
import pokemonRoutes from "../routes/pokemon-routes.js";

const router = express.Router();

router.get<object, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojiRoutes);
router.use("/pokemons", pokemonRoutes);

export default router;
