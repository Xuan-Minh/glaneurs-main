<header>
    <div class="header-controls">
           <?php if (basename($_SERVER['PHP_SELF']) !== 'index.php'): ?>
            <a href="index.php" class="logo-link">
                <img src="img/favicon.png" alt="Logo" class="logo">
            </a>
        <?php endif; ?>
        <button id="languageToggle">KR</button>
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
                "title" => "Chapitre 1"
            ),
            array(
                "src" => "video/bache.mov",
                "title" => "Chapitre 2"
            ),
            array(
                "src" => "video/lee.mov",
                "title" => "Chapitre 3"
            )
        );
        foreach ($videoSources as $video) {
            echo '<div class="menu-video-item">';
            echo '<video src="' . $video["src"] . '" autoplay muted loop class="menu-video"></video>';
            echo '<h4>' . $video["title"] . '</h4>'; // Affiche le titre de la vidéo
            echo '</div>';
        }
        ?>
    </div>
    <div class="menu-links">
        <ul>
           
            <li><a href="souvenirs.php">Souvenirs</a></li>
            <li><a href="portraits.php">Portraits</a></li>
            <li><a href="archives.php">Archives</a></li>
            <li><a href="donnees-cles.php">Données clés</a></li>
            <li><a href="associations.php">Associations</a></li>
            <li><a href="derriere-la-camera.php">Derrière la caméra</a></li>
            <li><a href="includes/reset.php">Reset</a></li>
        </ul>
    </div>
</div>