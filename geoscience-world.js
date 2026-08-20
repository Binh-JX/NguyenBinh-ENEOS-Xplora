/* =====================================================
   GEOSCIENCE WORLD — geoscience-world.js

   STATUS: Scene 01 (Intro banner) + Hub Switcher + Scene 02
   (Published Papers) + Scene 03 (Field Trips, awaiting photos) +
   Scene 04 (Affiliations) + Scene 05 (Geology Game, under
   construction) + Scene 06 (Geology AI, under construction).

   Publication data below was pulled directly from Thanh Bình's
   public ResearchGate profile (fetched Aug 19, 2026):
   https://www.researchgate.net/profile/Nguyen-Binh-24
   Titles, journals/types, years, and URLs are real and verified —
   nothing invented. Field trip photos are not yet supplied, so
   Scene 03 renders an honest empty state instead of a placeholder
   gallery, per the site's no-fabrication rule.
===================================================== */

(function () {
    "use strict";

    // Real publication data, verified from ResearchGate. Order
    // follows the profile's own listing (roughly citation-impact /
    // recency order as ResearchGate presents it).
    const papers = [
        {
            title: "The role of mobile shale in forming fold belt anticlines and hydrocarbon accumulations in Sabah Basin, Malaysia",
            meta: "Conference Paper · Aug 2016",
            url: "https://www.researchgate.net/publication/311614032_The_role_of_mobile_shale_in_forming_fold_belt_anticlines_and_hydrocarbon_accumulations_in_Sabah_Basin_Malaysia"
        },
        {
            title: "Compaction of smectite-rich mudstone and its influence on pore pressure in the deepwater Joetsu Basin, Sea of Japan",
            meta: "Marine and Petroleum Geology · Jun 2016",
            url: "https://www.researchgate.net/publication/305393516_Compaction_of_smectite-rich_mudstone_and_its_influence_on_pore_pressure_in_the_deepwater_Joetsu_Basin_Sea_of_Japan"
        },
        {
            title: "Geological Summary of \u201cMETI Joetsu Kaikyu (JX)\u201d",
            meta: "Journal of the Japanese Association for Petroleum Technology · May 2016",
            url: "https://www.researchgate.net/publication/308898989_Geological_Summary_of_METI_Joetsu_Kaikyu_JX"
        },
        {
            title: "The role of fluid pressure and diagenetic cements for porosity preservation in Triassic fluvial reservoirs of the Central Graben, North Sea",
            meta: "AAPG Bulletin · Aug 2013",
            url: "https://www.researchgate.net/publication/276947436_The_role_of_fluid_pressure_and_diagenetic_cements_for_porosity_preservation_in_Triassic_fluvial_reservoirs_of_the_Central_Graben_North_Sea"
        },
        {
            title: "History of Pore Pressure Build Up and Slope Instability in Mud-Dominated Sediments of Ursa Basin, Gulf of Mexico Continental Slope",
            meta: "Book Chapter · Jan 2010",
            url: "https://www.researchgate.net/publication/225236120_History_of_Pore_Pressure_Build_Up_and_Slope_Instability_in_Mud-Dominated_Sediments_of_Ursa_Basin_Gulf_of_Mexico_Continental_Slope"
        },
        {
            title: "Evaporite dissolution and pore fluid pressure as controls on diagenesis in complex fluvial HPHT reservoirs",
            meta: "Article · May 2010",
            url: "https://www.researchgate.net/publication/252974508_Evaporite_dissolution_and_pore_fluid_pressure_as_controls_on_diagenesis_in_complex_fluvial_HPHT_reservoirs"
        },
        {
            title: "Physical properties of the shallow sediments in the Late Pleistocene formations, the Ursa Basin, Gulf of Mexico, and their implications for generation and preservation of shallow overpressures",
            meta: "Marine and Petroleum Geology · Apr 2009",
            url: "https://www.researchgate.net/publication/248516569_Physical_properties_of_the_shallow_sediments_in_the_Late_Pleistocene_formations_the_Ursa_Basin_Gulf_of_Mexico_and_their_implications_for_generation_and_preservation_of_shallow_overpressures"
        },
        {
            title: "A Study on the Generation and Preservation of Shallow Overpressures and the Effects on the Slope Instability in the Ursa Basin, deepwater Gulf of Mexico",
            meta: "Article · Dec 2008",
            url: "https://www.researchgate.net/publication/238531976_A_Study_on_the_Generation_and_Preservation_of_Shallow_Overpressures_and_the_Effects_on_the_Slope_Instability_in_the_Ursa_Basin_deepwater_Gulf_of_Mexico"
        },
        {
            title: "Stress state in the Cuu Long and Nam Con Son basins, offshore Vietnam",
            meta: "Marine and Petroleum Geology · May 2011",
            url: "https://www.researchgate.net/publication/251543544_Stress_state_in_the_Cuu_Long_and_Nam_Con_Son_basins_offshore_Vietnam"
        },
        {
            title: "Present-day stress and pore pressure fields in the Cuu Long and Nam Con Son Basins, offshore Vietnam",
            meta: "Marine and Petroleum Geology · Dec 2007",
            url: "https://www.researchgate.net/publication/232390221_Present-day_stress_and_pore_pressure_fields_in_the_Cuu_Long_and_Nam_Con_Son_Basins_offshore_Vietnam"
        },
        {
            title: "In-situ Stress and Pore Pressure Fields in the North Cuu Long Basin, Offshore Vietnam",
            meta: "Article · Mar 2004",
            url: "https://www.researchgate.net/publication/254514935_In-situ_stress_and_pore_pressure_fields_in_the_North_Cuu_Long_Basin_Offshore_Vietnam"
        },
        {
            title: "Departmental Bulletin Earth Sciences Success in the Complete University Guide",
            meta: "Article",
            url: "https://www.researchgate.net/publication/237785914_Departmental_Bulletin_Earth_Sciences_Success_in_the_Complete_University_Guide"
        }
    ];

    // Field trip photos/videos. Real entries only — this project's
    // no-fabrication rule. Shape:
    // { title, subtitle, image, url, type: "video" | "photo" }
    const fieldTrips = [
        {
            title: "Geological Field Trip — Nagasaki 2022",
            subtitle: "Video",
            image: "https://img.youtube.com/vi/st73k1sXnes/maxresdefault.jpg",
            url: "https://youtu.be/st73k1sXnes",
            type: "video"
        },
        {
            title: "Texas Coastal Processes Field Trip — 2023",
            subtitle: "Photo",
            image: "Field_trip01.JPG",
            type: "photo"
        },
        {
            title: "Texas Coastal Processes Field Trip — 2023",
            subtitle: "Photo",
            image: "Field_trip02.JPG",
            type: "photo"
        },
        {
            title: "Higashi-Matsuura, Karatsu, Saga",
            subtitle: "National Natural Monument, Japan",
            image: "Field_trip04.JPG",
            type: "photo"
        },
        {
            title: "Higashi-Matsuura, Karatsu, Saga",
            subtitle: "National Natural Monument, Japan",
            image: "Field_trip05.JPG",
            type: "photo"
        }
    ];

    // Professional society affiliations — real memberships, verified
    // by Thanh Bình.
    const affiliations = [
        {
            role: "Member",
            org: "Japan Petroleum Technology Association (JAPT / 石油技術協会)",
            caption: "Where energy meets terrain.",
            url: "https://www.japt.org/english/"
        },
        {
            role: "Member",
            org: "SPWLA — Society of Petrophysicists and Well Log Analysts",
            caption: "Reading the earth, one log at a time.",
            url: "https://www.spwla.org/"
        }
    ];

    function renderPapers(root) {
        const track = root.querySelector("[data-papers-track]");
        if (!track) return;

        track.innerHTML = papers
            .map((p) => `
                <a class="gs-paper" href="${p.url}" target="_blank" rel="noopener noreferrer">
                    <span class="gs-paper-title">${p.title}</span>
                    <span class="gs-paper-meta">${p.meta}</span>
                </a>
            `)
            .join("");
    }

    function renderFieldTrips(root) {
        const track = root.querySelector("[data-fieldtrips-track]");
        const emptyState = root.querySelector("[data-fieldtrips-empty]");
        if (!track || !emptyState) return;

        if (!fieldTrips.length) {
            track.hidden = true;
            emptyState.hidden = false;
            return;
        }

        emptyState.hidden = true;
        track.hidden = false;
        track.innerHTML = fieldTrips
            .map((t) => {
                const tag = t.url ? "a" : "div";
                const attrs = t.url ? `href="${t.url}" target="_blank" rel="noopener noreferrer"` : "";
                const bg = t.image ? ` style="background-image:url('${t.image}')"` : "";
                const playIcon = t.type === "video"
                    ? `<span class="gs-trip-play" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7.25" stroke="currentColor" stroke-width="1.2"/><path d="M6.3 4.8l5.2 3.2-5.2 3.2V4.8z" fill="currentColor"/></svg></span>`
                    : "";
                return `
                    <${tag} class="gs-trip" ${attrs}>
                        <div class="gs-trip-visual"${bg}>${playIcon}</div>
                        <span class="gs-trip-title">${t.title}</span>
                        ${t.subtitle ? `<span class="gs-trip-subtitle">${t.subtitle}</span>` : ""}
                    </${tag}>
                `;
            })
            .join("");
    }

    function renderAffiliations(root) {
        const track = root.querySelector("[data-affiliations-track]");
        if (!track) return;

        track.innerHTML = affiliations
            .map((a) => `
                <a class="gs-affiliation" href="${a.url}" target="_blank" rel="noopener noreferrer">
                    <span class="gs-affiliation-role gs-mono">${a.role}</span>
                    <span class="gs-affiliation-org">${a.org}</span>
                    <p class="gs-affiliation-caption">${a.caption}</p>
                    <span class="gs-affiliation-link gs-mono">Visit ↗</span>
                </a>
            `)
            .join("");
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

    function init() {
        const root = document.getElementById("geoscience-world");
        if (!root) return;

        renderPapers(root);
        renderFieldTrips(root);
        renderAffiliations(root);
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
