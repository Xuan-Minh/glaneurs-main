<?php include 'includes/lang.php'; // Inclut le fichier pour gérer la langue
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" <?php if ($lang == 'ko') echo ' class="ko-lang"'; ?>>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo getTranslation("mentionslegales_titre", $lang) ?> - Les glaneurs de carton</title>
  <link rel="canonical" href="https://glaneursdecarton.mastercmw.com/mentionslegales.php?lang=<?php echo $lang; ?>" />
  <link rel="alternate" hreflang="fr" href="https://glaneursdecarton.mastercmw.com/mentionslegales.php?lang=fr" />
  <link rel="alternate" hreflang="en" href="https://glaneursdecarton.mastercmw.com/mentionslegales.php?lang=en" />
  <link rel="alternate" hreflang="ko" href="https://glaneursdecarton.mastercmw.com/mentionslegales.php?lang=ko" />
  <?php include "includes/layout/css.php"; ?>
  <link rel="stylesheet" href="css/mentionslegales.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "<?php echo addslashes(getTranslation('mentionslegales_titre', $lang)); ?> - Les glaneurs de carton",
    "url": "https://glaneursdecarton.mastercmw.com/mentionslegales.php?lang=<?php echo $lang; ?>",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Les glaneurs de carton",
      "url": "https://glaneursdecarton.mastercmw.com/"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Les glaneurs de carton",
          "item": "https://glaneursdecarton.mastercmw.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "<?php echo addslashes(getTranslation('mentionslegales_titre', $lang)); ?>",
          "item": "https://glaneursdecarton.mastercmw.com/mentionslegales.php?lang=<?php echo $lang; ?>"
        }
      ]
    }
  }
  </script>
</head>

<body>
  <div class="page-intro mentions-legales content-anim">
    <h2><?php echo getTranslation("mentionslegales_titre", $lang) ?></h2>
   <section class="mentions-legales-content "> <h3><?php echo getTranslation("mentionslegales_editeur", $lang) ?><br></h3>
    <p>L'équipe Les glaneurs de carton<br>
      Bureau C110, Bâtiment Bois de l’Étang (bâtiment C)<br>
      77420 CHAMPS-SUR-MARNE<br>
      glaneursdecarton.docu@gmail.com</p>

    <h3><?php echo getTranslation("mentionslegales_directeur_titre", $lang) ?><br></h3>
    <p> Thierry BONZON</p>
    <p> contact@mastercmw.com</p>
    <p> 01 60 95 71 79</p>

    <h3><?php echo getTranslation("mentionslegales_conception", $lang) ?><br></h3>
    <p> Sakina DOUIOU, Xuan-Minh TRAN, Ines DOS SANTOS, Sarah CROS </p>

    <h3><?php echo getTranslation("mentionslegales_dvt", $lang) ?><br></h3>
    <p> Xuan-Minh TRAN</p>

    <h3><?php echo getTranslation("mentionslegales_hebergeur_titre", $lang) ?><br></h3>
    <p> <?php echo getTranslation("mentionslegales_hebergeur_nom", $lang) ?><br>
      <?php echo getTranslation("mentionslegales_hebergeur_adresse_ip", $lang) ?><br>
      34 avenue de l’Europe, Immeuble trident A, 38100 Grenoble<br>
      <?php echo getTranslation("mentionslegales_hebergeur_telephone", $lang) ?>
    </p>

    <h3><?php echo getTranslation("mentionslegales_propriete_intellectuelle_titre", $lang) ?><br></h3>
    <ul class="propriete-intellectuelle-list">
      <li><?php echo getTranslation("mentionslegales_propriete_intellectuelle_film", $lang) ?></li>
      <li><?php echo getTranslation("mentionslegales_propriete_intellectuelle_site", $lang) ?></li>
      <li><?php echo getTranslation("mentionslegales_propriete_intellectuelle_ambiances", $lang) ?></li>
      <li><?php echo getTranslation("mentionslegales_propriete_intellectuelle_arirang", $lang) ?></li>
      <li><?php echo getTranslation("mentionslegales_propriete_intellectuelle_musique", $lang) ?></li>
      <li><?php echo getTranslation("mentionslegales_propriete_intellectuelle_photos", $lang) ?></li>
    </ul>
    <h3><?php echo getTranslation("mentionslegales_donnees_personnelles_titre", $lang) ?><br></h3>
    <p><?php echo getTranslation("mentionslegales_donnees_personnelles_texte", $lang) ?>
    </p>
     <h3><?php echo getTranslation("mentionslegales_sources_titre", $lang) ?><br></h3>
    <p><?php echo getTranslation("mentionslegales_sources_texte", $lang) ?>
    </p>
  </div>
  </div>
</section >
  <?php include "includes/layout/header.php"; ?>
  <?php include "includes/layout/jsinclude.php"; ?>
</body>

</html>