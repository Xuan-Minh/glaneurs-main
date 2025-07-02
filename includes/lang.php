
<?php
session_start();

// Si ?lang=... dans l'URL, on l'utilise et on met à jour la session
if (isset($_GET['lang']) && in_array($_GET['lang'], ['fr', 'en', 'ko'])) {
    $lang = $_GET['lang'];
    $_SESSION['lang'] = $lang;
} else {
    $lang = $_SESSION['lang'] ?? 'fr';
}

// Connexion PDO centralisée
function getPDO()
{
    static $pdo = null;
    if ($pdo === null) {
        // --- MÉTHODE FINALE : FICHIER DE CONFIGURATION ---

        // 1. Définir les valeurs par défaut pour le développement local (MAMP)
        $servername = 'localhost';
        $database   = 'glaneurs';
        $username   = 'root';
        $password   = 'root';

        // 2. Vérifier si un fichier de configuration de production existe
        $configFile = __DIR__ . '/config.php';
        if (file_exists($configFile)) {
            // Si oui (on est sur le serveur de prod), on charge ses valeurs
            require_once $configFile;
            $servername = $db_config['host'];
            $database   = $db_config['name'];
            $username   = $db_config['user'];
            $password   = $db_config['pass'];
        }

        // 3. Tenter la connexion avec les bonnes valeurs
        $options = [
            PDO::MYSQL_ATTR_LOCAL_INFILE => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ];
        $dsn = "mysql:host=$servername;dbname=$database;charset=utf8";
        try {
            $pdo = new PDO($dsn, $username, $password, $options);
        } catch (PDOException $error) {
            // Affiche une erreur claire si la connexion échoue
            // die('Erreur de connexion à la base de données.');
            die('Erreur de connexion : ' . $error->getMessage()); // Gardez ceci pour le dernier test
        }
    }
    return $pdo;
}


// Fonction de traduction
function getTranslation($key, $lang = 'fr')
{
    static $translations = null;
    if ($translations === null) {
        $pdo = getPDO();
        // Optimisation : ne sélectionner que les colonnes nécessaires
        $stmt = $pdo->query("SELECT key_name, fr, en, ko FROM translations");
        $translations = [];
        foreach ($stmt as $row) {
            $translations[$row['key_name']] = $row;
        }
    }

    // Vérifier si la traduction existe
    if (isset($translations[$key][$lang])) {
        // Si oui, retourner la valeur SÉCURISÉE
        return htmlspecialchars($translations[$key][$lang], ENT_QUOTES, 'UTF-8');
    }

    // Sinon, retourner un message d'erreur clair et SÉCURISÉ
    return 'TRADUCTION_MANQUANTE: ' . htmlspecialchars($key, ENT_QUOTES, 'UTF-8');
}
?>