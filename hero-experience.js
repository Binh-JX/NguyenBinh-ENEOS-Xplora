/* =====================================================
   HERO EXPERIENCE — hero-experience.js

   Runs the one-shot sequence: YEARS BEHIND (five memory photographs,
   dissolving into one another) → NOW (a quiet held breath) → FORWARD
   (wordless movement toward BEYOND) → reveal the four hub portals.

   This never loops back to the first memory — per the approved
   design, the Hero is a journey, not a carousel. Timings live in one
   place (TIMING) so they're easy to tune without touching the logic.
===================================================== */

(function () {
    "use strict";

    const TIMING = {
        memoryHold: 3400,       // ms each photograph stays the primary focus
        memoryCrossfade: 2400,  // ms overlap while dissolving to the next
        nowHold: 1800,          // ms of quiet stillness before moving forward
        forwardHold: 4200,      // ms before the hub portals are revealed
    };

    const REDUCED_TIMING = {
        memoryHold: 1500,
        memoryCrossfade: 900,
        nowHold: 700,
        forwardHold: 1200,
    };

    function init() {
        const section = document.querySelector("[data-hero]");
        if (!section) return;

        const frames = Array.from(section.querySelectorAll("[data-hero-frame]"));
        const nowLayer = section.querySelector("[data-hero-now]");
        const forwardLayer = section.querySelector("[data-hero-forward]");
        const hubBox = section.querySelector("[data-hero-hubs]");
        const captions = {
            years: section.querySelector('[data-hero-caption="years"]'),
            now: section.querySelector('[data-hero-caption="now"]'),
            border: section.querySelector('[data-hero-caption="border"]'),
            beyond: section.querySelector('[data-hero-caption="beyond"]'),
        };

        if (!frames.length) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const t = reduceMotion ? REDUCED_TIMING : TIMING;

        // Only now do we opt into the "hidden until revealed" hub
        // treatment — if anything above failed, the hubs stay visible
        // via the plain CSS default.
        section.classList.add("is-sequenced");

        let cancelled = false;
        section.addEventListener("hero:teardown", () => { cancelled = true; }, { once: true });

        runSequence(frames, nowLayer, forwardLayer, hubBox, captions, t, reduceMotion, () => cancelled);
    }

    async function runSequence(frames, nowLayer, forwardLayer, hubBox, captions, t, reduceMotion, isCancelled) {
        // YEARS BEHIND — dissolve through the memory field
        showCaption(captions.years);
        frames[0].classList.add("is-active");

        for (let i = 1; i < frames.length; i++) {
            await wait(t.memoryHold, isCancelled);
            if (isCancelled()) return;
            frames[i].classList.add("is-active");
            await wait(t.memoryCrossfade, isCancelled);
            if (isCancelled()) return;
            frames[i - 1].classList.remove("is-active");
        }

        await wait(t.memoryHold, isCancelled);
        if (isCancelled()) return;
        hideCaption(captions.years);
        frames[frames.length - 1].classList.remove("is-active");

        // NOW — a quiet, still breath
        if (nowLayer) nowLayer.classList.add("is-active");
        showCaption(captions.now);
        await wait(t.nowHold, isCancelled);
        if (isCancelled()) return;
        hideCaption(captions.now);

        // FORWARD — wordless movement, no future scene
        if (forwardLayer) forwardLayer.classList.add("is-active");
        if (nowLayer) nowLayer.classList.remove("is-active");
        await wait(reduceMotion ? 300 : 900, isCancelled);
        if (isCancelled()) return;
        showCaption(captions.border);

        await wait(t.forwardHold, isCancelled);
        if (isCancelled()) return;
        hideCaption(captions.border);
        showCaption(captions.beyond);

        // Settle — reveal the four hub portals. The forward layer's own
        // CSS animation keeps a very slow drift going after this; there
        // is no loop back to the first memory.
        if (hubBox) hubBox.classList.add("is-revealed");
    }

    function showCaption(el) {
        if (el) el.classList.add("is-active");
    }

    function hideCaption(el) {
        if (el) el.classList.remove("is-active");
    }

    function wait(ms, isCancelled) {
        return new Promise((resolve) => {
            const id = setTimeout(resolve, ms);
            if (isCancelled && isCancelled()) {
                clearTimeout(id);
                resolve();
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
