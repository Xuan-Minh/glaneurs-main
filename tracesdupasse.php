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
            <div class="archives-narrative">
                 <section class="archives-intro content-anim preserve-lines">
                    <p><?php echo getTranslation("archives_intro_texte", $lang); ?></p>
                </section>

                <?php
                // Définit la structure des chapitres et le nombre de paragraphes pour chacun
                $chapters_structure = array(
                    1 => 3, // Chapitre 1 a 3 paragraphes
                    2 => 5, // Chapitre 2 a 5 paragraphes
                    3 => 2, // Chapitre 3 a 2 paragraphes
                    4 => 5, // Chapitre 4 a 5 paragraphes
                    5 => 6, // Chapitre 5 a 6 paragraphes
                    6 => 3  // Chapitre 6 a 3 paragraphes
                );

                // Boucle sur la structure pour afficher chaque chapitre et ses paragraphes
                foreach ($chapters_structure as $chap_num => $text_count) {
                ?>
                    <section class="archive-chapter content-anim">
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