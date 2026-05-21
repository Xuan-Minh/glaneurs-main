<?php

$index = 1;
$isFirst = true;
foreach ($slides as $slide) {
    $extraClass = '';
    if ($index === 2) $extraClass = ' slide2';
    if ($index === 3) $extraClass = ' slide3';
    echo '<div class="slides slide' . $index . $extraClass . '">';


    $preload_attr = $isFirst ? 'auto' : 'metadata';
    echo '<video class="background-video" 
                   preload="' . $preload_attr . '" 
                   muted loop playsinline autoplay
                   poster="' . htmlspecialchars($slide['poster']) . '">';
    echo '<source src="' . htmlspecialchars($slide["srcvideobg"]) . '" type="video/mp4" />';
    echo '</video>';

    $vimeoId = substr($slide["srcdocupart"], strrpos($slide["srcdocupart"], '/') + 1);
    if ($index === 1) {
        echo '<div class="visionner">';
        echo '<div class="close-visionner"></div>';
        echo '</div>';
        echo '<h1 data-chapitre="' . $slide["chapitre"] . '" ' . ($lang == 'en' ? 'title="Cardboard gleaners"' : '') . '>' . getTranslation("index_titre", "fr") . '</h1>';
        echo '<div class="index-soustitre" data-chapitre="' . $slide["chapitre"] . '" ' . ($lang == 'en' ? 'title="Cardboard gleaners"' : '') . '>' . getTranslation("index_titre","ko") . '</div>';
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
        $timecode_attr = isset($slide["timecode"]) ? ' data-timecode="' . htmlspecialchars($slide["timecode"]) . '"' : '';
        echo '<h2 data-vimeo="' . $vimeoId . '" data-lang="' . $lang . '"' . $author_attr . $timecode_attr . '>' . $slide["chapitre"] . '</h2>';
        echo '<button type="button" class="visionner-trigger visionner-trigger-h3" data-vimeo="' . $vimeoId . '" data-lang="' . $lang . '"' . $timecode_attr . ' style="margin-top:30px;display:inline-block;">' . getTranslation("index_voirpartie". ($index-1), $lang) . '</button>';
        echo '<div class="sliderButton">';
        echo '<div class="point1 full"></div>';
        echo '<div class="point2 empty"></div>';
        echo '</div>';
        echo '<div class="info preserve-lines" tabindex="0">';
        echo '<div class="info-content">' . $slide["info"] . '</div>';
        if (isset($slide["info_button_text"]) && isset($slide["info_button_link"])) {
            echo '<div class="info-actions">';
            echo '<a href="' . htmlspecialchars($slide["info_button_link"], ENT_QUOTES, 'UTF-8') . '" class="info-button transition-link"><span>' . htmlspecialchars($slide["info_button_text"], ENT_QUOTES, 'UTF-8') . '</span></a>';
            echo '</div>';
        }
        echo '</div>';
    }

    echo '</div>';

    $index += 1;
    $isFirst = false;
}
?>
