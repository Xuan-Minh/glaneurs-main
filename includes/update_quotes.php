<?php
// Activer l'affichage des erreurs pour le débogage
ini_set('display_errors', 1);
error_reporting(E_ALL);

// --- CONFIGURATION ---
$db_host = 'localhost';
$db_name = 'glaneurs';
$db_user = 'root';
$db_pass = 'root';
$table_name = 'translations';
$id_column = 'id';
// -------------------

// Connexion à la base de données
$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($mysqli->connect_error) {
    die('Erreur de connexion (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}
$mysqli->set_charset('utf8mb4');

echo "<h1>Mise à jour des guillemets (EN & KR uniquement)</h1>";

// 1. Sélectionner toutes les lignes qui contiennent des guillemets en anglais ou coréen
$sql_select = "SELECT `{$id_column}`, `en`, `kr` FROM `{$table_name}` WHERE `en` LIKE '%\"%' OR `kr` LIKE '%\"%'";
$result = $mysqli->query($sql_select);

if ($result->num_rows === 0) {
    echo "<p>Aucun texte contenant des guillemets à mettre à jour dans les colonnes 'en' ou 'kr'.</p>";
    $mysqli->close();
    exit;
}

echo "<p>Trouvé " . $result->num_rows . " textes à traiter...</p>";

// 2. Préparer la requête de mise à jour pour les colonnes EN et KR
$sql_update = "UPDATE `{$table_name}` SET `en` = ?, `kr` = ? WHERE `{$id_column}` = ?";
$stmt = $mysqli->prepare($sql_update);
if (!$stmt) {
    die("Erreur de préparation de la requête : " . $mysqli->error);
}

$count = 0;
// 3. Boucler sur chaque résultat et effectuer le remplacement
while ($row = $result->fetch_assoc()) {
    $id = $row[$id_column];
    $original_en = $row['en'];
    $original_kr = $row['kr'];

    // Fonction de remplacement réutilisable
    $replace_quotes = function ($text) {
        if (strpos($text, '"') === false) return $text;
        $is_opening = true;
        return preg_replace_callback('/"/', function ($matches) use (&$is_opening) {
            if ($is_opening) {
                $is_opening = false;
                return '❝';
            } else {
                $is_opening = true;
                return '❞';
            }
        }, $text);
    };

    $updated_en = $replace_quotes($original_en);
    $updated_kr = $replace_quotes($original_kr);

    // 4. Exécuter la mise à jour si au moins un texte a changé
    if ($original_en !== $updated_en || $original_kr !== $updated_kr) {
        $stmt->bind_param('ssi', $updated_en, $updated_kr, $id);
        $stmt->execute();
        echo "ID #{$id} mis à jour.<br>";
        $count++;
    }
}

echo "<h2>Terminé !</h2>";
echo "<p>{$count} enregistrements ont été mis à jour avec succès.</p>";

$stmt->close();
$mysqli->close();

?>