

<?php
session_start();

// --- GESTION SÉCURISÉE DE LA LANGUE ---
$allowedLangs = ['fr', 'en', 'ko'];
if (isset($_GET['lang']) && in_array($_GET['lang'], $allowedLangs, true)) {
    $lang = $_GET['lang'];
    $_SESSION['lang'] = $lang;
} elseif (isset($_SESSION['lang']) && in_array($_SESSION['lang'], $allowedLangs, true)) {
    $lang = $_SESSION['lang'];
} else {
    $lang = 'fr'; // fallback par défaut
    $_SESSION['lang'] = $lang;
}
// $lang est maintenant toujours 'fr', 'en' ou 'ko'.

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

    // Vérifier si la traduction existe dans la langue demandée
    if (isset($translations[$key][$lang]) && $translations[$key][$lang] !== '') {
        return htmlspecialchars($translations[$key][$lang], ENT_QUOTES, 'UTF-8');
    }
    // Fallback sur le français
    if (isset($translations[$key]['fr']) && $translations[$key]['fr'] !== '') {
        return htmlspecialchars($translations[$key]['fr'], ENT_QUOTES, 'UTF-8');
    }
    // Fallback sur l'anglais
    if (isset($translations[$key]['en']) && $translations[$key]['en'] !== '') {
        return htmlspecialchars($translations[$key]['en'], ENT_QUOTES, 'UTF-8');
    }
    // Sinon, retourner un message d'erreur clair et SÉCURISÉ
    return 'TRADUCTION_MANQUANTE: ' . htmlspecialchars($key, ENT_QUOTES, 'UTF-8');
}
?>