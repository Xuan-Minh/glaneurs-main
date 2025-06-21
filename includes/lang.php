
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
        $servername = "localhost";
        $database = "glaneurs";
        $username = "root";
        $password = "root";
        // $servername = "localhost:3306";
        // $database = "glaneursdecarton";
        // $username = "glaneurs_admin";
        // $password = "Wlm7nZGs!pz%d7s0";
        $options = [
            PDO::MYSQL_ATTR_LOCAL_INFILE => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ];
        $dsn = "mysql:host=$servername;dbname=$database;charset=utf8";
        try {
            $pdo = new PDO($dsn, $username, $password, $options);
        } catch (PDOException $error) {
            die('Connection error: ' . $error->getMessage());
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