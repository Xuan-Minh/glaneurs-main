<?php include 'includes/lang.php'; // Inclut le fichier pour gérer la langue
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" <?php if ($lang == 'kr') echo ' class="kr-lang"'; ?>>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php include "includes/css.php"; ?>
  <link rel="stylesheet" href="css/mentionslegales.css">
  <title><?php echo getTranslation("mentionslegales_titre", $lang) ?></title>
</head>

<body>
  <div class="page-intro mentions-legales content-anim">
    <h2><?php echo getTranslation("mentionslegales_titre", $lang) ?></h2>
    <h3><?php echo getTranslation("mentionslegales_editeur", $lang) ?><br></h3>
    <div>Master Cultures et Métiers du Web<br>
      Bureau C110, Bâtiment Bois de l’Étang (bâtiment C)<br>
      77420 CHAMPS-SUR-MARNE<br>
      glaneursdecarton.docu@gmail.com</div>

    <h3><?php echo getTranslation("mentionslegales_directeur_titre", $lang) ?><br></h3>
    <div> Thierry BONZON</div>
    <div> contact@mastercmw.com</div>
    <div> 01 60 95 71 79</div>

    <h3><?php echo getTranslation("mentionslegales_hebergeur_titre", $lang) ?><br></h3>
    <div> <?php echo getTranslation("mentionslegales_hebergeur_nom", $lang) ?><br>
      <?php echo getTranslation("mentionslegales_hebergeur_adresse_ip", $lang) ?><br>
      34 avenue de l’Europe, Immeuble trident A, 38100 Grenoble<br>
      <?php echo getTranslation("mentionslegales_hebergeur_telephone", $lang) ?>
    </div>

    <h3><?php echo getTranslation("mentionslegales_propriete_intellectuelle_titre", $lang) ?><br></h3>
    <div>
      <?php echo getTranslation("mentionslegales_propriete_intellectuelle_texte", $lang) ?>
    </div>
    <h3><?php echo getTranslation("mentionslegales_donnees_personnelles_titre", $lang) ?><br></h3>
    <div><?php echo getTranslation("mentionslegales_donnees_personnelles_texte", $lang) ?>
    </div>
  </div>
  </div>
  
  <?php include "includes/header.php"; ?>
  <?php include "includes/jsinclude.php"; ?>
</body>

</html>