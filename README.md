# API Express avec TypeScript

Une API REST moderne construite avec Express.js et TypeScript, organisée selon les meilleures pratiques d'architecture modulaire.

## ✨ Fonctionnalités

- **Architecture modulaire** avec séparation des responsabilités
- **Validation des données** avec Zod
- **Gestion d'erreurs centralisée**
- **TypeScript strict** avec types définis
- **API RESTful** avec pagination et filtres
- **Prêt pour les tests** avec structure modulaire
- **Statistiques et métriques** intégrées

## Endpoints Disponibles

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

## Installation et Démarrage

Parfait ! Voici une **version simplifiée et complète du README**, prête à copier-coller, qui te permet de lancer et tester ton backend sur Kubernetes avec seulement quelques commandes.

---

### – Lancer et déployer le projet Backend-node

### 🔹 1️⃣ Pré-requis

- **Node.js** + **pnpm** ou **npm**
- **Docker Desktop** avec **Kubernetes activé**
- **kubectl** installé

---

### 🔹 2️⃣ Lancer en local (optionnel)

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur
pnpm start
```

L’application écoute sur `http://localhost:3000`.

---

### 🔹 3️⃣ Déployer avec Kubernetes (Docker Desktop)

### Étape 1 – Construire l’image Docker

```bash
docker build -t backend-node:latest .
```

### Étape 2 – Appliquer les manifests Kubernetes

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### Étape 3 – Vérifier que les pods et services sont prêts

```bash
kubectl get pods
kubectl get svc
```

> Repère le **NodePort** dans le service, par exemple : `3000:32542/TCP`.

### Étape 4 – Accéder à l’application

Ouvre ton navigateur sur :

```
http://localhost:<NodePort>
```

> Exemple : si `kubectl get svc` montre `3000:32542`, ouvre `http://localhost:32542`.

---

### 🔹 4️⃣ Vérifier les logs du pod

```bash
kubectl logs <nom-du-pod>
```

> Par ex. :
> `kubectl logs my-api-name-deployment-786d5bf76-mg5gj`

---

### 🔹 5️⃣ Mettre à jour le déploiement après modification du code

```bash
docker build -t backend-node:latest .
kubectl rollout restart deployment/my-api-name-deployment
```

> Kubernetes redémarre le pod avec la nouvelle image.

---

### 🔹 6️⃣ Astuce rapide

Avec ces 3 commandes, tu peux lancer et tester ton backend :

```bash
docker build -t backend-node:latest .
kubectl apply -f k8s/deployment.yaml -f k8s/service.yaml
kubectl port-forward svc/my-api-name-service 3000:3000
```

Ensuite, visite : `http://localhost:3000`.

---

 **Note :**

- Pour NodePort, utilise le port affiché par `kubectl get svc`.
- Pour ClusterIP, utilise `kubectl port-forward` pour exposer localement le service.

**Développé avec ❤️ et TypeScript**
