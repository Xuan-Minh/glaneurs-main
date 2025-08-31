---
# 🎬 Les Glaneurs de Carton

Site web immersif pour le documentaire **Les Glaneurs de Carton**
[🌐 Voir le site en ligne](https://glaneursdecarton.mastercmw.com/)
---

## 🛠️ Stack technique

| Frontend        | Backend | Base de données | Animation | Déploiement       |
| --------------- | ------- | --------------- | --------- | ----------------- |
| HTML5, CSS3, JS | PHP 8+  | MySQL/MariaDB   | jQuery    | Serveur mutualisé |

---

## 🚀 Installation & Lancement

### Prérequis

- Serveur local (MAMP, WAMP, XAMPP…)
- Client base de données (phpMyAdmin, Sequel Pro…)
- Fichier `.sql` de la base

### Étapes

1. **Cloner le dépôt**

```bash
git clone https://github.com/Xuan-Minh/glaneurs-main.git
```

2. **Créer la base de données**

- Créez une BDD nommée `glaneurs`
- Importez le fichier `.sql` fourni

3. **Configurer la connexion**

- Ouvrir `includes/lang.php`
- Adapter les identifiants :
  ```php
  $servername = "localhost";
  $database = "glaneurs";
  $username = "root";
  $password = "root"; // généralement "root" sous MAMP
  ```

4. **Lancer le site**

- Accédez à [http://localhost/glaneurs-main](http://localhost/glaneurs-main)

---

## 🗂️ Structure du projet

```
glaneurs-main/
│
├── audio/               # Fichiers audio
├── css/                 # Feuilles de style (main, pages, composants)
├── font/                # Polices
├── img/                 # Images et sous-dossiers
├── includes/
│   ├── components/      # Blocs PHP réutilisables (overlay, slide, etc.)
│   └── layout/          # Layouts globaux (header, css, js, loading)
├── js/                  # Scripts JS (un fichier par page ou composant)
├── video/               # Vidéos
├── tools/               # Scripts d’admin/maintenance
│
├── index.php
├── derriere-le-documentaire.php
├── portraits.php
├── souvenirs.php
├── tracesdupasse.php
├── mentionslegales.php
├── README.md
├── LICENSE.md
└── ...
```

---

## 👤 Auteur

- **Xuan-Minh TRAN** — Développement & intégration
- **Sakina DOUIOU** — Conception

---

## ⚖️ Licence

Ce projet utilise plusieurs licences selon les composants (code, musique, images).  
Voir [LICENSE.md](LICENSE.md) pour le détail.

---

N’hésite pas à contribuer, signaler un bug ou proposer des idées d’amélioration !  
Pour toute question, contacte-moi sur GitHub.

---

Si tu veux une version anglaise, d’autres badges, ou une section équipe/partenaires, dis-le-moi !
