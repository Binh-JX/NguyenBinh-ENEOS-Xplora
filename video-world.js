/* =====================================================
   VIDEO CREATION WORLD — video-world.js

   Data lives here, separate from markup/CSS, so real videos can be
   added later without touching the rest of the page. Every group
   starts with an empty `videos` array — nothing here fabricates a
   title, thumbnail, or URL that wasn't given. Shares the same
   YouTube channel as Music World (@ThanhBinhNguyen-kg7xr).
===================================================== */

(function () {
    "use strict";

    const videoWorld = {
        title: "VIDEO CREATION",
        tagline: "Cinematic moments, captured and kept.",
        credit: "Every video here is filmed and personally edited by Thanh Bình.",
        theme: {
            red: "#a83a32",
            redBright: "#e2685a",
            steelDeep: "#24262b",
            steelMid: "#34363c",
            void: "#121013"
        },
        youtubeChannel: "https://www.youtube.com/@ThanhBinhNguyen-kg7xr"
    };

    // Four Master-Design-approved categories, now with real YouTube
    // links + confirmed titles from the Creative Director. Thumbnails
    // are pulled automatically from YouTube's own CDN (same
    // maxresdefault → hqdefault fallback strategy as Music World).
    // Sinh Nhật Gia Đình removed per Creative Director: those uploads
    // were taken down by YouTube (contain images of children), so no
    // video content exists for that category — the tab/section were
    // removed rather than left as an empty placeholder.
    const videoGroups = [
        {
            id: "hopLop",
            archivalNote: "Includes archival photos and footage from her university years — material that can no longer be filmed today.",
            videos: [
                {
                    title: "HUMG-Geophysics K31 Oct.2023",
                    image: "https://img.youtube.com/vi/eqIPmBZmLTk/maxresdefault.jpg",
                    imageFallback: "https://img.youtube.com/vi/eqIPmBZmLTk/hqdefault.jpg",
                    youtubeUrl: "https://youtu.be/eqIPmBZmLTk"
                }
            ]
        },
        {
            id: "hoiKhoa",
            archivalNote: "Includes archival photos and footage from her university years — material that can no longer be filmed today.",
            videos: [
                {
                    title: "HUMG-K31 Student Time",
                    image: "https://img.youtube.com/vi/hH_F1O299bo/maxresdefault.jpg",
                    imageFallback: "https://img.youtube.com/vi/hH_F1O299bo/hqdefault.jpg",
                    youtubeUrl: "https://youtu.be/hH_F1O299bo"
                },
                {
                    title: "Hội khoá K31 Mỏ địa chất theo dòng thời gian",
                    image: "https://img.youtube.com/vi/5Hy-6R9R2oA/maxresdefault.jpg",
                    imageFallback: "https://img.youtube.com/vi/5Hy-6R9R2oA/hqdefault.jpg",
                    youtubeUrl: "https://youtu.be/5Hy-6R9R2oA"
                },
                {
                    title: "Hội khoá K31 Mỏ địa chất thời sinh viên",
                    image: "https://img.youtube.com/vi/hvgGbgCFeFc/maxresdefault.jpg",
                    imageFallback: "https://img.youtube.com/vi/hvgGbgCFeFc/hqdefault.jpg",
                    youtubeUrl: "https://youtu.be/hvgGbgCFeFc"
                },
                {
                    title: "Hội khoá 31 Mỏ địa chất 2023",
                    image: "https://img.youtube.com/vi/FIENZNUrOcE/maxresdefault.jpg",
                    imageFallback: "https://img.youtube.com/vi/FIENZNUrOcE/hqdefault.jpg",
                    youtubeUrl: "https://youtu.be/FIENZNUrOcE"
                }
            ]
        },
        {
            id: "duLich",
            videos: [
                {
                    title: "The Trip to Celebrate 2024 Year End & New Year 2025",
                    image: "https://img.youtube.com/vi/ZW_xN9tGO0Q/maxresdefault.jpg",
                    imageFallback: "https://img.youtube.com/vi/ZW_xN9tGO0Q/hqdefault.jpg",
                    youtubeUrl: "https://youtu.be/ZW_xN9tGO0Q"
                },
                {
                    title: "Golden Week Trip P3-5-7 2025",
                    image: "https://img.youtube.com/vi/6HWbH78ljvY/maxresdefault.jpg",
                    imageFallback: "https://img.youtube.com/vi/6HWbH78ljvY/hqdefault.jpg",
                    youtubeUrl: "https://youtu.be/6HWbH78ljvY"
                },
                {
                    title: "2025 Golden Week Trip — When Friends Are Destinations",
                    image: "https://img.youtube.com/vi/rNoIchA-r7M/maxresdefault.jpg",
                    imageFallback: "https://img.youtube.com/vi/rNoIchA-r7M/hqdefault.jpg",
                    youtubeUrl: "https://youtu.be/rNoIchA-r7M"
                },
                {
                    title: "Chạy Marathon Tiếp Sức",
                    image: "https://img.youtube.com/vi/6r7QVdUUuCA/maxresdefault.jpg",
                    imageFallback: "https://img.youtube.com/vi/6r7QVdUUuCA/hqdefault.jpg",
                    youtubeUrl: "https://youtu.be/6r7QVdUUuCA"
                }
            ]
        }
    ];

    // Group-level fallback labels — used only when a video's own
    // `title` is still null (pending a real caption from Thanh Bình).
    const GROUP_FALLBACK_LABEL = {
        hopLop: "Họp Lớp",
        hoiKhoa: "Hội Khóa",
        duLich: "Du Lịch & Thể Thao"
    };

    function init() {
        const root = document.getElementById("video-world");
        if (!root) return;

        renderGroups(root, videoGroups);
        renderChannelLinks(root, videoWorld.youtubeChannel);
        renderVideoCredit(root, videoWorld.credit);
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

    // Same maxresdefault.jpg fallback strategy as Music World: YouTube
    // silently serves a tiny 120x90 grey placeholder instead of a 404
    // when a maxres thumbnail doesn't exist for a given upload.
    function setBackgroundPhoto(el, image, imageFallback) {
        if (!el || !image) return;
        const apply = (url) => {
            el.style.setProperty("--vw-bg", `url("${url}")`);
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

    function renderVideoCredit(root, credit) {
        const el = root.querySelector("[data-video-credit]");
        if (!el) return;
        if (credit) {
            el.textContent = credit;
            el.hidden = false;
        } else {
            el.hidden = true;
        }
    }

    function renderGroups(root, groups) {
        groups.forEach((group) => {
            const track = root.querySelector(`[data-group-track="${group.id}"]`);
            const emptyState = root.querySelector(`[data-group-empty="${group.id}"]`);
            const noteEl = root.querySelector(`[data-group-note="${group.id}"]`);

            if (noteEl) {
                if (group.archivalNote) {
                    noteEl.textContent = group.archivalNote;
                    noteEl.hidden = false;
                } else {
                    noteEl.hidden = true;
                }
            }

            if (!track || !emptyState) return;

            if (!group.videos.length) {
                track.hidden = true;
                emptyState.hidden = false;
                return;
            }

            emptyState.hidden = true;
            track.hidden = false;
            track.innerHTML = group.videos
                .map((w, i) => {
                    const href = w.youtubeUrl || null;
                    const tag = href ? "a" : "div";
                    const attrs = href
                        ? `href="${href}" target="_blank" rel="noopener noreferrer"`
                        : "";
                    const fallbackLabel = GROUP_FALLBACK_LABEL[group.id] || "Video";
                    const displayTitle = w.title || `${fallbackLabel} — ${i + 1}`;
                    return `
                        <${tag} class="vw-work" style="--i:${i}" ${attrs}>
                            <div class="vw-work-visual" data-work-visual="${group.id}-${i}" aria-hidden="true"></div>
                            <div class="vw-work-meta">
                                <span class="vw-work-title">${displayTitle}</span>
                                ${w.subtitle ? `<span class="vw-work-subtitle">${w.subtitle}</span>` : ""}
                            </div>
                        </${tag}>
                    `;
                })
                .join("");

            group.videos.forEach((w, i) => {
                if (!w.image) return;
                const visualEl = track.querySelector(`[data-work-visual="${group.id}-${i}"]`);
                setBackgroundPhoto(visualEl, w.image, w.imageFallback);
            });
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
                if (!targetEl) return;
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
