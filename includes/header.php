<div id="transition-overlay" class="active"></div>
<header>
    <div class="header-controls">
        <?php if (basename($_SERVER['PHP_SELF']) !== 'index.php'): ?>
            <!-- <a href="index.php" class="logo-link">
                <img src="img/favicon.png" alt="Logo" class="logo">
           </a> -->
        <?php endif; ?>
        <div class="language-selector">
            <span class="lang-option <?php if ($lang == 'fr') echo 'active'; ?>" data-lang="fr">FR</span>
            <span class="lang-sep">/</span>
            <span class="lang-option <?php if ($lang == 'en') echo 'active'; ?>" data-lang="en">EN</span>
            <span class="lang-sep">/</span>
            <span class="lang-option <?php if ($lang == 'kr') echo 'active'; ?>" data-lang="kr">한국</span>
        </div>
        <div class="menu-burger" id="menuBurger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
   <div id="global-audio-control-container" title="<?php echo getTranslation("Audio ON/OFF", $lang); ?>">
    <svg id="icon-sound-on" viewBox="0 0 24 24"> <!-- Pas de style display:none ici -->
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg>
    <svg id="icon-sound-off" viewBox="0 0 24 24"> <!-- Pas de style display:none ici, la classe .icon-hidden sera gérée par JS -->
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L7 9H3v6h4l5 5V4z"/>
    </svg>
    <canvas id="wave" width="50" height="15"></canvas> <!-- Ajusté la largeur du canvas comme dans votre HTML précédent -->
</div>
</header>

<div class="menu-volet" id="menuVolet">
    <div class="menu-volet-content">
        <?php
        $videoSources = array(
            array(
                "src" => "video/ville.mov",
                "title" => getTranslation("menu_voletchap1", $lang),
                "slide" => 1 // Numéro de la slide (commence à 1)
            ),
            array(
                "src" => "video/bache.mov",
                "title" => getTranslation("menu_voletchap2", $lang),
                "slide" => 2
            ),
            array(
                "src" => "video/lee.mov",
                "title" => getTranslation("menu_voletchap3", $lang),
                "slide" => 3
            )
        );
       foreach ($videoSources as $video) {
            echo '<div class="menu-video-item" data-slide="' . $video["slide"] . '">';
            // Retire autoplay d'ici :
            echo '<video src="' . $video["src"] . '" muted loop class="menu-video"></video>';
            echo '<h4>' . $video["title"] . '</h4>';
            echo '</div>';
        }
        ?>
    </div>
    <div class="menu-links">
        <ul>
            <li><a href="portraits"><?php echo getTranslation("portraits_titre", $lang) ?></a></li>
            <li><a href="tracesdupasse"><?php echo getTranslation("archives_titre", $lang) ?></a></li>
            <li><a href="souvenirs"><?php echo getTranslation("souvenirs_titre", $lang) ?></a></li>
            <li><a href="derriere-le-documentaire"><?php echo getTranslation("derriereledocumentaire_titre", $lang) ?></a></li>
            <li id="menu-accueil"><a href="./"><?php echo getTranslation("accueil", $lang) ?></a></li>
                        <li class="mentionslegales-right"><a href="mentionslegales"><?php echo getTranslation("mentionslegales_titre", $lang) ?></a></li>

        </ul>
    </div>
</div>