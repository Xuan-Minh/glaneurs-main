<?php include 'includes/lang.php'; // Inclut le fichier pour gérer la langue

function display_portrait_content($portrait_id, $lang) {
    // 1. Obtenir la connexion à la BDD à l'intérieur de la fonction
    $conn = getPDO(); 

    $sql = "SELECT * FROM portraits_content WHERE portrait_id = ? ORDER BY element_order ASC";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) { die("Erreur de préparation de la requête."); }
    $stmt->execute([$portrait_id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $gallery_items = [];
    $other_content = '';

    foreach ($result as $row) {
        $content = !empty($row['content_' . $lang]) ? $row['content_' . $lang] : $row['content_fr'];
        $data_extra = json_decode($row['data_extra'], true);

        switch ($row['element_type']) {
            case 'paragraph':
               $base_classes = 'preserve-lines content-anim';
                $custom_classes = '';

                // On vérifie si des classes personnalisées sont définies dans data_extra
                if (isset($data_extra['class']) && !empty($data_extra['class'])) {
                    // On s'assure que les classes sont bien formatées pour l'attribut HTML
                    $custom_classes = ' ' . htmlspecialchars($data_extra['class']);
                }

                // On combine les classes de base et les classes personnalisées
                $other_content .= '<p class="' . $base_classes . $custom_classes . '">' . nl2br(htmlspecialchars($content)) . '</p>';
                break;

                 // NOUVEAU : Cas pour la vidéo de séparation
           case 'break_video':
                $video_html = '<video src="' . htmlspecialchars($content) . '" autoplay muted loop playsinline></video>';
                
                // On vérifie si du texte doit être affiché par-dessus
                $text_overlay_html = '';
                if (isset($data_extra['text_' . $lang]) && !empty($data_extra['text_' . $lang])) {
                    $text_content = $data_extra['text_' . $lang];
                    $position_class = isset($data_extra['position']) && $data_extra['position'] === 'right' ? 'position-right' : 'position-left';
                    
                    $text_overlay_html = '
                        <div class="video-text-overlay ' . $position_class . '">
                            <p>' . nl2br(htmlspecialchars($text_content)) . '</p>
                        </div>';
                }

                $other_content .= '
                    <div class="portrait-break-video">
                        ' . $video_html . '
                        ' . $text_overlay_html . '
                    </div>';
                break;

            case 'gallery_image':
                $titre = isset($data_extra['titre_' . $lang]) ? $data_extra['titre_' . $lang] : (isset($data_extra['titre_fr']) ? $data_extra['titre_fr'] : '');
                
                // NOUVEAU: Extraire l'auteur et la date
                $auteur = isset($data_extra['auteur']) ? $data_extra['auteur'] : '';
                $date = isset($data_extra['date']) ? $data_extra['date'] : '';

                $gallery_items[] = '
                    <a class="archive-gallery-item" 
                       data-src="' . htmlspecialchars($content) . '" 
                       data-titre="' . htmlspecialchars($titre) . '" 
                       data-date="' . htmlspecialchars($date) . '" 
                       data-auteur="' . htmlspecialchars($auteur) . '">
                        <img src="' . htmlspecialchars($content) . '" alt="' . htmlspecialchars($titre) . '">
                    </a>';
                break;
        }
    }

    echo $other_content;

    if (!empty($gallery_items)) {
        echo '<div class="portrait-image-gallery">' . implode('', $gallery_items) . '</div>';
    }
}
?>

<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" <?php if ($lang == 'ko') echo ' class="ko-lang"'; ?>>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include "includes/layout/css.php"; ?>
    <link rel="stylesheet" href="css/portraits.css">
    <link rel="stylesheet" href="css/archives.css">
    <title><?php echo getTranslation("portraits_titre", $lang) ?></title>
</head>

<body>

    <?php include "includes/layout/header.php"; ?>
    <!-- <div class="volume-control">
        <label for="volumeRange">Volume&nbsp;:</label>
        <input type="range" id="volumeRange" min="0" max="1" step="0.01" value="0.4">
    </div> -->

     <div class="portraits-container">
        <div class="portrait-section section1" data-target="#detail1" data-audio="audio/arirang_bass.mp3">
            <video autoplay muted loop class="portrait-video section1-video" poster="img/posters/glaneuse-test_poster.png">
                <source src="video/web/glaneuse-test.mp4" type="video/mp4">
            </video>
            <div class="portrait-name"><?php echo getTranslation("portraits_master", $lang); ?></div>
        </div>
        <div class="portrait-section section2" data-target="#detail2" data-audio="audio/arirang_harp.mp3">
            <video autoplay muted loop class="portrait-video section2-video" poster="img/posters/lee-test_poster.png">
                <source src="video/web/lee-test.mp4" type="video/mp4">
            </video>
            <div class="portrait-name"><?php echo getTranslation("portraits_lee", $lang); ?></div>
        </div>
        <div class="portrait-section section3" data-target="#detail3" data-audio="audio/arirang_piano.mp3">
            <video autoplay muted loop class="portrait-video section3-video" poster="img/posters/arirang-test_poster.png">
                <source src="video/web/arirang-test.mp4" type="video/mp4">
            </video>
            <div class="portrait-name"><?php echo getTranslation("portraits_arirang", $lang); ?></div>
        </div>
        <div class="portrait-section section4" data-target="#detail4" data-audio="audio/arirang_oboe.mp3">
            <video autoplay muted loop class="portrait-video section4-video" poster="img/posters/glaneuse-test_poster.png">
                <source src="video/web/glaneuse-test.mp4" type="video/mp4">
            </video>
            <div class="portrait-name"><?php echo getTranslation("portraits_jo", $lang); ?></div>
        </div>
    </div>

    <section class="portrait-detail" id="detail1">
        <div class="detail-content">
            <h2><?php echo getTranslation("portraits_master", $lang); ?></h2>
            <?php display_portrait_content(1, $lang); ?>
            <button class="back-to-portraits"><?php echo "<span>" . getTranslation("portraits_voirlesautres", $lang) . '</span>' ?></button>
        </div>
    </section>

    <section class="portrait-detail" id="detail2">
        <div class="detail-content">
            <h2><?php echo getTranslation("portraits_lee", $lang); ?></h2>
            <?php display_portrait_content(2, $lang); ?>
            <button class="back-to-portraits"><?php echo "<span>" . getTranslation("portraits_voirlesautres", $lang) . "</span>"; ?></button>
        </div>
    </section>

    <section class="portrait-detail" id="detail3">
        <div class="detail-content">
            <h2><?php echo getTranslation("portraits_arirang", $lang); ?></h2>
            <?php display_portrait_content(3, $lang); ?>
            <button class="back-to-portraits"><?php echo "<span>" . getTranslation("portraits_voirlesautres", $lang) . "</span>"; ?></button>
        </div>
    </section>

    <section class="portrait-detail" id="detail4">
        <div class="detail-content">
            <h2><?php echo getTranslation("portraits_jo", $lang); ?></h2>
            <?php display_portrait_content(4, $lang); ?>
            <button class="back-to-portraits"><?php echo "<span>" . getTranslation("portraits_voirlesautres", $lang) . "</span>"; ?></button>
        </div>
     </section>

    <?php 
    include "includes/components/archives-overlay.php"; 
    ?>

    <?php include "includes/layout/jsinclude.php"; ?>
    <script src="js/portraits.js" defer></script>
    <script src="js/gallery-overlay.js" defer></script> <!-- NOUVEAU: Inclure le script de l'overlay -->
    <?php include "includes/components/visionner.php"; ?>
</body>
</html>