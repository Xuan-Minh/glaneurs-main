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
    <nav class="archive-nav-container">
        <ul>
            <?php
            foreach ($chapters_structure as $chap_num => $text_count) {
                echo '<li><a href="#chapter-' . $chap_num . '" class="nav-link" data-scroll-to="chapter-' . $chap_num . '">' . getTranslation("chapitre{$chap_num}_titre", $lang) . '</a></li>';
            }
            ?>
        </ul>
    </nav>
    <div class="archives-scroll">
        <section class="archive-hero">
            <video autoplay muted loop poster="img/posters/archives_poster.png">
                <source src="video/web/archives.mp4" type="video/mp4">
            </video>
            <h2 class="archive-title content-anim">
                <?php echo getTranslation("archives_titre", $lang); ?>
            </h2>
        </section>
        <section class="archives-content">
            <div class="archives-narrative">
                 <section class="archives-intro content-anim preserve-lines">
                    <p><?php echo getTranslation("archives_intro_texte", $lang); ?></p>
                    <p><?php echo getTranslation("archives_intro_texte2", $lang); ?></p>

                    <!-- NOUVEAU: Mini-galerie d'introduction -->
                    <div class="intro-image-gallery content-anim">
                        <a class="archive-gallery-item" data-src="img/archives/1951-intro-agri1.jpg" data-titre="Agriculture 1" data-date="Date 1" data-auteur="Auteur 1">
                            <img src="img/archives/1951-intro-agri1.jpg" alt="Agriculture">
                        </a>
                        <a class="archive-gallery-item" data-src="img/archives/1951-intro-agri2.jpg" data-titre="Agriculture 2" data-date="Date 2" data-auteur="Auteur 2">
                            <img src="img/archives/1951-intro-agri2.jpg" alt="Agriculture">
                        </a>
                        <a class="archive-gallery-item" data-src="img/archives/1951-intro-agri3.jpg" data-titre="Agriculture 3" data-date="Date 3" data-auteur="Auteur 3">
                            <img src="img/archives/1951-intro-agri3.jpg" alt="Agriculture">
                        </a>
                    </div>
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

           
            <?php include "includes/components/archives-overlay.php"; ?>

        </section>
    </div>

    <?php include "includes/layout/jsinclude.php"; ?>
    <script src="js/pages/archives.js" defer></script>
    <script src="js/features/gallery-overlay.js" defer></script> <!-- NOUVEAU: Inclure le script de l'overlay -->
    <?php include "includes/components/visionner.php"; ?>
</body>
</html>