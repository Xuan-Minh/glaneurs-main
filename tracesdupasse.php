    <?php include 'includes/lang.php'; ?>
    <?php
    // Structure du document pour les archives
    // sous_parties : int = nb de textes simples
    //                array = textes + blockquote + extra_textes optionnels
    // transition_quote : blockquote affiché entre la dernière sous-partie et la partie suivante
    $archives_structure = [
        'p1' => [
            'titre' => 'p1_titre',
            'intro' => 0,
            'sous_parties' => [
                'A' => 3,
                'B' => 5,
                'C' => [
                    'textes'       => 5,
                    'blockquote'   => ['key' => 'p1_C_quote', 'source' => 'p1_C_quote_source'],
                    'extra_textes' => 1,
                ],
            ],
            'transition_quote' => ['key' => 'p1_transition_quote', 'source' => 'p1_transition_quote_source'],
        ],
        'p2' => [
            'titre' => 'p2_titre',
            'intro' => 5,
            'sous_parties' => [
                'A' => 4,
                'B' => 5,
                'C' => 3,
            ],
        ],
    ];
    ?>
    <!DOCTYPE html>
    <html lang="<?php echo $lang; ?>" <?php if ($lang == 'ko') echo ' class="ko-lang"'; ?>>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <?php include "includes/layout/css.php"; ?>
        <link rel="stylesheet" href="css/archives.css">
        <title><?php echo getTranslation("archives_titre", $lang) ?></title>
    </head>

    <body>
        <?php include "includes/layout/header.php"; ?>
        <audio id="audio-arirang" src="audio/slide3.mp3" loop preload="auto"></audio>
        <div class="archives-scroll">
            <?php include 'includes/components/hero.php'; renderHero('video/web/archives.mp4', 'img/posters/archives_poster.png', getTranslation("archives_titre", $lang), 'archive-hero', $lang); ?>
            
            <section class="archives-content">
                <div class="archives-narrative">
                    
                    <section class="archives-intro content-anim preserve-lines">
                        <p><?php echo getTranslation("intro_texte1", $lang); ?></p>
                        <p><?php echo getTranslation("intro_texte2", $lang); ?></p>
                    </section>

                    <?php foreach ($archives_structure as $part_id => $part_data): ?>
                        
                        <div class="archives-part" id="<?php echo $part_id; ?>">
                            <h2 class="archives-part-title content-anim"><?php echo getTranslation($part_data['titre'], $lang); ?></h2>
                            
                            <?php if ($part_data['intro'] > 0): ?>
                                <section class="archives-part-intro content-anim preserve-lines">
                                    <?php for ($i = 1; $i <= $part_data['intro']; $i++): ?>
                                        <p><?php echo getTranslation("{$part_id}_intro_texte{$i}", $lang); ?></p>
                                    <?php endfor; ?>
                                </section>
                            <?php endif; ?>

                            <?php foreach ($part_data['sous_parties'] as $sub_id => $sub_data): ?>
                                <?php $text_count = is_array($sub_data) ? $sub_data['textes'] : $sub_data; ?>
                                <section id="<?php echo $part_id . '_' . $sub_id; ?>" class="archives-chapter content-anim preserve-lines">
                                    <h3><?php echo getTranslation("{$part_id}_{$sub_id}_titre", $lang); ?></h3>

                                    <?php for ($i = 1; $i <= $text_count; $i++): ?>
                                        <p><?php echo getTranslation("{$part_id}_{$sub_id}_texte{$i}", $lang); ?></p>
                                    <?php endfor; ?>

                                    <?php if (is_array($sub_data) && isset($sub_data['blockquote'])): ?>
                                        <blockquote class="archives-blockquote">
                                            <p><?php echo getTranslation($sub_data['blockquote']['key'], $lang); ?></p>
                                            <cite><?php echo getTranslation($sub_data['blockquote']['source'], $lang); ?></cite>
                                        </blockquote>
                                    <?php endif; ?>

                                    <?php if (is_array($sub_data) && !empty($sub_data['extra_textes'])): ?>
                                        <?php for ($i = $text_count + 1; $i <= $text_count + $sub_data['extra_textes']; $i++): ?>
                                            <p><?php echo getTranslation("{$part_id}_{$sub_id}_texte{$i}", $lang); ?></p>
                                        <?php endfor; ?>
                                    <?php endif; ?>

                                </section>
                            <?php endforeach; ?>

                            <?php if (isset($part_data['transition_quote'])): ?>
                                <blockquote class="archives-transition-quote content-anim">
                                    <p><?php echo getTranslation($part_data['transition_quote']['key'], $lang); ?></p>
                                    <cite><?php echo getTranslation($part_data['transition_quote']['source'], $lang); ?></cite>
                                </blockquote>
                            <?php endif; ?>

                        </div>

                    <?php endforeach; ?>

                    <section id="conclusion" class="archives-conclusion content-anim preserve-lines">
                        <h2><?php echo getTranslation("conclu_titre", $lang); ?></h2>
                        <?php for ($i = 1; $i <= 3; $i++): ?>
                            <p><?php echo getTranslation("conclu_texte{$i}", $lang); ?></p>
                        <?php endfor; ?>
                    </section>

                </div>
            </section>
        </div>

        <?php include "includes/layout/jsinclude.php"; ?>
        <script src="js/pages/archives.js" defer></script>
        <?php include "includes/components/visionner.php"; ?>
    </body>
    </html>