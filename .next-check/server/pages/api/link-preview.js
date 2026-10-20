"use strict";
(() => {
var exports = {};
exports.id = 7734;
exports.ids = [7734];
exports.modules = {

/***/ 4131:
/***/ ((module) => {

module.exports = import("linkpeek");;

/***/ }),

/***/ 5401:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ linkPreviewEndpoint)
/* harmony export */ });
/* harmony import */ var linkpeek__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4131);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([linkpeek__WEBPACK_IMPORTED_MODULE_0__]);
linkpeek__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/* Un même lien est souvent partagé plusieurs fois : on garde le résultat en
   mémoire pour ne pas aller le chercher à chaque fois. */ const cache = new Map();
const CACHE_TTL = 1000 * 60 * 60; // une heure
const CACHE_MAX = 200;
/* On refuse les adresses internes : un utilisateur pourrait coller un lien
   vers le réseau privé pour sonder le serveur. */ function isPublicUrl(value) {
    let parsed;
    try {
        parsed = new URL(value);
    } catch  {
        return false;
    }
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host.endsWith(".local")) return false;
    /* 10.x, 172.16-31.x, 192.168.x, 127.x, 169.254.x */ if (/^(10\.|127\.|192\.168\.|169\.254\.)/.test(host)) return false;
    const private172 = host.match(/^172\.(\d+)\./);
    if (private172 && Number(private172[1]) >= 16 && Number(private172[1]) <= 31) return false;
    return true;
}
async function linkPreviewEndpoint(req, res) {
    if (req.method !== "GET") {
        res.setHeader("Allow", [
            "GET"
        ]);
        res.status(405).json({
            error: "Method Not Allowed"
        });
        return;
    }
    const url = typeof req.query.url === "string" ? req.query.url.trim() : "";
    if (!url || !isPublicUrl(url)) {
        res.status(400).json({
            error: "URL invalide"
        });
        return;
    }
    const cached = cache.get(url);
    if (cached && cached.expiresAt > Date.now()) {
        res.status(200).json(cached.value);
        return;
    }
    try {
        const result = await (0,linkpeek__WEBPACK_IMPORTED_MODULE_0__.preview)(url);
        const value = {
            url,
            title: result.title ?? undefined,
            description: result.description ?? undefined,
            image: result.image ?? undefined,
            favicon: result.favicon ?? undefined,
            siteName: result.siteName ?? undefined
        };
        if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value ?? "");
        cache.set(url, {
            value,
            expiresAt: Date.now() + CACHE_TTL
        });
        res.status(200).json(value);
    } catch  {
        /* Un site sans balises Open Graph, ou injoignable : on répond simplement
       qu'aucun aperçu n'est disponible. */ res.status(200).json({
            url
        });
    }
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5401));
module.exports = __webpack_exports__;

})();