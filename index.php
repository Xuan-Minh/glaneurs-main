<?php
header("Vary: User-Agent");
include 'wip-config.php';
include 'includes/lang.php';
$slides = array(
    array(
        "chapitre" => getTranslation("index_titre", $lang), // Utilise la fonction de traduction
        "srcvideobg" => "video/web/chariot.mp4",
        "poster" => "img/posters/chariot_poster.webp", 
        "srcaudio" => "audio/chap1.mp3",
        "srcdocupart" => "https://vimeo.com/1118628914", 
        "info" => "",
        "urlsuite" => ""
    ),
    array(
        "chapitre" => getTranslation("index_chapitre1", $lang),
        "srcvideobg" => "video/web/recyclerie.mp4",
        "poster" => "img/posters/recyclerie_poster.webp", 
        "srcaudio" => "audio/chap1.mp3",
        "srcdocupart" => "https://vimeo.com/1118628914", // Remplacez XXXXXXXXX par l'ID Vimeo
        "info" => getTranslation("index_chap1info", $lang),
        "urlsuite" => "",
        "quote_author" => getTranslation("portraits_arirang", $lang),
        "timecode" => "#t=3m36s"
    ),
    array(
        "chapitre" => getTranslation("index_chapitre2", $lang),
        "srcvideobg" => "video/web/bache.mp4",
        "poster" => "img/posters/bache_poster.webp",
        "srcaudio" => "audio/chap2.mp3",
        "srcdocupart" => "https://vimeo.com/1118628914", // Remplacez XXXXXXXXX par l'ID Vimeo
        "info" => getTranslation("index_chap2info", $lang),
        "urlsuite" => "",
        "quote_author" => "LEE Sangman",
        "info_button_text" => getTranslation("archives_titre", $lang), // Utilise la clé de traduction existante
        "info_button_link" => "tracesdupasse", // Le lien vers votre ,
        "timecode" => "#t=10m35s"
    ),
    array(
        "chapitre" => getTranslation("index_chapitre3", $lang),
        "srcvideobg" => "video/web/lee.mp4",
        "poster" => "img/posters/lee_poster.webp",
        "srcaudio" => "audio/chap3.mp3",
        "srcdocupart" => "https://vimeo.com/1118628914", // Remplacez XXXXXXXXX par l'ID Vimeo
        "info" => getTranslation("index_chap3info", $lang),
        "urlsuite" => "",
        "quote_author" => "LEE Sangman",
        "timecode"=> "#t=18m40s" // Utilise la clé de traduction existante
        
    )
);

function isMobile() {
    // Expression régulière améliorée pour inclure plus d'appareils
    return preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|rim)|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i', $_SERVER['HTTP_USER_AGENT']);
}

$isMobile = isMobile();

// Logique du loading screen (contrôlée par WIP_MODE)
$showLoading = false;
if (!$isMobile) {
    if (WIP_MODE) {
        // Mode WIP: toujours afficher le loading screen
        $showLoading = true;
    } else {
        // Mode normal: afficher le loading screen seulement lors de la première visite
        if (!isset($_SESSION['hasVisitedIndex'])) {
            $_SESSION['hasVisitedIndex'] = true;
            $showLoading = true;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" <?php if ($lang == 'ko') echo ' class="ko-lang"'; ?>>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo getTranslation("index_titre", 'fr') ?></title>
    <meta name="description" content="<?php echo getTranslation('meta_description', $lang); ?>">
    <meta name="author" content="Sakina DOUIOU & Xuan-Minh TRAN">
    <meta name="keywords" content="documentary, South Korea, poesia, historical, social issues, Sakina DOUIOU, Xuan-Minh TRAN, Les glaneurs de carton, glaneurs de carton, glaneurs, carton, gleaners, cardboard, documentary film, cinéma documentaire, Corée du Sud, poésie, histoire, société" />

    <meta property="og:title" content="Les glaneurs de carton" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://glaneursdecarton.mastercmw.com/" />
    <meta property="og:image" content="https://glaneursdecarton.mastercmw.com/img/posters/chariot_poster.webp" />
    <meta property="og:description" content="<?php echo getTranslation('meta_description', $lang); ?>" />
    <link rel="canonical" href="https://glaneursdecarton.mastercmw.com/?lang=<?php echo $lang; ?>" />
    <link rel="icon" href="img/favicon.png" type="image/png" />

    <?php if ($isMobile): ?>
        <link rel="stylesheet" type="text/css" href="css/mobile-index.css" />
    <?php else: ?>
        <?php if ($showLoading): ?>
            <link rel="preload" href="img/posters/eaulow_poster.webp" as="image" fetchpriority="high">
        <?php else: ?>
            <link rel="preload" href="img/posters/chariot_poster.webp" as="image" fetchpriority="high">
        <?php endif; ?>

        <!-- Preload des polices critiques (WOFF2) -->
        <link rel="preload" href="font/Figtree/Figtree-VariableFont_wght.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="font/Libre_Baskerville/LibreBaskerville-Regular.woff2" as="font" type="font/woff2" crossorigin>
        <!-- Preload NotoSansKR : découverte au 1er niveau (casse la chaîne HTML→font.css→police) -->
        <link rel="preload" href="font/NotoSansKR/NotoSansKR-Light.woff2" as="font" type="font/woff2" crossorigin>

        <!-- @font-face inlinés : élimine une requête réseau render-blocking -->
        <style>
        @font-face {
          font-family: "Figtree";
          src: url("/font/Figtree/Figtree-VariableFont_wght.woff2") format("woff2"),
               url("/font/Figtree/Figtree-VariableFont_wght.ttf") format("truetype");
          font-display: swap;
        }
        @font-face {
          font-family: "Libre Baskerville";
          src: url("/font/Libre_Baskerville/LibreBaskerville-Regular.woff2") format("woff2"),
               url("/font/Libre_Baskerville/LibreBaskerville-Regular.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Libre Baskerville";
          src: url("/font/Libre_Baskerville/LibreBaskerville-Italic.woff2") format("woff2"),
               url("/font/Libre_Baskerville/LibreBaskerville-Italic.ttf") format("truetype");
          font-weight: normal;
          font-style: italic;
          font-display: swap;
        }
        @font-face {
          font-family: "Libre Baskerville";
          src: url("/font/Libre_Baskerville/LibreBaskerville-Bold.woff2") format("woff2"),
               url("/font/Libre_Baskerville/LibreBaskerville-Bold.ttf") format("truetype");
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Noto Sans KR";
          src: url("/font/NotoSansKR/NotoSansKR-Light.woff2") format("woff2"),
               url("/font/NotoSansKR/NotoSansKR-Light.ttf") format("truetype");
          font-weight: 300;
          font-style: normal;
          font-display: optional;
        }
        @font-face {
          font-family: "Noto Sans KR";
          src: url("/font/NotoSansKR/NotoSansKR-Medium.woff2") format("woff2"),
               url("/font/NotoSansKR/NotoSansKR-Medium.ttf") format("truetype");
          font-weight: 500;
          font-style: normal;
          font-display: optional;
        }
        @font-face {
          font-family: "Noto Sans KR";
          src: url("/font/NotoSansKR/NotoSansKR-Bold.woff2") format("woff2"),
               url("/font/NotoSansKR/NotoSansKR-Bold.ttf") format("truetype");
          font-weight: 700;
          font-style: normal;
          font-display: optional;
        }
        </style>
        <!-- CSS critiques chargés de manière synchrone pour le premier rendu -->
        <link rel="stylesheet" type="text/css" href="css/main.css" />
        <link rel="stylesheet" type="text/css" href="css/loading.css" />
        <?php if ($showLoading): ?>
        <!-- index.css chargé en async : le .container est masqué jusqu'au clic "Entrer" -->
        <link rel="preload" href="css/index.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <noscript><link rel="stylesheet" href="css/index.css"></noscript>
        <?php else: ?>
        <!-- Visiteur de retour : pas de loading-screen, index.css nécessaire immédiatement -->
        <link rel="stylesheet" type="text/css" href="css/index.css" />
        <?php endif; ?>

        <!-- CSS non-critiques : chargement asynchrone pour ne pas bloquer le rendu initial -->
        <link rel="preload" href="css/navbar.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <noscript><link rel="stylesheet" href="css/navbar.css"></noscript>
        <link rel="preload" href="css/visionner.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
        <noscript><link rel="stylesheet" href="css/visionner.css"></noscript>
    <?php endif; ?>

    <link rel="alternate" hreflang="fr" href="https://glaneursdecarton.mastercmw.com/?lang=fr" />
    <link rel="alternate" hreflang="en" href="https://glaneursdecarton.mastercmw.com/?lang=en" />
    <link rel="alternate" hreflang="ko" href="https://glaneursdecarton.mastercmw.com/?lang=ko" />
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Les glaneurs de carton",
      "url": "https://glaneursdecarton.mastercmw.com/",
      "description": "<?php echo addslashes(getTranslation('meta_description', $lang)); ?>",
      "inLanguage": ["fr", "en", "ko"],
      "author": {
        "@type": "Person",
        "name": "Sakina DOUIOU & Xuan-Minh TRAN"
      }
    }
    </script>
</head>
<body>

<?php if ($isMobile): ?>
    
      <?php
    // Extraction de l'ID Vimeo depuis l'URL
        $vimeoId_full_doc = substr($slides[0]["srcdocupart"], strrpos($slides[0]["srcdocupart"], '/') + 1);
    ?>
    <div class="mobile-only">
        <div class="mobile-header">
            <div class="mobile-lang-selector">
                <a href="?lang=fr" class="lang-option<?php if ($lang == 'fr') echo ' active'; ?>">FR</a>
                <span class="lang-sep">/</span>
                <a href="?lang=en" class="lang-option<?php if ($lang == 'en') echo ' active'; ?>">EN</a>
                <span class="lang-sep">/</span>
                <a href="?lang=ko" class="lang-option<?php if ($lang == 'ko') echo ' active'; ?>">한국</a>
            </div>
        </div>
       <div class="mobile-content">
            <video autoplay muted loop playsinline class="mobile-bg-video">
                <source src="video/web/chariot.mp4" type="video/mp4">
            </video>
            <div class="mobile-slide">
                <h1><?php echo getTranslation("index_titre", "fr"); ?></h1>
                <h3 class="index-soustitre"><?php echo getTranslation("index_titre", "ko"); ?></h3>
                <!-- On utilise les variables maintenant disponibles -->
                <a class="visionner-trigger" href="https://vimeo.com/<?php echo $vimeoId_full_doc; ?>?texttrack=<?php echo $lang; ?>" target="_blank">
                    <?php echo getTranslation("index_docufull", $lang); ?>
                </a>
            </div>
        </div>
        <div class="mobile-footer-prompt">
            <?php echo getTranslation("mobile_experience", $lang); ?>
        </div>
    </div>

<?php else: ?>

    <!------------------ WEBDEV BY XUAN-MINH TRAN ------------------>
    <?php if ($showLoading): ?>
    <?php include 'includes/layout/loading.php'; ?>
    <?php endif; ?>
    <audio id="audio-bgm" src="audio/homepage.mp3" loop preload="none"></audio>
    <?php include 'includes/layout/header.php'; ?>
    <div class="container <?php echo $showLoading ? 'hidden' : ''; ?>">
        <?php
    include 'includes/components/scrolldown.php';
    include 'includes/components/slide.php'; 
        ?>
    </div>
    <?php include 'includes/layout/jsinclude.php'; ?>
    <script src="https://player.vimeo.com/api/player.js"></script>
    <script src="js/pages/index.js"></script>

<?php endif; ?>

</body>
</html>