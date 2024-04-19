CREATE DATABASE expensebuddy;

CREATE TABLE utente(
    id INT AUTO_INCREMENT,
    nomeUtente VARCHAR(255),
    passwordUtente VARCHAR(255),
    email VARCHAR(255),
    PRIMARY KEY (id);
);

CREATE TABLE spesa(
    id INT AUTO_INCREMENT,
    nome VARCHAR(255),
    categoria VARCHAR(255),
    valore DOUBLE(8, 2),
    PRIMARY KEY (id);
);

CREATE TABLE categoria(
    id INT AUTO_INCREMENT,
    nome VARCHAR(255),
    descrizione VARCHAR(500),
    fkSpesa INT,
    PRIMARY KEY (id),
    FOREIGN KEY (fkSpesa) REFERENCES spesa(id);
);

CREATE TABLE effettua(
    fkUtente INT,
    fkSpesa INT,
    PRIMARY KEY (fkUtente, fkSpesa),
    FOREIGN KEY (fkUtente) REFERENCES utente(id),
    FOREIGN KEY (fkSpesa) REFERENCES spesa(id);
);