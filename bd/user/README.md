# PostgreSQL 13

Ports : 5432:5432
Nom de la base : cleverhousebd
Password : password
Username : postgres

Selon le MDC présent dans les "ressources".

Lancement du docker: 
    $ docker-compose up (build)
Connexion à Postgres :
    $ pql -U postgres (connexion avec username postgres)
    $ \c cleverhousebd[int/ext] (connexion à la base cleverhousebd[int/ext])

Lancement des test de la bd :
    $ cd docker-entrypoint-initdb.d
    $ python3 test.py