// create-table.js
import { sql } from "./db.js";

await sql`DROP TABLE IF EXISTS videos`.then(() =>
  console.log("Table 'videos' dropped!")
);

await sql`
  CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL
);
`;

console.log("Table 'videos' created!");
