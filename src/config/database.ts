// Configuration de la base de données
// Pour l'instant, nous utilisons des données statiques
// Mais cette structure permet une future migration vers une vraie DB

// export type DatabaseConfig = {
//   host: string;
//   port: number;
//   database: string;
//   username: string;
//   password: string;
// };

// export const databaseConfig: DatabaseConfig = {
//   host: process.env.DB_HOST || "localhost",
//   port: Number.parseInt(process.env.DB_PORT || "5432"),
//   database: process.env.DB_NAME || "pokemon_api",
//   username: process.env.DB_USER || "postgres",
//   password: process.env.DB_PASSWORD || "",
// };

// // Classe pour gérer les connexions à la base de données
// export class DatabaseConnection {
//   private static instance: DatabaseConnection;
//   private isConnected = false;

//   private constructor() {}

//   static getInstance(): DatabaseConnection {
//     if (!DatabaseConnection.instance) {
//       DatabaseConnection.instance = new DatabaseConnection();
//     }
//     return DatabaseConnection.instance;
//   }

//   async connect(): Promise<void> {
//     // Simulation d'une connexion à la base de données
//     console.log("🔌 Connexion à la base de données...");
//     this.isConnected = true;
//     console.log("✅ Base de données connectée");
//   }

//   async disconnect(): Promise<void> {
//     console.log("🔌 Déconnexion de la base de données...");
//     this.isConnected = false;
//     console.log("✅ Base de données déconnectée");
//   }

//   isConnectedToDatabase(): boolean {
//     return this.isConnected;
//   }
// }
