<?php
include 'includes/lang.php'; // Inclut le fichier pour gérer la langue

// Vérifie si l'utilisateur a déjà visité l'index
if (!isset($_SESSION['hasVisitedIndex'])) {
  $_SESSION['hasVisitedIndex'] = true; // Définit la session pour marquer la visite
  $showLoading = true; // Affiche le loading
} else {
  $showLoading = false; // Ne pas afficher le loading
}
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" <?php if ($lang == 'kr') echo ' class="kr-lang"'; ?>>

<head>
  <meta charset="utf-8" />
  <meta name="google-site-verification" content="SqLd-amWWnwxOMs6Pdy83NxVwahFKlwSSGXjcXE11KM" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Les glaneurs de carton"/>
  <meta keyword="glaneurs, carton, documentaire, glanage, recyclage, culture, film" />
  <?php include "includes/css.php"; ?>
  <title><?php echo getTranslation("index_titre", $lang) ?></title>
  <link rel="stylesheet" type="text/css" href="css/loading.css" />
  <link rel="stylesheet" type="text/css" href="css/index.css" />
  <link rel="alternate" hreflang="fr" href="https://glaneursdecarton.mastercmw.com/?lang=fr" />
  <link rel="alternate" hreflang="en" href="https://glaneursdecarton.mastercmw.com/?lang=en" />
  <link rel="alternate" hreflang="kr" href="https://glaneursdecarton.mastercmw.com/?lang=kr" />
</head>

<body>
  <?php if ($showLoading): ?>
    <?php include 'includes/loading.php'; ?>
  <?php endif; ?>
  <audio id="audio-arirang" src="audio/slide1.mp3" loop preload="auto"></audio>
  <?php include 'includes/header.php'; ?>
  <div class="container <?php echo $showLoading ? 'hidden' : ''; ?>">
    <?php
    include 'includes/scrolldown.php';
    include 'includes/slide.php'; ?>

  </div>
</div>
</body>

<?php
include 'includes/jsinclude.php'; ?>
<script src="https://player.vimeo.com/api/player.js"></script>
<script src="js/index.js"></script>

</html>