# 🚀 API Express avec TypeScript - Structure Modulaire

Une API REST moderne construite avec Express.js et TypeScript, organisée selon les meilleures pratiques d'architecture modulaire.

## ✨ Fonctionnalités

- 🏗️ **Architecture modulaire** avec séparation des responsabilités
- 🔒 **Validation des données** avec Zod
- 🛡️ **Gestion d'erreurs centralisée**
- 📝 **TypeScript strict** avec types définis
- 🎯 **API RESTful** avec pagination et filtres
- 🧪 **Prêt pour les tests** avec structure modulaire
- 📊 **Statistiques et métriques** intégrées

## 🎮 Endpoints Disponibles

### Pokémon API

- `GET /api/v1/pokemons` - Liste paginée avec filtres
- `GET /api/v1/pokemons/:id` - Pokémon par ID
- `GET /api/v1/pokemons/type/:type` - Par type
- `GET /api/v1/pokemons/stats` - Statistiques

### Emoji API

- `GET /api/v1/emojis` - Tous les emojis
- `GET /api/v1/emojis/random` - Emoji aléatoire
- `GET /api/v1/emojis/random/:count` - Plusieurs aléatoires
- `GET /api/v1/emojis/category/:category` - Par catégorie

## 🚀 Installation et Démarrage

```bash
# Installation des dépendances
pnpm install

# Démarrage en mode développement
pnpm dev

# Build pour production
pnpm build

# Démarrage en production
pnpm start

# Tests
pnpm test

# Linting
pnpm lint
```

## 📁 Structure du Projet

```
src/
├── api/                    # Point d'entrée principal
├── config/                # Configuration
├── controllers/           # Contrôleurs HTTP
├── data/                  # Données statiques
├── middleware/            # Middlewares personnalisés
├── routes/               # Définition des routes
├── services/             # Logique métier
├── types/                # Types TypeScript
├── utils/                # Utilitaires
├── app.ts               # Configuration Express
└── index.ts             # Point d'entrée
```

## 🏗️ Architecture

### Principe de Séparation des Responsabilités

1. **Routes** : Définition des endpoints
2. **Controllers** : Gestion des requêtes HTTP
3. **Services** : Logique métier pure
4. **Types** : Définitions TypeScript centralisées
5. **Validation** : Validation des données avec Zod

### Flux de Données

```
HTTP Request → Routes → Controllers → Services → Data
     ↑                                    ↓
HTTP Response ← Controllers ← Services ← Data
```

## 🔧 Configuration

### Variables d'Environnement

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pokemon_api
DB_USER=postgres
DB_PASSWORD=
```

## 🧪 Tests

```bash
# Lancer tous les tests
pnpm test

# Tests en mode watch
pnpm test:watch

# Tests avec couverture
pnpm test:coverage
```

## 📝 Exemples d'Utilisation

### Récupérer des Pokémons avec pagination

```bash
curl "http://localhost:3000/api/v1/pokemons?page=1&limit=5"
```

### Filtrer par type

```bash
curl "http://localhost:3000/api/v1/pokemons?type=Fire"
```

### Récupérer un emoji aléatoire

```bash
curl "http://localhost:3000/api/v1/emojis/random"
```

## 🚀 Déploiement

### Production

```bash
# Build
pnpm build

# Démarrage
pnpm start
```

### Docker (optionnel)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
```

## 📚 Documentation

- [Structure du Projet](./docs/STRUCTURE.md)
- [Guide d'Architecture](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Vitest](https://vitest.dev/)

---

**Développé avec ❤️ et TypeScript**
