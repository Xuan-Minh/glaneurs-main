  <div id="transition-overlay" class="active"></div>   
<header>
    <div class="header-controls">
           <?php if (basename($_SERVER['PHP_SELF']) !== 'index.php'): ?>
            <!-- <a href="index.php" class="logo-link">
                <img src="img/favicon.png" alt="Logo" class="logo">
           </a> -->
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
        "title" => "Chapitre 1",
        "slide" => 1 // Numéro de la slide (commence à 1)
    ),
    array(
        "src" => "video/bache.mov",
        "title" => "Chapitre 2",
        "slide" => 2
    ),
    array(
        "src" => "video/lee.mov",
        "title" => "Chapitre 3",
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
            <li><a href="portraits.php">Portraits</a></li>
            <li><a href="archives.php">Archives</a></li>
            <li><a href="souvenirs.php">Souvenirs</a></li>
            <li><a href="associations.php">Associations</a></li>
            <li><a href="derriere-le-documentaire.php">Derrière le documentaire</a></li>
            <br>
            <br>
            <br>
            <li><a href="mentionslegales.php">Mentions légales</a></li>
            <li><a href="index.php">Home</a></li>
            
        </ul>
    </div>
</div>      