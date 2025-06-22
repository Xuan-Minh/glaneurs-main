<?php include 'includes/lang.php'; // Inclut le fichier pour gérer la langue
?>
<?php
// ...avant le </div> de .archives-scroll...
// Récupère les archives depuis la base
$pdo = getPDO();
$archives = $pdo->query("SELECT * FROM archives")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" <?php if ($lang == 'kr') echo ' class="kr-lang"'; ?>>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include "includes/css.php"; ?>
    <link rel="stylesheet" href="css/archives.css">
    <title><?php echo getTranslation("archives_titre", $lang) ?></title>
</head>

<body>
    <?php include "includes/header.php"; ?>
    <audio id="audio-arirang" src="audio/slide3.mp3" loop preload="auto"></audio>
    <div class="archives-scroll">
        <section class="archive-hero">
            <video autoplay muted loop>
                <source src="video/archives.mov" type="video/mp4">
            </video>
            <h2 class="archive-title content-anim">
                <?php echo getTranslation("archives_titre", $lang); ?>
            </h2>
        </section>
         <section class="archives-content">
            <!-- NOUVEAU: Menu de navigation des chapitres -->
            <nav class="archive-nav-container">
                <ul>
                    <?php
                    // La structure doit être définie ici pour être utilisée par la nav et le contenu
                    $chapters_structure = array(
                        1 => 3, 2 => 5, 3 => 2, 4 => 5, 5 => 6, 6 => 3
                    );

                    foreach ($chapters_structure as $chap_num => $text_count) {
                        echo '<li><a href="#chapter-' . $chap_num . '" class="nav-link" data-scroll-to="chapter-' . $chap_num . '">' . getTranslation("chapitre{$chap_num}_titre", $lang) . '</a></li>';
                    }
                    ?>
                </ul>
            </nav>

            <div class="archives-narrative">
                 <section class="archives-intro content-anim preserve-lines">
                    <p><?php echo getTranslation("archives_intro_texte", $lang); ?></p>
                </section>

                <?php
                // Boucle sur la structure pour afficher chaque chapitre et ses paragraphes
                foreach ($chapters_structure as $chap_num => $text_count) {
                ?>
                    <!-- AJOUT: un id unique pour chaque chapitre -->
                    <section id="chapter-<?php echo $chap_num; ?>" class="archive-chapter content-anim">
                        <h3><?php echo getTranslation("chapitre{$chap_num}_titre", $lang); ?></h3>
                        <?php
                        // Boucle intérieure pour afficher chaque paragraphe du chapitre
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

            <section class="archives-gallery-section">
                <h3 class="gallery-title content-anim"><?php echo getTranslation("archives_galerie_titre", $lang); ?></h3>
                <?php include "includes/archives-gallery.php"; ?>
            </section>
           
            <?php include "includes/archives-overlay.php"; ?>

        </section>
    </div>

    <?php include "includes/jsinclude.php"; ?>
    <script src="js/archives.js"></script>
</body>

</html>