<div class="loading-screen">
    <!-- NOUVEAU : Un conteneur dédié pour le poster -->
    <div class="loading-poster" style="background-image: url('img/posters/eaulow_poster.png');"></div>
    <video id="loading-bg-video" preload="auto" autoplay muted loop playsinline webkit-playsinline>
        <source src="video/web/eaulow.mp4" type="video/mp4">
        Your browser does not support HTML5 video.
    </video>
    <div class="loading-items">
        <div class="loading-item" id="loading-item1">
            <div class="loading-content def"><?php echo getTranslation("loading_def_titre", $lang) ?></div>
            <div class="loading-content def-texte definition-text" data-definition="<?php echo getTranslation("loading_def_texte", $lang) ?>"></div>
            <div class="loading-content def-texte definition-text" data-definition="<?php echo getTranslation("loading_def_texte2", $lang) ?>"></div>
        </div>
        <div class="loading-item" id="loading-item2">
            <div class="loading-content loading-titre"><?php echo getTranslation("index_titre", "fr") ?></div>
            <div class="loading-content loading-soustitre"><?php echo getTranslation("index_titre", "ko") ?></div>
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
           <div class="loading-content">

                <?php echo getTranslation("loading_casque_message", $lang) ?>
            </div>
            <?php if (defined('WIP_MODE') && WIP_MODE): ?>
            <div class="loading-button"><button id="enter-button" class="wip" disabled><span>À venir ...</span></button></div>
            <?php else: ?>
            <div class="loading-button"><button id="enter-button"><span><?php echo getTranslation("loading_enter_button", $lang); ?></span></button></div>
            <?php endif; ?>
        </div>
    </div>
    
    <?php if (defined('WIP_MODE') && WIP_MODE): ?>
    <!-- Mode WIP: Accès admin par 3 clics sur le bouton ou 3x Esc -->
    <script>
        (function() {
            let clickCount = 0;
            let escCount = 0;
            let clickTimeout = null;
            let escTimeout = null;
            
            // Méthode 1: 3 clics rapides sur le bouton
            const enterButton = document.getElementById('enter-button');
            if (enterButton) {
                enterButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    clickCount++;
                    
                    // Reset le compteur après 1 seconde
                    clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(() => { clickCount = 0; }, 1000);
                    
                    if (clickCount === 3) {
                        skipWIPLoading();
                        clickCount = 0;
                    }
                });
            }
            
            // Méthode 2: 3x Esc rapidement
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' || e.key === 'Esc') {
                    escCount++;
                    
                    clearTimeout(escTimeout);
                    escTimeout = setTimeout(() => { escCount = 0; }, 1000);
                    
                    if (escCount === 3) {
                        skipWIPLoading();
                        escCount = 0;
                    }
                }
            });
            
            function skipWIPLoading() {
                const loadingScreen = document.querySelector('.loading-screen');
                const container = document.querySelector('.container');
                const overlay = document.getElementById('transition-overlay');
                
                if (!loadingScreen || !container) return;
                
                console.log('✓ Mode WIP contourné - accès au site');
                
                // Applique la même animation que le bouton "Entrer" normal
                clearInterval(window.intervalId || 0);
                
                if (overlay) {
                    overlay.classList.remove('hide');
                    overlay.classList.add('active');
                }
                
                setTimeout(function() {
                    loadingScreen.remove();
                    container.classList.remove('hidden');
                    container.style.display = 'block';
                    
                    if (overlay) {
                        overlay.classList.add('hide');
                    }
                }, 750);
            }
        })();
    </script>
    <?php endif; ?>
</div>
