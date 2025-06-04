<?php include 'includes/lang.php'; // Inclut le fichier pour gérer la langue
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>" <?php if ($lang == 'kr') echo ' class="kr-lang"'; ?>>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include "includes/css.php"; ?>
    <link rel="stylesheet" href="css/derriereledocumentaire.css">
    <?php $pdo = getPDO();

    // Récupère tous les membres
    $members = $pdo->query("SELECT * FROM team_members")->fetchAll(PDO::FETCH_ASSOC);

    // Pour chaque membre, récupère ses rôles (clé de traduction)
    foreach ($members as &$member) {
        $stmt = $pdo->prepare("SELECT key_name FROM team_roles WHERE member_id = ?");
        $stmt->execute([$member['id']]);
        $member['roles'] = $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
    unset($member);
    ?>

    <title><?php echo getTranslation('derriereledocumentaire_titre', $lang); ?></title>
</head>

<body>
    <?php include "includes/header.php"; ?>

    <section class="dld-hero">
        <video autoplay muted loop>
            <source src="video/ville.mov" type="video/mp4">
        </video>
        <div class="dld-title content-anim">
            <h2><?php echo getTranslation('derriereledocumentaire_titre', $lang); ?></h2>
        </div>
    </section>
    <div class="page-intro content-anim">
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
                        $nom_col = 'nom_' . $lang;
                        echo htmlspecialchars($membre[$nom_col] ?? $membre['nom_fr']);
                        ?>
                    </div>
                    <div class="team-role">
                        <?php foreach ($membre['roles'] as $roleKey): ?>
                            <div><?php echo htmlspecialchars(getTranslation($roleKey, $lang)); ?></div>
                        <?php endforeach; ?>
                    </div>
                    <?php if (!empty($membre['portfolio'])): ?>
                        <a href="<?php echo htmlspecialchars($membre['portfolio']); ?>" class="team-portfolio" target="_blank">
                            <?php echo getTranslation('portfolio', $lang); ?>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <section class="dld-remerciements content-anim">
        <h2><?php echo getTranslation("remerciements_titre", $lang); ?></h2>
        <p>
            <?php echo getTranslation("derriereledocumentaire_messagemerci", $lang); ?>
            <?php echo getTranslation('derriereledocumentaire_remerciements', $lang); ?>

        </p>
    </section>
    <?php include "includes/jsinclude.php"; ?>
    <script src="js/derriereledocumentaire.js"></script>
</body>

</html>