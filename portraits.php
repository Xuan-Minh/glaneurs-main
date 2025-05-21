<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include "includes/css.php"; ?>
    <link rel="stylesheet" href="css/stylesub.css">
    <link rel="stylesheet" type="text/css" href="css/navbar.css" />
    <link rel="icon" href="img/favicon.png" type="image/png" />
    <title>Portraits</title>
</head>
<body>
    <?php include "includes/header.php"; ?>

<div class="portraits-container">
    <div class="portrait-section section1" data-target="#detail1">
        <video autoplay muted loop class="portrait-video section1-video">
            <source src="video/glaneuse-test.mov" type="video/mp4">
        </video>
        <div class="portrait-name">Master le goat</div>
    </div>
    <div class="portrait-section section2" data-target="#detail2">
        <video autoplay muted loop class="portrait-video section2-video">
            <source src="video/lee-test.mov" type="video/mp4">
        </video>
        <div class="portrait-name">Lee Sang-Man</div>
    </div>
    <div class="portrait-section section3" data-target="#detail3">
        <video autoplay muted loop class="portrait-video section3-video">
            <source src="video/arirang-test.mov" type="video/mp4">
        </video>
        <div class="portrait-name">Monsieur Arirang-song</div>
    </div>
    <div class="portrait-section section4" data-target="#detail4">
        <video autoplay muted loop class="portrait-video">
            <source src="video/glaneuse-test.mov" type="video/mp4">
        </video>
        <div class="portrait-name">Madame la glaneuse</div>
    </div>
</div>

    <section class="portrait-detail" id="detail1">
        <h2>Master le goat</h2>
        <p>Informations spécifiques à Master le goat...</p>
         <button class="back-to-portraits">Voir les autres portraits</button>
    </section>

    <section class="portrait-detail" id="detail2">
        <h2>Lee Sang-Man</h2>
        <p>Informations spécifiques à Lee Sang-Man...</p>
         <button class="back-to-portraits">Voir les autres portraits</button>
    </section>

    <section class="portrait-detail" id="detail3">
        <h2>Monsieur Arirang-song</h2>
        <p>Informations spécifiques à Monsieur Arirang-song...</p>
         <button class="back-to-portraits">Voir les autres portraits</button>
    </section>

    <section class="portrait-detail" id="detail4">
        <h2>Madame la glaneuse</h2>
        <p>Informations spécifiques à Madame la glaneuse...</p>
         <button class="back-to-portraits">Voir les autres portraits</button>
    </section>

    <?php include "includes/jsinclude.php"; ?>
<?php include "includes/visionner.php"; ?>
</body>
</html>