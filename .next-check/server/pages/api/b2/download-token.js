"use strict";
(() => {
var exports = {};
exports.id = 8478;
exports.ids = [8478];
exports.modules = {

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 8361:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ downloadTokenEndpoint)
/* harmony export */ });
/* harmony import */ var _lib_storage_b2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(817);

/** Renvoie une autorisation de lecture directe depuis Backblaze, mise en
 *  cache côté serveur : les vidéos se lisent ainsi sans le proxy. */ async function downloadTokenEndpoint(req, res) {
    if (req.method !== "GET") {
        res.setHeader("Allow", [
            "GET"
        ]);
        res.status(405).json({
            error: "Method Not Allowed"
        });
        return;
    }
    try {
        const { token , baseUrl  } = await (0,_lib_storage_b2__WEBPACK_IMPORTED_MODULE_0__/* .getB2DownloadInfo */ ._2)();
        res.setHeader("Cache-Control", "private, max-age=3600");
        res.status(200).json({
            token,
            baseUrl
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Download token failed";
        res.status(500).json({
            error: message
        });
    }
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [817], () => (__webpack_exec__(8361)));
module.exports = __webpack_exports__;

})();