"use strict";
(() => {
var exports = {};
exports.id = 5216;
exports.ids = [5216];
exports.modules = {

/***/ 8344:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gifsEndpoint)
/* harmony export */ });
const fallbackGifs = [
    {
        id: "gif-wave",
        src: "https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif",
        alt: "GIF salut",
        type: "image/gif"
    },
    {
        id: "gif-happy",
        src: "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",
        alt: "GIF heureux",
        type: "image/gif"
    },
    {
        id: "gif-laugh",
        src: "https://media.giphy.com/media/10JhviFuU2gWD6/giphy.gif",
        alt: "GIF rire",
        type: "image/gif"
    },
    {
        id: "gif-love",
        src: "https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif",
        alt: "GIF amour",
        type: "image/gif"
    },
    {
        id: "gif-dance",
        src: "https://media.giphy.com/media/8m4R4pvViWtRpgj1jH/giphy.gif",
        alt: "GIF danse",
        type: "image/gif"
    },
    {
        id: "gif-thanks",
        src: "https://media.giphy.com/media/3oEdva9BUHPIs2SkGk/giphy.gif",
        alt: "GIF merci",
        type: "image/gif"
    }
];
function getGifResult(item) {
    const src = item.images?.fixed_width?.url ?? item.images?.downsized_medium?.url ?? item.images?.original?.url;
    if (!src) return null;
    return {
        id: item.id,
        src,
        alt: item.title?.trim() || "GIF GIPHY",
        type: "image/gif"
    };
}
async function gifsEndpoint(req, res) {
    const query = typeof req.query.query === "string" ? req.query.query.trim() : "";
    const category = typeof req.query.category === "string" ? req.query.category.trim() : "trending";
    const offset = Math.max(0, parseInt(typeof req.query.offset === "string" ? req.query.offset : "0", 10) || 0);
    const limit = Math.min(50, Math.max(12, parseInt(typeof req.query.limit === "string" ? req.query.limit : "24", 10) || 24));
    const apiKey = process.env.Api ?? process.env.GIPHY_API_KEY;
    if (!apiKey) {
        res.setHeader("Cache-Control", "no-store");
        res.status(200).json({
            gifs: offset === 0 ? fallbackGifs : [],
            hasMore: false
        });
        return;
    }
    const endpoint = query ? "search" : category === "trending" ? "trending" : "search";
    const params = new URLSearchParams({
        api_key: apiKey,
        limit: String(limit),
        offset: String(offset),
        rating: "pg-13",
        lang: "fr"
    });
    if (query) params.set("q", query);
    else if (endpoint === "search") params.set("q", category);
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/${endpoint}?${params.toString()}`);
        if (!response.ok) {
            res.status(200).json({
                gifs: offset === 0 ? fallbackGifs : [],
                hasMore: false
            });
            return;
        }
        const payload = await response.json();
        const gifs = (payload.data ?? []).map(getGifResult).filter((gif)=>!!gif);
        res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=600");
        res.status(200).json({
            gifs,
            hasMore: gifs.length >= limit
        });
    } catch  {
        res.status(200).json({
            gifs: offset === 0 ? fallbackGifs : [],
            hasMore: false
        });
    }
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8344));
module.exports = __webpack_exports__;

})();