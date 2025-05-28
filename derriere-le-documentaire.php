<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include "includes/css.php"; ?>
    <link rel="stylesheet" href="css/derriereledocumentaire.css">
    <title>Derrière le documentaire</title>
</head>
<body>
    <div class="team-intro">
    <h2>J'vais me flinguer</h2>
    <p>
        Notre documentaire est le fruit d’un travail collectif, guidé par une vision commune : donner la parole à ceux qu’on n’entend jamais, et révéler la dignité derrière chaque histoire. Découvrez l’équipe qui porte cette direction artistique et humaine.
    </p>
</div>
<?php
$equipe = [];
for ($i = 1; $i <= 16; $i++) {
    $etat = rand(0, 1) ? 'image' : 'texte'; // aléatoire
   $equipe = [
     [
        "nom" => "Sakina DOUIOU",
        "roles" => ["Réalisatrice", "Directrice de projet","Scénariste", "Photographe","Chef opératrice", "Cadreuse", "Monteuse", "Etalonnage", "Repérage"],
        "image" => "img/equipe/membre2.jpg",
        "portfolio" => "https://sakinadouiou.github.io"
    ],
    [
        "nom" => "Xuan-Minh TRAN",
        "roles" => ["Directeur de projet", "Développeur web", "Prise de contact", "Technicien sonore", "Interprète", "Perch-man", "Repérage"],
        "image" => "img/equipe/membre1.jpg",
         "portfolio" => "https://xuan-minh.github.io/"
    ],
   
      [
        "nom" => "Dylan BLANDEL",
        "roles" => ["Responsable montage FR", "Scénariste", "Graphiste", "Cadreur"],
        "image" => "img/equipe/membre1.jpg",
        "portfolio" => ""
    ],
    [
        "nom" => "Hyunbeom PARK",
        "roles" => ["Compositeur musique originale", "Monteur son", "Interprète coréen", "Repérage"],
        "image" => "img/equipe/membre2.jpg",
        "portfolio" => ""
    ], 
     [
        "nom" => "Hugo LEULIET",
        "roles" => ["Perch-man", "Monteur son", "Compositeur musique originale"],
        "image" => "img/equipe/membre1.jpg",
        "portfolio" => ""
    ],
    [
        "nom" => "Romane VARO-TUPIN",
        "roles" => ["Assistante de production", "Prise de contact", "Organisatrice", "Transcription" ,"Sous-titreuse"],
        "image" => "img/equipe/membre2.jpg",
        "portfolio" => ""
    ],
    [
        "nom" => "Jiwoo YUN",
        "roles" => ["Transcripteuse", "Repérage"],
        "image" => "img/equipe/membre1.jpg",
        "portfolio" => ""
    ],
     [
        "nom" => "Suyeon YANG",
        "roles" => ["Interprète", "Repérage"],
        "image" => "img/equipe/membre2.jpg",
        "portfolio" => ""
    ],
       [
        "nom" => "Alyssia BERSET",
        "roles" => ["Responsable Montage KR", "Repérage", "Interprète"],
        "image" => "img/equipe/membre1.jpg",
        "portfolio" => ""
    ],
      [
        "nom" => "Inès DOS SANTOS",
        "roles" => ["Webmaster", "UX/UI designer", "Maquettiste", "Graphiste"],
        "image" => "img/equipe/membre1.jpg",
        "portfolio" => ""
    ],
    [
        "nom" => "Sarah CROS",
        "roles" => ["Graphiste", "UX/UI designer","Maquettiste" ,"Monteuse"],
        "image" => "img/equipe/membre2.jpg",
        "portfolio" => ""
    ],
    [
        "nom" => "Jaeden DUONG",
        "roles" => ["Traductrice","Transcripteuse", "Repérage"],
        "image" => "img/equipe/membre2.jpg",
        "portfolio" => ""
    ],
      [
        "nom" => "Junghyun LIM",
        "roles" => ["Perch-man", "Cadreur" ,"Repérage"],
        "image" => "img/equipe/membre1.jpg",
        "portfolio" => ""
    ],
      [
        "nom" => "Jiyeong SIN",
        "roles" => ["Interprète", "Transcripteuse", "Repérage"],
        "image" => "img/equipe/membre1.jpg",
        "portfolio" => ""
    ],     
      [
        "nom" => "Stephane LEVY",
        "roles" => ["Corps Enseignant","Tutrice"],
        "image" => "img/equipe/membre1.jpg",
        "portfolio" => "https://stephanelevy.net/?lang=fr#"
    ],
    [
        "nom" => "Gihoon YU",
        "roles" => ["Corps Enseignant","Traducteur"],
        "image" => "img/equipe/membre2.jpg",
        "portfolio" => ""
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
                   <?php if (!empty($membre['portfolio'])): ?>
                       <a href="<?php echo htmlspecialchars($membre['portfolio']); ?>" class="team-portfolio" target="_blank">Portfolio</a>
                    <?php endif; ?>
            </div>
        </div>
    <?php endforeach; ?>
</div>
<?php include "includes/jsinclude.php"; ?>
</body>
</html>