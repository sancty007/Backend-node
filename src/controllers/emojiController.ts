// eslint-disable-next-line unicorn/filename-case
import type { Request, Response } from "express";

import { EmojiService } from "../services/emojiService.js";

export class EmojiController {
  /**
   * GET /api/v1/emojis - Récupère tous les emojis
   */
  static async getAllEmojis(req: Request, res: Response): Promise<void> {
    try {
      const emojis = EmojiService.getAllEmojis();

      res.json({
        success: true,
        data: emojis,
        count: emojis.length,
      });
    }
    catch (error) {
      res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération des emojis",
      });
    }
  }

  /**
   * GET /api/v1/emojis/random - Récupère un emoji aléatoire
   */
  static async getRandomEmoji(req: Request, res: Response): Promise<void> {
    try {
      const emoji = EmojiService.getRandomEmoji();

      res.json({
        success: true,
        data: emoji,
      });
    }
    catch (error) {
      res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération de l'emoji aléatoire",
      });
    }
  }

  /**
   * GET /api/v1/emojis/random/:count - Récupère plusieurs emojis aléatoires
   */
  static async getRandomEmojis(req: Request, res: Response): Promise<void> {
    try {
      const count = req.params.count ? Number.parseInt(req.params.count) : 5;

      if (isNaN(count) || count < 1 || count > 20) {
        res.status(400).json({
          success: false,
          error: "Le nombre doit être entre 1 et 20",
        });
        return;
      }

      const emojis = EmojiService.getRandomEmojis(count);

      res.json({
        success: true,
        data: emojis,
        count: emojis.length,
      });
    }
    catch (error) {
      res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération des emojis aléatoires",
      });
    }
  }

  /**
   * GET /api/v1/emojis/category/:category - Récupère les emojis par catégorie
   */
  static async getEmojisByCategory(req: Request, res: Response): Promise<void> {
    try {
      const category = req.params.category;
      const emojis = EmojiService.getEmojisByCategory(category);

      if (emojis.length === 0) {
        res.status(404).json({
          success: false,
          error: "Catégorie non trouvée",
        });
        return;
      }

      res.json({
        success: true,
        data: emojis,
        category,
        count: emojis.length,
      });
    }
    catch (error) {
      res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération des emojis par catégorie",
      });
    }
  }
}
