/* =====================================================
   INNOVATION WORLD — innovation-world.js

   THE GALLERY — a horizontal exhibition of how ideas begin.
   Each entry renders as one poster carrying the real slide
   photo for that step of the thinking. This is an exhibit of
   the thinking itself (Innovation Journey), not a project
   portfolio — so posters speak for themselves; no invented
   summary copy is layered on top of what's already on the slide.

   Ideas, in order:
   01 — Geopressure as Energy            (posters 01, 02)
   02 — Self-Healing Materials           (poster 01: "The Problem" — more to follow)
   03 — Biomass to High-Value Minerals   (posters 03a, 03)

   To add another poster to any idea: give it an `img` pointing at
   the slide photo (co-located with this file). Set `comingSoon: true`
   instead of `img` for an idea that has no poster yet.
===================================================== */

(function () {
    "use strict";

    const ideaMeta = {
        1: { label: "IDEA 01 — GEOPRESSURE AS ENERGY" },
        2: { label: "IDEA 02 — SELF-HEALING MATERIALS" },
        3: { label: "IDEA 03 — BIOMASS TO HIGH-VALUE MINERALS" },
    };

    // The exhibit, in order.
    const posters = [
        {
            id: "geopressure-01",
            idea: 1,
            title: "The Geopressure-to-Value Pathway",
            img: "innovation-poster-geopressure-01.jpg",
        },
        {
            id: "geopressure-02",
            idea: 1,
            title: "Five Dimensions of Operational Value",
            img: "innovation-poster-geopressure-02.jpg",
        },
        {
            id: "self-healing-01",
            idea: 2,
            title: "The Problem in Hydrogen Embrittlement",
            img: "innovation-poster-selfhealing-01.jpg",
        },
        {
            id: "biomass-01",
            idea: 3,
            title: "The Next Battery Race",
            img: "innovation-poster-biomass-01.jpg",
        },
        {
            id: "biomass-02",
            idea: 3,
            title: "A New Supply Chain Is Emerging",
            img: "innovation-poster-biomass-02.jpg",
        },
    ];

    function renderPoster(idea, index) {
        const el = document.createElement("article");
        el.className = "iw-poster";
        el.dataset.iwPoster = "";
        el.dataset.idea = String(idea.idea);
        el.id = `poster-${idea.id}`;
        el.setAttribute("role", "group");
        el.setAttribute("aria-roledescription", "slide");
        el.setAttribute("aria-label", `${index + 1} of ${posters.length}: ${idea.title}`);

        const art = document.createElement("div");
        art.className = "iw-poster-art";

        if (idea.comingSoon) {
            art.innerHTML = `
                <div class="iw-poster-soon">
                    <div class="iw-poster-soon-mark" aria-hidden="true"><span></span></div>
                    <p class="iw-poster-soon-text">Poster coming soon</p>
                </div>
            `;
        } else if (idea.img) {
            art.style.setProperty("--poster-img", `url("${idea.img}")`);
            const img = document.createElement("img");
            img.className = "iw-poster-img";
            img.src = idea.img;
            img.alt = idea.title;
            img.loading = "lazy";
            art.appendChild(img);
        }
        el.appendChild(art);

        const copy = document.createElement("div");
        copy.className = "iw-poster-copy";

        const meta = ideaMeta[idea.idea] || { label: "" };
        const indexEl = document.createElement("p");
        indexEl.className = "iw-poster-index";
        indexEl.textContent = `${String(index + 1).padStart(2, "0")} — ${meta.label}`;
        copy.appendChild(indexEl);

        const titleEl = document.createElement("h3");
        titleEl.className = "iw-poster-title";
        titleEl.textContent = idea.title;
        copy.appendChild(titleEl);

        el.appendChild(copy);
        return el;
    }

    function renderIndexButton(idea, index) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "iw-index-btn";
        btn.dataset.index = String(index);
        btn.setAttribute("aria-label", `Go to idea ${index + 1}: ${idea.title}`);
        btn.textContent = String(index + 1).padStart(2, "0");
        return btn;
    }

    function setupGallery(root) {
        const gallery = root.querySelector("[data-iw-gallery]");
        const track = root.querySelector("[data-iw-gallery-track]");
        const indexNav = root.querySelector("[data-iw-gallery-index]");
        if (!gallery || !track || !indexNav) return;

        posters.forEach((idea, i) => {
            track.appendChild(renderPoster(idea, i));
            indexNav.appendChild(renderIndexButton(idea, i));
        });

        const posterEls = Array.from(track.children);
        const indexBtns = Array.from(indexNav.children);

        function setActive(activeIndex) {
            posterEls.forEach((el, i) => el.classList.toggle("is-active", i === activeIndex));
            indexBtns.forEach((btn, i) => btn.classList.toggle("is-active", i === activeIndex));
        }

        // Track which poster is centred using IntersectionObserver
        // against the scroll container itself — works on the x-axis
        // exactly the same way it does vertically.
        let currentIndex = 0;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                        const i = posterEls.indexOf(entry.target);
                        if (i !== -1) {
                            currentIndex = i;
                            setActive(i);
                        }
                    }
                });
            },
            { root: gallery, threshold: [0.6] }
        );
        posterEls.forEach((el) => observer.observe(el));

        function goTo(i) {
            const clamped = Math.max(0, Math.min(posterEls.length - 1, i));
            posterEls[clamped].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }

        indexBtns.forEach((btn) => {
            btn.addEventListener("click", () => goTo(Number(btn.dataset.index)));
        });

        // Vertical mouse-wheel → horizontal scroll, so a plain mouse
        // (not just a trackpad) can move through the gallery too.
        gallery.addEventListener(
            "wheel",
            (event) => {
                if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
                    event.preventDefault();
                    gallery.scrollLeft += event.deltaY;
                }
            },
            { passive: false }
        );

        gallery.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                event.preventDefault();
                goTo(currentIndex + 1);
            } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                goTo(currentIndex - 1);
            }
        });

        // Reduced motion: skip smooth inertial scrolling, snap plainly.
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gallery.style.scrollBehavior = "auto";
        }

        setActive(0);
    }

    function setupHubNav() {
        const nav = document.querySelector("[data-hubnav]");
        if (!nav) return;
        const trigger = nav.querySelector("[data-hubnav-trigger]");
        const menu = nav.querySelector("[data-hubnav-menu]");
        if (!trigger || !menu) return;

        function open() {
            nav.setAttribute("data-open", "true");
            trigger.setAttribute("aria-expanded", "true");
            menu.hidden = false;
            document.addEventListener("click", onOutsideClick);
            document.addEventListener("keydown", onKeydown);
        }

        function close() {
            nav.removeAttribute("data-open");
            trigger.setAttribute("aria-expanded", "false");
            menu.hidden = true;
            document.removeEventListener("click", onOutsideClick);
            document.removeEventListener("keydown", onKeydown);
        }

        function onOutsideClick(event) {
            if (!nav.contains(event.target)) close();
        }

        function onKeydown(event) {
            if (event.key === "Escape") {
                close();
                trigger.focus();
            }
        }

        trigger.addEventListener("click", () => {
            const isOpen = nav.getAttribute("data-open") === "true";
            if (isOpen) close(); else open();
        });
    }

    function setupScrollReveal(root) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const revealEls = Array.from(root.querySelectorAll("[data-reveal]"));

        if (reduceMotion || !("IntersectionObserver" in window)) {
            revealEls.forEach((el) => el.classList.add("is-revealed"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
        );

        revealEls.forEach((el) => observer.observe(el));
    }

    function init() {
        const root = document.getElementById("innovation-world");
        if (!root) return;

        setupGallery(root);
        setupHubNav();
        setupScrollReveal(root);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
