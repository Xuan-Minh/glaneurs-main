<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include "includes/css.php"; ?>
    <link rel="stylesheet" href="css/derrierelacamera.css">
    <?php include "includes/css.php"; ?>
    <link rel="stylesheet" type="text/css" href="css/navbar.css" />
    <link rel="icon" href="img/favicon.png" type="image/png" />
    <title>Derrière la caméra</title>
</head>
<body>
    <div class="team-intro">
    <h2>J'vais me flinguer</h2>
    <p>
        Notre documentaire est le fruit d’un travail collectif, guidé par une vision commune : donner la parole à ceux qu’on n’entend jamais, et révéler la dignité derrière chaque histoire. Découvrez l’équipe qui porte cette direction artistique et humaine.
    </p>
</div>
    <?php
$equipe = [
    [
        "nom" => "Nom 1",
        "role" => "Rôle 1",
        "image" => "img/equipe/membre1.jpg"
    ],
    [
        "nom" => "Nom 2",
        "role" => "Rôle 2",
        "image" => "img/equipe/membre2.jpg"
    ],
    [
        "nom" => "Nom 3",
        "role" => "Rôle 3",
        "image" => "img/equipe/membre3.jpg"
    ],
    [
        "nom" => "Nom 4",
        "role" => "Rôle 4",
        "image" => "img/equipe/membre4.jpg"
    ],
    [
        "nom" => "Nom 5",
        "role" => "Rôle 5",
        "image" => "img/equipe/membre5.jpg"
    ],
    [
        "nom" => "Nom 6",
        "role" => "Rôle 6",
        "image" => "img/equipe/membre6.jpg"
    ],
    [
        "nom" => "Nom 7",
        "role" => "Rôle 7",
        "image" => "img/equipe/membre7.jpg"
    ],
    [
        "nom" => "Nom 8",
        "role" => "Rôle 8",
        "image" => "img/equipe/membre8.jpg"
    ],
    [
        "nom" => "Nom 9",
        "role" => "Rôle 9",
        "image" => "img/equipe/membre9.jpg"
    ],
    [
        "nom" => "Nom 10",
        "role" => "Rôle 10",
        "image" => "img/equipe/membre10.jpg"
    ],
    [
        "nom" => "Nom 11",
        "role" => "Rôle 11",
        "image" => "img/equipe/membre11.jpg"
    ],
    [
        "nom" => "Nom 12",
        "role" => "Rôle 12",
        "image" => "img/equipe/membre12.jpg"
    ],
    [
        "nom" => "Nom 13",
        "role" => "Rôle 13",
        "image" => "img/equipe/membre13.jpg"
    ],
    [
        "nom" => "Nom 14",
        "role" => "Rôle 14",
        "image" => "img/equipe/membre14.jpg"
    ],
    [
        "nom" => "Nom 15",
        "role" => "Rôle 15",
        "image" => "img/equipe/membre15.jpg"
    ],
     [
        "nom" => "Nom 16",
        "role" => "Rôle 16",
        "image" => "img/equipe/membre16.jpg"
    ]
];
?>
    <?php include "includes/header.php"; ?>
<div class="team-grid">
    <?php foreach ($equipe as $membre): ?>
        <div class="team-member">
            <div class="team-face team-photo" style="background-image: url('<?php echo $membre['image']; ?>');"></div>
            <div class="team-face team-info">
                <div class="team-name"><?php echo htmlspecialchars($membre['nom']); ?></div>
                <div class="team-role"><?php echo htmlspecialchars($membre['role']); ?></div>
            </div>
        </div>
    <?php endforeach; ?>
</div>
    <?php include "includes/jsinclude.php"; ?>
<?php include "includes/visionner.php"; ?>
</body>
</html>