-- Criação do tipo ENUM para category
CREATE TYPE category_enum AS ENUM ('categoria1', 'categoria2', 'categoria3');

CREATE TABLE role_permissions (
  id SERIAL PRIMARY KEY,
  nome_role VARCHAR(50),
  can_create BOOLEAN,
  can_read BOOLEAN,
  can_update BOOLEAN,
  can_delete BOOLEAN
);

CREATE TABLE certificate (
  id SERIAL PRIMARY KEY,
  id_path INTEGER NOT NULL,
  issue_date DATE,
  hash_code VARCHAR(100)
);

CREATE TABLE path (
  id SERIAL PRIMARY KEY,
  id_certification INTEGER NOT NULL,
  title VARCHAR(255),
  description TEXT,
  category category_enum
);

CREATE TABLE module (
  id SERIAL PRIMARY KEY,
  id_path INTEGER NOT NULL,
  title VARCHAR(255),
  "order" INTEGER NOT NULL
);

CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  id_role INTEGER NOT NULL REFERENCES role_permissions(id),
  name VARCHAR(255),
  region VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  score INTEGER NOT NULL,
  last_login TIMESTAMP,
  profile_photo VARCHAR(255),
  id_certificate INTEGER NOT NULL REFERENCES certificate(id)
);

CREATE TABLE content (
  id SERIAL PRIMARY KEY,
  id_modulo INTEGER NOT NULL REFERENCES module(id),
  id_emphasis BOOLEAN,
  doc_path VARCHAR(255),
  video_path VARCHAR(255),
  img_path VARCHAR(255),
  "order" INTEGER NOT NULL,
  due_time TIMESTAMP,
  title VARCHAR(255),
);

CREATE TABLE User_content_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES Users(id),
  module_id INTEGER NOT NULL REFERENCES module(id),
  content_id INTEGER NOT NULL REFERENCES content(id),
  is_completed BOOLEAN NOT NULL
);

CREATE TABLE bookmarks (
  id SERIAL PRIMARY KEY,
  id_user INTEGER NOT NULL REFERENCES Users(id),
  id_content INTEGER NOT NULL REFERENCES content(id),
  id_module INTEGER NOT NULL REFERENCES module(id),
  saved_at TIMESTAMP
);

CREATE TABLE tests (
  id SERIAL PRIMARY KEY,
  id_modulo INTEGER NOT NULL REFERENCES module(id),
  questions TEXT,
  num_questions INTEGER NOT NULL
);

CREATE TABLE emphasis (
  id SERIAL PRIMARY KEY,
  id_user INTEGER NOT NULL REFERENCES Users(id),
  id_modulo INTEGER NOT NULL REFERENCES module(id),
  id_content INTEGER NOT NULL REFERENCES content(id),
  due_date TIMESTAMP
);

CREATE TABLE score_test (
  id SERIAL PRIMARY KEY,
  id_test INTEGER NOT NULL REFERENCES tests(id),
  id_user INTEGER NOT NULL REFERENCES Users(id),
  score INTEGER NOT NULL,
  started_at TIMESTAMP,
  ended_at TIMESTAMP
);

CREATE TABLE feedbacks_modulo (
  id SERIAL PRIMARY KEY,
  id_content INTEGER NOT NULL REFERENCES content(id),
  id_modulo INTEGER NOT NULL REFERENCES module(id),
  id_user INTEGER NOT NULL REFERENCES Users(id),
  message TEXT,
  rating SMALLINT,
  created_at TIMESTAMP
);