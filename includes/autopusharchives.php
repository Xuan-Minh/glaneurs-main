<?php
$dir = __DIR__ . '/../img/archives';
$files = scandir($dir);

foreach ($files as $file) {
    if (in_array($file, ['.', '..'])) continue;
    if (!preg_match('/^(\d{4})-([^.]+)\.(jpg|jpeg|png|gif)$/i', $file, $matches)) continue;

    $date = $matches[1];
    $titre = $matches[2];
    $src = "img/archives/$file";
    $auteur = 'À remplir';

    echo "INSERT INTO archives (archives_titre, archives_src, archives_date, archives_auteur) VALUES ('" . addslashes($titre) . "', '" . addslashes($src) . "', '" . addslashes($date) . "', '" . addslashes($auteur) . "');\n";
}
?>