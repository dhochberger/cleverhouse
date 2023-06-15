GRANT ALL PRIVILEGES ON DATABASE dbtest TO postgres;

CREATE TABLE IF NOT EXISTS public.House(
    idHouse VARCHAR(50) NOT NULL PRIMARY KEY,
    housename VARCHAR(50),
    link VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.Device(
    idDevice VARCHAR(50) NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS public.Users(
    idUser VARCHAR(50) NOT NULL PRIMARY KEY,
    userpassword VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    token VARCHAR(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS public.has(
    idUser VARCHAR(50),
    idHouse VARCHAR(50),
    isMain BOOLEAN NOT NULL,
    FOREIGN KEY (idUser) REFERENCES Users(idUser),
    FOREIGN KEY (idHouse) REFERENCES House(idHouse),
    PRIMARY KEY (idUser,idHouse)
);

CREATE TABLE IF NOT EXISTS public.isComposedBy(
    idHouse VARCHAR(50) NOT NULL,
    idDevice VARCHAR(50) NOT NULL,
    FOREIGN KEY (idHouse) REFERENCES House(idHouse),
    FOREIGN KEY (idDevice) REFERENCES Device(idDevice),
    PRIMARY KEY (idHouse,idDevice)
);

CREATE TABLE IF NOT EXISTS public.uses(
    idUser VARCHAR(50) NOT NULL,
    idDevice VARCHAR(50) NOT NULL,
    rightToWrite BOOLEAN NOT NULL,
    FOREIGN KEY (idUser) REFERENCES Users(idUser),
    FOREIGN KEY (idDevice) REFERENCES Device(idDevice),
    PRIMARY KEY (idUser, idDevice) 
);