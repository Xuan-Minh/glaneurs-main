

<?php
session_start(['cache_limiter' => '']);

if (!defined('MAX_TRANSLATION_PARAGRAPHS')) {
    define('MAX_TRANSLATION_PARAGRAPHS', 20);
}


// --- GESTION SÉCURISÉE DE LA LANGUE ---
$allowedLangs = ['fr', 'en', 'ko'];
if (isset($_GET['lang']) && in_array($_GET['lang'], $allowedLangs, true)) {
    $lang = $_GET['lang'];
    $_SESSION['lang'] = $lang;
} elseif (isset($_SESSION['lang']) && in_array($_SESSION['lang'], $allowedLangs, true)) {
    $lang = $_SESSION['lang'];
} else {
    $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
    if (!in_array($lang, $allowedLangs, true)) {
        $lang = 'fr';
    }
    $_SESSION['lang'] = $lang;
}
// $lang est maintenant toujours 'fr', 'en' ou 'ko'.

// Connexion PDO centralisée
function getPDO()
{
    static $pdo = null;
    if ($pdo === null) {
        // --- MÉTHODE FINALE : FICHIER DE CONFIGURATION ---

        // 1. Définir les valeurs par défaut pour le développement local (MAMP)
        $servername = 'localhost';
        $database   = 'glaneurs';
        $username   = 'root';
        $password   = 'root';

        // 2. Vérifier si un fichier de configuration de production existe
        $configFile = __DIR__ . '/config.php';
        if (file_exists($configFile)) {
            // Si oui (on est sur le serveur de prod), on charge ses valeurs
            require_once $configFile;
            $servername = $db_config['host'];
            $database   = $db_config['name'];
            $username   = $db_config['user'];
            $password   = $db_config['pass'];
        }

        // 3. Tenter la connexion avec les bonnes valeurs
        $options = [
            PDO::MYSQL_ATTR_LOCAL_INFILE => true,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ];
        $dsn = "mysql:host=$servername;dbname=$database;charset=utf8";
        try {
            $pdo = new PDO($dsn, $username, $password, $options);
        } catch (PDOException $error) {
            die('Erreur de connexion : ' . $error->getMessage()); // Gardez ceci pour le dernier test
        }
    }
    return $pdo;
}


/**
 * Encode le texte puis réactive un sous-ensemble très limité de balises inline.
 * Balises autorisées: <strong>/<b>, <em>/<i>, <br>.
 */
function formatRichText(?string $text, bool $convertLineBreaks = false): string
{
    $safe = htmlspecialchars((string)$text, ENT_QUOTES, 'UTF-8');

    $allowedInlineTags = [
        '&lt;strong&gt;'  => '<strong>',
        '&lt;/strong&gt;' => '</strong>',
        '&lt;b&gt;'       => '<strong>',
        '&lt;/b&gt;'      => '</strong>',
        '&lt;em&gt;'      => '<em>',
        '&lt;/em&gt;'     => '</em>',
        '&lt;i&gt;'       => '<em>',
        '&lt;/i&gt;'      => '</em>',
        '&lt;br&gt;'      => '<br>',
        '&lt;br/&gt;'     => '<br>',
        '&lt;br /&gt;'    => '<br>',
    ];
    $safe = str_ireplace(array_keys($allowedInlineTags), array_values($allowedInlineTags), $safe);

    if ($convertLineBreaks) {
        $safe = nl2br($safe);
    }

    return $safe;
}


function getTranslationsMap(): array
{
    static $translations = null;
    if ($translations === null) {
        $pdo = getPDO();
        $stmt = $pdo->query("SELECT key_name, fr, en, ko FROM translations");
        $translations = [];
        foreach ($stmt as $row) {
            $translations[$row['key_name']] = $row;
        }
    }

    return $translations;
}


function getRawTranslation(string $key, string $lang = 'fr'): ?string
{
    $translations = getTranslationsMap();

    if (isset($translations[$key][$lang]) && $translations[$key][$lang] !== '') {
        return (string)$translations[$key][$lang];
    }

    if (isset($translations[$key]['fr']) && $translations[$key]['fr'] !== '') {
        return (string)$translations[$key]['fr'];
    }

    if (isset($translations[$key]['en']) && $translations[$key]['en'] !== '') {
        return (string)$translations[$key]['en'];
    }

    return null;
}


// Fonction de traduction
function getTranslation($key, $lang = 'fr')
{
    $raw = getRawTranslation((string)$key, (string)$lang);
    if ($raw !== null) {
        return htmlspecialchars($raw, ENT_QUOTES, 'UTF-8');
    }

    return 'TRADUCTION_MANQUANTE: ' . htmlspecialchars((string)$key, ENT_QUOTES, 'UTF-8');
}


/**
 * Variante "texte enrichi" pour les contenus narratifs.
 * Autorise uniquement gras/italique/retour à la ligne.
 */
function getTranslationRich($key, $lang = 'fr', bool $convertLineBreaks = false)
{
    $raw = getRawTranslation((string)$key, (string)$lang);
    if ($raw !== null) {
        return formatRichText($raw, $convertLineBreaks);
    }

    return 'TRADUCTION_MANQUANTE: ' . htmlspecialchars((string)$key, ENT_QUOTES, 'UTF-8');
}

/**
 * Retourne un contenu narratif possiblement découpé en paragraphes:
 * - essaie key_p1, key_p2, ... tant que les clés existent
 * - sinon, fallback sur key simple
 */
function getTranslationParagraphs($baseKey, $lang = 'fr')
{
    $paragraphs = [];

    for ($i = 1; $i <= MAX_TRANSLATION_PARAGRAPHS; $i++) {
        $raw = getRawTranslation((string)$baseKey . '_p' . $i, (string)$lang);
        if ($raw === null) {
            break;
        }
        $paragraphs[] = '<p>' . formatRichText($raw, false) . '</p>';
    }

    if (!empty($paragraphs)) {
        return implode('', $paragraphs);
    }

    return getTranslationRich($baseKey, $lang, false);
}

/**
 * Retourne les métadonnées d'une image d'archives par son ID.
 * Les données sont chargées en une seule requête et mises en cache.
 */
function getArchive(int $id): ?array
{
    static $allArchives = null;
    if ($allArchives === null) {
        $pdo  = getPDO();
        $stmt = $pdo->query("SELECT id, archives_titre, archives_src, archives_date, archives_auteur FROM archives");
        $allArchives = [];
        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $allArchives[(int)$row['id']] = $row;
        }
    }
    return $allArchives[$id] ?? null;
}
?>
