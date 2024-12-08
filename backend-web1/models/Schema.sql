DROP DATABASE IF EXISTS futebol;
CREATE DATABASE futebol;
USE futebol;

CREATE TABLE IF NOT EXISTS jogadores (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    posicao VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    idade int NOT NULL
);

CREATE TABLE IF NOT EXISTS posicoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

INSERT INTO posicoes (nome) VALUES 
('Atacante'),
('Goleiro'),
('Zagueiro'),
('Meio-campo'),
('Lateral');
