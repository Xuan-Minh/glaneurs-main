<header>
    <div class="header-controls">
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
            echo '<video src="' . $video["src"] . '" muted loop class="menu-video"></video>';
            echo '<h4>' . $video["title"] . '</h4>'; // Affiche le titre de la vidéo
            echo '</div>';
        }
        ?>
    </div>
    <div class="menu-links">
        <ul>
            <li><a href="#">Archives</a></li>
            <li><a href="#">Souvenirs</a></li>
            <li><a href="#">Portraits</a></li>
            <li><a href="#">Derrière la caméra</a></li>
        </ul>
    </div>
</div>