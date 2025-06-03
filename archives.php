<?php include 'includes/lang.php'; // Inclut le fichier pour gérer la langue
?>
<?php
// ...avant le </div> de .archives-scroll...
// Récupère les archives depuis la base
$pdo = getPDO();
$archives = $pdo->query("SELECT * FROM archives")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" <?php if ($lang == 'kr') echo ' class="kr-lang"'; ?>>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include "includes/css.php"; ?>
    <link rel="stylesheet" href="css/archives.css">
    <title><?php echo getTranslation("archives_titre", $lang) ?></title>
</head>

<body>
    <?php include "includes/header.php"; ?>
    <div class="archives-scroll">
        <section class="archive-hero">
            <video autoplay muted loop>
                <source src="video/ville.mov" type="video/mp4">
            </video>
            <div class="archive-title content-anim">
                <?php echo getTranslation("archives_titre", $lang); ?>
            </div>
        </section>
        <section class="archives-content">
           <section class="archives-intro content-anim">
            “Le glanage est d’un autre âge, le geste est inchangé dans notre société qui mange à satiété. Glaneurs agricoles ou urbains, ils se baissent pour ramasser. 
Il n’y a pas de honte : il y a du tracas, du désarroi.”
 Agnès Varda, Les Glaneurs et la Glaneuse. 2000
           </section>
           <?php include "includes/archives-gallery.php"?>

        </section>
    </div>

    <?php include "includes/jsinclude.php"; ?>
    <script src="js/archives.js"></script>
</body>

</html>