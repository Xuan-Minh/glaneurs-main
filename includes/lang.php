<?php
// Connexion PDO centralisée
function getPDO() {
    static $pdo = null;
    if ($pdo === null) {
        $servername = "localhost";
        $database = "glaneurs";
        $username = "root";
        $password = "root";
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
function getTranslation($key, $lang = 'fr') {
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