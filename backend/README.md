# BACKEND ReadMe

## <ins>API Calls </ins>

* Version Node : 14.14.32

Pour les calls API, les routes, paramètres et réponses sont expliquées en suivant le lien du Postman :
* https://documenter.getpostman.com/view/11359361/TzCTZQhj

## <ins>Variables d'environnement </ins>

Le nommage des variables est sensible, il faut donc les respecter scrupuleusement lors de la création du fichier `.env`, voici donc les noms avec des exemples :

* API_PORT : Port de l'API, à utiliser pour les calls API (Exemple : `http://localhost:${API_PORT}/users`)
    * `API_PORT=3000`
* USERNAME_DB : Nom de compte d'accès à la base de données afin de faire les modifications d'appel
    * `USERNAME_DB='me'`
* PWD_DB : Mot de passe du compte d'accès à la bdd afin de faire les modifications d'appel
    * `PWD_DB='cleverrootpwd'`
* HOST_DB : Adresse de la bdd, utilisée pour se connecter correctement à la bdd
    * `HOST_DB='localhost'`
* PORT_DB : Port de la base de donnée, utilisé pour se connecter correctement à la bdd
    * `PORT_DB=5432`
* NAME_DB : Nécessaire lorsque l'environnement n'est pas le développement. Nom de la base de donnée sur laquelle se connecter (Example : cleverhouseTest, cleverhouseDevelopment, cleverhouseProduction)
    * `NAME_DB='cleverhouse'`
* NODE_ENV : Nécessaire lorsque l'environnement n'est pas le développement, afin de préciser l'accès complet à la bdd. **UNIQUES** valeurs possibles : **'test'** et **'production'**
    * `NODE_ENV='development'`

## <ins>Ordre des commandes d'exécution</ins>

> npm i (ou npm install mais c'est pareil)
>
> npm run db:create
>
> npm run db:migrate
>
> npm sequelize-cli db:seed:all // Pas nécessaire (Pour peupler la DB si besoin)

Pour démarrer les tests : 
> npm run test

Pour démarrer l'api :

> npm run start

# Félicitation tu peux maintenant faire mon devops, juste de rien pour les services et amuse toi bien en fait