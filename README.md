

<h1 align="center">🎬 Les Glaneurs de Carton</h1>
<p align="center">
  Site web immersif pour le documentaire <b>Les Glaneurs de Carton</b> <br>
  <a href="https://glaneursdecarton.mastercmw.com/">🌐 Voir le site en ligne</a>
</p>

---

## ✨ Technologies

- <b>Frontend</b> : HTML5, CSS3 (Flexbox, Grid, Animations, <code>clamp()</code>), JavaScript (ES6+), jQuery 3.1.0
- <b>Backend</b> : PHP 8+
- <b>Base de données</b> : MySQL / MariaDB (via PDO)
- <b>Environnement</b> : MAMP / WAMP / LAMP

---

## 🚀 Installation & Lancement

### <img src="https://img.icons8.com/emoji/18/000000/check-mark-emoji.png"/> Prérequis

- Serveur local (MAMP, WAMP, XAMPP…)
- Client base de données (phpMyAdmin, Sequel Pro…)
- Fichier de base de données <code>.sql</code>

### <img src="https://img.icons8.com/emoji/18/000000/rocket.png"/> Étapes

1. **Cloner le dépôt**  
   ```bash
   git clone https://github.com/Xuan-Minh/glaneurs-main.git
   ```
2. **Créer la base de données**  
   - Créez une BDD nommée <code>glaneurs</code>
   - Importez le fichier <code>.sql</code> fourni
3. **Configurer la connexion**  
   - Ouvrir <code>includes/lang.php</code>
   - Adapter les identifiants :
     ```php
     $servername = "localhost";
     $database = "glaneurs";
     $username = "root";
     $password = "root"; // généralement "root" sous MAMP
     ```
4. **Lancer le site**  
   - Accédez à [http://localhost/glaneurs-main](http://localhost/glaneurs-main) depuis votre navigateur

---

## 🗂️ Structure du projet

```
glaneurs-main/
│
├── .vscode/               # Paramétrage VS Code
├── audio/                 # Fichiers audio
├── css/                   # Feuilles de style
├── font/                  # Polices
├── img/                   # Images
├── includes/              # Fichiers PHP inclus
├── js/                    # Scripts JS
├── video/                 # Vidéos
│
├── .gitattributes
├── .htaccess
├── associations.php
├── derriere-le-documentaire.php
├── glaneurs (14).sql
├── index.php
├── mentionslegales.php
├── naverc5484d0d0937981e7e12f688527ddeb9.html
├── portraits.php
├── README.md
├── robots.txt
├── sitemap.xml
├── souvenirs.php
└── tracesdupasse.php
```

---

## 👤 Auteur

- **Xuan-Minh TRAN** — Développement & intégration du site web

---

## ⚖️ Licence

Ce projet utilise plusieurs licences selon les composants (code, musique, images).  
Pour plus d’informations, voir [LICENSE.md](LICENSE.md).

---

<p align="center">
  <img src="img/readme/previe.png" alt="Aperçu du site" width="60%"/>
</p>
---

N’hésite pas à cloner, à tester localement ou à contribuer !  
Pour toute question, contacte-moi sur GitHub.

---
