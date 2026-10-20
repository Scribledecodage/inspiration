"use strict";
exports.id = 385;
exports.ids = [385];
exports.modules = {

/***/ 722:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t": () => (/* binding */ MainContainer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);


function MainContainer({ children , className  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(`hover-animation flex min-h-[100dvh] w-full max-w-xl flex-col border-x-0
         border-light-border/70 pb-28 dark:border-dark-border/70 xs:border-x xs:pb-12 min-w-0`, className),
        children: children
    });
}


/***/ }),

/***/ 7074:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ LegalLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2108);
/* harmony import */ var _components_layout_main_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4415);
/* harmony import */ var _components_layout_common_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3238);
/* harmony import */ var _components_common_site_logo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5439);
/* harmony import */ var _components_login_login_footer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6623);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4685);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__, _components_layout_main_layout__WEBPACK_IMPORTED_MODULE_4__, _components_layout_common_layout__WEBPACK_IMPORTED_MODULE_5__]);
([_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__, _components_layout_main_layout__WEBPACK_IMPORTED_MODULE_4__, _components_layout_common_layout__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function LegalLayout({ children  }) {
    const { user , loading  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__/* .useAuth */ .aC)();
    const { back  } = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    if (user) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_layout_main_layout__WEBPACK_IMPORTED_MODULE_4__/* .MainLayout */ .Z, {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_layout_common_layout__WEBPACK_IMPORTED_MODULE_5__/* .HomeLayout */ .Os, {
                children: children
            })
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex min-h-[100dvh] flex-col justify-between bg-main-background text-light-primary dark:text-dark-primary",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
                className: "glass-header sticky top-0 z-30 flex items-center justify-between border-b border-light-border/60 px-4 py-3 dark:border-dark-border/60 sm:px-8",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_9__/* .Button */ .z, {
                                className: "dark-bg-tab p-2 hover:bg-light-primary/10 active:bg-light-primary/20 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20",
                                onClick: ()=>back(),
                                "aria-label": "Retour",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_8__/* .MaterialIcon */ .O, {
                                    className: "h-5 w-5",
                                    iconName: "arrow_back"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                href: "/",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_site_logo__WEBPACK_IMPORTED_MODULE_6__/* .SiteLogo */ .S, {
                                            size: 28
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "font-title text-xl font-bold tracking-tight",
                                            children: "Inspiration"
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: "/",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            className: "rounded-full bg-main-accent px-4 py-1.5 text-sm font-bold text-white transition hover:bg-main-accent/90 active:scale-95",
                            children: "Se connecter"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
                className: "mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8 sm:px-6",
                children: children
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_login_login_footer__WEBPACK_IMPORTED_MODULE_7__/* .LoginFooter */ .U, {})
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;