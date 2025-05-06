<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Glaneurs de carton</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Glaneurs de carton" />
    <link rel="icon" href="img/favicon.png" type="image/png" />
    <link rel="stylesheet" type="text/css" href="css/main.css" />
    <style>
      h3 {
        font-size: 2em;
        position: absolute;
        color: white;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        z-index: 10;
        transition: color 0.3s ease; /* Transition pour la couleur */
        text-decoration: none; /* Pas de soulignement par défaut */
        position:relative; /* Ajout de position relative */
        display: inline-block; /* Important pour que la largeur s'adapte au contenu */
      }

      h3::after {
        content: "";
        position: absolute;
        bottom: -5px; /* Ajuste la position du soulignement */
        left: 0;
        width: 0; /* Initialise la largeur à 0 */
        height: 2px; /* Épaisseur du soulignement */
        background-color: white; /* Couleur du soulignement */
        transition: width 0.5s ease; /* Animation de largeur */
        z-index: -1; /* Pour que le soulignement passe sous le texte */
      }

      h3:hover {
        color: #ddd; /* Légère modification de la couleur au survol */
      }

      h3:hover::after {
        width: 100%; /* Soulignement complet au survol */
      }
    </style>
  </head>
  <body>
    <?php
    include 'includes/header.php';?>

    <div class="container">
    

      <?php include 'slide.php';?>
      
</div>
  </body>
  
<?php
  include 'includes/jsinclude.php';?>
</html>
