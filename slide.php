<?php
$slides = array(
    array(
        "chapitre" => "Les glaneurs de carton", 
        "sous-titre" => "Voir le documentaire en entier",
        "srcvideobg" => "video/pluie.mp4",
        "srcaudio" => "audio/intro.mp3",
        "srcdocupart" => "video/intro.mp4",
        "info" => "",
        "urlsuite" => ""
    ),
    array(
        "chapitre" => "Ville",
        "srcvideobg" => "video/ville.mp4",
        "srcaudio" => "audio/pluie.mp3",
        "srcdocupart" => "video/pluie.mp4",
        "info" => "Glaneurs de carton est un film documentaire...",
        "urlsuite" => ""
        
    ),
    array(
        "chapitre" => "Chapitre 2",
        "srcvideobg" => "video/pont.mp4",
        "srcaudio" => "audio/pont.mp3",
        "srcdocupart" => "video/pont.mp4",
        "info" => "Consectetur adipiscing elit...",
        "urlsuite" => ""
    ),
    array(
        "chapitre" => "Chapitre 3",
        "srcvideobg" => "video/soleil.mp4",
        "srcaudio" => "audio/slide3.mp3",
        "srcdocupart" => "video/soleil.mp4",
        "info" => "Sed do eiusmod tempor incididunt...",
        "urlsuite" => ""
    )
);
$index = 1;
$isFirst = true; // Ajoute une variable pour vérifier si c'est le premier élément
foreach ($slides as $slide) {
    echo '<div class="slides slide' . $index . '">';
    echo '<video autoplay muted loop>';
    echo '<source src="' . $slide["srcvideobg"] . '" type="video/mp4" />';
    echo '</video>';

    // Condition pour le premier slide
    if ($isFirst) {
        // Affiche le visionner, mais pas les sliderButtons, et le h2 est cliquable
        echo '<div class="visionner">';
        echo '<div class="close-visionner">X</div>';
        echo '<video autoplay controls>';
        echo '<source src="' . $slide["srcdocupart"] . '" type="video/mp4" />';
        echo '</video>';
        echo '</div>';
        echo '<h1>' . $slide["chapitre"] . '</h1>';
        echo '<h3 class="visionner-trigger-h3">' . $slide["sous-titre"] . '</h3>';
    } else {
        // Affiche le visionner, les sliderButtons, et le h2 est cliquable
        echo '<div class="visionner">';
        echo '<div class="close-visionner">X</div>';
        echo '<video autoplay controls>';
        echo '<source src="' . $slide["srcdocupart"] . '" type="video/mp4" />';
        echo '</video>';
        echo '</div>';
        echo '<h2 class="visionner-trigger">' . $slide["chapitre"] . '</h2>';
        echo '<h3 class="visionner-trigger-h3">' . $slide["sous-titre"] . '</h3>';
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
    $isFirst = false; // Met à jour la variable après le premier élément
}
?>
