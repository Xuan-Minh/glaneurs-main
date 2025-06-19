<?php
$slides = array(
    array(
        "chapitre" => getTranslation("index_titre", $lang), // Utilise la fonction de traduction
        "srcvideobg" => "video/chariot.mov",
        "srcaudio" => "audio/chap1.mp3",
        "srcdocupart" => "https://vimeo.com/1082041088", // Remplacez XXXXXXXXX par l'ID Vimeo
        "info" => "",
        "urlsuite" => ""
    ),
    array(
        "chapitre" => getTranslation("index_chapitre1", $lang),
        "srcvideobg" => "video/cartons.mov",
        "srcaudio" => "audio/chap1.mp3",
        "srcdocupart" => "https://vimeo.com/1082041088", // Remplacez XXXXXXXXX par l'ID Vimeo
        "info" => "Glaneurs de carton est un film documentaire...",
        "urlsuite" => ""
    ),
    array(
        "chapitre" => getTranslation("index_chapitre2", $lang),
        "srcvideobg" => "video/bache.mov",
        "srcaudio" => "audio/chap2.mp3",
        "srcdocupart" => "https://vimeo.com/1082041088", // Remplacez XXXXXXXXX par l'ID Vimeo
        "info" => "Consectetur adipiscing elit...",
        "urlsuite" => ""
    ),
    array(
        "chapitre" => getTranslation("index_chapitre3", $lang),
        "srcvideobg" => "video/lee.mov",
        "srcaudio" => "audio/chap3.mp3",
        "srcdocupart" => "https://vimeo.com/1082041088", // Remplacez XXXXXXXXX par l'ID Vimeo
        "info" => "Sed do eiusmod tempor incididunt...",
        "urlsuite" => ""
    )
);
$index = 1;
$isFirst = true;
foreach ($slides as $slide) {
    echo '<div class="slides slide' . $index . '">';
    echo '<video autoplay muted loop playsinline>';
    echo '<source src="' . $slide["srcvideobg"] . '" type="video/mp4" />';
    echo '</video>';

    $vimeoId = substr($slide["srcdocupart"], strrpos($slide["srcdocupart"], '/') + 1);

    // Slide 1 (index 1) : structure inchangée
    if ($index === 1) {
        echo '<div class="visionner">';
        echo '<div class="close-visionner"></div>';
        echo '</div>';
        echo '<h1 data-chapitre="' . $slide["chapitre"] . '">' . $slide["chapitre"] . '</h1>';
        echo '<a class="visionner-trigger visionner-trigger-h3" data-vimeo="' . $vimeoId . '" data-lang="' . $lang . '">' . getTranslation("index_docufull", $lang) . '</a>';
    }

    // Slides 2, 3, 4 : bouton "voir la partie X"
    if ($index === 2 || $index === 3 || $index === 4) {
        echo '<div class="visionner">';
        echo '<div class="close-visionner"></div>';
        echo '<iframe src="https://player.vimeo.com/video/' . $vimeoId . '?texttrack=' . $lang . '" width="1280" height="720" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
        echo '</div>';
        echo '<h2 class="visionner-trigger" data-vimeo="' . $vimeoId . '" data-lang="' . $lang . '">' . $slide["chapitre"] . '</h2>';
        // Bouton "voir la partie X" sous le titre
        echo '<a class="visionner-trigger visionner-trigger-h3" data-vimeo="' . $vimeoId . '" data-lang="' . $lang . '" style="margin-top:30px;display:inline-block;">' . getTranslation("index_voirpartie". ($index-1), $lang) . '</a>';
        echo '<div class="sliderButton">';
        echo '<div class="point1 full"></div>';
        echo '<div class="point2 empty"></div>';
        echo '</div>';
    }

    echo '<div class="info">' . $slide["info"] . '</div>';

    echo '</div>';

    $index += 1;
    $isFirst = false;
}
