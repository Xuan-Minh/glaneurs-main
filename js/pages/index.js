$(document).ready(function () {
  const e = document.querySelector(".loading-screen"),
    t = document.getElementById("loading-bg-video");
  (e &&
    t &&
    t.addEventListener(
      "canplaythrough",
      function () {
        e.classList.add("loaded");
      },
      { once: !0 },
    ),
    $(".definition-text").each(function () {
      const e = $(this).data("definition");
      $(this).text(e);
    }),
    0 === $(".loading-screen").length &&
      ($(".container").removeClass("hidden"),
      $(document).one("click.startAudio keydown.startAudio", function () {
        const e = document.getElementById("audio-bgm");
        if (e && e.paused && 0 === $(".visionner:visible").length) {
          try {
            if (
              "function" == typeof window.initSiteAudio &&
              "true" !== localStorage.getItem("audioHasBeenInitialized")
            )
              return void window.initSiteAudio();
          } catch (e) {}
          playBgmAudio();
        }
      })),
    initIndexAutoCloseNonActiveSlides(),
    initIndexWheelAndScrollArrow(),
    updateAllTriggerPointPositions(),
    initIndexInfoAnchorSync());
});
const loadingItems = $(".loading-item");
let currentItem = 0;
const totalItems = loadingItems.length,
  fadeDuration = 500,
  displayDuration = 4e3;
let intervalId,
  isAnimating = !1;
function showNextItem() {
  isAnimating ||
    ((isAnimating = !0),
    currentItem < totalItems - 1 &&
      loadingItems.eq(currentItem).removeClass("active"),
    currentItem++,
    currentItem < totalItems - 1
      ? setTimeout(function () {
          (loadingItems.eq(currentItem).addClass("active"), (isAnimating = !1));
        }, 500)
      : currentItem === totalItems - 1
        ? (setTimeout(function () {
            (loadingItems.eq(currentItem).addClass("active"),
              (isAnimating = !1));
          }, 500),
          clearInterval(intervalId))
        : (clearInterval(intervalId), (isAnimating = !1)));
}
(loadingItems.eq(0).addClass("active"),
  (intervalId = setInterval(showNextItem, 4500)),
  $(".loading-screen").click(function () {
    showNextItem();
  }),
  $("#enter-button").click(function (e) {
    if ($(this).hasClass("wip") || $(this).prop("disabled"))
      return void e.preventDefault();
    clearInterval(intervalId);
    const t = $("#transition-overlay");
    (t.removeClass("hide").addClass("active"),
      setTimeout(function () {
        ($(".loading-screen").remove(),
          $(".container").removeClass("hidden"),
          requestAnimationFrame(() => {
            t.addClass("hide");
          }));
      }, 750),
      window.addEventListener("pageshow", function () {
        $("#transition-overlay").addClass("hide").removeClass("active");
        try {
          $ &&
            $(".visionner:visible").length > 0 &&
            "function" == typeof stopBgmAudio &&
            stopBgmAudio();
        } catch (e) {}
      }));
  }));
const TRANSFORM_ANIMATION_DURATION = 1500;
let authorFadeInTimer = null;
function updateSlideTriggerPointPosition(slide) {
  const slideJquery = slide && slide.length ? slide : $(slide);
  if (!slideJquery || !slideJquery.length) return;
  const slideElement = slideJquery.get(0),
    infoPanel = slideJquery.find(".info").get(0),
    sliderButton = slideJquery.find(".sliderButton").get(0);
  if (!slideElement || !infoPanel || !sliderButton) return;

  const computedDisplay = window.getComputedStyle(infoPanel).display;
  let wasInfoTemporarilyShown = false;
  const originalDisplay = infoPanel.style.display,
    originalVisibility = infoPanel.style.visibility,
    originalPointerEvents = infoPanel.style.pointerEvents;

  if (computedDisplay === "none") {
    infoPanel.style.display = "block";
    infoPanel.style.visibility = "hidden";
    infoPanel.style.pointerEvents = "none";
    wasInfoTemporarilyShown = true;
  }

  const slideRect = slideElement.getBoundingClientRect(),
    infoRect = infoPanel.getBoundingClientRect();
  let centerY = infoRect.top - slideRect.top + infoRect.height / 2;

  if (Number.isFinite(centerY) && infoRect.height > 0) {
    centerY = Math.max(0, Math.min(slideRect.height, centerY));
    sliderButton.style.top = `${centerY}px`;
  }

  if (wasInfoTemporarilyShown) {
    infoPanel.style.display = originalDisplay;
    infoPanel.style.visibility = originalVisibility;
    infoPanel.style.pointerEvents = originalPointerEvents;
  }
}
function updateAllTriggerPointPositions() {
  $(".slides").each(function () {
    updateSlideTriggerPointPosition($(this));
  });
}
function initIndexInfoAnchorSync() {
  let debounceTimer = null;
  const debouncedUpdate = () => {
    if (debounceTimer !== null) window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      updateAllTriggerPointPositions();
    }, 80);
  };
  window.addEventListener("resize", debouncedUpdate, { passive: true }),
    window.addEventListener("orientationchange", debouncedUpdate),
    window.addEventListener("load", function () {
      updateAllTriggerPointPositions();
    });
}
function showInfoPanel(e) {
  if (!e || !e.length) return;
  const t = e.hasClass("slide1"),
    n = e.find("h2"),
    i = e.find(".info");
  e.find(".point2").hasClass("full") ||
    (clearTimeout(authorFadeInTimer),
    fadeVisionnerTriggerH3(e, !0),
    t ||
      (n.addClass("animate-transform"),
      requestAnimationFrame(() => {
        n.addClass("move");
      }),
      (authorFadeInTimer = setTimeout(() => {
        n.addClass("author-visible");
      }, 1500))),
    i.fadeIn(500, function () {
      updateSlideTriggerPointPosition(e);
    }),
    e.find(".sliderButton .point2").addClass("full").removeClass("empty"),
    e.find(".sliderButton .point1").addClass("empty").removeClass("full"),
    t || e.find("video").addClass("flou"));
}
function hideInfoPanel(e) {
  if (!e || !e.length) return;
  const t = e.find("h2"),
    n = e.find(".info");
  e.find(".point1").hasClass("full") ||
    (clearTimeout(authorFadeInTimer),
    t.removeClass("author-visible"),
    fadeVisionnerTriggerH3(e, !1),
    t.addClass("animate-transform"),
    requestAnimationFrame(() => {
      t.removeClass("move");
    }),
    t.one("transitionend", function (e) {
      "transform" === e.originalEvent.propertyName &&
        $(this).removeClass("animate-transform");
    }),
    n.fadeOut(300),
    e.find(".sliderButton .point1").addClass("full").removeClass("empty"),
    e.find(".sliderButton .point2").addClass("empty").removeClass("full"),
    e.find("video").removeClass("flou"));
}
($(".point2").on("click", function () {
  showInfoPanel($(this).closest(".slides"));
}),
  $(".point1").on("click", function () {
    hideInfoPanel($(this).closest(".slides"));
  }));
let lastFocusedElement,
  isH2Animating = !1;
function triggerH2TransformAnimation(e) {
  e &&
    e.length &&
    (e.addClass("animate-transform"),
    e.one("transitionend", function (t) {
      "transform" === t.originalEvent.propertyName &&
        (e.removeClass("animate-transform"), (isH2Animating = !1));
    }));
}
function fadeVisionnerTriggerH3(e, t = !0) {
  const n = e.find(".visionner-trigger-h3").not(".always-visible");
  n.length &&
    (t
      ? n.removeClass("fade-in").addClass("fade-out")
      : n.removeClass("fade-out").addClass("fade-in"));
}
function parseTimecode(e) {
  if (!e) return null;
  let t = String(e).trim();
  if ((t.startsWith("#t=") && (t = t.slice(3)), /^\d+$/.test(t)))
    return parseInt(t, 10);
  const n = t.match(/(?:(\d+)m)?(?:(\d+)s)?/i);
  if (!n) return null;
  return 60 * (n[1] ? parseInt(n[1], 10) : 0) + (n[2] ? parseInt(n[2], 10) : 0);
}
function resumeBgmIfNoVisionner() {
  try {
    $(".visionner:visible").length > 0 ||
      ("function" == typeof window.resumeBgmAudio
        ? window.resumeBgmAudio(0.3, 600)
        : (playBgmAudio(),
          "function" == typeof window.animateWaveAmplitude &&
            window.animateWaveAmplitude(0, 600).catch(() => {})));
  } catch (e) {}
}
function applyInfoPanelState(e) {
  const t = e.find("h2"),
    n = e.hasClass("slide1");
  ($("body").css("overflow", "auto"),
    e.find(".info").fadeIn(2e3),
    n
      ? (t.removeClass("move author-visible animate-transform"),
        e.find("video").removeClass("flou"),
        fadeVisionnerTriggerH3(e, !1))
      : (t.hasClass("move") || triggerH2TransformAnimation(t),
        t.addClass("move"),
        clearTimeout(authorFadeInTimer),
        (authorFadeInTimer = setTimeout(() => {
          t.addClass("author-visible");
        }, 1500)),
        e.find("video").addClass("flou"),
        fadeVisionnerTriggerH3(e, !0)),
    e.find(".sliderButton .point2").addClass("full").removeClass("empty"),
    e.find(".sliderButton .point1").addClass("empty").removeClass("full"),
    updateSlideTriggerPointPosition(e));
}
function getClosestSlideIndex(e) {
  const t = window.innerHeight / 2;
  let n = 0,
    i = 1 / 0;
  return (
    Array.from(e).forEach((e, o) => {
      const s = e.getBoundingClientRect(),
        r = s.top + s.height / 2,
        a = Math.abs(r - t);
      a < i && ((i = a), (n = o));
    }),
    n
  );
}
function getNextSlide(e) {
  let t = null;
  return (
    Array.from(e).some((e) => {
      if (e.getBoundingClientRect().top > 10) return ((t = e), !0);
    }),
    t
  );
}
function resetSlideState(e) {
  if (!e || !e.length) return;
  const t = e.find("h2");
  (clearTimeout(authorFadeInTimer),
    t.removeClass("move author-visible animate-transform"));
  const n = e.find(".visionner");
  if (n.is(":visible")) {
    (removeFocusTrap(n), n.find("iframe").remove(), n.hide());
    try {
      window.__visionnerOpen = !1;
    } catch (e) {}
    resumeBgmIfNoVisionner();
  }
  (e.find(".info").hide(),
    fadeVisionnerTriggerH3(e, !1),
    e.find(".sliderButton .point1").addClass("full").removeClass("empty"),
    e.find(".sliderButton .point2").addClass("empty").removeClass("full"),
    e.find("video").removeClass("flou"),
    updateSlideTriggerPointPosition(e));
}
function focusTrap(e) {
  const t = e
      .find('a[href], button, iframe, [tabindex]:not([tabindex="-1"])')
      .filter(":visible"),
    n = t.first(),
    i = t.last();
  (n.focus(),
    e.on("keydown.focusTrap", function (e) {
      ("Tab" !== e.key && 9 !== e.keyCode) ||
        (e.shiftKey
          ? document.activeElement === n[0] && (i.focus(), e.preventDefault())
          : document.activeElement === i[0] && (n.focus(), e.preventDefault()));
    }));
}
function removeFocusTrap(e) {
  (e.off("keydown.focusTrap"),
    lastFocusedElement && lastFocusedElement.focus());
}
$(".close-visionner").click(function (e) {
  e.stopPropagation();
  const t = $(this).closest(".slides"),
    n = t.find(".visionner");
  (removeFocusTrap(n),
    n.find("iframe").remove(),
    n.fadeOut(400, function () {
      try {
        window.__visionnerOpen = !1;
      } catch (e) {}
      (applyInfoPanelState(t), resumeBgmIfNoVisionner());
    }));
});
let vimeoPlayer = null;
function initIndexAutoCloseNonActiveSlides() {
  const e = document.querySelectorAll(".slides");
  if (0 === e.length) return;
  const t = new IntersectionObserver(
    (t) => {
      let n = null,
        i = 0;
      (t.forEach((e) => {
        e.isIntersecting &&
          e.intersectionRatio > i &&
          ((i = e.intersectionRatio), (n = e.target));
      }),
        n &&
          e.forEach((e) => {
            e !== n && resetSlideState($(e));
          }));
    },
    { threshold: [0.2, 0.5, 0.8] },
  );
  e.forEach((e) => t.observe(e));
}
function initIndexWheelAndScrollArrow() {
  const e = document.querySelectorAll(".slides"),
    t = document.querySelector(".scroll-down-arrow"),
    n = document.querySelector(".container");
  try {
    const e = new URLSearchParams(window.location.search).get("slide");
    null != e &&
      "function" == typeof window.scrollToAndTrigger &&
      window.scrollToAndTrigger(e);
  } catch (e) {}
  if (e.length && n) {
    let t = !1;
    try {
      const e = (getComputedStyle(n).scrollSnapType || "").trim();
      t = "" !== e && "none" !== e;
    } catch (e) {
      t = !1;
    }
    if (!t) {
      let t = !1;
      n.addEventListener(
        "wheel",
        (n) => {
          if (t) return;
          const i = n.deltaY;
          if (!(Math.abs(i) < 40)) {
            if (((t = !0), n.preventDefault(), i > 0)) {
              const t = getNextSlide(e);
              t && t.scrollIntoView({ behavior: "smooth" });
            } else {
              const t = getClosestSlideIndex(e);
              t > 0 && e[t - 1].scrollIntoView({ behavior: "smooth" });
            }
            setTimeout(() => (t = !1), 600);
          }
        },
        { passive: !1 },
      );
    }
  }
  if (e.length && t) {
    const n = new IntersectionObserver(
      (n) => {
        n.forEach((n) => {
          n.isIntersecting &&
            (Array.from(e).indexOf(n.target) === e.length - 1
              ? t.classList.add("up")
              : t.classList.remove("up"));
        });
      },
      { threshold: 0.5 },
    );
    e.forEach((e) => n.observe(e));
  }
}
($(".visionner-trigger, .visionner-trigger-h3").click(function (e) {
  (e.stopPropagation(), (lastFocusedElement = $(this)), stopBgmAudio());
  try {
    window.__visionnerOpen = !0;
  } catch (e) {}
  const t = $(this).closest(".slides"),
    n = t.hasClass("slide1");
  n &&
    (t.find("video").removeClass("flou"),
    t.find("h2").removeClass("move author-visible animate-transform"));
  const i = t.find(".visionner"),
    o = $(this).data("vimeo"),
    s = $(this).data("lang") || "fr",
    r =
      $(this).data("timecode") ||
      t.find("[data-timecode]").data("timecode") ||
      "",
    a = `https://player.vimeo.com/video/${o}?autoplay=1&texttrack=${s}`;
  i.find("iframe").remove();
  const l = $(
    `<iframe src="${a}" width="1280" height="720" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`,
  );
  (i.append(l),
    vimeoPlayer && (vimeoPlayer.unload().catch(() => {}), (vimeoPlayer = null)),
    (vimeoPlayer = new Vimeo.Player(l[0])));
  const d = parseTimecode(r),
    c = null != d && !isNaN(d) && d > 0;
  (vimeoPlayer
    .ready()
    .then(() => {
      if (c) return vimeoPlayer.setCurrentTime(d).catch(() => {});
    })
    .then(() => vimeoPlayer.play().catch(() => {})),
    vimeoPlayer.on("ended", function () {
      i.fadeOut(400, function () {
        try {
          window.__visionnerOpen = !1;
        } catch (e) {}
        (applyInfoPanelState(t), resumeBgmIfNoVisionner());
      });
    }),
    i
      .fadeIn(400, function () {
        ($("body").css("overflow", "hidden"),
          t.find(".info").fadeOut(0),
          focusTrap(i),
          n &&
            (t.find("video").removeClass("flou"),
            t.find("h2").removeClass("move author-visible animate-transform"),
            fadeVisionnerTriggerH3(t, !1)));
      })
      .css("display", "flex"));
}),
  (window.scrollToAndTrigger = function (e) {
    const t = Number(e);
    if (!Number.isFinite(t)) return;
    const n = $(".slides").eq(t);
    0 !== n.length &&
      (n[0].scrollIntoView({ behavior: "smooth", block: "start" }),
      setTimeout(function () {
        n.find("button.visionner-trigger-h3").trigger("click");
      }, 600));
  }),
  $(document).on("keydown", function (e) {
    if ($("input, textarea").is(":focus")) return;
    if ($(".slides").length <= 1) return;
    if ("ArrowDown" !== e.key && "ArrowUp" !== e.key) return;
    const t = $(".slides"),
      n = getClosestSlideIndex(t.toArray());
    ("ArrowDown" === e.key &&
      n < t.length - 1 &&
      t.eq(n + 1)[0].scrollIntoView({ behavior: "smooth" }),
      "ArrowUp" === e.key &&
        n > 0 &&
        t.eq(n - 1)[0].scrollIntoView({ behavior: "smooth" }));
  }),
  $(document).on(
    "click",
    ".scroll-down-arrow, .scroll-down-arrow img",
    function (e) {
      e.stopPropagation();
      const t = $(this).closest(".scroll-down-arrow"),
        n = document.querySelector(".container");
      if (!n) return;
      if (t.hasClass("up"))
        return void n.scrollTo({ top: 0, behavior: "smooth" });
      const i = getNextSlide($(".slides").toArray());
      i && i.scrollIntoView({ behavior: "smooth" });
    },
  ));
