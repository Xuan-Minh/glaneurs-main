<?php
$slides = array(
    array(
        "chapitre" => "Chapitre 1",
        "srcvideobg" => "video/pluie.mp4",
        "srcaudio" => "audio/pluie.mp3",
        "srcdocupart" => "video/pluie.mp4",
        "info" => "Glaneurs de carton est un film documentaire..."
    ),
    array(
        "chapitre" => "Chapitre 2",
        "srcvideobg" => "video/pont.mp4",
        "srcaudio" => "audio/pont.mp3",
        "srcdocupart" => "video/pont.mp4",
        "info" => "Consectetur adipiscing elit..."
    ),
    array(
        "chapitre" => "Chapitre 3",
        "srcvideobg" => "video/soleil.mp4",
        "srcaudio" => "audio/slide3.mp3",
        "srcdocupart" => "video/soleil.mp4",
        "info" => "Sed do eiusmod tempor incididunt..."
    )
);
$index = 1;
foreach ($slides as $slide) {
 
    echo '<div class="slides slide' . $index . '">
            
                <video autoplay muted loop>
                    <source src="' . $slide["srcvideobg"] . '" type="video/mp4" />
                </video>
                  <div class="visionner">
                  <div class="close-visionner">X</div>
                  <video autoplay controls>
                     <source src="' . $slide["srcdocupart"] . '" type="video/mp4" />
                  </video>
                    
                    </div>   
              
         
            <h2>' . $slide["chapitre"] . '</h2>
            <div class="sliderButton">
                <div class="point1 full"></div>
                <div class="point2 empty"></div>
            </div>
            <div class="info" . >
                <div>' . $slide["info"] . '</div>
            </div>
        </div>';
        
        $index += 1;
        //test
}
?>
