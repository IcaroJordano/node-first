import { randomUUID } from "crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
  #videos = new Map();

  async list(search) {
    let videos;

    if (search) {
      const searchTerm = `%${search}%`; // adiciona os curingas para o ILIKE
      videos = await sql`
        SELECT * FROM videos
        WHERE title ILIKE ${searchTerm}
      `;
    } else {
      videos = await sql`
        SELECT * FROM videos
      `;
    }

    return videos;
  }

  async create(video) {
    const videoId = randomUUID();

    const { title, description, duration } = video;

    await sql`insert into videos (id, title, duration, description) VALUES (${videoId}, ${title}, ${duration}, ${description})`;
  }

  async update(id, video) {
    const { title, description, duration } = video;

    await sql`update videos set title = ${title}, duration = ${duration}, description = ${description} where id = ${id}`;
  }

  async delete(videoId) {
    const id = videoId;
    await sql`delete from videos where id = ${id}`;
  }
}
