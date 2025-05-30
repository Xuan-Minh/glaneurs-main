<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include "includes/css.php"; ?>
    <link rel="stylesheet" href="css/portraits.css">
    <title><?php echo getTranslation("portraits_titre", $lang)?></title>
</head>
<body>
    
<?php include "includes/header.php"; ?>

<div class="portraits-container">
    <div class="portrait-section section1" data-target="#detail1">
        <video autoplay muted loop class="portrait-video section1-video">
            <source src="video/glaneuse-test.mov" type="video/mp4">
        </video>
        <div class="portrait-name"><?php echo getTranslation("portraits_master
", $lang); ?></div>
    </div>
    <div class="portrait-section section2" data-target="#detail2">
        <video autoplay muted loop class="portrait-video section2-video">
            <source src="video/lee-test.mov" type="video/mp4">
        </video>
        <div class="portrait-name"><?php echo getTranslation("portraits_lee", $lang); ?></div>
    </div>
    <div class="portrait-section section3" data-target="#detail3">
        <video autoplay muted loop class="portrait-video section3-video">
            <source src="video/arirang-test.mov" type="video/mp4">
        </video>
        <div class="portrait-name">Monsieur Arirang-song</div>
    </div>
    <div class="portrait-section section4" data-target="#detail4">
        <video autoplay muted loop class="portrait-video section4-video">
            <source src="video/glaneuse-test.mov" type="video/mp4">
        </video>
        <div class="portrait-name"><?php echo getTranslation("portraits_jo", $lang); ?></div>
    </div>
</div>

    <section class="portrait-detail" id="detail1">
        <h2><?php echo getTranslation("portraits_master
", $lang); ?></h2>
        <p>Informations spécifiques à <?php echo getTranslation("portraits_master
", $lang); ?>...</p>
         <button class="back-to-portraits">Voir les autres portraits</button>
    </section>

    <section class="portrait-detail" id="detail2">
        <h2><?php echo getTranslation("portraits_lee", $lang); ?></h2>
        <p>Informations spécifiques à <?php echo getTranslation("portraits_lee", $lang); ?>...</p>
         <button class="back-to-portraits">Voir les autres portraits</button>
    </section>

    <section class="portrait-detail" id="detail3">
        <h2>Monsieur Arirang-song</h2>
        <p>Informations spécifiques à Monsieur Arirang-song...</p>
         <button class="back-to-portraits">Voir les autres portraits</button>
    </section>

    <section class="portrait-detail" id="detail4">
        <h2><?php echo getTranslation("portraits_jo", $lang); ?></h2>
        <p>Informations spécifiques à <?php echo getTranslation("portraits_jo", $lang); ?>...</p>
         <button class="back-to-portraits">Voir les autres portraits</button>
    </section>

    <?php include "includes/jsinclude.php"; ?>
    <?php include "includes/visionner.php"; ?>
</body>
</html>