<div class="loading-screen">
    <video autoplay muted loop>
        <source src="video/eaulow.mp4" type="video/mp4">
        Your browser does not support HTML5 video.
    </video>
    <div class="loading-items">
        <div class="loading-item" id="loading-item1">
            <div class="loading-content def"><?php echo getTranslation("loading_def_titre", $lang) ?></div>
            <div id="definition-text" class="loading-content def-texte" data-definition="<?php echo getTranslation("loading_def_texte", $lang) ?>"></div>
        </div>
        <div class="loading-item" id="loading-item2">
            <div class="loading-content loading-titre"><?php echo getTranslation("index_titre", $lang) ?></div>
        </div>
        <div class="loading-item" id="loading-item3">
            <div class="loading-content loading-text"><?php echo getTranslation("loading_production", $lang) ?>
                <div class="universites">
                    <img src="img/de_white.svg" alt="Dong Eui University">
                    <img src="img/uge_white.svg" alt="Université Gustave Eiffel">
                    <!-- <img src="img/cmw.png" alt="CMW"> -->
                </div>
            </div>
        </div>
        <div class="loading-item" id="loading-item4">

            <div class="">
                <img src="img/headphones-4-64.png" alt="Casque">
            </div>
           <div class="loading-content">

                <?php echo getTranslation("loading_casque_message", $lang) ?>
            </div>
            <div class="loading-button"><button id="enter-button"><span>Entrer</span></button></div>
        </div>
    </div>
</div>