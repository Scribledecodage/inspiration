"use strict";
(() => {
var exports = {};
exports.id = 660;
exports.ids = [660];
exports.modules = {

/***/ 5641:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Document)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6859);
/* harmony import */ var _lib_fonts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9449);



/* Les piles de polices sont injectées telles quelles dans le script ci-dessous
   pour que le premier rendu utilise déjà la bonne typographie (aucun
   clignotement au chargement). */ const serializedFontStacks = JSON.stringify(_lib_fonts__WEBPACK_IMPORTED_MODULE_2__/* .fontStacks */ .SA);
function Document() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {
        lang: "fr",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "icon",
                        type: "image/png",
                        href: "/LogoSite.png"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "preconnect",
                        href: "https://fonts.googleapis.com"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com",
                        crossOrigin: "anonymous"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
                        rel: "stylesheet"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("script", {
                        dangerouslySetInnerHTML: {
                            __html: `try {
              var theme = localStorage.getItem('theme') || 'auto';
              if (theme !== 'auto' && theme !== 'light' && theme !== 'dim' && theme !== 'dark') theme = 'auto';
              var palette = theme === 'auto'
                ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dim' : 'light')
                : theme;
              var root = document.documentElement;
              var isDark = palette === 'dim' || palette === 'dark';
              root.setAttribute('data-theme', palette);
              root.style.colorScheme = isDark ? 'dark' : 'light';
              root.classList.toggle('dark', isDark);
              root.style.setProperty('--main-background', 'var(--' + palette + '-background)');
              root.style.setProperty('--main-search-background', 'var(--' + palette + '-search-background)');
              root.style.setProperty('--main-sidebar-background', 'var(--' + palette + '-sidebar-background)');
              var accent = localStorage.getItem('accent') || 'blue';
              if (accent === 'yellow' || accent === 'cyan') accent = 'indigo';
              if (accent === 'orange') accent = 'red';
              root.style.setProperty('--main-accent', 'var(--accent-' + accent + ')');
              var fontStacks = ${serializedFontStacks};
              var font = localStorage.getItem('font') || '${_lib_fonts__WEBPACK_IMPORTED_MODULE_2__/* .DEFAULT_FONT */ .Uo}';
              if (font === 'outfit') font = 'manrope';
              if (font === 'chirp' || !fontStacks[font]) font = '${_lib_fonts__WEBPACK_IMPORTED_MODULE_2__/* .DEFAULT_FONT */ .Uo}';
              root.style.setProperty('--font-main', fontStacks[font]);
              root.style.setProperty('--font-title', fontStacks[font]);
              var shape = localStorage.getItem('avatarShape') || 'circle';
              root.setAttribute('data-avatar-shape', shape);
              var frame = localStorage.getItem('avatarFrame') || 'none';
              root.setAttribute('data-avatar-frame', frame);
            } catch (e) {}`
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("body", {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {})
                ]
            })
        ]
    });
};


/***/ }),

/***/ 4140:
/***/ ((module) => {

module.exports = require("next/dist/server/get-page-files.js");

/***/ }),

/***/ 9716:
/***/ ((module) => {

module.exports = require("next/dist/server/htmlescape.js");

/***/ }),

/***/ 6368:
/***/ ((module) => {

module.exports = require("next/dist/server/utils.js");

/***/ }),

/***/ 6724:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ 8743:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/html-context.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,6859,9449], () => (__webpack_exec__(5641)));
module.exports = __webpack_exports__;

})();