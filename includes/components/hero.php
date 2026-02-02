<?php
/**
 * Composant réutilisable pour les sections hero
 * @param string $videoSrc Source de la vidéo (ex. 'video/web/archives.mp4')
 * @param string $posterSrc Source du poster (ex. 'img/posters/archives_poster.png')
 * @param string $title Titre à afficher
 * @param string $className Classe CSS spécifique (ex. 'archive-hero')
 * @param string $lang Langue pour les traductions si nécessaire
 */
function renderHero($videoSrc, $posterSrc, $title, $className, $lang = 'fr') {
?>
<section class="hero-section <?php echo htmlspecialchars($className); ?>">
    <video autoplay muted loop poster="<?php echo htmlspecialchars($posterSrc); ?>">
        <source src="<?php echo htmlspecialchars($videoSrc); ?>" type="video/mp4">
    </video>
    <h2 class="hero-title content-anim">
        <?php echo htmlspecialchars($title); ?>
    </h2>
</section>
<?php
}
?>
