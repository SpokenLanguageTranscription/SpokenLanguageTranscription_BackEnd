## `Présentation du Projet de R&D Reconnaissance vocale`
 Cette application a été conçu dans le cadre de la réalisation d’un projet en Développement de Logiciel Libre sous la licence CC BY-NC-SA.
L'objectif étant, de réaliser une application qui permettra aux malentendants de participer à une réunion ou à une discussion via l’API de reconnaissance vocale de Google. <br />

Notre projet est scindé en 2 parties:
<h4> Partie Frontend </h4>
<h4> Partie Backend </h4>

La partie <b> Backend </b> est structuré en composants, et chacun est constitué de la manière suivante: <br>

<h4> Route: <br> </h4>
La route définit le chemin par lequel on appelle l'action, afin que la requete soit traitée.

<h4> Action: <br></h4>
C'est une fonction qui prend les parametres de la requete et l'envoie au process pour le traitement.

<h4> Process: <br></h4>
C'est la partie du traitement de la requete, qui interagit avec l'environnement externe (exemple notre base de donnée Mongo, ou autre Api
externes)
<h4> Model: <br> </h4>
C'est le schéma de la base de donnée.

Pour pouvoir bien gérer la création de comptes des utilisateurs, nous avons integré le module Mailgun pour envoyer des mails contenant
le token d'activation du compte l'utilisateur. 

### `Démarrage de l'application`

Afin d'assurer le bon fonctionnement de l'application, plusieurs manipulations doivent être réalisées au préalable:

#### `Prérequis`

Installer NodeJS 

```
https://nodejs.org/

```

Récuperer la partie Backend sur Git:

```
https://github.com/SpokenLanguageTranscription/SpokenLanguageTranscription_BackEnd.git

```

Récuperer la partie Frontend sur Git:

```
https://github.com/SpokenLanguageTranscription/SpokenLanguageTranscription_FrontEnd.git

```
Puis ajouter les dépendances entre les differents paquets:

```
npm install dependencies

```
Installer le module Mailgun
```
npm install mailgun-js

```
POUR LANCER LE PROJET EN LOCAL  : 
```
node app

```
Il sera lancé sur le port 5000.

#### `L'application est deployé sur le lien suivant :`
```
https://woolkss.herokuapp.com/

```
