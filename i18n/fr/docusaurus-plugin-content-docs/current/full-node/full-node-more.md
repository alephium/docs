---
sidebar_position: 40
titre: Plus d'information et dépannage
---

# Plus d'information et dépannage Full-node

## Clé API

C'est une bonne pratique d'utiliser une clé API pour limiter l'accès aux endpoints REST de votre fullnode.

### Configuration de la clé API

Veuillez ajouter ce qui suit à votre `user.conf` en remplaçant les zéros par votre propre clé (>= 32 caractères).

```
alephium.api.api-key = "0000000000000000000000000000000000000000000000000000000000000000"
```

Redémarrez votre fullnode pour que cela prenne effet.

#### Génération de la clé API

Sous GNU/Linux : `cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 48 | head -n 1`

### Utiliser la clé API

1. Cliquez sur le bouton `Authorize` en haut à droite de votre interface Swagger :
   ![full-node-api-key-auth0](media/full-node-api-key-auth0.png)

2. Remplissez la case de valeur avec votre clé et cliquez sur le bouton d'autorisation :
   ![full-node-api-key-auth1](media/full-node-api-key-auth1.png)

Maintenant vous pouvez utiliser Swagger UI comme s'il n'y avait pas de clé API.

### Erreur "java.lang.AssertionError : assumption failed"

Cette erreur se produit souvent en raison d'une perte de connexion pendant la synchronisation des nœuds et signifie que certains des fichiers sont corrompus.
Pour résoudre le problème :

1. Supprimez le dossier .alephium `rm .alephium`.

2. Redémarrez le noeud et attendez la synchronisation `java -jar alephium-1.x.x.jar`.

## Déplacer le dossier de données d'Alephium

De nombreux utilisateurs préfèrent conserver le dossier de données d'Alephium sur un disque différent du disque de démarrage principal. Pour ce faire, avec le jar Alephium full node, vous pouvez utiliser la variable d'environnement `ALEPHIUM_HOME` :

1. Arrêtez le jar Alephium full node
2. Déplacez le dossier de données Alephium (normalement à `%userprofile%\.alephium` pour Windows ou `~/.alephium` pour Linux et macOS) vers le nouvel emplacement.
3. Ajoutez une variable d'environnement `ALEPHIUM_HOME` au système pointant vers le nouvel emplacement. Vous pouvez le faire au niveau du système ou simplement créer un fichier batch qui définit la variable avant de lancer le jar Alephium.
4. Redémarrez le nœud Alephium

Si vous utilisez le nœud complet docker, il suffit de modifier les définitions des dossiers montés dans le fichier docker pour qu'ils pointent vers le nouvel emplacement, puis redémarrez.
