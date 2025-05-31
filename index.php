<?php
session_start(); // Démarre la session PHP

// Vérifie si l'utilisateur a déjà visité l'index
if (!isset($_SESSION['hasVisitedIndex'])) {
    $_SESSION['hasVisitedIndex'] = true; // Définit la session pour marquer la visite
    $showLoading = true; // Affiche le loading
} else {
    $showLoading = false; // Ne pas afficher le loading
}
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>"<?php if ($lang == 'kr') echo ' class="kr-lang"'; ?>>
  <head>
    <meta charset="utf-8" />
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Glaneurs de carton" />
    <?php include "includes/css.php"; ?>
    <title><?php echo getTranslation("index_titre", $lang)?></title>
    <link rel="stylesheet" type="text/css" href="css/index.css" />
  </head>
  <body>
   
    <?php if ($showLoading): ?>
        <?php include 'includes/loading.php'; ?>
    <?php endif; ?>
  <?php include 'includes/header.php';?>
  
    <div class="container <?php echo $showLoading ? 'hidden' : ''; ?>">
      <?php 
      include 'includes/scrolldown.php';
      include 'includes/slide.php';?>     
      
    </div>
  </body>
  
<?php
  include 'includes/jsinclude.php';?>
</html>
