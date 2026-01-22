// Init autonome (feature) : s'exécute dès que le DOM est prêt.
(function initPortraitsMapFeature() {
  const start = function () {
    async function renderSVGFromGeoJSON() {
      const container = document.querySelector("#map-parcours");
      if (!container) return;

      let geo;
      try {
        const resp = await fetch("map.geojson");
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        geo = await resp.json();
      } catch (e) {
        console.error("portraits-map: failed to load map.geojson", e);
        return;
      }

      function project([lon, lat]) {
        const x = (lon + 180) / 360;
        const sinLat = Math.sin((lat * Math.PI) / 180);
        const y = 0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI);
        return [x, y];
      }
      function clamp(v) {
        return Math.max(0, Math.min(1, v));
      }

      // extract points and lines
      const points = [];
      let lineCoords = null;
      for (const f of geo.features || []) {
        if (!f.geometry) continue;
        if (f.geometry.type === "Point") points.push(f.geometry.coordinates);
        if (f.geometry.type === "LineString")
          lineCoords = f.geometry.coordinates.slice();
      }
      if (!lineCoords) return console.warn("portraits-map: no LineString");

      const projectedLine = lineCoords.map(project);
      const projectedPoints = points.map(project);
      const all = projectedLine.concat(projectedPoints);
      const xs = all.map((p) => p[0]),
        ys = all.map((p) => p[1]);
      const minX = Math.min(...xs),
        maxX = Math.max(...xs),
        minY = Math.min(...ys),
        maxY = Math.max(...ys);

      const w = Math.max(600, container.clientWidth || 800),
        h = 400,
        pad = 24;
      const scale = Math.min(
        (w - pad * 2) / (maxX - minX || 1),
        (h - pad * 2) / (maxY - minY || 1),
      );
      function toPixelProj([x, y]) {
        return [pad + (x - minX) * scale, pad + (y - minY) * scale];
      }
      function toPixel(coord) {
        return toPixelProj(project(coord));
      }

      const d = lineCoords
        .map((c, i) => {
          const [px, py] = toPixel(c);
          return (i === 0 ? "M" : "L") + px.toFixed(2) + " " + py.toFixed(2);
        })
        .join(" ");
      const pointElemsMarkup = points
        .map((c, i) => {
          const [px, py] = toPixel(c);
          return `<circle class="svg-point" data-idx="${i}" cx="${px}" cy="${py}" r="6" fill="none" stroke="#fff" stroke-width="2"></circle>`;
        })
        .join("\n");

      container.innerHTML = `\n<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">\n  <g class="parcours-group">\n    <path id="parcours-path" class="parcours-line" d="${d}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>\n    ${pointElemsMarkup}\n  </g>\n</svg>`;

      const pathEl = container.querySelector("#parcours-path");
      const pathLen = pathEl.getTotalLength();
      const svgPoints = Array.from(container.querySelectorAll(".svg-point"));

      // compute fractions
      const pointFractions = svgPoints.map((el) => {
        const cx = parseFloat(el.getAttribute("cx")),
          cy = parseFloat(el.getAttribute("cy"));
        let bestL = 0,
          bestD = Infinity;
        const steps = 360;
        for (let i = 0; i <= steps; i++) {
          const l = (i / steps) * pathLen;
          const p = pathEl.getPointAtLength(l);
          const dx = p.x - cx,
            dy = p.y - cy,
            d = dx * dx + dy * dy;
          if (d < bestD) {
            bestD = d;
            bestL = l;
          }
        }
        return bestL / pathLen;
      });

      const LOREM =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
      const pointMetas = svgPoints.map((el, i) => {
        const feat = (geo.features || []).find(
          (f) =>
            f.geometry &&
            f.geometry.type === "Point" &&
            f.geometry.coordinates[0] === points[i][0] &&
            f.geometry.coordinates[1] === points[i][1],
        );
        const props = (feat && feat.properties) || {};
        // Langue courante (html lang ou navigateur)
        const lang = (
          document.documentElement.lang ||
          navigator.language ||
          "fr"
        ).slice(0, 2);
        // Titre multilingue
        const title =
          props[`name_${lang}`] ||
          props.name_fr ||
          props.name ||
          `Point ${i + 1}`;
        // Description multilingue
        const desc =
          props[`description_${lang}`] ||
          props.description_fr ||
          props.description ||
          LOREM;
        // choose a seed for placeholder images (prefer name when available)
        const seed = title ? String(title).replace(/\s+/g, "-") : `pt-${i}`;
        const placeholder = `https://picsum.photos/seed/${encodeURIComponent(
          seed,
        )}/600/360`;
        const lon = points[i] && points[i][0];
        const lat = points[i] && points[i][1];
        return {
          index: i,
          name: title,
          description: desc,
          image: props.image || placeholder,
          fraction: pointFractions[i],
          coords:
            typeof lat === "number" && typeof lon === "number"
              ? `${lat.toFixed(6)}, ${lon.toFixed(6)}`
              : "",
        };
      });

      // attach data attributes to svg circles so tooltips / other code can read them
      svgPoints.forEach((el, i) => {
        try {
          el.setAttribute("data-name", pointMetas[i].name || "");
          el.setAttribute("data-img", pointMetas[i].image || "");
        } catch (e) {}
      });

      if (!document.getElementById("portraits-map-style")) {
        const s = document.createElement("style");
        s.id = "portraits-map-style";
        s.textContent = `
      /* make circles clickable inside and animate size on hover/focus; avoid JS transform mutations */
  .svg-point{ transition: transform var(--transition-fast,0.3s) ease, fill 300ms ease, opacity 220ms; fill:transparent; pointer-events: auto; transform-box: fill-box; transform-origin: center; }
  /* scale only on user hover or keyboard focus */
  .svg-point:hover, .svg-point:focus{ transform: scale(1.45); }
  .svg-point[role="button"]{ cursor: pointer; }
  /* filled state visually marks the point but intentionally doesn't mutate transform */
  .svg-point.filled{ fill:#ffffff; }
  /* make focused points visually discoverable without shifting layout */
  .svg-point:focus{ outline: none; }

  /* panel styles aligned to site design */
  .map-info-panel{ position: absolute; right: 0; top: 0; width: 48%; max-width: 520px; padding: 22px; box-sizing: border-box; color:var(--main-text-color,#fff); z-index: 1; font-family: 'Figtree', sans-serif; pointer-events: none; }
  .map-info-panel .content{ background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 12px; backdrop-filter: blur(6px); }
  .map-info-panel{ transition: opacity var(--transition-fast,0.3s) ease, transform var(--transition-fast,0.3s) ease; opacity: 0; transform: translateY(6px); }
  .map-info-panel.show{ opacity: 1; transform: none; pointer-events: auto; }

  /* animated content wrapper inside the panel */
  .map-info-panel .content.anim{ opacity: 0; transform: translateY(6px); transition: opacity var(--transition-fast,0.3s) ease, transform var(--transition-slow,0.7s) cubic-bezier(0.2,0.9,0.2,1); }
  .map-info-panel.show .content.anim{ opacity: 1; transform: none; }
  .map-info-panel .content.anim > *{ display:block; opacity:0; transform: translateY(6px); transition: opacity var(--transition-fast,0.3s) ease, transform var(--transition-fast,0.3s) ease; }
  .map-info-panel.show .content.anim > *{ opacity:1; transform:none; }
  .map-info-panel .content.anim > *:nth-child(1){ transition-delay: 40ms; }
  .map-info-panel .content.anim > *:nth-child(2){ transition-delay: 90ms; }
  .map-info-panel .content.anim > *:nth-child(3){ transition-delay: 140ms; }
  .map-info-panel .content.anim > *:nth-child(4){ transition-delay: 190ms; }

  .map-info-panel .title{ font-size:20px; font-weight:700; margin-bottom:6px; font-family: 'Libre Baskerville', serif; letter-spacing:0.01em; color: var(--main-text-color,#fff); }
  .map-info-panel .coords{ font-size:12px; color: rgba(255,255,255,0.85); margin-bottom:8px; font-family: 'Figtree', sans-serif; }
  .map-info-panel .desc{ font-size:14px; color: rgba(255,255,255,0.92); margin-bottom:12px; line-height:1.45; }
  .map-info-panel .img{ width:100%; height:auto; display:block; border-radius:8px; opacity:0; transform: translateY(6px); transition: opacity var(--transition-fast,0.3s) ease, transform var(--transition-fast,0.3s) ease; }
  .map-info-panel.show .img{ opacity:1; transform:none; }
    `;
        document.head.appendChild(s);
      }

      // info panel
      const infoPanel = document.createElement("div");
      infoPanel.className = "map-info-panel";
      infoPanel.innerHTML = `<div class="content anim"><div class="title"></div><div class="coords"></div><div class="desc"></div><img class="img" src="" alt="" style="display:none;"></div>`;
      // ensure the info panel lives inside the same container as the SVG
      // (appendChild keeps positioning relative to this container)
      try {
        container.appendChild(infoPanel);
        // ensure the info panel does not intercept clicks so underlying SVG points remain clickable
        try {
          infoPanel.style.pointerEvents = "none";
        } catch (e) {}
      } catch (e) {
        // fallback: insert as sibling if append fails for some reason
        try {
          container.parentNode.insertBefore(infoPanel, container.nextSibling);
        } catch (e2) {
          /* ignore */
        }
      }
      const infoTitle = infoPanel.querySelector(".title"),
        infoCoords = infoPanel.querySelector(".coords"),
        infoDesc = infoPanel.querySelector(".desc"),
        infoImg = infoPanel.querySelector(".img");

      // KG/time overlays
      const TOTAL_KG = Number(container.getAttribute("data-total-kg")) || 250;
      function parseTimeAttr(v) {
        if (!v) return 9 * 60;
        v = String(v).trim();
        if (/^\d{1,2}$/.test(v)) return (Number(v) % 24) * 60;

        // Support formats: "9h", "9h00", "09h00", "9 h 00" (case-insensitive)
        const h = v
          .toLowerCase()
          .replace(/\s+/g, "")
          .match(/^(\d{1,2})h(?:(\d{2}))?$/);
        if (h) return (Number(h[1]) % 24) * 60 + Number(h[2] || 0);

        const m = v.match(/^(\d{1,2}):(\d{2})$/);
        if (m) return (Number(m[1]) % 24) * 60 + Number(m[2]);
        return 9 * 60;
      }
      const startMinutes = parseTimeAttr(
        container.getAttribute("data-start") ||
          container.getAttribute("data-start-time") ||
          "9h00",
      );
      const endMinutes = parseTimeAttr(
        container.getAttribute("data-end") ||
          container.getAttribute("data-end-time") ||
          "13h00",
      );
      container.style.position = container.style.position || "relative";
      const svgEl = container.querySelector("svg");
      const kgEl = document.createElement("div");
      kgEl.className = "kg-overlay";
      kgEl.textContent = "0 kg";
      Object.assign(kgEl.style, {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "18px",
        fontSize: "48px",
        fontWeight: "700",
        color: "#fff",
        opacity: "0.06",
        pointerEvents: "none",
        zIndex: "1",
        whiteSpace: "nowrap",
      });
      const timeEl = document.createElement("div");
      timeEl.className = "time-overlay";
      Object.assign(timeEl.style, {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "62px",
        fontSize: "20px",
        fontWeight: "600",
        color: "#fff",
        opacity: "0.06",
        pointerEvents: "none",
        zIndex: "1",
        whiteSpace: "nowrap",
      });
      if (svgEl) {
        svgEl.style.position = "relative";
        svgEl.style.zIndex = "2";
      }
      container.insertBefore(kgEl, svgEl);
      container.insertBefore(timeEl, svgEl);

      // state
      const length = Math.max(0, pathLen);
      pathEl.style.strokeDasharray = `${length} ${length}`;
      pathEl.style.strokeDashoffset = String(length);
      let progress = 0,
        targetProgress = 0,
        rafId = null;
      // index manually shown by click (prevent animate loop from immediately hiding it)
      let manualShownIndex = -1;
      // short-lived lock to avoid animation overwriting manual click selection
      let manualLock = false;
      let manualLockTimer = null;
      const EASE = 0.05,
        WHEEL_DIV = 2000,
        KEY_INC = 0.03;
      const encountered = new Array(pointFractions.length).fill(false);
      // track which point is currently shown in the info panel
      let currentShownIndex = -1;

      function showPointInfo(i) {
        const meta = pointMetas[i] || {};
        // remove show class so we can restart animation
        try {
          infoPanel.classList.remove("show");
        } catch (e) {}

        // update content first
        infoTitle.textContent = meta.name || "";
        infoCoords.textContent = meta.coords || "";
        infoDesc.textContent = meta.description || "";
        if (meta.image) {
          infoImg.src = meta.image;
          infoImg.style.display = "block";
        } else {
          infoImg.style.display = "none";
        }

        // force reflow so transitions restart with new content
        try {
          void infoPanel.offsetWidth;
        } catch (e) {}

        // re-add show after a tiny delay to restart staggered transitions
        try {
          setTimeout(() => {
            try {
              infoPanel.classList.add("show");
            } catch (e) {}
          }, 20);
        } catch (e) {}

        currentShownIndex = i;
      }
      function hidePointInfo() {
        try {
          infoPanel.classList.remove("show");
        } catch (e) {}
        infoTitle.textContent = "";
        infoCoords.textContent = "";
        infoDesc.textContent = "";
        infoImg.style.display = "none";
        currentShownIndex = -1;
      }

      function animateProgress() {
        const diff = targetProgress - progress;
        if (Math.abs(diff) < 0.0005) {
          progress = targetProgress;
          pathEl.style.strokeDashoffset = String(length * (1 - progress));
          rafId = null;
        } else {
          progress = progress + diff * EASE;
          pathEl.style.strokeDashoffset = String(length * (1 - progress));
          rafId = requestAnimationFrame(animateProgress);
        } // kg/time
        try {
          kgEl.textContent = Math.round(TOTAL_KG * progress) + " kg";
          const mins = Math.round(
            startMinutes + (endMinutes - startMinutes) * progress,
          );
          timeEl.textContent =
            String(Math.floor(mins / 60)).padStart(2, "0") +
            "h" +
            String(mins % 60).padStart(2, "0");
        } catch (e) {}
        for (let i = 0; i < pointFractions.length; i++) {
          const pf = pointFractions[i];
          const el = svgPoints[i];
          if (!encountered[i] && progress >= pf) {
            encountered[i] = true;
            el.classList.add("filled");
            const meta = pointMetas[i] || { index: i, name: "", fraction: pf };
            container.dispatchEvent(
              new CustomEvent("map:pointEncountered", { detail: meta }),
            );
            if (typeof window.onMapPointEncountered === "function")
              window.onMapPointEncountered(meta);
            // only show programmatically if user hasn't manually selected a different point
            if (!manualLock || manualShownIndex === i) {
              showPointInfo(i);
              // if we naturally encountered the point after animation, clear manual override
              if (manualShownIndex === i) manualShownIndex = -1;
            }
          }
          if (encountered[i] && progress < pf) {
            // if the user manually opened this point by clicking, keep it shown until the manual lock expires
            if (
              currentShownIndex === i &&
              manualShownIndex === i &&
              manualLock
            ) {
              // keep shown
            } else {
              encountered[i] = false;
              el.classList.remove("filled");
              // if the info panel is currently showing this point, hide it
              if (currentShownIndex === i) hidePointInfo();
            }
          }
        }
      }

      function setTarget(p) {
        targetProgress = clamp(p);
        if (!rafId) rafId = requestAnimationFrame(animateProgress);
      }

      function findOccurrencesForPoint(el) {
        const cx = parseFloat(el.getAttribute("cx")),
          cy = parseFloat(el.getAttribute("cy"));
        const occ = [];
        // increase threshold and sampling density to improve detection
        const thr = 22,
          thr2 = thr * thr;
        const step = Math.max(1, Math.floor(pathLen / 800));
        let inMatch = false,
          matchStart = 0;
        for (let l = 0; l <= pathLen; l += step) {
          const p = pathEl.getPointAtLength(l);
          const dx = p.x - cx,
            dy = p.y - cy,
            d2 = dx * dx + dy * dy;
          if (d2 <= thr2) {
            if (!inMatch) {
              inMatch = true;
              matchStart = l;
            }
          } else {
            if (inMatch) {
              occ.push((matchStart + l) / 2 / pathLen);
              inMatch = false;
            }
          }
        }
        if (inMatch) occ.push((matchStart + pathLen) / 2 / pathLen);
        if (!occ.length) return [pointFractions[svgPoints.indexOf(el)] || 0];
        return Array.from(new Set(occ.map((v) => Number(v.toFixed(6))))).sort(
          (a, b) => a - b,
        );
      }

      svgPoints.forEach((el, idx) => {
        // accessibility: behave like a button (keyboard + screen readers)
        try {
          el.setAttribute("role", "button");
          el.setAttribute("tabindex", "0");
          el.setAttribute("fill", "transparent");
          el.style.pointerEvents = "auto";
        } catch (e) {}

        el.addEventListener("click", (ev) => {
          ev.stopPropagation();
          const occ = findOccurrencesForPoint(el);
          let target = occ.find((f) => f > progress + 0.0001);
          if (typeof target === "undefined") target = occ[0];
          // set animation target
          setTarget(target);
          // show info immediately and mark filled; avoid direct style.transform changes
          try {
            encountered[idx] = true;
            el.classList.add("filled");
            // mark manual override so animateProgress won't hide the panel immediately
            try {
              manualShownIndex = idx;
              manualLock = true;
              if (manualLockTimer) clearTimeout(manualLockTimer);
              // bring the info panel to front so the user sees it immediately
              try {
                infoPanel.style.pointerEvents = "auto";
                infoPanel.style.zIndex = "20";
              } catch (e) {}
              manualLockTimer = setTimeout(() => {
                manualLock = false;
                manualShownIndex = -1;
                manualLockTimer = null;
                try {
                  infoPanel.style.pointerEvents = "none";
                  infoPanel.style.zIndex = "1";
                } catch (e) {}
              }, 1500);
            } catch (e) {}
            showPointInfo(idx);
            // move focus to the element for keyboard users
            try {
              el.focus();
            } catch (e) {}
          } catch (e) {}
        });

        // keyboard activation (Enter / Space)
        el.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            el.click();
          }
        });
      });

      // manual controls
      const focusSection =
        container.closest(".portrait-section") ||
        document.querySelector("#detail2") ||
        container;
      if (!focusSection.hasAttribute("tabindex"))
        focusSection.setAttribute("tabindex", "0");
      focusSection.style.outline = "none";
      focusSection.addEventListener("mouseenter", () => {
        try {
          focusSection.focus();
        } catch (e) {}
      });
      let manualAttached = false;
      function attachManual() {
        if (manualAttached) return;
        manualAttached = true;
        const onWheel = (e) => {
          if (document.activeElement !== focusSection) return;
          const delta = e.deltaY || 0;
          if (!delta) return;
          const atBottomNow =
            window.innerHeight +
              (window.pageYOffset || document.documentElement.scrollTop) >=
            document.documentElement.scrollHeight - 5;
          if (!atBottomNow) return;
          const inc = Math.abs(delta) / WHEEL_DIV;
          if (delta > 0) {
            setTarget(targetProgress + inc);
            e.preventDefault();
          } else {
            if (progress <= 0.002 && targetProgress <= 0.002) return;
            setTarget(targetProgress - inc);
          }
        };
        const onKey = (e) => {
          if (document.activeElement !== focusSection) return;
          if (e.key === "ArrowDown" || e.key === "PageDown") {
            setTarget(targetProgress + KEY_INC);
            e.preventDefault();
          } else if (e.key === "ArrowUp" || e.key === "PageUp") {
            setTarget(targetProgress - KEY_INC);
            e.preventDefault();
          }
        };
        focusSection.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("keydown", onKey);
        const checkDone = setInterval(() => {
          if (progress >= 1 || targetProgress >= 1) {
            focusSection.removeEventListener("wheel", onWheel);
            window.removeEventListener("keydown", onKey);
            manualAttached = false;
            clearInterval(checkDone);
          }
        }, 300);
      }
      focusSection.addEventListener("focus", attachManual);

      const onScrollCheck = () => {
        const atBottomNow =
          window.innerHeight +
            (window.pageYOffset || document.documentElement.scrollTop) >=
          document.documentElement.scrollHeight - 5;
        if (!atBottomNow) return;
        if (
          focusSection.matches(":hover") ||
          document.activeElement === focusSection
        ) {
          attachManual();
          window.removeEventListener("scroll", onScrollCheck);
        }
      };

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.intersectionRatio > 0.5) {
              window.addEventListener("scroll", onScrollCheck);
              onScrollCheck();
              if (!window.__mapRewindAttached) {
                window.__mapRewindAttached = true;
                let lastScrollY =
                  window.pageYOffset || document.documentElement.scrollTop;
                const onGlobalRewind = () => {
                  const y =
                    window.pageYOffset || document.documentElement.scrollTop;
                  const delta = y - lastScrollY;
                  if (delta < 0) {
                    const rect = container.getBoundingClientRect();
                    const visible =
                      rect.top < window.innerHeight && rect.bottom > 0;
                    if (visible) {
                      const inc = Math.abs(delta) / 800;
                      setTarget(targetProgress - inc);
                    }
                  }
                  lastScrollY = y;
                };
                window.addEventListener("scroll", onGlobalRewind);
                const remover = new IntersectionObserver((es) => {
                  es.forEach((ee) => {
                    if (!ee.isIntersecting) {
                      window.removeEventListener("scroll", onGlobalRewind);
                      window.__mapRewindAttached = false;
                      remover.disconnect();
                    }
                  });
                });
                remover.observe(container);
              }
            }
          });
        },
        { threshold: [0.25, 0.5, 0.75] },
      );

      obs.observe(container);

      // no-op mouseenter hooks for future tooltip
      svgPoints.forEach((c) => {
        c.addEventListener("mouseenter", () => {});
      });
    }

    // expose initializer
    window.initMapParcours = renderSVGFromGeoJSON;

    // auto init if detail visible
    if (
      document.querySelector("#detail2") &&
      document.querySelector("#detail2").offsetParent !== null
    )
      renderSVGFromGeoJSON();
    document.querySelectorAll(".portrait-section").forEach((section) => {
      section.addEventListener("click", function () {
        const target = this.getAttribute("data-target");
        if (target === "#detail2") setTimeout(renderSVGFromGeoJSON, 120);
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
