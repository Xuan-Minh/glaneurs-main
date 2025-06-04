<?php include 'includes/lang.php'; // Inclut le fichier pour gérer la langue
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" <?php if ($lang == 'kr') echo ' class="kr-lang"'; ?>>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include "includes/css.php"; ?>
    <link rel="stylesheet" href="css/portraits.css">
    <title><?php echo getTranslation("portraits_titre", $lang) ?></title>
</head>

<body>

    <?php include "includes/header.php"; ?>
    <div class="volume-control">
        <label for="volumeRange">Volume&nbsp;:</label>
        <input type="range" id="volumeRange" min="0" max="1" step="0.01" value="0.4">
    </div>

    <div class="portraits-container">
        <div class="portrait-section section1" data-target="#detail1" data-audio="audio/ow_harmonica.mp3">
            <video autoplay muted loop class="portrait-video section1-video">
                <source src="video/glaneuse-test.mov" type="video/mp4">
            </video>
            <div class="portrait-name"><?php echo getTranslation("portraits_master", $lang); ?></div>
        </div>
        <div class="portrait-section section2" data-target="#detail2" data-audio="audio/ow_banjo.mp3">
            <video autoplay muted loop class="portrait-video section2-video">
                <source src="video/lee-test.mov" type="video/mp4">
            </video>
            <div class="portrait-name"><?php echo getTranslation("portraits_lee", $lang); ?></div>
        </div>
        <div class="portrait-section section3" data-target="#detail3" data-audio="audio/ow_whistle.mp3">
            <video autoplay muted loop class="portrait-video section3-video">
                <source src="video/arirang-test.mov" type="video/mp4">
            </video>
            <div class="portrait-name">Monsieur Arirang-song</div>
        </div>
        <div class="portrait-section section4" data-target="#detail4" data-audio="audio/ow_flute.mp3">
            <video autoplay muted loop class="portrait-video section4-video">
                <source src="video/glaneuse-test.mov" type="video/mp4">
            </video>
            <div class="portrait-name"><?php echo getTranslation("portraits_jo", $lang); ?></div>
        </div>
    </div>

    <section class="portrait-detail" id="detail1">
        <div class="sound-wave-container">
            
            <svg class="sound-wave-svg" width="120" height="40" viewBox="0 0 120 40">
                <!-- <polyline class="sound-wave-line" fill="none" stroke="#fff" stroke-width="3" points="0,20 120,20" /> -->
                <defs>
                    <filter id="blur" x="-10" y="-10" width="140" height="60">
                        <feGaussianBlur stdDeviation="4" />
                    </filter>
                </defs>
                <polygon class="sound-wave-cloud" fill="#fff" opacity="0.18" filter="url(#blur)" points="0,20 120,20" />
            </svg>
        </div>
        <h2><?php echo getTranslation("portraits_master", $lang); ?></h2>
        <p>Informations spécifiques à <?php echo getTranslation("portraits_master", $lang); ?>...</p>
        <button class="back-to-portraits"><?php echo getTranslation("portraits_voirlesautres", $lang); ?></button>
    </section>

    <section class="portrait-detail" id="detail2">
        <div class="sound-wave-container">
            <svg class="sound-wave-svg" width="120" height="40" viewBox="0 0 120 40">
                <defs>
                    <filter id="blur" x="-10" y="-10" width="140" height="60">
                        <feGaussianBlur stdDeviation="4" />
                    </filter>
                </defs>
                <polygon class="sound-wave-cloud" fill="#fff" opacity="0.18" filter="url(#blur)" points="0,20 120,20" />
            </svg>
        </div>
        <h2><?php echo getTranslation("portraits_lee", $lang); ?></h2>
        <p>Informations spécifiques à <?php echo getTranslation("portraits_lee", $lang); ?>...</p>
        <button class="back-to-portraits"><?php echo getTranslation("portraits_voirlesautres", $lang); ?></button>
    </section>

    <section class="portrait-detail" id="detail3">
        <div class="sound-wave-container">
            <svg class="sound-wave-svg" width="120" height="40" viewBox="0 0 120 40">
                <defs>
                    <filter id="blur" x="-10" y="-10" width="140" height="60">
                        <feGaussianBlur stdDeviation="4" />
                    </filter>
                </defs>
                <polygon class="sound-wave-cloud" fill="#fff" opacity="0.18" filter="url(#blur)" points="0,20 120,20" />
            </svg>
        </div>
        <h2>Monsieur Arirang-song</h2>
        <p>Informations spécifiques à Monsieur Arirang-song...</p>
        <button class="back-to-portraits"><?php echo getTranslation("portraits_voirlesautres", $lang); ?></button>
    </section>

    <section class="portrait-detail" id="detail4">
        <div class="sound-wave-container">
            <svg class="sound-wave-svg" width="120" height="40" viewBox="0 0 120 40">
                <defs>
                    <filter id="blur" x="-10" y="-10" width="140" height="60">
                        <feGaussianBlur stdDeviation="4" />
                    </filter>
                </defs>
                <polygon class="sound-wave-cloud" fill="#fff" opacity="0.18" filter="url(#blur)" points="0,20 120,20" />
            </svg>
        </div>
        <h2><?php echo getTranslation("portraits_jo", $lang); ?></h2>
        <p>Informations spécifiques à <?php echo getTranslation("portraits_jo", $lang); ?>...</p>
        <button class="back-to-portraits"><?php echo getTranslation("portraits_voirlesautres", $lang); ?></button>
    </section>

    <?php include "includes/jsinclude.php"; ?>
    <script src="js/portraits.js" defer></script>
    <?php include "includes/visionner.php"; ?>
</body>

</html>