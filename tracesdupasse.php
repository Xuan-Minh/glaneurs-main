<?php include 'includes/lang.php'; ?>
<?php
/**
 * ==========================================================================
 * CONFIGURATION DE LA PAGE ARCHIVES
 * ==========================================================================
 *
 * Règles:
 * - 'textes'      : nombre de paragraphes traduits (clé suffixée 1..N).
 * - 'image_blocks': blocs média injectés après un paragraphe.
 * - 'after' => 0  : bloc injecté avant le premier paragraphe.
 * - 'blockquote'  : citation de chapitre.
 * - 'intro_quote' : citation injectée dans l'intro d'une partie.
 *
 * Formats supportés pour image_blocks:
 * - side      : texte + image(s) côte à côte (img_position: right|left)
 * - strip     : rangée d'images au-dessus/dessous d'un texte (img_position: top|bottom)
 * - newspaper : colonnes indépendantes (image + texte)
 */

$archives_intro = [
    'textes' => 2,
    'image_blocks' => [
        [
            'layout' => 'strip',
            'img_position' => 'bottom',
            'after' => 2,
            'images' => [1, 2, 3],
        ],
    ],
];

$archives_structure = [
    'p1' => [
        'titre' => 'p1_titre',
        'intro' => 0,
        'sous_parties' => [
            'A' => [
                'textes' => 3,
                'image_blocks' => [
                    [
                        'layout' => 'side',
                        'img_position' => 'right',
                        'after' => 1,
                        'images' => [4, 5],
                    ],
                ],
            ],
            'B' => 5,
            'C' => [
                'textes' => 5,
                'blockquote' => ['key' => 'p1_C_quote', 'source' => 'p1_C_quote_source'],
                'extra_textes' => 1,
            ],
        ],
    ],
    'p2' => [
        'titre' => 'p2_titre',
        'intro' => 5,
        'intro_quote' => [
            'key' => 'p1_transition_quote',
            'source' => 'p1_transition_quote_source',
            'after' => 2,
        ],
        'sous_parties' => [
            'A' => 4,
            'B' => 5,
            'C' => 3,
        ],
    ],
];

/**
 * Retourne true si le paragraphe est absorbé par un bloc "side" sans text_key.
 * Dans ce cas, le paragraphe est rendu dans le bloc image-texte et non séparément.
 */
function isParagraphEmbeddedInSide(array $blocks, int $paragraphIdx): bool
{
    foreach ($blocks as $block) {
        if ((int)($block['after'] ?? -1) !== $paragraphIdx) {
            continue;
        }
        if (($block['layout'] ?? '') === 'side' && empty($block['text_key'])) {
            return true;
        }
    }
    return false;
}

/**
 * Insère les blocs image-texte configurés pour apparaître après $afterIdx.
 */
function renderImageBlocks(array $blocks, int $afterIdx, string $lang, ?string $fallbackText = null): void
{
    foreach ($blocks as $block) {
        if ((int)($block['after'] ?? -1) !== $afterIdx) {
            continue;
        }

        $layout = $block['layout'] ?? 'strip';
        $imgPos = $block['img_position'] ?? 'bottom';

        $cssClass = 'archive-media-block content-anim';
        if ($layout === 'side') {
            $cssClass .= " amb-side amb-img-{$imgPos}";
        } elseif ($layout === 'strip') {
            $cssClass .= " amb-strip amb-imgs-{$imgPos}";
        } elseif ($layout === 'newspaper') {
            $cssClass .= ' amb-newspaper';
        }
        ?>
        <div class="<?php echo $cssClass; ?>">
        <?php if ($layout === 'newspaper'): ?>

            <?php foreach ($block['columns'] as $col):
                $arch = getArchive((int)$col['image_id']);
                if (!$arch) {
                    continue;
                }
                $src    = htmlspecialchars($arch['archives_src'], ENT_QUOTES, 'UTF-8');
                $titre  = htmlspecialchars($arch['archives_titre'], ENT_QUOTES, 'UTF-8');
                $date   = htmlspecialchars($arch['archives_date'], ENT_QUOTES, 'UTF-8');
            ?>
            <div class="amb-newspaper-col">
                <figure class="archive-gallery-item"
                        data-src="<?php echo $src; ?>"
                        data-titre="<?php echo $titre; ?>"
                        data-date="<?php echo $date; ?>"
                        data-auteur="<?php echo $auteur; ?>">
                    <img src="<?php echo $src; ?>" alt="<?php echo $titre; ?>" loading="lazy">
                    <figcaption>
                        <span class="amb-fig-title"><?php echo $titre; ?></span>
                        <span class="amb-fig-date"><?php echo $date; ?></span>
                    </figcaption>
                </figure>
                <?php if (!empty($col['text_key'])): ?>
                <p><?php echo getTranslationRich($col['text_key'], $lang); ?></p>
                <?php endif; ?>
            </div>
            <?php endforeach; ?>

        <?php else: /* side et strip */
            $imgIds      = $block['images'] ?? [];
            $textContent = '';
            if (!empty($block['text_key'])) {
                $textContent = getTranslationRich($block['text_key'], $lang);
            } elseif ($layout === 'side' && $fallbackText !== null) {
                $textContent = $fallbackText;
            }
            $textFirst = ($layout === 'side' && $imgPos === 'right')
                      || ($layout === 'strip' && $imgPos === 'bottom');
        ?>
            <?php if ($textFirst && $textContent !== ''): ?>
            <div class="amb-text"><p><?php echo $textContent; ?></p></div>
            <?php endif; ?>

            <div class="amb-images">
            <?php foreach ($imgIds as $imgId):
                $arch = getArchive((int)$imgId);
                if (!$arch) {
                    continue;
                }
                $src    = htmlspecialchars($arch['archives_src'], ENT_QUOTES, 'UTF-8');
                $titre  = htmlspecialchars($arch['archives_titre'], ENT_QUOTES, 'UTF-8');
                $date   = htmlspecialchars($arch['archives_date'], ENT_QUOTES, 'UTF-8');
                $auteur = htmlspecialchars($arch['archives_auteur'], ENT_QUOTES, 'UTF-8');
            ?>
                <figure class="archive-gallery-item"
                        data-src="<?php echo $src; ?>"
                        data-titre="<?php echo $titre; ?>"
                        data-date="<?php echo $date; ?>"
                        data-auteur="<?php echo $auteur; ?>">
                    <img src="<?php echo $src; ?>" alt="<?php echo $titre; ?>" loading="lazy">
                    <figcaption>
                        <span class="amb-fig-title"><?php echo $titre; ?></span>
                        <span class="amb-fig-date"><?php echo $date; ?></span>
                    </figcaption>
                </figure>
            <?php endforeach; ?>
            </div>

            <?php if (!$textFirst && $textContent !== ''): ?>
            <div class="amb-text"><p><?php echo $textContent; ?></p></div>
            <?php endif; ?>

        <?php endif; ?>
        </div>
        <?php
    }
}

/**
 * Rend une séquence de paragraphes en injectant automatiquement les blocs média.
 */
function renderParagraphFlow(
    int $count,
    callable $getParagraphHtml,
    array $blocks,
    string $lang,
    ?callable $afterParagraph = null
): void {
    renderImageBlocks($blocks, 0, $lang);

    for ($i = 1; $i <= $count; $i++) {
        $paragraphHtml = $getParagraphHtml($i);

        if (!isParagraphEmbeddedInSide($blocks, $i)) {
            echo '<p>' . $paragraphHtml . '</p>';
        }

        if ($afterParagraph !== null) {
            $afterParagraph($i);
        }

        renderImageBlocks($blocks, $i, $lang, $paragraphHtml);
    }
}
?>
    <!DOCTYPE html>
    <html lang="<?php echo $lang; ?>" <?php if ($lang == 'ko') echo ' class="ko-lang"'; ?>>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php echo getTranslation("archives_titre", $lang) ?> - Les glaneurs de carton</title>
        <meta name="description" content="<?php echo getTranslation('meta_description_archives', $lang); ?>">
        <link rel="canonical" href="https://glaneursdecarton.mastercmw.com/tracesdupasse.php?lang=<?php echo $lang; ?>" />
        <link rel="alternate" hreflang="fr" href="https://glaneursdecarton.mastercmw.com/tracesdupasse.php?lang=fr" />
        <link rel="alternate" hreflang="en" href="https://glaneursdecarton.mastercmw.com/tracesdupasse.php?lang=en" />
        <link rel="alternate" hreflang="ko" href="https://glaneursdecarton.mastercmw.com/tracesdupasse.php?lang=ko" />
        <?php include "includes/layout/css.php"; ?>
        <link rel="stylesheet" href="css/archives.css">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "<?php echo addslashes(getTranslation('archives_titre', $lang)); ?> - Les glaneurs de carton",
          "url": "https://glaneursdecarton.mastercmw.com/tracesdupasse.php?lang=<?php echo $lang; ?>",
          "description": "<?php echo addslashes(getTranslation('meta_description_archives', $lang)); ?>",
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
                "name": "<?php echo addslashes(getTranslation('archives_titre', $lang)); ?>",
                "item": "https://glaneursdecarton.mastercmw.com/tracesdupasse.php?lang=<?php echo $lang; ?>"
              }
            ]
          }
        }
        </script>
    </head>

    <body>
        <?php include "includes/layout/header.php"; ?>
        <audio id="audio-bgm" src="audio/slide3.mp3" loop preload="auto"></audio>
        <div class="archives-scroll">
            <?php include 'includes/components/hero.php'; renderHero('video/web/archives.mp4', 'img/posters/archives_poster.png', getTranslation("archives_titre", $lang), 'archive-hero', $lang); ?>
            
            <section class="archives-content">
                <div class="archives-narrative">
                    
                    <section class="archives-intro content-anim preserve-lines">
                        <?php
                        $introPageBlocks = $archives_intro['image_blocks'] ?? [];
                        renderParagraphFlow(
                            (int)$archives_intro['textes'],
                            function (int $i) use ($lang): string {
                                return getTranslationRich("intro_texte{$i}", $lang);
                            },
                            $introPageBlocks,
                            $lang
                        );
                        ?>
                    </section>

                    <?php foreach ($archives_structure as $part_id => $part_data): ?>
                        
                        <div class="archives-part" id="<?php echo $part_id; ?>">
                            <h2 class="archives-part-title content-anim"><?php echo getTranslation($part_data['titre'], $lang); ?></h2>
                            
                            <?php if ($part_data['intro'] > 0): ?>
                                <section class="archives-part-intro<?php echo !empty($part_data['intro_image_blocks']) ? ' has-images' : ''; ?> content-anim preserve-lines">
                                    <?php
                                    $introBlocks = $part_data['intro_image_blocks'] ?? [];
                                    renderParagraphFlow(
                                        (int)$part_data['intro'],
                                        function (int $i) use ($part_id, $lang): string {
                                            return getTranslationRich("{$part_id}_intro_texte{$i}", $lang);
                                        },
                                        $introBlocks,
                                        $lang,
                                        function (int $i) use ($part_data, $lang): void {
                                            if (!isset($part_data['intro_quote']) || (int)$part_data['intro_quote']['after'] !== $i) {
                                                return;
                                            }
                                            echo '<blockquote class="archives-transition-quote content-anim">';
                                            echo '<p>' . getTranslationRich($part_data['intro_quote']['key'], $lang) . '</p>';
                                            echo '<cite>' . getTranslationRich($part_data['intro_quote']['source'], $lang) . '</cite>';
                                            echo '</blockquote>';
                                        }
                                    );
                                    ?>
                                </section>
                            <?php endif; ?>

                            <?php foreach ($part_data['sous_parties'] as $sub_id => $sub_data): ?>
                                <?php
                                $text_count        = is_array($sub_data) ? $sub_data['textes'] : $sub_data;
                                $chapterBlocks     = is_array($sub_data) ? ($sub_data['image_blocks'] ?? []) : [];
                                $chapter_has_images = is_array($sub_data) && !empty($sub_data['image_blocks']);
                            ?>
                                <section id="<?php echo $part_id . '_' . $sub_id; ?>" class="archives-chapter<?php echo $chapter_has_images ? ' has-images' : ''; ?> content-anim preserve-lines">
                                    <h3><?php echo getTranslation("{$part_id}_{$sub_id}_titre", $lang); ?></h3>
                                    <?php
                                    renderParagraphFlow(
                                        (int)$text_count,
                                        function (int $i) use ($part_id, $sub_id, $lang): string {
                                            return getTranslationRich("{$part_id}_{$sub_id}_texte{$i}", $lang);
                                        },
                                        $chapterBlocks,
                                        $lang
                                    );
                                    ?>

                                    <?php if (is_array($sub_data) && isset($sub_data['blockquote'])): ?>
                                        <blockquote class="archives-blockquote">
                                            <p><?php echo getTranslationRich($sub_data['blockquote']['key'], $lang); ?></p>
                                            <cite><?php echo getTranslationRich($sub_data['blockquote']['source'], $lang); ?></cite>
                                        </blockquote>
                                    <?php endif; ?>

                                    <?php if (is_array($sub_data) && !empty($sub_data['extra_textes'])): ?>
                                        <?php for ($i = $text_count + 1; $i <= $text_count + $sub_data['extra_textes']; $i++): ?>
                                            <p><?php echo getTranslationRich("{$part_id}_{$sub_id}_texte{$i}", $lang); ?></p>
                                        <?php endfor; ?>
                                    <?php endif; ?>

                                </section>
                            <?php endforeach; ?>

                            <?php if (isset($part_data['transition_quote'])): ?>
                                <blockquote class="archives-transition-quote content-anim">
                                    <p><?php echo getTranslationRich($part_data['transition_quote']['key'], $lang); ?></p>
                                    <cite><?php echo getTranslationRich($part_data['transition_quote']['source'], $lang); ?></cite>
                                </blockquote>
                            <?php endif; ?>

                        </div>

                    <?php endforeach; ?>

                    <section id="conclusion" class="archives-conclusion content-anim preserve-lines">
                        <h2><?php echo getTranslation("conclu_titre", $lang); ?></h2>
                        <?php for ($i = 1; $i <= 3; $i++): ?>
                            <p><?php echo getTranslationRich("conclu_texte{$i}", $lang); ?></p>
                        <?php endfor; ?>
                    </section>

                </div>
            </section>
        </div>

        <?php include "includes/components/archives-overlay.php"; ?>
        <?php include "includes/layout/jsinclude.php"; ?>
        <script src="js/pages/archives.js" defer></script>
        <script src="js/features/gallery-overlay.js" defer></script>
        <?php include "includes/components/visionner.php"; ?>
    </body>
    </html>