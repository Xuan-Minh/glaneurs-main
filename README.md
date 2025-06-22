# Les Glaneurs de Carton - Documentaire Interactif

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

Ce site sert de plateforme de présentation pour un documentaire explorant la vie et les histoires de personnes agées qui glanent des cartons dans les rues de Busan, du matin au soir. L'objectif était de créer une expérience numérique qui reflète l'ambiance poétique et humaine du film, en utilisant des animations riches et une navigation non conventionnelle.

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

Absolument \! Voici l'arborescence de votre projet, avec le dossier `.git` et tout ce qu'il contient volontairement omis pour une meilleure clarté sur la structure de votre code et de vos ressources :

```
glaneurs-main
┣ .vscode
┃ ┗ settings.json
┣ audio
┃ ┣ ambiancedld.mp3
┃ ┣ Arirang.wav
┃ ┣ arirang_bass.mp3
┃ ┣ arirang_full.mp3
┃ ┣ arirang_harp.mp3
┃ ┣ arirang_oboe.mp3
┃ ┣ arirang_piano.mp3
┃ ┣ Busansheart.mp3
┃ ┣ homepage.mp3
┃ ┣ SangmansTheme.mp3
┃ ┣ slide2.mp3
┃ ┣ slide3.mp3
┃ ┣ Souvenirs diffus.mp3
┃ ┗ 아리랑0.wav
┣ css
┃ ┣ archives.css
┃ ┣ derriereledocumentaire.css
┃ ┣ font.css
┃ ┣ index.css
┃ ┣ loading.css
┃ ┣ main.css
┃ ┣ mentionslegales.css
┃ ┣ mobile-index.css
┃ ┣ navbar.css
┃ ┣ portraits.css
┃ ┗ visionner.css
┣ font
┃ ┣ Figtree
┃ ┃ ┣ static
┃ ┃ ┃ ┣ Figtree-Black.ttf
┃ ┃ ┃ ┣ Figtree-BlackItalic.ttf
┃ ┃ ┃ ┣ Figtree-Bold.ttf
┃ ┃ ┃ ┣ Figtree-BoldItalic.ttf
┃ ┃ ┃ ┣ Figtree-ExtraBold.ttf
┃ ┃ ┃ ┣ Figtree-ExtraBoldItalic.ttf
┃ ┃ ┃ ┣ Figtree-Italic.ttf
┃ ┃ ┃ ┣ Figtree-Light.ttf
┃ ┃ ┃ ┣ Figtree-LightItalic.ttf
┃ ┃ ┃ ┣ Figtree-Medium.ttf
┃ ┃ ┃ ┣ Figtree-MediumItalic.ttf
┃ ┃ ┃ ┣ Figtree-Regular.ttf
┃ ┃ ┃ ┣ Figtree-SemiBold.ttf
┃ ┃ ┃ ┗ Figtree-SemiBoldItalic.ttf
┃ ┃ ┣ Figtree-Italic-VariableFont_wght.ttf
┃ ┃ ┣ Figtree-VariableFont_wght.ttf
┃ ┃ ┣ OFL.txt
┃ ┃ ┗ README.txt
┃ ┣ Libre_Baskerville
┃ ┃ ┣ LibreBaskerville-Bold.ttf
┃ ┃ ┣ LibreBaskerville-Italic.ttf
┃ ┃ ┣ LibreBaskerville-Regular.ttf
┃ ┃ ┗ OFL.txt
┃ ┣ Noto sans KR
┃ ┃ ┣ NotoSansKR-Black.ttf
┃ ┃ ┣ NotoSansKR-Bold.ttf
┃ ┃ ┣ NotoSansKR-ExtraBold.ttf
┃ ┃ ┣ NotoSansKR-ExtraLight.ttf
┃ ┃ ┣ NotoSansKR-Light.ttf
┃ ┃ ┣ NotoSansKR-Medium.ttf
┃ ┃ ┣ NotoSansKR-Regular.ttf
┃ ┃ ┣ NotoSansKR-SemiBold.ttf
┃ ┃ ┗ NotoSansKR-Thin.ttf
┃ ┗ NewEdgeSoftPower4-LightRounded.otf
┣ img
┃ ┣ archives
┃ ┃ ┣ 1960-Chiffonnier.jpg
┃ ┃ ┣ 1960-chiffonniers.jpg
┃ ┃ ┣ 1961-remise-etat-1.JPG
┃ ┃ ┣ 1961-remise-etat-2.JPG
┃ ┃ ┣ 1961-remise-etat-3.JPG
┃ ┃ ┣ 1961-remise-etat-4.JPG
┃ ┃ ┣ 1969-chiffonnier.png
┃ ┃ ┣ 1973-bidonville-2.jpg
┃ ┃ ┣ 1973-bidonville.jpg
┃ ┃ ┣ 1973-chariot-chiffonnier.jpg
┃ ┃ ┣ 1973-chiffonnier-cartons.jpg
┃ ┃ ┣ 1973-chiffonnier.jpg
┃ ┃ ┣ 1973-pere-jungilwoo.jpg
┃ ┃ ┣ 1973-porteuse-bidonville.jpg
┃ ┃ ┣ 1976-chiffonnier-cartons.jpeg
┃ ┃ ┗ 1978-collecteur-dechets.jpg
┃ ┣ equipe
┃ ┃ ┣ .DS_Store
┃ ┃ ┣ alyssia.jpg
┃ ┃ ┣ dylan.jpg
┃ ┃ ┣ gihoon.jpg
┃ ┃ ┣ hugo.jpg
┃ ┃ ┣ hyunbeom.jpg
┃ ┃ ┣ ines.jpg
┃ ┃ ┣ jaeden.jpg
┃ ┃ ┣ jiwoo.jpg
┃ ┃ ┣ jiyeong.jpg
┃ ┃ ┣ junghyun.jpg
┃ ┃ ┣ membre1.jpg
┃ ┃ ┣ membre2.jpg
┃ ┃ ┣ romane.jpg
┃ ┃ ┣ saki.jpg
┃ ┃ ┣ sakina.jpg
┃ ┃ ┣ sarah.jpg
┃ ┃ ┣ stephane.jpg
┃ ┃ ┣ suyeon.jpg
┃ ┃ ┗ xuan.jpg
┃ ┣ .DS_Store
┃ ┣ arrowdown.png
┃ ┣ arrowleft.png
┃ ┣ arrowright.png
┃ ┣ bgopening.jpeg
┃ ┣ de_white.svg
┃ ┣ dongeui.svg
┃ ┣ favicon.png
┃ ┣ headphones-4-64.png
┃ ┣ uge_white.svg
┃ ┣ univeiffel.svg
┃ ┣ volume-mute.svg
┃ ┗ volume.svg
┣ includes
┃ ┣ archives-gallery.php
┃ ┣ archives-overlay.php
┃ ┣ autopusharchives.php
┃ ┣ css.php
┃ ┣ googleb278f9cb82635524.html
┃ ┣ header.php
┃ ┣ jsinclude.php
┃ ┣ lang.php
┃ ┣ loading.php
┃ ┣ reset.php
┃ ┣ scrolldown.php
┃ ┣ setlang.php
┃ ┣ slide.php
┃ ┣ transition.php
┃ ┗ visionner.php
┣ js
┃ ┣ archives.js
┃ ┣ associations.js
┃ ┣ derriereledocumentaire.js
┃ ┣ index.js
┃ ┣ jquery-3.1.0.min.js
┃ ┣ main.js
┃ ┗ portraits.js
┣ video
┃ ┣ .DS_Store
┃ ┣ archives.mov
┃ ┣ arirang-test.mov
┃ ┣ bache.mov
┃ ┣ cartons.mov
┃ ┣ chariot.mov
┃ ┣ eaulow.mp4
┃ ┣ glaneuse-test.mov
┃ ┣ lee-test.mov
┃ ┣ lee.mov
┃ ┣ recyclerie.mov
┃ ┗ ville.mov
┣ .DS_Store
┣ .gitattributes
┣ .htaccess
┣ associations.php
┣ derriere-le-documentaire.php
┣ glaneurs (14).sql
┣ index.php
┣ mentionslegales.php
┣ naverc5484d0d0937981e7e12f688527ddeb9.html
┣ portraits.php
┣ README.md
┣ robots.txt
┣ sitemap.xml
┣ souvenirs.php
┗ tracesdupasse.php
```
