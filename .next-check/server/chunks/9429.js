"use strict";
exports.id = 9429;
exports.ids = [9429];
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

/***/ 8893:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ UserFollowLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var _lib_context_user_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5127);
/* harmony import */ var _components_ui_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9570);
/* harmony import */ var _components_user_user_nav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7993);
/* harmony import */ var _components_user_user_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8162);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__, _components_user_user_nav__WEBPACK_IMPORTED_MODULE_4__, _components_user_user_header__WEBPACK_IMPORTED_MODULE_5__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_1__, _components_user_user_nav__WEBPACK_IMPORTED_MODULE_4__, _components_user_user_header__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






function UserFollowLayout({ children  }) {
    const { user: userData , loading  } = (0,_lib_context_user_context__WEBPACK_IMPORTED_MODULE_2__/* .useUser */ .aF)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: !userData ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.section, {
            ..._components_user_user_header__WEBPACK_IMPORTED_MODULE_5__/* .variants */ .o,
            children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_loading__WEBPACK_IMPORTED_MODULE_3__/* .Loading */ .g, {
                className: "mt-5 w-full"
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "w-full p-8 text-center",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-3xl font-bold",
                        children: "Ce compte n’existe pas"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-light-secondary dark:text-dark-secondary",
                        children: "Essayez d’en rechercher un autre."
                    })
                ]
            })
        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_nav__WEBPACK_IMPORTED_MODULE_4__/* .UserNav */ .T, {
                    follow: true
                }),
                children
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6809:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ UserFollow)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
/* harmony import */ var _lib_context_user_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5127);
/* harmony import */ var _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3639);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5342);
/* harmony import */ var _components_common_seo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(585);
/* harmony import */ var _components_user_user_cards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3779);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_4__, _components_user_user_cards__WEBPACK_IMPORTED_MODULE_6__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_4__, _components_user_user_cards__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







function UserFollow({ type  }) {
    const { user  } = (0,_lib_context_user_context__WEBPACK_IMPORTED_MODULE_2__/* .useUser */ .aF)();
    const { name , username  } = user;
    const { data , loading  } = (0,_lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_3__/* .useCollection */ .K)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_4__/* .usersCollection */ .W$, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.where)(type === "following" ? "followers" : "following", "array-contains", user?.id)), {
        allowNull: true
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_seo__WEBPACK_IMPORTED_MODULE_5__/* .SEO */ .H, {
                title: `${type === "following" ? "Abonnements de" : "Abonn\xe9s de"} ${name} (@${username}) / Inspiration`
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_cards__WEBPACK_IMPORTED_MODULE_6__/* .UserCards */ .G, {
                follow: true,
                data: data,
                type: type,
                loading: loading
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;