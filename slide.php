<?php
$slides = array(
    array(
        "chapitre" => "Les glaneurs de carton", 
        "krversion" => "폐지 줍는 사람들",
        "sous-titre" => "Voir le documentaire en entier",
        "srcvideobg" => "video/chariot.mov",
        "srcaudio" => "audio/chap1.mp3",
        "srcdocupart" => "https://vimeo.com/1082041088", // Remplacez XXXXXXXXX par l'ID Vimeo
        "info" => "",
        "urlsuite" => ""
    ),
    array(
        "chapitre" => "Chapitre 1",
        "srcvideobg" => "video/ville.mov",
        "srcaudio" => "audio/chap1.mp3",
        "srcdocupart" => "https://vimeo.com/76979871", // Remplacez XXXXXXXXX par l'ID Vimeo
        "info" => "Glaneurs de carton est un film documentaire...",
        "urlsuite" => ""
    ),
    array(
        "chapitre" => "Chapitre 2",
        "srcvideobg" => "video/bache.mov",
        "srcaudio" => "audio/chap2.mp3",
        "srcdocupart" => "https://vimeo.com/76979871", // Remplacez XXXXXXXXX par l'ID Vimeo
        "info" => "Consectetur adipiscing elit...",
        "urlsuite" => ""
    ),
    array(
        "chapitre" => "Chapitre 3",
        "srcvideobg" => "video/lee.mov",
        "srcaudio" => "audio/chap3.mp3",
        "srcdocupart" => "https://vimeo.com/76979871", // Remplacez XXXXXXXXX par l'ID Vimeo
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
        echo '<div class="close-visionner">X</div>';
        echo '<iframe src="https://player.vimeo.com/video/' . substr($slide["srcdocupart"], strrpos($slide["srcdocupart"], '/') + 1) . '?texttrack=en" width="1280" height="720" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
        echo '</div>';
        echo '<h1 data-krversion="' . $slide["krversion"] . '" data-chapitre="' . $slide["chapitre"] . '">' . $slide["chapitre"] . '</h1>';
        echo '<h3 class="visionner-trigger visionner-trigger-h3">Voir le documentaire en entier</h3>';
    } else {
        echo '<div class="visionner">';
        echo '<div class="close-visionner">X</div>';
        echo '<iframe src="https://player.vimeo.com/video/' . substr($slide["srcdocupart"], strrpos($slide["srcdocupart"], '/') + 1) . '?texttrack=en" width="1280" height="720" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
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
?>
