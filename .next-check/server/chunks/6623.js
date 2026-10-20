"use strict";
exports.id = 6623;
exports.ids = [6623];
exports.modules = {

/***/ 6623:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": () => (/* binding */ LoginFooter)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_common_contact_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8944);
/* harmony import */ var _components_common_copyright__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2093);




const footerLinks = [
    [
        "Conditions d’utilisation",
        "/terms"
    ],
    [
        "Politique de confidentialit\xe9",
        "/privacy"
    ],
    [
        "Politique relative aux cookies",
        "/cookies"
    ],
    [
        "Accessibilit\xe9",
        "/accessibility"
    ]
];
function LoginFooter() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("footer", {
        className: "justify-center border-t border-light-border px-4 py-3 text-xs text-light-secondary dark:border-dark-border dark:text-dark-secondary lg:border-0 lg:py-2",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
            className: "flex flex-wrap items-center justify-center gap-x-4 gap-y-2",
            children: [
                footerLinks.map(([linkName, href])=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: href,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            className: "text-main-accent transition-colors hover:brightness-90 hover:underline",
                            children: linkName
                        })
                    }, linkName)),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_contact_link__WEBPACK_IMPORTED_MODULE_2__/* .ContactLink */ .v, {}),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_copyright__WEBPACK_IMPORTED_MODULE_3__/* .Copyright */ .w, {
                    className: "font-medium"
                })
            ]
        })
    });
}


/***/ })

};
;