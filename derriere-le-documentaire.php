
<!DOCTYPE html>
<html lang="en">
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
    <div class="page-intro">
    <h2><?php echo getTranslation('derriereledocumentaire_titre', $lang); ?></h2>
    <p>
        <?php echo getTranslation('derriereledocumentaire_intro', $lang); ?>
    </p>
</div>
 <div class="team-grid">
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

<?php include "includes/jsinclude.php"; ?>
</body>
</html>