# Les Glaneurs de Carton - Documentaire Web

Ce projet est le site web d'un documentaire immersif et multilingue, "Les Glaneurs de Carton". Il a été conçu avec un fort accent sur l'expérience utilisateur, les animations fluides et une architecture web moderne.

**[Voir le site en ligne](https://glaneursdecarton.mastercmw.com/)**

---

## Table des Matières

- [À Propos du Projet](#à-propos-du-projet)
- [Fonctionnalités Clés](#fonctionnalités-clés)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation et Lancement](#installation-et-lancement)
  - [Prérequis](#prérequis)
  - [Étapes d'installation](#étapes-dinstallation)
- [Structure du Projet](#structure-du-projet)

---

## À Propos du Projet

Ce site sert de plateforme de présentation pour un documentaire explorant la vie et les histoires des personnes qui glanent en fin de marché. L'objectif était de créer une expérience numérique qui reflète l'ambiance poétique et humaine du film, en utilisant des animations riches et une navigation non conventionnelle.

## Fonctionnalités Clés

- **Architecture Hybride Performante** : Le site utilise une structure HTML unifiée pour la maintenance, tout en chargeant des ressources CSS et JS spécifiques pour les mobiles afin de garantir des performances optimales.
- **Multilingue** : Support complet pour le Français, l'Anglais et le Coréen, avec des traductions gérées via une base de données.
- **Animations CSS Modernes** : Utilisation intensive de `transform` et `opacity` pour des animations fluides, de `clamp()` pour une typographie responsive, et de `scroll-snap` pour la navigation sur la page d'accueil.
- **Gestion d'État en JavaScript** : Les animations complexes sont contrôlées par un système de verrou (`isAnimating`) pour éviter les conflits et garantir une expérience utilisateur sans bugs visuels.
- **Optimisation SEO Avancée** : Mise en place de balises `canonical` dynamiques, d'un `sitemap.xml` avec `hreflang` pour le multilingue, et de techniques pour guider les robots d'indexation (Google, Naver).
- **Interactivité Riche** : Intégration d'un lecteur vidéo Vimeo, gestion de pistes audio, et un écran de chargement immersif pour la première visite.

---

## Technologies Utilisées

- **Frontend** :
  - HTML5
  - CSS3 (Flexbox, Grid, Animations, `clamp()`)
  - JavaScript (ES6+)
  - jQuery 3.1.0
- **Backend** :
  - PHP 8+
- **Base de données** :
  - MySQL / MariaDB (via PDO)
- **Environnement de développement** :
  - MAMP / WAMP / LAMP

---

## Installation et Lancement

### Prérequis

- Un environnement de développement local (MAMP, WAMP, XAMPP, etc.)
- Un client de base de données (phpMyAdmin, Sequel Pro, etc.)
- Le fichier de la base de données (`.sql`)

### Étapes d'installation

1.  **Cloner le dépôt** dans le répertoire de votre serveur local (ex: `htdocs`).
    ```bash
    git clone [URL_DU_DEPOT]
    ```
2.  **Créer la base de données** :
    -   Lancez votre client de base de données.
    -   Créez une nouvelle base de données nommée `glaneurs`.
    -   Importez le fichier `.sql` fourni dans cette nouvelle base de données.

3.  **Configurer la connexion à la base de données** :
    -   Ouvrez le fichier `includes/lang.php`.
    -   Modifiez les informations de connexion pour qu'elles correspondent à votre configuration locale.

    ```php
    // filepath: includes/lang.php

    function getPDO()
    {
        static $pdo = null;
        if ($pdo === null) {
           // --- MODIFIEZ CES LIGNES ---
           $servername = "localhost";
           $database = "glaneurs";
           $username = "root";
           $password = "root"; // Le mot de passe est souvent "root" sur MAMP
           // -------------------------
        }
        return $pdo;
    }
    ```

4.  **Lancer le site** : Ouvrez votre navigateur et accédez à l'URL de votre projet local (ex: `http://localhost/glaneurs-main`).

---

## Structure du Projet

```
.
├── css/                # Fichiers CSS
│   ├── index.css       # Styles pour la page d'accueil (desktop)
│   ├── mobile-index.css# Styles pour la page d'accueil (mobile)
│   └── ...
├── img/                # Images, vidéos et assets visuels
├── includes/           # Modules PHP réutilisables
│   ├── header.php      # En-tête du site
│   ├── lang.php        # Logique de traduction et connexion BDD
│   ├── loading.php     # Écran de chargement
│   └── ...
├── js/                 # Fichiers JavaScript
│   ├── index.js        # Logique pour la page d'accueil
│   ├── main.js         # Scripts globaux
│   └── ...
├── index.php           # Page d'accueil
├── portraits.php       # Page des portraits
└── ...                 # Autres
