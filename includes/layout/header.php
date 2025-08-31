
<!-- Overlay de transition pour les effets de page -->
<div id="transition-overlay" class="active"></div>

<header>
    <div class="header-controls">
        <!-- Logo (affiché sauf sur la home) -->
        <?php if (basename($_SERVER['PHP_SELF']) !== 'index.php'): ?>
            <!-- <a href="index.php" class="logo-link">
                <img src="img/favicon.png" alt="Logo Les glaneurs de carton" class="logo">
            </a> -->
        <?php endif; ?>

        <!-- Sélecteur de langue -->
        <nav class="language-selector" aria-label="Sélecteur de langue">
            <a href="?lang=fr" class="lang-option<?php if ($lang == 'fr') echo ' active'; ?>" aria-label="Français" lang="fr">FR</a>
            <span class="lang-sep">/</span>
            <a href="?lang=en" class="lang-option<?php if ($lang == 'en') echo ' active'; ?>" aria-label="English" lang="en">EN</a>
            <span class="lang-sep">/</span>
            <a href="?lang=ko" class="lang-option<?php if ($lang == 'ko') echo ' active'; ?>" aria-label="한국어" lang="ko">한국</a>
        </nav>

        <!-- Menu burger pour navigation mobile -->
        <div class="menu-burger" id="menuBurger">
            <button type="button" class="menu-burger" id="menuBurger" aria-label="Ouvrir le menu de navigation" aria-controls="menuVolet" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>

    <!-- Contrôle audio global -->
    <div id="global-audio-control-container" title="<?php echo getTranslation('Audio ON/OFF', $lang); ?>">
        <svg id="icon-sound-on" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
        <svg id="icon-sound-off" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L7 9H3v6h4l5 5V4z"/>
        </svg>
        <canvas id="wave" width="50" height="15"></canvas>
    </div>
</header>

<!-- Menu volet latéral (navigation principale) -->
<div class="menu-volet" id="menuVolet">
    <div class="menu-volet-content">
        <?php
        $videoSources = [
            [
                "src" => "video/web/recyclerie.mp4",
                "poster" => "img/posters/recyclerie_poster.png",
                "title" => getTranslation("menu_voletchap1", $lang),
                "slide" => 1
            ],
            [
                "src" => "video/web/bache.mp4",
                "poster" => "img/posters/bache_poster.png",
                "title" => getTranslation("menu_voletchap2", $lang),
                "slide" => 2
            ],
            [
                "src" => "video/web/lee.mp4",
                "poster" => "img/posters/lee_poster.png",
                "title" => getTranslation("menu_voletchap3", $lang),
                "slide" => 3
            ]
        ];
        foreach ($videoSources as $video) {
            echo '<div class="menu-video-item" data-slide="' . $video["slide"] . '">';
            echo '<video class="menu-video" muted loop playsinline preload="metadata" poster="' . htmlspecialchars($video["poster"]) . '">';
            echo '<source src="' . htmlspecialchars($video["src"]) . '" type="video/mp4">';
            echo '</video>';
            echo '<h4>' . $video["title"] . '</h4>';
            echo '</div>';
        }
        ?>
    </div>
    <div class="menu-links">
        <ul>
            <li><a href="portraits" class="transition-link" title="<?php echo getTranslation('portraits_titre', $lang) ?>"><?php echo getTranslation('portraits_titre', $lang) ?></a></li>
            <li><a href="tracesdupasse" class="transition-link" title="<?php echo getTranslation('archives_titre', $lang) ?>"><?php echo getTranslation('archives_titre', $lang) ?></a></li>
            <li><a href="derriere-le-documentaire" class="transition-link" title="<?php echo getTranslation('derriereledocumentaire_titre', $lang) ?>"><?php echo getTranslation('derriereledocumentaire_titre', $lang) ?></a></li>
            <li id="menu-accueil"><a href="./" class="transition-link" id="menu-accueil-style"><?php echo getTranslation('index_titre', $lang) ?></a></li>
            <li class="mentionslegales-right"><a href="mentionslegales" class="transition-link" title="<?php echo getTranslation('mentionslegales_titre', $lang) ?>"><?php echo getTranslation('mentionslegales_titre', $lang) ?></a></li>
        </ul>
    </div>
</div>
