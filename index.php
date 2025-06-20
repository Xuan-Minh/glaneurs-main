
<?php
include 'includes/lang.php';

function isMobile() {
    // Expression régulière améliorée pour inclure plus d'appareils
    return preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|rim)|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i', $_SERVER['HTTP_USER_AGENT']);
}

$isMobile = isMobile();

// Logique simplifiée pour le loading screen (uniquement pour desktop)
$showLoading = false;
if (!$isMobile) {
    if (!isset($_SESSION['hasVisitedIndex'])) {
        $_SESSION['hasVisitedIndex'] = true;
        $showLoading = true;
    }
}
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" <?php if ($lang == 'kr') echo ' class="kr-lang"'; ?>>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo getTranslation("index_titre", $lang) ?></title>
    
    <?php // On charge les CSS différemment ?>
    <?php if ($isMobile): ?>
        <link rel="stylesheet" type="text/css" href="css/mobile-index.css" />
    <?php else: ?>
        <link rel="stylesheet" type="text/css" href="css/loading.css" />
        <link rel="stylesheet" type="text/css" href="css/index.css" />
        <?php include "includes/css.php"; ?>
    <?php endif; ?>

    <link rel="alternate" hreflang="fr" href="https://glaneursdecarton.mastercmw.com/?lang=fr" />
    <link rel="alternate" hreflang="en" href="https://glaneursdecarton.mastercmw.com/?lang=en" />
    <link rel="alternate" hreflang="kr" href="https://glaneursdecarton.mastercmw.com/?lang=kr" />
</head>
<body>

<?php if ($isMobile): ?>
    
    <!------------------ VERSION MOBILE ------------------>
    <div class="mobile-only">
        <div class="mobile-header">
            <div class="mobile-lang-selector">
                <a href="?lang=fr" class="lang-option<?php if ($lang == 'fr') echo ' active'; ?>">FR</a>
                <span class="lang-sep">/</span>
                <a href="?lang=en" class="lang-option<?php if ($lang == 'en') echo ' active'; ?>">EN</a>
                <span class="lang-sep">/</span>
                <a href="?lang=kr" class="lang-option<?php if ($lang == 'kr') echo ' active'; ?>">KR</a>
            </div>
        </div>
        <div class="mobile-content">
            <video autoplay muted loop playsinline class="mobile-bg-video">
                <source src="video/chariot.mov" type="video/mp4">
            </video>
            <div class="mobile-slide">
                <h1><?php echo getTranslation("index_titre", $lang); ?></h1>
                <a class="visionner-trigger" href="https://vimeo.com/1082041088" target="_blank">
                    <?php echo getTranslation("index_docufull", $lang); ?>
                </a>
            </div>
        </div>
    </div>

<?php else: ?>

    <!------------------ VERSION DESKTOP ------------------>
    <?php if ($showLoading): ?>
        <?php include 'includes/loading.php'; ?>
    <?php endif; ?>
    <audio id="audio-arirang" src="audio/homepage.mp3" loop preload="auto"></audio>
    <?php include 'includes/header.php'; ?>
    <div class="container <?php echo $showLoading ? 'hidden' : ''; ?>">
        <?php
        include 'includes/scrolldown.php';
        include 'includes/slide.php'; 
        ?>
    </div>
    <?php include 'includes/jsinclude.php'; ?>
    <script src="https://player.vimeo.com/api/player.js"></script>
    <script src="js/index.js"></script>

<?php endif; ?>

</body>
</html>