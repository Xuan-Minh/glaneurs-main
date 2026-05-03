
<!-- @font-face inlinés : élimine une requête réseau render-blocking -->
<style>
@font-face {
  font-family: "Figtree";
  src: url("/font/Figtree/Figtree-VariableFont_wght.woff2") format("woff2"),
       url("/font/Figtree/Figtree-VariableFont_wght.ttf") format("truetype");
  font-display: swap;
}
@font-face {
  font-family: "Libre Baskerville";
  src: url("/font/Libre_Baskerville/LibreBaskerville-Regular.woff2") format("woff2"),
       url("/font/Libre_Baskerville/LibreBaskerville-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Libre Baskerville";
  src: url("/font/Libre_Baskerville/LibreBaskerville-Italic.woff2") format("woff2"),
       url("/font/Libre_Baskerville/LibreBaskerville-Italic.ttf") format("truetype");
  font-weight: normal;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: "Libre Baskerville";
  src: url("/font/Libre_Baskerville/LibreBaskerville-Bold.woff2") format("woff2"),
       url("/font/Libre_Baskerville/LibreBaskerville-Bold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Noto Sans KR";
  src: url("/font/NotoSansKR/NotoSansKR-Light.woff2") format("woff2"),
       url("/font/NotoSansKR/NotoSansKR-Light.ttf") format("truetype");
  font-weight: 300;
  font-style: normal;
  font-display: optional;
}
@font-face {
  font-family: "Noto Sans KR";
  src: url("/font/NotoSansKR/NotoSansKR-Medium.woff2") format("woff2"),
       url("/font/NotoSansKR/NotoSansKR-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
  font-display: optional;
}
@font-face {
  font-family: "Noto Sans KR";
  src: url("/font/NotoSansKR/NotoSansKR-Bold.woff2") format("woff2"),
       url("/font/NotoSansKR/NotoSansKR-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: optional;
}
</style>

<!-- CSS critiques : synchrones pour bloquer le rendu le moins possible -->
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
