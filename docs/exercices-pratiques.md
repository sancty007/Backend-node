<!-- # 🛠️ Exercices Pratiques Détaillés

## 🎯 Niveau Débutant - Exercices Pas à Pas

### Exercice 1: Route Health Check

**Objectif**: Créer une route de santé pour l'API

**Étapes**:

1. **Créez le contrôleur de santé** (`src/controllers/healthController.ts`):

```typescript
import type { Request, Response } from "express";

export class HealthController {
  static async getHealth(req: Request, res: Response): Promise<void> {
    const healthData = {
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      version: "1.0.0"
    };

    res.json({
      success: true,
      data: healthData
    });
  }
}
```

2. **Créez les routes de santé** (`src/routes/healthRoutes.ts`):

```typescript
import { Router } from "express";

import { HealthController } from "../controllers/healthController.js";

const router = Router();

router.get("/", HealthController.getHealth);

export default router;
```

3. **Ajoutez les routes à l'API principale** (`src/api/index.ts`):

```typescript
import healthRoutes from "../routes/healthRoutes.js";

// Ajoutez cette ligne avec les autres routes
router.use("/health", healthRoutes);
```

**Test**: `GET /api/v1/health`

---

### Exercice 2: Middleware de Temps de Réponse

**Objectif**: Créer un middleware pour mesurer le temps de réponse

**Étapes**:

1. **Créez le middleware** (`src/middleware/responseTime.ts`):

```typescript
import type { NextFunction, Request, Response } from "express";

export function responseTime(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });

  next();
}
```

2. **Ajoutez le middleware à l'app** (`src/app.ts`):

```typescript
import { responseTime } from "./middleware/responseTime.js";

// Ajoutez après les autres middlewares
app.use(responseTime);
```

**Test**: Faites des requêtes et observez les logs de temps de réponse

---

### Exercice 3: Validation avec Zod

**Objectif**: Implémenter la validation des données

**Étapes**:

1. **Créez les schémas de validation** (`src/utils/validationSchemas.ts`):

```typescript
import { z } from "zod";

export const paginationSchema = z.object({
  page: z.string().optional().transform(val => val ? Number.parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? Number.parseInt(val) : 10)
});

export const pokemonQuerySchema = z.object({
  type: z.string().optional(),
  name: z.string().optional(),
  page: z.string().optional().transform(val => val ? Number.parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? Number.parseInt(val) : 10)
});

export const pokemonIdSchema = z.object({
  id: z.string().transform(val => Number.parseInt(val))
});
```

2. **Créez le middleware de validation** (`src/middleware/validation.ts`):

```typescript
import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse({
        ...req.params,
        ...req.query,
        ...req.body
      });

      req.validatedData = validatedData;
      next();
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: "Données invalides",
          details: error.errors
        });
      }
      else {
        next(error);
      }
    }
  };
}
```

3. **Appliquez la validation aux routes** (`src/routes/pokemonRoutes.ts`):

```typescript
import { validate } from "../middleware/validation.js";
import { pokemonIdSchema, pokemonQuerySchema } from "../utils/validationSchemas.js";

// Ajoutez la validation aux routes
router.get("/", validate(pokemonQuerySchema), PokemonController.getAllPokemons);
router.get("/:id", validate(pokemonIdSchema), PokemonController.getPokemonById);
```

---

## 🔧 Niveau Intermédiaire - Exercices Avancés

### Exercice 4: Intégration Prisma

**Objectif**: Remplacer les données statiques par une base de données

**Étapes**:

1. **Installez Prisma**:

```bash
pnpm add prisma @prisma/client
pnpm add -D prisma
npx prisma init
```

2. **Créez le schéma Prisma** (`prisma/schema.prisma`):

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Pokemon {
  id       Int      @id @default(autoincrement())
  name     String   @unique
  type     String
  hp       Int
  attack   Int
  defense  Int
  image    String
  abilities String[]

  @@map("pokemons")
}
```

3. **Créez la configuration de base de données** (`src/config/database.ts`):

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

4. **Refactorisez le service Pokemon** (`src/services/pokemonService.ts`):

```typescript
import type { Pokemon, PokemonQuery } from "../types/index.js";

import prisma from "../config/database.js";

export class PokemonService {
  static async getAllPokemons(query: PokemonQuery = {}) {
    const { page = 1, limit = 10, type, name } = query;

    const where = {
      ...(type && { type: { contains: type, mode: "insensitive" } }),
      ...(name && { name: { contains: name, mode: "insensitive" } })
    };

    const [pokemons, total] = await Promise.all([
      prisma.pokemon.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.pokemon.count({ where })
    ]);

    return {
      pokemons,
      total,
      page,
      limit
    };
  }

  static async getPokemonById(id: number) {
    return prisma.pokemon.findUnique({
      where: { id }
    });
  }
}
```

---

### Exercice 5: Authentification JWT

**Objectif**: Implémenter un système d'authentification complet

**Étapes**:

1. **Installez les dépendances**:

```bash
pnpm add jsonwebtoken bcryptjs
pnpm add -D @types/jsonwebtoken @types/bcryptjs
```

2. **Créez le service d'authentification** (`src/services/authService.ts`):

```typescript
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../config/database.js";

export class AuthService {
  static async register(email: string, password: string, name: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error("Utilisateur déjà existant");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" }
    );

    return { user: { id: user.id, email: user.email, name: user.name }, token };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Mot de passe incorrect");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" }
    );

    return { user: { id: user.id, email: user.email, name: user.name }, token };
  }
}
```

3. **Créez le middleware d'authentification** (`src/middleware/auth.ts`):

```typescript
import type { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Token d'authentification requis"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  }
  catch (error) {
    res.status(401).json({
      success: false,
      error: "Token invalide"
    });
  }
}
```

---

## 🚀 Niveau Avancé - Exercices Experts

### Exercice 6: Tests Complets

**Objectif**: Créer une suite de tests exhaustive

**Étapes**:

1. **Créez les tests unitaires** (`test/unit/services/pokemonService.test.ts`):

```typescript
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PokemonService } from "../../../src/services/pokemonService.js";

// Mock Prisma
vi.mock("../../../src/config/database.js", () => ({
  default: {
    pokemon: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn()
    }
  }
}));

describe("PokemonService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllPokemons", () => {
    it("should return paginated pokemons", async () => {
      const mockPokemons = [
        { id: 1, name: "Pikachu", type: "Electric" }
      ];

      const mockCount = 1;

      const prisma = await import("../../../src/config/database.js");
      prisma.default.pokemon.findMany.mockResolvedValue(mockPokemons);
      prisma.default.pokemon.count.mockResolvedValue(mockCount);

      const result = await PokemonService.getAllPokemons({ page: 1, limit: 10 });

      expect(result.pokemons).toEqual(mockPokemons);
      expect(result.total).toBe(mockCount);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });
  });
});
```

2. **Créez les tests d'intégration** (`test/integration/routes/pokemon.test.ts`):

```typescript
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import app from "../../../src/app.js";
import prisma from "../../../src/config/database.js";

describe("Pokemon Routes", () => {
  beforeAll(async () => {
    // Setup test database
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /api/v1/pokemons", () => {
    it("should return pokemons with pagination", async () => {
      const response = await request(app)
        .get("/api/v1/pokemons")
        .query({ page: 1, limit: 5 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
    });
  });
});
```

---

### Exercice 7: Documentation Swagger

**Objectif**: Créer une documentation API interactive

**Étapes**:

1. **Installez Swagger**:

```bash
pnpm add swagger-ui-express swagger-jsdoc
pnpm add -D @types/swagger-ui-express @types/swagger-jsdoc
```

2. **Créez la configuration Swagger** (`src/config/swagger.ts`):

```typescript
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pokemon API",
      version: "1.0.0",
      description: "Une API pour gérer les Pokémons"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur de développement"
      }
    ]
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"]
};

export const specs = swaggerJsdoc(options);
```

3. **Ajoutez Swagger à l'app** (`src/app.ts`):

```typescript
import swaggerUi from "swagger-ui-express";

import { specs } from "./config/swagger.js";

// Ajoutez avant les routes API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
```

4. **Documentez vos routes** (`src/routes/pokemonRoutes.ts`):

```typescript
/**
 * @swagger
 * /api/v1/pokemons:
 *   get:
 *     summary: Récupère tous les Pokémons
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Numéro de page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre d'éléments par page
 *     responses:
 *       200:
 *         description: Liste des Pokémons
 */
router.get("/", PokemonController.getAllPokemons);
```

---

## 🎯 Conseils pour Réussir

1. **Commencez par les exercices de base** - Maîtrisez chaque niveau avant de passer au suivant
2. **Testez chaque fonctionnalité** - Utilisez Postman ou curl pour tester vos APIs
3. **Documentez votre code** - Ajoutez des commentaires et de la documentation
4. **Utilisez Git** - Committez régulièrement vos changements
5. **Pratiquez quotidiennement** - Codez au moins 1 heure par jour

---

**Bonne chance dans vos exercices ! 🚀** -->
