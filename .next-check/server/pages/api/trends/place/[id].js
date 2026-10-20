"use strict";
(() => {
var exports = {};
exports.id = 8735;
exports.ids = [8735];
exports.modules = {

/***/ 2990:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ AUTH)
/* harmony export */ });
const AUTH = {
    headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
};


/***/ }),

/***/ 549:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ placeIdEndpoint)
/* harmony export */ });
/* harmony import */ var _lib_api_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2990);

const fallbackTrends = {
    trends: [],
    location: "Monde entier"
};
async function placeIdEndpoint(req, res) {
    const { id , limit  } = req.query;
    // Twitter's legacy trends API returns 401 when the optional bearer token is
    // missing or expired. Trends are supplementary, so do not break the page
    // when that service is unavailable.
    if (!process.env.TWITTER_BEARER_TOKEN) {
        res.status(200).json(fallbackTrends);
        return;
    }
    try {
        const response = await fetch(`https://api.twitter.com/1.1/trends/place.json?id=${id}`, _lib_api_auth__WEBPACK_IMPORTED_MODULE_0__/* .AUTH */ .B);
        if (!response.ok) {
            res.status(200).json(fallbackTrends);
            return;
        }
        const rawData = await response.json();
        if ("errors" in rawData || !Array.isArray(rawData) || !rawData[0]) {
            res.status(200).json(fallbackTrends);
            return;
        }
        const data = {
            trends: rawData[0].trends,
            location: rawData[0].locations[0].name
        };
        const limitParam = limit ? parseInt(limit, 10) : null;
        let formattedTrends = data.trends.filter(({ tweet_volume  })=>tweet_volume);
        formattedTrends = formattedTrends.map(({ url , ...rest })=>({
                ...rest,
                url: url.replace(/http.*.com/, "")
            })).sort((a, b)=>b.tweet_volume - a.tweet_volume);
        if (limitParam) formattedTrends = formattedTrends.slice(0, limitParam);
        res.status(200).json({
            ...data,
            trends: formattedTrends
        });
    } catch  {
        res.status(200).json(fallbackTrends);
    }
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(549));
module.exports = __webpack_exports__;

})();