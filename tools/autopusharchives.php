<?php
// Activer l'affichage des erreurs pour le débogage
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: text/plain; charset=utf-8');

$dir = __DIR__ . '/../img/archives';
echo "-- Analyse du dossier : " . realpath($dir) . "\n\n";

$files = @scandir($dir);

if ($files === false) {
    die("ERREUR : Impossible de lire le dossier. Vérifiez que le dossier 'img/archives' existe et que les permissions sont correctes.");
}

$generated_queries = 0;

foreach ($files as $file) {
    // Ignore les dossiers . et .. et les fichiers système comme .DS_Store
    if (in_array($file, ['.', '..']) || strpos($file, '.') === 0) {
        continue;
    }

    // Le nom du fichier DOIT être au format: AAAA-Titre du fichier.ext
    // Exemple : 1953-Chiffonniers-dans-la-rue.jpg
    if (preg_match('/^(\d{4})-([^.]+)\.(jpg|jpeg|png|gif)$/i', $file, $matches)) {
        
        $date = $matches[1];
        // Remplace les tirets et underscores par des espaces pour un titre plus propre
        $titre = ucfirst(str_replace(['-', '_'], ' ', $matches[2]));
        $src = "img/archives/" . $file;
        $auteur = 'À remplir'; // Placeholder

        // Génère la requête SQL
        echo "INSERT INTO `archives` (`archives_titre`, `archives_src`, `archives_date`, `archives_auteur`) VALUES ('" . addslashes($titre) . "', '" . addslashes($src) . "', '" . addslashes($date) . "', '" . addslashes($auteur) . "');\n";
        $generated_queries++;

    } else {
        // Affiche les fichiers qui ne correspondent pas au format attendu
        echo "-- Fichier ignoré (format incorrect) : " . htmlspecialchars($file) . "\n";
    }
}

if ($generated_queries === 0) {
    echo "\n-- Aucune requête générée. Vérifiez que vos fichiers dans 'img/archives' respectent le format 'AAAA-Titre.ext'\n";
}
?>