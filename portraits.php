<?php include 'includes/lang.php'; ?>
<?php
/**
 * ==========================================================================
 * CONFIGURATION DE LA PAGE PORTRAITS
 * ==========================================================================
 */
$portraitSections = [
    [
        'id' => 1,
        'sectionClass' => 'section1',
        'detailId' => 'detail1',
        'audio' => 'audio/arirang_bass.mp3',
        'video' => 'video/master01.mp4',
        'poster' => 'img/posters/glaneuse-test_poster.png',
        'nameKey' => 'portraits_master',
        'hasMap' => false,
    ],
    [
        'id' => 2,
        'sectionClass' => 'section2',
        'detailId' => 'detail2',
        'audio' => 'audio/arirang_harp.mp3',
        'video' => 'video/web/lee-test.mp4',
        'poster' => 'img/posters/lee-test_poster.png',
        'nameKey' => 'portraits_lee',
        'hasMap' => true,
    ],
    [
        'id' => 3,
        'sectionClass' => 'section3',
        'detailId' => 'detail3',
        'audio' => 'audio/arirang_piano.mp3',
        'video' => 'video/web/arirang-test.mp4',
        'poster' => 'img/posters/arirang-test_poster.png',
        'nameKey' => 'portraits_arirang',
        'hasMap' => false,
    ],
    [
        'id' => 4,
        'sectionClass' => 'section4',
        'detailId' => 'detail4',
        'audio' => 'audio/arirang_oboe.mp3',
        'video' => 'video/web/glaneuse-test.mp4',
        'poster' => 'img/posters/glaneuse-test_poster.png',
        'nameKey' => 'portraits_jo',
        'hasMap' => false,
    ],
];

/**
 * ==========================================================================
 * HELPERS
 * ==========================================================================
 */
function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function getPortraitRows(int $portraitId): array
{
    static $cache = [];
    if (isset($cache[$portraitId])) {
        return $cache[$portraitId];
    }

    $conn = getPDO();
    $sql = "SELECT * FROM portraits_content WHERE portrait_id = ? ORDER BY element_order ASC";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        die('Erreur de preparation de la requete.');
    }

    $stmt->execute([$portraitId]);
    $cache[$portraitId] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $cache[$portraitId];
}

function renderPortraitContent(int $portraitId, string $lang): void
{
    $output = [];
    $pendingGallery = [];

    $flushGallery = function () use (&$pendingGallery, &$output): void {
        if (empty($pendingGallery)) {
            return;
        }
        $output[] = '<div class="portrait-image-gallery">' . implode('', $pendingGallery) . '</div>';
        $pendingGallery = [];
    };

    foreach (getPortraitRows($portraitId) as $row) {
        $content = !empty($row['content_' . $lang]) ? (string)$row['content_' . $lang] : (string)($row['content_fr'] ?? '');
        $dataExtra = json_decode($row['data_extra'] ?? '', true);
        if (!is_array($dataExtra)) {
            $dataExtra = [];
        }

        $customClass = !empty($dataExtra['class']) ? ' ' . h((string)$dataExtra['class']) : '';

        switch ($row['element_type']) {
            case 'subtitle':
                $flushGallery();
                $output[] = '<h3 class="portrait-subtitle content-anim' . $customClass . '">' . formatRichText($content) . '</h3>';
                break;

            case 'paragraph':
                $flushGallery();
                if (trim($content) === '') {
                    break;
                }
                $output[] = '<p class="preserve-lines content-anim' . $customClass . '">' . formatRichText($content, true) . '</p>';
                break;

            case 'break_video':
                $flushGallery();
                $videoHtml = '<video src="' . h($content) . '" autoplay muted loop playsinline></video>';
                $textOverlayHtml = '';

                if (!empty($dataExtra['text_' . $lang])) {
                    $textContent = (string)$dataExtra['text_' . $lang];
                    $positionClass = (!empty($dataExtra['position']) && $dataExtra['position'] === 'right')
                        ? 'position-right'
                        : 'position-left';

                    $textOverlayHtml =
                        '<div class="video-text-overlay ' . $positionClass . '">' .
                            '<p>' . formatRichText($textContent, true) . '</p>' .
                        '</div>';
                }

                $output[] =
                    '<div class="portrait-break-video">' .
                        $videoHtml .
                        $textOverlayHtml .
                    '</div>';
                break;

            case 'gallery_break':
                $flushGallery();
                break;

            case 'gallery_image':
                $titre = (string)($dataExtra['titre_' . $lang] ?? $dataExtra['titre_fr'] ?? '');
                $auteur = (string)($dataExtra['auteur'] ?? '');
                $date = (string)($dataExtra['date'] ?? '');
                $src = h($content);

                $pendingGallery[] =
                    '<a class="archive-gallery-item" ' .
                        'data-src="' . $src . '" ' .
                        'data-titre="' . h($titre) . '" ' .
                        'data-date="' . h($date) . '" ' .
                        'data-auteur="' . h($auteur) . '">' .
                        '<img src="' . $src . '" alt="' . h($titre) . '">' .
                    '</a>';
                break;
        }
    }

    $flushGallery();
    echo implode('', $output);
}
?>

<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" <?php if ($lang == 'ko') echo ' class="ko-lang"'; ?>>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo getTranslation("portraits_titre", $lang) ?> - Les glaneurs de carton</title>
    <meta name="description" content="<?php echo getTranslation('meta_description_portraits', $lang); ?>">
    <link rel="canonical" href="https://glaneursdecarton.mastercmw.com/portraits.php?lang=<?php echo $lang; ?>" />
    <link rel="alternate" hreflang="fr" href="https://glaneursdecarton.mastercmw.com/portraits.php?lang=fr" />
    <link rel="alternate" hreflang="en" href="https://glaneursdecarton.mastercmw.com/portraits.php?lang=en" />
    <link rel="alternate" hreflang="ko" href="https://glaneursdecarton.mastercmw.com/portraits.php?lang=ko" />
    <?php include "includes/layout/css.php"; ?>
    <link rel="stylesheet" href="css/portraits.css">
    <link rel="stylesheet" href="css/archives.css">
    <script src="js/features/portraits-map.js"></script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "<?php echo addslashes(getTranslation('portraits_titre', $lang)); ?> - Les glaneurs de carton",
      "url": "https://glaneursdecarton.mastercmw.com/portraits.php?lang=<?php echo $lang; ?>",
      "description": "<?php echo addslashes(getTranslation('meta_description_portraits', $lang)); ?>",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Les glaneurs de carton",
        "url": "https://glaneursdecarton.mastercmw.com/"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Les glaneurs de carton",
            "item": "https://glaneursdecarton.mastercmw.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "<?php echo addslashes(getTranslation('portraits_titre', $lang)); ?>",
            "item": "https://glaneursdecarton.mastercmw.com/portraits.php?lang=<?php echo $lang; ?>"
          }
        ]
      }
    }
    </script>
</head>

<body>

    <?php include "includes/layout/header.php"; ?>

    <div class="portraits-container">
        <?php foreach ($portraitSections as $section): ?>
            <div
                class="portrait-section <?php echo h($section['sectionClass']); ?>"
                data-target="#<?php echo h($section['detailId']); ?>"
                data-audio="<?php echo h($section['audio']); ?>"
            >
                <video
                    autoplay
                    muted
                    loop
                    class="portrait-video <?php echo h($section['sectionClass']); ?>-video"
                    poster="<?php echo h($section['poster']); ?>"
                >
                    <source src="<?php echo h($section['video']); ?>" type="video/mp4">
                </video>
                <h2 class="portrait-name"><?php echo getTranslation($section['nameKey'], $lang); ?></h2>
            </div>
        <?php endforeach; ?>
    </div>

    <?php foreach ($portraitSections as $section): ?>
        <section class="portrait-detail" id="<?php echo h($section['detailId']); ?>">
            <div class="detail-content">
                <h2><?php echo getTranslation($section['nameKey'], $lang); ?></h2>
                <?php renderPortraitContent((int)$section['id'], $lang); ?>

                <?php if (!empty($section['hasMap'])): ?>
                    <div id="map-parcours" style="width:100%;height:400px;margin:20px 0;"></div>
                <?php endif; ?>

                <button class="back-to-portraits">
                    <span><?php echo getTranslation('portraits_voirlesautres', $lang); ?></span>
                </button>
            </div>
        </section>
    <?php endforeach; ?>

    <?php include 'includes/components/archives-overlay.php'; ?>

    <?php include 'includes/layout/jsinclude.php'; ?>
    <script src="js/pages/portraits.js" defer></script>
    <script src="js/features/gallery-overlay.js" defer></script>
    <?php include 'includes/components/visionner.php'; ?>
</body>
</html>
