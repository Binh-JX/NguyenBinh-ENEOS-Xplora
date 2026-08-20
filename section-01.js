/* =====================================================
   SECTION 01 — THE THREE-CLIP CINEMATIC JOURNEY
   section-01.js

   Sequences Clip-01.mp4 -> Clip-02.mp4 -> Clip-3.mp4 with
   crossfades and timed text overlays, exposes manual controls
   via the progress ticks, and degrades gracefully if any clip
   is missing (e.g. before the mp4 files are added to the repo).

   Filenames are intentionally exact and must not be renamed:
     Clip-01.mp4, Clip-02.mp4, Clip-3.mp4
===================================================== */

(function () {
    "use strict";

    const ACTS = [
        {
            key: "earth",
            src: "Clip-01.mp4",
            color: "var(--act-earth)",
            eyebrow: "Clip 01 — Earth Seen From Above",
            headline: "WHAT WE SEE",
            subline: "A view from orbit: coastlines, weather, the shape of the planet as data and as home.",
            journeyUpTo: 1 // reveals EARTH -> HUMANITY
        },
        {
            key: "pulse",
            src: "Clip-02.mp4",
            color: "var(--act-pulse)",
            eyebrow: "Clip 02 — Felt From Within",
            headline: "WHAT WE CANNOT SEE",
            subline: "Beneath the surface: the pulse of the Earth, and of the people who study it.",
            journeyUpTo: 3 // reveals EARTH PULSE -> HORIZON
        },
        {
            key: "beyond",
            src: "Clip-3.mp4",
            color: "var(--act-beyond)",
            eyebrow: "Clip 03 — Beyond",
            headline: "WHAT COMES NEXT",
            subline: "From horizon to orbit to what lies past it — the journey continues.",
            journeyUpTo: 5 // reveals SPACE -> BEYOND
        }
    ];

    const JOURNEY_STEPS = ["EARTH", "HUMANITY", "EARTH PULSE", "HORIZON", "SPACE", "BEYOND"];

    function init() {
        const root = document.getElementById("section-01");
        if (!root) return;

        const stage = root.querySelector(".s01-stage");
        const videos = Array.from(root.querySelectorAll(".s01-clip"));
        const fallbacks = Array.from(root.querySelectorAll(".s01-clip-fallback"));
        const eyebrowEl = root.querySelector(".s01-act-label");
        const headlineEl = root.querySelector(".s01-headline");
        const sublineEl = root.querySelector(".s01-subline");
        const journeyEl = root.querySelector(".s01-journey");
        const ticks = Array.from(root.querySelectorAll(".s01-tick"));
        const soundToggle = root.querySelector(".s01-sound-toggle");

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const missingMedia = new Set();
        let currentIndex = 0;
        let userMuted = true;
        let advanceTimer = null;

        // Build journey trail once
        if (journeyEl) {
            journeyEl.innerHTML = JOURNEY_STEPS.map((step, i) => {
                const isFinal = i === JOURNEY_STEPS.length - 1;
                return `<span data-step="${i}"${isFinal ? ' class="is-final"' : ""}>${step}</span>`;
            }).join("");
        }

        function setActiveVisible(visible) {
            root.setAttribute("data-active-visible", visible ? "true" : "false");
        }

        function updateJourney(actIndex) {
            if (!journeyEl) return;
            const upTo = ACTS[actIndex].journeyUpTo;
            journeyEl.querySelectorAll("span").forEach((span) => {
                const step = Number(span.getAttribute("data-step"));
                span.classList.toggle("is-reached", step <= upTo);
            });
        }

        function updateTicks(actIndex) {
            ticks.forEach((tick, i) => {
                tick.setAttribute("aria-current", i === actIndex ? "true" : "false");
                tick.classList.toggle("is-complete", i < actIndex);
                tick.style.setProperty("--fill", i === actIndex ? "100%" : i < actIndex ? "100%" : "0%");
            });
        }

        function showFallback(actIndex, show) {
            fallbacks.forEach((fb, i) => {
                fb.classList.toggle("is-current-act", i === actIndex);
                fb.classList.toggle("is-active", i === actIndex && show);
            });
        }

        function goToAct(actIndex, { autoplay = true } = {}) {
            if (actIndex < 0 || actIndex >= ACTS.length) return;
            currentIndex = actIndex;
            const act = ACTS[actIndex];

            // text swap
            setActiveVisible(false);
            window.setTimeout(() => {
                if (eyebrowEl) eyebrowEl.textContent = act.eyebrow;
                if (headlineEl) headlineEl.textContent = act.headline;
                if (sublineEl) sublineEl.textContent = act.subline;
                setActiveVisible(true);
            }, reduceMotion ? 0 : 250);

            root.style.setProperty("--act-current", act.color);
            updateJourney(actIndex);
            updateTicks(actIndex);

            videos.forEach((v, i) => {
                v.classList.toggle("is-active", i === actIndex);
                v.muted = userMuted;
                if (i === actIndex && !missingMedia.has(i)) {
                    if (autoplay && !reduceMotion) {
                        const playPromise = v.play();
                        if (playPromise && playPromise.catch) {
                            playPromise.catch(() => {
                                /* autoplay blocked — poster frame remains visible */
                            });
                        }
                    }
                } else {
                    v.pause();
                }
            });

            const hasMedia = !missingMedia.has(actIndex);
            root.setAttribute("data-media", hasMedia ? "ok" : "missing");
            showFallback(actIndex, !hasMedia);

            if (advanceTimer) window.clearTimeout(advanceTimer);
            // If this clip's file is missing, still advance the narrative on a timer
            // so the section doesn't stall while assets are pending upload.
            if (!hasMedia && autoplay && !reduceMotion) {
                advanceTimer = window.setTimeout(() => advance(), 6000);
            }
        }

        function advance() {
            const next = currentIndex + 1;
            if (next < ACTS.length) {
                goToAct(next);
            } else {
                // Hold on BEYOND: loop the final clip quietly rather than
                // restarting the whole journey.
                const lastVideo = videos[videos.length - 1];
                if (lastVideo && !missingMedia.has(videos.length - 1)) {
                    lastVideo.loop = true;
                }
            }
        }

        videos.forEach((v, i) => {
            v.addEventListener("ended", () => {
                if (i === currentIndex) advance();
            });
            v.addEventListener("error", () => {
                missingMedia.add(i);
                if (i === currentIndex) {
                    root.setAttribute("data-media", "missing");
                    showFallback(i, true);
                    if (!reduceMotion) advanceTimer = window.setTimeout(() => advance(), 6000);
                }
            });
        });

        ticks.forEach((tick, i) => {
            tick.addEventListener("click", () => {
                if (advanceTimer) window.clearTimeout(advanceTimer);
                goToAct(i);
            });
        });

        if (soundToggle) {
            soundToggle.addEventListener("click", () => {
                userMuted = !userMuted;
                videos.forEach((v) => { v.muted = userMuted; });
                soundToggle.textContent = userMuted ? "Sound off" : "Sound on";
                soundToggle.setAttribute("aria-pressed", userMuted ? "false" : "true");
            });
        }

        // Kick off
        goToAct(0, { autoplay: !reduceMotion });
        if (reduceMotion) setActiveVisible(true);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
