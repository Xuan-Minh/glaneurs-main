
<?php
session_start();

// Si ?lang=... dans l'URL, on l'utilise et on met à jour la session
if (isset($_GET['lang']) && in_array($_GET['lang'], ['fr', 'en', 'kr'])) {
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
        // On essaie de lire les variables d'environnement (pour Plesk).
        // Si elles n'existent pas, on utilise les valeurs par défaut (pour MAMP).
        // L'opérateur '??' signifie "si la variable à gauche est nulle, utilise la valeur à droite".
        $servername = $_ENV['DB_HOST'] ?? 'localhost';
        $database   = $_ENV['DB_NAME'] ?? 'glaneurs';
        $username   = $_ENV['DB_USER'] ?? 'root';
        $password   = $_ENV['DB_PASS'] ?? 'root';

        $options = [
            PDO::MYSQL_ATTR_LOCAL_INFILE => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ];
        $dsn = "mysql:host=$servername;dbname=$database;charset=utf8";
        try {
            $pdo = new PDO($dsn, $username, $password, $options);
        } catch (PDOException $error) {
            // En cas d'erreur, on affiche un message générique pour la sécurité.
            // En développement, vous pouvez décommenter la ligne détaillée.
            die('Erreur de connexion à la base de données.');
            // die('Connection error: ' . $error->getMessage());
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
        $stmt = $pdo->query("SELECT * FROM translations");
        $translations = [];
        foreach ($stmt as $row) {
            $translations[$row['key_name']] = $row;
        }
    }
    return isset($translations[$key][$lang]) ? $translations[$key][$lang] : $key;
}
?>