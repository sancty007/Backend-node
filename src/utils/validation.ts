import { z } from "zod";

// Schémas de validation pour les Pokémons
export const PokemonQuerySchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  type: z.string().optional(),
  name: z.string().optional(),
});

export const PokemonIdSchema = z.object({
  id: z.coerce.number().min(1),
});

export const PokemonTypeSchema = z.object({
  type: z.string().min(1),
});

// Schémas de validation pour les Emojis
export const EmojiCountSchema = z.object({
  count: z.coerce.number().min(1).max(20),
});

export const EmojiCategorySchema = z.object({
  category: z.string().min(1),
});

// Middleware de validation générique
export function validateRequest<T>(schema: z.ZodSchema<T>) {
  return (req: any, res: any, next: any) => {
    try {
      const validatedData = schema.parse({
        ...req.params,
        ...req.query,
        ...req.body,
      });

      req.validatedData = validatedData;
      next();
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: "Données invalides",
          details: error.errors,
        });
      }
      else {
        res.status(500).json({
          success: false,
          error: "Erreur de validation",
        });
      }
    }
  };
}
