---
sidebar_position: 10
titre: Guide complet de démarrage du fullnode
sidebar_label: Guide complet de démarrage du fullnode
---

# Guide de démarrage : Comment lancer votre Node

:::info 
Explorateur de bloc : [https://explorer.alephium.org][explorer]
:::

## Configuration requise

Assurez-vous que Java (11 ou 17 est recommandé) est installé sur votre ordinateur :

- Windows ou Macos : [https://adoptopenjdk.net/](https://adoptopenjdk.net/)
- Ubuntu : exécutez `sudo apt install default-jdk` dans Terminal

## Télécharger le fichier d'application

Téléchargez le fichier `alephium-x.x.x.jar` depuis [Github release](https://github.com/alephium/alephium/releases/latest) (ne double-cliquez pas dessus, il ne peut pas être lancé de cette façon).

## Démarrez votre noeud

1. Ouvrez la recherche et tapez `Terminal` (pour Mac et Ubuntu) ou `Command Prompt` (pour Windows).
2. Dans le programme Terminal/Command Prompt, tapez `cd your-jar-file-path` pour entrer dans le dossier dans lequel le fichier **alephium-x.x.x.jar** est enregistré.
3. Tapez la commande suivante et appuyez sur Entrée pour lancer le nœud complet :
   ```shell
   java -jar alephium-x.x.x.jar
   ```

🎉 _**Tada, votre nœud est en cours d'exécution**_

- Votre noeud va commencer à se synchroniser avec le réseau. Cela peut prendre du temps la première fois. Votre noeud a été entièrement synchronisé lorsque la hauteur du bloc dans les journaux du terminal est égale à celle trouvée dans les derniers blocs de l'[explorateur].
- Si vous fermez le terminal, le noeud sera arrêté.
- Toutes les données de la blockchain sont stockées dans `.alephium` sous votre dossier personnel[^1].

### Swagger

Nous utilisons OpenAPI pour interagir avec le noeud complet. Vous pouvez ouvrir directement l'interface utilisateur Swagger à travers [http://127.0.0.1:12973/docs](http://127.0.0.1:12973/docs).

Alternativement, vous pouvez utiliser n'importe quel client OpenAPI pour
importer le fichier `openapi.json` de notre dépôt ([download](https://github.com/alephium/alephium/raw/master/api/src/main/resources/openapi.json)).

### Exploitation minière

Pour le tutoriel sur le minage, vous pouvez suivre notre [Guide du minage en solo](mining/solo-mining-guide.md) ou [Guide du minage en pool](mining/pool-mining-guide.md).

### wallet

Vous pouvez télécharger le wallet de bureau à partir d'ici [GitHub](https://github.com/alephium/desktop-wallet/releases/latest).

Alternativement, notre noeud complet possède un wallet intégré avec des fonctionnalités avancées, vous pouvez suivre notre [Guide du wallet](../wallet/desktop-wallet/overview) pour apprendre à l'utiliser.

[^1]: Le dossier d'accueil dépend de votre système : `C:\Users\<votre-username>` sous Windows, `/Users/<votre-username>` sous macOS, `/home/<votre-username>` sous Linux.

[explorer]: https://explorer.alephium.org
