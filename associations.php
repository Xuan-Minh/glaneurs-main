<!DOCTYPE html>
<html lang="<?php echo $lang; ?>"<?php if ($lang == 'kr') echo ' class="kr-lang"'; ?>>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include "includes/css.php"; ?>
    <link rel="stylesheet" href="css/associations.css">
    <title><?php echo getTranslation("associations_titre", $lang)?></title>
</head>
<body>
    <?php include "includes/header.php"; ?>
     <div class="associations-scroll">
        <section class="associations-hero">
            <video autoplay muted loop>
                <source src="video/bache.mov" type="video/mp4">
            </video>
            <div class="associations-title content-anim">
                <?php echo getTranslation("associations_titre", $lang); ?>
            </div>
        </section>
        <section class="associations-content">
            <!-- Ici tu mets le reste de ta page associationss -->
            <div>Contenu des associationss à venir...</div>
        </section>
    </div>

    <?php include "includes/jsinclude.php"; ?>
    <script src="js/associations.js"></script>
</body>
</html>