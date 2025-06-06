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
    <div class="archives-scroll">
        <section class="archive-hero">
            <video autoplay muted loop>
                <source src="video/ville.mov" type="video/mp4">
            </video>
            <div class="archive-title content-anim">
                <?php echo getTranslation("archives_titre", $lang); ?>
            </div>
        </section>
        <section class="archives-content">
           <section class="archives-intro content-anim">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum ad officiis fugit at. Ab repudiandae ullam quis molestiae magni adipisci sapiente enim accusamus, laboriosam ipsum consequatur cupiditate deleniti officiis id.
           </section>
           <?php include "includes/archives-gallery.php"?>
           <?php include "includes/archives-overlay.php"?>

        </section>
    </div>

    <?php include "includes/jsinclude.php"; ?>
    <script src="js/archives.js"></script>
</body>

</html>