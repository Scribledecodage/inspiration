"use strict";
(() => {
var exports = {};
exports.id = 2505;
exports.ids = [2505];
exports.modules = {

/***/ 6054:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "fs"
const external_fs_namespaceObject = require("fs");
;// CONCATENATED MODULE: external "path"
const external_path_namespaceObject = require("path");
;// CONCATENATED MODULE: ./src/pages/api/security.ts


function handler(req, res) {
    try {
        const filePath = (0,external_path_namespaceObject.join)(process.cwd(), "public", "security.txt");
        const fileContent = (0,external_fs_namespaceObject.readFileSync)(filePath, "utf-8");
        res.setHeader("Content-Type", "text/plain");
        res.status(200).send(fileContent);
    } catch (error) {
        res.status(404).send("File not found");
    }
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(6054));
module.exports = __webpack_exports__;

})();