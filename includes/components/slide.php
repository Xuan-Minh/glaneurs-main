<?php

$index = 1;
$isFirst = true;
foreach ($slides as $slide) {
    $extraClass = '';
    if ($index === 2) $extraClass = ' slide2';
    if ($index === 3) $extraClass = ' slide3';
    echo '<div class="slides slide' . $index . $extraClass . '">';

    // --- DÉBUT DE LA MODIFICATION ---
    // On remplace l'ancienne génération de la vidéo par celle-ci.
    // Elle utilise la variable $isFirst (que vous aviez déjà) pour la logique de 'preload'
    // et ajoute l'attribut 'poster' que vous avez défini dans index.php.
    $preload_attr = $isFirst ? 'auto' : 'metadata';
    echo '<video class="background-video" 
                   preload="' . $preload_attr . '" 
                   muted loop playsinline autoplay
                   poster="' . htmlspecialchars($slide['poster']) . '">';
    echo '<source src="' . htmlspecialchars($slide["srcvideobg"]) . '" type="video/mp4" />';
    echo '</video>';
    // --- FIN DE LA MODIFICATION ---

    $vimeoId = substr($slide["srcdocupart"], strrpos($slide["srcdocupart"], '/') + 1);

    // Le reste de votre logique pour les slides reste identique...
    if ($index === 1) {
        echo '<div class="visionner">';
        echo '<div class="close-visionner"></div>';
        echo '</div>';
        echo '<h1 data-chapitre="' . $slide["chapitre"] . '">' . $slide["chapitre"] . '</h1>';
        echo '<button type="button" class="visionner-trigger visionner-trigger-h3 always-visible" data-vimeo="' . $vimeoId . '" data-lang="' . $lang . '">' . getTranslation("index_docufull", $lang) . '</button>';
    }

    if ($index === 2 || $index === 3 || $index === 4) {
        echo '<div class="visionner">';
        echo '<div class="close-visionner"></div>';
        echo '</div>';
        $author_attr = '';
        if (isset($slide["quote_author"])) {
            $author_attr = ' data-author="— ' . htmlspecialchars($slide["quote_author"]) . '"';
        }
        echo '<h2 data-vimeo="' . $vimeoId . '" data-lang="' . $lang . '"' . $author_attr . '>' . $slide["chapitre"] . '</h2>';
        echo '<button type="button" class="visionner-trigger visionner-trigger-h3" data-vimeo="' . $vimeoId . '" data-lang="' . $lang . '" style="margin-top:30px;display:inline-block;">' . getTranslation("index_voirpartie". ($index-1), $lang) . '</button>';
        echo '<div class="sliderButton">';
        echo '<div class="point1 full"></div>';
        echo '<div class="point2 empty"></div>';
        echo '</div>';
        echo '<div class="info preserve-lines">'; ;
        echo $slide["info"];
        if (isset($slide["info_button_text"]) && isset($slide["info_button_link"])) {
            echo '<a href="' . $slide["info_button_link"] . '" class="info-button transition-link"><span>' . $slide["info_button_text"] . '</span></a>';
        }
        echo '</div>';
    }

    echo '</div>';

    $index += 1;
    $isFirst = false;
}
?>
