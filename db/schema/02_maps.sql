-- Drop and recreate Maps table
DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description varchar(255),
  lng DOUBLE PRECISION NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  zoom INTEGER NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);