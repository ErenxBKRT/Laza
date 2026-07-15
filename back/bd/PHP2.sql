CREATE DATABASE PHP2;

USE PHP2;

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

    Foreign Key (idvoit) REFERENCES voiture(idvoit) ON UPDATE CASCADE ON DELETE CASCADE
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

    Foreign Key (idvoit) REFERENCES voiture(idvoit) ON UPDATE CASCADE ON DELETE CASCADE,
    Foreign Key (idclient) REFERENCES client(idclient) ON UPDATE CASCADE ON DELETE CASCADE,
    Foreign Key (place) REFERENCES place(place) ON UPDATE CASCADE ON DELETE CASCADE
);

SHOW CREATE TABLE reserver;

ALTER TABLE reserver DROP FOREIGN KEY reserver_ibfk_3;

ALTER TABLE reserver DROP INDEX place;

SELECT * FROM reserver;
