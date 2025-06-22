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

    // NOUVELLE REQUÊTE OPTIMISÉE (1 seule requête au lieu de N+1)
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

    <title><?php echo getTranslation('derriereledocumentaire_titre', $lang); ?></title>
</head>

<body>
    <audio id="audio-arirang" src="audio/ambiancedld.mp3" loop preload="auto"></audio>
    <?php include "includes/header.php"; ?>

    <section class="dld-hero">
        <video autoplay muted loop>
            <source src="video/ville.mov" type="video/mp4">
        </video>
        <div class="dld-title content-anim">
            <h2><?php echo getTranslation('derriereledocumentaire_titre', $lang); ?></h2>
        </div>
    </section>
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
                $nom_col = 'nom_' . $lang;
                echo htmlspecialchars($membre[$nom_col] ?? $membre['nom_fr']);
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

    <section class="dld-remerciements content-anim preserve-lines">
        <h2><?php echo getTranslation("remerciements_titre", $lang); ?></h2>
        <p>
            <?php echo getTranslation("derriereledocumentaire_messagemerci", $lang); ?></p>
    </section>       
    <section class="dld-remerciements content-anim">
        <h2><?php echo getTranslation('derriereledocumentaire_collaborationtitre', $lang); ?></h2>
        <p>
            <?php echo getTranslation('derriereledocumentaire_collaboration', $lang); ?>
        </p>
    </section>
    <section class="dld-remerciements content-anim">
         <h2><?php echo getTranslation('derriereledocumentaire_soutienstitre' , $lang); ?></h2>
         <p class="preserve-lines">
            <?php echo getTranslation('derriereledocumentaire_soutiens', $lang); ?>
         </p><p class="supporters-list">
            <?php
                // On récupère tous les soutiens depuis la BDD, triés par ordre alphabétique
                $supporters = $pdo->query("SELECT name FROM supporters ORDER BY name ASC")->fetchAll(PDO::FETCH_COLUMN);
                // On les affiche, séparés par une virgule et un espace
                echo implode(', ', $supporters);
            ?>
         </p>
    </section>
    <?php include "includes/jsinclude.php"; ?>
    <script src="js/derriereledocumentaire.js"></script>
</body>

</html>