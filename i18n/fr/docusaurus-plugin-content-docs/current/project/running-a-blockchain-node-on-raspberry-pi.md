---
sidebar_position: 10
sidebar_label: Apperçu
slug: /running-a-blockchain-node-on-raspberry-pi
title: Démarrage d'un fullnode sur Raspberry Pi
---

# Démarrage d'un fullnode sur Raspberry Pi

## Le goulot d'étranglement de la décentralisation
La décentralisation est l'une des plus grandes promesses de la crypto-économie. 
C'est la donnée qui dessine une perpendiculaire au système contemporain de banque centralisée. Avec un peu de compétences et un peu de matériel, tout le monde peut participer à la maintenance d'une blockchain décentralisée. Et nous y sommes invités ! Distribuer efficacement le pouvoir du consensus à travers de nombreux petits acteurs, comme vous et moi. Cependant, si cette décentralisation existe en théorie, elle comporte un goulot d'étranglement : si, par exemple, seules quelques personnes unies devaient réellement faire fonctionner une blockchain en réseau, elle deviendrait en pratique un système centralisé. Cela signifie que la décentralisation repose sur un facteur social : notre volonté de participer à la maintenance de l'infrastructure.
Lorsque l'on parle de l'infrastructure d'une blockchain, il n'est pas rare que les mineurs et le processus de minage retiennent l'attention. Il y a de bonnes raisons à cela, car cette partie du processus peut être potentiellement lucrative. On entend aussi souvent dire que les mineurs sécurisent le réseau, ce qui est certainement une fonction très importante dans un système proposé pour soutenir l'échange et le transport de valeur monétaire. Les malentendus ne manquent pas dans le domaine de la crypto-monnaie et beaucoup de gens pensent que le minage est une activité qui vise à créer de l'argent à partir de rien. S'il est vrai que le minage produit des "pièces", une telle affirmation est exagérée et jette une grande ombre sur un aspect très important d'une blockchain saine : les nœuds.

## Pourquoi un démarrer un full-node
Un "full-node" est un participant du réseau qui a validé de manière indépendante la copie complète de la blockchain, et qui a donc vérifié toutes les transactions depuis le début. Cela garantit que l'état actuel de la blockchain est le même pour tous. Un facteur très important, car si cette copie n'existait que dans les ordinateurs de quelques participants, ceux-ci pourraient potentiellement coordonner des transactions illégitimes. Par conséquent, la meilleure façon de s'assurer que cette copie est la même pour tous et que personne ne l'altère, est de la distribuer à autant de nœuds que possible.
Comprendre le fonctionnement théorique d'une blockchain est un défi pour un profane. Savoir comment utiliser le logiciel en est un autre. Certaines blockchains sont plus faciles à utiliser que d'autres. Et beaucoup d'entre elles ne nécessitent pas seulement une certaine magie du terminal, mais aussi la possession d'une machine puissante pour fonctionner 24 heures sur 24 et 7 jours sur 7, consommant une bonne part d'énergie.


## Résoudre le problème du goulot d'étranglement
Plus il y a de participants, mieux c'est distribué. Mais comment faire croître la base de nœuds ? Contrairement à l'exploitation minière, faire fonctionner un nœud complet n'implique pratiquement aucune perte et certainement aucun profit. Cependant, ce que nous oublions souvent, c'est combien il y a à perdre en ne faisant pas fonctionner un nœud : L'accès aux données à vos conditions. La possibilité d'auditer la machine. La sécurité. La vie privée… Cependant, une motivation importante pour de nombreux opérateurs de nœuds est l'idée d'auto-souveraineté économique. Posséder une copie de l'historique complet des transactions permet une vérification indépendante sans confiance. La beauté de ce système réside dans la libération des tiers : nous n'avons plus besoin de faire confiance à la bonne volonté d'une personne morale ou humaine, car nous pouvons tous nous mettre d'accord sur les calculs.

**Il est bien connu que de nombreux nœuds d'opérations potentiels sont retenus par des difficultés techniques. L'abaissement des obstacles à l'obtention de l'autosuffisance économique pourrait certainement accroître la base des nœuds. Une façon d'y parvenir est d'utiliser des logiciels compatibles avec du matériel moins cher et plus économe en énergie.**


## Alephium ❤ Raspberry Pi

Le Raspberry Pi n'a pas besoin d'être présenté. Ce petit ordinateur monocarte existe depuis un certain temps. Au moment de la rédaction de cet article, ils ont atteint leur 4ème génération avec des spécifications de mémoire et de vitesse qui les rendent utilisables comme station de travail. Ils existent déjà dans de nombreux foyers et, en raison de leur prix abordable, sont souvent utilisés pour initier les enfants aux merveilles du codage. Ils peuvent exécuter de nombreux types de systèmes d'exploitation, dont la plupart sont open source, ce qui en fait un candidat parfait pour résoudre le problème du goulot d'étranglement de la décentralisation. Pour être honnête, Alephium n'est pas le seul projet qui peut fonctionner sur un ordinateur monocarte de faible puissance. Mais la manière dont Alephium aborde le problème peut être résumée de manière assez claire :

1. La Proof-of-Work (PoW) est en général plus légère que la Proof-of-Stake (PoS), car la validation du bloc est plus simple, le temps de bloc est plus long et le TPS est plus faible. Comme la Proof-of-Less-Work (PoLW) d'Alephium n'est pas un algorithme de hachage lié à la mémoire, 100 Mo de RAM suffisent pour faire fonctionner le nœud complet.
2. La mise en œuvre est importante. Par exemple, go-ethereum ne peut pas fonctionner sur un Raspberry Pi, mais il existe des implémentations plus efficaces d'Ethereum qui peuvent fonctionner sur des Raspis, comme erigon.
3. La conception de la machine virtuelle (VM) est essentielle. Son empreinte "Entrée-Sortie" est extrêmement faible.
4. Comme Alephium est une blockchain fragmentée, le nœud complet peut être exécuté sur plusieurs ordinateurs. Cette possibilité pourrait lui donner un TPS plus élevé que celui d'une seule chaîne.

**En général, il est juste de croire que la plupart des chaînes uniques PoW bien conçues pourraient fonctionner sur un Raspberry Pi, mais certaines d'entre elles ne consacrent pas le temps nécessaire à leur prise en charge (optimisation, dépendance de la bibliothèque, etc…).**

## Vous devriez en faire autant
Il y a beaucoup d'enthousiastes du Raspberry dans la communauté Alephium. C'est facile à repérer car nous proposons des images docker pour simplifier l'installation d'un full-node pour les amateurs d'ordinateurs. L'installation d'un full-node Alephium est aussi simple que le téléchargement d'un fichier de configuration pré-écrit pour exécuter une image docker-compose. Et qui sait ce que l'avenir nous réserve ? À l'heure où nous écrivons ces lignes, Alephium n'a pas encore lancé son réseau principal et l'optimisation ne s'arrêtera pas à la mise en ligne. Peut-être que dans un avenir pas si lointain, il sera possible de miner sur un Raspberry Pi ? Il y a eu des tentatives de création de puces FGPA empilables pour les ordinateurs dans le passé…
