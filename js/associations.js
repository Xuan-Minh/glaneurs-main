// Ajoute ce code dans main.js, après la déclaration de $header
const $assoScroll = $(".associations-scroll");
if ($assoScroll.length) {
    let lastAssoScroll = 0;
    $assoScroll.on("scroll", function() {
        const currentScroll = $assoScroll.scrollTop();
        if (currentScroll > lastAssoScroll && currentScroll > 200) {
            $header.addClass("hide-header");
        } else if (currentScroll < lastAssoScroll) {
            $header.removeClass("hide-header");
        }
        if (currentScroll < 20) $header.removeClass("hide-header");
        lastAssoScroll = currentScroll;
    });
}