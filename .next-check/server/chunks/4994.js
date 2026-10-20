"use strict";
exports.id = 4994;
exports.ids = [4994];
exports.modules = {

/***/ 6993:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ UserDataLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1492);
/* harmony import */ var _lib_context_user_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5127);
/* harmony import */ var _lib_media__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8540);
/* harmony import */ var _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3639);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5342);
/* harmony import */ var _components_common_seo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(585);
/* harmony import */ var _components_home_main_container__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(722);
/* harmony import */ var _components_home_main_header__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3258);
/* harmony import */ var _components_user_user_header__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8162);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_5__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_6__, _components_home_main_header__WEBPACK_IMPORTED_MODULE_9__, _components_user_user_header__WEBPACK_IMPORTED_MODULE_10__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_5__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_6__, _components_home_main_header__WEBPACK_IMPORTED_MODULE_9__, _components_user_user_header__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











function UserDataLayout({ children  }) {
    const { query: { id  }  } = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const { data , loading  } = (0,_lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_5__/* .useCollection */ .K)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_6__/* .usersCollection */ .W$, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.where)("username", "==", id), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.limit)(1)), {
        allowNull: true
    });
    const user = data?.[0] ? {
        ...data[0],
        photoURL: (0,_lib_media__WEBPACK_IMPORTED_MODULE_4__/* .getAvatarSrc */ .SJ)(data[0].photoURL, data[0].gender),
        coverPhotoURL: (0,_lib_media__WEBPACK_IMPORTED_MODULE_4__/* .getBannerSrc */ .Xj)(data[0].coverPhotoURL)
    } : null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_lib_context_user_context__WEBPACK_IMPORTED_MODULE_3__/* .UserContextProvider */ .fS, {
        value: {
            user,
            loading
        },
        children: [
            !user && !loading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_seo__WEBPACK_IMPORTED_MODULE_7__/* .SEO */ .H, {
                title: "User not found / Inspiration"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_home_main_container__WEBPACK_IMPORTED_MODULE_8__/* .MainContainer */ .t, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_home_main_header__WEBPACK_IMPORTED_MODULE_9__/* .MainHeader */ .c, {
                        useMobileSidebar: true,
                        beforeTitle: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_header__WEBPACK_IMPORTED_MODULE_10__/* .UserHeader */ .w, {})
                    }),
                    children
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5629:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "p": () => (/* binding */ UserNavLink)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_3__);




function UserNavLink({ name , path  }) {
    const { asPath , query: { id  }  } = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const userPath = `/user/${id}${path ? `/${path}` : ""}`;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
        href: userPath,
        scroll: false,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
            className: "hover-animation main-tab dark-bg-tab flex flex-1 justify-center hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "px-6 md:px-8",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("flex flex-col gap-3 whitespace-nowrap pt-3 font-bold transition-colors duration-200", asPath === userPath ? "text-light-primary dark:text-dark-primary [&>i]:scale-100 [&>i]:opacity-100" : "text-light-secondary dark:text-dark-secondary"),
                    children: [
                        name,
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                            className: "h-1 scale-50 rounded-full bg-main-accent opacity-0 transition duration-200"
                        })
                    ]
                })
            })
        })
    });
}


/***/ }),

/***/ 7993:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ UserNav)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_user_user_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8162);
/* harmony import */ var _user_nav_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5629);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__, _components_user_user_header__WEBPACK_IMPORTED_MODULE_3__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_1__, _components_user_user_header__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const allNavs = [
    [
        {
            name: "Publications",
            path: ""
        },
        {
            name: "Publications et r\xe9ponses",
            path: "with_replies"
        },
        {
            name: "M\xe9dias",
            path: "media"
        },
        {
            name: "J’aime",
            path: "likes"
        }
    ],
    [
        {
            name: "Abonnements",
            path: "following"
        },
        {
            name: "Abonn\xe9s",
            path: "followers"
        }
    ]
];
function UserNav({ follow  }) {
    const userNav = allNavs[+!!follow];
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.nav, {
        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()(`hover-animation flex justify-between overflow-y-auto
         border-b border-light-border dark:border-dark-border`, follow && "mt-1 mb-0.5"),
        ..._components_user_user_header__WEBPACK_IMPORTED_MODULE_3__/* .variants */ .o,
        exit: undefined,
        children: userNav.map(({ name , path  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_user_nav_link__WEBPACK_IMPORTED_MODULE_4__/* .UserNavLink */ .p, {
                name: name,
                path: path
            }, name))
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;