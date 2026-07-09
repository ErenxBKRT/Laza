CREATE DATABASE PHP;

USE PHP;

CREATE TABLE voiture (
    idvoit VARCHAR(10) PRIMARY KEY,
    design VARCHAR(50),
    typevoit VARCHAR(50),
    nbrplace INT,
    frais INT
);

CREATE TABLE place (
    place INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idvoit VARCHAR(10),
    occupation VARCHAR(10),

    Foreign Key (idvoit) REFERENCES voiture(idvoit)
);

CREATE TABLE client(
    idclient INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(200) NOT NULL,
    numtel VARCHAR(20) NOT NULL
);

CREATE TABLE reserver (
    idreserv VARCHAR(50) PRIMARY KEY NOT NULL,
    idvoit VARCHAR(10),
    idclient INT,
    place INT,
    datereserv DATETIME,
    datevoyage DATE,
    payement VARCHAR(50),
    montantavance INT DEFAULT 0,

    Foreign Key (idvoit) REFERENCES voiture(idvoit),
    Foreign Key (idclient) REFERENCES client(idclient),
    Foreign Key (place) REFERENCES place(place)
);

SELECT* FROM client;

INSERT INTO client(nom, numtel) VALUES
('John Doe', '1234567890'),
('Jane Smith', '0987654321'),
('Alice Johnson', '5555555555'),
('Bob Brown', '1112223333'),
('Charlie Davis', '4445556666');

SELECT * FROM client;