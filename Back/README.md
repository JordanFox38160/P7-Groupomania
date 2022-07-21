# Comment lancer le projet ?

# ********** NODEMON SERVER **********

Dans le dossier backend du projet, installer nodemon server en utilisant la ligne de commande suivante : npm install -g nodemon. Une fois nodemon installer, vous pouvez le lancer depuis le dossier backend avec la commande "nodemon server".
## Available Scripts

# ********** FICHIER ENVIRONEMENT **********

Pour des raison de sécurité, le projet utilise un fichier .env afin de ne pas divulguer de donnèes sensible. Voici la procédure afin de vous connecter a mongo Atlas :

***************************

1: Rendez-vous dans le fichier ds.js du projet.
2: A la ligne 5 du fichier, remplacer le "process.env.DB_USER_PASS" par votre lien de connexion (COMPAS) a mongo Atlas.
3: Relancer nodemon server. Si la connexion a réussis, un console.log "Connexion à MongoDB réussie" doit apparaitre.

***************************

Dans le fichier server.js, ligne 11, remplacer la ligne "process.env.CLIENT_URL" par le PORT 3000. 

***************************

Dans le fichier auth.js, ligne 10, remplacer 'process.env.TOKEN_SECRET', par un token secret.
Dans le fichier authController.js, ligne 43, remplacer 'process.env.TOKEN_SECRET', par un token secret.

# ********** UTILISER LE COMPTE ADMIN **********

Pour utiliser un compte admin, veuillez utiliser le compte suivant :
Nom de compte : Admin@gmail.com
Mot de passe : 123456

Ou alors crée un nouveau compte et passer "Admin : False" en "Admin : True" sur la table de l'user crée dans MongoDbCompase