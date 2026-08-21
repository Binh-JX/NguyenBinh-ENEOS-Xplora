/* =====================================================
   MUSIC & MV WORLD — music-world.js

   Data lives here, separate from markup/CSS, so new works
   can be added without touching the rest of the page.
   Nothing here fabricates a URL or asset that wasn't given —
   unknown fields are explicit `null` PLACEHOLDERs.
===================================================== */

(function () {
    "use strict";

    const musicWorld = {
        title: "MUSIC & MV",
        tagline: "Stories told through sound, image and emotion.",
        theme: {
            gold: "#c9a24a",
            goldBright: "#eccd7e",
            purpleDeep: "#241329",
            purpleMid: "#43284f",
            void: "#0a0709"
        },
        youtubeChannel: "https://www.youtube.com/@ThanhBinhNguyen-kg7xr"
    };

    // Add future works using this exact shape. `image: null` and
    // `youtubeUrl: null` render as clearly-marked placeholders /
    // safe fallbacks — replace with real values when available.
    const musicWorks = [
        {
            title: "BIỂN HÁT CHIỀU NAY",
            japaneseTitle: "夕暮れに歌う海",
            image: "music-banner.jpg", // real thumbnail, confirmed via YouTube Studio
            imageFallback: "music-banner.jpg", // used if maxres isn't available for this video
            duration: "4:21",
            youtubeUrl: "https://youtu.be/ku110OHK_FY", // confirmed via YouTube Studio: "BIỂN HÁT CHIỀU NAY | 夕暮れに歌う海 | Thanh Bình Cover"
            locations: ["Ito", "Jogasaki", "Kadowaki Cape", "Atami", "Lý Sơn Island", "Thiên Cầm", "Bình Thuận"],
            description: "A journey following the call of the sea — from Japan to Vietnam, from morning light to sunset and night.",
            credit: "Vocals & Japanese lyric translation: Thanh Bình. First Vietnamese–Japanese bilingual performance of this song.",
            featured: true
        },
        {
            title: "BIỂN HÁT CHIỀU NAY",
            subtitle: "Karaoke Ver. · Lời Việt–Nhật · 4:20",
            image: "music-banner.jpg",
            imageFallback: "music-banner.jpg",
            youtubeUrl: "https://youtu.be/Ki7iV8GAhZM",
            description: "Bilingual Vietnamese–Japanese karaoke version, built on the original MV footage.",
            credit: "Japanese lyric translation: Thanh Bình, from her original bilingual vocal performance."
        },
        {
            title: "MONG MANH TÌNH VỀ",
            subtitle: "儚い愛が戻る · Shiawase Band",
            image: "mong-manh-tinh-ve-cover.jpg", // real cover image, provided directly (MV hosted on another channel)
            youtubeUrl: "https://youtu.be/sfbcAPVIiRg",
            description: null, // no description provided yet
            credit: "Vocals & Japanese lyric translation: Thanh Bình. First Vietnamese–Japanese bilingual performance of this song."
        },
        {
            title: "ĐÔI BỜ",
            subtitle: "Cover · CLB Shiawase",
            image: "doi-bo-cover.jpg", // real cover image, provided directly (MV hosted on another channel)
            youtubeUrl: "https://youtu.be/0x65Zv1Idms",
            description: null, // no description provided yet
            credit: "Vocals & Japanese lyric translation: Thanh Bình. First Vietnamese–Japanese bilingual performance of this song."
        }
        // Next work: { title: "...", subtitle: "...", image: "...", youtubeUrl: "...", description: "..." }
    ];

    function init() {
        const root = document.getElementById("music-world");
        if (!root) return;

        const featured = musicWorks.find((w) => w.featured) || musicWorks[0];
        const others = musicWorks.filter((w) => w !== featured);

        renderFeatured(root, featured, musicWorld.youtubeChannel);
        renderOtherWorks(root, others);
        renderChannelLinks(root, musicWorld.youtubeChannel);
        setupIntroTabs(root);
        setupHubNav();
        setupScrollReveal(root);
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

    // YouTube's maxresdefault.jpg doesn't exist for every upload — when it's
    // missing, YouTube silently serves a tiny 120x90 grey placeholder instead
    // of a 404. Preload and check dimensions so we never show that placeholder;
    // fall back to hqdefault.jpg, which always exists.
    function setBackgroundPhoto(el, image, imageFallback) {
        if (!el || !image) return;
        const apply = (url) => {
            el.style.setProperty("--mv-bg", `url("${url}")`);
            el.classList.add("has-photo");
        };
        const probe = new Image();
        probe.onload = () => {
            if (probe.naturalWidth > 120) {
                apply(image);
            } else if (imageFallback) {
                apply(imageFallback);
            }
        };
        probe.onerror = () => {
            if (imageFallback) apply(imageFallback);
        };
        probe.src = image;
    }

    function renderFeatured(root, work, channelUrl) {
        if (!work) return;
        const titleEl = root.querySelector("[data-mv-title]");
        const jpEl = root.querySelector("[data-mv-jp-title]");
        const descEl = root.querySelector("[data-mv-description]");
        const durationEl = root.querySelector("[data-mv-duration]");
        const locationsEl = root.querySelector("[data-mv-locations]");
        const linkEl = root.querySelector("[data-mv-link]");
        const visualEl = root.querySelector("[data-mv-visual]");
        const creditEl = root.querySelector("[data-mv-credit]");

        if (titleEl) titleEl.textContent = work.title;
        if (jpEl) jpEl.textContent = work.japaneseTitle || "";
        if (descEl) descEl.textContent = work.description || "";
        if (durationEl) durationEl.textContent = work.duration || "";

        if (creditEl) {
            if (work.credit) {
                creditEl.textContent = work.credit;
                creditEl.hidden = false;
            } else {
                creditEl.hidden = true;
            }
        }

        if (locationsEl && Array.isArray(work.locations)) {
            locationsEl.innerHTML = work.locations
                .map((loc) => `<span>${loc}</span>`)
                .join("");
        }

        if (visualEl && work.image) setBackgroundPhoto(visualEl, work.image, work.imageFallback);

        // Prefer the real video URL if/when it's supplied. Never invent one —
        // fall back to the always-valid channel link instead.
        if (linkEl) {
            const target = work.youtubeUrl || channelUrl;
            linkEl.setAttribute("href", target);
            linkEl.setAttribute("target", "_blank");
            linkEl.setAttribute("rel", "noopener noreferrer");
            linkEl.setAttribute(
                "aria-label",
                work.youtubeUrl
                    ? `Watch ${work.title} on YouTube`
                    : `${work.title} — visit the YouTube channel (video link coming soon)`
            );
        }
    }

    function renderOtherWorks(root, others) {
        const track = root.querySelector("[data-works-track]");
        const emptyState = root.querySelector("[data-works-empty]");
        if (!track || !emptyState) return;

        if (!others.length) {
            track.hidden = true;
            emptyState.hidden = false;
            return;
        }

        emptyState.hidden = true;
        track.hidden = false;
        track.innerHTML = others
            .map((w, i) => {
                const href = w.youtubeUrl || null;
                const tag = href ? "a" : "div";
                const attrs = href
                    ? `href="${href}" target="_blank" rel="noopener noreferrer"`
                    : "";
                return `
                    <${tag} class="mw-work" style="--i:${i}" ${attrs}>
                        <div class="mw-work-visual" data-work-visual="${i}" aria-hidden="true"></div>
                        <div class="mw-work-meta">
                            <span class="mw-work-title">${w.title}</span>
                            ${w.subtitle ? `<span class="mw-work-subtitle">${w.subtitle}</span>` : ""}
                            ${w.credit ? `<span class="mw-work-credit">${w.credit}</span>` : ""}
                        </div>
                    </${tag}>
                `;
            })
            .join("");

        others.forEach((w, i) => {
            if (!w.image) return;
            const visualEl = track.querySelector(`[data-work-visual="${i}"]`);
            setBackgroundPhoto(visualEl, w.image, w.imageFallback);
        });
    }

    function renderChannelLinks(root, channelUrl) {
        root.querySelectorAll("[data-channel-link]").forEach((el) => {
            el.setAttribute("href", channelUrl);
            el.setAttribute("target", "_blank");
            el.setAttribute("rel", "noopener noreferrer");
        });
    }

    function setupIntroTabs(root) {
        const tabs = Array.from(root.querySelectorAll("[data-intro-tab]"));
        if (!tabs.length) return;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        tabs.forEach((tab) => {
            tab.addEventListener("click", (event) => {
                const targetId = tab.getAttribute("href");
                const targetEl = targetId && document.querySelector(targetId);
                if (!targetEl) return; // let the browser fall back to normal anchor behaviour
                event.preventDefault();
                tabs.forEach((t) => t.classList.remove("is-active"));
                tab.classList.add("is-active");
                targetEl.scrollIntoView({
                    behavior: reduceMotion ? "auto" : "smooth",
                    block: "start"
                });
            });
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
            { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
        );

        revealEls.forEach((el) => observer.observe(el));
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
