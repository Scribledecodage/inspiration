"use strict";
(() => {
var exports = {};
exports.id = 5039;
exports.ids = [5039];
exports.modules = {

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 3308:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (/* binding */ uploadEndpoint)
/* harmony export */ });
/* harmony import */ var _lib_storage_b2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(817);

const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb"
        }
    }
};
async function uploadEndpoint(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", [
            "POST"
        ]);
        res.status(405).json({
            error: "Method Not Allowed"
        });
        return;
    }
    try {
        const { fileName , contentType , base64Data , userId  } = req.body;
        if (!fileName || !base64Data) {
            res.status(400).json({
                error: "Missing fileName or base64Data"
            });
            return;
        }
        // Strip data URL prefix if present
        const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, "");
        const buffer = Buffer.from(cleanBase64, "base64");
        const cleanUser = userId ? userId.replace(/[^a-zA-Z0-9_-]/g, "") : "uploads";
        const cleanName = fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
        const storageKey = `${cleanUser}/${Date.now()}-${cleanName}`;
        const publicUrl = await (0,_lib_storage_b2__WEBPACK_IMPORTED_MODULE_0__/* .uploadToB2 */ .UR)(storageKey, buffer, contentType || "image/jpeg");
        res.status(200).json({
            url: publicUrl
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Upload failed";
        res.status(500).json({
            error: message
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
var __webpack_exports__ = __webpack_require__.X(0, [817], () => (__webpack_exec__(3308)));
module.exports = __webpack_exports__;

})();