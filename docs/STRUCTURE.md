# Structure du Projet API

## 📁 Architecture Modulaire

```
src/
├── api/                    # Point d'entrée principal de l'API
│   └── index.ts           # Router principal
├── config/                # Configuration
│   └── database.ts        # Configuration DB (future)
├── controllers/           # Contrôleurs (logique HTTP)
│   ├── emojiController.ts
│   └── pokemonController.ts
├── data/                  # Données statiques
│   └── data.ts           # Données Pokémon
├── middleware/            # Middlewares personnalisés
│   └── errorHandler.ts   # Gestion d'erreurs
├── routes/               # Définition des routes
│   ├── emojiRoutes.ts
│   └── pokemonRoutes.ts
├── services/             # Logique métier
│   ├── emojiService.ts
│   └── pokemonService.ts
├── types/                # Types TypeScript
│   └── index.ts
├── utils/                # Utilitaires
│   └── validation.ts    # Validation avec Zod
├── app.ts               # Configuration Express
└── index.ts             # Point d'entrée
```

## 🏗️ Principes de Design

### 1. **Séparation des Responsabilités**

- **Controllers** : Gestion des requêtes HTTP et réponses
- **Services** : Logique métier pure
- **Routes** : Définition des endpoints
- **Types** : Définitions TypeScript centralisées

### 2. **Architecture en Couches**

```
HTTP Request → Routes → Controllers → Services → Data
     ↑                                    ↓
HTTP Response ← Controllers ← Services ← Data
```

### 3. **Validation des Données**

- Utilisation de **Zod** pour la validation
- Middleware de validation réutilisable
- Types TypeScript stricts

### 4. **Gestion d'Erreurs**

- Middleware d'erreur centralisé
- Classes d'erreur personnalisées
- Logs détaillés en développement

## 🔧 Fonctionnalités

### API Pokémon

- `GET /api/v1/pokemons` - Liste paginée avec filtres
- `GET /api/v1/pokemons/:id` - Pokémon par ID
- `GET /api/v1/pokemons/type/:type` - Par type
- `GET /api/v1/pokemons/stats` - Statistiques

### API Emojis

- `GET /api/v1/emojis` - Tous les emojis
- `GET /api/v1/emojis/random` - Emoji aléatoire
- `GET /api/v1/emojis/random/:count` - Plusieurs aléatoires
- `GET /api/v1/emojis/category/:category` - Par catégorie

## 🚀 Avantages de cette Structure

1. **Maintenabilité** : Code organisé et facile à maintenir
2. **Évolutivité** : Facile d'ajouter de nouvelles fonctionnalités
3. **Testabilité** : Services isolés et testables
4. **Réutilisabilité** : Composants modulaires
5. **Type Safety** : TypeScript strict avec validation Zod
6. **Performance** : Pagination et filtres optimisés

## 📝 Bonnes Pratiques

- ✅ Utilisation de classes statiques pour les services
- ✅ Gestion d'erreurs centralisée
- ✅ Validation des données d'entrée
- ✅ Types TypeScript stricts
- ✅ Documentation des méthodes
- ✅ Structure modulaire
- ✅ Séparation claire des responsabilités
