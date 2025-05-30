<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include "includes/css.php"; ?>
    <link rel="stylesheet" href="css/archives.css">
    <title><?php echo getTranslation("archives_titre", $lang)?></title>
</head>
<body>
    <?php include "includes/header.php"; ?>
    <div class="archives-scroll">
        <section class="archive-hero">
            <video autoplay muted loop>
                <source src="video/ville.mov" type="video/mp4">
            </video>
            <div class="archive-title">
                <?php echo getTranslation("archives_titre", $lang); ?>
            </div>
        </section>
        <section class="archives-content">
            <!-- Ici tu mets le reste de ta page archives -->
            <div>Contenu des archives à venir...</div>
        </section>
    </div>

    <?php include "includes/jsinclude.php"; ?>
</body>
</html>