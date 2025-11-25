import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import client from "prom-client";

import type { MessageResponse } from "./types/index.js";

import api from "./api/index.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

const register = new client.Registry();

// Compteur pour les requêtes HTTP
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Nombre total de requêtes HTTP",
  labelNames: ["method", "route", "statusCode"],
});
register.registerMetric(httpRequestCounter);
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter
      .labels(req.method, req.path, res.statusCode.toString())
      .inc();
  });
  next();
});

// Endpoint pour Prometheus
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.get<object, MessageResponse>("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

export default app;
