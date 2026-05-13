const fadeIntervals = new WeakMap();
let isGloballyMuted =
    "true" !== localStorage.getItem("audioHasBeenInitialized") ||
    "true" === localStorage.getItem("isSiteMuted"),
  audioContextStarted =
    "true" === localStorage.getItem("audioHasBeenInitialized");
function getLocalizedMessage(t) {
  const e =
      (document && document.documentElement && document.documentElement.lang) ||
      "",
    o = (navigator && navigator.language) || "",
    i = (e || o).toLowerCase(),
    n = i.startsWith("ko") ? "ko" : i.startsWith("en") ? "en" : "fr",
    a = {
      autoplayBlocked: {
        fr: "Le son est bloqué par votre navigateur. Cliquez pour l'activer.",
        ko: "브라우저에서 소리가 차단되었습니다. 클릭하여 활성화하세요.",
        en: "Audio is blocked by your browser. Click to enable it.",
      },
    };
  return (a[t] && a[t][n]) || (a[t] && a[t].fr) || "";
}
function updateSoundUIToMuted() {
  try {
    const t = document.getElementById("icon-sound-on"),
      e = document.getElementById("icon-sound-off");
    (t && t.classList.add("icon-hidden"),
      e && e.classList.remove("icon-hidden"),
      "function" == typeof window.animateWaveAmplitude &&
        window.animateWaveAmplitude(0, 600).catch(() => {}));
  } catch (t) {
    console.error("updateSoundUIToMuted() visual update failed:", t);
  }
}
function getI18nMessage(t) {
  try {
    if (window && window.I18N && "string" == typeof window.I18N[t])
      return window.I18N[t];
  } catch (t) {}
  return getLocalizedMessage(t);
}
function fadeAudio(t, e, o = 1e3) {
  if (!t) return;
  const i = fadeIntervals.get(t);
  i && clearInterval(i);
  const n = Number(t.volume) || 0,
    a = (e - n) / (o / 50);
  let d = n,
    u = 0;
  const l = setInterval(() => {
    if (
      ((d += a),
      (u += 1),
      (t.volume = Math.max(0, Math.min(1, d))),
      ((a > 0 && d >= e) || (a < 0 && d <= e) || u > o / 50) &&
        ((t.volume = e), clearInterval(l), fadeIntervals.delete(t), 0 === e))
    )
      try {
        t.pause();
      } catch (t) {}
  }, 50);
  fadeIntervals.set(t, l);
}
function playBgmAudio() {
  if (isGloballyMuted) return;
  try {
    if ($ && $(".visionner:visible").length > 0) return;
  } catch (t) {}
  function t() {
    ((isGloballyMuted = !0), updateSoundUIToMuted());
  }
  const e = document.getElementById("audio-bgm");
  if (e)
    if (e.paused) {
      const o = e.play();
      if (void 0 !== o) {
        let i;
        (o
          .then((t) => {
            (clearTimeout(i),
              e.muted && (e.muted = !1),
              fadeAudio(e, 0.6, 500),
              $(document).off("click.autoplay keydown.autoplay"));
          })
          .catch((o) => {
            (clearTimeout(i),
              console.error("BGM audio autoplay was prevented or failed:", o),
              e && e.error && console.error("Audio error code:", e.error.code));
            try {
              if (e && !e.paused)
                return void $(document).off("click.autoplay keydown.autoplay");
            } catch (t) {}
            t();
            try {
              if ("function" == typeof showNotification) {
                const t = document.getElementById("audio-bgm");
                (t && !t.paused) ||
                  showNotification(getI18nMessage("autoplayBlocked"));
              }
            } catch (t) {}
            ($(document).off("click.autoplay keydown.autoplay"),
              $(document).one("click.autoplay keydown.autoplay", function () {
                if (
                  ((isGloballyMuted = !1), "function" == typeof window.updateUI)
                )
                  try {
                    window.updateUI();
                  } catch (t) {}
                playBgmAudio();
              }));
          }),
          (i = setTimeout(() => {
            try {
              const e = document.getElementById("audio-bgm");
              if (e) {
                if (e.paused) {
                  t();
                  try {
                    "function" == typeof showNotification &&
                      e.paused &&
                      showNotification(getI18nMessage("autoplayBlocked"));
                  } catch (t) {}
                  ($(document).off("click.autoplay keydown.autoplay"),
                    $(document).one(
                      "click.autoplay keydown.autoplay",
                      function () {
                        if (
                          ((isGloballyMuted = !1),
                          "function" == typeof window.updateUI)
                        )
                          try {
                            window.updateUI();
                          } catch (t) {}
                        playBgmAudio();
                      },
                    ));
                }
              }
            } catch (t) {}
          }, 600)));
      }
    } else !e.muted && e.volume < 0.3 && fadeAudio(e, 0.3, 2e3);
}
function stopBgmAudio() {
  const t = document.getElementById("audio-bgm");
  if (t) {
    fadeAudio(t, 0, 800);
    try {
      "function" == typeof window.animateWaveAmplitude &&
        window.animateWaveAmplitude(0, 600).catch(() => {});
    } catch (t) {}
  }
}
function addHideHeaderOnScroll(t) {
  if (!t || !t.length) return;
  const e = $("header");
  let o = 0;
  t.off("scroll.hideHeader").on("scroll.hideHeader", function () {
    const i = t.scrollTop();
    (i > o && i > 200
      ? e.addClass("hide-header")
      : i < o && e.removeClass("hide-header"),
      i < 20 && e.removeClass("hide-header"),
      (o = i));
  });
}
(Object.defineProperty(window, "isGloballyMuted", {
  get: () => isGloballyMuted,
  set(t) {
    isGloballyMuted = t;
  },
  configurable: !0,
  enumerable: !1,
}),
  (window.shouldPlayPortraitsAudio = !1),
  (window.isLangSwitching = !1),
  (window.resumeBgmAudio = function (t = 0.3, e = 600) {
    try {
      if (isGloballyMuted) return;
      if ($ && $(".visionner:visible").length > 0) return;
    } catch (t) {}
    const o = document.getElementById("audio-bgm");
    if (!o) return;
    const i = Math.max(0, Math.min(1, Number(t) || 0.3));
    ((o.paused ? o.play() : Promise.resolve()) || Promise.resolve())
      .then(() => {
        try {
          o.muted && (o.muted = !1);
        } catch (t) {}
        try {
          fadeAudio(o, i, Math.max(0, Number(e) || 600));
        } catch (t) {}
      })
      .catch(() => {
        try {
          "function" == typeof playBgmAudio && playBgmAudio();
        } catch (t) {}
      });
  }),
  $(document).on("keydown", function (t) {
    ("p" !== t.key.toLowerCase() ||
      $("input, textarea").is(":focus") ||
      (window.location.href = "tools/reset.php"),
      ("Escape" !== t.key && "Esc" !== t.key && 27 !== t.keyCode) ||
        $(".visionner:visible").each(function () {
          $(this).find(".close-visionner").trigger("click");
        }));
  }),
  $(document).ready(function () {
    (window.addEventListener("beforeunload", stopBgmAudio),
      window.addEventListener("pagehide", stopBgmAudio),
      window.addEventListener("visibilitychange", function () {
        if (
          audioContextStarted &&
          ("hidden" === document.visibilityState && stopBgmAudio(),
          "visible" === document.visibilityState)
        ) {
          if (!isGloballyMuted)
            try {
              ($ && $(".visionner:visible").length > 0) ||
                ("function" == typeof playBgmAudio && playBgmAudio());
            } catch (t) {}
          try {
            requestAnimationFrame(() => {
              "function" == typeof updateUI
                ? updateUI()
                : "function" == typeof window.animateWaveAmplitude &&
                  window
                    .animateWaveAmplitude(isGloballyMuted ? 0 : 1, 600)
                    .catch(() => {});
            });
          } catch (t) {}
        }
      }),
      window.addEventListener("blur", function () {
        audioContextStarted && stopBgmAudio();
      }),
      window.addEventListener("focus", function () {
        if (audioContextStarted) {
          if (!isGloballyMuted && "visible" === document.visibilityState)
            try {
              ($ && $(".visionner:visible").length > 0) ||
                document.querySelector(".loading-screen") ||
                ("function" == typeof playBgmAudio && playBgmAudio());
            } catch (t) {}
          try {
            requestAnimationFrame(() => {
              "function" == typeof updateUI
                ? updateUI()
                : "function" == typeof window.animateWaveAmplitude &&
                  window
                    .animateWaveAmplitude(isGloballyMuted ? 0 : 1, 600)
                    .catch(() => {});
            });
          } catch (t) {}
        }
      }),
      $(document).on("click", ".transition-link", async function (t) {
        t.preventDefault();
        const e = $(this).attr("href");
        if (!e || "#" === e || e.startsWith("javascript")) return;
        const o =
            window.location.pathname.split("/").pop().replace(".php", "") ||
            "index",
          i =
            new URL(e, window.location.origin).pathname
              .split("/")
              .pop()
              .replace(".php", "") || "index",
          n = "./" === $(this).attr("href");
        if (o === i || (n && "index" === o))
          return (
            $("#menuVolet").removeClass("open"),
            void $("#menuBurger").removeClass("open")
          );
        "function" == typeof stopBgmAudio && stopBgmAudio();
        const a =
          "function" == typeof window.requestPortraitsFadeOut
            ? window.requestPortraitsFadeOut(600)
            : new Promise((t) => setTimeout(t, 300));
        ($("#menuVolet").removeClass("open"),
          $("#menuBurger").removeClass("open"));
        try {
          await a;
        } catch (t) {}
        setTimeout(function () {
          ($("#transition-overlay").removeClass("hide").addClass("active"),
            setTimeout(function () {
              window.location.href = e;
            }, 700));
        }, 200);
      }),
      window.addEventListener("pageshow", function (t) {
        if (!t.persisted) return;
        const e = $("#transition-overlay");
        (e.css("transition", "none"),
          e.removeClass("hide"),
          e[0].offsetHeight,
          e.css("transition", "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)"),
          e.addClass("hide"),
          window.scrollTo(0, 0),
          $("body").css("overflow", "auto"),
          $(".visionner").fadeOut(0),
          (async function () {
            if ("function" == typeof window.requestPortraitsFadeOut)
              try {
                await window.requestPortraitsFadeOut(500);
              } catch (t) {}
            "function" == typeof stopBgmAudio && stopBgmAudio();
          })());
        try {
          requestAnimationFrame(() => {
            "function" == typeof updateUI
              ? updateUI()
              : "function" == typeof window.animateWaveAmplitude &&
                window
                  .animateWaveAmplitude(isGloballyMuted ? 0 : 1, 600)
                  .catch(() => {});
          });
        } catch (t) {}
      }),
      setTimeout(function () {
        $("#transition-overlay").addClass("hide");
      }, 50),
      null === document.querySelector(".loading-screen") &&
        "function" == typeof playBgmAudio &&
        playBgmAudio(),
      setTimeout(function () {
        window.isLangSwitching || $("#transition-overlay").addClass("hide");
      }, 50));
    const t = $("#menuBurger"),
      e = $("#menuVolet");
    (t.on("click keydown", function (t) {
      if (
        "click" === t.type ||
        ("keydown" === t.type && ("Enter" === t.key || " " === t.key))
      ) {
        ($(this).toggleClass("open"), e.toggleClass("open"));
        const o = $(this).hasClass("open");
        ($(this).attr("aria-expanded", o ? "true" : "false"),
          t.preventDefault());
      }
    }),
      $(document).click(function (o) {
        e.is(o.target) ||
          0 !== e.has(o.target).length ||
          t.is(o.target) ||
          0 !== t.has(o.target).length ||
          (e.removeClass("open"), t.removeClass("open"));
      }));
    {
      const t = document.querySelectorAll(".content-anim");
      if (t && t.length) {
        const e = new IntersectionObserver(
          (t, e) => {
            t.forEach((t) => {
              t.isIntersecting &&
                (t.target.classList.add("visible"), e.unobserve(t.target));
            });
          },
          { threshold: 0.2 },
        );
        t.forEach((t) => e.observe(t));
      }
    }
    initGlobalAudioControls();
  }),
  $(document).on("click", ".menu-video-item", function () {
    const t = $(this).data("slide"),
      e = $(".slides").length > 0;
    ($("#menuVolet").removeClass("open"),
      $("#menuBurger").removeClass("open"),
      e && "function" == typeof window.scrollToAndTrigger
        ? window.scrollToAndTrigger(t)
        : setTimeout(function () {
            ($("#transition-overlay").removeClass("hide").addClass("active"),
              setTimeout(function () {
                window.location.href = "index?slide=" + t;
              }, 700));
          }, 300));
  }),
  $(".menu-video-item").on("mouseenter", function () {
    const t = $(this).find(".menu-video")[0];
    t && t.play();
  }),
  $(".menu-video-item").on("mouseleave", function () {
    const t = $(this).find(".menu-video")[0];
    t && t.pause();
  }),
  $(document).on("click", ".lang-option", function (t) {
    (t.preventDefault(), (window.isLangSwitching = !0));
    let e = $(this).data("lang") || $(this).attr("lang");
    if ($(this).hasClass("active")) return;
    ($(".lang-option").removeClass("active"),
      $(this).addClass("active"),
      $("#menuVolet").removeClass("open"),
      "function" == typeof stopBgmAudio && stopBgmAudio(),
      "function" == typeof window.animateWaveAmplitude &&
        window.animateWaveAmplitude(0, 600));
    ($("#transition-overlay").removeClass("hide").addClass("active fade-in"),
      setTimeout(function () {
        let t = new URL(window.location.href);
        (t.searchParams.set("lang", e), (window.location.href = t.toString()));
      }, 700));
  }));
let lastScroll = 0;
const $header = $("header");
function initGlobalAudioControls() {
  const t = document.getElementById("global-audio-control-container"),
    e = document.getElementById("wave"),
    o = document.getElementById("icon-sound-on"),
    i = document.getElementById("icon-sound-off");
  if (!(t && e && o && i)) return;
  try {
    const t = document.querySelector(".portraits-sound-overlay__content");
    t &&
      (t.hasAttribute("role") || t.setAttribute("role", "status"),
      t.hasAttribute("aria-live") || t.setAttribute("aria-live", "polite"),
      t.hasAttribute("tabindex") || t.setAttribute("tabindex", "-1"),
      t.classList.add("accessible-focusable"));
  } catch (t) {}
  const n = e.getContext("2d"),
    a = e.width,
    d = e.height;
  let u,
    l = 0,
    s = isGloballyMuted ? 0 : 1;
  window.waveAmplitude = s;
  let c = null;
  function r() {
    (n.clearRect(0, 0, a, d),
      n.beginPath(),
      n.moveTo(0, d / 2),
      n.lineTo(a, d / 2),
      (n.strokeStyle = "white"),
      (n.lineWidth = 1.5),
      n.stroke());
  }
  function m() {
    ((u = null), n.clearRect(0, 0, a, d), n.beginPath(), n.moveTo(0, d / 2));
    const t = s * (d / 3.5);
    for (let e = 0; e < a; e++) {
      const o = d / 2 + Math.sin(0.4 * (e + l)) * t;
      n.lineTo(e, o);
    }
    ((n.strokeStyle = "white"),
      (n.lineWidth = 1),
      n.stroke(),
      (l += 0.3),
      l > 100 * Math.PI && (l = 0));
    s > 0.001
      ? u || (u = requestAnimationFrame(m))
      : (u && (cancelAnimationFrame(u), (u = null)), r());
  }
  function f() {
    (document.querySelectorAll("audio, video").forEach((t) => {
      "AUDIO" === t.tagName &&
        ("audio-bgm" === t.id ||
          (t.closest(".loading-screen")
            ? (t.muted = !0)
            : (t.muted = isGloballyMuted)));
    }),
      "function" == typeof window.setPortraitsMuteState &&
        window.setPortraitsMuteState(isGloballyMuted));
  }
  function p() {
    (isGloballyMuted
      ? (o.classList.add("icon-hidden"),
        i.classList.remove("icon-hidden"),
        "function" == typeof window.animateWaveAmplitude
          ? window.animateWaveAmplitude(0, 600).catch(() => {})
          : (u && cancelAnimationFrame(u), r()))
      : (o.classList.remove("icon-hidden"),
        i.classList.add("icon-hidden"),
        "function" == typeof window.animateWaveAmplitude
          ? window
              .animateWaveAmplitude(1, 600)
              .then(() => {
                u || (u = requestAnimationFrame(m));
              })
              .catch(() => {
                u || (u = requestAnimationFrame(m));
              })
          : m()),
      audioContextStarted &&
        localStorage.setItem("isSiteMuted", isGloballyMuted));
  }
  (audioContextStarted &&
    !isGloballyMuted &&
    setTimeout(() => {
      document.querySelector(".loading-screen") ||
        ("function" == typeof playBgmAudio && playBgmAudio(),
        "function" == typeof window.startPortraitsAudio &&
          ((window.shouldPlayPortraitsAudio = !0),
          window.startPortraitsAudio()));
    }, 100),
    (window.animateWaveAmplitude = function (t, e = 500) {
      c && cancelAnimationFrame(c);
      const o = performance.now(),
        i = s,
        n = t - i;
      return new Promise((a) => {
        c = requestAnimationFrame(function d(l) {
          const f = Math.min(1, (l - o) / Math.max(1, e)),
            p = 1 - Math.pow(1 - f, 3);
          s = i + n * p;
          try {
            window.waveAmplitude = s;
          } catch (t) {}
          if ((s > 0 && !u && (u = requestAnimationFrame(m)), f < 1))
            c = requestAnimationFrame(d);
          else {
            s = t;
            try {
              window.waveAmplitude = s;
            } catch (t) {}
            ((c = null),
              s <= 0 && (u && (cancelAnimationFrame(u), (u = null)), r()),
              a());
          }
        });
      });
    }),
    (window.getWaveState = function () {
      return {
        waveAmplitude: "number" == typeof s ? s : null,
        animationFrameRunning: !!u,
        amplitudeAnimRunning: !!c,
        waveXOffset: l,
      };
    }),
    (window.stopWaveAnimation = function () {
      try {
        c && cancelAnimationFrame(c);
      } catch (t) {}
      c = null;
      try {
        u && cancelAnimationFrame(u);
      } catch (t) {}
      u = null;
      try {
        s = 0;
        try {
          window.waveAmplitude = 0;
        } catch (t) {}
      } catch (t) {}
      try {
        r();
      } catch (t) {}
      return window.getWaveState();
    }),
    (window.updateUI = p));
  try {
    window.hintWave = function (t = 600) {
      if ("function" != typeof window.animateWaveAmplitude)
        return Promise.resolve();
      const e = s;
      return window
        .animateWaveAmplitude(1, Math.min(300, t / 2))
        .then(() => window.animateWaveAmplitude(e, Math.max(300, t / 2)));
    };
  } catch (t) {}
  function w() {
    if (audioContextStarted)
      return (
        isGloballyMuted ||
          ("function" == typeof playBgmAudio && playBgmAudio(),
          "function" == typeof window.startPortraitsAudio &&
            window.startPortraitsAudio()),
        void p()
      );
    ((isGloballyMuted = !1),
      (audioContextStarted = !0),
      localStorage.setItem("audioHasBeenInitialized", "true"),
      localStorage.setItem("isSiteMuted", "false"),
      "function" == typeof playBgmAudio && playBgmAudio(),
      "function" == typeof window.startPortraitsAudio &&
        window.startPortraitsAudio(),
      f(),
      p());
  }
  try {
    window.initSiteAudio = w;
  } catch (t) {}
  t.addEventListener("click", function () {
    audioContextStarted
      ? ((isGloballyMuted = !isGloballyMuted),
        isGloballyMuted
          ? "function" == typeof stopBgmAudio && stopBgmAudio()
          : ("function" == typeof playBgmAudio && playBgmAudio(),
            "function" == typeof window.startPortraitsAudio &&
              window.startPortraitsAudio()),
        f(),
        p())
      : w();
  });
  const y = document.getElementById("enter-button");
  (y && y.addEventListener("click", w), p(), f());
}
function showNotification(t, e = 3e3) {
  let o = document.getElementById("notification-popup");
  o ||
    ((o = document.createElement("div")),
    (o.id = "notification-popup"),
    document.body.appendChild(o));
  try {
    const t = document.getElementById("audio-bgm");
    if (t && !t.paused) return;
  } catch (t) {}
  ((o.textContent = t), o.classList.add("show"));
  try {
    const t =
      "number" == typeof window.waveAmplitude ? window.waveAmplitude : 1;
    "function" == typeof window.animateWaveAmplitude
      ? window
          .animateWaveAmplitude(0, Math.min(300, 400))
          .then(() => window.animateWaveAmplitude(t, Math.max(300, 400)))
          .catch(() => {})
      : "function" == typeof window.hintWave &&
        window.hintWave(800).catch(() => {});
  } catch (t) {}
  setTimeout(() => {
    o.classList.remove("show");
  }, e);
}
(window.addEventListener("scroll", function () {
  const t = window.scrollY;
  (t > lastScroll && t > 200
    ? $header.addClass("hide-header")
    : t < lastScroll && $header.removeClass("hide-header"),
    t < 20 && $header.removeClass("hide-header"),
    (lastScroll = t));
}),
  document.addEventListener("click", function (t) {
    const e = document.createElement("div");
    ((e.className = "halo-click"),
      (e.style.left = t.clientX - 90 + "px"),
      (e.style.top = t.clientY - 90 + "px"),
      document.body.appendChild(e),
      setTimeout(() => e.remove(), 1e3));
  }));
