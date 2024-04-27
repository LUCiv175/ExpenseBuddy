CREATE TABLE utente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nomeUtente VARCHAR(255),
    passwordUtente VARCHAR(255),
    email VARCHAR(255)
);
 
CREATE TABLE categoria (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255),
    descrizione text,
    icona VARCHAR(255)
);
 
CREATE TABLE spesa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(255),
    valore REAL,
    dataSpesa DATE,
    fkCategoria INT,
    fkUtente INT,
    FOREIGN KEY (fkCategoria) REFERENCES categoria(id),
    FOREIGN KEY (fkUtente) REFERENCES utente(id)
);
INSERT INTO `categoria` (`id`, `nome`, `descrizione`) VALUES
(1, 'Meals', 'In this category, you can record all expenses related to meals, including lunches, dinners out, or grocery purchases. Keep track of your food expenses accurately to better manage your budget and find ways to save.'),
(2, 'Transport', 'In this category, you can record all expenses related to transportation, such as fuel, public transit fares, or vehicle maintenance. Keep track of your transportation expenses accurately to better manage your budget and find ways to save.'),
(3, 'Clothing', 'In this category, you can record all expenses related to clothing, including purchases of apparel, shoes, accessories, or any related items. Keep track of your clothing expenses accurately to better manage your budget and find ways to save.'),
(4, 'Healtcare', 'In this category, you can record all expenses related to healthcare, including medical appointments, prescriptions, treatments, or health-related supplies. Keep track of your healthcare expenses accurately to better manage your budget and find ways to save.');


INSERT INTO `spesa` (`nome`, `valore`, `dataSpesa`, `fkCategoria`, `fkUtente`) VALUES ('Kebab', '5.51', '2024-04-10', '2', '1');
INSERT INTO `spesa` (`nome`, `valore`, `dataSpesa`, `fkCategoria`, `fkUtente`) VALUES ('Kebab', '5', '2024-04-10', '3', '1');
INSERT INTO `spesa` (`nome`, `valore`, `dataSpesa`, `fkCategoria`, `fkUtente`) VALUES ('Kebab', '5', '2024-04-10', '4', '1');
INSERT INTO `spesa` (`nome`, `valore`, `dataSpesa`, `fkCategoria`, `fkUtente`) VALUES ('Kebab', '5', '2024-04-10', '1', '1');
INSERT INTO `spesa` (`nome`, `valore`, `dataSpesa`, `fkCategoria`, `fkUtente`) VALUES ('Kebab', '5', '2024-04-10', '2', '1');
INSERT INTO `spesa` (`nome`, `valore`, `dataSpesa`, `fkCategoria`, `fkUtente`) VALUES ('Kebab', '5', '2024-03-10', '1', '1');
INSERT INTO `spesa` (`nome`, `valore`, `dataSpesa`, `fkCategoria`, `fkUtente`) VALUES ('Kebab', '5', '2024-02-10', '1', '1');
INSERT INTO `spesa` (`nome`, `valore`, `dataSpesa`, `fkCategoria`, `fkUtente`) VALUES ('Kebab', '5', '2024-01-10', '1', '1');
INSERT INTO `spesa` (`nome`, `valore`, `dataSpesa`, `fkCategoria`, `fkUtente`) VALUES ('Kebab', '5', '2024-01-10', '1', '1');
INSERT INTO `spesa` (`nome`, `valore`, `dataSpesa`, `fkCategoria`, `fkUtente`) VALUES ('Kebab', '5', '2024-01-10', '1', '1');
INSERT INTO `spesa` (`nome`, `valore`, `dataSpesa`, `fkCategoria`, `fkUtente`) VALUES ('Kebab', '5', '2023-04-10', '1', '1');

SELECT * FROM `spesa`;
SELECT * FROM `categoria`;
SELECT * FROM `utente`;