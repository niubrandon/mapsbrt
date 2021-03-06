--DROP TABLE ALREAY EXISTS
DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  point_lng DOUBLE PRECISION NOT NULL,
  point_lat DOUBLE PRECISION NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
