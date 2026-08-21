/* =====================================================
   VISIT COUNTER — visit-counter.js

   One combined counter for the whole homepage (single language,
   single key). Uses CountAPI (countapi.mileshilliard.com) — free,
   no signup, no API key. It's a shared public service with no
   accounts/namespaces, so the key below is written to be unlikely
   to collide with anyone else's counter; don't shorten it to
   something generic like "home" or "visits".

   Counts once per browser tab per visit (via sessionStorage) so
   repeated reloads in the same tab don't inflate the number —
   this still counts page loads, not unique people, which is the
   best a no-backend static site can do without real analytics.

   If the service is ever slow, down, or blocked, the element is
   simply left empty — never shows a broken or stuck counter.
===================================================== */

(function () {
    "use strict";

    var COUNTER_KEY = "thanhbinh-nguyen-personal-hub-2026";
    var SESSION_FLAG = "tb-visit-counted";

    var el = document.querySelector("[data-visit-count]");
    if (!el) return;

    var alreadyCountedThisSession = false;
    try {
        alreadyCountedThisSession = sessionStorage.getItem(SESSION_FLAG) === "1";
    } catch (e) {
        // Storage unavailable (private browsing, etc.) — fine, just
        // means this tab may count more than once per session.
    }

    var endpoint = alreadyCountedThisSession
        ? "https://countapi.mileshilliard.com/api/v1/get/" + COUNTER_KEY
        : "https://countapi.mileshilliard.com/api/v1/hit/" + COUNTER_KEY;

    fetch(endpoint)
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (!data || typeof data.value === "undefined" || data.value === null) return;
            var padded = String(data.value).padStart(6, "0");
            el.textContent = padded + " VISITS";

            if (!alreadyCountedThisSession) {
                try { sessionStorage.setItem(SESSION_FLAG, "1"); } catch (e) {}
            }
        })
        .catch(function () {
            // Fail silently. No error text, no "undefined VISITS".
        });
})();
