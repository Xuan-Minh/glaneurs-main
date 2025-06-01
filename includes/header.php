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
            <span class="lang-option <?php if ($lang == 'kr') echo 'active'; ?>" data-lang="kr">KR</span>
        </div>
        <div class="menu-burger" id="menuBurger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</header>

<div class="menu-volet" id="menuVolet">
    <div class="menu-volet-content">
        <?php
        $videoSources = array(
            array(
                "src" => "video/ville.mov",
                "title" => getTranslation("index_chapitre1", $lang),
                "slide" => 1 // Numéro de la slide (commence à 1)
            ),
            array(
                "src" => "video/bache.mov",
                "title" => getTranslation("index_chapitre2", $lang),
                "slide" => 2
            ),
            array(
                "src" => "video/lee.mov",
                "title" => getTranslation("index_chapitre3", $lang),
                "slide" => 3
            )
        );
        foreach ($videoSources as $video) {
            echo '<div class="menu-video-item" data-slide="' . $video["slide"] . '">';
            echo '<video src="' . $video["src"] . '" autoplay muted loop class="menu-video"></video>';
            echo '<h4>' . $video["title"] . '</h4>';
            echo '</div>';
        }
        ?>
    </div>
    <div class="menu-links">
        <ul>
            <li><a href="portraits.php"><?php echo getTranslation("portraits_titre", $lang) ?></a></li>
            <li><a href="archives.php"><?php echo getTranslation("archives_titre", $lang) ?></a></li>
            <li><a href="associations.php"><?php echo getTranslation("associations_titre", $lang) ?></a></li>
            <li><a href="souvenirs.php"><?php echo getTranslation("souvenirs_titre", $lang) ?></a></li>
            <li><a href="derriere-le-documentaire.php"><?php echo getTranslation("derriereledocumentaire_titre", $lang) ?></a></li>
            <br>
            <br>
            <li><a href="mentionslegales.php"><?php echo getTranslation("mentionslegales_titre", $lang) ?></a></li>
            <li><a href="index.php"><?php echo getTranslation("accueil", $lang) ?></a></li>

        </ul>
    </div>
</div>