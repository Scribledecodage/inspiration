"use strict";
(() => {
var exports = {};
exports.id = 9145;
exports.ids = [9145];
exports.modules = {

/***/ 1363:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ geocodeEndpoint)
/* harmony export */ });
async function geocodeEndpoint(req, res) {
    const { q  } = req.query;
    const query = typeof q === "string" ? q.trim() : "";
    if (!query) {
        res.status(400).json({
            lat: null,
            lon: null,
            label: null,
            error: "Missing q"
        });
        return;
    }
    try {
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1&lang=fr`, {
            headers: {
                "User-Agent": "TwitterClone/1.0"
            }
        });
        if (response.ok) {
            const data = await response.json();
            const feature = data.features?.[0];
            const coords = feature?.geometry?.coordinates;
            if (coords && coords.length >= 2) {
                const [lon, lat] = coords;
                res.status(200).json({
                    lat,
                    lon,
                    label: query
                });
                return;
            }
        }
    } catch  {
    // ignore
    }
    res.status(200).json({
        lat: null,
        lon: null,
        label: query
    });
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1363));
module.exports = __webpack_exports__;

})();