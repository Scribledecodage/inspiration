(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
exports.modules = {

/***/ 2352:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ AppHead)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_env__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1923);



const shareTitle = "Inspiration — Des id\xe9es et des rencontres qui rapprochent";
const shareDescription = "D\xe9couvrez Inspiration : partagez vos id\xe9es, \xe9changez autour de vos centres d’int\xe9r\xeat et rapprochez-vous des autres.";
const siteOrigin = (_lib_env__WEBPACK_IMPORTED_MODULE_2__/* .siteURL */ .f7 || "").replace(/\/+$/, "");
const shareImage = `${siteOrigin}/Discussion.jpg`;
function AppHead() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                children: shareTitle
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "viewport",
                content: "width=device-width, initial-scale=1, shrink-to-fit=no"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "description",
                content: shareDescription
            }, "description"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:type",
                content: "website"
            }, "og:type"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:site_name",
                content: "Inspiration"
            }, "og:site_name"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:title",
                content: shareTitle
            }, "og:title"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:description",
                content: shareDescription
            }, "og:description"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:image",
                content: shareImage
            }, "og:image"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:image:width",
                content: "612"
            }, "og:image:width"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:image:height",
                content: "436"
            }, "og:image:height"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:image:alt",
                content: "Illustration de personnes qui \xe9changent sur Inspiration"
            }, "og:image:alt"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:card",
                content: "summary_large_image"
            }, "twitter:card"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:title",
                content: shareTitle
            }, "twitter:title"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:description",
                content: shareDescription
            }, "twitter:description"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:image",
                content: shareImage
            }, "twitter:image"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:image:alt",
                content: "Illustration de personnes qui \xe9changent sur Inspiration"
            }, "twitter:image:alt"),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "icon",
                type: "image/png",
                href: "/LogoSite.png"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "manifest",
                href: "/site.webmanifest"
            }, "site-manifest")
        ]
    });
}


/***/ }),

/***/ 953:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i": () => (/* binding */ ScheduledPublisher)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6201);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2108);
/* harmony import */ var _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7359);
/* harmony import */ var _lib_firebase_status__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9802);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_1__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase_status__WEBPACK_IMPORTED_MODULE_4__]);
([react_hot_toast__WEBPACK_IMPORTED_MODULE_1__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase_status__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





/** Fréquence de vérification des publications programmées (30 s). */ const CHECK_INTERVAL = 30000;
/* « Publieur » global : tant que l'application est ouverte, il vérifie
   régulièrement les publications programmées de l'utilisateur connecté et
   envoie celles dont l'échéance est passée. Il ne rend rien à l'écran. */ function ScheduledPublisher() {
    const { user  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__/* .useAuth */ .aC)();
    const userId = user?.id;
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!userId) return;
        let cancelled = false;
        let running = false;
        const run = async ()=>{
            if (cancelled || running) return;
            running = true;
            try {
                const published = await (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_3__/* .publishDueScheduledTweets */ ._D)(userId);
                const publishedStatuses = await (0,_lib_firebase_status__WEBPACK_IMPORTED_MODULE_4__/* .publishDueScheduledStatuses */ .y6)(userId);
                if (publishedStatuses > 0 && !cancelled) react_hot_toast__WEBPACK_IMPORTED_MODULE_1__.toast.success(publishedStatuses > 1 ? `${publishedStatuses} statuts programmés ont été publiés` : "Votre statut programm\xe9 a \xe9t\xe9 publi\xe9");
                if (published > 0 && !cancelled) react_hot_toast__WEBPACK_IMPORTED_MODULE_1__.toast.success(published > 1 ? `${published} publications programmées ont été envoyées` : "Votre publication programm\xe9e a \xe9t\xe9 envoy\xe9e");
            } catch  {
            // On réessaiera au prochain passage.
            } finally{
                running = false;
            }
        };
        void run();
        const interval = window.setInterval(()=>void run(), CHECK_INTERVAL);
        const handleVisibility = ()=>{
            if (document.visibilityState === "visible") void run();
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return ()=>{
            cancelled = true;
            window.clearInterval(interval);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [
        userId
    ]);
    return null;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1923:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f7": () => (/* binding */ siteURL),
/* harmony export */   "nc": () => (/* binding */ isUsingEmulator)
/* harmony export */ });
/* unused harmony exports isProduction, isDevelopment */
const isProduction = (/* unused pure expression or super */ null && ("production" === "production"));
const isDevelopment = "production" === "development";
const isUsingEmulator = isDevelopment && "false" === "true";
const siteURL = "https://mont2-tweet.vercel.app";


/***/ }),

/***/ 2957:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_phone_number_input_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(483);
/* harmony import */ var react_phone_number_input_style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_phone_number_input_style_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2108);
/* harmony import */ var _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5655);
/* harmony import */ var _components_scheduled_scheduled_publisher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(953);
/* harmony import */ var _components_common_app_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2352);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__, _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_3__, _components_scheduled_scheduled_publisher__WEBPACK_IMPORTED_MODULE_4__]);
([_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__, _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_3__, _components_scheduled_scheduled_publisher__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








function App({ Component , pageProps  }) {
    const getLayout = Component.getLayout ?? ((page)=>page);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_app_head__WEBPACK_IMPORTED_MODULE_5__/* .AppHead */ .Y, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__/* .AuthContextProvider */ .HD, {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_3__/* .ThemeContextProvider */ .ze, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_scheduled_scheduled_publisher__WEBPACK_IMPORTED_MODULE_4__/* .ScheduledPublisher */ .i, {}),
                        getLayout(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                            ...pageProps
                        }))
                    ]
                })
            })
        ]
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 483:
/***/ (() => {



/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 3745:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/app");;

/***/ }),

/***/ 401:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/auth");;

/***/ }),

/***/ 1492:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/firestore");;

/***/ }),

/***/ 8937:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/functions");;

/***/ }),

/***/ 3392:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/storage");;

/***/ }),

/***/ 6201:
/***/ ((module) => {

"use strict";
module.exports = import("react-hot-toast");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2108,9449,7761], () => (__webpack_exec__(2957)));
module.exports = __webpack_exports__;

})();