import express from "express";

import { EmojiController } from "../controllers/emoji-controller.js";

const router = express.Router();

// Routes pour les Emojis
router.get("/", EmojiController.getAllEmojis);
router.get("/random", EmojiController.getRandomEmoji);
router.get("/random/:count", EmojiController.getRandomEmojis);
router.get("/category/:category", EmojiController.getEmojisByCategory);

export default router;
