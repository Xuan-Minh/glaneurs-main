<?php include 'includes/lang.php'; // Inclut le fichier pour gérer la langue

function display_portrait_content($portrait_id, $lang) {
    // 1. Obtenir la connexion à la BDD à l'intérieur de la fonction
    $conn = getPDO(); 

    $sql = "SELECT * FROM portraits_content WHERE portrait_id = ? ORDER BY element_order ASC";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) { die("Erreur de préparation de la requête."); }
    $stmt->execute([$portrait_id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // On construit le contenu dans l'ordre, en regroupant les gallery_image consécutives
    // en blocs séparés, ce qui permet de placer plusieurs galeries à différents endroits.
    $output = '';
    $pending_gallery = [];

    $flush_gallery = function() use (&$pending_gallery, &$output) {
        if (!empty($pending_gallery)) {
            $output .= '<div class="portrait-image-gallery">' . implode('', $pending_gallery) . '</div>';
            $pending_gallery = [];
        }
    };

    foreach ($result as $row) {
        $content = !empty($row['content_' . $lang]) ? $row['content_' . $lang] : $row['content_fr'];
        $data_extra = json_decode($row['data_extra'] ?? '', true);

        switch ($row['element_type']) {
            case 'subtitle':
                $flush_gallery();
                $base_classes = 'portrait-subtitle content-anim';
                $custom_classes = '';
                if (isset($data_extra['class']) && !empty($data_extra['class'])) {
                    $custom_classes = ' ' . htmlspecialchars($data_extra['class']);
                }
                $output .= '<h3 class="' . $base_classes . $custom_classes . '">' . htmlspecialchars($content) . '</h3>';
                break;

            case 'paragraph':
                $flush_gallery();
                if (empty(trim($content ?? ''))) break;
                $base_classes = 'preserve-lines content-anim';
                $custom_classes = '';
                if (isset($data_extra['class']) && !empty($data_extra['class'])) {
                    $custom_classes = ' ' . htmlspecialchars($data_extra['class']);
                }
                $output .= '<p class="' . $base_classes . $custom_classes . '">' . nl2br(htmlspecialchars($content ?? '')) . '</p>';
                break;

            case 'break_video':
                $flush_gallery();
                $video_html = '<video src="' . htmlspecialchars($content) . '" autoplay muted loop playsinline></video>';
                $text_overlay_html = '';
                if (isset($data_extra['text_' . $lang]) && !empty($data_extra['text_' . $lang])) {
                    $text_content = $data_extra['text_' . $lang];
                    $position_class = isset($data_extra['position']) && $data_extra['position'] === 'right' ? 'position-right' : 'position-left';
                    $text_overlay_html = '
                        <div class="video-text-overlay ' . $position_class . '">
                            <p>' . nl2br(htmlspecialchars($text_content)) . '</p>
                        </div>';
                }
                $output .= '
                    <div class="portrait-break-video">
                        ' . $video_html . '
                        ' . $text_overlay_html . '
                    </div>';
                break;

            case 'gallery_break':
                // Séparateur invisible : coupe le groupe de galerie en cours
                $flush_gallery();
                break;

            case 'gallery_image':
                $titre = isset($data_extra['titre_' . $lang]) ? $data_extra['titre_' . $lang] : (isset($data_extra['titre_fr']) ? $data_extra['titre_fr'] : '');
                $auteur = isset($data_extra['auteur']) ? $data_extra['auteur'] : '';
                $date = isset($data_extra['date']) ? $data_extra['date'] : '';
                $pending_gallery[] = '
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

    // Vider la dernière galerie pendante s'il en reste une
    $flush_gallery();

    echo $output;
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
    <script src="js/features/portraits-map.js"></script>
</head>

<body>

    <?php include "includes/layout/header.php"; ?>

     <div class="portraits-container">
        <div class="portrait-section section1" data-target="#detail1" data-audio="audio/arirang_bass.mp3">
            <video autoplay muted loop class="portrait-video section1-video" poster="img/posters/glaneuse-test_poster.png">
                <source src="video/web/glaneuse-test.mp4" type="video/mp4">
            </video>
            <h2 class="portrait-name"><?php echo getTranslation("portraits_master", $lang); ?></h2>
        </div>
        <div class="portrait-section section2" data-target="#detail2" data-audio="audio/arirang_harp.mp3">
            <video autoplay muted loop class="portrait-video section2-video" poster="img/posters/lee-test_poster.png">
                <source src="video/web/lee-test.mp4" type="video/mp4">
            </video>
            <h2 class="portrait-name"><?php echo getTranslation("portraits_lee", $lang); ?></h2>
        </div>
        <div class="portrait-section section3" data-target="#detail3" data-audio="audio/arirang_piano.mp3">
            <video autoplay muted loop class="portrait-video section3-video" poster="img/posters/arirang-test_poster.png">
                <source src="video/web/arirang-test.mp4" type="video/mp4">
            </video>
            <h2 class="portrait-name"><?php echo getTranslation("portraits_arirang", $lang); ?></h2>
        </div>
        <div class="portrait-section section4" data-target="#detail4" data-audio="audio/arirang_oboe.mp3">
            <video autoplay muted loop class="portrait-video section4-video" poster="img/posters/glaneuse-test_poster.png">
                <source src="video/web/glaneuse-test.mp4" type="video/mp4">
            </video>
            <h2 class="portrait-name"><?php echo getTranslation("portraits_jo", $lang); ?></h2>
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
            <div id="map-parcours" style="width:100%;height:400px;margin:20px 0;"></div>
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
    <script src="js/pages/portraits.js" defer></script>
    <script src="js/features/gallery-overlay.js" defer></script> <!-- NOUVEAU: Inclure le script de l'overlay -->
    <?php include "includes/components/visionner.php"; ?>
</body>
</html>