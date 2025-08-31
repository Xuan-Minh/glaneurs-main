<?php include 'includes/lang.php'; // Inclut le fichier pour gérer la langue
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" <?php if ($lang == 'ko') echo ' class="ko-lang"'; ?>>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php include "includes/css.php"; ?>
    <link rel="stylesheet" href="css/souvenirs.css">
    <title><?php echo getTranslation("souvenirs_titre", $lang) ?></title>
</head>

<body>
    <?php include "includes/components/header.php"; ?>
    <?php include "includes/components/jsinclude.php"; ?>
</body>

</html>