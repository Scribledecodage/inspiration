"use strict";
exports.id = 9622;
exports.ids = [9622];
exports.modules = {

/***/ 9622:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NotFound)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_common_contact_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8944);
/* harmony import */ var _components_common_copyright__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2093);
/* harmony import */ var _components_common_seo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(585);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4685);







/* Mêmes liens que le pied de page : tous prennent la couleur d'accentuation
   choisie dans Apparence (variable --main-accent). */ const legalLinks = [
    [
        "Conditions d’utilisation",
        "/terms",
        false
    ],
    [
        "Politique de confidentialit\xe9",
        "/privacy",
        false
    ],
    [
        "Politique relative aux cookies",
        "/cookies",
        false
    ],
    [
        "Accessibilit\xe9",
        "/accessibility",
        false
    ],
    [
        "404",
        "/404",
        false
    ],
    [
        "sitemap.xml",
        "/sitemap.xml",
        true
    ],
    [
        "robots.txt",
        "/robots.txt",
        true
    ],
    [
        "security.txt",
        "/security.txt",
        true
    ]
];
function NotFound() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_seo__WEBPACK_IMPORTED_MODULE_5__/* .SEO */ .H, {
                title: "Page non trouv\xe9e / Inspiration",
                description: "La page que vous recherchez n'existe pas ou a \xe9t\xe9 d\xe9plac\xe9e.",
                image: "/404.png"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative flex h-screen flex-col items-center justify-center px-4 py-12 overflow-hidden",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "absolute inset-0 z-0",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                            src: "/404.png",
                            alt: "Erreur 404",
                            layout: "fill",
                            objectFit: "cover",
                            priority: true,
                            quality: 60
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative z-10 flex flex-col items-center gap-8 text-center max-w-2xl",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                className: "font-title text-7xl md:text-8xl font-bold tracking-tight text-white drop-shadow-lg",
                                children: "404"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "text-3xl md:text-4xl font-bold text-white drop-shadow-md",
                                children: "Page non trouv\xe9e"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-lg text-white/90 leading-relaxed drop-shadow-sm max-w-lg",
                                children: "La page que vous recherchez n'existe pas, a \xe9t\xe9 d\xe9plac\xe9e ou n'est plus disponible."
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex flex-col gap-3 sm:flex-row sm:gap-4 pt-4",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        href: "/home",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_6__/* .Button */ .z, {
                                            className: "w-full sm:w-auto bg-main-accent px-8 py-3 font-bold text-white transition hover:brightness-90 active:brightness-75",
                                            children: "Retour \xe0 l'accueil"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        href: "/trends",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_6__/* .Button */ .z, {
                                            className: "w-full sm:w-auto border border-white/50 bg-white/10 px-8 py-3 font-bold text-white transition hover:bg-white/20",
                                            children: "D\xe9couvrir"
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative z-10 mt-12 flex flex-col gap-3 text-center text-white",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                                className: "flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm sm:text-base",
                                children: [
                                    legalLinks.map(([linkName, href, isStatic])=>isStatic ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            className: "text-main-accent underline-offset-2 transition hover:underline",
                                            href: href,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            children: linkName
                                        }, linkName) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                            href: href,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                className: "text-main-accent underline-offset-2 transition hover:underline",
                                                children: linkName
                                            })
                                        }, linkName)),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_contact_link__WEBPACK_IMPORTED_MODULE_3__/* .ContactLink */ .v, {})
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_copyright__WEBPACK_IMPORTED_MODULE_4__/* .Copyright */ .w, {})
                            })
                        ]
                    })
                ]
            })
        ]
    });
};


/***/ })

};
;