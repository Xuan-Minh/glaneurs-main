
<!-- CSS critiques : synchrones pour bloquer le rendu le moins possible -->
<link rel="stylesheet" href="css/font.css" type="text/css" />
<link rel="stylesheet" href="css/typography.css" type="text/css" />
<link rel="stylesheet" href="css/main.css">

<!-- CSS non-critiques : chargement asynchrone -->
<link rel="preload" href="css/navbar.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="css/navbar.css" type="text/css"></noscript>
<link rel="preload" href="css/visionner.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="css/visionner.css" type="text/css"></noscript>

<!-- Preload des polices critiques (WOFF2) -->
<link rel="preload" href="font/Libre_Baskerville/LibreBaskerville-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="font/Figtree/Figtree-VariableFont_wght.woff2" as="font" type="font/woff2" crossorigin>
<?php if (isset($lang) && $lang === 'ko'): ?>
<!-- Preload NotoSansKR en version coréenne : casse la chaîne HTML→font.css→police -->
<link rel="preload" href="font/NotoSansKR/NotoSansKR-Light.woff2" as="font" type="font/woff2" crossorigin>
<?php endif; ?>
<link rel="icon" href="img/favicon.png" type="image/png" />
