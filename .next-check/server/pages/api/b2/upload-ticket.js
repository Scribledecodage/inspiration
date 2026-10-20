"use strict";
(() => {
var exports = {};
exports.id = 7840;
exports.ids = [7840];
exports.modules = {

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 3138:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uploadTicketEndpoint)
/* harmony export */ });
/* harmony import */ var _lib_storage_b2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(817);

/** Délivre un billet d'upload : le navigateur enverra ensuite la vidéo
 *  directement à Backblaze (sans limite de taille liée à Vercel). */ async function uploadTicketEndpoint(req, res) {
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
        const { fileName , userId  } = req.body;
        const cleanUser = userId ? userId.replace(/[^a-zA-Z0-9_-]/g, "") : "uploads";
        const cleanName = (fileName || "fichier").replace(/[^a-zA-Z0-9._-]/g, "-");
        const key = `${cleanUser}/${Date.now()}-${cleanName}`;
        const { uploadUrl , authorizationToken  } = await (0,_lib_storage_b2__WEBPACK_IMPORTED_MODULE_0__/* .getB2UploadTicket */ .Dw)();
        res.status(200).json({
            uploadUrl,
            authorizationToken,
            key,
            url: (0,_lib_storage_b2__WEBPACK_IMPORTED_MODULE_0__/* .buildPublicUrl */ .vA)(key)
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
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [817], () => (__webpack_exec__(3138)));
module.exports = __webpack_exports__;

})();