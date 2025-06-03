$(function () {
  const $header = $("header");
  const $archivesScroll = $(".archives-scroll");
  if ($archivesScroll.length) {
    let lastScroll = 0;
    $archivesScroll.on("scroll", function () {
      const currentScroll = $archivesScroll.scrollTop();
      if (currentScroll > lastScroll && currentScroll > 200) {
        $header.addClass("hide-header");
      } else if (currentScroll < lastScroll) {
        $header.removeClass("hide-header");
      }
      if (currentScroll < 20) $header.removeClass("hide-header");
      lastScroll = currentScroll;
    });
  }
});

