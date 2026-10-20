"use strict";
(() => {
var exports = {};
exports.id = 5641;
exports.ids = [5641];
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

/***/ 4244:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ availableEndpoint)
/* harmony export */ });
/* harmony import */ var _lib_api_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2990);

async function availableEndpoint(_req, res) {
    const response = await fetch("https://api.twitter.com/1.1/trends/available.json", _lib_api_auth__WEBPACK_IMPORTED_MODULE_0__/* .AUTH */ .B);
    const data = await response.json();
    res.status(response.status).json(data);
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4244));
module.exports = __webpack_exports__;

})();