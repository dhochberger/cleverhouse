CREATE DATABASE cleverhousebd;

GRANT ALL PRIVILEGES ON DATABASE cleverhousebd TO postgres;

\c cleverhousebd
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
    isMain BOOLEAN NOT NULL
);

ALTER TABLE public.has
    ADD PRIMARY KEY (idUser,idHouse);

ALTER TABLE public.has
    ADD CONSTRAINT fk_has_user FOREIGN KEY (idUser) REFERENCES Users(idUser);

ALTER TABLE public.has
    ADD CONSTRAINT fk_has_house FOREIGN KEY (idHouse) REFERENCES House(idHouse);
    
CREATE TABLE IF NOT EXISTS public.isComposedBy(
    idHouse VARCHAR(50) NOT NULL,
    idDevice VARCHAR(50) NOT NULL
);

ALTER TABLE public.isComposedBy
    ADD PRIMARY KEY (idHouse,idDevice);

ALTER TABLE public.isComposedBy
    ADD CONSTRAINT fk_icb_house FOREIGN KEY (idHouse) REFERENCES House(idHouse);

ALTER TABLE public.isComposedBy
    ADD CONSTRAINT fk_icb_device FOREIGN KEY (idDevice) REFERENCES Device(idDevice);
    
CREATE TABLE IF NOT EXISTS public.uses(
    idUser VARCHAR(50) NOT NULL,
    idDevice VARCHAR(50) NOT NULL,
    rightToWrite BOOLEAN NOT NULL
);

ALTER TABLE public.uses
    ADD PRIMARY KEY (idUser,idDevice);

ALTER TABLE public.uses
    ADD CONSTRAINT fk_uses_devices FOREIGN KEY (idDevice) REFERENCES Device(idDevice);

ALTER TABLE public.uses
    ADD CONSTRAINT fk_uses_users FOREIGN KEY (idUser) REFERENCES Users(idUser);
