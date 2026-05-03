<?php include 'includes/lang.php'; 
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" <?php if ($lang == 'ko') echo ' class="ko-lang"'; ?>>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo getTranslation("derriereledocumentaire_titre", $lang) ?> - Les glaneurs de carton</title>
    <meta name="description" content="<?php echo getTranslation('meta_description_equipe', $lang); ?>">
    <link rel="canonical" href="https://glaneursdecarton.mastercmw.com/derriere-le-documentaire.php?lang=<?php echo $lang; ?>" />
    <link rel="alternate" hreflang="fr" href="https://glaneursdecarton.mastercmw.com/derriere-le-documentaire.php?lang=fr" />
    <link rel="alternate" hreflang="en" href="https://glaneursdecarton.mastercmw.com/derriere-le-documentaire.php?lang=en" />
    <link rel="alternate" hreflang="ko" href="https://glaneursdecarton.mastercmw.com/derriere-le-documentaire.php?lang=ko" />
    <?php include "includes/layout/css.php"; ?>
    <link rel="stylesheet" href="css/derriereledocumentaire.css">
   <?php $pdo = getPDO();

    $query = "
        SELECT 
            m.*, 
            GROUP_CONCAT(tr.key_name SEPARATOR ',') AS roles_keys
        FROM 
            team_members m
        LEFT JOIN 
            team_roles tr ON m.id = tr.member_id
        GROUP BY 
            m.id
        ORDER BY
            m.display_order ASC
    ";
    
    $stmt = $pdo->query($query);
    $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Pour chaque membre, on transforme la chaîne de rôles en tableau
    foreach ($members as &$member) {
        if (!empty($member['roles_keys'])) {
            $member['roles'] = explode(',', $member['roles_keys']);
        } else {
            $member['roles'] = [];
        }
    }
    unset($member);
    ?>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "<?php echo addslashes(getTranslation('derriereledocumentaire_titre', $lang)); ?> - Les glaneurs de carton",
      "url": "https://glaneursdecarton.mastercmw.com/derriere-le-documentaire.php?lang=<?php echo $lang; ?>",
      "description": "<?php echo addslashes(getTranslation('meta_description_equipe', $lang)); ?>",
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
            "name": "<?php echo addslashes(getTranslation('derriereledocumentaire_titre', $lang)); ?>",
            "item": "https://glaneursdecarton.mastercmw.com/derriere-le-documentaire.php?lang=<?php echo $lang; ?>"
          }
        ]
      }
    }
    </script>
</head>

<body>
    <audio id="audio-bgm" src="audio/ambiancedld.mp3" loop preload="auto"></audio>
    <?php include "includes/layout/header.php"; ?>

    <?php include 'includes/components/hero.php'; renderHero('video/web/ville.mp4', 'img/posters/ville_poster.webp', getTranslation('derriereledocumentaire_titre', $lang), 'dld-hero', $lang); ?>
    <div class="page-intro dld-presentation content-anim">

        <h2><?php echo getTranslation('derriereledocumentaire_approche', $lang); ?></h2>
        <p>
            <?php echo getTranslation('derriereledocumentaire_intro', $lang); ?>
        </p>
    </div>
    <div class="team-grid content-anim">
        <?php foreach ($members as $i => $membre): ?>
    <div class="team-member show-photo" data-index="<?php echo $i; ?>">
        <div class="team-face team-photo" style="background-image: url('<?php echo htmlspecialchars($membre['image']); ?>');"></div>
        <div class="team-face team-info">
            <div class="team-name">
                <?php
                // Détermine dynamiquement la colonne du nom selon la langue, avec fallback
                $nom_col = 'nom_' . $lang;
                if (!empty($membre[$nom_col])) {
                    echo htmlspecialchars($membre[$nom_col]);
                } elseif (!empty($membre['nom_fr'])) {
                    echo htmlspecialchars($membre['nom_fr']);
                } elseif (!empty($membre['nom_en'])) {
                    echo htmlspecialchars($membre['nom_en']);
                } else {
                    // Dernier recours : affiche n'importe quelle colonne nom existante
                    foreach ($membre as $key => $val) {
                        if (strpos($key, 'nom_') === 0 && !empty($val)) {
                            echo htmlspecialchars($val);
                            break;
                        }
                    }
                }
                ?>
            </div>
            <div class="team-role">
                <?php foreach ($membre['roles'] as $roleKey): ?>
                    <div><?php echo htmlspecialchars(getTranslation($roleKey, $lang)); ?></div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php if (!empty($membre['portfolio'])): ?>
            <a href="<?php echo htmlspecialchars($membre['portfolio']); ?>" class="team-portfolio" target="_blank">
                <?php echo getTranslation('portfolio', $lang); ?>
            </a>
        <?php endif; ?>
    </div>
<?php endforeach; ?>
    </div>

    <section class="dld-remerciements content-anim">
        <h2><?php echo getTranslation("remerciements_titre", $lang); ?></h2>
        <p class="styled-paragraph">
            <?php echo getTranslation("derriereledocumentaire_messagemerci_p1", $lang); ?>
        </p>
        <p class="styled-paragraph">
            <?php echo getTranslation("derriereledocumentaire_messagemerci_p2", $lang); ?>
        </p>
        <p class="styled-paragraph">
            <?php echo getTranslation("derriereledocumentaire_messagemerci_p3", $lang); ?>
        </p>
        <p class="styled-paragraph">
            <?php echo getTranslation("derriereledocumentaire_messagemerci_p4", $lang); ?>
        </p>
        <p class="styled-paragraph">
            <?php echo getTranslation("derriereledocumentaire_messagemerci_p5", $lang); ?>
        </p>
    </section>       
    <section class="dld-remerciements content-anim">
        <h2><?php echo getTranslation('derriereledocumentaire_collaborationtitre', $lang); ?></h2>
        <p class="styled-paragraph"> 
            <?php echo getTranslation('derriereledocumentaire_collaboration', $lang); ?>
        </p>
    </section>
    <section class="dld-remerciements content-anim">
         <h2><?php echo getTranslation('derriereledocumentaire_soutienstitre' , $lang); ?></h2>
        <p class="styled-paragraph">
            <?php echo getTranslation('derriereledocumentaire_soutiens', $lang); ?>
        </p>
        <p class="styled-paragraph">
            <?php echo getTranslation("derriereledocumentaire_soutiens2", $lang); ?>
        </p>
        <p class="supporters-list" id="last-paragraph">
            <?php
                $supporters = $pdo->query("SELECT name FROM supporters ORDER BY name ASC")->fetchAll(PDO::FETCH_COLUMN);
                echo implode(', ', $supporters);
            ?>
        </p>
    </section>
    <?php include "includes/layout/jsinclude.php"; ?>
    <script src="js/pages/derriereledocumentaire.js"></script>
</body>

</html>