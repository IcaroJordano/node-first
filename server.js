import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

const database = new DatabasePostgres();

server.post("/videos", async (request, reply) => {
  const { title, duration, description } = request.body;

  await database.create({ title, description, duration });

  return reply.status(201).send();
});

server.get("/videos", async (request) => {
  const search = request.query.search;
  const videos = await database.list(search);
  return videos;
});

server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  const { title, duration, description } = request.body;

  await database.update(videoId, { title, duration, description });

  return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;

  await database.delete(videoId);

  return reply.status(204).send();
});

// 🚀 CORRETO PARA RENDER:
server
  .listen({
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 3333,
  })
  .then(() => {
    console.log("🚀 Server running");
  })
  .catch((err) => {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  });
