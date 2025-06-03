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
        "srcvideobg" => "video/ville.mov",
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
    echo '<video autoplay muted loop>';
    echo '<source src="' . $slide["srcvideobg"] . '" type="video/mp4" />';
    echo '</video>';

    if ($isFirst) {
        echo '<div class="visionner">';
        echo '<div class="close-visionner"></div>';
        echo '<iframe src="https://player.vimeo.com/video/' . substr($slide["srcdocupart"], strrpos($slide["srcdocupart"], '/') + 1) . '?texttrack=' . $lang . '" width="1280" height="720" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
        echo '</div>';
        echo '<h1 data-chapitre="' . $slide["chapitre"] . '">' . $slide["chapitre"] . '</h1>';
        echo '<a class="visionner-trigger visionner-trigger-h3">' . getTranslation("index_docufull", $lang) . '</a>';
    } else {
        echo '<div class="visionner">';
        echo '<div class="close-visionner"></div>';
        echo '<iframe src="https://player.vimeo.com/video/' . substr($slide["srcdocupart"], strrpos($slide["srcdocupart"], '/') + 1) . '?texttrack=' . $lang . '" width="1280" height="720" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
        echo '</div>';
        echo '<h2 class="visionner-trigger">' . $slide["chapitre"] . '</h2>';
        echo '<div class="sliderButton">';
        echo '<div class="point1 full"></div>';
        echo '<div class="point2 empty"></div>';
        echo '</div>';
    }

    echo '<div class="info">';
    echo '<div>' . $slide["info"] . '</div>';
    echo '</div>';
    echo '</div>';

    $index += 1;
    $isFirst = false;
}
