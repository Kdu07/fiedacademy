-- Criação do tipo ENUM para category, e condições para criação dessas categorias
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category_enum') THEN
    CREATE TYPE category_enum AS ENUM ('categoria1', 'categoria2', 'categoria3');
  END IF;
END$$;

/* Criação da tabela de permições */
CREATE TABLE  IF NOT EXISTS role_permissions (
  id SERIAL PRIMARY KEY,
  nome_role VARCHAR(50),
  can_create BOOLEAN,
  can_read BOOLEAN,
  can_update BOOLEAN,
  can_delete BOOLEAN
);

/* Criação da tabela de certificados */
CREATE TABLE  IF NOT EXISTS certificate (
  id SERIAL PRIMARY KEY,
  id_path INTEGER NOT NULL,
  issue_date DATE,
  hash_code VARCHAR(100)
);

/* Criação da tabela para as trilhas */
CREATE TABLE  IF NOT EXISTS path (
  id SERIAL PRIMARY KEY,
  id_certification INTEGER NOT NULL,
  title VARCHAR(255),
  description TEXT,
  category category_enum
);

/* Criação da tabela de módulos */
CREATE TABLE  IF NOT EXISTS module (
  id SERIAL PRIMARY KEY,
  id_path INTEGER NOT NULL,
  title VARCHAR(255),
  order INTEGER NOT NULL
);

/* Criação da tabela usuários */
CREATE TABLE  IF NOT EXISTS Users (
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

/* Criação da tabela de conteúdos */
CREATE TABLE  IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  id_modulo INTEGER NOT NULL REFERENCES module(id),
  id_emphasis BOOLEAN,
  doc_path VARCHAR(255),
  video_path VARCHAR(255),
  img_path VARCHAR(255),
  order INTEGER NOT NULL,
  due_time TIMESTAMP,
  title VARCHAR(255)
);
/* 
Criação da tabela de progresso do usuário em relação ao conteúdo */
CREATE TABLE  IF NOT EXISTS User_content_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES Users(id),
  module_id INTEGER NOT NULL REFERENCES module(id),
  content_id INTEGER NOT NULL REFERENCES content(id),
  is_completed BOOLEAN NOT NULL
);

/* Criação da tabela de fixados */
CREATE TABLE  IF NOT EXISTS bookmarks (
  id SERIAL PRIMARY KEY,
  id_user INTEGER NOT NULL REFERENCES Users(id),
  id_content INTEGER NOT NULL REFERENCES content(id),
  id_module INTEGER NOT NULL REFERENCES module(id),
  saved_at TIMESTAMP
);

/* Criação da tabela de testes */
CREATE TABLE  IF NOT EXISTS tests (
  id SERIAL PRIMARY KEY,
  id_modulo INTEGER NOT NULL REFERENCES module(id),
  questions TEXT,
  num_questions INTEGER NOT NULL
);

/* Criação da tabela para ênfase em conteúdos */
CREATE TABLE  IF NOT EXISTS emphasis (
  id SERIAL PRIMARY KEY,
  id_user INTEGER NOT NULL REFERENCES Users(id),
  id_modulo INTEGER NOT NULL REFERENCES module(id),
  id_content INTEGER NOT NULL REFERENCES content(id),
  due_date TIMESTAMP
);

/* Criação da tabela de score */
CREATE TABLE  IF NOT EXISTS score_test (
  id SERIAL PRIMARY KEY,
  id_test INTEGER NOT NULL REFERENCES tests(id),
  id_user INTEGER NOT NULL REFERENCES Users(id),
  score INTEGER NOT NULL,
  started_at TIMESTAMP,
  ended_at TIMESTAMP
);

/* Criação da tabela de feedbacks dos módulos */
CREATE TABLE  IF NOT EXISTS feedbacks_modulo (
  id SERIAL PRIMARY KEY,
  id_content INTEGER NOT NULL REFERENCES content(id),
  id_modulo INTEGER NOT NULL REFERENCES module(id),
  id_user INTEGER NOT NULL REFERENCES Users(id),
  message TEXT,
  rating SMALLINT,
  created_at TIMESTAMP
);