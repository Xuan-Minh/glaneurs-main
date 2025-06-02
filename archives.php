<?php include 'includes/lang.php'; // Inclut le fichier pour gérer la langue
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
           <section class="archives-intro">


           </section>

        </section>
    </div>

    <?php include "includes/jsinclude.php"; ?>
    <script src="js/archives.js"></script>
</body>

</html>