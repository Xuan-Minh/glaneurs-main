<?php
function getTranslation($key, $lang = 'fr') {
    static $translations = null;
    if ($translations === null) {
        $pdo = new PDO('mysql:host=localhost;dbname=glaneurs;charset=utf8', 'root', '');
        $stmt = $pdo->query("SELECT * FROM translations");
        $translations = [];
        foreach ($stmt as $row) {
            $translations[$row['key_name']] = $row;
        }
    }
    return isset($translations[$key][$lang]) ? $translations[$key][$lang] : $key;
}