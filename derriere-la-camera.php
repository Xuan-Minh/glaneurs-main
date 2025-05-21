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
$equipe = [];
for ($i = 1; $i <= 16; $i++) {
    $etat = rand(0, 1) ? 'image' : 'texte'; // aléatoire
   $equipe = [
    [
        "nom" => "Xuan-Minh TRAN",
        "roles" => ["Directeur de projet", "Développeur web", "Prise de contact", "Technicien sonore", "Interprète", "Perch-man"],
        "image" => "img/equipe/membre1.jpg"
    ],
    [
        "nom" => "Sakina DOUIOU",
        "roles" => ["Réalisatrice", "Directrice de projet","Scénariste", "Photographe","Chef opératrice", "Cadreuse", "Monteuse", "Etalonnage"],
        "image" => "img/equipe/membre2.jpg"
    ],
      [
        "nom" => "Dylan BLANDEL",
        "roles" => ["Responsable montage FR", "Scénariste", "Graphiste", "Cadreur"],
        "image" => "img/equipe/membre1.jpg"
    ],
    [
        "nom" => "Hyun-Beom",
        "roles" => ["Compositeur musique originale", "Monteur son", "Interprète coréen"],
        "image" => "img/equipe/membre2.jpg"
    ], 
    [
        "nom" => "Romane VARO-TUPIN",
        "roles" => ["Assistante de production", "Prise de contact", "Organisatrice", "Transcription" ,"Sous-titreuse"],
        "image" => "img/equipe/membre2.jpg"
    ],
      [
        "nom" => "Inès DOS SANTOS",
        "roles" => ["Webmaster", "UX/UI designer", "Maquettiste", "Graphiste"],
        "image" => "img/equipe/membre1.jpg"
    ],
    [
        "nom" => "Sarah CROS",
        "roles" => ["Graphiste", "UX/UI designer","Maquettiste" ,"Monteuse"],
        "image" => "img/equipe/membre2.jpg"
    ],
      [
        "nom" => "Hugo LEULLIET",
        "roles" => ["Perch-man", "Monteur son", "Compositeur musique originale"],
        "image" => "img/equipe/membre1.jpg"
    ],
      [
        "nom" => "Alyssia BERSET",
        "roles" => ["Responsable Montage KR", "Repérage", "Interprète"],
        "image" => "img/equipe/membre1.jpg"
    ],
    [
        "nom" => "Jaeden DUONG",
        "roles" => ["Traductrice","Transcripteuse", "Repérage"],
        "image" => "img/equipe/membre2.jpg"
    ],
      [
        "nom" => "Jung-Hyun",
        "roles" => ["Perch-man"],
        "image" => "img/equipe/membre1.jpg"
    ],
    [
        "nom" => "Su-yeon",
        "roles" => ["Interprète"],
        "image" => "img/equipe/membre2.jpg"
    ],
    [
        "nom" => "Ji-woo",
        "roles" => ["Transcripteuse"],
        "image" => "img/equipe/membre1.jpg"
    ],
      [
        "nom" => "Ji-yeong",
        "roles" => ["Interprète", "Transcripteuse"],
        "image" => "img/equipe/membre1.jpg"
    ],     
      [
        "nom" => "Stephane LEVY",
        "roles" => ["Corps Enseignant","Tutrice"],
        "image" => "img/equipe/membre1.jpg"
    ],
    [
        "nom" => "Gihoon YU",
        "roles" => ["Corps Enseignant","Traducteur"],
        "image" => "img/equipe/membre2.jpg"
    ],

];
}
?>
    <?php include "includes/header.php"; ?>
<div class="team-grid">
    <?php foreach ($equipe as $i => $membre): ?>
        <div class="team-member show-photo" data-index="<?php echo $i; ?>">
            <div class="team-face team-photo" style="background-image: url('<?php echo htmlspecialchars($membre['image']); ?>');"></div>
            <div class="team-face team-info">
                <div class="team-name"><?php echo htmlspecialchars($membre['nom']); ?></div>
                <div class="team-role">
                    <?php foreach ($membre['roles'] as $role): ?>
                        <div><?php echo htmlspecialchars($role); ?></div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    <?php endforeach; ?>
</div>
    <?php include "includes/jsinclude.php"; ?>
<?php include "includes/visionner.php"; ?>
</body>
</html>