<?php include 'includes/lang.php'; // Inclut le fichier pour gérer la langue
?>
<?php
$pdo = getPDO();
$archives = $pdo->query("SELECT * FROM archives")->fetchAll(PDO::FETCH_ASSOC);
// Structure des chapitres utilisée par la navigation (définie en amont)
$chapters_structure = array(
    1 => 3, 2 => 6, 3 => 5, 4 => 3, 5 => 6, 6 => 3
);
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" <?php if ($lang == 'ko') echo ' class="ko-lang"'; ?>>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include "includes/layout/css.php"; ?>
    <link rel="stylesheet" href="css/archives.css">
    <title><?php echo getTranslation("archives_titre", $lang) ?></title>
</head>

<body>
    <?php include "includes/layout/header.php"; ?>
    <audio id="audio-arirang" src="audio/slide3.mp3" loop preload="auto"></audio>
    <!-- Menu hors du container scrollable pour que position:fixed fonctionne correctement -->
    <div class="archives-scroll">
        <?php include 'includes/components/hero.php'; renderHero('video/web/archives.mp4', 'img/posters/archives_poster.png', getTranslation("archives_titre", $lang), 'archive-hero', $lang); ?>
        <section class="archives-content">
            <div class="archives-narrative">
                 <section class="archives-intro content-anim preserve-lines">
                    <p><?php echo getTranslation("archives_intro_texte", $lang); ?></p>
                    <p><?php echo getTranslation("archives_intro_texte2", $lang); ?></p>
                </section>

                <?php
                // Boucle sur la structure pour afficher chaque chapitre et ses paragraphes
                foreach ($chapters_structure as $chap_num => $text_count) {
                ?>
                    <!-- AJOUT: un id unique pour chaque chapitre -->
                    <section id="chapter-<?php echo $chap_num; ?>" class="archive-chapter content-anim">
                        <h3><?php echo getTranslation("chapitre{$chap_num}_titre", $lang); ?></h3>
                        <?php
                        for ($i = 1; $i <= $text_count; $i++) {
                        ?>
                            <p class="preserve-lines"><?php echo getTranslation("chapitre{$chap_num}_texte{$i}", $lang); ?></p>
                        <?php
                        }
                        ?>
                    </section>
                <?php
                }
                ?>
            </div>

        </section>
    </div>

    <?php include "includes/layout/jsinclude.php"; ?>
    <script src="js/pages/archives.js" defer></script>
    <script src="js/features/gallery-overlay.js" defer></script> <!-- NOUVEAU: Inclure le script de l'overlay -->
    <?php include "includes/components/visionner.php"; ?>
</body>
</html>