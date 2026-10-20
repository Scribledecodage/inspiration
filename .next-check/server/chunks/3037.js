"use strict";
exports.id = 3037;
exports.ids = [3037];
exports.modules = {

/***/ 973:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": () => (/* binding */ AsideFooter)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6197);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3325);
/* harmony import */ var _components_common_contact_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8944);
/* harmony import */ var _components_common_copyright__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2093);
/* harmony import */ var _components_status_status_activity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3501);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__, _components_status_status_activity__WEBPACK_IMPORTED_MODULE_7__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_2__, _components_status_status_activity__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const footerLinks = [
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
/* Le pied de page n'affiche que quelques liens : la liste complète est
   dépliable, pour ne pas voler de place au bas de la colonne. */ const visibleLinkCount = 3;
function AsideFooter({ inTrendsPage  } = {}) {
    const { 0: showActivity , 1: setShowActivity  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { 0: showAllLinks , 1: setShowAllLinks  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const displayedLinks = showAllLinks ? footerLinks : footerLinks.slice(0, visibleLinkCount);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("footer", {
        className: "sticky top-0 flex flex-col gap-2.5 px-3 py-2 text-center text-xs text-light-secondary dark:text-dark-secondary bg-main-background dark:bg-main-background z-10",
        children: [
            inTrendsPage && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mt-3 overflow-hidden rounded-xl bg-main-sidebar-background text-left",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between gap-2 pb-1 pl-4 pr-1.5 pt-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "text-xl font-bold text-light-primary dark:text-dark-primary",
                                children: "Activit\xe9 de vos abonnements"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "accent-tab shrink-0 rounded-full p-2 text-light-secondary transition hover:bg-light-secondary/10 hover:text-light-primary active:bg-light-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-accent dark:text-dark-secondary dark:hover:bg-dark-secondary/10 dark:hover:text-dark-primary dark:active:bg-dark-secondary/20",
                                type: "button",
                                "aria-expanded": showActivity,
                                "aria-label": showActivity ? "Masquer l’activit\xe9 de vos abonnements" : "Afficher l’activit\xe9 de vos abonnements",
                                onClick: ()=>setShowActivity((value)=>!value),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_4__/* .MaterialIcon */ .O, {
                                    className: `h-5 w-5 transition-transform duration-300 ease-in-out ${showActivity ? "" : "rotate-180"}`,
                                    iconName: "keyboard_arrow_up"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.AnimatePresence, {
                        initial: false,
                        children: showActivity && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
                            animate: {
                                height: "auto",
                                opacity: 1
                            },
                            className: "overflow-hidden",
                            exit: {
                                height: 0,
                                opacity: 0
                            },
                            initial: {
                                height: 0,
                                opacity: 0
                            },
                            transition: {
                                duration: 0.28,
                                ease: "easeInOut"
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "px-4 pb-3 text-sm text-light-secondary dark:text-dark-secondary",
                                    children: "Voyez les derniers statuts des utilisateurs que vous suivez"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "px-3 pb-4",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_status_status_activity__WEBPACK_IMPORTED_MODULE_7__/* .StatusActivity */ .Q, {})
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                className: "flex flex-wrap justify-center gap-x-3 gap-y-1.5",
                children: [
                    displayedLinks.map(([linkName, href, isStatic])=>isStatic ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            href: href,
                            className: "custom-underline text-main-accent hover:brightness-90 hover:underline",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: linkName
                        }, linkName) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                            href: href,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                className: "custom-underline text-main-accent hover:brightness-90 hover:underline",
                                children: linkName
                            })
                        }, linkName)),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_contact_link__WEBPACK_IMPORTED_MODULE_5__/* .ContactLink */ .v, {
                        showEmail: showAllLinks
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        type: "button",
                        "aria-expanded": showAllLinks,
                        onClick: ()=>setShowAllLinks((value)=>!value),
                        className: "custom-underline text-main-accent hover:brightness-90 hover:underline",
                        children: showAllLinks ? "Voir moins" : "Voir plus"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "font-medium",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_copyright__WEBPACK_IMPORTED_MODULE_6__/* .Copyright */ .w, {})
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 254:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ AsideTrends),
/* harmony export */   "o": () => (/* binding */ variants)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6197);
/* harmony import */ var _lib_date__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1944);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6269);
/* harmony import */ var _lib_api_trends__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9476);
/* harmony import */ var _components_ui_error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6028);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3276);
/* harmony import */ var _components_ui_loading__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9570);
/* harmony import */ var _trending_people__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(4231);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_3__, _lib_api_trends__WEBPACK_IMPORTED_MODULE_5__, _trending_people__WEBPACK_IMPORTED_MODULE_11__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_3__, _lib_api_trends__WEBPACK_IMPORTED_MODULE_5__, _trending_people__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













const variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    transition: {
        duration: 0.8
    }
};
function AsideTrends({ inTrendsPage  }) {
    const { data , loading  } = (0,_lib_api_trends__WEBPACK_IMPORTED_MODULE_5__/* .useTrends */ .H)(1, inTrendsPage ? 100 : 10, {
        refreshInterval: 30000
    });
    const { trends , location  } = data ?? {};
    if (!inTrendsPage) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_trending_people__WEBPACK_IMPORTED_MODULE_11__/* .TrendingPeople */ .d, {});
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()(!inTrendsPage && "hover-animation rounded-2xl bg-main-sidebar-background"),
        children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_loading__WEBPACK_IMPORTED_MODULE_10__/* .Loading */ .g, {}) : trends ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.div, {
            className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("inner:px-4 inner:py-3", inTrendsPage && "mt-0.5"),
            ...variants,
            children: [
                !inTrendsPage && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                    className: "text-xl font-extrabold",
                    children: "Tendances pour vous"
                }),
                trends.map(({ name , query , tweet_volume , url  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: url,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                            className: "hover-animation accent-tab hover-card relative flex cursor-not-allowed flex-col gap-0.5",
                            onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__/* .preventBubbling */ .Db)(),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "absolute right-2 top-2",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                                        className: "hover-animation group relative cursor-not-allowed p-2 hover:bg-accent-blue/10 focus-visible:bg-accent-blue/20 focus-visible:!ring-accent-blue/80",
                                        onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_12__/* .preventBubbling */ .Db)(),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                className: "h-5 w-5 text-light-secondary group-hover:text-accent-blue group-focus-visible:text-accent-blue dark:text-dark-secondary",
                                                iconName: "more_horiz"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_9__/* .ToolTip */ .e, {
                                                tip: "Plus"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-sm text-light-secondary dark:text-dark-secondary",
                                    children: [
                                        "Tendance",
                                        " ",
                                        location === "Worldwide" ? "dans le monde entier" : `à ${location}`
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "font-bold",
                                    children: name
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-sm text-light-secondary dark:text-dark-secondary",
                                    children: [
                                        (0,_lib_date__WEBPACK_IMPORTED_MODULE_4__/* .formatNumber */ .uf)(tweet_volume),
                                        " publications"
                                    ]
                                })
                            ]
                        })
                    }, query)),
                !inTrendsPage && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                    href: "/trends",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        className: "custom-button accent-tab hover-card block w-full rounded-2xl rounded-t-none text-center text-main-accent",
                        children: "Afficher plus"
                    })
                })
            ]
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_error__WEBPACK_IMPORTED_MODULE_6__/* .Error */ .j, {})
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9920:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ Aside)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_context_window_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6625);
/* harmony import */ var _aside_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(973);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_aside_footer__WEBPACK_IMPORTED_MODULE_2__]);
_aside_footer__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



function Aside({ children , inTrendsPage  }) {
    const { width  } = (0,_lib_context_window_context__WEBPACK_IMPORTED_MODULE_1__/* .useWindow */ .zY)();
    if (width < 1024) return null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("aside", {
        className: "flex w-96 flex-col gap-4 px-4 py-3 pt-1",
        children: [
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_aside_footer__WEBPACK_IMPORTED_MODULE_2__/* .AsideFooter */ .L, {
                inTrendsPage: inTrendsPage
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6125:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ Suggestions)
/* harmony export */ });
function Suggestions() {
    return null;
}


/***/ }),

/***/ 4231:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "d": () => (/* binding */ TrendingPeople)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1492);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2108);
/* harmony import */ var _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3639);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5342);
/* harmony import */ var _components_user_user_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7238);
/* harmony import */ var _components_ui_loading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9570);
/* harmony import */ var _components_ui_error__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6028);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3325);
/* harmony import */ var _aside_trends__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(254);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6197);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_4__, _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_5__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_6__, _components_user_user_card__WEBPACK_IMPORTED_MODULE_7__, _aside_trends__WEBPACK_IMPORTED_MODULE_11__, framer_motion__WEBPACK_IMPORTED_MODULE_12__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_4__, _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_5__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_6__, _components_user_user_card__WEBPACK_IMPORTED_MODULE_7__, _aside_trends__WEBPACK_IMPORTED_MODULE_11__, framer_motion__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













const CANDIDATE_LIMIT = 100;
const DISPLAY_LIMIT = 100;
function rankUsers(users, currentUserId) {
    return users.filter(({ id  })=>id !== currentUserId).sort((first, second)=>{
        const followerDifference = (second.followers?.length ?? 0) - (first.followers?.length ?? 0);
        if (followerDifference) return followerDifference;
        const tweetDifference = (second.totalTweets ?? 0) - (first.totalTweets ?? 0);
        if (tweetDifference) return tweetDifference;
        return (second.totalPhotos ?? 0) - (first.totalPhotos ?? 0);
    }).slice(0, DISPLAY_LIMIT).map((user, index)=>({
            ...user,
            rank: index + 1
        }));
}
function TrendingPeople() {
    const { user  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_4__/* .useAuth */ .aC)();
    const { 0: showUsers , 1: setShowUsers  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { data , loading  } = (0,_lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_5__/* .useCollection */ .K)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.query)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_6__/* .usersCollection */ .W$, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.orderBy)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.documentId)()), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.limit)(CANDIDATE_LIMIT)), {
        allowNull: true
    });
    const allRankedUsers = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>rankUsers(data ?? [], user?.id), [
        data,
        user?.id
    ]);
    const rankedUsers = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>allRankedUsers.slice(0, 3), [
        allRankedUsers
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
        className: "mt-3 overflow-hidden rounded-xl bg-main-sidebar-background",
        children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_loading__WEBPACK_IMPORTED_MODULE_8__/* .Loading */ .g, {
            className: "flex h-40 items-center justify-center p-4"
        }) : data ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_12__.motion.div, {
            ..._aside_trends__WEBPACK_IMPORTED_MODULE_11__/* .variants */ .o,
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: `flex items-center justify-between gap-2 pb-1 pl-4 pr-1.5 pt-2 ${showUsers ? "" : "pb-2"}`,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                            className: "text-xl font-bold",
                            children: "Utilisateurs sur le site"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: "accent-tab shrink-0 rounded-full p-2 text-light-secondary transition hover:bg-light-secondary/10 hover:text-light-primary active:bg-light-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-accent dark:text-dark-secondary dark:hover:bg-dark-secondary/10 dark:hover:text-dark-primary dark:active:bg-dark-secondary/20",
                            type: "button",
                            "aria-expanded": showUsers,
                            "aria-label": showUsers ? "Masquer les utilisateurs sur le site" : "Afficher les utilisateurs sur le site",
                            onClick: ()=>setShowUsers((value)=>!value),
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_10__/* .MaterialIcon */ .O, {
                                className: `h-5 w-5 transition-transform duration-300 ease-in-out ${showUsers ? "" : "rotate-180"}`,
                                iconName: "keyboard_arrow_up"
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_12__.AnimatePresence, {
                    initial: false,
                    children: showUsers && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_12__.motion.div, {
                        animate: {
                            height: "auto",
                            opacity: 1
                        },
                        className: "overflow-hidden",
                        exit: {
                            height: 0,
                            opacity: 0
                        },
                        initial: {
                            height: 0,
                            opacity: 0
                        },
                        transition: {
                            duration: 0.28,
                            ease: "easeInOut"
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "px-4 pb-3 text-sm text-light-secondary dark:text-dark-secondary",
                                children: "Explorez les profils des membres actifs de notre communaut\xe9."
                            }),
                            rankedUsers.map((userData)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_card__WEBPACK_IMPORTED_MODULE_7__/* .UserCard */ .O, {
                                        ...userData
                                    })
                                }, userData.id)),
                            allRankedUsers.length > 3 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                href: "/people",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    className: "block w-full border-t border-light-border py-2.5 text-center text-sm text-main-accent transition hover:bg-light-primary/5 dark:border-dark-border dark:hover:bg-dark-primary/5",
                                    children: "Voir tout"
                                })
                            }),
                            !rankedUsers.length && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "px-4 pb-4 pt-2 text-xs text-light-secondary dark:text-dark-secondary",
                                children: "Pas d’autres utilisateurs"
                            })
                        ]
                    })
                })
            ]
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_error__WEBPACK_IMPORTED_MODULE_9__/* .Error */ .j, {})
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6839:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "zF": () => (/* binding */ AudioPlayer)
/* harmony export */ });
/* unused harmony exports formatAudioTime, AudioWaveIcon */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6201);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_3__]);
react_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





/** Types MIME audio par extension, pour savoir si l'appareil sait les lire. */ const AUDIO_MIME_BY_EXTENSION = {
    webm: "audio/webm;codecs=opus",
    m4a: "audio/mp4",
    ogg: "audio/ogg;codecs=opus",
    opus: "audio/ogg;codecs=opus",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    aac: "audio/aac"
};
/* Décorative waveform used both for the button icon and the audio player. */ const WAVE_BARS = [
    10,
    18,
    13,
    22,
    9,
    16,
    20,
    12,
    15,
    11,
    17,
    8
];
function formatAudioTime(totalSeconds) {
    if (!Number.isFinite(totalSeconds) || totalSeconds < 0) totalSeconds = 0;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
/** Icône d'onde audio, utilisée comme bouton d'enregistrement. */ function AudioWaveIcon({ className  }) {
    return /*#__PURE__*/ _jsxs("svg", {
        "aria-hidden": "true",
        className: cn("h-5 w-5", className),
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeWidth: "2",
        viewBox: "0 0 24 24",
        children: [
            /*#__PURE__*/ _jsx("path", {
                d: "M3.5 10v4"
            }),
            /*#__PURE__*/ _jsx("path", {
                d: "M7.75 7.5v9"
            }),
            /*#__PURE__*/ _jsx("path", {
                d: "M12 4.5v15"
            }),
            /*#__PURE__*/ _jsx("path", {
                d: "M16.25 7.5v9"
            }),
            /*#__PURE__*/ _jsx("path", {
                d: "M20.5 10v4"
            })
        ]
    });
}
/**
 * Lecteur de message vocal.
 *
 * Partagé par la messagerie et les publications : même rendu, même gestion
 * des formats illisibles. Quand l'appareil ne sait pas décoder le fichier, on
 * propose de l'ouvrir plutôt que d'afficher une erreur incompréhensible.
 */ function AudioPlayer({ src , duration , mine =false  }) {
    const audioRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { 0: playing , 1: setPlaying  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: currentTime , 1: setCurrentTime  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: totalDuration , 1: setTotalDuration  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(duration ?? 0);
    /* Format non lu par cet appareil, ou lecture qui a échoué : on propose alors
     d'ouvrir le fichier au lieu d'une erreur incompréhensible. */ const { 0: unsupported , 1: setUnsupported  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: failed , 1: setFailed  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const extension = src.split("?", 1)[0].split(".").pop()?.toLowerCase();
        const mime = extension ? AUDIO_MIME_BY_EXTENSION[extension] : undefined;
        if (!mime || typeof document === "undefined") return;
        /* Safari ne lit pas le webm/opus enregistré par Chrome/Android : on le
       détecte avant même d'essayer de lancer la lecture. */ const probe = document.createElement("audio");
        if (probe.canPlayType(mime) === "") setUnsupported(true);
    }, [
        src
    ]);
    const progress = totalDuration > 0 ? Math.min(currentTime / totalDuration, 1) : 0;
    const playedBars = Math.round(progress * WAVE_BARS.length);
    const togglePlay = ()=>{
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) void audio.play().catch(()=>{
            setFailed(true);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_3__.toast.error("Ce message vocal ne peut pas \xeatre lu sur cet appareil.");
        });
        else audio.pause();
    };
    if (unsupported || failed) return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        className: "flex items-center gap-2",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_4__/* .MaterialIcon */ .O, {
                className: "h-5 w-5",
                iconName: "volume_up"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("text-sm", mine ? "text-white/90" : "text-light-secondary dark:text-dark-secondary"),
                children: failed ? "Lecture impossible sur cet appareil." : "Format audio non pris en charge sur cet appareil."
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("text-sm font-semibold underline", mine ? "text-white" : "text-main-accent"),
                href: src,
                rel: "noreferrer",
                target: "_blank",
                children: "Ouvrir"
            })
        ]
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-3",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                "aria-label": playing ? "Mettre en pause" : "Lire le message vocal",
                className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition active:scale-95", mine ? "bg-white/25 text-white hover:bg-white/35" : "bg-main-accent text-white hover:brightness-90"),
                onClick: togglePlay,
                type: "button",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_4__/* .MaterialIcon */ .O, {
                    className: "h-4 w-4",
                    iconName: playing ? "pause" : "play_arrow",
                    solid: true
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                "aria-hidden": "true",
                className: "flex h-8 items-center gap-[3px]",
                children: WAVE_BARS.map((height, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("w-[3px] rounded-full transition-colors", index < playedBars ? mine ? "bg-white" : "bg-main-accent" : mine ? "bg-white/40" : "bg-light-secondary/40 dark:bg-dark-secondary/40"),
                        style: {
                            height
                        }
                    }, index))
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("min-w-[2.25rem] text-xs tabular-nums", mine ? "text-white/90" : "text-light-secondary dark:text-dark-secondary"),
                children: formatAudioTime(playing || currentTime > 0 ? totalDuration - currentTime : totalDuration)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("audio", {
                onEnded: ()=>{
                    setPlaying(false);
                    setCurrentTime(0);
                },
                onError: ()=>setFailed(true),
                onLoadedMetadata: (event)=>{
                    const value = event.currentTarget.duration;
                    if (Number.isFinite(value) && value > 0) setTotalDuration(value);
                },
                onPause: ()=>setPlaying(false),
                onPlay: ()=>setPlaying(true),
                onTimeUpdate: (event)=>setCurrentTime(event.currentTarget.currentTime),
                preload: "metadata",
                ref: audioRef,
                src: src
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7910:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ BottomNavIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__]);
framer_motion__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


/**
 * Animation d'icône de barre du bas.
 *
 * Volontairement discrète : l'icône s'agrandit à peine quand l'onglet devient
 * actif, puis revient doucement. Le ressort est amorti (pas de rebond), donc
 * aucun dépassement ni mouvement parasite. À l'appui, elle s'enfonce
 * légèrement. La couleur est gérée par le style de l'onglet.
 */ function BottomNavIcon({ active , children  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.span, {
        animate: {
            scale: active ? 1.07 : 1
        },
        className: "relative inline-flex",
        transition: {
            type: "spring",
            stiffness: 280,
            damping: 26
        },
        whileTap: {
            scale: 0.93
        },
        children: children
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8780:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": () => (/* binding */ ComposerText)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_link_preview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1565);




/**
 * Copie du texte en cours de saisie où les liens sont colorés en bleu.
 *
 * Elle est placée derrière un `textarea` transparent : ce que l'utilisateur
 * voit, ce sont les liens colorés, tout en gardant un vrai champ de saisie
 * (copier-coller, autocorrectif, sélection du texte…). On garde ici la même
 * police et le même espacement que le champ, sinon les deux couches ne se
 * superposent pas.
 */ function ComposerText({ text , className  }) {
    const parts = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_lib_link_preview__WEBPACK_IMPORTED_MODULE_3__/* .splitLinks */ .mM)(text), [
        text
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        "aria-hidden": "true",
        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("whitespace-pre-wrap", className),
        children: [
            parts.map((part, index)=>part.type === "link" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-main-accent underline",
                    children: part.value
                }, `link-${index}`) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    children: part.value
                }, `text-${index}`)),
            text.endsWith("\n") && " "
        ]
    });
}


/***/ }),

/***/ 6152:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ LinkPreviewCard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__]);
framer_motion__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




/**
 * Carte d'aperçu d'un lien : favicon, titre, description et bannière.
 *
 * Le même rendu dans la barre de publication et dans la messagerie, et la
 * même carte une fois le contenu publié.
 */ function LinkPreviewCard({ preview , onRemove , className  }) {
    const { favicon , title , description , image , siteName , url  } = preview;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
        animate: {
            opacity: 1,
            y: 0
        },
        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()(/* Carte compacte et bien arrondie : elle prend le moins de place
           possible dans une conversation, tout en restant lisible. */ "relative flex max-w-full overflow-hidden rounded-xl border", "border-light-border bg-main-background dark:border-dark-border", className),
        exit: {
            opacity: 0,
            y: 8
        },
        initial: {
            opacity: 1,
            y: 0
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                className: "flex min-w-0 flex-1 flex-col",
                href: url,
                rel: "noopener noreferrer nofollow",
                target: "_blank",
                children: [
                    image && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "block aspect-[3/1] w-full bg-cover bg-center bg-light-secondary/30 dark:bg-dark-secondary/30",
                        style: {
                            backgroundImage: `url("${image}")`
                        }
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "flex min-w-0 flex-1 flex-col gap-0.5 px-2.5 py-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "flex min-w-0 items-center gap-1.5",
                                children: [
                                    favicon && /* eslint-disable-next-line @next/next/no-img-element */ /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        alt: "",
                                        className: "h-3.5 w-3.5 shrink-0 rounded-sm",
                                        src: favicon
                                    }),
                                    siteName && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "truncate text-[11px] font-semibold text-light-secondary dark:text-dark-secondary",
                                        children: siteName
                                    })
                                ]
                            }),
                            title && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "line-clamp-1 text-[13px] font-bold leading-snug text-light-primary dark:text-dark-primary",
                                children: title
                            }),
                            description && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "line-clamp-1 text-[11px] leading-snug text-light-secondary dark:text-dark-secondary",
                                children: description
                            })
                        ]
                    })
                ]
            }),
            onRemove && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                "aria-label": "Retirer l’aper\xe7u du lien",
                className: "absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-light-primary/75 text-white backdrop-blur-sm transition hover:bg-image-preview-hover/75",
                onClick: onRemove,
                title: "Retirer l’aper\xe7u",
                type: "button",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                    className: "h-4 w-4",
                    iconName: "close"
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3258:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ MainHeader)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3276);
/* harmony import */ var _components_sidebar_mobile_sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8289);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_sidebar_mobile_sidebar__WEBPACK_IMPORTED_MODULE_5__]);
_components_sidebar_mobile_sidebar__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






function MainHeader({ tip , title , children , iconName , className , disableSticky , useActionButton , useMobileSidebar , beforeTitle , action  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("hover-animation z-20 glass-header border-b border-light-border/60 px-4 py-2.5 dark:border-dark-border/60 transition-colors", !disableSticky && "sticky top-0", className ?? "flex items-center gap-6"),
        children: [
            useActionButton && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .z, {
                className: "dark-bg-tab group relative p-2 hover:bg-light-primary/10 active:bg-light-primary/20 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20",
                onClick: action,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                        className: "h-5 w-5",
                        iconName: iconName ?? "arrow_back"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__/* .ToolTip */ .e, {
                        tip: tip ?? "Retour"
                    })
                ]
            }),
            beforeTitle,
            title && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                className: "text-xl font-bold",
                children: title
            }, title),
            children && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "ml-auto flex items-center gap-2",
                children: children
            }),
            useMobileSidebar && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(!children && "ml-auto"),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_sidebar_mobile_sidebar__WEBPACK_IMPORTED_MODULE_5__/* .MobileSidebar */ .n, {
                    hideTrigger: true
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4885:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ SwipeContainer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6197);
/* harmony import */ var _lib_context_window_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6625);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_3__]);
framer_motion__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const mobileRoutes = [
    "/home",
    "/trends",
    "/messages",
    "/bookmarks"
];
/** Distance (px) the finger must travel before the gesture direction is locked. */ const DIRECTION_LOCK_DISTANCE = 12;
/** Horizontal distance (px) required on release to switch section. */ const SWIPE_DISTANCE_THRESHOLD = 90;
/** Horizontal velocity (px/ms) required on release to switch section. */ const SWIPE_VELOCITY_THRESHOLD = 0.35;
/** Resistance applied when there is no section to switch to in that direction. */ const EDGE_RESISTANCE = 0.06;
function SwipeContainer({ children  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const { asPath  } = router;
    const { isMobile  } = (0,_lib_context_window_context__WEBPACK_IMPORTED_MODULE_4__/* .useWindow */ .zY)();
    const x = (0,framer_motion__WEBPACK_IMPORTED_MODULE_3__.useMotionValue)(0);
    // Kept in refs so the pointer handlers never depend on re-renders.
    const directionRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)("idle");
    const startRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)({
        x: 0,
        y: 0
    });
    const lastRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)({
        x: 0,
        time: 0
    });
    const velocityRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(0);
    const currentIndex = mobileRoutes.indexOf(asPath);
    const canGoNext = currentIndex >= 0 && currentIndex < mobileRoutes.length - 1;
    const canGoPrevious = currentIndex > 0;
    const handlePointerDown = (event)=>{
        // One finger only.
        if (!event.isPrimary) return;
        // Never steal gestures from modals, text fields or elements that manage
        // their own horizontal swipe (for example the inbox contact rows).
        const target = event.target;
        if (target?.closest('[data-no-section-swipe], [role="dialog"], input, textarea, select')) return;
        directionRef.current = "undecided";
        startRef.current = {
            x: event.clientX,
            y: event.clientY
        };
        lastRef.current = {
            x: event.clientX,
            time: event.timeStamp
        };
        velocityRef.current = 0;
    };
    const handlePointerMove = (event)=>{
        const direction = directionRef.current;
        if (direction !== "undecided" && direction !== "horizontal") return;
        const dx = event.clientX - startRef.current.x;
        const dy = event.clientY - startRef.current.y;
        if (direction === "undecided") {
            if (Math.hypot(dx, dy) < DIRECTION_LOCK_DISTANCE) return;
            // The gesture only becomes a section swipe when the finger clearly
            // moved sideways. Anything mostly vertical is left to page scrolling.
            if (Math.abs(dx) <= Math.abs(dy)) {
                directionRef.current = "vertical";
                return;
            }
            directionRef.current = "horizontal";
            try {
                event.currentTarget.setPointerCapture(event.pointerId);
            } catch  {
            // Pointer already released: nothing to capture.
            }
        }
        event.preventDefault();
        const time = event.timeStamp;
        const elapsed = time - lastRef.current.time;
        if (elapsed > 0) velocityRef.current = (event.clientX - lastRef.current.x) / elapsed;
        lastRef.current = {
            x: event.clientX,
            time
        };
        const allowed = dx < 0 ? canGoNext : canGoPrevious;
        x.set(allowed ? dx : dx * EDGE_RESISTANCE);
    };
    const handlePointerUp = (event)=>{
        if (directionRef.current !== "horizontal") {
            directionRef.current = "idle";
            return;
        }
        directionRef.current = "idle";
        const dx = event.clientX - startRef.current.x;
        const velocity = velocityRef.current;
        velocityRef.current = 0;
        const goNext = canGoNext && (dx < -SWIPE_DISTANCE_THRESHOLD || velocity < -SWIPE_VELOCITY_THRESHOLD);
        const goPrevious = canGoPrevious && (dx > SWIPE_DISTANCE_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD);
        if (!goNext && !goPrevious) {
            (0,framer_motion__WEBPACK_IMPORTED_MODULE_3__.animate)(x, 0, {
                type: "spring",
                stiffness: 500,
                damping: 40
            });
            return;
        }
        const direction = goNext ? 1 : -1;
        const distance =  true ? 500 : 0;
        (0,framer_motion__WEBPACK_IMPORTED_MODULE_3__.animate)(x, direction * -distance, {
            duration: 0.18,
            ease: "easeOut",
            onComplete: ()=>{
                // Park the container on the opposite edge so the next section can
                // slide back in without a full page reload.
                x.set(direction * distance);
                void router.push(mobileRoutes[currentIndex + direction]);
            }
        });
    };
    const handlePointerCancel = ()=>{
        if (directionRef.current === "horizontal") (0,framer_motion__WEBPACK_IMPORTED_MODULE_3__.animate)(x, 0, {
            type: "spring",
            stiffness: 500,
            damping: 40
        });
        directionRef.current = "idle";
        velocityRef.current = 0;
    };
    // Whenever a section is mounted, slide it back to its resting position.
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        (0,framer_motion__WEBPACK_IMPORTED_MODULE_3__.animate)(x, 0, {
            duration: 0.2,
            ease: "easeOut"
        });
    }, [
        asPath,
        x
    ]);
    if (!isMobile || !mobileRoutes.includes(asPath)) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: children
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.div, {
        className: "w-full",
        onPointerCancel: handlePointerCancel,
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        style: {
            x,
            touchAction: "pan-y"
        },
        children: children
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1400:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ ImagePreview)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6197);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3040);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6269);
/* harmony import */ var _components_modal_image_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3644);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9099);
/* harmony import */ var _components_ui_next_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4664);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3276);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__, _components_modal_image_modal__WEBPACK_IMPORTED_MODULE_5__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_6__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_2__, _components_modal_image_modal__WEBPACK_IMPORTED_MODULE_5__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













const variants = {
    initial: {
        opacity: 0,
        scale: 0.5
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3
        }
    },
    exit: {
        opacity: 0,
        scale: 0.5
    },
    transition: {
        type: "spring",
        duration: 0.5
    }
};
/* Dans le fil, la média n'est plus animée : elle grandissait depuis la
   moitié de sa taille (0.5) à chaque publication qui arrivait au
   défilement. Sous les yeux du lecteur, l'image semblait donc sauter, et
   tout ce qui suivait glissait avec elle. */ const tweetVariants = {
    initial: {
        opacity: 1
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.15
        }
    }
};
const postImageBorderRadius = {
    1: [
        "rounded-2xl"
    ],
    2: [
        "rounded-tl-2xl rounded-bl-2xl",
        "rounded-tr-2xl rounded-br-2xl"
    ],
    3: [
        "rounded-tl-2xl rounded-bl-2xl",
        "rounded-tr-2xl",
        "rounded-br-2xl"
    ],
    4: [
        "rounded-tl-2xl",
        "rounded-tr-2xl",
        "rounded-bl-2xl",
        "rounded-br-2xl"
    ]
};
function ImagePreview({ tweet , viewTweet , previewCount , imagesPreview , removeImage  }) {
    const { 0: selectedIndex , 1: setSelectedIndex  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: selectedImage , 1: setSelectedImage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { open , openModal , closeModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_4__/* .useModal */ .d)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const imageData = imagesPreview[selectedIndex];
        setSelectedImage(imageData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        selectedIndex
    ]);
    const handleVideoStop = ()=>{
        if (videoRef.current) videoRef.current.pause();
    };
    const handleSelectedImage = (index, isVideo)=>()=>{
            if (isVideo) handleVideoStop();
            setSelectedIndex(index);
            openModal();
        };
    const handleNextIndex = (type)=>()=>{
            const nextIndex = type === "prev" ? selectedIndex === 0 ? previewCount - 1 : selectedIndex - 1 : selectedIndex === previewCount - 1 ? 0 : selectedIndex + 1;
            setSelectedIndex(nextIndex);
        };
    const isTweet = tweet ?? viewTweet;
    /* Une publication qui ne contient qu'une vidéo ne doit pas utiliser la
     grille d'images (hauteur fixe) : le lecteur garde son format d'origine,
     est centré et simplement limité en hauteur — la vidéo n'est donc jamais
     coupée, et la publication reste compacte. */ const singleVideo = previewCount === 1 && Boolean(imagesPreview[0]?.type?.includes("video"));
    /* Un GIF seul est affiché plus petit, sans recadrage, comme une vidéo :
     il garde son format d'origine et la publication reste compacte. */ const singleGif = previewCount === 1 && Boolean(imagesPreview[0]?.type?.toLowerCase().includes("gif"));
    const singleCompact = singleVideo || singleGif;
    /* Une seule image : elle n'utilise pas la grille (qui impose une hauteur
     fixe et rogne les images). Elle est placée dans un cadre dont le ratio
     est celui de l'image quand on le connaît : la place est donc réservée
     AVANT le chargement, et rien ne bouge quand l'image arrive. */ const singleImage = previewCount === 1 && !singleCompact;
    const singleImageRatio = singleImage && imagesPreview[0]?.width && imagesPreview[0]?.height ? `${imagesPreview[0].width} / ${imagesPreview[0].height}` : undefined;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: clsx__WEBPACK_IMPORTED_MODULE_3___default()(singleCompact ? "flex justify-center" : singleImage ? "relative aspect-[4/3] w-full max-h-[420px] overflow-hidden rounded-2xl bg-light-secondary/30 dark:bg-dark-secondary/30 md:aspect-[16/10]" : clsx__WEBPACK_IMPORTED_MODULE_3___default()("grid grid-cols-2 grid-rows-2 rounded-2xl", viewTweet ? "h-[35vw] xs:h-[30vw] md:h-[220px]" : "h-[30vw] xs:h-[25vw] md:h-[200px]", isTweet ? "gap-0.5" : "gap-3"), isTweet && "mt-2"),
        style: singleImageRatio ? {
            aspectRatio: singleImageRatio
        } : undefined,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_6__/* .Modal */ .u_, {
                modalClassName: clsx__WEBPACK_IMPORTED_MODULE_3___default()("flex justify-center w-full items-center relative", isTweet && "h-full"),
                open: open,
                closeModal: closeModal,
                closePanelOnClick: true,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_image_modal__WEBPACK_IMPORTED_MODULE_5__/* .ImageModal */ .y, {
                    tweet: isTweet,
                    imageData: selectedImage,
                    previewCount: previewCount,
                    selectedIndex: selectedIndex,
                    handleNextIndex: handleNextIndex
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.AnimatePresence, {
                mode: "popLayout",
                children: imagesPreview.map(({ id , src , alt  }, index)=>{
                    const isVideo = imagesPreview[index].type?.includes("video");
                    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
                        className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("accent-tab group relative transition-shadow", isTweet ? postImageBorderRadius[previewCount][index] : "rounded-2xl", singleImage ? "h-full w-full" : {
                            "col-span-2 row-span-2": previewCount === 1,
                            "row-span-2": previewCount === 2 || index === 0 && previewCount === 3
                        }),
                        ...isTweet ? tweetVariants : variants,
                        layout: !isTweet ? true : false,
                        key: `${id || src}-${index}`,
                        children: [
                            singleCompact ? singleVideo ? /* Vidéo seule : lecteur compact, format respecté, jamais coupé. */ /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("video", {
                                        ref: videoRef,
                                        className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("block max-h-[45vh] w-auto max-w-full cursor-pointer object-contain", viewTweet ? "md:max-h-[320px]" : "md:max-h-[220px]"),
                                        src: src,
                                        controls: true,
                                        playsInline: true,
                                        preload: "metadata"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        "aria-label": "Agrandir la vid\xe9o",
                                        className: "absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-light-primary/75 text-dark-primary opacity-0 backdrop-blur-sm transition hover:bg-image-preview-hover/75 focus-visible:opacity-100 group-hover:opacity-100",
                                        onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_11__/* .preventBubbling */ .Db)(handleSelectedImage(index, isVideo)),
                                        type: "button",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                            className: "h-4 w-4",
                                            iconName: "north_east"
                                        })
                                    })
                                ]
                            }) : /* GIF seul : affiché un peu plus petit, sans recadrage. */ /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative overflow-hidden rounded-md bg-light-secondary/10 dark:bg-dark-secondary/10",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("block max-h-[30vh] w-auto max-w-full cursor-pointer object-contain", viewTweet ? "md:max-h-[200px]" : "md:max-h-[180px]"),
                                        src: src,
                                        alt: alt,
                                        onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_11__/* .preventBubbling */ .Db)(handleSelectedImage(index, isVideo))
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        "aria-label": "Agrandir le GIF",
                                        className: "absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-light-primary/75 text-dark-primary opacity-0 backdrop-blur-sm transition hover:bg-image-preview-hover/75 focus-visible:opacity-100 group-hover:opacity-100",
                                        onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_11__/* .preventBubbling */ .Db)(handleSelectedImage(index, isVideo)),
                                        type: "button",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                            className: "h-4 w-4",
                                            iconName: "north_east"
                                        })
                                    })
                                ]
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                type: "button",
                                className: "absolute inset-0 w-full h-full",
                                onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_11__/* .preventBubbling */ .Db)(handleSelectedImage(index, isVideo)),
                                children: isVideo ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                                            className: "visible absolute top-0 right-0 z-10 -translate-x-1 translate-y-1 bg-light-primary/75 p-1 opacity-0 backdrop-blur-sm transition hover:bg-image-preview-hover/75 group-hover:opacity-100 xs:invisible",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                                className: "h-5 w-5",
                                                iconName: "north_east"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("video", {
                                            ref: videoRef,
                                            className: clsx__WEBPACK_IMPORTED_MODULE_3___default()(`relative h-full w-full cursor-pointer transition 
                         hover:brightness-75 hover:duration-200`, isTweet ? postImageBorderRadius[previewCount][index] : "rounded-2xl"),
                                            src: src,
                                            controls: true,
                                            muted: true
                                        })
                                    ]
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_next_image__WEBPACK_IMPORTED_MODULE_7__/* .NextImage */ .o, {
                                    className: "relative h-full w-full cursor-pointer transition hover:brightness-75 hover:duration-200",
                                    imgClassName: clsx__WEBPACK_IMPORTED_MODULE_3___default()(isTweet ? postImageBorderRadius[previewCount][index] : "rounded-2xl"),
                                    previewCount: previewCount,
                                    layout: "fill",
                                    src: src,
                                    alt: alt,
                                    useSkeleton: isTweet
                                })
                            }),
                            removeImage && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                                className: "group absolute top-0 left-0 translate-x-1 translate-y-1 bg-light-primary/75 p-1 backdrop-blur-sm hover:bg-image-preview-hover/75",
                                onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_11__/* .preventBubbling */ .Db)(removeImage(id)),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                        className: "h-5 w-5 text-white",
                                        iconName: "close"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_10__/* .ToolTip */ .e, {
                                        className: "translate-y-2",
                                        tip: "Supprimer"
                                    })
                                ]
                            })
                        ]
                    });
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 926:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ InputAccentRadio)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5655);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__]);
_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const inputColors = {
    blue: "bg-accent-blue",
    indigo: "bg-accent-indigo",
    pink: "bg-accent-pink",
    purple: "bg-accent-purple",
    red: "bg-accent-red",
    green: "bg-accent-green"
};
function InputAccentRadio({ type , label  }) {
    const { accent , changeAccent  } = (0,_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__/* .useTheme */ .Fg)();
    const isChecked = type === accent;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
        htmlFor: type,
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(`group flex h-[52px] cursor-pointer items-center gap-3 rounded-xl border px-3
         transition-all duration-200 focus-within:ring-2 focus-within:ring-main-accent/40`, isChecked ? "border-main-accent bg-main-accent/10" : "border-light-border bg-light-primary/[0.02] hover:border-light-secondary/40 hover:bg-light-primary/[0.05] dark:border-dark-border dark:bg-dark-primary/[0.02] dark:hover:border-dark-secondary/60 dark:hover:bg-dark-primary/[0.05]"),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                className: "sr-only",
                id: type,
                type: "radio",
                name: "accent",
                value: type,
                checked: isChecked,
                onChange: changeAccent
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                "aria-hidden": "true",
                className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(`flex h-7 w-7 shrink-0 items-center justify-center rounded-full
           transition-transform duration-200 group-hover:scale-105`, inputColors[type], isChecked ? "ring-2 ring-main-accent ring-offset-2 ring-offset-main-background" : "ring-1 ring-inset ring-black/10 dark:ring-white/25"),
                children: isChecked && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                    className: "h-4 w-4 text-white",
                    iconName: "check"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("truncate text-[13px] font-medium", isChecked ? "text-main-accent" : "text-light-primary dark:text-dark-primary"),
                children: label
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1273:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M5": () => (/* binding */ InputForm),
/* harmony export */   "TW": () => (/* binding */ fromTop)
/* harmony export */ });
/* unused harmony export fromBottom */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(649);
/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_textarea_autosize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6197);
/* harmony import */ var _lib_context_window_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6625);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3325);
/* harmony import */ var _components_common_composer_text__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8780);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4685);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_3__]);
framer_motion__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];








const variants = [
    {
        initial: {
            y: -25,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring"
            }
        }
    },
    {
        initial: {
            x: 25,
            opacity: 0
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring"
            }
        }
    }
];
const [fromTop, fromBottom] = variants;
function InputForm({ modal , reply , formId , loading , visited , children , inputRef , replyModal , inputValue , isValidTweet , isUploadingImages , sendTweet , handleFocus , discardTweet , handleChange , handleImageUpload , recording , recorder , onDiscardRequest , popupOpen  }) {
    const { isMobile  } = (0,_lib_context_window_context__WEBPACK_IMPORTED_MODULE_4__/* .useWindow */ .zY)();
    const formRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    /* Clics dehors successifs (téléphone) : il en faut deux pour refermer la
     feuille de publication. */ const outsideClicksRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    /* Un menu vient d'être refermé par un clic dehors : le clic suivant
     refermera la feuille de publication. */ const menuJustClosedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const previousPopupOpenRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(popupOpen);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (previousPopupOpenRef.current && !popupOpen) menuJustClosedRef.current = true;
        previousPopupOpenRef.current = popupOpen;
    }, [
        popupOpen
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>handleShowHideNav(true), []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleClickOutside = (event)=>{
            const form = formRef.current?.closest("form");
            if (!form || form.contains(event.target)) return;
            /* Le sélecteur d'emoji est une fenêtre native du navigateur : elle
         vit dans un calque au-dessus de la page, et son clic de fermeture
         (au-dessus de la barre du haut) ne doit surtout pas refermer la
         publication. */ const target = event.target;
            if (target.closest("[popover]")) return;
            /* Un menu est ouvert par-dessus (emoji, GIF, média…) : le clic dehors
         ne referme que ce menu, la zone de publication reste ouverte. */ if (popupOpen) return;
            /* Un clic dans une fenêtre ouverte par-dessus (emoji, GIF, média…)
         ne referme que cette fenêtre : la zone de publication, elle, reste
         ouverte. La feuille de publication, en revanche, compte comme un
         clic dehors. */ const dialog = target.closest('[role="dialog"]');
            if (dialog && !dialog.contains(form)) return;
            /* Zone vide : le clic dehors la referme, c'est la façon la plus
         simple d'en sortir. */ if (!inputValue.trim()) {
                outsideClicksRef.current = 0;
                discardTweet();
                return;
            }
            /* Sur ordinateur, la zone de publication ne se referme plus au clic
         dehors quand elle contient quelque chose : on ne perd pas son
         brouillon d'un clic malencontreux. La croix en haut à droite
         reste le moyen de la fermer. */ if (false) {}
            /* Sur téléphone, il faut deux clics dehors : le premier ne referme que
         le menu ouvert au-dessus, le second referme la feuille de
         publication. */ if (menuJustClosedRef.current) {
                menuJustClosedRef.current = false;
                outsideClicksRef.current = 0;
                discardTweet();
                return;
            }
            outsideClicksRef.current += 1;
            if (outsideClicksRef.current >= 2) {
                outsideClicksRef.current = 0;
                discardTweet();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>document.removeEventListener("mousedown", handleClickOutside);
    }, [
        inputValue,
        isValidTweet,
        discardTweet,
        popupOpen
    ]);
    const handleKeyboardShortcut = (event)=>{
        const { key , ctrlKey , metaKey , shiftKey  } = event;
        if (!modal && key === "Escape") {
            if (isValidTweet) {
                inputRef.current?.blur();
                onDiscardRequest();
            } else discardTweet();
            return;
        }
        /* Sur ordinateur, la touche Entrée publie (Maj + Entrée pour aller à la
       ligne). Sur mobile, Entrée continue d'aller à la ligne. */ const isDesktop =  false && 0;
        if (key === "Enter" && !shiftKey && (ctrlKey || metaKey || isDesktop) && isValidTweet) {
            event.preventDefault();
            void sendTweet();
        }
    };
    /* Sur téléphone, la barre du bas s'efface quand on écrit (le clavier
     prend la place) et revient quand le champ perd le focus. La transition
     d'opacité est déjà en CSS : inutile de la piloter au chronomètre, ce qui
     faisait clignoter la barre. */ const handleShowHideNav = (blur)=>()=>{
            const sidebar = document.getElementById("sidebar");
            if (!sidebar) return;
            if (blur) {
                sidebar.style.opacity = "";
                /* La barre doit revenir avec le clavier : sinon l'utilisateur se
         retrouve sans navigation (elle peut s'être effacée au défilement
         pendant la saisie). */ const bar = document.querySelector("[data-mobile-bar]");
                if (bar) bar.classList.remove("mobile-bar-hidden");
                return;
            }
            if (window.innerWidth < 500) sidebar.style.opacity = "0";
        };
    const handleFormFocus = ()=>{
        handleShowHideNav()();
        handleFocus();
    };
    const isVisibilityShown = visited && !reply && !replyModal && !loading;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: formRef,
        className: "flex min-h-[48px] w-full min-w-0 flex-col justify-center gap-4",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col gap-6",
                children: [
                    isVisibilityShown && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.button, {
                        type: "button",
                        className: "custom-button accent-tab accent-bg-tab flex cursor-not-allowed items-center gap-1 self-start border border-light-line-reply py-0 px-3 text-main-accent hover:bg-main-accent/10 active:bg-main-accent/20 dark:border-light-secondary",
                        ...fromTop,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "font-bold",
                                children: "Tout le monde"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                className: "h-4 w-4",
                                iconName: "keyboard_arrow_down"
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "flex min-w-0 items-center gap-3",
                        children: recording ? /* L'enregistreur prend la place du texte, dans la même rangée :
               la largeur de la barre ne change donc pas d'un coup. */ recorder : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "relative min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_textarea_autosize__WEBPACK_IMPORTED_MODULE_2___default()), {
                                            id: formId,
                                            className: "relative z-10 w-full min-w-0 resize-none break-all bg-transparent py-1 text-xl leading-tight text-transparent caret-light-primary outline-none placeholder:text-transparent dark:caret-dark-primary",
                                            value: inputValue,
                                            placeholder: reply || replyModal ? "Publiez votre r\xe9ponse" : "Que se passe-t-il\xa0?",
                                            onBlur: handleShowHideNav(true),
                                            /* Sur téléphone, la zone de saisie démarre un peu plus
                     haute : on écrit plus confortablement au doigt. Sur
                     ordinateur et tablette, elle reste compacte tant
                     qu'elle est vide. */ minRows: isMobile ? 2 : 1,
                                            maxRows: isUploadingImages ? 5 : 15,
                                            onFocus: handleFormFocus,
                                            onPaste: handleImageUpload,
                                            onKeyDown: handleKeyboardShortcut,
                                            onChange: handleChange,
                                            ref: inputRef
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "pointer-events-none absolute inset-0 py-1",
                                            children: !inputValue ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "block text-xl leading-tight text-light-secondary dark:text-dark-secondary",
                                                children: reply || replyModal ? "Publiez votre r\xe9ponse" : "Que se passe-t-il\xa0?"
                                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_composer_text__WEBPACK_IMPORTED_MODULE_6__/* .ComposerText */ .z, {
                                                className: "block break-all text-xl leading-tight text-light-primary dark:text-dark-primary",
                                                text: inputValue
                                            })
                                        })
                                    ]
                                }),
                                reply && !visited && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .z, {
                                    className: "cursor-pointer bg-main-accent px-4 py-1.5 font-bold text-white opacity-50",
                                    onClick: handleFocus,
                                    children: "R\xe9pondre"
                                })
                            ]
                        })
                    })
                ]
            }),
            children,
            isVisibilityShown && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.div, {
                className: "flex border-b border-light-border pb-2 dark:border-dark-border",
                ...fromBottom,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    type: "button",
                    className: "custom-button accent-tab accent-bg-tab flex cursor-not-allowed items-center gap-1 py-0 px-3 text-main-accent hover:bg-main-accent/10 active:bg-main-accent/20",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                            className: "h-4 w-4",
                            iconName: "public"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "font-bold",
                            children: "Tout le monde peut r\xe9pondre"
                        })
                    ]
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3562:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ InputOptions)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3276);
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7277);
/* harmony import */ var _progress_bar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1225);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__, _input__WEBPACK_IMPORTED_MODULE_6__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_1__, _input__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const buildOptions = (onClick, onGifClick, onPollClick, onEmojiClick, onScheduleClick, onLocationClick)=>[
        {
            name: "Fichier",
            iconName: "description",
            disabled: false,
            onClick
        },
        {
            name: "GIF",
            iconName: "gif_box",
            disabled: false,
            onClick: onGifClick
        },
        {
            name: "Sondage",
            iconName: "bar_chart",
            disabled: false,
            onClick: onPollClick
        },
        {
            /* Toutes les entrées restent visibles sur téléphone : la rangée tient
       dans la largeur de l'écran, les icônes sont simplement un peu plus
       petites et un peu moins espacées qu' sur ordinateur. */ name: "Emoji",
            iconName: "mood",
            disabled: false,
            onClick: onEmojiClick
        },
        {
            name: "Programmer",
            iconName: "calendar_month",
            disabled: false,
            onClick: onScheduleClick
        },
        {
            name: "Lieu",
            iconName: "location_on",
            disabled: false,
            onClick: onLocationClick
        }
    ];
function InputOptions({ reply , modal , inputLimit , inputLength , isValidTweet , isCharLimitExceeded , hasPoll , scheduled , hasLocation , onPhotosClick , onGifClick , onPollClick , onEmojiClick , onScheduleClick , onLocationClick  }) {
    let filteredOptions = buildOptions(onPhotosClick, onGifClick, onPollClick, onEmojiClick, onScheduleClick, onLocationClick);
    /* En réponse, on masque le lieu (dernière entrée) comme auparavant. */ if (reply) filteredOptions = filteredOptions.filter(({ name  })=>name !== "Lieu");
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
        className: "flex min-w-0 justify-between gap-2",
        ..._input__WEBPACK_IMPORTED_MODULE_6__/* .variants */ .o,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "flex min-w-0 flex-nowrap items-center gap-1 text-main-accent",
                children: filteredOptions.map(({ name , iconName , disabled , onClick  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .z, {
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("accent-tab accent-bg-tab group relative shrink-0 rounded-full p-1", "hover:bg-main-accent/10 active:bg-main-accent/20", name === "Sondage" && hasPoll && "bg-main-accent/10 text-main-accent", name === "Programmer" && scheduled && "bg-main-accent/10 text-main-accent", name === "Lieu" && hasLocation && "bg-main-accent/10 text-main-accent"),
                        onClick: (event)=>onClick?.(event),
                        disabled: disabled,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_4__/* .MaterialIcon */ .O, {
                                className: "h-5 w-5 sm:h-[22px] sm:w-[22px]",
                                iconName: iconName
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .ToolTip */ .e, {
                                tip: name,
                                modal: modal
                            })
                        ]
                    }, name))
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 xs:gap-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
                        className: "flex items-center gap-4",
                        animate: inputLength ? {
                            opacity: 1,
                            scale: 1
                        } : {
                            opacity: 0,
                            scale: 0
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_progress_bar__WEBPACK_IMPORTED_MODULE_7__/* .ProgressBar */ .k, {
                                modal: modal,
                                inputLimit: inputLimit,
                                inputLength: inputLength,
                                isCharLimitExceeded: isCharLimitExceeded
                            }),
                            !reply && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                        className: "hidden h-8 w-[1px] bg-[#B9CAD3] dark:bg-[#3E4144] xs:block"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .z, {
                                        className: "group relative hidden rounded-full border border-light-line-reply p-[1px] text-main-accent dark:border-light-secondary xs:block",
                                        disabled: true,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_4__/* .MaterialIcon */ .O, {
                                                className: "h-5 w-5",
                                                iconName: "add"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_5__/* .ToolTip */ .e, {
                                                tip: "Ajouter",
                                                modal: modal
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .z, {
                        type: "submit",
                        className: "accent-tab bg-main-accent px-4 py-1.5 font-bold text-white enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/75",
                        disabled: !isValidTweet,
                        children: reply ? "R\xe9pondre" : scheduled ? "Programmer" : "Publier"
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9141:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ InputThemeRadio)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5655);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__]);
_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




/* Une seule pastille par thème : sa couleur de fond réelle.
   « Automatique » est coupée en deux (clair / bleu nuit). */ const themeSwatches = {
    auto: {
        color: "linear-gradient(135deg, #FFFFFF 0 50%, #15202B 50% 100%)",
        ring: "rgba(120, 140, 160, 0.45)"
    },
    light: {
        color: "#FFFFFF",
        ring: "rgba(15, 20, 25, 0.15)"
    },
    dim: {
        color: "#B6BEC7",
        ring: "rgba(15, 20, 25, 0.18)"
    },
    dark: {
        color: "#000000",
        ring: "rgba(255, 255, 255, 0.28)"
    }
};
function InputThemeRadio({ type , label , description  }) {
    const { theme , changeTheme  } = (0,_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__/* .useTheme */ .Fg)();
    const { color , ring  } = themeSwatches[type];
    const isChecked = type === theme;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
        htmlFor: type,
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(`flex cursor-pointer items-center gap-3 px-3.5 py-3 transition-colors
         duration-200 focus-within:bg-main-accent/[0.06]`, isChecked ? "bg-main-accent/[0.08]" : "hover:bg-light-primary/[0.03] dark:hover:bg-dark-primary/[0.04]"),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                className: "sr-only",
                id: type,
                type: "radio",
                name: "theme",
                value: type,
                checked: isChecked,
                onChange: changeTheme
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                "aria-hidden": "true",
                className: "h-5 w-5 shrink-0 rounded-full",
                style: {
                    background: color,
                    boxShadow: `inset 0 0 0 1px ${ring}`
                }
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "min-w-0 flex-1",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("block truncate text-sm", isChecked ? "font-semibold text-main-accent" : "font-medium text-light-primary dark:text-dark-primary"),
                        children: label
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "block truncate text-xs text-light-secondary dark:text-dark-secondary",
                        children: description
                    })
                ]
            }),
            isChecked && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                "aria-hidden": "true",
                className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-main-accent text-white",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                    className: "h-3.5 w-3.5",
                    iconName: "check"
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7277:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ Input),
/* harmony export */   "o": () => (/* binding */ variants)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6197);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6201);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1492);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5342);
/* harmony import */ var _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7359);
/* harmony import */ var _lib_supabase_storage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8402);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2108);
/* harmony import */ var _lib_context_window_context__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6625);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(6269);
/* harmony import */ var _lib_validation__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3521);
/* harmony import */ var _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1708);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(3325);
/* harmony import */ var _input_form__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1273);
/* harmony import */ var _image_preview__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(1400);
/* harmony import */ var _media_menu__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(8628);
/* harmony import */ var _poll_preview__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(5025);
/* harmony import */ var _schedule_preview__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(793);
/* harmony import */ var _location_preview__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(1817);
/* harmony import */ var _voice_recorder__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(909);
/* harmony import */ var _components_common_audio_player__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(6839);
/* harmony import */ var _components_common_link_preview_card__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(6152);
/* harmony import */ var _lib_link_preview__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(1565);
/* harmony import */ var _components_modal_gif_picker_modal__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(8251);
/* harmony import */ var _components_modal_poll_modal__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(4914);
/* harmony import */ var _components_ui_emoji_picker__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(6344);
/* harmony import */ var _components_modal_schedule_modal__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(5447);
/* harmony import */ var _components_modal_location_modal__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(8286);
/* harmony import */ var _input_options__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(3562);
/* harmony import */ var _lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(3040);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(9099);
/* harmony import */ var _components_modal_action_modal__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(9253);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_3__, react_hot_toast__WEBPACK_IMPORTED_MODULE_5__, firebase_firestore__WEBPACK_IMPORTED_MODULE_6__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_7__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_10__, _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_13__, _input_form__WEBPACK_IMPORTED_MODULE_15__, _image_preview__WEBPACK_IMPORTED_MODULE_16__, _media_menu__WEBPACK_IMPORTED_MODULE_17__, _poll_preview__WEBPACK_IMPORTED_MODULE_18__, _schedule_preview__WEBPACK_IMPORTED_MODULE_19__, _location_preview__WEBPACK_IMPORTED_MODULE_20__, _voice_recorder__WEBPACK_IMPORTED_MODULE_21__, _components_common_audio_player__WEBPACK_IMPORTED_MODULE_22__, _components_common_link_preview_card__WEBPACK_IMPORTED_MODULE_23__, _components_modal_gif_picker_modal__WEBPACK_IMPORTED_MODULE_24__, _components_modal_poll_modal__WEBPACK_IMPORTED_MODULE_25__, _components_modal_schedule_modal__WEBPACK_IMPORTED_MODULE_27__, _components_modal_location_modal__WEBPACK_IMPORTED_MODULE_28__, _input_options__WEBPACK_IMPORTED_MODULE_29__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_31__, _components_modal_action_modal__WEBPACK_IMPORTED_MODULE_32__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_3__, react_hot_toast__WEBPACK_IMPORTED_MODULE_5__, firebase_firestore__WEBPACK_IMPORTED_MODULE_6__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_7__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_10__, _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_13__, _input_form__WEBPACK_IMPORTED_MODULE_15__, _image_preview__WEBPACK_IMPORTED_MODULE_16__, _media_menu__WEBPACK_IMPORTED_MODULE_17__, _poll_preview__WEBPACK_IMPORTED_MODULE_18__, _schedule_preview__WEBPACK_IMPORTED_MODULE_19__, _location_preview__WEBPACK_IMPORTED_MODULE_20__, _voice_recorder__WEBPACK_IMPORTED_MODULE_21__, _components_common_audio_player__WEBPACK_IMPORTED_MODULE_22__, _components_common_link_preview_card__WEBPACK_IMPORTED_MODULE_23__, _components_modal_gif_picker_modal__WEBPACK_IMPORTED_MODULE_24__, _components_modal_poll_modal__WEBPACK_IMPORTED_MODULE_25__, _components_modal_schedule_modal__WEBPACK_IMPORTED_MODULE_27__, _components_modal_location_modal__WEBPACK_IMPORTED_MODULE_28__, _input_options__WEBPACK_IMPORTED_MODULE_29__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_31__, _components_modal_action_modal__WEBPACK_IMPORTED_MODULE_32__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



































/* En dessous de cette largeur, le sélecteur d'emoji est une feuille qui
   recouvre le bas de l'écran. */ const EMOJI_SHEET_WIDTH = 640;
const variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    }
};
function Input({ modal , reply , parent , disabled , children , replyModal , closeModal , sheetHandle , dragControls  }) {
    const { 0: selectedImages , 1: setSelectedImages  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const { 0: imagesPreview , 1: setImagesPreview  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const { 0: selectedGifs , 1: setSelectedGifs  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const { 0: inputValue , 1: setInputValue  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: visited , 1: setVisited  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: gifOpen , 1: setGifOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    /* Menu des photos : il remplace le sélecteur du système, ouvert au clic
     sur l'icône image. */ const { 0: photosOpen , 1: setPhotosOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: poll , 1: setPoll  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const { 0: pollOpen , 1: setPollOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: emojiOpen , 1: setEmojiOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    /* Texte en cours de saisie : il est repris en aperçu dans le sélecteur
     d'emoji. La valeur est suivie en direct, le curseur est mis à jour à
     l'ouverture et après chaque emoji inséré. */ const { 0: emojiCaret , 1: setEmojiCaret  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const { 0: scheduleOpen , 1: setScheduleOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: scheduledDate , 1: setScheduledDate  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const { 0: tweetLocation , 1: setTweetLocation  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const { 0: locationOpen , 1: setLocationOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    /* Message vocal joint à la publication, enregistré par le même composant que
     dans la messagerie. */ const { 0: recordingOpen , 1: setRecordingOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: audioURL , 1: setAudioURL  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const { 0: audioDuration , 1: setAudioDuration  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    /* Flux micro demandé dès le clic sur le bouton : sur iOS/Safari,
     `getUserMedia` doit être appelé dans le geste utilisateur, pas dans un
     effet React déclenché après le rendu. */ const { 0: voiceStreamPromise , 1: setVoiceStreamPromise  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    /* Aperçu du lien collé : demandé à la frappe, retiré si le lien disparaît. */ const { 0: linkPreview , 1: setLinkPreview  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const previewUrlRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const { user , isAdmin  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_10__/* .useAuth */ .aC)();
    const { width  } = (0,_lib_context_window_context__WEBPACK_IMPORTED_MODULE_11__/* .useWindow */ .zY)();
    const { name , username , photoURL , gender , avatarShape , avatarFrame  } = user;
    /* Sur téléphone, le sélecteur d'emoji est une feuille : le clavier la
     recouvrirait. */ const isEmojiSheet = width < EMOJI_SHEET_WIDTH;
    /* Confirmation avant d'effacer la publication (icône de la poubelle,
     touche Échap). */ const { open: discardOpen , openModal: openDiscardModal , closeModal: closeDiscardModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_30__/* .useModal */ .d)();
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const previewCount = imagesPreview.length;
    const isUploadingImages = !!previewCount;
    /* La zone de publication contient-elle quelque chose ? C'est ce qui
     rend l'icône « effacer » utilisable. */ const hasContent = Boolean(inputValue.trim() || imagesPreview.length || poll || scheduledDate || tweetLocation || audioURL);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        /* `preventScroll` : sans lui, le navigateur amène le champ à l'écran
         et la page défile toute seule. */ if (modal) inputRef.current?.focus({
            preventScroll: true
        });
        return cleanImage;
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const sendTweet = async ()=>{
        inputRef.current?.blur();
        setLoading(true);
        const isReplying = reply ?? replyModal;
        const userId = user?.id;
        // Si une date est programmée, on enregistre une publication programmée
        // (elle sera envoyée automatiquement à l'heure choisie) au lieu de
        // publier immédiatement.
        if (scheduledDate) {
            let scheduledImages = null;
            try {
                scheduledImages = await (0,_lib_supabase_storage__WEBPACK_IMPORTED_MODULE_9__/* .uploadImages */ .eg)(userId, selectedImages);
            } catch (error) {
                setLoading(false);
                react_hot_toast__WEBPACK_IMPORTED_MODULE_5__.toast.error((0,_lib_supabase_storage__WEBPACK_IMPORTED_MODULE_9__/* .getStorageErrorMessage */ .UB)(error));
                return;
            }
            const scheduledMedia = [
                ...selectedGifs,
                ...scheduledImages ?? []
            ];
            try {
                await (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__/* .scheduleTweet */ .yg)({
                    text: inputValue.trim() || null,
                    parent: isReplying && parent ? parent : null,
                    images: scheduledMedia.length ? scheduledMedia : null,
                    poll: poll ?? null,
                    createdBy: userId,
                    scheduledAt: scheduledDate,
                    location: tweetLocation
                });
            } catch  {
                setLoading(false);
                react_hot_toast__WEBPACK_IMPORTED_MODULE_5__.toast.error("Impossible de programmer la publication. R\xe9essayez.");
                return;
            }
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__.toast.success(`Publication programmée pour le ${scheduledDate.toLocaleString("fr-FR")}`);
            discardTweet();
            setScheduledDate(null);
            setLoading(false);
            if (closeModal) closeModal();
            return;
        }
        let uploadedImages = null;
        try {
            uploadedImages = await (0,_lib_supabase_storage__WEBPACK_IMPORTED_MODULE_9__/* .uploadImages */ .eg)(userId, selectedImages);
        } catch (error1) {
            setLoading(false);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__.toast.error((0,_lib_supabase_storage__WEBPACK_IMPORTED_MODULE_9__/* .getStorageErrorMessage */ .UB)(error1));
            return;
        }
        const images = [
            ...selectedGifs,
            ...uploadedImages ?? []
        ];
        const tweetData = {
            text: inputValue.trim() || null,
            parent: isReplying && parent ? parent : null,
            images: images.length ? images : null,
            poll: poll ?? null,
            pollVotes: poll ? {} : null,
            location: tweetLocation,
            audioURL,
            audioDuration,
            linkPreview,
            userLikes: [],
            createdBy: userId,
            createdAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.serverTimestamp)(),
            updatedAt: null,
            userReplies: 0,
            userRetweets: []
        };
        await (0,_lib_utils__WEBPACK_IMPORTED_MODULE_33__/* .sleep */ ._v)(500);
        const [tweetRef] = await Promise.all([
            (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.addDoc)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_7__/* .tweetsCollection */ .VV, tweetData),
            (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__/* .manageTotalTweets */ .$1)("increment", userId),
            tweetData.images && (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__/* .manageTotalPhotos */ .iq)("increment", userId),
            isReplying && (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__/* .manageReply */ .Mq)("increment", parent?.id)
        ]);
        const { id: tweetId  } = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.getDoc)(tweetRef);
        if (!modal && !replyModal) {
            discardTweet();
            setLoading(false);
        }
        if (closeModal) closeModal();
        react_hot_toast__WEBPACK_IMPORTED_MODULE_5__.toast.success(()=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "flex gap-2",
                children: [
                    "Your Tweet was sent",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: `/tweet/${tweetId}`,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            className: "custom-underline font-bold",
                            children: "Voir"
                        })
                    })
                ]
            }), {
            duration: 6000
        });
    };
    /* Ajout de fichiers à la publication : que viennent du collage, du menu des
     photos ou du sélecteur du système, ils passent tous par ici. */ const addFiles = (files)=>{
        const imagesData = (0,_lib_validation__WEBPACK_IMPORTED_MODULE_12__/* .getImagesData */ .t6)(files, {
            currentFiles: previewCount,
            allowUploadingVideos: true
        });
        if (!imagesData) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__.toast.error("Please choose a GIF or photo up to 4");
            return;
        }
        const { imagesPreviewData , selectedImagesData  } = imagesData;
        setImagesPreview([
            ...imagesPreview,
            ...imagesPreviewData
        ]);
        setSelectedImages([
            ...selectedImages,
            ...selectedImagesData
        ]);
        /* Les dimensions des images sont relevées juste après : l'aperçu peut
       ainsi être affiché dans le bon format, sans changer de taille quand
       l'image arrive. */ void (0,_lib_validation__WEBPACK_IMPORTED_MODULE_12__/* .fillImagesSizes */ .Rv)(imagesPreviewData).then((sized)=>{
            setImagesPreview((current)=>current.map((image)=>sized.find(({ id  })=>id === image.id) ?? image));
        });
        inputRef.current?.focus({
            preventScroll: true
        });
    };
    const handleImageUpload = (e)=>{
        const isClipboardEvent = "clipboardData" in e;
        if (isClipboardEvent) {
            const isPastingText = e.clipboardData.getData("text");
            if (isPastingText) return;
        }
        const files = isClipboardEvent ? e.clipboardData.files : e.target.files;
        addFiles(files);
    };
    const handleGifSelect = (gif)=>{
        setImagesPreview([
            ...imagesPreview,
            gif
        ]);
        setSelectedGifs([
            ...selectedGifs,
            gif
        ]);
        inputRef.current?.focus({
            preventScroll: true
        });
    };
    /* L'emoji est inséré à l'endroit du curseur, pas à la fin du texte : on
     peut continuer d'écrire à la suite. Le curseur est replacé juste après
     l'emoji. */ const handleEmojiSelect = (emoji)=>{
        const input = inputRef.current;
        if (!input) {
            setInputValue((current)=>current + emoji);
            return;
        }
        const start = input.selectionStart ?? input.value.length;
        const end = input.selectionEnd ?? start;
        setInputValue((current)=>current.slice(0, start) + emoji + current.slice(end));
        /* Le curseur avance : l'aperçu du sélecteur suit. */ setEmojiCaret(start + emoji.length);
        /* Sur téléphone, on ne rend pas le focus à la zone de saisie : le
       clavier se rouvrirait par-dessus la feuille d'emoji. Sur ordinateur, on
       le rend pour pouvoir continuer à écrire. Dans les deux cas, le focus
       ne doit pas faire défiler la page. */ if (isEmojiSheet) return;
        requestAnimationFrame(()=>{
            input.focus({
                preventScroll: true
            });
            const position = start + emoji.length;
            input.setSelectionRange(position, position);
        });
    };
    const removeImage = (targetId)=>()=>{
            setSelectedImages(selectedImages.filter(({ id  })=>id !== targetId));
            setSelectedGifs(selectedGifs.filter(({ id  })=>id !== targetId));
            setImagesPreview(imagesPreview.filter(({ id  })=>id !== targetId));
            const image = imagesPreview.find(({ id  })=>id === targetId);
            const isGif = selectedGifs.some(({ id  })=>id === targetId);
            if (image && !isGif) URL.revokeObjectURL(image.src);
        };
    const cleanImage = ()=>{
        imagesPreview.forEach(({ src  })=>URL.revokeObjectURL(src));
        setSelectedImages([]);
        setSelectedGifs([]);
        setImagesPreview([]);
    };
    const discardTweet = ()=>{
        setInputValue("");
        setVisited(false);
        setPoll(null);
        setScheduledDate(null);
        setTweetLocation(null);
        setAudioURL(null);
        setAudioDuration(null);
        setRecordingOpen(false);
        setVoiceStreamPromise(null);
        setLinkPreview(null);
        previewUrlRef.current = null;
        cleanImage();
        inputRef.current?.blur();
    };
    const handleChange = ({ target: { value  }  })=>{
        setInputValue(value);
        const link = (0,_lib_link_preview__WEBPACK_IMPORTED_MODULE_34__/* .findLink */ .s2)(value);
        if (!link) {
            previewUrlRef.current = null;
            setLinkPreview(null);
            return;
        }
        if (link === previewUrlRef.current) return;
        previewUrlRef.current = link;
        setLinkPreview(null);
        void (0,_lib_link_preview__WEBPACK_IMPORTED_MODULE_34__/* .fetchLinkPreview */ .ne)(link).then((data)=>{
            /* Le lien a pu changer entre-temps : on n'affiche plus rien. */ if (previewUrlRef.current !== link) return;
            setLinkPreview(data);
        });
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        void sendTweet();
    };
    const handleFocus = ()=>setVisited(!loading);
    const formId = (0,react__WEBPACK_IMPORTED_MODULE_2__.useId)();
    const inputLimit = isAdmin ? 560 : 280;
    const inputLength = inputValue.length;
    const isValidInput = !!inputValue.trim().length;
    const isCharLimitExceeded = inputLength > inputLimit;
    const isValidTweet = !isCharLimitExceeded && (isValidInput || isUploadingImages || Boolean(poll) || Boolean(audioURL));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
        className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("flex flex-col", {
            "-mx-4": reply,
            "gap-2": replyModal,
            "cursor-not-allowed": disabled
        }),
        onSubmit: handleSubmit,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_31__/* .Modal */ .u_, {
                modalClassName: "max-w-xs bg-main-background w-full p-8 rounded-2xl",
                open: discardOpen,
                closeModal: closeDiscardModal,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_action_modal__WEBPACK_IMPORTED_MODULE_32__/* .ActionModal */ .W, {
                    title: "Supprimer la publication ?",
                    description: "Cette action est irr\xe9versible et votre brouillon sera perdu.",
                    mainBtnClassName: "bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75",
                    mainBtnLabel: "Supprimer",
                    action: ()=>{
                        discardTweet();
                        closeDiscardModal();
                    },
                    closeModal: closeDiscardModal
                })
            }),
            sheetHandle && dragControls && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                "aria-label": "Faire glisser pour fermer la fen\xeatre",
                className: "flex w-full touch-none justify-center py-3 lg:hidden",
                onPointerDown: (event)=>dragControls.start(event.nativeEvent),
                type: "button",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_gif_picker_modal__WEBPACK_IMPORTED_MODULE_24__/* .GifPickerModal */ .Y, {
                open: gifOpen,
                closeModal: ()=>setGifOpen(false),
                onSelect: handleGifSelect
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_media_menu__WEBPACK_IMPORTED_MODULE_17__/* .MediaMenu */ .z, {
                open: photosOpen,
                closeModal: ()=>setPhotosOpen(false),
                onSelect: (files)=>{
                    setPhotosOpen(false);
                    addFiles(files);
                },
                allowVideos: true
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_poll_modal__WEBPACK_IMPORTED_MODULE_25__/* .PollModal */ .w, {
                open: pollOpen,
                poll: poll,
                closeModal: ()=>setPollOpen(false),
                onApply: setPoll
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_emoji_picker__WEBPACK_IMPORTED_MODULE_26__/* .EmojiPicker */ .h, {
                caret: emojiCaret,
                open: emojiOpen,
                closeModal: ()=>setEmojiOpen(false),
                onSelect: handleEmojiSelect,
                value: inputValue
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_schedule_modal__WEBPACK_IMPORTED_MODULE_27__/* .ScheduleModal */ .h, {
                open: scheduleOpen,
                closeModal: ()=>setScheduleOpen(false),
                onSchedule: (date)=>setScheduledDate(date)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_location_modal__WEBPACK_IMPORTED_MODULE_28__/* .LocationModal */ .F, {
                open: locationOpen,
                closeModal: ()=>setLocationOpen(false),
                onSelect: setTweetLocation,
                current: tweetLocation,
                onClear: ()=>setTweetLocation(null)
            }),
            loading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.i, {
                className: "h-1 animate-pulse bg-main-accent",
                ...variants
            }),
            children,
            reply && visited && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.p, {
                className: "ml-[75px] -mb-2 mt-2 text-light-secondary dark:text-dark-secondary",
                ..._input_form__WEBPACK_IMPORTED_MODULE_15__/* .fromTop */ .TW,
                children: [
                    "En r\xe9ponse \xe0",
                    " ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: `/user/${parent?.username}`,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            className: "custom-underline text-main-accent",
                            children: parent?.username
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("hover-animation relative grid w-full grid-cols-[auto,1fr] gap-3 px-4 py-3", reply ? "pt-3 pb-1" : replyModal ? "pt-0" : "border-b-2 border-light-border dark:border-dark-border", (disabled || loading) && "pointer-events-none opacity-50"),
                htmlFor: formId,
                children: [
                    !reply && !replyModal && !modal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        "aria-label": "Effacer le brouillon",
                        className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition", hasContent ? "text-main-accent hover:bg-main-accent/10" : "text-light-secondary/50 dark:text-dark-secondary/50"),
                        disabled: !hasContent,
                        onClick: openDiscardModal,
                        type: "button",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_14__/* .MaterialIcon */ .O, {
                            className: "h-5 w-5",
                            iconName: "delete"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_avatar__WEBPACK_IMPORTED_MODULE_13__/* .UserAvatar */ .Y, {
                        src: photoURL,
                        alt: name,
                        username: username,
                        gender: gender,
                        frame: avatarFrame,
                        shape: avatarShape
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex w-full min-w-0 flex-col gap-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_input_form__WEBPACK_IMPORTED_MODULE_15__/* .InputForm */ .M5, {
                                modal: modal,
                                reply: reply,
                                formId: formId,
                                visited: visited,
                                loading: loading,
                                inputRef: inputRef,
                                replyModal: replyModal,
                                inputValue: inputValue,
                                isValidTweet: isValidTweet,
                                isUploadingImages: isUploadingImages,
                                sendTweet: sendTweet,
                                handleFocus: handleFocus,
                                discardTweet: discardTweet,
                                handleChange: handleChange,
                                handleImageUpload: handleImageUpload,
                                recording: recordingOpen,
                                onDiscardRequest: openDiscardModal,
                                popupOpen: emojiOpen || photosOpen || gifOpen || pollOpen || scheduleOpen || locationOpen,
                                recorder: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_voice_recorder__WEBPACK_IMPORTED_MODULE_21__/* .VoiceRecorder */ .S, {
                                    active: recordingOpen,
                                    streamPromise: voiceStreamPromise,
                                    onClose: ()=>{
                                        setRecordingOpen(false);
                                        setVoiceStreamPromise(null);
                                    },
                                    onRecorded: (url, duration)=>{
                                        setAudioURL(url);
                                        setAudioDuration(duration);
                                        setRecordingOpen(false);
                                        setVoiceStreamPromise(null);
                                        inputRef.current?.focus({
                                            preventScroll: true
                                        });
                                    },
                                    userId: user?.id
                                }),
                                children: [
                                    isUploadingImages && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_image_preview__WEBPACK_IMPORTED_MODULE_16__/* .ImagePreview */ .e, {
                                        imagesPreview: imagesPreview,
                                        previewCount: previewCount,
                                        removeImage: !loading ? removeImage : undefined
                                    }),
                                    poll && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_poll_preview__WEBPACK_IMPORTED_MODULE_18__/* .PollPreview */ .z, {
                                        poll: poll,
                                        onEdit: ()=>setPollOpen(true),
                                        onRemove: ()=>setPoll(null)
                                    }),
                                    scheduledDate && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_schedule_preview__WEBPACK_IMPORTED_MODULE_19__/* .SchedulePreview */ .G, {
                                        date: scheduledDate,
                                        onEdit: ()=>setScheduleOpen(true),
                                        onRemove: ()=>setScheduledDate(null)
                                    }),
                                    linkPreview && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_link_preview_card__WEBPACK_IMPORTED_MODULE_23__/* .LinkPreviewCard */ .y, {
                                        preview: linkPreview,
                                        onRemove: ()=>{
                                            previewUrlRef.current = null;
                                            setLinkPreview(null);
                                        }
                                    }),
                                    tweetLocation && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_location_preview__WEBPACK_IMPORTED_MODULE_20__/* .LocationPreview */ .J, {
                                        location: tweetLocation,
                                        onEdit: ()=>setLocationOpen(true),
                                        onRemove: ()=>setTweetLocation(null)
                                    }),
                                    audioURL && !recordingOpen && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "relative rounded-2xl bg-main-search-background px-4 py-3",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: "mb-2 text-xs font-semibold text-light-secondary dark:text-dark-secondary",
                                                children: "Message vocal joint \xb7 \xe0 \xe9couter avant d’envoyer"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_audio_player__WEBPACK_IMPORTED_MODULE_22__/* .AudioPlayer */ .zF, {
                                                duration: audioDuration,
                                                src: audioURL
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                "aria-label": "Retirer le message vocal",
                                                className: "absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full text-light-secondary transition hover:bg-black/5 dark:text-dark-secondary dark:hover:bg-white/5",
                                                onClick: ()=>{
                                                    setAudioURL(null);
                                                    setAudioDuration(null);
                                                },
                                                title: "Retirer le message vocal",
                                                type: "button",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_14__/* .MaterialIcon */ .O, {
                                                    className: "h-5 w-5",
                                                    iconName: "close"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.AnimatePresence, {
                                initial: false,
                                children: (reply ? reply && visited && !loading : !loading) && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_input_options__WEBPACK_IMPORTED_MODULE_29__/* .InputOptions */ .S, {
                                    reply: reply,
                                    modal: modal,
                                    inputLimit: inputLimit,
                                    inputLength: inputLength,
                                    hasPoll: Boolean(poll),
                                    scheduled: Boolean(scheduledDate),
                                    hasLocation: Boolean(tweetLocation),
                                    isValidTweet: isValidTweet,
                                    isCharLimitExceeded: isCharLimitExceeded,
                                    onPhotosClick: ()=>setPhotosOpen(true),
                                    onGifClick: ()=>setGifOpen(true),
                                    onPollClick: ()=>setPollOpen(true),
                                    onEmojiClick: ()=>{
                                        const input = inputRef.current;
                                        setEmojiCaret(input?.selectionStart ?? inputValue.length);
                                        setEmojiOpen(true);
                                    },
                                    onScheduleClick: ()=>setScheduleOpen(true),
                                    onLocationClick: ()=>setLocationOpen(true)
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1817:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ LocationPreview)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__]);
framer_motion__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




/* Aperçu du lieu dans la zone de rédaction : on voit le lieu choisi avant de
   publier, comme pour un aperçu d'image ou de sondage. */ function LocationPreview({ location , onEdit , onRemove  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
        className: "relative rounded-2xl border border-light-line-reply p-3 dark:border-dark-border",
        initial: {
            opacity: 0,
            y: -8
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: -8
        },
        transition: {
            duration: 0.18
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 pr-8",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                        className: "h-5 w-5 shrink-0 text-main-accent",
                        iconName: "location_on"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-sm font-bold",
                                children: "Lieu"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-xs text-light-secondary dark:text-dark-secondary",
                                children: location
                            })
                        ]
                    })
                ]
            }),
            onEdit && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .z, {
                className: "mt-3 rounded-full px-3 py-1 text-sm font-bold text-main-accent hover:bg-main-accent/10",
                onClick: onEdit,
                children: "Modifier"
            }),
            onRemove && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .z, {
                className: "accent-tab absolute right-1 top-1 rounded-full bg-light-primary/75 p-1 text-white backdrop-blur-sm hover:bg-image-preview-hover/75",
                onClick: onRemove,
                "aria-label": "Retirer le lieu",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                    className: "h-4 w-4",
                    iconName: "close"
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8628:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": () => (/* binding */ MediaMenu)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6197);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9099);
/* harmony import */ var _components_modal_camera_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(789);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_3__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_4__, _components_modal_camera_modal__WEBPACK_IMPORTED_MODULE_5__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_3__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_4__, _components_modal_camera_modal__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








/* Nombre maximal de fichiers listés dans la galerie : au-delà, la liste
   devient inutilisable et l'appareil peine à tout lire. */ const MAX_GALLERY_ITEMS = 300;
/**
 * Menu des médias : il remplace le sélecteur du système, qui s'ouvre
 * directement au clic sur l'icône.
 *
 * Trois entrées :
 *  - la caméra, pour prendre une photo ;
 *  - le sélecteur du système, qui marche partout (et permet déjà de choisir
 *    plusieurs fichiers sur téléphone) ;
 *  - la galerie du site, uniquement là où le navigateur donne accès aux
 *    fichiers (Chrome, Edge) : l'utilisateur choisit un dossier, ses images
 *    et ses vidéos s'affichent en vignettes et il en sélectionne plusieurs.
 */ function MediaMenu({ open , closeModal , onSelect , allowVideos =false  }) {
    const fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const dragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_3__.useDragControls)();
    const { 0: view , 1: setView  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("menu");
    const { 0: cameraOpen , 1: setCameraOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: folderName , 1: setFolderName  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: gallery , 1: setGallery  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: selectedIds , 1: setSelectedIds  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: browsing , 1: setBrowsing  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Le dossier n'est proposé que là où l'API existe (Chrome, Edge). */ const canBrowseFolder =  false && 0;
    /* Les vignettes sont des liens temporaires : ils sont libérés à la
     fermeture du menu. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>()=>{
            gallery.forEach(({ src  })=>{
                if (src) URL.revokeObjectURL(src);
            });
        }, [
        gallery
    ]);
    const reset = ()=>{
        setView("menu");
        setFolderName("");
        setGallery([]);
        setSelectedIds([]);
        setBrowsing(false);
    };
    const close = ()=>{
        reset();
        closeModal();
    };
    const handleFiles = (event)=>{
        const files = Array.from(event.target.files ?? []);
        event.target.value = "";
        if (!files.length) return;
        onSelect(files);
        close();
    };
    /* Ouverture du dossier choisi par l'utilisateur : ses images sont listées
     et affichées en vignettes. */ const browseFolder = async ()=>{
        if (!window.showDirectoryPicker) return;
        setBrowsing(true);
        try {
            const directory = await window.showDirectoryPicker({
                mode: "read"
            });
            const items = [];
            for await (const handle of directory.values()){
                if (items.length >= MAX_GALLERY_ITEMS) break;
                if (handle.kind !== "file") continue;
                const file = await handle.getFile();
                const isImage = file.type.startsWith("image/");
                const isVideo = file.type.startsWith("video/");
                /* Seules les images et les vidéos sont exploitables par le site ;
           les autres fichiers du dossier sont ignorés. */ if (!isImage && !isVideo) continue;
                items.push({
                    id: `${handle.name}-${items.length}`,
                    name: file.name,
                    file,
                    src: isImage ? URL.createObjectURL(file) : "",
                    isVideo
                });
            }
            setFolderName(directory.name);
            setGallery(items);
            setSelectedIds([]);
            setView("gallery");
        } catch  {
        /* L'utilisateur a fermé la fenêtre de choix de dossier : on reste
         sur le menu. */ } finally{
            setBrowsing(false);
        }
    };
    const toggleItem = (id)=>{
        setSelectedIds((current)=>current.includes(id) ? current.filter((item)=>item !== id) : [
                ...current,
                id
            ]);
    };
    const selectedFiles = gallery.filter(({ id  })=>selectedIds.includes(id)).map(({ file  })=>file);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_4__/* .Modal */ .u_, {
                className: "flex items-end justify-center p-0 lg:items-center lg:p-4",
                modalClassName: `flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-lg border-t border-light-border bg-main-background shadow-2xl transition-[height,max-height,border-radius] duration-300 ease-out dark:border-dark-border lg:static lg:max-h-[80vh] lg:max-w-md lg:rounded-lg lg:border ${view === "gallery" ? "h-[100dvh] max-h-[100dvh] rounded-none lg:h-auto lg:max-h-[80vh]" : ""}`,
                drag: "y",
                dragControls: dragControls,
                dragListener: false,
                dragSnapToOrigin: true,
                dragUp: 160,
                onDragEnd: (_, info)=>{
                    if (info.offset.y > 100 || info.velocity.y > 700) close();
                },
                open: open,
                closeModal: close,
                closeOnBackdropClick: true,
                children: view === "menu" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            "aria-label": "Faire glisser la fen\xeatre vers le bas ou vers le haut",
                            className: "flex w-full touch-none justify-center py-3 lg:hidden",
                            onPointerDown: (event)=>dragControls.start(event.nativeEvent),
                            type: "button",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col gap-2 p-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                            className: "text-lg font-bold text-light-primary dark:text-dark-primary",
                                            children: "M\xe9dias"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            "aria-label": "Fermer",
                                            className: "-mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-light-secondary transition hover:bg-light-primary/10 dark:text-dark-secondary dark:hover:bg-dark-primary/10",
                                            onClick: close,
                                            type: "button",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                className: "h-5 w-5",
                                                iconName: "close"
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    className: "flex items-center gap-4 rounded-md p-3 text-left transition hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                                    onClick: ()=>setCameraOpen(true),
                                    type: "button",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "bg-main-accent/15 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-main-accent",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                className: "h-6 w-6",
                                                iconName: "photo_camera"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "block font-bold text-light-primary dark:text-dark-primary",
                                                    children: "Prendre une photo"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "block text-sm text-light-secondary dark:text-dark-secondary",
                                                    children: "Utilisez la cam\xe9ra de l’appareil"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    className: "flex items-center gap-4 rounded-md p-3 text-left transition hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                                    onClick: ()=>fileInputRef.current?.click(),
                                    type: "button",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "bg-main-accent/15 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-main-accent",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                className: "h-6 w-6",
                                                iconName: "upload"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "block font-bold text-light-primary dark:text-dark-primary",
                                                    children: "Choisir un fichier"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "block text-sm text-light-secondary dark:text-dark-secondary",
                                                    children: allowVideos ? "Images, vid\xe9os ou autres fichiers de l’appareil" : "Images ou autres fichiers de l’appareil"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                canBrowseFolder && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    className: "flex items-center gap-4 rounded-md p-3 text-left transition hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                                    disabled: browsing,
                                    onClick: ()=>void browseFolder(),
                                    type: "button",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "bg-main-accent/15 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-main-accent",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                className: "h-6 w-6",
                                                iconName: "description"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "block font-bold text-light-primary dark:text-dark-primary",
                                                    children: "Parcourir mes fichiers"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "block text-sm text-light-secondary dark:text-dark-secondary",
                                                    children: browsing ? "Ouverture du dossier…" : "Choisissez un dossier, ses images et vid\xe9os s’affichent ici"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    accept: allowVideos ? "image/*,video/*" : "image/*",
                                    className: "hidden",
                                    multiple: true,
                                    onChange: handleFiles,
                                    ref: fileInputRef,
                                    type: "file"
                                })
                            ]
                        })
                    ]
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-3 border-b border-light-border/60 px-4 py-3 dark:border-dark-border/60",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    "aria-label": "Revenir au menu des m\xe9dias",
                                    className: "-ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-light-primary transition hover:bg-light-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/10",
                                    onClick: ()=>setView("menu"),
                                    type: "button",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                        className: "h-5 w-5",
                                        iconName: "arrow_back"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                            className: "truncate text-base font-bold text-light-primary dark:text-dark-primary",
                                            children: folderName || "Mes fichiers"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "truncate text-xs text-light-secondary dark:text-dark-secondary",
                                            children: selectedIds.length ? `${selectedIds.length} fichier${selectedIds.length > 1 ? "s" : ""} sélectionné${selectedIds.length > 1 ? "s" : ""}` : `${gallery.length} fichier${gallery.length > 1 ? "s" : ""}`
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    "aria-label": "Fermer",
                                    className: "-mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-light-secondary transition hover:bg-light-primary/10 dark:text-dark-secondary dark:hover:bg-dark-primary/10",
                                    onClick: close,
                                    type: "button",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                        className: "h-5 w-5",
                                        iconName: "close"
                                    })
                                })
                            ]
                        }),
                        gallery.length === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "px-6 py-12 text-center text-sm text-light-secondary dark:text-dark-secondary",
                            children: "Aucun fichier image ou vid\xe9o dans ce dossier."
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "grid min-h-0 flex-1 grid-cols-3 gap-1 overflow-y-auto overscroll-contain p-1 xs:grid-cols-4",
                            children: gallery.map((item)=>{
                                const selected = selectedIds.includes(item.id);
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    "aria-pressed": selected,
                                    className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("group relative aspect-square overflow-hidden rounded-md border-2 transition", selected ? "border-main-accent" : "border-transparent hover:border-light-line-reply dark:hover:border-dark-border"),
                                    onClick: ()=>toggleItem(item.id),
                                    title: item.name,
                                    type: "button",
                                    children: [
                                        item.isVideo ? /* Une vidéo n'a pas de vignette : on montre l'icône
                           de lecture, sur un fond sombre. */ /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "flex h-full w-full items-center justify-center bg-black/70 text-white",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                className: "h-7 w-7",
                                                iconName: "play_arrow",
                                                solid: true
                                            })
                                        }) : /* eslint-disable-next-line @next/next/no-img-element */ /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            alt: item.name,
                                            className: "h-full w-full object-cover",
                                            loading: "lazy",
                                            src: item.src
                                        }),
                                        selected && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-main-accent text-white",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                className: "h-3 w-3",
                                                iconName: "check",
                                                solid: true
                                            })
                                        })
                                    ]
                                }, item.id);
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "border-t border-light-border/60 p-3 dark:border-dark-border/60",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_6__/* .Button */ .z, {
                                className: "w-full rounded-full bg-main-accent py-2 font-bold text-white enabled:hover:brightness-90",
                                disabled: !selectedIds.length,
                                onClick: ()=>{
                                    onSelect(selectedFiles);
                                    close();
                                },
                                children: selectedIds.length ? `Ajouter ${selectedIds.length} fichier${selectedIds.length > 1 ? "s" : ""}` : "S\xe9lectionnez des fichiers"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_camera_modal__WEBPACK_IMPORTED_MODULE_5__/* .CameraModal */ .T, {
                open: cameraOpen,
                onClose: ()=>setCameraOpen(false),
                onCapture: (file)=>{
                    setCameraOpen(false);
                    onSelect([
                        file
                    ]);
                    close();
                }
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5025:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": () => (/* binding */ PollPreview)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__]);
framer_motion__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




/* Aperçu du sondage dans la zone de rédaction : on voit la question et les
   choix avant de publier, comme pour un aperçu d'image. */ function PollPreview({ poll , onEdit , onRemove  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
        className: "relative rounded-2xl border border-light-line-reply p-3 dark:border-dark-border",
        initial: {
            opacity: 0,
            y: -8
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: -8
        },
        transition: {
            duration: 0.18
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col gap-2",
                children: [
                    poll.question && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "font-bold",
                        children: poll.question
                    }),
                    poll.options.map(({ id , text  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "rounded-lg border border-light-line-reply px-3 py-2 text-sm dark:border-dark-border",
                            children: text
                        }, id))
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mt-3 flex items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-xs text-light-secondary dark:text-dark-secondary",
                        children: [
                            poll.multiple ? "Plusieurs r\xe9ponses" : "Une seule r\xe9ponse",
                            " \xb7",
                            " ",
                            poll.options.length,
                            " choix"
                        ]
                    }),
                    onEdit && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .z, {
                        className: "rounded-full px-3 py-1 text-sm font-bold text-main-accent hover:bg-main-accent/10",
                        onClick: onEdit,
                        children: "Modifier"
                    })
                ]
            }),
            onRemove && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .z, {
                className: "accent-tab absolute right-1 top-1 rounded-full bg-light-primary/75 p-1 text-white backdrop-blur-sm hover:bg-image-preview-hover/75",
                onClick: onRemove,
                "aria-label": "Retirer le sondage",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                    className: "h-4 w-4",
                    iconName: "close"
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1225:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ ProgressBar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3276);



const baseOffset = [
    56.5487,
    87.9646
];
const circleStyles = [
    {
        container: null,
        viewBox: "0 0 20 20",
        stroke: "stroke-main-accent",
        r: 9
    },
    {
        container: "scale-150",
        viewBox: "0 0 30 30",
        stroke: "stroke-accent-yellow",
        r: 14
    }
];
function ProgressBar({ modal , inputLimit , inputLength , isCharLimitExceeded  }) {
    const isCloseToLimit = inputLength >= inputLimit - 20;
    const baseCircle = baseOffset[+isCloseToLimit];
    const inputPercentage = inputLength / inputLimit * 100;
    const circleLength = baseCircle - baseCircle * inputPercentage / 100;
    const remainingCharacters = inputLimit - inputLength;
    const isHittingCharLimit = remainingCharacters <= 0;
    const { container , viewBox , stroke , r  } = circleStyles[+isCloseToLimit];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        className: "group relative cursor-pointer outline-none",
        type: "button",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("flex h-5 w-5 -rotate-90 items-center justify-center transition", container, remainingCharacters <= -10 && "opacity-0"),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                    className: "overflow-visible",
                    width: "100%",
                    height: "100%",
                    viewBox: viewBox,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                            className: "stroke-light-border dark:stroke-dark-border",
                            cx: "50%",
                            cy: "50%",
                            fill: "none",
                            strokeWidth: "2",
                            r: r
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                            className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("transition-colors", isHittingCharLimit ? "stroke-accent-red" : stroke),
                            cx: "50%",
                            cy: "50%",
                            fill: "none",
                            strokeWidth: "2",
                            r: r,
                            strokeLinecap: "round",
                            style: {
                                strokeDashoffset: !isCharLimitExceeded ? circleLength : 0,
                                strokeDasharray: baseCircle
                            }
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%]
           scale-50 text-xs opacity-0`, {
                    "scale-100 opacity-100 transition": isCloseToLimit,
                    "text-accent-red": isHittingCharLimit
                }),
                children: remainingCharacters
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_2__/* .ToolTip */ .e, {
                tip: isCharLimitExceeded ? "You have exceeded the character limit" : `${remainingCharacters} characters remaining`,
                modal: modal
            })
        ]
    });
}


/***/ }),

/***/ 793:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G": () => (/* binding */ SchedulePreview)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__]);
framer_motion__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




/* Aperçu de la programmation : on voit la date et l'heure choisies avant
   d'enregistrer la publication programmée. */ function SchedulePreview({ date , onEdit , onRemove  }) {
    const formatted = date.toLocaleString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
        className: "relative rounded-2xl border border-light-line-reply p-3 dark:border-dark-border",
        initial: {
            opacity: 0,
            y: -8
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: -8
        },
        transition: {
            duration: 0.18
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 pr-8",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                        className: "h-5 w-5 shrink-0 text-main-accent",
                        iconName: "calendar_month"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-sm font-bold",
                                children: "Publication programm\xe9e"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-xs capitalize text-light-secondary dark:text-dark-secondary",
                                children: formatted
                            })
                        ]
                    })
                ]
            }),
            onEdit && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .z, {
                className: "mt-3 rounded-full px-3 py-1 text-sm font-bold text-main-accent hover:bg-main-accent/10",
                onClick: onEdit,
                children: "Modifier"
            }),
            onRemove && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .z, {
                className: "accent-tab absolute right-1 top-1 rounded-full bg-light-primary/75 p-1 text-white backdrop-blur-sm hover:bg-image-preview-hover/75",
                onClick: onRemove,
                "aria-label": "Annuler la programmation",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                    className: "h-4 w-4",
                    iconName: "close"
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 909:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ VoiceRecorder)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6197);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6201);
/* harmony import */ var _lib_audio_voice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(913);
/* harmony import */ var _lib_audio_recorder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1945);
/* harmony import */ var _components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2365);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__, react_hot_toast__WEBPACK_IMPORTED_MODULE_4__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_2__, react_hot_toast__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









function formatTime(totalSeconds) {
    if (!Number.isFinite(totalSeconds) || totalSeconds < 0) totalSeconds = 0;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
/**
 * Enregistreur de message vocal de la barre de publication.
 *
 * Même matériel que la messagerie : capture PCM du micro, conversion en MP3 et
 * durée exacte. L'enregistrement démarre dès que le panneau est ouvert, se
 * ferme à la croix ou en cliquant à l'extérieur.
 */ function VoiceRecorder({ userId , active , streamPromise , onRecorded , onClose , className  }) {
    const { 0: recording , 1: setRecording  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: seconds , 1: setSeconds  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: sending , 1: setSending  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const panelRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const sessionRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const streamRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const startedAtRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const timerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const closedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    /* Numéro du démarrage courant : annule les démarrages obsolètes (StrictMode,
     fermeture pendant l'autorisation micro). */ const runRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const stopTimer = ()=>{
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };
    const stopStream = ()=>{
        streamRef.current?.getTracks().forEach((track)=>track.stop());
        streamRef.current = null;
    };
    /* Ferme le panneau sans remonter le micro (croix ou clic dehors). */ const close = ()=>{
        closedRef.current = true;
        runRef.current++;
        stopTimer();
        sessionRef.current?.cancel();
        sessionRef.current = null;
        stopStream();
        setRecording(false);
        onClose();
    };
    const upload = async (note)=>{
        setSending(true);
        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fileName: `voice-${Date.now()}.${note.extension}`,
                    contentType: note.mimeType,
                    base64Data: await (0,_lib_audio_voice__WEBPACK_IMPORTED_MODULE_8__/* .blobToBase64 */ .w8)(note.blob),
                    userId
                })
            });
            if (!response.ok) throw new Error("upload-failed");
            const { url  } = await response.json();
            if (!url) throw new Error("upload-failed");
            setSending(false);
            onRecorded(url, Math.max(1, Math.round(note.duration || 1)));
        } catch  {
            setSending(false);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_4__.toast.error("Impossible d'enregistrer le message vocal.");
            close();
        }
    };
    /* Arrête la capture. Un enregistrement annulé n'est ni envoyé ni converti. */ const finish = async (cancelled)=>{
        const session = sessionRef.current;
        if (!session) return;
        runRef.current++;
        sessionRef.current = null;
        stopTimer();
        if (cancelled) {
            session.cancel();
            stopStream();
            setRecording(false);
            return;
        }
        const note = await session.stop();
        stopStream();
        setRecording(false);
        if (closedRef.current) return;
        if (!note) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_4__.toast.error("L'enregistrement est vide : aucun message envoy\xe9.");
            close();
            return;
        }
        await upload(note);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!active) return;
        /* Un clic à l'extérieur du panneau annule l'enregistrement. */ const handleClickOutside = (event)=>{
            if (panelRef.current?.contains(event.target)) return;
            close();
        };
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>document.removeEventListener("mousedown", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        active
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>()=>{
            /* Quitter le composant interrompt l'enregistrement en cours. */ closedRef.current = true;
            runRef.current++;
            stopTimer();
            sessionRef.current?.cancel();
            sessionRef.current = null;
            stopStream();
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    /* L'ouverture du panneau lance directement l'enregistrement. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!active || recording || sending) return;
        closedRef.current = false;
        const start = async ()=>{
            const run = ++runRef.current;
            if (!streamPromise && !navigator.mediaDevices?.getUserMedia) {
                react_hot_toast__WEBPACK_IMPORTED_MODULE_4__.toast.error("Les messages vocaux ne sont pas pris en charge par ce navigateur.");
                close();
                return;
            }
            try {
                /* Débloque l'audio dans le geste utilisateur (iOS/Safari). */ (0,_lib_audio_recorder__WEBPACK_IMPORTED_MODULE_5__/* .unlockVoiceAudio */ .X)();
                const stream = streamPromise ? await streamPromise : await navigator.mediaDevices.getUserMedia({
                    audio: true
                });
                if (closedRef.current || runRef.current !== run) {
                    stream.getTracks().forEach((track)=>track.stop());
                    return;
                }
                streamRef.current = stream;
                const session = await (0,_lib_audio_recorder__WEBPACK_IMPORTED_MODULE_5__/* .startVoiceCapture */ .E)(stream);
                if (closedRef.current || runRef.current !== run) {
                    session.cancel();
                    stream.getTracks().forEach((track)=>track.stop());
                    if (streamRef.current === stream) streamRef.current = null;
                    return;
                }
                sessionRef.current = session;
                startedAtRef.current = Date.now();
                setSeconds(0);
                setRecording(true);
                timerRef.current = setInterval(()=>{
                    const elapsed = Math.round((Date.now() - startedAtRef.current) / 1000);
                    setSeconds(elapsed);
                    if (elapsed >= _lib_audio_voice__WEBPACK_IMPORTED_MODULE_8__/* .MAX_RECORD_SECONDS */ .hr) {
                        stopTimer();
                        void finish(false);
                    }
                }, 250);
            } catch  {
                react_hot_toast__WEBPACK_IMPORTED_MODULE_4__.toast.error("Impossible d'acc\xe9der au microphone.");
                close();
            }
        };
        void start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        active
    ]);
    const stop = (cancelled)=>{
        void finish(cancelled);
    };
    if (!active) return null;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
        animate: {
            opacity: 1,
            y: 0
        },
        className: clsx__WEBPACK_IMPORTED_MODULE_3___default()(/* Compact sur mobile : la barre reste dans la largeur de l'écran et ne
           provoque aucun défilement horizontal. */ "flex w-full min-w-0 items-center gap-2 overflow-hidden rounded-2xl", "bg-main-search-background px-3 py-2 xs:gap-3 xs:rounded-3xl xs:px-4", className),
        initial: {
            opacity: 0,
            y: 8
        },
        ref: panelRef,
        children: sending ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_6__/* .CustomIcon */ .d, {
                    className: "h-5 w-5 text-main-accent",
                    iconName: "SpinnerIcon"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-sm text-light-secondary dark:text-dark-secondary",
                    children: "Envoi du message vocal…"
                })
            ]
        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-[#e5484d]"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-sm font-semibold tabular-nums text-light-primary dark:text-dark-primary",
                    children: formatTime(seconds)
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "min-w-0 flex-1 truncate text-right text-xs text-light-secondary dark:text-dark-secondary",
                    children: "Enregistrement…"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    "aria-label": "Annuler le message vocal",
                    className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-light-secondary transition hover:bg-black/5 dark:text-dark-secondary dark:hover:bg-white/5",
                    onClick: close,
                    type: "button",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                        className: "h-5 w-5",
                        iconName: "close"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    "aria-label": "Envoyer le message vocal",
                    className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-main-accent text-white transition hover:brightness-90 active:scale-95",
                    onClick: ()=>stop(false),
                    type: "button",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                        className: "h-4 w-4",
                        iconName: "send",
                        solid: true
                    })
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3238:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IP": () => (/* binding */ ProtectedLayout),
/* harmony export */   "OS": () => (/* binding */ TrendsLayout),
/* harmony export */   "Os": () => (/* binding */ HomeLayout),
/* harmony export */   "rf": () => (/* binding */ UserLayout),
/* harmony export */   "vK": () => (/* binding */ PeopleLayout)
/* harmony export */ });
/* unused harmony export InspirationAILayout */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_hooks_useRequireAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2843);
/* harmony import */ var _components_aside_aside__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9920);
/* harmony import */ var _components_aside_aside_trends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(254);
/* harmony import */ var _components_aside_suggestions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6125);
/* harmony import */ var _components_common_placeholder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(643);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_hooks_useRequireAuth__WEBPACK_IMPORTED_MODULE_1__, _components_aside_aside__WEBPACK_IMPORTED_MODULE_2__, _components_aside_aside_trends__WEBPACK_IMPORTED_MODULE_3__]);
([_lib_hooks_useRequireAuth__WEBPACK_IMPORTED_MODULE_1__, _components_aside_aside__WEBPACK_IMPORTED_MODULE_2__, _components_aside_aside_trends__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






function ProtectedLayout({ children  }) {
    const user = (0,_lib_hooks_useRequireAuth__WEBPACK_IMPORTED_MODULE_1__/* .useRequireAuth */ .Q)();
    if (!user) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_placeholder__WEBPACK_IMPORTED_MODULE_4__/* .Placeholder */ .V, {});
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: children
    });
}
function HomeLayout({ children  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            children,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_aside_aside__WEBPACK_IMPORTED_MODULE_2__/* .Aside */ .x, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_aside_aside_trends__WEBPACK_IMPORTED_MODULE_3__/* .AsideTrends */ .j, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_aside_suggestions__WEBPACK_IMPORTED_MODULE_5__/* .Suggestions */ .D, {})
                ]
            })
        ]
    });
}
function InspirationAILayout({ children  }) {
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            children,
            /*#__PURE__*/ _jsxs(Aside, {
                children: [
                    /*#__PURE__*/ _jsx(AsideTrends, {}),
                    /*#__PURE__*/ _jsx(Suggestions, {})
                ]
            })
        ]
    });
}
function UserLayout({ children  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            children,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_aside_aside__WEBPACK_IMPORTED_MODULE_2__/* .Aside */ .x, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_aside_suggestions__WEBPACK_IMPORTED_MODULE_5__/* .Suggestions */ .D, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_aside_aside_trends__WEBPACK_IMPORTED_MODULE_3__/* .AsideTrends */ .j, {})
                ]
            })
        ]
    });
}
function TrendsLayout({ children  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_aside_aside__WEBPACK_IMPORTED_MODULE_2__/* .Aside */ .x, {
                inTrendsPage: true,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_aside_suggestions__WEBPACK_IMPORTED_MODULE_5__/* .Suggestions */ .D, {})
            })
        ]
    });
}
function PeopleLayout({ children  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_aside_aside__WEBPACK_IMPORTED_MODULE_2__/* .Aside */ .x, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_aside_aside_trends__WEBPACK_IMPORTED_MODULE_3__/* .AsideTrends */ .j, {})
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4415:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ MainLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5941);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6201);
/* harmony import */ var _lib_fetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7000);
/* harmony import */ var _lib_context_window_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6625);
/* harmony import */ var _components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8283);
/* harmony import */ var _components_home_swipe_container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4885);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_1__, react_hot_toast__WEBPACK_IMPORTED_MODULE_2__, _components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_4__, _components_home_swipe_container__WEBPACK_IMPORTED_MODULE_5__]);
([swr__WEBPACK_IMPORTED_MODULE_1__, react_hot_toast__WEBPACK_IMPORTED_MODULE_2__, _components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_4__, _components_home_swipe_container__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const toastOptions = {
    style: {
        color: "white",
        borderRadius: "4px",
        backgroundColor: "rgb(var(--main-accent))"
    },
    success: {
        duration: 4000
    }
};
function MainLayout({ children  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex w-full justify-center gap-0 lg:gap-4",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_lib_context_window_context__WEBPACK_IMPORTED_MODULE_3__/* .WindowContextProvider */ .En, {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex min-h-[100dvh] w-full max-w-[1440px] gap-0 lg:gap-4",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_sidebar_sidebar__WEBPACK_IMPORTED_MODULE_4__/* .Sidebar */ .Y, {}),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(swr__WEBPACK_IMPORTED_MODULE_1__.SWRConfig, {
                            value: {
                                fetcher: _lib_fetch__WEBPACK_IMPORTED_MODULE_6__/* .fetchJSON */ .Z
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "flex min-w-0 flex-1 justify-center gap-0 overflow-x-clip lg:gap-4",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_home_swipe_container__WEBPACK_IMPORTED_MODULE_5__/* .SwipeContainer */ .M, {
                                    children: children
                                })
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_hot_toast__WEBPACK_IMPORTED_MODULE_2__.Toaster, {
                position: "bottom-center",
                toastOptions: toastOptions,
                containerClassName: "mb-12 xs:mb-0"
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9253:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ ActionModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1185);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4685);
/* harmony import */ var _components_common_site_logo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5439);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_headlessui_react__WEBPACK_IMPORTED_MODULE_3__]);
_headlessui_react__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






function ActionModal({ title , useIcon , description , mainBtnLabel , focusOnMainBtn , mainBtnClassName , secondaryBtnLabel , secondaryBtnClassName , action , closeModal  }) {
    const mainBtn = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!focusOnMainBtn) return;
        /* `preventScroll` : le bouton ne doit pas défiler la page pour être
       amenities à l'écran. */ const timeoutId = setTimeout(()=>mainBtn.current?.focus({
                preventScroll: true
            }), 50);
        return ()=>clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col gap-6",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col gap-4",
                children: [
                    useIcon && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                        className: "mx-auto",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_site_logo__WEBPACK_IMPORTED_MODULE_5__/* .SiteLogo */ .S, {
                            size: 56
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.Dialog.Title, {
                                className: "text-xl font-bold",
                                children: title
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.Dialog.Description, {
                                className: "text-light-secondary dark:text-dark-secondary",
                                children: description
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col gap-3 inner:py-2 inner:font-bold",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("custom-button main-tab text-white", mainBtnClassName ?? `bg-light-primary hover:bg-light-primary/90 focus-visible:bg-light-primary/90 active:bg-light-primary/80
               dark:bg-light-border dark:text-light-primary dark:hover:bg-light-border/90
               dark:focus-visible:bg-light-border/90 dark:active:bg-light-border/75`),
                        ref: mainBtn,
                        onClick: action,
                        children: mainBtnLabel
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .z, {
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("border border-light-line-reply dark:border-light-secondary dark:text-light-border", secondaryBtnClassName ?? `hover:bg-light-primary/10 focus-visible:bg-light-primary/10 active:bg-light-primary/20
               dark:hover:bg-light-border/10 dark:focus-visible:bg-light-border/10 dark:active:bg-light-border/20`),
                        onClick: closeModal,
                        children: secondaryBtnLabel ?? "Cancel"
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 789:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ CameraModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6405);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6197);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_3__]);
framer_motion__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






/* Prise de photo avec l'appareil photo de l'appareil (téléphone, tablette,
   webcam) : un aperçu en direct, un déclencheur, et la photo obtenue est
   renvoyée comme un simple fichier image.

   La fenêtre reprend le gabarit des autres menus du site (choix des photos,
   des formes, des cadres) : panneau collé aux bords sur téléphone, petite
   fenêtre centrée sur ordinateur. Affichée dans le corps de la page, pour
   qu'elle ne soit jamais rognée par la fenêtre de modification du profil. */ function CameraModal({ open , onClose , onCapture , onPickFile  }) {
    const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const streamRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { 0: mounted , 1: setMounted  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: facingMode , 1: setFacingMode  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("user");
    const { 0: canFlip , 1: setCanFlip  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: ready , 1: setReady  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: error , 1: setError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: flash , 1: setFlash  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>setMounted(true), []);
    /* La touche Échap referme le menu. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        const handleKey = (event)=>{
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return ()=>window.removeEventListener("keydown", handleKey);
    }, [
        open,
        onClose
    ]);
    const stopCamera = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        streamRef.current?.getTracks().forEach((track)=>track.stop());
        streamRef.current = null;
        setReady(false);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        let cancelled = false;
        setError("");
        setFlash(false);
        const start = async ()=>{
            if (!navigator.mediaDevices?.getUserMedia) {
                setError("Cet appareil n’a pas d’appareil photo utilisable.");
                return;
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode,
                        width: {
                            ideal: 1280
                        },
                        height: {
                            ideal: 1280
                        }
                    },
                    audio: false
                });
                if (cancelled) {
                    stream.getTracks().forEach((track)=>track.stop());
                    return;
                }
                streamRef.current = stream;
                const devices = await navigator.mediaDevices.enumerateDevices();
                setCanFlip(devices.filter(({ kind  })=>kind === "videoinput").length > 1);
                const video = videoRef.current;
                if (video) {
                    video.srcObject = stream;
                    await video.play().catch(()=>undefined);
                    if (!cancelled) setReady(true);
                }
            } catch  {
                setError("Impossible d’ouvrir l’appareil photo. Autorisez la cam\xe9ra, puis r\xe9essayez.");
            }
        };
        void start();
        return ()=>{
            cancelled = true;
            stopCamera();
        };
    }, [
        open,
        facingMode,
        stopCamera
    ]);
    /* La photo est découpée dans l'image affichée. L'aperçu de la caméra avant
     est en miroir : la photo l'est aussi, pour correspondre à ce que l'on
     vient de voir. */ const capture = ()=>{
        const video = videoRef.current;
        if (!video || !video.videoWidth) return;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        if (!context) return;
        if (facingMode === "user") {
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
        }
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setFlash(true);
        canvas.toBlob((blob)=>{
            setFlash(false);
            if (!blob) return;
            onCapture(new File([
                blob
            ], `photo-${Date.now()}.jpg`, {
                type: "image/jpeg"
            }));
        }, "image/jpeg", 0.92);
    };
    if (!mounted) return null;
    return /*#__PURE__*/ (0,react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.AnimatePresence, {
        children: open && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.div, {
            className: "fixed inset-0 z-[70] flex items-end justify-center xs:items-center xs:p-4",
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            transition: {
                duration: 0.15
            },
            onClick: onClose,
            role: "presentation",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "absolute inset-0 bg-black/40 dark:bg-[#5B7083]/40",
                    "aria-hidden": "true"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.div, {
                    className: "relative flex max-h-[88dvh] w-full max-w-md flex-col overflow-y-auto overscroll-contain rounded-t-2xl border-t border-light-border bg-main-background p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl dark:border-dark-border xs:max-h-[80vh] xs:rounded-md xs:border xs:pb-5",
                    initial: {
                        y: 40,
                        opacity: 0.6
                    },
                    animate: {
                        y: 0,
                        opacity: 1
                    },
                    exit: {
                        y: 30,
                        opacity: 0
                    },
                    transition: {
                        type: "spring",
                        damping: 30,
                        stiffness: 320
                    },
                    onClick: (event)=>event.stopPropagation(),
                    role: "dialog",
                    "aria-label": "Se prendre en photo",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "mx-auto mb-3 h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50 xs:hidden",
                            "aria-hidden": "true"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
                            className: "mb-4 flex items-start justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                            className: "text-base font-bold text-light-primary dark:text-dark-primary",
                                            children: "Se prendre en photo"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "mt-0.5 text-sm text-light-secondary dark:text-dark-secondary",
                                            children: "Cadrez votre visage, puis appuyez sur le d\xe9clencheur."
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "-mr-2 -mt-2 rounded-full p-2 text-light-primary transition hover:bg-light-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/10",
                                    type: "button",
                                    onClick: onClose,
                                    "aria-label": "Fermer l’appareil photo",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                        className: "h-5 w-5",
                                        iconName: "close"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "relative h-[46dvh] w-full overflow-hidden rounded-xl bg-black xs:h-72",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("video", {
                                    className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("h-full w-full object-cover", facingMode === "user" && "scale-x-[-1]"),
                                    ref: videoRef,
                                    autoPlay: true,
                                    playsInline: true,
                                    muted: true
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("pointer-events-none absolute inset-0 bg-white transition-opacity duration-200", flash ? "opacity-80" : "opacity-0"),
                                    "aria-hidden": "true"
                                }),
                                canFlip && ready && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65",
                                    type: "button",
                                    onClick: ()=>setFacingMode((mode)=>mode === "user" ? "environment" : "user"),
                                    "aria-label": "Changer de cam\xe9ra",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                        className: "h-5 w-5",
                                        iconName: "refresh"
                                    })
                                }),
                                !ready && !error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "absolute inset-0 flex flex-col items-center justify-center gap-3",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white",
                                            "aria-hidden": "true"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-sm text-white/80",
                                            children: "Ouverture de l’appareil photo…"
                                        })
                                    ]
                                }),
                                error && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                            className: "h-9 w-9 text-white/70",
                                            iconName: "photo_camera"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "max-w-xs text-sm text-white/80",
                                            children: error
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mt-4 flex flex-col items-center gap-1",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "flex h-16 w-16 items-center justify-center rounded-full bg-main-accent text-white ring-4 ring-main-accent/20 transition active:scale-95 disabled:opacity-40 disabled:ring-0",
                                    type: "button",
                                    onClick: capture,
                                    disabled: !ready,
                                    "aria-label": "Prendre la photo",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                        className: "h-7 w-7",
                                        iconName: "photo_camera"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "text-xs text-light-secondary dark:text-dark-secondary",
                                    children: "Prendre la photo"
                                })
                            ]
                        }),
                        onPickFile && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            className: "group mt-4 flex w-full items-center gap-3 rounded-2xl border border-light-border p-3 text-left transition hover:border-light-line-reply hover:bg-light-primary/[0.03] dark:border-dark-border dark:hover:border-dark-line-reply dark:hover:bg-dark-primary/[0.04]",
                            type: "button",
                            onClick: onPickFile,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-light-primary/[0.06] text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                        className: "h-5 w-5",
                                        iconName: "upload"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "flex min-w-0 flex-1 flex-col gap-0.5",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "truncate text-sm font-bold text-light-primary dark:text-dark-primary",
                                            children: "Choisir une image de votre appareil"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "truncate text-xs text-light-secondary dark:text-dark-secondary",
                                            children: "Une photo d\xe9j\xe0 pr\xe9sente sur votre appareil"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                    className: "h-4 w-4 shrink-0 text-light-secondary transition group-hover:translate-x-0.5 dark:text-dark-secondary",
                                    iconName: "chevron_right"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    }), document.body);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 330:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ DisplayModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5655);
/* harmony import */ var _lib_fonts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9449);
/* harmony import */ var _components_input_input_theme_radio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9141);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4685);
/* harmony import */ var _components_input_input_accent_radio__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(926);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3325);
/* harmony import */ var _components_common_site_logo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5439);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__, _components_input_input_theme_radio__WEBPACK_IMPORTED_MODULE_4__, _components_input_input_accent_radio__WEBPACK_IMPORTED_MODULE_6__]);
([_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__, _components_input_input_theme_radio__WEBPACK_IMPORTED_MODULE_4__, _components_input_input_accent_radio__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const themes = [
    [
        "auto",
        "Automatique",
        "S’adapte au r\xe9glage de votre syst\xe8me"
    ],
    [
        "light",
        "Clair",
        "Interface lumineuse"
    ],
    [
        "dim",
        "Sombre",
        "Bleu nuit apaisant"
    ],
    [
        "dark",
        "Noir absolu",
        "Contraste maximal"
    ]
];
const accentsColor = [
    [
        "blue",
        "Bleu"
    ],
    [
        "indigo",
        "Indigo"
    ],
    [
        "pink",
        "Rose"
    ],
    [
        "purple",
        "Violet"
    ],
    [
        "red",
        "Rouge"
    ],
    [
        "green",
        "Vert"
    ]
];
function SectionHeader({ iconName , title , description  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-start gap-3",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-main-accent/10 text-main-accent",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                    className: "h-4 w-4",
                    iconName: iconName
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        className: "text-sm font-semibold tracking-tight text-light-primary dark:text-dark-primary",
                        children: title
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "mt-0.5 text-xs leading-relaxed text-light-secondary dark:text-dark-secondary",
                        children: description
                    })
                ]
            })
        ]
    });
}
function DisplayModal({ closeModal  }) {
    const { font , setTheme , setAccent , setFont  } = (0,_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__/* .useTheme */ .Fg)();
    const handleReset = ()=>{
        setTheme("auto");
        setAccent("blue");
        setFont(_lib_fonts__WEBPACK_IMPORTED_MODULE_3__/* .DEFAULT_FONT */ .Uo);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col gap-7",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
                className: "flex items-start gap-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "font-title text-2xl font-medium leading-tight tracking-tight text-light-primary dark:text-dark-primary",
                                children: "Apparence"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "mt-2 max-w-md text-sm leading-relaxed text-light-secondary dark:text-dark-secondary",
                                children: "Ajustez les couleurs, le th\xe8me et la typographie. Chaque modification s’applique en direct, dans toute l’application."
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                        "aria-label": "Fermer la fen\xeatre Apparence",
                        className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-light-secondary transition-colors duration-200 hover:bg-light-primary/10 hover:text-light-primary dark:text-dark-secondary dark:hover:bg-dark-primary/10 dark:hover:text-dark-primary",
                        onClick: closeModal,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                            className: "h-8 w-8",
                            iconName: "close"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                "aria-label": "Aper\xe7u du th\xe8me",
                className: "overflow-hidden rounded-md border border-light-border bg-main-background dark:border-dark-border",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between border-b border-light-border px-4 py-2 dark:border-dark-border",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "text-[11px] text-light-secondary dark:text-dark-secondary",
                                children: "Aper\xe7u en direct"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "text-[11px] text-light-secondary dark:text-dark-secondary",
                                children: "Publication"
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("article", {
                        className: "px-4 py-3.5",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex flex-wrap items-center gap-x-1.5 leading-none text-light-secondary dark:text-dark-secondary",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_site_logo__WEBPACK_IMPORTED_MODULE_8__/* .SiteLogo */ .S, {
                                            size: 20,
                                            className: "shrink-0"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "font-bold text-light-primary dark:text-dark-primary",
                                            children: "Inspiration"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "flex h-5 w-5 shrink-0 items-center justify-center",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                className: "h-[18px] w-[18px] text-main-accent",
                                                iconName: "verified",
                                                solid: true
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "truncate",
                                            children: "@inspiration"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            children: "\xb7 maintenant"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "mt-1 text-[15px] leading-normal text-light-primary dark:text-dark-primary",
                                    children: "Un espace pour partager vos id\xe9es, d\xe9couvrir d’autres perspectives et cr\xe9er des liens qui comptent. Prenez place : votre prochaine conversation commence ici."
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mt-2 flex items-center justify-between text-light-secondary dark:text-dark-secondary",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "rounded-full p-1.5",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                        className: "h-5 w-5",
                                                        iconName: "chat_bubble"
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "text-sm",
                                                    children: "12"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "rounded-full p-1.5",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                        className: "h-5 w-5",
                                                        iconName: "repeat"
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "text-sm",
                                                    children: "4"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "rounded-full p-1.5",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                        className: "h-5 w-5",
                                                        iconName: "favorite"
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "text-sm",
                                                    children: "48"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "flex items-center gap-1.5",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "rounded-full p-1.5",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                    className: "h-5 w-5",
                                                    iconName: "ios_share"
                                                })
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: "flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SectionHeader, {
                        iconName: "palette",
                        title: "Couleur d’accent",
                        description: "Utilis\xe9e pour les boutons, les liens et les \xe9l\xe9ments actifs."
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "grid grid-cols-2 gap-2.5 sm:grid-cols-3",
                        children: accentsColor.map(([accentColor, label])=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_input_input_accent_radio__WEBPACK_IMPORTED_MODULE_6__/* .InputAccentRadio */ .x, {
                                type: accentColor,
                                label: label
                            }, accentColor))
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: "flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SectionHeader, {
                        iconName: "appearance",
                        title: "Th\xe8me",
                        description: "Choisissez l’ambiance qui vous accompagne."
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "divide-y divide-light-border overflow-hidden rounded-xl border border-light-border dark:divide-dark-border dark:border-dark-border",
                        children: themes.map(([themeType, label, description])=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_input_input_theme_radio__WEBPACK_IMPORTED_MODULE_4__/* .InputThemeRadio */ .f, {
                                type: themeType,
                                label: label,
                                description: description
                            }, themeType))
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: "flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SectionHeader, {
                        iconName: "description",
                        title: "Police de caract\xe8res",
                        description: "S\xe9lectionnez la famille qui vous accompagne au quotidien."
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "grid grid-cols-1 gap-2.5 sm:grid-cols-2",
                        children: _lib_fonts__WEBPACK_IMPORTED_MODULE_3__/* .fontOptions.map */ .yf.map(({ key , label , description  })=>{
                            const isSelected = font === key;
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                "aria-pressed": isSelected,
                                onClick: ()=>setFont(key),
                                className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(`group flex h-[78px] items-center gap-3 overflow-hidden rounded-xl border
                   p-3 text-left transition-colors duration-200 focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-main-accent/40`, isSelected ? "border-main-accent bg-main-accent/10" : "border-light-border bg-light-primary/[0.02] hover:border-light-secondary/40 hover:bg-light-primary/[0.05] dark:border-dark-border dark:bg-dark-primary/[0.02] dark:hover:border-dark-secondary/60 dark:hover:bg-dark-primary/[0.05]"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        "aria-hidden": "true",
                                        className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-main-accent/10 text-xl font-semibold text-main-accent",
                                        style: {
                                            fontFamily: _lib_fonts__WEBPACK_IMPORTED_MODULE_3__/* .fontStacks */ .SA[key]
                                        },
                                        children: "Aa"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("block truncate text-sm font-semibold", isSelected ? "text-main-accent" : "text-light-primary dark:text-dark-primary"),
                                                children: label
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "mt-0.5 block overflow-hidden text-xs leading-snug text-light-secondary [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] dark:text-dark-secondary",
                                                children: description
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200", isSelected ? "border-transparent bg-main-accent text-white" : "border-light-border text-transparent dark:border-dark-border"),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                            className: "h-4 w-4",
                                            iconName: "check"
                                        })
                                    })
                                ]
                            }, key);
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("footer", {
                className: "flex flex-col gap-3 border-t border-light-border pt-5 dark:border-dark-border sm:flex-row sm:items-center sm:justify-between",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "order-2 text-xs leading-relaxed text-light-secondary dark:text-dark-secondary sm:order-1",
                        children: "Vos pr\xe9f\xe9rences sont appliqu\xe9es en direct."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "order-1 flex items-center justify-end gap-2 sm:order-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                className: "rounded-full px-4 py-2 text-sm font-semibold text-light-secondary transition-colors duration-200 hover:bg-light-primary/5 hover:text-light-primary dark:text-dark-secondary dark:hover:bg-dark-primary/10 dark:hover:text-dark-primary",
                                onClick: handleReset,
                                children: "R\xe9initialiser"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                className: "rounded-full bg-main-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-main-accent/90 active:scale-[0.98]",
                                onClick: closeModal,
                                children: "Enregistrer"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8251:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ GifPickerModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9099);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3325);
/* harmony import */ var _lib_context_window_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6625);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6197);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_modal_modal__WEBPACK_IMPORTED_MODULE_3__, framer_motion__WEBPACK_IMPORTED_MODULE_7__]);
([_components_modal_modal__WEBPACK_IMPORTED_MODULE_3__, framer_motion__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const categories = [
    {
        id: "trending",
        label: "Tendances"
    },
    {
        id: "reaction",
        label: "R\xe9actions"
    },
    {
        id: "happy",
        label: "Joie"
    },
    {
        id: "love",
        label: "Amour"
    },
    {
        id: "laugh",
        label: "Rire"
    },
    {
        id: "dance",
        label: "Danse"
    },
    {
        id: "animals",
        label: "Animaux"
    }
];
function GifPickerModal({ open , closeModal , onSelect  }) {
    const { width  } = (0,_lib_context_window_context__WEBPACK_IMPORTED_MODULE_6__/* .useWindow */ .zY)();
    const dragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_7__.useDragControls)();
    /* Sur téléphone et tablette, la fenêtre est une feuille collée au bas de
     l'écran ; sur grand écran, elle est centrée. */ const isSheet = width < 1024;
    const { 0: query , 1: setQuery  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: category , 1: setCategory  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("trending");
    const { 0: gifs , 1: setGifs  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: offset , 1: setOffset  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: hasMore , 1: setHasMore  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: error , 1: setError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const gridRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const loadMoreRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const loadingMoreRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const loadGifs = async (nextOffset, replace)=>{
        setLoading(true);
        setError(false);
        try {
            const params = new URLSearchParams({
                category,
                offset: String(nextOffset),
                limit: "24"
            });
            if (query.trim()) params.set("query", query.trim());
            const response = await fetch(`/api/gifs?${params.toString()}`);
            const payload = await response.json();
            if (!response.ok || !payload.gifs) throw new Error("GIF request failed");
            setGifs((current)=>replace ? payload.gifs ?? [] : [
                    ...current,
                    ...payload.gifs ?? []
                ]);
            setOffset(nextOffset);
            setHasMore(!!payload.hasMore);
        } catch  {
            setError(true);
            if (replace) setGifs([]);
        } finally{
            setLoading(false);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        void loadGifs(0, true);
    // Reload only when the modal, category, or submitted search changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        open,
        category,
        query
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const grid = gridRef.current;
        const sentinel = loadMoreRef.current;
        if (!open || !hasMore || loading || !grid || !sentinel) return;
        const observer = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting && !loadingMoreRef.current) {
                loadingMoreRef.current = true;
                void loadGifs(offset + 24, false).finally(()=>{
                    loadingMoreRef.current = false;
                });
            }
        }, {
            root: grid,
            rootMargin: "0px 0px 160px 0px"
        });
        observer.observe(sentinel);
        return ()=>observer.disconnect();
    // loadGifs uses the current category and query from this render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        open,
        hasMore,
        loading,
        offset,
        category,
        query
    ]);
    const handleSelect = (gif)=>{
        onSelect(gif);
        setQuery("");
        closeModal();
    };
    const handleSearchSubmit = (event)=>{
        event.preventDefault();
        void loadGifs(0, true);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_modal_modal__WEBPACK_IMPORTED_MODULE_3__/* .Modal */ .u_, {
        open: open,
        closeModal: closeModal,
        className: "flex items-end justify-center p-0 lg:items-center lg:p-4",
        drag: isSheet ? "y" : undefined,
        dragControls: dragControls,
        dragListener: false,
        onDragEnd: (_, info)=>{
            if (isSheet && info.offset.y > 80) closeModal();
        },
        modalClassName: isSheet ? "w-full overflow-hidden rounded-t-lg border-t border-light-border bg-main-background pb-[env(safe-area-inset-bottom)] dark:border-dark-border" : "w-full max-w-2xl overflow-hidden rounded-lg bg-main-background shadow-xl",
        modalAnimation: isSheet ? {
            initial: {
                opacity: 0,
                y: "100%"
            },
            animate: {
                opacity: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                y: "100%"
            }
        } : undefined,
        children: [
            isSheet && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                "aria-label": "Faire glisser pour fermer le s\xe9lecteur de GIF",
                className: "flex w-full touch-none justify-center py-3",
                onPointerDown: (event)=>dragControls.start(event.nativeEvent),
                type: "button",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between border-b border-light-border px-4 py-3 dark:border-dark-border",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("font-bold", isSheet ? "text-lg" : "text-xl"),
                        children: "Choisir un GIF"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .z, {
                        className: "accent-tab rounded-full p-2 hover:bg-main-accent/10",
                        onClick: closeModal,
                        "aria-label": "Fermer le s\xe9lecteur de GIF",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                            className: "h-5 w-5",
                            iconName: "close"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "p-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                        className: "relative block",
                        onSubmit: handleSearchSubmit,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                className: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-light-secondary dark:text-dark-secondary",
                                iconName: "search"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                className: "w-full rounded-full bg-light-secondary/10 py-2 pl-10 pr-4 outline-none ring-main-accent focus:ring-2 dark:bg-dark-secondary/10",
                                value: query,
                                onChange: ({ target: { value  }  })=>setQuery(value),
                                placeholder: "Rechercher parmi des milliers de GIFs...",
                                "aria-label": "Rechercher un GIF",
                                autoFocus: true
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "mt-3 flex gap-2 overflow-x-auto pb-1",
                        children: categories.map(({ id , label  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-bold transition ${category === id ? "bg-main-accent text-white" : "bg-light-secondary/10 text-light-secondary hover:bg-main-accent/10 dark:bg-dark-secondary/10 dark:text-dark-secondary"}`,
                                type: "button",
                                onClick: ()=>setCategory(id),
                                children: label
                            }, id))
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("mt-4 grid grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-4", isSheet ? "max-h-[50vh]" : "max-h-[55vh]"),
                        ref: gridRef,
                        children: [
                            gifs.map((gif)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "group relative aspect-square overflow-hidden rounded-xl bg-light-secondary/10 ring-main-accent transition hover:ring-2 focus:outline-none focus:ring-2",
                                    type: "button",
                                    onClick: ()=>handleSelect(gif),
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        className: "h-full w-full object-cover transition group-hover:scale-105",
                                        src: gif.src,
                                        alt: gif.alt,
                                        loading: "lazy"
                                    })
                                }, gif.id)),
                            hasMore && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                "aria-hidden": "true",
                                className: "col-span-full h-1",
                                ref: loadMoreRef
                            })
                        ]
                    }),
                    loading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "py-5 text-center text-light-secondary dark:text-dark-secondary",
                        children: "Chargement des GIFs..."
                    }),
                    !loading && !gifs.length && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "py-8 text-center text-light-secondary dark:text-dark-secondary",
                        children: error ? "Les GIFs sont temporairement indisponibles." : "Aucun GIF trouv\xe9."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                        className: "mt-4 flex items-center justify-center gap-2 text-xs font-medium text-light-secondary transition hover:text-main-accent dark:text-dark-secondary",
                        href: "https://giphy.com/",
                        target: "_blank",
                        rel: "noreferrer",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                className: "h-5 w-5 rounded-sm object-contain",
                                src: "https://giphy.com/static/img/favicon.png",
                                alt: "GIPHY"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: "GIFs anim\xe9s par GIPHY"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3644:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ ImageModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6197);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6269);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_loading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9570);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9099);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__, _modal__WEBPACK_IMPORTED_MODULE_7__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_2__, _modal__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* eslint-disable react-hooks/exhaustive-deps */ 









const arrowButtons = [
    [
        "prev",
        null,
        "arrow_back"
    ],
    [
        "next",
        "order-1",
        "arrow_forward"
    ]
];
function ImageModal({ tweet , imageData , previewCount , selectedIndex , handleNextIndex  }) {
    const { 0: indexes , 1: setIndexes  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { src , alt , type  } = imageData;
    const isVideo = type?.includes("video");
    const requireArrows = handleNextIndex && previewCount > 1;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (tweet && selectedIndex !== undefined && !indexes.includes(selectedIndex)) {
            setLoading(true);
            setIndexes([
                ...indexes,
                selectedIndex
            ]);
        }
        const media = isVideo ? document.createElement("video") : new Image();
        media.src = src;
        const handleLoadingCompleted = ()=>setLoading(false);
        if (isVideo) media.onloadeddata = handleLoadingCompleted;
        else media.onload = handleLoadingCompleted;
    }, [
        ...tweet && previewCount > 1 ? [
            src
        ] : []
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!requireArrows) return;
        const handleKeyDown = ({ key  })=>{
            const callback = key === "ArrowLeft" ? handleNextIndex("prev") : key === "ArrowRight" ? handleNextIndex("next") : null;
            if (callback) callback();
        };
        document.addEventListener("keydown", handleKeyDown);
        return ()=>document.removeEventListener("keydown", handleKeyDown);
    }, [
        handleNextIndex
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            requireArrows && arrowButtons.map(([name, className, iconName])=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .z, {
                    className: clsx__WEBPACK_IMPORTED_MODULE_3___default()(`absolute z-10 hover:bg-light-primary/10 active:bg-light-primary/20
               dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20`, name === "prev" ? "left-2" : "right-2", className),
                    onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__/* .preventBubbling */ .Db)(handleNextIndex(name)),
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                        iconName: iconName
                    })
                }, name)),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.AnimatePresence, {
                mode: "wait",
                children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
                    className: "mx-auto",
                    ..._modal__WEBPACK_IMPORTED_MODULE_7__/* .backdrop */ .zi,
                    exit: tweet ? _modal__WEBPACK_IMPORTED_MODULE_7__/* .backdrop.exit */ .zi.exit : undefined,
                    transition: {
                        duration: 0.15
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_loading__WEBPACK_IMPORTED_MODULE_6__/* .Loading */ .g, {
                        iconClassName: "w-20 h-20"
                    })
                }) : /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
                    className: "relative mx-auto",
                    ..._modal__WEBPACK_IMPORTED_MODULE_7__/* .modal */ .oC,
                    key: src,
                    children: [
                        isVideo ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "group relative flex max-w-3xl",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("video", {
                                className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("max-h-[50vh] rounded-md object-contain md:max-h-[60vh]", loading ? "hidden" : "block"),
                                src: src,
                                autoPlay: true,
                                controls: true,
                                playsInline: true,
                                onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__/* .preventBubbling */ .Db)(),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("source", {
                                    srcSet: src,
                                    type: "video/*"
                                })
                            })
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("picture", {
                            className: "group relative flex max-w-3xl",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("source", {
                                    srcSet: src,
                                    type: "image/*"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    className: "max-h-[75vh] rounded-md object-contain md:max-h-[80vh]",
                                    src: src,
                                    alt: alt,
                                    onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__/* .preventBubbling */ .Db)()
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    className: "trim-alt accent-tab absolute bottom-0 right-0 mx-2 mb-2 translate-y-4 rounded-md bg-main-background/40 px-2 py-1 text-sm text-light-primary/80 opacity-0 transition hover:bg-main-accent hover:text-white focus-visible:translate-y-0 focus-visible:bg-main-accent focus-visible:text-white focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 dark:text-dark-primary/80",
                                    href: src,
                                    target: "_blank",
                                    rel: "noreferrer",
                                    onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__/* .preventBubbling */ .Db)(null, true),
                                    children: alt
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            className: "custom-underline absolute left-0 -bottom-7 font-medium text-light-primary/80 decoration-transparent underline-offset-2 transition hover:text-light-primary hover:underline hover:decoration-light-primary focus-visible:text-light-primary dark:text-dark-primary/80 dark:hover:text-dark-primary dark:hover:decoration-dark-primary dark:focus-visible:text-dark-primary",
                            href: src,
                            target: "_blank",
                            rel: "noreferrer",
                            onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_8__/* .preventBubbling */ .Db)(null, true),
                            children: "Open original"
                        })
                    ]
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8286:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ LocationModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_context_window_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6625);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6197);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9099);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_4__, _modal__WEBPACK_IMPORTED_MODULE_5__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_4__, _modal__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const sheetAnimation = {
    initial: {
        opacity: 0,
        y: "100%"
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 30,
            stiffness: 300
        }
    },
    exit: {
        opacity: 0,
        y: "100%",
        transition: {
            duration: 0.2
        }
    }
};
/* Fenêtre de choix d'un lieu : recherche de vraies villes (Photon) et bouton
   « Ma position » (géolocalisation du navigateur). Sur mobile elle s'ouvre
   comme un menu collé au bas de l'écran. */ function LocationModal({ open , closeModal , onSelect , current , onClear  }) {
    const { width  } = (0,_lib_context_window_context__WEBPACK_IMPORTED_MODULE_3__/* .useWindow */ .zY)();
    const dragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_4__.useDragControls)();
    /* Sur téléphone et tablette, la fenêtre est une feuille collée au bas de
     l'écran ; sur grand écran, elle est centrée. */ const isSheet = width < 1024;
    const { 0: query , 1: setQuery  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: suggestions , 1: setSuggestions  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: isSearching , 1: setIsSearching  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: locating , 1: setLocating  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: message , 1: setMessage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Recherche différée des villes.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        const trimmed = query.trim();
        if (trimmed.length < 2) {
            setSuggestions([]);
            return;
        }
        const timer = setTimeout(()=>{
            void (async ()=>{
                setIsSearching(true);
                try {
                    const res = await fetch(`/api/location/suggest?q=${encodeURIComponent(trimmed)}`);
                    if (res.ok) {
                        const data = await res.json();
                        setSuggestions(data.suggestions ?? []);
                    }
                } catch  {
                // Pas de réseau : la saisie libre reste possible.
                } finally{
                    setIsSearching(false);
                }
            })();
        }, 280);
        return ()=>clearTimeout(timer);
    }, [
        query,
        open
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) {
            setQuery("");
            setSuggestions([]);
            setMessage(null);
        }
    }, [
        open
    ]);
    const choose = (label)=>{
        const value = label.trim();
        if (!value) return;
        onSelect(value);
        closeModal();
    };
    const useMyPosition = ()=>{
        if (!("geolocation" in navigator)) {
            setMessage("La g\xe9olocalisation n’est pas disponible.");
            return;
        }
        setLocating(true);
        setMessage(null);
        navigator.geolocation.getCurrentPosition(async ({ coords  })=>{
            try {
                const res = await fetch(`/api/location/suggest?lat=${coords.latitude}&lon=${coords.longitude}`);
                const data = await res.json();
                if (data.location) choose(data.location);
                else setMessage("Impossible de trouver ta position.");
            } catch  {
                setMessage("Impossible de trouver ta position.");
            } finally{
                setLocating(false);
            }
        }, ()=>{
            setLocating(false);
            setMessage("Acc\xe8s \xe0 la position refus\xe9.");
        }, {
            timeout: 10000
        });
    };
    const showFreeText = query.trim().length >= 2;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_modal__WEBPACK_IMPORTED_MODULE_5__/* .Modal */ .u_, {
        open: open,
        closeModal: closeModal,
        className: "flex items-end justify-center p-0 lg:items-center lg:p-4",
        modalAnimation: isSheet ? sheetAnimation : undefined,
        modalClassName: isSheet ? "w-full overflow-hidden rounded-t-lg border-t border-light-border bg-main-background pb-[env(safe-area-inset-bottom)] dark:border-dark-border" : "w-full max-w-md overflow-hidden rounded-lg bg-main-background shadow-xl",
        drag: isSheet ? "y" : undefined,
        dragControls: dragControls,
        dragListener: false,
        onDragEnd: (_, info)=>{
            if (isSheet && info.offset.y > 80) closeModal();
        },
        children: [
            isSheet && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                "aria-label": "Faire glisser pour fermer la fen\xeatre des lieux",
                className: "flex w-full touch-none justify-center py-3",
                onPointerDown: (event)=>dragControls.start(event.nativeEvent),
                type: "button",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                ref: containerRef,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between border-b border-light-border px-4 py-3 dark:border-dark-border",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("font-bold", isSheet ? "text-lg" : "text-xl"),
                                children: "Ajouter un lieu"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_6__/* .Button */ .z, {
                                className: "accent-tab rounded-full p-2 hover:bg-main-accent/10",
                                onClick: closeModal,
                                "aria-label": "Fermer",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                    className: "h-5 w-5",
                                    iconName: "close"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col gap-3 p-4",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative flex items-center",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "pointer-events-none absolute left-3 flex items-center text-light-secondary/70 dark:text-dark-secondary/70",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                            iconName: "location_on",
                                            className: "h-4 w-4"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        type: "text",
                                        autoComplete: "off",
                                        autoFocus: true,
                                        placeholder: "Chercher une ville…",
                                        value: query,
                                        onChange: ({ target: { value  }  })=>setQuery(value),
                                        onKeyDown: (event)=>{
                                            if (event.key === "Enter" && query.trim()) choose(query);
                                        },
                                        className: "w-full rounded-xl border border-light-line-reply bg-main-background py-2.5 pr-16 pl-9 text-sm outline-none transition focus:border-main-accent dark:border-dark-border"
                                    }),
                                    isSearching && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "absolute right-3 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-main-accent border-t-transparent"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: useMyPosition,
                                disabled: locating,
                                className: "inline-flex items-center gap-2 self-start text-sm font-bold text-main-accent transition hover:underline disabled:opacity-50",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                        iconName: "location_on",
                                        className: "h-4 w-4"
                                    }),
                                    locating ? "Recherche…" : "Utiliser ma position"
                                ]
                            }),
                            message && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-xs text-accent-red",
                                children: message
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                className: "max-h-[40vh] overflow-y-auto",
                                children: [
                                    suggestions.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                type: "button",
                                                onClick: ()=>choose(item.label),
                                                className: "flex w-full items-center gap-2.5 rounded-lg px-2 py-2.5 text-left text-sm transition hover:bg-main-accent/10",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                        iconName: "location_on",
                                                        className: "h-4 w-4 shrink-0 text-light-secondary"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "min-w-0 flex-1 truncate font-medium",
                                                        children: item.label
                                                    })
                                                ]
                                            })
                                        }, `${item.label}-${index}`)),
                                    showFreeText && suggestions.length === 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: ()=>choose(query),
                                            className: "flex w-full items-center gap-2.5 rounded-lg px-2 py-2.5 text-left text-sm transition hover:bg-main-accent/10",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                    iconName: "location_on",
                                                    className: "h-4 w-4 shrink-0 text-light-secondary"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "min-w-0 flex-1 truncate font-medium",
                                                    children: [
                                                        "Utiliser \xab\xa0",
                                                        query.trim(),
                                                        "\xa0\xbb"
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                                ]
                            }),
                            current && onClear && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                type: "button",
                                onClick: ()=>{
                                    onClear();
                                    closeModal();
                                },
                                className: "mt-1 inline-flex items-center gap-2 self-start text-sm font-bold text-accent-red transition hover:underline",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                        iconName: "close",
                                        className: "h-4 w-4"
                                    }),
                                    "Retirer le lieu"
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8539:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "w": () => (/* binding */ MobileSidebarModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5655);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4685);
/* harmony import */ var _components_home_main_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3258);
/* harmony import */ var _components_sidebar_mobile_sidebar_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3715);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__, _components_home_main_header__WEBPACK_IMPORTED_MODULE_4__]);
([_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__, _components_home_main_header__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const topNavLinks = [
    {
        href: "/messages",
        linkName: "Messagerie",
        iconName: "mail"
    },
    {
        href: "/notifications",
        linkName: "Notifications",
        iconName: "notifications"
    },
    {
        href: "/people",
        linkName: "Utilisateurs",
        iconName: "dashboard_customize"
    },
    {
        href: "/settings",
        linkName: "R\xe9glages",
        iconName: "tune"
    }
];
function MobileSidebarModal({ username , photoURL , gender , avatarShape , avatarFrame , closeModal , openDisplay , openStatuses , dragControls  }) {
    const { avatarShape: localShape , avatarFrame: localFrame  } = (0,_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_2__/* .useTheme */ .Fg)();
    /* Repli sur la personnalisation locale (Apparence) : l'avatar du menu doit
     garder sa forme et son cadre même si le profil ne les a pas enregistrés. */ const menuShape = avatarShape ?? localShape;
    const menuFrame = avatarFrame ?? localFrame;
    const userLink = `/user/${username}`;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                "aria-label": "Faire glisser le menu vers le bas ou vers le haut",
                className: "flex w-full touch-none justify-center py-3 xs:hidden",
                onPointerDown: (event)=>dragControls.start(event.nativeEvent),
                type: "button",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_home_main_header__WEBPACK_IMPORTED_MODULE_4__/* .MainHeader */ .c, {
                disableSticky: true,
                useActionButton: true,
                className: "flex flex-row-reverse items-center justify-between px-5 py-1",
                iconName: "close",
                title: "Compte",
                tip: "Fermer",
                action: closeModal
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: "mt-0.5 min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                        "aria-label": "Autres sections",
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_sidebar_mobile_sidebar_link__WEBPACK_IMPORTED_MODULE_5__/* .MobileSidebarLink */ .c, {
                                href: userLink,
                                iconName: "person",
                                linkName: "Profil",
                                avatarSrc: photoURL ?? "",
                                gender: gender,
                                shape: menuShape,
                                frame: menuFrame,
                                closeMenu: closeModal
                            }),
                            topNavLinks.map((linkData)=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_sidebar_mobile_sidebar_link__WEBPACK_IMPORTED_MODULE_5__/* .MobileSidebarLink */ .c, {
                                    ...linkData,
                                    closeMenu: closeModal,
                                    key: linkData.href
                                }))
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                        className: "my-3 block h-0.5 bg-light-line-reply dark:bg-dark-line-reply"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                        "aria-label": "Pr\xe9f\xe9rences et compte",
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .z, {
                                className: "accent-tab accent-bg-tab flex items-center gap-4 rounded-md p-2 text-lg font-bold transition hover:bg-light-primary/10 focus-visible:ring-2 first:focus-visible:ring-[#878a8c] dark:hover:bg-dark-primary/10 dark:focus-visible:ring-white",
                                onClick: openDisplay,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_6__/* .MaterialIcon */ .O, {
                                        className: "h-6 w-6",
                                        iconName: "appearance"
                                    }),
                                    "Apparence"
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .z, {
                                className: "accent-tab accent-bg-tab flex items-center gap-4 rounded-md p-2 text-lg font-bold transition hover:bg-light-primary/10 focus-visible:ring-2 first:focus-visible:ring-[#878a8c] dark:hover:bg-dark-primary/10 dark:focus-visible:ring-white",
                                onClick: openStatuses,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_6__/* .MaterialIcon */ .O, {
                                        className: "h-6 w-6",
                                        iconName: "subscriptions"
                                    }),
                                    "Statuts"
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4914:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "w": () => (/* binding */ PollModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_context_window_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6625);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6197);
/* harmony import */ var _lib_random__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5195);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3325);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9099);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_4__, _modal__WEBPACK_IMPORTED_MODULE_7__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_4__, _modal__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









/* Sur téléphone, le sondage s'ouvre comme un panneau glissant depuis le bas de
   l'écran ; sur ordinateur, c'est une fenêtre centrée. */ const sheetAnimation = {
    initial: {
        opacity: 0,
        y: "100%"
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 30,
            stiffness: 300
        }
    },
    exit: {
        opacity: 0,
        y: "100%",
        transition: {
            duration: 0.2
        }
    }
};
const MIN_OPTIONS = 2;
const MAX_OPTIONS = 4;
const MAX_QUESTION_LENGTH = 80;
const MAX_OPTION_LENGTH = 25;
function createEmptyOptions(count) {
    return Array.from({
        length: count
    }, ()=>({
            id: (0,_lib_random__WEBPACK_IMPORTED_MODULE_8__/* .getRandomId */ .w)(),
            text: ""
        }));
}
function PollModal({ open , poll , closeModal , onApply  }) {
    const { width  } = (0,_lib_context_window_context__WEBPACK_IMPORTED_MODULE_3__/* .useWindow */ .zY)();
    const dragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_4__.useDragControls)();
    /* Sur téléphone et tablette, la fenêtre est une feuille collée au bas de
     l'écran ; sur grand écran, elle est centrée. */ const isSheet = width < 1024;
    const { 0: question , 1: setQuestion  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: options , 1: setOptions  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(createEmptyOptions(MIN_OPTIONS));
    const { 0: multiple , 1: setMultiple  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Chaque ouverture repart du sondage existant (ou d'un formulaire vide). */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        setQuestion(poll?.question ?? "");
        setMultiple(poll?.multiple ?? false);
        setOptions(poll && poll.options.length >= MIN_OPTIONS ? poll.options.map(({ id , text  })=>({
                id,
                text
            })) : createEmptyOptions(MIN_OPTIONS));
    }, [
        open,
        poll
    ]);
    const filledOptions = options.filter(({ text  })=>text.trim().length);
    const canApply = filledOptions.length >= MIN_OPTIONS;
    const handleOptionChange = (id)=>({ target: { value  }  })=>setOptions((current)=>current.map((option)=>option.id === id ? {
                        ...option,
                        text: value
                    } : option));
    const handleAddOption = ()=>setOptions((current)=>current.length >= MAX_OPTIONS ? current : [
                ...current,
                {
                    id: (0,_lib_random__WEBPACK_IMPORTED_MODULE_8__/* .getRandomId */ .w)(),
                    text: ""
                }
            ]);
    const handleRemoveOption = (id)=>()=>setOptions((current)=>current.length <= MIN_OPTIONS ? current : current.filter((option)=>option.id !== id));
    const handleApply = ()=>{
        if (!canApply) return;
        onApply({
            question: question.trim() || null,
            multiple,
            options: filledOptions.map(({ id , text  })=>({
                    id,
                    text: text.trim().slice(0, MAX_OPTION_LENGTH)
                }))
        });
        closeModal();
    };
    const handleRemovePoll = ()=>{
        onApply(null);
        closeModal();
    };
    const inputClassName = "w-full rounded-lg border border-light-line-reply bg-transparent px-3 py-2 text-sm outline-none " + "placeholder:text-light-secondary focus:border-main-accent dark:border-dark-border dark:placeholder:text-dark-secondary";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_modal__WEBPACK_IMPORTED_MODULE_7__/* .Modal */ .u_, {
        className: "flex items-end justify-center p-0 lg:items-center lg:p-4",
        modalAnimation: isSheet ? sheetAnimation : undefined,
        drag: isSheet ? "y" : undefined,
        dragControls: dragControls,
        dragListener: false,
        onDragEnd: (_, info)=>{
            if (isSheet && info.offset.y > 80) closeModal();
        },
        modalClassName: "fixed inset-x-0 bottom-0 max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-lg border-t border-light-border bg-main-background pb-[env(safe-area-inset-bottom)] shadow-2xl dark:border-dark-border lg:static lg:max-h-[90vh] lg:max-w-lg lg:rounded-lg lg:border",
        open: open,
        closeModal: closeModal,
        children: [
            isSheet && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                "aria-label": "Faire glisser pour fermer la fen\xeatre du sondage",
                className: "flex w-full touch-none justify-center py-3",
                onPointerDown: (event)=>dragControls.start(event.nativeEvent),
                type: "button",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between border-b border-light-border px-4 py-3 dark:border-dark-border",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        className: "text-xl font-bold",
                        children: poll ? "Modifier le sondage" : "Cr\xe9er un sondage"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                        className: "accent-tab rounded-full p-2 hover:bg-main-accent/10",
                        onClick: closeModal,
                        "aria-label": "Fermer la fen\xeatre du sondage",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_6__/* .MaterialIcon */ .O, {
                            className: "h-5 w-5",
                            iconName: "close"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col gap-4 p-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        className: "flex flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-sm font-bold text-light-secondary dark:text-dark-secondary",
                                children: [
                                    "Question ",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "font-normal",
                                        children: "(facultative)"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                className: inputClassName,
                                value: question,
                                onChange: ({ target: { value  }  })=>setQuestion(value),
                                placeholder: "Poser une question",
                                maxLength: MAX_QUESTION_LENGTH,
                                "aria-label": "Question du sondage",
                                autoFocus: true
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-sm font-bold text-light-secondary dark:text-dark-secondary",
                                children: [
                                    "Choix (",
                                    MIN_OPTIONS,
                                    " \xe0 ",
                                    MAX_OPTIONS,
                                    ")"
                                ]
                            }),
                            options.map(({ id , text  }, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            className: inputClassName,
                                            value: text,
                                            onChange: handleOptionChange(id),
                                            placeholder: `Choix ${index + 1}`,
                                            maxLength: MAX_OPTION_LENGTH,
                                            "aria-label": `Choix ${index + 1}`
                                        }),
                                        options.length > MIN_OPTIONS && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                            className: "accent-tab shrink-0 rounded-full p-2 text-light-secondary hover:bg-accent-red/10 hover:text-accent-red dark:text-dark-secondary",
                                            onClick: handleRemoveOption(id),
                                            "aria-label": `Supprimer le choix ${index + 1}`,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_6__/* .MaterialIcon */ .O, {
                                                className: "h-5 w-5",
                                                iconName: "close"
                                            })
                                        })
                                    ]
                                }, id)),
                            options.length < MAX_OPTIONS && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                className: "flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold text-main-accent hover:bg-main-accent/10",
                                onClick: handleAddOption,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_6__/* .MaterialIcon */ .O, {
                                        className: "h-5 w-5",
                                        iconName: "add"
                                    }),
                                    "Ajouter un choix"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        className: "flex items-center justify-between gap-4 rounded-lg py-1 text-left",
                        onClick: ()=>setMultiple((current)=>!current),
                        "aria-pressed": multiple,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "text-sm",
                                children: [
                                    "Autoriser plusieurs r\xe9ponses",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "block text-xs text-light-secondary dark:text-dark-secondary",
                                        children: "Sinon, une seule r\xe9ponse \xe0 la fois"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("relative h-6 w-11 shrink-0 rounded-full transition-colors", multiple ? "bg-main-accent" : "bg-light-secondary/40 dark:bg-dark-secondary/40"),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", multiple ? "left-[22px]" : "left-0.5")
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between gap-3 border-t border-light-border pt-4 dark:border-dark-border",
                        children: [
                            poll ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                className: "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold text-accent-red hover:bg-accent-red/10",
                                onClick: handleRemovePoll,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_6__/* .MaterialIcon */ .O, {
                                        className: "h-5 w-5",
                                        iconName: "delete"
                                    }),
                                    "Supprimer"
                                ]
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {}),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                        className: "rounded-full px-4 py-1.5 font-bold hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                                        onClick: closeModal,
                                        children: "Annuler"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                        className: "rounded-full bg-main-accent px-4 py-1.5 font-bold text-white enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/75",
                                        disabled: !canApply,
                                        onClick: handleApply,
                                        children: "Appliquer"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5447:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ ScheduleModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_context_window_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6625);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6197);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9099);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_3__, _modal__WEBPACK_IMPORTED_MODULE_4__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_3__, _modal__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const sheetAnimation = {
    initial: {
        opacity: 0,
        y: "100%"
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 30,
            stiffness: 300
        }
    },
    exit: {
        opacity: 0,
        y: "100%",
        transition: {
            duration: 0.2
        }
    }
};
function ScheduleModal({ open , closeModal , onSchedule  }) {
    const { width  } = (0,_lib_context_window_context__WEBPACK_IMPORTED_MODULE_2__/* .useWindow */ .zY)();
    const dragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_3__.useDragControls)();
    /* Sur téléphone et tablette, la fenêtre est une feuille collée au bas de
     l'écran ; sur grand écran, elle est centrée. */ const isSheet = width < 1024;
    const { 0: selectedDate , 1: setSelectedDate  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: selectedTime , 1: setSelectedTime  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const handleSchedule = ()=>{
        if (!selectedDate || !selectedTime) return;
        const scheduledDate = new Date(`${selectedDate}T${selectedTime}`);
        if (Number.isNaN(scheduledDate.getTime()) || scheduledDate.getTime() <= Date.now()) return;
        onSchedule(scheduledDate);
        closeModal();
    };
    const now = new Date();
    const minDate = now.toISOString().split("T")[0];
    const minTime = now.toTimeString().slice(0, 5);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_modal__WEBPACK_IMPORTED_MODULE_4__/* .Modal */ .u_, {
        className: "flex items-end justify-center p-0 lg:items-center lg:p-4",
        modalAnimation: isSheet ? sheetAnimation : undefined,
        modalClassName: "fixed inset-x-0 bottom-0 max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-lg border-t border-light-border bg-main-background pb-[env(safe-area-inset-bottom)] shadow-2xl dark:border-dark-border lg:static lg:max-h-[90vh] lg:max-w-md lg:rounded-lg lg:border",
        open: open,
        closeModal: closeModal,
        drag: isSheet ? "y" : undefined,
        dragControls: dragControls,
        dragListener: false,
        onDragEnd: (_, info)=>{
            if (isSheet && info.offset.y > 80) closeModal();
        },
        children: [
            isSheet && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                "aria-label": "Faire glisser pour fermer la programmation",
                className: "flex w-full touch-none justify-center py-3",
                onPointerDown: (event)=>dragControls.start(event.nativeEvent),
                type: "button",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between border-b border-light-border px-4 py-3 dark:border-dark-border",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        className: "text-xl font-bold",
                        children: "Programmer la publication"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                        className: "accent-tab rounded-full p-2 hover:bg-main-accent/10",
                        onClick: closeModal,
                        "aria-label": "Fermer",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_6__/* .MaterialIcon */ .O, {
                            className: "h-5 w-5",
                            iconName: "close"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col gap-4 p-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                className: "text-sm font-bold text-light-secondary dark:text-dark-secondary",
                                children: "Date"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                type: "date",
                                className: "w-full rounded-lg border border-light-line-reply bg-transparent px-3 py-2 text-sm outline-none placeholder:text-light-secondary focus:border-main-accent dark:border-dark-border dark:placeholder:text-dark-secondary",
                                value: selectedDate,
                                onChange: ({ target: { value  }  })=>setSelectedDate(value),
                                min: minDate,
                                "aria-label": "Date de programmation"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                className: "text-sm font-bold text-light-secondary dark:text-dark-secondary",
                                children: "Heure"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                type: "time",
                                className: "w-full rounded-lg border border-light-line-reply bg-transparent px-3 py-2 text-sm outline-none placeholder:text-light-secondary focus:border-main-accent dark:border-dark-border dark:placeholder:text-dark-secondary",
                                value: selectedTime,
                                onChange: ({ target: { value  }  })=>setSelectedTime(value),
                                min: selectedDate === minDate ? minTime : undefined,
                                "aria-label": "Heure de programmation"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between gap-3 border-t border-light-border pt-4 dark:border-dark-border",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                className: "rounded-full px-4 py-1.5 font-bold hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                                onClick: closeModal,
                                children: "Annuler"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                className: "rounded-full bg-main-accent px-4 py-1.5 font-bold text-white enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/75",
                                disabled: !selectedDate || !selectedTime,
                                onClick: handleSchedule,
                                children: "Programmer"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3715:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ MobileSidebarLink)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6269);
/* harmony import */ var _lib_media__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8540);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3325);
/* harmony import */ var _lib_avatar_shape__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8829);








function MobileSidebarLink({ href , bottom , linkName , iconName , iconSrc , disabled , closeMenu , avatarSrc , gender , shape , frame  }) {
    const frameDecoration = (0,_lib_avatar_shape__WEBPACK_IMPORTED_MODULE_6__/* .getAvatarFrameDecoration */ .nI)(frame);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: href,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
            className: clsx__WEBPACK_IMPORTED_MODULE_3___default()(`custom-button accent-tab accent-bg-tab flex items-center rounded-md font-bold 
           transition hover:bg-light-primary/10 focus-visible:ring-2 first:focus-visible:ring-[#878a8c]
           dark:hover:bg-dark-primary/10 dark:focus-visible:ring-white`, bottom ? "gap-2 p-1.5 text-base" : "gap-4 p-2 text-xl", disabled && "cursor-not-allowed"),
            onClick: disabled ? (0,_lib_utils__WEBPACK_IMPORTED_MODULE_7__/* .preventBubbling */ .Db)() : closeMenu,
            children: [
                avatarSrc !== undefined ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                    className: "relative flex shrink-0 items-center justify-center",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("relative block overflow-hidden bg-main-search-background", bottom ? "h-5 w-5" : "h-8 w-8", (0,_lib_avatar_shape__WEBPACK_IMPORTED_MODULE_6__/* .getAvatarShapeClass */ ._M)(shape ?? "circle")),
                            style: {
                                backgroundImage: `url("${(0,_lib_media__WEBPACK_IMPORTED_MODULE_4__/* .getAvatarSrc */ .SJ)("", gender)}")`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                                className: "block h-full w-full object-cover",
                                src: (0,_lib_media__WEBPACK_IMPORTED_MODULE_4__/* .getAvatarSrc */ .SJ)(avatarSrc, gender),
                                alt: "",
                                width: bottom ? 20 : 32,
                                height: bottom ? 20 : 32,
                                "aria-hidden": "true"
                            })
                        }),
                        frameDecoration && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            alt: "",
                            className: "pointer-events-none absolute inset-0 h-full w-full object-contain",
                            draggable: false,
                            height: bottom ? 20 : 32,
                            src: frameDecoration,
                            width: bottom ? 20 : 32
                        })
                    ]
                }) : iconSrc ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                    className: clsx__WEBPACK_IMPORTED_MODULE_3___default()(bottom ? "h-5 w-5" : "h-7 w-7", "object-contain dark:invert"),
                    src: iconSrc,
                    alt: "",
                    width: bottom ? 20 : 28,
                    height: bottom ? 20 : 28,
                    "aria-hidden": "true"
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                    className: bottom ? "h-5 w-5" : "h-7 w-7",
                    iconName: iconName
                }),
                linkName
            ]
        })
    }, href);
}


/***/ }),

/***/ 8289:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "n": () => (/* binding */ MobileSidebar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2108);
/* harmony import */ var _lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3040);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_modal_display_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(330);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4685);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9099);
/* harmony import */ var _components_modal_mobile_sidebar_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8539);
/* harmony import */ var _components_status_status_activity__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3501);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3325);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6197);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_1__, _components_modal_display_modal__WEBPACK_IMPORTED_MODULE_4__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_6__, _components_modal_mobile_sidebar_modal__WEBPACK_IMPORTED_MODULE_7__, _components_status_status_activity__WEBPACK_IMPORTED_MODULE_8__, framer_motion__WEBPACK_IMPORTED_MODULE_10__]);
([_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_1__, _components_modal_display_modal__WEBPACK_IMPORTED_MODULE_4__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_6__, _components_modal_mobile_sidebar_modal__WEBPACK_IMPORTED_MODULE_7__, _components_status_status_activity__WEBPACK_IMPORTED_MODULE_8__, framer_motion__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











const variant = {
    initial: {
        y: "100%",
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            damping: 30,
            stiffness: 300
        }
    },
    exit: {
        y: "100%",
        opacity: 0,
        transition: {
            duration: 0.2
        }
    }
};
function MobileSidebar({ hideTrigger , bottomTrigger  }) {
    const { user  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_1__/* .useAuth */ .aC)();
    const { open , openModal , closeModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_2__/* .useModal */ .d)();
    const { open: displayOpen , openModal: openDisplayModal , closeModal: closeDisplayModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_2__/* .useModal */ .d)();
    const { open: statusOpen , openModal: openStatusModal , closeModal: closeStatusModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_2__/* .useModal */ .d)();
    const dragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_10__.useDragControls)();
    const displayDragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_10__.useDragControls)();
    const statusDragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_10__.useDragControls)();
    const { 0: expanded , 1: setExpanded  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const { 0: displayExpanded , 1: setDisplayExpanded  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const { 0: statusExpanded , 1: setStatusExpanded  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    /* La barre fine en haut du menu permet de le faire glisser : vers le bas
     pour le refermer, vers le haut pour l'étirer sur toute la hauteur de
     l'écran. */ const handleDragEnd = (_, info)=>{
        if (info.offset.y < -60) {
            setExpanded(true);
            return;
        }
        if (info.offset.y > 200 || info.velocity.y > 900) {
            closeModal();
            return;
        }
        if (expanded && info.offset.y > 60) {
            setExpanded(false);
            return;
        }
        if (info.offset.y > 100) closeModal();
    };
    /* Même geste pour la fenêtre des statuts. */ const handleStatusDragEnd = (_, info)=>{
        if (info.offset.y < -60) {
            setStatusExpanded(true);
            return;
        }
        if (info.offset.y > 200 || info.velocity.y > 900) {
            closeStatusModal();
            return;
        }
        if (statusExpanded && info.offset.y > 60) {
            setStatusExpanded(false);
            return;
        }
        if (info.offset.y > 100) closeStatusModal();
    };
    const openDisplay = ()=>{
        closeModal();
        setDisplayExpanded(false);
        openDisplayModal();
    };
    /* Les statuts des personnes que l'on suit : accessibles depuis le menu
     « Plus », là où l'activité des abonnements n'a pas de place. */ const openStatuses = ()=>{
        closeModal();
        setStatusExpanded(false);
        openStatusModal();
    };
    /* Comme pour la feuille de publication, la feuille Apparence se referme
     quand on la tire vers le bas et s'étend quand on la tire vers le haut. */ const handleDisplayDragEnd = (_, info)=>{
        if (info.offset.y < -60) {
            setDisplayExpanded(true);
            return;
        }
        if (info.offset.y > 200 || info.velocity.y > 900) {
            setDisplayExpanded(false);
            closeDisplayModal();
            return;
        }
        /* Étirée, la feuille se replie d'abord sur elle-même avant de se fermer. */ if (displayExpanded && info.offset.y > 60) {
            setDisplayExpanded(false);
            return;
        }
        if (info.offset.y > 70) {
            setDisplayExpanded(false);
            closeDisplayModal();
        }
    };
    if (hideTrigger) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {});
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_6__/* .Modal */ .u_, {
                className: "flex items-end justify-center p-0 xs:items-center xs:p-4",
                modalAnimation: variant,
                modalClassName: `fixed inset-x-0 bottom-0 flex w-full max-w-lg flex-col overflow-hidden border-t border-light-border bg-main-background shadow-2xl transition-[height,max-height,border-radius] duration-300 ease-out dark:border-dark-border xs:static xs:max-h-[90vh] xs:rounded-2xl xs:border ${expanded ? "h-[100dvh] max-h-[100dvh] rounded-none pt-[max(1rem,env(safe-area-inset-top))]" : "max-h-[88dvh] rounded-t-3xl"}`,
                drag: "y",
                dragControls: dragControls,
                dragListener: false,
                dragElastic: 0.5,
                dragMomentum: true,
                dragSnapToOrigin: true,
                dragUp: 160,
                onDragEnd: handleDragEnd,
                open: open,
                closeModal: closeModal,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_mobile_sidebar_modal__WEBPACK_IMPORTED_MODULE_7__/* .MobileSidebarModal */ .w, {
                    ...user,
                    closeModal: closeModal,
                    openDisplay: openDisplay,
                    openStatuses: openStatuses,
                    dragControls: dragControls
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_modal_modal__WEBPACK_IMPORTED_MODULE_6__/* .Modal */ .u_, {
                className: "flex items-end justify-center p-0 xs:items-center xs:p-4",
                modalClassName: `flex max-h-[90dvh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl
                       border-t border-light-border bg-main-background shadow-2xl
                       transition-[height,max-height,border-radius] duration-300 ease-out
                       dark:border-dark-border xs:static xs:max-h-[88vh] xs:rounded-xl xs:border ${statusExpanded ? "h-[100dvh] max-h-[100dvh] rounded-none" : ""}`,
                drag: "y",
                dragControls: statusDragControls,
                dragListener: false,
                dragMomentum: true,
                dragSnapToOrigin: true,
                dragUp: 160,
                onDragEnd: handleStatusDragEnd,
                open: statusOpen,
                closeModal: closeStatusModal,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        "aria-label": "Faire glisser pour fermer la fen\xeatre Statuts",
                        className: "flex w-full touch-none justify-center py-3 xs:hidden",
                        onPointerDown: (event)=>statusDragControls.start(event.nativeEvent),
                        type: "button",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] xs:p-6",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                        className: "text-lg font-bold text-light-primary dark:text-dark-primary",
                                        children: "Statuts de vos abonnements"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                                        "aria-label": "Fermer",
                                        className: "-mr-2 shrink-0 p-2",
                                        onClick: closeStatusModal,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                            className: "h-5 w-5",
                                            iconName: "close"
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_status_status_activity__WEBPACK_IMPORTED_MODULE_8__/* .StatusActivity */ .Q, {})
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_modal_modal__WEBPACK_IMPORTED_MODULE_6__/* .Modal */ .u_, {
                className: "flex items-end justify-center !overflow-hidden p-0 xs:items-start xs:justify-center xs:p-4",
                modalAnimation: variant,
                modalClassName: `fixed inset-x-0 bottom-0 max-h-[calc(100dvh_-_2rem)] w-full max-w-xl overflow-y-auto overscroll-contain rounded-t-lg border-t border-light-border bg-main-background p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl transition-[height,max-height,border-radius] duration-300 ease-out dark:border-dark-border xs:static xs:my-auto xs:rounded-lg xs:border xs:p-8 ${displayExpanded ? "h-[100dvh] max-h-[100dvh] rounded-none pt-[max(1rem,env(safe-area-inset-top))]" : ""}`,
                drag: "y",
                dragControls: displayDragControls,
                dragListener: false,
                dragElastic: 0.5,
                dragMomentum: true,
                dragSnapToOrigin: true,
                dragUp: 160,
                onDragEnd: handleDisplayDragEnd,
                open: displayOpen,
                closeModal: closeDisplayModal,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        "aria-label": "Faire glisser pour fermer la fen\xeatre Apparence",
                        className: "-mt-5 flex w-full touch-none justify-center py-3 xs:hidden",
                        onPointerDown: (event)=>displayDragControls.start(event.nativeEvent),
                        type: "button",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_display_modal__WEBPACK_IMPORTED_MODULE_4__/* .DisplayModal */ .J, {
                        closeModal: closeDisplayModal
                    })
                ]
            }),
            !hideTrigger && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                className: bottomTrigger ? "accent-tab flex h-14 w-full min-w-0 flex-col items-center justify-center gap-0.5 whitespace-nowrap rounded-full px-0.5 py-1.5 text-[11px] leading-tight text-light-secondary transition-colors active:bg-light-primary/10 dark:text-dark-secondary dark:active:bg-dark-primary/20 xs:hidden" : "accent-tab p-0 xs:hidden",
                "aria-label": "Ouvrir le menu",
                onClick: ()=>{
                    setExpanded(false);
                    openModal();
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_10__.motion.span, {
                        className: "relative inline-flex",
                        transition: {
                            type: "spring",
                            stiffness: 280,
                            damping: 26
                        },
                        whileTap: {
                            scale: 0.93
                        },
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                            className: bottomTrigger ? "h-6 w-6" : "h-6 w-6",
                            iconName: bottomTrigger ? "pending" : "menu"
                        })
                    }),
                    bottomTrigger && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: "Plus"
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6624:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G": () => (/* binding */ SidebarLink)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6269);
/* harmony import */ var _lib_media__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8540);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3325);








function SidebarLink({ href , username , iconName , iconSrc , linkName , disabled , canBeHidden , avatarSrc , gender , badge  }) {
    const { asPath  } = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const isActive = username ? asPath.includes(username) : asPath === href;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
        href: href,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
            className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("group py-1 outline-none xl:w-full", canBeHidden ? "hidden xs:flex" : "flex", disabled && "cursor-not-allowed"),
            onClick: disabled ? (0,_lib_utils__WEBPACK_IMPORTED_MODULE_7__/* .preventBubbling */ .Db)() : undefined,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: clsx__WEBPACK_IMPORTED_MODULE_4___default()(`custom-button flex items-center justify-center gap-4 self-start p-2 text-xl transition 
             duration-200 group-hover:bg-light-primary/10 group-focus-visible:ring-2 
             group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 
             dark:group-focus-visible:ring-white xs:p-3 xl:w-full xl:justify-start xl:pl-3 xl:pr-5`, isActive && "font-bold text-main-accent"),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "relative inline-flex",
                        children: [
                            avatarSrc !== undefined ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {
                                className: "h-7 w-7 rounded-full object-cover",
                                src: (0,_lib_media__WEBPACK_IMPORTED_MODULE_5__/* .getAvatarSrc */ .SJ)(avatarSrc, gender),
                                alt: "",
                                width: 28,
                                height: 28,
                                "aria-hidden": "true"
                            }) : iconSrc ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {
                                className: "h-7 w-7 object-contain dark:invert",
                                src: iconSrc,
                                alt: "",
                                width: 28,
                                height: 28,
                                "aria-hidden": "true",
                                style: isActive ? {
                                    filter: "brightness(0) saturate(100%) invert(48%) sepia(88%) saturate(1890%) hue-rotate(177deg) brightness(98%) contrast(101%)"
                                } : undefined
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_6__/* .MaterialIcon */ .O, {
                                className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("h-7 w-7", isActive && "text-main-accent"),
                                iconName: iconName,
                                solid: isActive
                            }),
                            typeof badge === "number" && badge > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-bold leading-none text-white",
                                children: badge > 9 ? "9+" : badge
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "hidden xl:block",
                        children: linkName
                    })
                ]
            })
        })
    });
}


/***/ }),

/***/ 4826:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": () => (/* binding */ SidebarProfile)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2108);
/* harmony import */ var _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5655);
/* harmony import */ var _lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3040);
/* harmony import */ var _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1708);
/* harmony import */ var _components_user_user_name__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4531);
/* harmony import */ var _components_user_user_username__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7876);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__, _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_3__, _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_5__]);
([_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__, _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_3__, _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const menuVariants = {
    initial: {
        opacity: 0,
        y: 8
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.16,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        y: 8,
        transition: {
            duration: 0.12
        }
    }
};
function SidebarProfile() {
    const { user , signOut  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__/* .useAuth */ .aC)();
    const { avatarShape: localShape , avatarFrame: localFrame  } = (0,_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_3__/* .useTheme */ .Fg)();
    const { open: logoutOpen , openModal: openLogoutModal , closeModal: closeLogoutModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_4__/* .useModal */ .d)();
    const { open: displayOpen , openModal: openDisplayModal , closeModal: closeDisplayModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_4__/* .useModal */ .d)();
    const { name , username , verified , photoURL , gender , avatarShape , avatarFrame  } = user;
    /* Forme et cadre personnels : on utilise d'abord ce que contient le profil,
     puis la personnalisation locale (Apparence) pour que l'avatar et son
     effet s'affichent même si le profil n'a pas encore enregistré le choix. */ const shape = avatarShape ?? localShape;
    const frame = avatarFrame ?? localFrame;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: `/user/${username}`,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
            className: "custom-button main-tab dark-bg-tab flex w-full items-center justify-between hover:bg-light-primary/10 active:bg-light-primary/20 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex min-w-0 items-center gap-3",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_avatar__WEBPACK_IMPORTED_MODULE_5__/* .UserAvatar */ .Y, {
                        src: photoURL,
                        alt: name,
                        size: 40,
                        gender: gender,
                        username: undefined,
                        frame: frame,
                        shape: shape
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "hidden min-w-0 truncate text-start leading-5 xl:block",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_name__WEBPACK_IMPORTED_MODULE_6__/* .UserName */ .v, {
                                name: name,
                                className: "start font-semibold",
                                verified: verified
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_username__WEBPACK_IMPORTED_MODULE_7__/* .UserUsername */ .a, {
                                username: username,
                                disableLink: true
                            })
                        ]
                    })
                ]
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8283:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ Sidebar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6197);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2108);
/* harmony import */ var _lib_context_window_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6625);
/* harmony import */ var _lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3040);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9099);
/* harmony import */ var _components_input_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7277);
/* harmony import */ var _components_common_site_logo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5439);
/* harmony import */ var _components_common_bottom_nav_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7910);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(4685);
/* harmony import */ var _sidebar_link__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(6624);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(3325);
/* harmony import */ var _sidebar_profile__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(4826);
/* harmony import */ var _mobile_sidebar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(8289);
/* harmony import */ var _components_modal_display_modal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(330);
/* harmony import */ var _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(3639);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(5342);
/* harmony import */ var _lib_firebase_chat__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(9969);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(1492);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_4__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_5__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_8__, _components_input_input__WEBPACK_IMPORTED_MODULE_9__, _components_common_bottom_nav_icon__WEBPACK_IMPORTED_MODULE_11__, _sidebar_profile__WEBPACK_IMPORTED_MODULE_15__, _mobile_sidebar__WEBPACK_IMPORTED_MODULE_16__, _components_modal_display_modal__WEBPACK_IMPORTED_MODULE_17__, _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_18__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_19__, _lib_firebase_chat__WEBPACK_IMPORTED_MODULE_20__, firebase_firestore__WEBPACK_IMPORTED_MODULE_21__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_4__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_5__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_8__, _components_input_input__WEBPACK_IMPORTED_MODULE_9__, _components_common_bottom_nav_icon__WEBPACK_IMPORTED_MODULE_11__, _sidebar_profile__WEBPACK_IMPORTED_MODULE_15__, _mobile_sidebar__WEBPACK_IMPORTED_MODULE_16__, _components_modal_display_modal__WEBPACK_IMPORTED_MODULE_17__, _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_18__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_19__, _lib_firebase_chat__WEBPACK_IMPORTED_MODULE_20__, firebase_firestore__WEBPACK_IMPORTED_MODULE_21__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);























const navLinks = [
    {
        href: "/home",
        linkName: "Accueil",
        iconName: "home"
    },
    {
        href: "/trends",
        linkName: "D\xe9couvrir",
        iconName: "search",
        canBeHidden: true
    },
    {
        href: "/notifications",
        linkName: "Notifications",
        iconName: "notifications"
    },
    {
        href: "/messages",
        linkName: "Messagerie",
        iconName: "mail"
    },
    {
        href: "/bookmarks",
        linkName: "Signets",
        iconName: "favorite",
        canBeHidden: true
    },
    {
        href: "/settings",
        linkName: "R\xe9glages",
        iconName: "tune"
    }
];
const composeSheetAnimation = {
    initial: {
        opacity: 0,
        y: "100%"
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 30,
            stiffness: 300
        }
    },
    exit: {
        opacity: 0,
        y: "100%",
        transition: {
            duration: 0.2
        }
    }
};
function Sidebar() {
    const { user  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_5__/* .useAuth */ .aC)();
    const { isMobile  } = (0,_lib_context_window_context__WEBPACK_IMPORTED_MODULE_6__/* .useWindow */ .zY)();
    const { asPath  } = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const { open , openModal , closeModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_7__/* .useModal */ .d)();
    const { open: displayOpen , openModal: openDisplayModal , closeModal: closeDisplayModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_7__/* .useModal */ .d)();
    const { 0: composeExpanded , 1: setComposeExpanded  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const dragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_4__.useDragControls)();
    const barRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    /* Sur téléphone, la barre du bas s'efface quand on descend et revient
     quand on remonte. Le suivi se fait sur la classe CSS (aucun rendu React,
     aucune animation image par image : c'est un simple `transform` que le
     navigateur anime sur le GPU). */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const bar = barRef.current;
        if (!bar) return;
        let lastY = window.scrollY;
        let hidden = false;
        const handleScroll = ()=>{
            const y = window.scrollY;
            /* En haut de page, la barre est toujours là. */ if (y <= 0) {
                hidden = false;
            } else {
                const delta = y - lastY;
                /* Un seuil : les micro-mouvements du doigt ne doivent pas faire
           clignoter la barre. */ if (Math.abs(delta) >= 10) {
                    lastY = y;
                    /* On descend → la barre s'efface ; on remonte → elle revient. */ hidden = delta > 0;
                }
            }
            /* La classe est reappliquée à chaque défilement : elle a pu être
         retirée entre-temps (quand le clavier se ferme, la barre doit
         revenir). */ bar.classList.toggle("mobile-bar-hidden", hidden);
        };
        window.addEventListener("scroll", handleScroll, {
            passive: true
        });
        return ()=>window.removeEventListener("scroll", handleScroll);
    }, []);
    const openComposer = ()=>{
        setComposeExpanded(false);
        openModal();
    };
    const handleComposeDragEnd = (_, info)=>{
        if (composeExpanded && info.offset.y > 70) {
            setComposeExpanded(false);
            return;
        }
        if (info.offset.y > 200 || info.velocity.y > 1000) closeModal();
    };
    const username = user?.username;
    const { data: unreadNotifs  } = (0,_lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_18__/* .useCollection */ .K)(user?.id ? (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_21__.query)((0,_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_19__/* .userNotificationsCollection */ .CC)(user.id), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_21__.where)("read", "==", false), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_21__.limit)(10)) : null, {
        allowNull: true,
        disabled: !user?.id
    });
    const { data: convos  } = (0,_lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_18__/* .useCollection */ .K)(user?.id ? (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_21__.query)((0,_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_19__/* .userConversationsCollection */ .HA)(user.id), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_21__.limit)(20)) : null, {
        allowNull: true,
        disabled: !user?.id
    });
    const onNotificationsPage = asPath === "/notifications";
    const onMessagesPage = asPath === "/messages";
    const notifBadge = onNotificationsPage ? 0 : Math.min((unreadNotifs ?? []).length, 10);
    const unreadMsgCount = (convos ?? []).filter((conversation)=>(0,_lib_firebase_chat__WEBPACK_IMPORTED_MODULE_20__/* .isConversationUnread */ .Zc)(conversation, user?.id ?? "")).length;
    const msgBadge = onMessagesPage ? 0 : Math.min(unreadMsgCount, 10);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
        id: "sidebar",
        className: "flex w-0 shrink-0 transition-opacity duration-200 xs:w-20 md:w-24 lg:max-w-none xl:-mr-4 xl:w-full xl:max-w-xs xl:justify-end",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_8__/* .Modal */ .u_, {
                className: "flex items-end justify-center p-0 xs:items-start xs:justify-center xs:p-4",
                modalAnimation: isMobile ? composeSheetAnimation : undefined,
                modalClassName: `fixed inset-x-0 bottom-0 max-h-[90dvh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-t-lg border-t border-light-border bg-main-background pb-[env(safe-area-inset-bottom)] shadow-2xl transition-[height,max-height,border-radius] duration-300 ease-out dark:border-dark-border xs:static xs:max-h-[90vh] xs:rounded-lg xs:border ${composeExpanded ? "h-[100dvh] max-h-[100dvh] rounded-none pt-[max(1rem,env(safe-area-inset-top))]" : ""}`,
                drag: "y",
                dragControls: dragControls,
                dragListener: false,
                dragElastic: 0.5,
                dragMomentum: true,
                dragSnapToOrigin: false,
                dragConstraints: {
                    top: 0
                },
                onDrag: (_, info)=>{
                // Suppression de l'expansion vers le haut
                },
                onDragEnd: handleComposeDragEnd,
                open: open,
                closeModal: closeModal,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_input_input__WEBPACK_IMPORTED_MODULE_9__/* .Input */ .I, {
                    modal: true,
                    closeModal: closeModal,
                    sheetHandle: true,
                    dragControls: dragControls
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_8__/* .Modal */ .u_, {
                className: "flex items-start justify-center !overflow-hidden p-4",
                modalClassName: "my-auto max-h-[calc(100dvh_-_2rem)] max-w-xl bg-main-background w-full p-8 rounded-md hover-animation overflow-y-auto overscroll-contain",
                open: displayOpen,
                closeModal: closeDisplayModal,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_display_modal__WEBPACK_IMPORTED_MODULE_17__/* .DisplayModal */ .J, {
                    closeModal: closeDisplayModal
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "fixed bottom-3 z-40 mx-3 flex w-[calc(100%-1.5rem)] flex-col justify-between rounded-[2rem] border border-light-border/60 bg-main-background/90 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-[0_8px_28px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-transform duration-200 ease-out dark:border-dark-border/60 dark:bg-main-background/90 max-[499px]:bg-main-background max-[499px]:backdrop-blur-0 xs:top-0 xs:mx-0 xs:h-full xs:w-auto xs:rounded-none xs:border-0 xs:bg-transparent xs:px-2 xs:py-3 xs:pt-2 xs:shadow-none md:px-4 xl:w-72",
                "data-mobile-bar": true,
                ref: barRef,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                        className: "flex flex-col justify-center gap-0 xs:items-center xs:gap-2 xl:items-stretch",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                className: "hidden xs:flex",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                    href: "/home",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                        className: "custom-button main-tab flex items-center gap-4 text-accent-blue transition hover:bg-light-primary/10 focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80 dark:text-twitter-icon dark:hover:bg-dark-primary/10",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_site_logo__WEBPACK_IMPORTED_MODULE_10__/* .SiteLogo */ .S, {
                                                size: 28
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "hidden font-title text-xl font-bold tracking-tight text-light-primary dark:text-dark-primary xl:block",
                                                children: "Inspiration"
                                            })
                                        ]
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                                className: "hidden items-center justify-around xs:flex xs:flex-col xs:justify-center xl:block",
                                children: [
                                    navLinks.map(({ ...linkData })=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_sidebar_link__WEBPACK_IMPORTED_MODULE_13__/* .SidebarLink */ .G, {
                                            ...linkData,
                                            badge: linkData.href === "/notifications" ? notifBadge : linkData.href === "/messages" ? msgBadge : undefined,
                                            key: linkData.href
                                        })),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        type: "button",
                                        onClick: openDisplayModal,
                                        className: "custom-button flex gap-4 text-xl transition group-hover:bg-light-primary/10 group-focus-visible:ring-2 group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 dark:group-focus-visible:ring-white xl:pr-5",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_14__/* .MaterialIcon */ .O, {
                                                className: "h-7 w-7",
                                                iconName: "appearance"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: "hidden xl:block",
                                                children: "Apparence"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                                "aria-label": "Navigation principale",
                                className: "grid grid-cols-5 items-stretch justify-items-stretch gap-0.5 px-1.5 pt-1 xs:hidden",
                                children: [
                                    [
                                        {
                                            href: "/home",
                                            label: "Accueil",
                                            iconName: "home"
                                        },
                                        {
                                            href: "/trends",
                                            label: "D\xe9couvrir",
                                            iconName: "search"
                                        },
                                        {
                                            href: "/messages",
                                            label: "Messagerie",
                                            iconName: "mail"
                                        },
                                        {
                                            href: "/bookmarks",
                                            label: "Signets",
                                            iconName: "favorite"
                                        }
                                    ].map(({ href , label , iconName  })=>{
                                        const active = asPath === href;
                                        const badge = href === "/messages" ? msgBadge : href === "/notifications" ? notifBadge : 0;
                                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                            href: href,
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                "aria-current": active ? "page" : undefined,
                                                className: `accent-tab relative flex h-14 w-full min-w-0 flex-col items-center justify-center gap-0.5 whitespace-nowrap rounded-full px-0.5 py-1.5 text-[11px] font-medium leading-tight transition-colors active:bg-light-primary/10 dark:active:bg-dark-primary/20 ${active ? "font-semibold text-main-accent" : "text-light-secondary dark:text-dark-secondary"}`,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.span, {
                                                        "aria-hidden": "true",
                                                        animate: {
                                                            opacity: active ? 1 : 0,
                                                            scaleX: active ? 1 : 0.32
                                                        },
                                                        className: "pointer-events-none absolute inset-0 rounded-full bg-light-primary/[0.12] dark:bg-dark-primary/[0.18]",
                                                        initial: false,
                                                        transition: {
                                                            opacity: {
                                                                duration: 0.12
                                                            },
                                                            scaleX: {
                                                                type: "spring",
                                                                stiffness: 320,
                                                                damping: 26
                                                            }
                                                        }
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_common_bottom_nav_icon__WEBPACK_IMPORTED_MODULE_11__/* .BottomNavIcon */ .W, {
                                                        active: active,
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_14__/* .MaterialIcon */ .O, {
                                                                className: "h-6 w-6",
                                                                iconName: iconName,
                                                                solid: active
                                                            }),
                                                            badge > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: "absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-bold leading-none text-white",
                                                                children: badge > 9 ? "9+" : badge
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "relative max-w-full truncate",
                                                        children: label
                                                    })
                                                ]
                                            })
                                        }, href);
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "relative flex w-full min-w-0",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mobile_sidebar__WEBPACK_IMPORTED_MODULE_16__/* .MobileSidebar */ .n, {
                                                bottomTrigger: true
                                            }),
                                            notifBadge > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-bold leading-none text-white",
                                                children: notifBadge > 9 ? "9+" : notifBadge
                                            })
                                        ]
                                    })
                                ]
                            }),
                            asPath === "/home" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_12__/* .Button */ .z, {
                                "aria-label": "\xc9crire une publication",
                                className: "accent-tab absolute bottom-full right-2 z-20 mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-main-accent text-white transition-transform duration-150 active:scale-95 xs:hidden",
                                onClick: openComposer,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_14__/* .MaterialIcon */ .O, {
                                    className: "h-7 w-7 text-white",
                                    iconName: "add"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_12__/* .Button */ .z, {
                                className: "accent-tab absolute right-4 hidden -translate-y-[72px] items-center justify-center bg-main-accent text-center text-lg font-bold text-white outline-none transition hover:brightness-90 active:brightness-75 xs:static xs:flex xs:translate-y-0 xs:hover:bg-main-accent/90 xs:active:bg-main-accent/75 xl:w-11/12",
                                onClick: openComposer,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_14__/* .MaterialIcon */ .O, {
                                        className: "block h-7 w-7 xl:hidden",
                                        iconName: "add"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "m-0 hidden xl:block",
                                        children: "Publier"
                                    })
                                ]
                            })
                        ]
                    }),
                    !isMobile && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_sidebar_profile__WEBPACK_IMPORTED_MODULE_15__/* .SidebarProfile */ .u, {})
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3501:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Q": () => (/* binding */ StatusActivity)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_hooks_useStatuses__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3079);
/* harmony import */ var _status_avatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3485);
/* harmony import */ var _status_viewer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4529);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_hooks_useStatuses__WEBPACK_IMPORTED_MODULE_2__, _status_viewer__WEBPACK_IMPORTED_MODULE_4__]);
([_lib_hooks_useStatuses__WEBPACK_IMPORTED_MODULE_2__, _status_viewer__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





/**
 * Statuts des personnes que l'on suit, affichés dans
 * « Activité de vos abonnements ». Nos propres statuts n'y figurent jamais.
 * Les avatars sont volontairement simples (pas de barres / anneau) : la seule
 * action est le bouton « Voir le statut ».
 */ function StatusActivity() {
    const { groups  } = (0,_lib_hooks_useStatuses__WEBPACK_IMPORTED_MODULE_2__/* .useStatuses */ .u)();
    const { 0: viewerIndex , 1: setViewerIndex  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    /* Si le groupe ouvert disparaît (statut expiré, compte retiré), on ferme. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (viewerIndex !== null && !groups[viewerIndex]) setViewerIndex(null);
    }, [
        groups,
        viewerIndex
    ]);
    const others = groups.filter(({ isOwn  })=>!isOwn);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col gap-3 text-left",
        children: [
            others.length > 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                className: "flex flex-col gap-3",
                children: others.map((group)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_status_avatar__WEBPACK_IMPORTED_MODULE_3__/* .StatusRing */ .q, {
                                src: group.user.photoURL,
                                alt: group.user.name,
                                gender: group.user.gender,
                                shape: group.user.avatarShape,
                                frame: group.user.avatarFrame,
                                ring: false,
                                size: 40
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "min-w-0 flex-1 leading-tight",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "truncate text-sm font-bold text-light-primary dark:text-dark-primary",
                                        children: group.user.name
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "truncate text-xs text-light-secondary dark:text-dark-secondary",
                                        children: [
                                            "@",
                                            group.user.username
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                className: "accent-tab shrink-0 rounded-full bg-main-accent px-4 py-1.5 text-sm font-bold text-white transition hover:brightness-90 active:brightness-75",
                                type: "button",
                                onClick: ()=>setViewerIndex(groups.indexOf(group)),
                                children: "Voir le statut"
                            })
                        ]
                    }, group.user.id))
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "flex flex-col items-center gap-2 px-4 pb-1",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: "text-center text-sm text-light-secondary dark:text-dark-secondary",
                    children: "Aucun statut \xe0 afficher pour le moment"
                })
            }),
            viewerIndex !== null && groups[viewerIndex] && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_status_viewer__WEBPACK_IMPORTED_MODULE_4__/* .StatusViewer */ .A, {
                groups: groups,
                initialGroup: viewerIndex,
                onClose: ()=>setViewerIndex(null)
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3485:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ StatusRing),
/* harmony export */   "r": () => (/* binding */ StatusAvatarImage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_media__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8540);
/* harmony import */ var _lib_avatar_shape__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8829);
/* harmony import */ var _components_user_avatar_frame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8800);





/** Couleur de l'anneau lorsqu'il n'y a plus rien à voir. */ const SEEN_COLOR = "#536471";
/**
 * L'avatar seul, avec la forme choisie par la personne (rond, cœur, losange…).
 * La forme est portée par le conteneur, comme dans le reste du site.
 */ function StatusAvatarImage({ src , size , gender , shape , frame  }) {
    const fallback = gender === "femme" ? "/Avatar femme.png" : "/Avatar homme.png";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("relative block overflow-hidden", (0,_lib_avatar_shape__WEBPACK_IMPORTED_MODULE_3__/* .getAvatarShapeClass */ ._M)(shape)),
        style: {
            width: size,
            height: size,
            backgroundImage: `url("${fallback}")`,
            backgroundPosition: "center",
            backgroundSize: "cover"
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                className: "block h-full w-full object-cover",
                src: (0,_lib_media__WEBPACK_IMPORTED_MODULE_2__/* .getAvatarSrc */ .SJ)(src, gender),
                alt: "",
                width: size,
                height: size,
                draggable: false
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_avatar_frame__WEBPACK_IMPORTED_MODULE_4__/* .AvatarDecoration */ .z, {
                frame: frame
            })
        ]
    });
}
/** Construit un anneau multicolore : un segment par statut, séparés par un vide. */ function ringBackground(segments, color) {
    if (segments <= 1) return color;
    const gap = 3; // espace (en %) entre chaque segment
    const size = 100 / segments;
    const stops = [];
    for(let index = 0; index < segments; index++){
        const start = index * size;
        const end = start + size;
        const cut = Math.max(start, end - gap);
        stops.push(`${color} ${start}% ${cut}%`);
        stops.push(`transparent ${cut}% ${end}%`);
    }
    return `conic-gradient(from -90deg, ${stops.join(", ")})`;
}
/** Avatar entouré d'un anneau de statut (aucun anneau si `ring` est faux). */ function StatusRing({ src , alt , size =52 , gender , shape , frame , segments =1 , color ="#1d9bf0" , seen =false , ring =true , className  }) {
    if (!ring) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("block shrink-0", className),
        title: alt,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StatusAvatarImage, {
            src: src,
            size: size,
            gender: gender,
            shape: shape,
            frame: frame
        })
    });
    const ringColor = seen ? SEEN_COLOR : color;
    // La photo occupe la place restante : anneau (2 px) + marge intérieure (2 px).
    const avatarSize = Math.max(16, size - 8);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("block shrink-0 rounded-full", className),
        style: {
            width: size,
            height: size
        },
        title: alt,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
            className: "block h-full w-full rounded-full p-[2px]",
            style: {
                background: ringBackground(segments, ringColor)
            },
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "flex h-full w-full items-center justify-center rounded-full bg-main-background p-[2px]",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StatusAvatarImage, {
                    src: src,
                    size: avatarSize,
                    gender: gender,
                    shape: shape,
                    frame: frame
                })
            })
        })
    });
}


/***/ }),

/***/ 4529:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ StatusViewer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6201);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2108);
/* harmony import */ var _lib_firebase_status__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9802);
/* harmony import */ var _lib_hooks_useStatuses__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3079);
/* harmony import */ var _lib_hooks_useStatusVideoSrc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2577);
/* harmony import */ var _lib_types_status__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(102);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3325);
/* harmony import */ var _components_modal_action_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9253);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9099);
/* harmony import */ var _status_avatar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3485);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(6197);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_3__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_4__, _lib_firebase_status__WEBPACK_IMPORTED_MODULE_5__, _lib_hooks_useStatuses__WEBPACK_IMPORTED_MODULE_6__, _components_modal_action_modal__WEBPACK_IMPORTED_MODULE_10__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_11__, framer_motion__WEBPACK_IMPORTED_MODULE_13__]);
([react_hot_toast__WEBPACK_IMPORTED_MODULE_3__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_4__, _lib_firebase_status__WEBPACK_IMPORTED_MODULE_5__, _lib_hooks_useStatuses__WEBPACK_IMPORTED_MODULE_6__, _components_modal_action_modal__WEBPACK_IMPORTED_MODULE_10__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_11__, framer_motion__WEBPACK_IMPORTED_MODULE_13__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);














/** Durée d'affichage d'une photo / d'un texte (ms). */ const SLIDE_DURATION = 7000;
/** Durée maximale d'une vidéo avant de passer à la suite (ms). */ const MAX_VIDEO_DURATION = 60000;
/** Ancienne couleur de trait par défaut : sans choix explicite, la barre prend
 *  la couleur d'« Affichage ». */ const DEFAULT_BAR_COLOR = "#1d9bf0";
function formatRelative(timestamp) {
    if (!timestamp) return "\xe0 l’instant";
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    if (minutes < 1) return "\xe0 l’instant";
    if (minutes < 60) return `il y a ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `il y a ${hours} h`;
    return `il y a ${Math.floor(hours / 24)} j`;
}
function mediaDuration(media, status) {
    if ((0,_lib_types_status__WEBPACK_IMPORTED_MODULE_8__/* .isVideoMedia */ .q)(media ?? {
        kind: "image",
        type: ""
    })) return MAX_VIDEO_DURATION;
    /* Chaque statut a sa propre durée d'affichage. */ return status?.duration ?? SLIDE_DURATION;
}
function hexToRgb(hex) {
    const value = (hex ?? "").replace("#", "").trim();
    if (!value) return {
        r: 0,
        g: 0,
        b: 0
    };
    const full = value.length === 3 ? value.split("").map((char)=>`${char}${char}`).join("") : value.slice(0, 6);
    const parsed = parseInt(full, 16);
    if (Number.isNaN(parsed)) return {
        r: 0,
        g: 0,
        b: 0
    };
    return {
        r: parsed >> 16 & 255,
        g: parsed >> 8 & 255,
        b: parsed & 255
    };
}
/* La pastille du texte s'adapte au fond du statut : plus claire sur un fond
   sombre, plus sombre sur un fond clair. Le texte reste blanc dans les deux
   cas, donc toujours lisible. */ function textBubbleStyle(backgroundColor) {
    const { r , g , b  } = hexToRgb(backgroundColor);
    const isLight = (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
    return isLight ? {
        background: "rgba(15, 20, 25, 0.5)",
        color: "#ffffff"
    } : {
        background: "rgba(255, 255, 255, 0.14)",
        color: "#ffffff"
    };
}
function StatusViewer({ groups , initialGroup =0 , onClose  }) {
    const { user  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_4__/* .useAuth */ .aC)();
    const { 0: groupIndex , 1: setGroupIndex  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialGroup);
    const { 0: slideIndex , 1: setSlideIndex  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: progress , 1: setProgress  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: duration , 1: setDuration  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(SLIDE_DURATION);
    const { 0: expanded , 1: setExpanded  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: paused , 1: setPaused  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: deleteOpen , 1: setDeleteOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: menuOpen , 1: setMenuOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const menuDragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_13__.useDragControls)();
    const { 0: deleting , 1: setDeleting  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Deux pauses possibles : le doigt posé sur l'écran (pausedRef) et le
     bouton pause (userPausedRef). Les deux arrêtent l'avance automatique. */ const pausedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const userPausedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const goNextRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(()=>undefined);
    const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    /* La barre du haut sert de lecteur : on peut cliquer dessus pour jumped à
     un statut, ou faire glisser le curseur pour avancer/reculer. */ const barRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const scrubbingRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const { 0: scrubbing , 1: setScrubbing  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Temps déjà écoulé sur la diapositive courante : la barre permet de
     revenir en arrière à l'intérieur d'un même statut. */ const elapsedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const group = groups[groupIndex];
    /* Une seule barre, découpée en segments : un segment par photo / vidéo, dans
     l'ordre des statuts. */ const statusRows = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>group ? group.statuses.map((status)=>({
                status,
                slides: (0,_lib_hooks_useStatuses__WEBPACK_IMPORTED_MODULE_6__/* .buildStatusSlides */ .Y)([
                    status
                ])
            })) : [], [
        group
    ]);
    const slides = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>statusRows.flatMap(({ slides: rowSlides  })=>rowSlides), [
        statusRows
    ]);
    const segments = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const list = [];
        let index = 0;
        for (const row of statusRows)for (const _ of row.slides){
            list.push({
                status: row.status,
                index
            });
            index += 1;
        }
        return list;
    }, [
        statusRows
    ]);
    const slide = slides[slideIndex];
    const media = slide && slide.mediaIndex !== null ? slide.status.media[slide.mediaIndex] ?? null : null;
    const isVideo = media ? (0,_lib_types_status__WEBPACK_IMPORTED_MODULE_8__/* .isVideoMedia */ .q)(media) : false;
    const slideKey = `${groupIndex}:${slideIndex}`;
    /* Lecture directe depuis Backblaze : le proxy serverless tronque les vidéos
     au-delà de sa limite de taille. */ const videoSrc = (0,_lib_hooks_useStatusVideoSrc__WEBPACK_IMPORTED_MODULE_7__/* .useStatusVideoSrc */ .V)(isVideo && media ? media.src : null);
    const goNext = ()=>{
        if (slideIndex < slides.length - 1) {
            setSlideIndex((value)=>value + 1);
            return;
        }
        if (groupIndex < groups.length - 1) {
            setGroupIndex((value)=>value + 1);
            setSlideIndex(0);
            return;
        }
        onClose();
    };
    const goPrev = ()=>{
        if (slideIndex > 0) {
            setSlideIndex((value)=>value - 1);
            return;
        }
        if (groupIndex > 0) {
            const previous = groups[groupIndex - 1];
            setGroupIndex(groupIndex - 1);
            setSlideIndex(Math.max(0, previous.slides.length - 1));
            return;
        }
        setProgress(0);
    };
    goNextRef.current = goNext;
    /* Clic ou glissement sur la barre : on saute à la diapositive visée. À
     l'intérieur de la diapositive courante, on se repositionne dans le temps
     (vidéo) ou on relance la durée (photo, texte). */ const seekToPointer = (clientX)=>{
        const node = barRef.current;
        if (!node || !segments.length) return;
        const rect = node.getBoundingClientRect();
        if (rect.width <= 0) return;
        const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        const target = Math.min(segments.length - 1, Math.floor(ratio * segments.length));
        if (target !== slideIndex) {
            setSlideIndex(target);
            return;
        }
        /* Position à l'intérieur du segment courant (0 → 1). */ const withinSegment = ratio * segments.length - target;
        const video = videoRef.current;
        if (isVideo && video) {
            if (Number.isFinite(video.duration) && video.duration > 0) video.currentTime = withinSegment * video.duration;
            return;
        }
        elapsedRef.current = withinSegment * duration;
        setProgress(withinSegment);
    };
    const handleBarPointerDown = (event)=>{
        event.stopPropagation();
        event.currentTarget.setPointerCapture?.(event.pointerId);
        scrubbingRef.current = true;
        setScrubbing(true);
        seekToPointer(event.clientX);
    };
    const handleBarPointerMove = (event)=>{
        if (!scrubbingRef.current) return;
        event.stopPropagation();
        seekToPointer(event.clientX);
    };
    const handleBarPointerUp = (event)=>{
        if (!scrubbingRef.current) return;
        event.stopPropagation();
        scrubbingRef.current = false;
        setScrubbing(false);
        event.currentTarget.releasePointerCapture?.(event.pointerId);
    };
    /* Pause / reprise : le bouton pause arrête l'horloge (et la vidéo), tandis
     qu'un appui maintenu sur l'écran ne suspend que temporairement. */ const applyVideoPause = (shouldPause)=>{
        const video = videoRef.current;
        if (!video) return;
        if (shouldPause) video.pause();
        else void video.play().catch(()=>undefined);
    };
    const togglePause = ()=>{
        const next = !paused;
        setPaused(next);
        userPausedRef.current = next;
        applyVideoPause(next);
    };
    const handleHoldStart = ()=>{
        pausedRef.current = true;
        applyVideoPause(true);
    };
    const handleHoldEnd = ()=>{
        pausedRef.current = false;
        if (!userPausedRef.current) applyVideoPause(false);
    };
    /* Suppression : le statut est effacé. S'il en reste d'autres, la lecture
     continue sur le suivant au lieu de refermer la visionneuse. */ const handleDeleteStatus = async ()=>{
        const statusId = slide?.status.id;
        if (!statusId || deleting) return;
        setDeleting(true);
        try {
            await (0,_lib_firebase_status__WEBPACK_IMPORTED_MODULE_5__/* .deleteStatus */ .dI)(statusId);
            setDeleteOpen(false);
            setMenuOpen(false);
            const currentGroup = groups[groupIndex];
            const deletedStart = currentGroup?.slides.findIndex((s)=>s.status.id === statusId) ?? -1;
            const deletedCount = currentGroup?.slides.filter((s)=>s.status.id === statusId).length ?? 0;
            /* Il reste des diapositives dans le groupe : on continue sur la
         suivante (les index se décalent d'autant une fois le statut effacé). */ if (currentGroup && deletedStart >= 0 && deletedStart + deletedCount < currentGroup.slides.length) {
                setSlideIndex(deletedStart);
                return;
            }
            /* Le groupe est épuisé : on passe au groupe suivant qui a encore des
         statuts à montrer. */ const nextGroup = groups.findIndex((group, index)=>index > groupIndex && group.statuses.some((s)=>s.id !== statusId));
            if (nextGroup !== -1) {
                setGroupIndex(nextGroup);
                setSlideIndex(0);
                return;
            }
            /* Plus rien à voir : on ferme. */ onClose();
        } catch  {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_3__.toast.error("Impossible de supprimer le statut");
        } finally{
            setDeleting(false);
        }
    };
    /* Le menu du statut se tire vers le bas pour se refermer. */ const handleMenuDragEnd = (_, info)=>{
        if (info.offset.y > 100 || info.velocity.y > 550) setMenuOpen(false);
    };
    /* Plein écran : on passe par l'API du navigateur, donc l'écran devient
     réellement plein écran (et non juste une grande fenêtre). */ const toggleFullscreen = ()=>{
        if (typeof document === "undefined") return;
        if (document.fullscreenElement) {
            void document.exitFullscreen().catch(()=>undefined);
            return;
        }
        const request = document.documentElement.requestFullscreen?.();
        if (request) void request.catch(()=>undefined);
    };
    /* Suit l'état réel du plein écran (y compris quand on sort avec Échap). */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleChange = ()=>setExpanded(Boolean(document.fullscreenElement));
        document.addEventListener("fullscreenchange", handleChange);
        return ()=>document.removeEventListener("fullscreenchange", handleChange);
    }, []);
    /* En plein écran, on masque les barres de défilement de la page : sinon une
     bande blanche reste visible sur le bord droit de l'écran. Le « gutter »
     réservé par `scrollbar-gutter: stable` est neutralisé lui aussi, sinon il
     laisse une bande vide à droite même sans barre de défilement. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!expanded) return;
        const root = document.documentElement;
        const body = document.body;
        const previousRootOverflow = root.style.overflow;
        const previousBodyOverflow = body.style.overflow;
        const previousGutter = root.style.scrollbarGutter;
        root.style.overflow = "hidden";
        body.style.overflow = "hidden";
        root.style.scrollbarGutter = "auto";
        return ()=>{
            root.style.overflow = previousRootOverflow;
            body.style.overflow = previousBodyOverflow;
            root.style.scrollbarGutter = previousGutter;
        };
    }, [
        expanded
    ]);
    /* En quittant le statut, on rend l'écran normal. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>()=>{
            if (document.fullscreenElement) void document.exitFullscreen().catch(()=>undefined);
        }, []);
    /* Marque le statut comme vu (une seule écriture par statut et par session). */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const statusId = slide?.status.id;
        if (statusId && user?.id) void (0,_lib_firebase_status__WEBPACK_IMPORTED_MODULE_5__/* .registerStatusView */ .Xl)(statusId, user.id);
    }, [
        slide?.status.id,
        user?.id
    ]);
    /* Avance automatique : une seule boucle d'animation, donc une barre fluide.
     Photos et textes avancent à l'horloge, vidéos sur leur propre temps. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setProgress(0);
        setDuration(media ? mediaDuration(media, slide?.status) : SLIDE_DURATION);
        /* Si la lecture est en pause, la vidéo de la nouvelle diapositive ne doit
       pas démarrer toute seule. */ if (isVideo && userPausedRef.current) videoRef.current?.pause();
        let frame = 0;
        let last = performance.now();
        elapsedRef.current = 0;
        const tick = (now)=>{
            if (isVideo) {
                const video = videoRef.current;
                if (video && video.duration && Number.isFinite(video.duration)) {
                    setProgress(Math.min(1, video.currentTime / video.duration));
                    if (video.ended) {
                        goNextRef.current();
                        return;
                    }
                }
            } else {
                const delta = now - last;
                last = now;
                if (!pausedRef.current && !userPausedRef.current && !scrubbingRef.current) elapsedRef.current += delta;
                const value = Math.min(1, elapsedRef.current / duration);
                setProgress(value);
                if (value >= 1) {
                    goNextRef.current();
                    return;
                }
            }
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return ()=>cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        slideKey,
        isVideo,
        duration
    ]);
    const handleLoadedMetadata = (element)=>{
        if (!element.duration || !Number.isFinite(element.duration)) return;
        setDuration(Math.min(MAX_VIDEO_DURATION, Math.max(2000, element.duration * 1000)));
    };
    if (!group || !slide) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {});
    const isOwn = group.isOwn;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_11__/* .Modal */ .u_, {
                className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("flex items-center justify-center", expanded ? "bg-black !p-0" : "!p-0 xs:!p-4"),
                modalClassName: clsx__WEBPACK_IMPORTED_MODULE_2___default()("relative flex w-full flex-col overflow-hidden bg-black", expanded ? "fixed inset-0 h-full max-h-none w-full max-w-none rounded-none" : "h-[100dvh] max-w-md rounded-none xs:h-[88vh] xs:rounded-md"),
                open: true,
                closeModal: onClose,
                closePanelOnClick: false,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "relative flex h-full w-full flex-col",
                    style: {
                        backgroundColor: slide.status.backgroundColor
                    },
                    onPointerDown: handleHoldStart,
                    onPointerUp: handleHoldEnd,
                    onPointerLeave: handleHoldEnd,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            ref: barRef,
                            "aria-label": "Avancer ou reculer dans les statuts",
                            className: "absolute inset-x-4 top-3 z-40 flex cursor-pointer gap-1 touch-none select-none",
                            onPointerDown: handleBarPointerDown,
                            onPointerMove: handleBarPointerMove,
                            onPointerUp: handleBarPointerUp,
                            onPointerCancel: handleBarPointerUp,
                            role: "slider",
                            "aria-valuemin": 1,
                            "aria-valuemax": Math.max(1, segments.length),
                            "aria-valuenow": slideIndex + 1,
                            children: segments.map(({ status , index  })=>{
                                const fill = index < slideIndex ? 1 : index === slideIndex ? progress : 0;
                                const chosen = status.barColor?.toLowerCase();
                                const barColor = chosen && chosen !== DEFAULT_BAR_COLOR ? status.barColor : "rgb(var(--main-accent))";
                                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("h-1 flex-1 overflow-hidden rounded-full bg-white/70 transition-all duration-200", scrubbing && "h-1.5"),
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "block h-full rounded-full",
                                        style: {
                                            width: `${fill * 100}%`,
                                            backgroundColor: barColor
                                        }
                                    })
                                }, index);
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "z-30 flex items-center gap-3 bg-gradient-to-b from-black/70 to-transparent px-3 pb-6 pt-8",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_status_avatar__WEBPACK_IMPORTED_MODULE_12__/* .StatusAvatarImage */ .r, {
                                    src: group.user.photoURL,
                                    size: 36,
                                    gender: group.user.gender,
                                    shape: group.user.avatarShape,
                                    frame: group.user.avatarFrame
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "min-w-0 flex-1 text-white",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "truncate text-sm font-bold",
                                            children: group.user.name
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "truncate text-xs text-white/70",
                                            children: [
                                                "@",
                                                group.user.username,
                                                " \xb7",
                                                " ",
                                                formatRelative(slide.status.createdAt?.toMillis?.() ?? Date.now()),
                                                isOwn && " \xb7 Vous"
                                            ]
                                        })
                                    ]
                                }),
                                isOwn && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "hidden shrink-0 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30 xs:flex",
                                            type: "button",
                                            "aria-label": "Supprimer le statut",
                                            onClick: ()=>setDeleteOpen(true),
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                                className: "h-6 w-6",
                                                iconName: "delete"
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "shrink-0 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30 xs:hidden",
                                            type: "button",
                                            "aria-label": "Options du statut",
                                            onClick: ()=>setMenuOpen(true),
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                                className: "h-6 w-6",
                                                iconName: "more_horiz"
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "shrink-0 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30",
                                    type: "button",
                                    "aria-label": paused ? "Reprendre la lecture" : "Mettre en pause",
                                    "aria-pressed": paused,
                                    onClick: togglePause,
                                    onPointerDown: (event)=>event.stopPropagation(),
                                    onPointerUp: (event)=>event.stopPropagation(),
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                        className: "h-6 w-6",
                                        iconName: paused ? "play_arrow" : "pause"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "shrink-0 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30",
                                    type: "button",
                                    "aria-label": expanded ? "Quitter le plein \xe9cran" : "Plein \xe9cran",
                                    onClick: toggleFullscreen,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                        className: "h-6 w-6",
                                        iconName: expanded ? "close_fullscreen" : "open_in_full"
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "shrink-0 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30",
                                    type: "button",
                                    "aria-label": "Fermer le statut",
                                    onClick: onClose,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                        className: "h-6 w-6",
                                        iconName: "close"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "relative min-h-0 flex-1",
                            children: [
                                media && (isVideo ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("video", {
                                    className: "h-full w-full object-contain",
                                    ref: videoRef,
                                    src: videoSrc ?? media.src,
                                    autoPlay: true,
                                    playsInline: true,
                                    onEnded: goNext,
                                    onError: goNext,
                                    onLoadedMetadata: (event)=>handleLoadedMetadata(event.currentTarget)
                                }, media.src) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    className: "h-full w-full object-contain",
                                    src: media.src,
                                    alt: media.alt,
                                    draggable: false
                                }, media.src)),
                                slide.status.kind === "text" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("absolute inset-0 flex flex-col items-center justify-end gap-3 px-6 pb-6 text-center", media && "bg-black/35"),
                                    children: [
                                        slide.status.text && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "max-w-[min(32rem,90%)] whitespace-pre-wrap break-words rounded-[2rem] px-6 py-4 text-2xl font-semibold leading-snug shadow-lg backdrop-blur-sm",
                                            style: {
                                                background: textBubbleStyle(slide.status.backgroundColor).background,
                                                color: slide.status.textColor ?? "#ffffff"
                                            },
                                            children: slide.status.text
                                        }),
                                        slide.status.link && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            className: "bg-white/15 max-w-full truncate rounded-full px-4 py-1.5 text-sm text-white underline",
                                            href: slide.status.link,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            onClick: (event)=>event.stopPropagation(),
                                            children: slide.status.link
                                        })
                                    ]
                                }),
                                slide.status.kind === "media" && slide.status.text && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "absolute inset-0 flex flex-col items-center justify-end gap-3 bg-black/35 px-6 pb-6 text-center",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "max-w-[min(32rem,90%)] whitespace-pre-wrap break-words rounded-[2rem] px-6 py-4 text-2xl font-semibold leading-snug shadow-lg backdrop-blur-sm",
                                        style: {
                                            background: textBubbleStyle(slide.status.backgroundColor).background,
                                            color: slide.status.textColor ?? "#ffffff"
                                        },
                                        children: slide.status.text
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "absolute inset-y-0 left-0 z-10 w-1/3 cursor-pointer",
                                    type: "button",
                                    "aria-label": "Statut pr\xe9c\xe9dent",
                                    onClick: goPrev
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "absolute inset-y-0 right-0 z-10 w-2/3 cursor-pointer",
                                    type: "button",
                                    "aria-label": "Statut suivant",
                                    onClick: goNext
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "z-30 flex items-center justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-4 text-[11px] text-white/70",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    children: [
                                        "Statut ",
                                        slideIndex + 1,
                                        "/",
                                        segments.length
                                    ]
                                }),
                                statusRows.length > 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    children: [
                                        "\xb7 ",
                                        statusRows.length,
                                        " publications"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_11__/* .Modal */ .u_, {
                className: "flex items-center justify-center p-4",
                modalClassName: "w-full max-w-xs rounded-2xl bg-main-background p-8",
                open: deleteOpen,
                closeModal: ()=>setDeleteOpen(false),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_action_modal__WEBPACK_IMPORTED_MODULE_10__/* .ActionModal */ .W, {
                    title: "Supprimer le statut ?",
                    description: "Cette action est irr\xe9versible : le statut sera supprim\xe9 et la lecture s’arr\xeatera.",
                    mainBtnClassName: "bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75 accent-tab focus-visible:bg-accent-red/90",
                    mainBtnLabel: deleting ? "Suppression…" : "Supprimer",
                    secondaryBtnLabel: "Annuler",
                    focusOnMainBtn: true,
                    action: ()=>void handleDeleteStatus(),
                    closeModal: ()=>setDeleteOpen(false)
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_11__/* .Modal */ .u_, {
                className: "flex items-end justify-center",
                modalClassName: "w-full max-w-md rounded-t-2xl bg-main-background p-4 pb-6",
                drag: "y",
                dragControls: menuDragControls,
                dragListener: false,
                dragElastic: 0.5,
                dragMomentum: true,
                dragSnapToOrigin: false,
                dragConstraints: {
                    top: 0
                },
                onDragEnd: handleMenuDragEnd,
                open: menuOpen,
                closeModal: ()=>setMenuOpen(false),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex w-full flex-col gap-1",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            "aria-label": "Faire glisser pour fermer le menu du statut",
                            className: "flex w-full touch-none justify-center py-3",
                            onPointerDown: (event)=>menuDragControls.start(event.nativeEvent),
                            type: "button",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            className: "accent-tab flex items-center gap-3 rounded-xl p-4 text-left font-bold text-accent-red transition hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                            type: "button",
                            onClick: ()=>{
                                setMenuOpen(false);
                                setDeleteOpen(true);
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                    className: "h-5 w-5",
                                    iconName: "delete"
                                }),
                                "Supprimer le statut"
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            className: "accent-tab flex items-center gap-3 rounded-xl p-4 text-left font-bold text-light-primary transition hover:bg-light-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/10",
                            type: "button",
                            onClick: ()=>setMenuOpen(false),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                    className: "h-5 w-5",
                                    iconName: "close"
                                }),
                                "Fermer"
                            ]
                        })
                    ]
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6344:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "h": () => (/* binding */ EmojiPicker)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "clsx"
var external_clsx_ = __webpack_require__(8103);
var external_clsx_default = /*#__PURE__*/__webpack_require__.n(external_clsx_);
// EXTERNAL MODULE: ./src/components/ui/material-icon.tsx + 2 modules
var material_icon = __webpack_require__(3325);
;// CONCATENATED MODULE: ./src/lib/emoji.ts
/**
 * Catalogue des emojis proposés par le sélecteur.
 *
 * Chaque entrée porte un nom lisible (en français) : c'est lui qui sert à la
 * recherche, avec quelques mots-clés supplémentaires quand un mot ne suffit
 * pas à retrouver l'emoji (« rigoler » pour « 😂 », etc.).
 */ const EMOJI_CATEGORIES = [
    {
        id: "smileys",
        label: "Visages",
        keywords: "visage sourire emotion"
    },
    {
        id: "gestures",
        label: "Gestes",
        keywords: "geste main bras"
    },
    {
        id: "hearts",
        label: "Cœurs",
        keywords: "coeur amour couleur"
    },
    {
        id: "objects",
        label: "Objets",
        keywords: "objet travail outil fete voyage"
    },
    {
        id: "animals",
        label: "Animaux",
        keywords: "animal chat chien"
    },
    {
        id: "food",
        label: "Nourriture",
        keywords: "nourriture manger boisson"
    },
    {
        id: "symbols",
        label: "Symboles",
        keywords: "symbole signe divers"
    }
];
const RAW_EMOJIS = {
    smileys: [
        [
            "\uD83D\uDE00",
            "sourire",
            "rire content"
        ],
        [
            "\uD83D\uDE02",
            "rire aux larmes",
            "rire drlol"
        ],
        [
            "\uD83E\uDD23",
            "rire \xe0 en rolls",
            "rire fou"
        ],
        [
            "\uD83D\uDE0A",
            "sourire aux yeux ferm\xe9s",
            "sourire doux"
        ],
        [
            "\uD83D\uDE0D",
            "couple amoureux",
            "amour yeux"
        ],
        [
            "\uD83E\uDD70",
            "amour",
            "adorer"
        ],
        [
            "\uD83D\uDE18",
            "bisou",
            "kiss"
        ],
        [
            "\uD83D\uDE17",
            "bisou sounds",
            "kiss"
        ],
        [
            "\uD83D\uDE0B",
            "savourer",
            "miam langue"
        ],
        [
            "\uD83D\uDE1B",
            "langue",
            "moquerie"
        ],
        [
            "\uD83E\uDD2A",
            "farce",
            "dr\xf4le"
        ],
        [
            "\uD83D\uDE0E",
            "cool",
            "lunettes"
        ],
        [
            "\uD83E\uDD13",
            "intello",
            "nerveux"
        ],
        [
            "\uD83E\uDDD0",
            "loupe",
            "inspecter"
        ],
        [
            "\uD83E\uDD14",
            "r\xe9fl\xe9chir",
            "penser"
        ],
        [
            "\uD83E\uDD28",
            "sceptique",
            "m\xe9fiant"
        ],
        [
            "\uD83D\uDE10",
            "neutre",
            "impassible"
        ],
        [
            "\uD83D\uDE11",
            "sans expression",
            "impossible"
        ],
        [
            "\uD83D\uDE36",
            "muet",
            "silence"
        ],
        [
            "\uD83D\uDE0F",
            "sourire malin",
            "malin"
        ],
        [
            "\uD83D\uDE12",
            "d\xe9go\xfbt\xe9",
            "lass\xe9"
        ],
        [
            "\uD83D\uDE44",
            "yeux au ciel",
            "ras le bol"
        ],
        [
            "\uD83D\uDE2C",
            "grimace",
            "g\xeane"
        ],
        [
            "\uD83E\uDD25",
            "mentir",
            "mensonge"
        ],
        [
            "\uD83D\uDE0C",
            "soupir",
            "repos"
        ],
        [
            "\uD83D\uDE14",
            "triste",
            "sad"
        ],
        [
            "\uD83D\uDE2A",
            "endormi",
            "fatigue"
        ],
        [
            "\uD83E\uDD24",
            "baver",
            "envie"
        ],
        [
            "\uD83D\uDE34",
            "dormir",
            "zzz"
        ],
        [
            "\uD83E\uDD12",
            "malade",
            "fievre"
        ],
        [
            "\uD83E\uDD15",
            "malade bandage",
            "blesse"
        ],
        [
            "\uD83E\uDD75",
            "chaud",
            "canicule"
        ],
        [
            "\uD83E\uDD76",
            "froid",
            "gele"
        ],
        [
            "\uD83D\uDE35",
            "evite",
            "tourned"
        ],
        [
            "\uD83E\uDD2F",
            "explose",
            "choque"
        ],
        [
            "\uD83E\uDD71",
            "baille",
            "endormi"
        ],
        [
            "\uD83D\uDE24",
            "fache",
            "colere"
        ],
        [
            "\uD83D\uDE21",
            "furieux",
            "colere rage"
        ],
        [
            "\uD83E\uDD2C",
            "jurons",
            "colere"
        ],
        [
            "\uD83D\uDE22",
            "pleure",
            "larme triste"
        ],
        [
            "\uD83D\uDE2D",
            "pleure fort",
            "larmes"
        ],
        [
            "\uD83D\uDE24",
            "boulevers\xe9",
            "emo"
        ],
        [
            "\uD83D\uDE30",
            "angoisse",
            "peur"
        ],
        [
            "\uD83D\uDE28",
            "surpris",
            "peur"
        ],
        [
            "\uD83D\uDE31",
            "cri",
            "peur"
        ],
        [
            "\uD83E\uDD7A",
            "supplie",
            "piti\xe9"
        ],
        [
            "\uD83D\uDE33",
            "choqu\xe9",
            "surpris"
        ],
        [
            "\uD83E\uDD79",
            "\xe9mu",
            "larmes joie"
        ],
        [
            "\uD83E\uDD17",
            "c\xe2lin",
            "calin"
        ],
        [
            "\uD83E\uDD2D",
            "rire innocent",
            "rire"
        ],
        [
            "\uD83E\uDD2B",
            "chuchoter",
            "secret"
        ],
        [
            "\uD83D\uDE2C",
            "g\xeane",
            "malaise"
        ],
        [
            "\uD83D\uDE44",
            "exasp\xe9r\xe9",
            "ras le bol"
        ],
        [
            "\uD83E\uDD21",
            "clown",
            "bouffon"
        ],
        [
            "\uD83D\uDC7B",
            "fant\xf4me",
            "fantome"
        ],
        [
            "\uD83D\uDC80",
            "mort",
            "skeleton"
        ],
        [
            "\uD83D\uDC7D",
            "alien",
            " extraterrestre"
        ],
        [
            "\uD83E\uDD16",
            "robot",
            "machine"
        ],
        [
            "\uD83D\uDE3A",
            "chat",
            "animal"
        ]
    ],
    gestures: [
        [
            "\uD83D\uDC4D",
            "pouce",
            "like ok accord"
        ],
        [
            "\uD83D\uDC4E",
            "pouce vers le bas",
            "unlike"
        ],
        [
            "\uD83D\uDC4C",
            "ok",
            "parfait"
        ],
        [
            "\uD83E\uDD0C",
            " pinched fingers",
            "ok"
        ],
        [
            "✌️",
            "victoire",
            "paix"
        ],
        [
            "\uD83E\uDD1E",
            "croise les doigts",
            "chance"
        ],
        [
            "\uD83E\uDD1F",
            "je t’aime",
            "love"
        ],
        [
            "\uD83E\uDD18",
            "rock",
            "guitar"
        ],
        [
            "\uD83E\uDD19",
            "shaka",
            "cool"
        ],
        [
            "\uD83D\uDC48",
            "gauche",
            "pointer"
        ],
        [
            "\uD83D\uDC49",
            "droite",
            "pointer"
        ],
        [
            "\uD83D\uDC46",
            "haut",
            "pointer"
        ],
        [
            "\uD83D\uDC47",
            "bas",
            "pointer"
        ],
        [
            "☝️",
            "index",
            "un"
        ],
        [
            "✋",
            "main",
            "stop salut"
        ],
        [
            "\uD83E\uDD1A",
            "main ouverte",
            "stop"
        ],
        [
            "\uD83D\uDD90️",
            "main",
            "cinq"
        ],
        [
            "\uD83D\uDD96",
            "vulcain",
            "ironie"
        ],
        [
            "\uD83D\uDC4B",
            " salut",
            "au revoir"
        ],
        [
            "\uD83E\uDD1A",
            "main",
            "stop"
        ],
        [
            "\uD83D\uDC4A",
            "poing",
            "coup"
        ],
        [
            "✊",
            "poing",
            "courage"
        ],
        [
            "\uD83D\uDC4F",
            "applaudissement",
            "bravo"
        ],
        [
            "\uD83D\uDE4C",
            "mains en l’air",
            "fete"
        ],
        [
            "\uD83D\uDC50",
            "mains ouvertes",
            "celebration"
        ],
        [
            "\uD83E\uDD32",
            "mains jointes",
            "priere"
        ],
        [
            "\uD83D\uDE4F",
            "priere",
            "merci"
        ],
        [
            "\uD83E\uDD1D",
            "poignee de main",
            "accord"
        ],
        [
            "\uD83D\uDCAA",
            "muscle",
            "fort"
        ],
        [
            "\uD83E\uDDBE",
            "bras mecanique",
            "force"
        ],
        [
            "✍️",
            "ecriture",
            "ecrire"
        ],
        [
            "\uD83E\uDEF6",
            "coeur des mains",
            "amour"
        ],
        [
            "\uD83D\uDC40",
            "yeux",
            "regarder"
        ],
        [
            "\uD83E\uDDE0",
            "cerveau",
            "intelligent"
        ],
        [
            "\uD83E\uDEE1",
            "salut militaire",
            "respect"
        ],
        [
            "\uD83E\uDD37",
            "je m’en fous",
            "indifference"
        ],
        [
            "\uD83E\uDD37‍♀️",
            "je m’en fous",
            "indifference"
        ],
        [
            "\uD83D\uDE4B",
            "main levee",
            "volontaire"
        ],
        [
            "\uD83D\uDE4B‍♂️",
            "main levee",
            "volontaire"
        ],
        [
            "\uD83D\uDC83",
            "danse",
            "danser"
        ],
        [
            "\uD83D\uDD7A",
            "danse",
            "danser"
        ],
        [
            "\uD83D\uDC6F",
            "deux personnes",
            "ami"
        ],
        [
            "\uD83E\uDDD8",
            "meditation",
            "calme"
        ],
        [
            "\uD83E\uDD38",
            "acrobate",
            "sport"
        ],
        [
            "\uD83C\uDFC3",
            "course",
            "sport"
        ],
        [
            "\uD83D\uDEB6",
            "marche",
            "promenade"
        ]
    ],
    hearts: [
        [
            "❤️",
            "coeur rouge",
            "amour"
        ],
        [
            "\uD83E\uDDE1",
            "coeur orange",
            "amour"
        ],
        [
            "\uD83D\uDC9B",
            "coeur jaune",
            "amour"
        ],
        [
            "\uD83D\uDC9A",
            "coeur vert",
            "amour"
        ],
        [
            "\uD83D\uDC99",
            "coeur bleu",
            "amour"
        ],
        [
            "\uD83D\uDC9C",
            "coeur violet",
            "amour"
        ],
        [
            "\uD83D\uDDA4",
            "coeur noir",
            "amour"
        ],
        [
            "\uD83E\uDD0D",
            "coeur blanc",
            "amour"
        ],
        [
            "\uD83E\uDD0E",
            "coeur marron",
            "amour"
        ],
        [
            "\uD83D\uDC94",
            "coeur brise",
            "rupture"
        ],
        [
            "\uD83D\uDC95",
            "coeurs",
            "amour"
        ],
        [
            "\uD83D\uDC9E",
            "coeurs tournants",
            "amour"
        ],
        [
            "\uD83D\uDC93",
            "coeur battant",
            "amour"
        ],
        [
            "\uD83D\uDC97",
            "coeur qui grossit",
            "amour"
        ],
        [
            "\uD83D\uDC96",
            "coeur scintillant",
            "amour"
        ],
        [
            "\uD83D\uDC98",
            "coeur de cupidon",
            "amour"
        ],
        [
            "\uD83D\uDC9D",
            "coeur cadeau",
            "cadeau"
        ],
        [
            "\uD83D\uDC9F",
            "coeur d love",
            "amour"
        ],
        [
            "\uD83D\uDC8C",
            "lettre",
            "couur"
        ],
        [
            "\uD83D\uDC98",
            "cupidon",
            "amour"
        ],
        [
            "\uD83D\uDCAF",
            "100",
            "parfait score"
        ],
        [
            "\uD83D\uDCA5",
            "explosion",
            "boum"
        ],
        [
            "\uD83D\uDCAB",
            "comete",
            "etoile"
        ],
        [
            "✨",
            "brillance",
            "magie etoile"
        ],
        [
            "⭐",
            "etoile",
            "favori"
        ],
        [
            "\uD83C\uDF1F",
            "etoile brillante",
            "favori"
        ],
        [
            "⚡",
            "eclair",
            "rapidite"
        ],
        [
            "\uD83D\uDD25",
            "feu",
            "chaud populaire"
        ],
        [
            "\uD83C\uDF08",
            "arc-en-ciel",
            "lgbt"
        ],
        [
            "☀️",
            "soleil",
            "ensoleille"
        ],
        [
            "\uD83C\uDF19",
            "lune",
            "nuit"
        ],
        [
            "☁️",
            "nuage",
            "nuageux"
        ],
        [
            "❄️",
            "flocon",
            "froid hiver"
        ],
        [
            "\uD83D\uDCA7",
            "goutte",
            "eau pluie"
        ],
        [
            "\uD83C\uDF89",
            "fete",
            "confettis bravo"
        ],
        [
            "\uD83C\uDF8A",
            "confettis",
            "fete"
        ],
        [
            "\uD83E\uDD73",
            "fete",
            "anniversaire"
        ],
        [
            "\uD83C\uDF88",
            "ballon",
            "fete"
        ],
        [
            "\uD83C\uDF81",
            "cadeau",
            "anniversaire"
        ],
        [
            "\uD83C\uDFC6",
            "trophee",
            "victoire"
        ],
        [
            "\uD83E\uDD47",
            "medaille or",
            "victoire"
        ],
        [
            "\uD83C\uDF89",
            "bravo",
            "felicitation"
        ],
        [
            "\uD83D\uDC90",
            "bouquet",
            "fleurs"
        ],
        [
            "\uD83E\uDDE8",
            "feu d’artifice",
            "fete"
        ],
        [
            "\uD83C\uDFAF",
            "cible",
            "objectif"
        ],
        [
            "\uD83E\uDDE9",
            "puzzle",
            "enigme"
        ],
        [
            "\uD83D\uDC8E",
            "diamant",
            "precieux"
        ]
    ],
    objects: [
        [
            "\uD83D\uDCF1",
            "telephone",
            "mobile smartphone"
        ],
        [
            "\uD83D\uDCBB",
            "ordinateur",
            "laptop mac"
        ],
        [
            "⌨️",
            "clavier",
            "clavier"
        ],
        [
            "\uD83D\uDDA5️",
            "ecran",
            "ordinateur"
        ],
        [
            "\uD83D\uDDA8️",
            "imprimante",
            "papier"
        ],
        [
            "\uD83D\uDD50",
            "horloge",
            "heure temps"
        ],
        [
            "\uD83D\uDCF7",
            "appareil photo",
            "photo camera"
        ],
        [
            "\uD83C\uDFA5",
            "camera",
            "video"
        ],
        [
            "\uD83D\uDCFA",
            "television",
            "tv ecran"
        ],
        [
            "\uD83D\uDCFB",
            "radio",
            "musique"
        ],
        [
            "\uD83D\uDD0B",
            "batterie",
            "energie"
        ],
        [
            "\uD83D\uDD0C",
            "prise",
            "electricite"
        ],
        [
            "\uD83D\uDCA1",
            "ampoule",
            "idee lumiere"
        ],
        [
            "\uD83D\uDD26",
            "lampe",
            "lumiere"
        ],
        [
            "\uD83D\uDCD5",
            "livre",
            "lecture"
        ],
        [
            "\uD83D\uDCD6",
            "livre ouvert",
            "lecture"
        ],
        [
            "\uD83D\uDCDA",
            "livres",
            "lecture etude"
        ],
        [
            "✏️",
            "crayon",
            "ecrire"
        ],
        [
            "\uD83D\uDD8A️",
            "stylo",
            "ecrire"
        ],
        [
            "\uD83D\uDCDD",
            "note",
            "ecrire memo"
        ],
        [
            "\uD83D\uDCCC",
            "punaise",
            "note"
        ],
        [
            "\uD83D\uDCCE",
            "trombone",
            "piece jointe"
        ],
        [
            "✂️",
            "ciseaux",
            "couper"
        ],
        [
            "\uD83D\uDD11",
            "cle",
            "cle"
        ],
        [
            "\uD83D\uDD12",
            "cadenas",
            "verrouille securite"
        ],
        [
            "\uD83D\uDD13",
            "cadenas ouvert",
            "deverrouille"
        ],
        [
            "\uD83D\uDEE0️",
            "outils",
            "reparation"
        ],
        [
            "\uD83D\uDD27",
            "cle de molette",
            "reparation outil"
        ],
        [
            "\uD83D\uDD28",
            "marteau",
            "outil"
        ],
        [
            "⚙️",
            "roue",
            "parametre"
        ],
        [
            "\uD83E\uDDF2",
            "aimant",
            "attraction"
        ],
        [
            "\uD83D\uDC8A",
            "medicament",
            "pilule"
        ],
        [
            "\uD83E\uDE7A",
            "stethoscope",
            "medecin"
        ],
        [
            "\uD83D\uDCB0",
            "porte-monnaie",
            "argent"
        ],
        [
            "\uD83D\uDCB3",
            "carte bancaire",
            "paiement"
        ],
        [
            "\uD83D\uDCE6",
            "colis",
            "colis livraison"
        ],
        [
            "\uD83D\uDCEB",
            "boite aux lettres",
            "courrier"
        ],
        [
            "\uD83D\uDDD1️",
            "corbeille",
            "jeter"
        ],
        [
            "\uD83E\uDDF9",
            "balai",
            "nettoyer"
        ],
        [
            "\uD83E\uDDFA",
            "panier",
            "linge"
        ],
        [
            "\uD83C\uDF92",
            "sac a dos",
            "voyage"
        ],
        [
            "\uD83D\uDC53",
            "lunettes",
            "regard"
        ],
        [
            "\uD83D\uDD76️",
            "lunettes de soleil",
            "soleil"
        ],
        [
            "\uD83C\uDF89",
            "fete",
            "confettis bravo"
        ],
        [
            "\uD83C\uDF8A",
            "confettis",
            "fete"
        ],
        [
            "\uD83E\uDD73",
            "parti",
            "anniversaire"
        ],
        [
            "\uD83E\uDD42",
            "verre qui trinque",
            "champagne toast"
        ],
        [
            "\uD83C\uDF7E",
            "bouteille qui saute",
            "champagne"
        ],
        [
            "\uD83E\uDD47",
            "medaille",
            "victoire"
        ],
        [
            "\uD83C\uDFC5",
            "medaille",
            "recompense"
        ],
        [
            "\uD83C\uDFC6",
            "trophee",
            "victoire"
        ],
        [
            "\uD83C\uDF96️",
            "medaille militaire",
            "honneur"
        ],
        [
            "\uD83D\uDC51",
            "couronne",
            "roi"
        ],
        [
            "\uD83C\uDFA9",
            "chapeau",
            "magicien"
        ],
        [
            "\uD83C\uDFAD",
            "theatre",
            "masque"
        ],
        [
            "\uD83C\uDFA8",
            "palette",
            "art peinture"
        ],
        [
            "\uD83C\uDFAC",
            "clap",
            "cinema"
        ],
        [
            "\uD83C\uDFA4",
            "micro",
            "chanter"
        ],
        [
            "\uD83C\uDFA7",
            "casque",
            "musique"
        ],
        [
            "\uD83C\uDFBC",
            "partition",
            "musique"
        ],
        [
            "\uD83C\uDFB9",
            "piano",
            "musique"
        ],
        [
            "\uD83E\uDD41",
            "tambour",
            "musique"
        ],
        [
            "\uD83C\uDFBA",
            "trompette",
            "musique"
        ],
        [
            "\uD83E\uDE95",
            "banjo",
            "musique"
        ],
        [
            "\uD83C\uDFB8",
            "guitare",
            "musique"
        ],
        [
            "\uD83C\uDFBB",
            "violon",
            "musique"
        ],
        [
            "\uD83E\uDE97",
            "flute",
            "musique"
        ],
        [
            "\uD83C\uDFAA",
            "cirque",
            "spectacle"
        ],
        [
            "\uD83C\uDF89",
            "confettis",
            "fete"
        ],
        [
            "\uD83C\uDF81",
            "cadeau",
            "surprise"
        ],
        [
            "\uD83C\uDF88",
            "ballon",
            "anniversaire"
        ],
        [
            "\uD83D\uDC83",
            "danse",
            "fete"
        ],
        [
            "\uD83D\uDD7A",
            "danse",
            "fete"
        ],
        [
            "\uD83E\uDD41",
            "tambour",
            "fete"
        ],
        [
            "\uD83D\uDC90",
            "bouquet",
            "romance"
        ],
        [
            "\uD83D\uDC8D",
            "bague",
            "mariage"
        ],
        [
            "\uD83D\uDC92",
            "mariage",
            "noce"
        ],
        [
            "\uD83D\uDC70",
            "mari\xe9e",
            "noce"
        ],
        [
            "\uD83E\uDD35",
            "mari\xe9",
            "noce"
        ],
        [
            "\uD83C\uDF38",
            "fleur",
            "printemps"
        ],
        [
            "\uD83C\uDF3A",
            "fleur",
            "ete"
        ],
        [
            "\uD83D\uDE97",
            "voiture",
            "transport"
        ],
        [
            "\uD83D\uDE95",
            "taxi",
            "transport"
        ],
        [
            "\uD83D\uDE8C",
            "bus",
            "transport"
        ],
        [
            "\uD83D\uDEB2",
            "velo",
            "transport"
        ],
        [
            "\uD83D\uDEF4",
            "trottinette",
            "transport"
        ],
        [
            "\uD83C\uDFCD️",
            "moto",
            "transport"
        ],
        [
            "\uD83D\uDE82",
            "train",
            "transport"
        ],
        [
            "✈️",
            "avion",
            "transport voyage"
        ],
        [
            "\uD83D\uDE80",
            "fusee",
            "espace"
        ],
        [
            "\uD83D\uDEF8",
            "ovni",
            "espace"
        ],
        [
            "\uD83D\uDE81",
            "helicoptere",
            "transport"
        ],
        [
            "⛵",
            "bateau",
            "transport"
        ],
        [
            "\uD83D\uDEA2",
            "navire",
            "transport"
        ],
        [
            "⚓",
            "ancre",
            "mer"
        ],
        [
            "\uD83D\uDDFA️",
            "carte",
            "voyage"
        ],
        [
            "\uD83D\uDDFF",
            "moai",
            "voyage"
        ],
        [
            "\uD83D\uDDFD",
            "statue",
            "voyage"
        ],
        [
            "\uD83D\uDDFC",
            "tour",
            "voyage"
        ],
        [
            "\uD83C\uDFF0",
            "chateau",
            "voyage"
        ],
        [
            "⛺",
            "tente",
            "camping"
        ],
        [
            "\uD83C\uDFDD️",
            "ile",
            "voyage"
        ],
        [
            "\uD83C\uDFD4️",
            "montagne",
            "montagne"
        ],
        [
            "⛰️",
            "montagne",
            "montagne"
        ],
        [
            "\uD83C\uDF0B",
            "volcan",
            "montagne"
        ],
        [
            "\uD83C\uDFD5️",
            "camping",
            "camping"
        ],
        [
            "\uD83C\uDFD6️",
            "plage",
            "mer vacances"
        ],
        [
            "\uD83C\uDFDD️",
            "plage",
            "mer vacances"
        ],
        [
            "\uD83C\uDF05",
            "coucher de soleil",
            "soir"
        ],
        [
            "\uD83C\uDF04",
            "lever du soleil",
            "matin"
        ],
        [
            "\uD83C\uDF03",
            "ville la nuit",
            "ville"
        ],
        [
            "\uD83C\uDFD9️",
            "ville",
            "ville"
        ],
        [
            "\uD83C\uDF09",
            "pont",
            "ville"
        ],
        [
            "\uD83D\uDDFF",
            "monument",
            "ville"
        ],
        [
            "\uD83C\uDFA1",
            "grande roue",
            "fete parc"
        ],
        [
            "\uD83C\uDFA2",
            "montagne russe",
            "parc"
        ],
        [
            "\uD83C\uDFA0",
            "man\xe8ge",
            "parc"
        ],
        [
            "\uD83D\uDEA6",
            "feu tricolore",
            "ville"
        ],
        [
            "\uD83E\uDDF3",
            "valise",
            "voyage"
        ],
        [
            "\uD83C\uDFAB",
            "ticket",
            "voyage"
        ],
        [
            "\uD83D\uDEC2",
            "controle",
            "aeroport"
        ],
        [
            "\uD83D\uDEEB",
            "decollage",
            "aeroport"
        ]
    ],
    animals: [
        [
            "\uD83D\uDC36",
            "chien",
            "animal"
        ],
        [
            "\uD83D\uDC31",
            "chat",
            "animal"
        ],
        [
            "\uD83D\uDC2D",
            "souris",
            "animal"
        ],
        [
            "\uD83D\uDC39",
            "hamster",
            "animal"
        ],
        [
            "\uD83D\uDC30",
            "lapin",
            "animal"
        ],
        [
            "\uD83E\uDD8A",
            "renard",
            "animal"
        ],
        [
            "\uD83D\uDC3B",
            "ours",
            "animal"
        ],
        [
            "\uD83D\uDC3C",
            "panda",
            "animal"
        ],
        [
            "\uD83D\uDC28",
            "koala",
            "animal"
        ],
        [
            "\uD83D\uDC2F",
            "tigre",
            "animal"
        ],
        [
            "\uD83E\uDD81",
            "lion",
            "animal"
        ],
        [
            "\uD83D\uDC2E",
            "vache",
            "animal"
        ],
        [
            "\uD83D\uDC37",
            "cochon",
            "animal"
        ],
        [
            "\uD83D\uDC38",
            "grenouille",
            "animal"
        ],
        [
            "\uD83D\uDC35",
            "singe",
            "animal"
        ],
        [
            "\uD83D\uDC14",
            "poule",
            "animal"
        ],
        [
            "\uD83D\uDC27",
            "pingouin",
            "animal"
        ],
        [
            "\uD83D\uDC26",
            "oiseau",
            "animal"
        ],
        [
            "\uD83E\uDD86",
            "canard",
            "animal"
        ],
        [
            "\uD83E\uDD89",
            "hibou",
            "animal"
        ],
        [
            "\uD83E\uDD87",
            "chauve-souris",
            "animal"
        ],
        [
            "\uD83D\uDC3A",
            "loup",
            "animal"
        ],
        [
            "\uD83D\uDC17",
            "sanglier",
            "animal"
        ],
        [
            "\uD83D\uDC34",
            "cheval",
            "animal"
        ],
        [
            "\uD83E\uDD84",
            "licorne",
            "animal"
        ],
        [
            "\uD83D\uDC1D",
            "abeille",
            "animal insecte"
        ],
        [
            "\uD83D\uDC1B",
            "chenille",
            "animal insecte"
        ],
        [
            "\uD83E\uDD8B",
            "papillon",
            "animal insecte"
        ],
        [
            "\uD83D\uDC0C",
            "escargot",
            "animal"
        ],
        [
            "\uD83D\uDC1E",
            "coccinelle",
            "animal insecte"
        ],
        [
            "\uD83D\uDC1C",
            "fourmi",
            "animal insecte"
        ],
        [
            "\uD83D\uDD77️",
            "araignee",
            "animal"
        ],
        [
            "\uD83D\uDC22",
            "tortue",
            "animal"
        ],
        [
            "\uD83D\uDC0D",
            "serpent",
            "animal"
        ],
        [
            "\uD83D\uDC19",
            "poulpe",
            "animal"
        ],
        [
            "\uD83E\uDD91",
            "calamar",
            "animal"
        ],
        [
            "\uD83E\uDD80",
            "crabe",
            "animal"
        ],
        [
            "\uD83D\uDC20",
            "poisson",
            "animal mer"
        ],
        [
            "\uD83D\uDC1F",
            "poisson",
            "animal mer"
        ],
        [
            "\uD83D\uDC2C",
            "dauphin",
            "animal mer"
        ],
        [
            "\uD83D\uDC33",
            "baleine",
            "animal mer"
        ],
        [
            "\uD83E\uDD88",
            "requin",
            "animal mer"
        ],
        [
            "\uD83C\uDF38",
            "fleur",
            "animal"
        ],
        [
            "\uD83D\uDC04",
            "vache",
            "animal"
        ],
        [
            "\uD83E\uDD93",
            "zebre",
            "animal"
        ],
        [
            "\uD83E\uDD92",
            "girafe",
            "animal"
        ]
    ],
    food: [
        [
            "\uD83C\uDF4E",
            "pomme",
            "fruit"
        ],
        [
            "\uD83C\uDF50",
            "poire",
            "fruit"
        ],
        [
            "\uD83C\uDF4A",
            "orange",
            "fruit"
        ],
        [
            "\uD83C\uDF4B",
            "citron",
            "fruit"
        ],
        [
            "\uD83C\uDF4C",
            "banane",
            "fruit"
        ],
        [
            "\uD83C\uDF49",
            "past\xe8que",
            "fruit"
        ],
        [
            "\uD83C\uDF47",
            "raisin",
            "fruit"
        ],
        [
            "\uD83C\uDF53",
            "fraise",
            "fruit"
        ],
        [
            "\uD83E\uDED0",
            "myrtille",
            "fruit"
        ],
        [
            "\uD83C\uDF52",
            "cerise",
            "fruit"
        ],
        [
            "\uD83C\uDF51",
            "peche",
            "fruit"
        ],
        [
            "\uD83E\uDD6D",
            "mangue",
            "fruit"
        ],
        [
            "\uD83C\uDF4D",
            "ananas",
            "fruit"
        ],
        [
            "\uD83E\uDD65",
            "noix de coco",
            "fruit"
        ],
        [
            "\uD83E\uDD51",
            "avocat",
            "fruit"
        ],
        [
            "\uD83C\uDF45",
            "tomate",
            "legume"
        ],
        [
            "\uD83E\uDD55",
            "carotte",
            "legume"
        ],
        [
            "\uD83C\uDF3D",
            "mais",
            "legume"
        ],
        [
            "\uD83C\uDF36️",
            "piment",
            "legume"
        ],
        [
            "\uD83E\uDD66",
            "brocoli",
            "legume"
        ],
        [
            "\uD83E\uDDC4",
            "ail",
            "legume"
        ],
        [
            "\uD83C\uDF5E",
            "pain",
            "boulangerie"
        ],
        [
            "\uD83E\uDD50",
            "croissant",
            "boulangerie"
        ],
        [
            "\uD83E\uDD68",
            "pretzel",
            "boulangerie"
        ],
        [
            "\uD83E\uDDC0",
            "fromage",
            "laitier"
        ],
        [
            "\uD83E\uDD5A",
            "oeuf",
            "laitier"
        ],
        [
            "\uD83E\uDD5B",
            "lait",
            "boisson"
        ],
        [
            "☕",
            "cafe",
            "boisson"
        ],
        [
            "\uD83C\uDF75",
            "the",
            "boisson"
        ],
        [
            "\uD83E\uDDC3",
            "jus",
            "boisson"
        ],
        [
            "\uD83E\uDD64",
            "soda",
            "boisson"
        ],
        [
            "\uD83C\uDF7A",
            "biere",
            "boisson"
        ],
        [
            "\uD83C\uDF77",
            "vin",
            "boisson"
        ],
        [
            "\uD83C\uDF78",
            "cocktail",
            "boisson"
        ],
        [
            "\uD83C\uDF70",
            "g\xe2teau",
            "dessert"
        ],
        [
            "\uD83C\uDF82",
            "g\xe2teau anniversaire",
            "dessert"
        ],
        [
            "\uD83C\uDF6A",
            "biscuit",
            "dessert"
        ],
        [
            "\uD83C\uDF6B",
            "chocolat",
            "dessert"
        ],
        [
            "\uD83C\uDF6C",
            "bonbon",
            "dessert"
        ],
        [
            "\uD83C\uDF66",
            "glace",
            "dessert"
        ],
        [
            "\uD83C\uDF69",
            "donut",
            "dessert"
        ],
        [
            "\uD83C\uDF7F",
            "popcorn",
            "cinema"
        ],
        [
            "\uD83E\uDD57",
            "salade",
            "plat"
        ],
        [
            "\uD83C\uDF5D",
            "pates",
            "plat"
        ],
        [
            "\uD83C\uDF63",
            "sushi",
            "plat"
        ],
        [
            "\uD83C\uDF55",
            "pizza",
            "plat"
        ],
        [
            "\uD83C\uDF54",
            "hamburger",
            "fast food"
        ],
        [
            "\uD83C\uDF2E",
            "taco",
            "fast food"
        ],
        [
            "\uD83E\uDD59",
            "kebab",
            "fast food"
        ],
        [
            "\uD83C\uDF5F",
            "frites",
            "fast food"
        ],
        [
            "\uD83C\uDF2F",
            "wrap",
            "fast food"
        ],
        [
            "\uD83E\uDD57",
            "salade",
            "plat"
        ]
    ],
    symbols: [
        [
            "✅",
            "coche verte",
            "oui valid\xe9"
        ],
        [
            "❌",
            "croix rouge",
            "non erreur"
        ],
        [
            "❗",
            "point d’exclamation",
            "attention"
        ],
        [
            "❓",
            "point d’interrogation",
            "question"
        ],
        [
            "⚠️",
            "avertissement",
            "attention"
        ],
        [
            "\uD83D\uDD34",
            "rond rouge",
            "en direct"
        ],
        [
            "\uD83D\uDFE0",
            "rond orange",
            "boule"
        ],
        [
            "\uD83D\uDFE1",
            "rond jaune",
            "boule"
        ],
        [
            "\uD83D\uDFE2",
            "rond vert",
            "boule valide"
        ],
        [
            "\uD83D\uDD35",
            "rond bleu",
            "boule"
        ],
        [
            "\uD83D\uDFE3",
            "rond violet",
            "boule"
        ],
        [
            "⚫",
            "rond noir",
            "boule"
        ],
        [
            "⚪",
            "rond blanc",
            "boule"
        ],
        [
            "\uD83D\uDD3A",
            "triangle rouge",
            "forme"
        ],
        [
            "\uD83D\uDD3B",
            "triangle bas",
            "forme"
        ],
        [
            "\uD83D\uDD38",
            "losange",
            "forme"
        ],
        [
            "\uD83D\uDCA0",
            "losange",
            "forme"
        ],
        [
            "\uD83D\uDD18",
            "bouton radio",
            "forme"
        ],
        [
            "\uD83D\uDD34",
            "boule rouge",
            "forme"
        ],
        [
            "♻️",
            "recyclage",
            "ecologie"
        ],
        [
            "\uD83D\uDD31",
            "trident",
            "divers"
        ],
        [
            "⚜️",
            "fleur de lys",
            "divers"
        ],
        [
            "\uD83D\uDD30",
            "divers",
            "divers"
        ],
        [
            "⚛️",
            "atome",
            "science"
        ],
        [
            "\uD83D\uDD49️",
            "roue dharmique",
            "divers"
        ],
        [
            "✡️",
            "etoile de david",
            "divers"
        ],
        [
            "☯️",
            "yin yang",
            "paix"
        ],
        [
            "☮️",
            "paix",
            "paix"
        ],
        [
            "✝️",
            "croix",
            "religion"
        ],
        [
            "☪️",
            "croix et croissant",
            "religion"
        ],
        [
            "\uD83D\uDD50",
            "horloge",
            "heure"
        ],
        [
            "⌛",
            "sablier",
            "temps"
        ],
        [
            "⏳",
            "sablier",
            "attente"
        ],
        [
            "⏰",
            "reveil",
            "alarme"
        ],
        [
            "\uD83D\uDD14",
            "cloche",
            "notification"
        ],
        [
            "\uD83D\uDD15",
            "cloche barr\xe9e",
            "silence"
        ],
        [
            "\uD83D\uDD07",
            "son coupe",
            "muet"
        ],
        [
            "\uD83D\uDD0A",
            "haut-parleur",
            "son"
        ],
        [
            "\uD83C\uDFB5",
            "note de musique",
            "musique"
        ],
        [
            "\uD83C\uDFB6",
            "notes",
            "musique"
        ],
        [
            "\uD83D\uDCAC",
            "bulle de dialogue",
            "discussion"
        ],
        [
            "\uD83D\uDCAD",
            "bulle de pens\xe9e",
            "pensee"
        ],
        [
            "\uD83D\uDDEF️",
            "bulle de reproche",
            "discussion"
        ],
        [
            "♻",
            "recyclage",
            "ecologie"
        ],
        [
            "\uD83D\uDD17",
            "lien",
            "url"
        ],
        [
            "➕",
            "plus",
            "ajouter"
        ],
        [
            "➖",
            "moins",
            "retirer"
        ],
        [
            "\uD83D\uDD04",
            "rafraichir",
            "recharger"
        ],
        [
            "\uD83D\uDD03",
            "cartes",
            "melanger"
        ]
    ]
};
/* Le catalogue complet, à plat.
 *
 * Les données brutes listent parfois deux fois le même emoji dans une même
 * catégorie (copies accidentelles). On n'en garde qu'une : les mots-clés de
 * la ligne en double sont fusionnés dans la première, pour que la recherche
 * retrouve l'emoji avec les deux noms. Cela évite aussi les clés React en
 * double dans le sélecteur. */ const EMOJIS = (()=>{
    const all = [];
    for (const [category, entries] of Object.entries(RAW_EMOJIS)){
        const byEmoji = new Map();
        for (const [emoji, name, keywords = ""] of entries){
            const existing = byEmoji.get(emoji);
            if (existing) {
                existing.keywords = [
                    existing.keywords,
                    name,
                    keywords
                ].filter(Boolean).join(" ");
                continue;
            }
            const entry = {
                emoji,
                name,
                keywords,
                category: category
            };
            byEmoji.set(emoji, entry);
            all.push(entry);
        }
    }
    return all;
})();
/* Enlève les accents et met en minuscules : la recherche « coeur » trouve
   alors « cœur ». */ function normalizeEmojiSearch(value) {
    return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

// EXTERNAL MODULE: ./src/lib/context/window-context.tsx
var window_context = __webpack_require__(6625);
;// CONCATENATED MODULE: ./src/components/ui/emoji-picker.tsx






/* Clé de stockage des emojis utilisés récemment. */ const RECENT_KEY = "recentEmojis";
/* Nombre d'emojis gardés dans les « récents » : de quoi remplir une ligne
   entière de la grille. */ const MAX_RECENT = 12;
/* Nombre maximum de résultats affichés pour une recherche. */ const MAX_RESULTS = 60;
/* En dessous de cette largeur, c'est une feuille qui remonte du bas. */ const SHEET_WIDTH = 640;
/* Distance de glissement au-delà de laquelle la feuille se referme. */ const DRAG_CLOSE = 80;
function readRecentEmojis() {
    if (true) return [];
    try {
        const raw = window.localStorage.getItem(RECENT_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        /* Les doublons sont retirés : une ancienne version du sélecteur pouvait
       en enregistrer, et deux emojis identiques ne doivent pas partager la
       même clé. */ const seen = new Set();
        return parsed.filter((item)=>{
            if (typeof item !== "string" || seen.has(item)) return false;
            seen.add(item);
            return true;
        });
    } catch  {
        return [];
    }
}
function writeRecentEmojis(emojis) {
    if (true) return;
    try {
        window.localStorage.setItem(RECENT_KEY, JSON.stringify(emojis));
    } catch  {
    /* Stockage indisponible (navigation privée) : on continue sans
       mémoriser les emojis récents. */ }
}
function EmojiButton({ emoji , title , onSelect , onHover  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("button", {
        "aria-label": title ?? emoji,
        className: "flex h-9 w-9 items-center justify-center rounded-lg text-2xl leading-none transition hover:bg-light-secondary/10 active:scale-90 dark:hover:bg-dark-secondary/10",
        onClick: ()=>onSelect(emoji),
        onMouseEnter: ()=>onHover?.(emoji),
        onMouseLeave: ()=>onHover?.(null),
        onFocus: ()=>onHover?.(emoji),
        onBlur: ()=>onHover?.(null),
        title: title,
        type: "button",
        children: emoji
    });
}
/**
 * Sélecteur d'emoji.
 *
 * Il s'appuie sur la fenêtre native du navigateur (API Popover) : le
 * navigateur gère l'affichage dans son calque supérieur, la fermeture au
 * clic dehors, la touche Échap, et l'animation (transitions CSS). Rien
 * n'est calculé en JavaScript pendant l'ouverture, et la page n'est jamais
 * verrouillée : sa barre de défilement ne bouge pas.
 *
 * Sur téléphone, c'est une feuille qui remonte du bas, que l'on peut
 * refermer en la tirant vers le bas. Sur ordinateur, une fenêtre centrée
 * comme les autres : les catégories sont listées à la verticale et le
 * bouton bleu suit la section que l'on est en train de parcourir.
 */ function EmojiPicker({ open , closeModal , onSelect , value , caret  }) {
    const { width  } = (0,window_context/* useWindow */.zY)();
    const panelRef = (0,external_react_.useRef)(null);
    const gridRef = (0,external_react_.useRef)(null);
    const sectionRefs = (0,external_react_.useRef)({});
    const dragRef = (0,external_react_.useRef)(null);
    /* En dessous de cette largeur, c'est une feuille qui remonte du bas. */ const isSheet = width < SHEET_WIDTH;
    const { 0: query , 1: setQuery  } = (0,external_react_.useState)("");
    const { 0: recent , 1: setRecent  } = (0,external_react_.useState)([]);
    const { 0: activeSection , 1: setActiveSection  } = (0,external_react_.useState)("all");
    const { 0: hoveredEmoji , 1: setHoveredEmoji  } = (0,external_react_.useState)(null);
    const { 0: nativePopover , 1: setNativePopover  } = (0,external_react_.useState)(null);
    /* Les navigateurs récents savent faire cette fenêtre eux-mêmes ; sinon on
     retombe sur un simple affichage conditionnel. */ (0,external_react_.useEffect)(()=>{
        setNativePopover(typeof HTMLElement !== "undefined" && typeof HTMLElement.prototype.showPopover === "function");
    }, []);
    /* Ouverture et fermeture de la fenêtre native. L'effet est exécuté avant
     celui qui positionne le menu, pour que la mesure soit faite sur la
     fenêtre déjà affichée (et éviter un clignotement). */ (0,external_react_.useLayoutEffect)(()=>{
        const panel = panelRef.current;
        if (!panel || !nativePopover) return;
        if (open) {
            if (!panel.matches(":popover-open")) {
                /* Le navigateur donne le focus à la fenêtre native qu'il ouvre. Sur
           téléphone, la zone de saisie perd alors le focus : le clavier se
           ferme, la page change de hauteur, et tout clignote. On lui rend
           donc le focus (sans faire défiler la page).

           Sur téléphone, en revanche, on laisse faire : la feuille d'emoji
           est en bas de l'écran, le clavier la recouvrirait. */ const previous = document.activeElement;
                panel.showPopover();
                if (!isSheet && previous && previous !== document.body && document.activeElement === panel) {
                    previous.focus({
                        preventScroll: true
                    });
                }
            }
        } else if (panel.matches(":popover-open")) {
            panel.hidePopover();
        }
    }, [
        open,
        nativePopover,
        isSheet
    ]);
    /* Tant que la fenêtre est ouverte, la page derrière ne défile plus (à la
     molette comme au doigt). La grille, elle, défile normalement. */ (0,external_react_.useEffect)(()=>{
        const panel = panelRef.current;
        if (!panel || !nativePopover) return ()=>undefined;
        const preventScroll = (event)=>{
            if (!panel.matches(":popover-open")) return;
            const target = event.target;
            if (target && panel.contains(target)) return;
            event.preventDefault();
        };
        document.addEventListener("wheel", preventScroll, {
            passive: false
        });
        document.addEventListener("touchmove", preventScroll, {
            passive: false
        });
        return ()=>{
            document.removeEventListener("wheel", preventScroll);
            document.removeEventListener("touchmove", preventScroll);
        };
    }, [
        nativePopover
    ]);
    /* La fenêtre native reste ouverte pendant tout le clic : si elle se
     refermait dès l'appui, le clic suivant viserait la publication (en
     dessous) et la refermerait aussi. La fermeture au clic dehors est donc
     gérée à la main, sur le clic. */ (0,external_react_.useEffect)(()=>{
        const panel = panelRef.current;
        if (!panel || !nativePopover) return ()=>undefined;
        const handleKeyDown = (event)=>{
            if (event.key !== "Escape") return;
            if (!panel.matches(":popover-open")) return;
            /* Échap ne referme que le menu emoji, pas la publication. */ event.preventDefault();
            event.stopPropagation();
            closeModal();
        };
        document.addEventListener("keydown", handleKeyDown, true);
        return ()=>document.removeEventListener("keydown", handleKeyDown, true);
    }, [
        closeModal,
        nativePopover
    ]);
    /* La fermeture au clic dehors (native) doit être remontée au parent. */ (0,external_react_.useEffect)(()=>{
        const panel = panelRef.current;
        if (!panel || !nativePopover) return ()=>undefined;
        const handleToggle = (event)=>{
            const { newState  } = event;
            if (newState === "closed") closeModal();
        };
        panel.addEventListener("toggle", handleToggle);
        return ()=>panel.removeEventListener("toggle", handleToggle);
    }, [
        closeModal,
        nativePopover
    ]);
    /* Le clic qui referme le menu emoji ne doit pas atteindre la
     publication : on l'avale (au cas où le clic atterrirait vraiment à
     côté du fond). */ (0,external_react_.useEffect)(()=>{
        const panel = panelRef.current;
        if (!panel || !nativePopover) return ()=>undefined;
        const handlePointerDown = (event)=>{
            if (!panel.matches(":popover-open")) return;
            const target = event.target;
            if (target && panel.contains(target)) return;
            const swallow = (clickEvent)=>{
                clickEvent.stopPropagation();
                clickEvent.preventDefault();
                document.removeEventListener("click", swallow, true);
                closeModal();
            };
            document.addEventListener("click", swallow, true);
        };
        document.addEventListener("pointerdown", handlePointerDown, true);
        return ()=>document.removeEventListener("pointerdown", handlePointerDown, true);
    }, [
        closeModal,
        nativePopover
    ]);
    /* À chaque ouverture, on repart d'une recherche vide et on relit les
     emojis récemment utilisés. */ (0,external_react_.useEffect)(()=>{
        if (!open) return;
        setQuery("");
        setActiveSection("all");
        setHoveredEmoji(null);
        setRecent(readRecentEmojis());
    }, [
        open
    ]);
    const normalizedQuery = (0,external_react_.useMemo)(()=>normalizeEmojiSearch(query), [
        query
    ]);
    /* Recherche dans tout le catalogue, doublons retirés (un emoji peut
     appartenir à deux catégories). */ const results = (0,external_react_.useMemo)(()=>{
        if (!normalizedQuery) return [];
        const seen = new Set();
        const found = [];
        for (const entry of EMOJIS){
            if (seen.has(entry.emoji)) continue;
            const haystack = normalizeEmojiSearch(`${entry.name} ${entry.keywords} ${entry.category}`);
            if (!haystack.includes(normalizedQuery)) continue;
            seen.add(entry.emoji);
            found.push(entry);
            if (found.length >= MAX_RESULTS) break;
        }
        return found;
    }, [
        normalizedQuery
    ]);
    const entriesByCategory = (0,external_react_.useMemo)(()=>{
        const grouped = {};
        EMOJI_CATEGORIES.forEach(({ id  })=>{
            grouped[id] = EMOJIS.filter((entry)=>entry.category === id);
        });
        return grouped;
    }, []);
    const isSearching = normalizedQuery.length > 0;
    /* Aperçu du message : le texte est coupé au curseur, et l'emoji survolé
     s'y insère comme il le fera. */ const preview = (0,external_react_.useMemo)(()=>{
        const text = value ?? "";
        const position = Math.max(0, Math.min(caret ?? text.length, text.length));
        return {
            before: text.slice(0, position),
            after: text.slice(position)
        };
    }, [
        value,
        caret
    ]);
    /* Le défilement met en bleu la catégorie que l'on est en train de
     parcourir : on sait toujours où l'on se trouve. Les positions sont
     mesurées à l'écran (et non avec `offsetTop`, qui dépend du parent
     positionné). */ const handleScroll = (0,external_react_.useCallback)(()=>{
        const grid = gridRef.current;
        if (!grid) return;
        const gridTop = grid.getBoundingClientRect().top;
        let current = "all";
        EMOJI_CATEGORIES.forEach(({ id  })=>{
            const element = sectionRefs.current[id];
            if (element && element.getBoundingClientRect().top <= gridTop + 16) current = id;
        });
        setActiveSection((previous)=>previous === current ? previous : current);
    }, []);
    /* Un clic sur une catégorie amène à sa section. */ const scrollToSection = (0,external_react_.useCallback)((id)=>{
        const grid = gridRef.current;
        const element = sectionRefs.current[id];
        if (!grid) return;
        if (id === "all") {
            grid.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            return;
        }
        if (!element) return;
        const offset = grid.scrollTop + element.getBoundingClientRect().top - grid.getBoundingClientRect().top;
        grid.scrollTo({
            top: offset - 4,
            behavior: "smooth"
        });
    }, []);
    const handleSelect = (emoji)=>{
        const next = [
            emoji,
            ...recent.filter((item)=>item !== emoji)
        ].slice(0, MAX_RECENT);
        setRecent(next);
        writeRecentEmojis(next);
        onSelect(emoji);
    };
    /* Sur téléphone, la barre du haut permet de faire glisser la feuille vers
     le bas pour la refermer. */ const handleDragStart = (event)=>{
        if (!isSheet) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        dragRef.current = {
            startY: event.clientY,
            distance: 0
        };
    };
    const handleDragMove = (event)=>{
        const drag = dragRef.current;
        const panel = panelRef.current;
        if (!drag || !panel) return;
        const distance = Math.max(0, event.clientY - drag.startY);
        drag.distance = distance;
        panel.style.transform = `translateY(${distance}px)`;
    };
    const handleDragEnd = ()=>{
        const drag = dragRef.current;
        const panel = panelRef.current;
        dragRef.current = null;
        if (!drag || !panel) return;
        panel.style.transform = "";
        if (drag.distance > DRAG_CLOSE) closeModal();
    };
    /* Sans l'API native, on se contente d'afficher ou non la fenêtre. */ if (nativePopover === null) return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {});
    if (!nativePopover && !open) return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {});
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            !nativePopover && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                "aria-hidden": "true",
                className: "fixed inset-0 z-[70] bg-black/40 dark:bg-[#5B7083]/40",
                onClick: closeModal
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                "aria-label": "S\xe9lecteur d’emoji",
                className: external_clsx_default()(/* La fenêtre native reste en position fixe (c'est le navigateur qui
             la place dans son calque supérieur et qui la centre) : la mettre
             dans le flux la ferait repousser le reste de la page.
             Dès que la fenêtre n'est plus une feuille (à partir de 640 px,
             comme le test `isSheet`), elle garde une taille de fenêtre
             classique : sans cela, elle occupait tout l'écran. */ "emoji-picker max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-lg border-t border-light-border bg-main-background shadow-2xl dark:border-dark-border sm:h-[560px] sm:max-h-[85vh] sm:max-w-2xl sm:rounded-lg sm:border", /* Repli sans l'API native : la fenêtre est affichée normalement. */ !nativePopover && "!flex !transform-none !opacity-100"),
                ...nativePopover ? {
                    popover: "manual"
                } : {},
                ref: panelRef,
                role: "dialog",
                /* Un clic sur le fond (au-dessus de la feuille) referme le menu. */ onClick: (event)=>{
                    if (event.target === event.currentTarget) closeModal();
                },
                /* La fenêtre vit dans le calque supérieur du navigateur : on
           empêche le clic de remonter jusqu'à la feuille de publication
           (qui se mettrait à glisser) et la touche Échap de fermer les
           deux fenêtres à la fois. */ onKeyDown: (event)=>{
                    if (event.key === "Escape") event.stopPropagation();
                },
                onPointerDown: (event)=>event.stopPropagation(),
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        "aria-label": "Faire glisser pour fermer le s\xe9lecteur d’emoji",
                        className: "flex w-full shrink-0 touch-none justify-center py-3 sm:hidden",
                        onPointerDown: handleDragStart,
                        onPointerMove: handleDragMove,
                        onPointerUp: handleDragEnd,
                        onPointerCancel: handleDragEnd,
                        type: "button",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: "h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex shrink-0 items-center justify-between gap-3 px-4 py-2.5",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                className: "text-lg font-bold text-light-primary dark:text-dark-primary",
                                children: "Emojis"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                "aria-label": "Fermer le s\xe9lecteur d’emoji",
                                className: "-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-light-secondary transition hover:bg-light-primary/10 dark:text-dark-secondary dark:hover:bg-dark-primary/10",
                                onClick: closeModal,
                                type: "button",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(material_icon/* MaterialIcon */.O, {
                                    className: "h-5 w-5",
                                    iconName: "close"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "shrink-0 px-3 pt-1",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                            className: "relative block",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(material_icon/* MaterialIcon */.O, {
                                    className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-light-secondary dark:text-dark-secondary",
                                    iconName: "search"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                    "aria-label": "Rechercher un emoji",
                                    autoComplete: "off",
                                    className: "w-full rounded-full bg-light-secondary/10 py-2 pl-9 pr-8 text-sm text-light-primary outline-none ring-main-accent focus:ring-2 dark:bg-dark-secondary/10 dark:text-dark-primary",
                                    onChange: (event)=>setQuery(event.target.value),
                                    onKeyDown: (event)=>{
                                        if (event.key === "Escape") closeModal();
                                    },
                                    placeholder: "Rechercher un emoji…",
                                    type: "search",
                                    value: query
                                }),
                                isSearching && /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    "aria-label": "Effacer la recherche",
                                    className: "absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-light-secondary transition hover:bg-light-primary/10 dark:text-dark-secondary dark:hover:bg-dark-primary/10",
                                    onClick: ()=>setQuery(""),
                                    type: "button",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(material_icon/* MaterialIcon */.O, {
                                        className: "h-4 w-4",
                                        iconName: "close"
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "mx-3 mt-2 h-[3.75rem] shrink-0 overflow-hidden rounded-lg border border-light-line-reply bg-main-search-background/40 p-3 dark:border-dark-line-reply",
                        children: preview.before || preview.after || hoveredEmoji ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                            className: "line-clamp-2 whitespace-pre-wrap break-words text-sm leading-6 text-light-primary dark:text-dark-primary",
                            children: [
                                preview.before,
                                hoveredEmoji && /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "bg-main-accent/15 rounded px-0.5",
                                    children: hoveredEmoji
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "inline-block h-4 w-0.5 translate-y-0.5 bg-main-accent"
                                }),
                                preview.after
                            ]
                        }) : /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "text-sm text-light-secondary dark:text-dark-secondary",
                            children: "Votre message appara\xeetra ici."
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex min-h-0 flex-1",
                        children: [
                            !isSheet && !isSearching && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
                                "aria-label": "Cat\xe9gories d’emoji",
                                className: "flex w-32 shrink-0 flex-col items-stretch gap-0.5 overflow-y-auto border-r border-light-border/60 py-2 dark:border-dark-border/60",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(SectionButton, {
                                        active: activeSection === "all",
                                        full: true,
                                        label: "Tout",
                                        onClick: ()=>scrollToSection("all")
                                    }),
                                    EMOJI_CATEGORIES.map(({ id , label  })=>/*#__PURE__*/ jsx_runtime_.jsx(SectionButton, {
                                            active: activeSection === id,
                                            full: true,
                                            label: label,
                                            onClick: ()=>scrollToSection(id)
                                        }, id))
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex min-w-0 flex-1 flex-col",
                                children: [
                                    isSheet && !isSearching && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "flex shrink-0 gap-1 overflow-x-auto px-3 py-2",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(SectionButton, {
                                                active: activeSection === "all",
                                                label: "Tout",
                                                onClick: ()=>scrollToSection("all")
                                            }),
                                            EMOJI_CATEGORIES.map(({ id , label  })=>/*#__PURE__*/ jsx_runtime_.jsx(SectionButton, {
                                                    active: activeSection === id,
                                                    label: label,
                                                    onClick: ()=>scrollToSection(id)
                                                }, id))
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-3",
                                        onScroll: handleScroll,
                                        ref: gridRef,
                                        children: isSearching ? results.length ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "grid grid-cols-8 gap-0.5 sm:grid-cols-10 lg:grid-cols-12",
                                            children: results.map((entry)=>/*#__PURE__*/ jsx_runtime_.jsx(EmojiButton, {
                                                    emoji: entry.emoji,
                                                    onHover: setHoveredEmoji,
                                                    onSelect: handleSelect,
                                                    title: entry.name
                                                }, entry.emoji))
                                        }) : /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: "px-2 py-6 text-center text-sm text-light-secondary dark:text-dark-secondary",
                                            children: "Aucun emoji trouv\xe9."
                                        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                            children: [
                                                recent.length > 0 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                            className: "dark:bg-dark-background/90 sticky top-1 z-10 mb-1 ml-1 inline-block rounded-full bg-main-background/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-light-secondary backdrop-blur dark:text-dark-secondary",
                                                            children: "R\xe9cents"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: "grid grid-cols-8 gap-0.5 sm:grid-cols-10 lg:grid-cols-12",
                                                            children: recent.map((emoji)=>/*#__PURE__*/ jsx_runtime_.jsx(EmojiButton, {
                                                                    emoji: emoji,
                                                                    onHover: setHoveredEmoji,
                                                                    onSelect: handleSelect
                                                                }, emoji))
                                                        })
                                                    ]
                                                }),
                                                EMOJI_CATEGORIES.map(({ id , label  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                                                        ref: (element)=>{
                                                            sectionRefs.current[id] = element;
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                                className: "dark:bg-dark-background/90 sticky top-1 z-10 mb-1 ml-1 inline-block rounded-full bg-main-background/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-light-secondary backdrop-blur dark:text-dark-secondary",
                                                                children: label
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "grid grid-cols-8 gap-0.5 sm:grid-cols-10 lg:grid-cols-12",
                                                                children: entriesByCategory[id].map((entry)=>/*#__PURE__*/ jsx_runtime_.jsx(EmojiButton, {
                                                                        emoji: entry.emoji,
                                                                        onHover: setHoveredEmoji,
                                                                        onSelect: handleSelect,
                                                                        title: entry.name
                                                                    }, entry.emoji))
                                                            })
                                                        ]
                                                    }, id))
                                            ]
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
function SectionButton({ label , active , full =false , onClick  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("button", {
        className: external_clsx_default()("whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-bold transition", full ? "block w-full text-left" : "inline-block", active ? "bg-main-accent/15 text-main-accent" : "text-light-secondary hover:bg-light-secondary/10 dark:text-dark-secondary dark:hover:bg-dark-secondary/10"),
        onClick: onClick,
        type: "button",
        children: label
    });
}


/***/ }),

/***/ 6028:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ Error)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3325);


function Error({ message  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col items-center justify-center gap-2 py-5 px-3 text-light-secondary dark:text-dark-secondary",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_icon__WEBPACK_IMPORTED_MODULE_1__/* .MaterialIcon */ .O, {
                    className: "h-10 w-10",
                    iconName: "warning"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                children: message ?? "Une erreur s’est produite. Essayez de recharger la page."
            })
        ]
    });
}


/***/ }),

/***/ 5122:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ FollowButton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6201);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2108);
/* harmony import */ var _lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3040);
/* harmony import */ var _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7359);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6269);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9099);
/* harmony import */ var _components_modal_action_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9253);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4685);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_2__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_5__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_6__, _components_modal_action_modal__WEBPACK_IMPORTED_MODULE_7__]);
([react_hot_toast__WEBPACK_IMPORTED_MODULE_2__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_5__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_6__, _components_modal_action_modal__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function FollowButton({ userTargetId , userTargetUsername  }) {
    const { user  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__/* .useAuth */ .aC)();
    const { open , openModal , closeModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_4__/* .useModal */ .d)();
    const { 0: pending , 1: setPending  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: followOverride , 1: setFollowOverride  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { id: userId , following  } = user ?? {};
    const authSaysFollowed = !!following?.includes(userTargetId);
    const userIsFollowed = followOverride ?? authSaysFollowed;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (followOverride === authSaysFollowed) setFollowOverride(null);
    }, [
        authSaysFollowed,
        followOverride
    ]);
    if (user?.id === userTargetId) return null;
    const handleFollow = async ()=>{
        if (!userId || pending) return;
        setPending(true);
        setFollowOverride(true);
        try {
            await (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_5__/* .manageFollow */ .gL)("follow", userId, userTargetId);
        } catch  {
            setFollowOverride(null);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_2__.toast.error("Impossible de suivre ce compte. R\xe9essaie.");
        } finally{
            setPending(false);
        }
    };
    const handleUnfollow = async ()=>{
        if (!userId || pending) return;
        setPending(true);
        setFollowOverride(false);
        try {
            await (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_5__/* .manageFollow */ .gL)("unfollow", userId, userTargetId);
            closeModal();
        } catch  {
            setFollowOverride(null);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_2__.toast.error("Impossible de se d\xe9sabonner. R\xe9essaie.");
        } finally{
            setPending(false);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_6__/* .Modal */ .u_, {
                modalClassName: "flex flex-col gap-6 max-w-xs bg-main-background w-full p-8 rounded-2xl",
                open: open,
                closeModal: closeModal,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_action_modal__WEBPACK_IMPORTED_MODULE_7__/* .ActionModal */ .W, {
                    title: `Ne plus suivre @${userTargetUsername} ?`,
                    description: "Ses publications n’appara\xeetront plus dans votre fil d’accueil. Vous pouvez toujours consulter son profil, sauf si ses publications sont prot\xe9g\xe9es.",
                    mainBtnLabel: "Ne plus suivre",
                    secondaryBtnLabel: "Annuler",
                    action: handleUnfollow,
                    closeModal: closeModal
                })
            }),
            userIsFollowed ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                className: "dark-bg-tab relative flex min-w-[140px] self-start justify-center whitespace-nowrap border border-light-line-reply px-4 py-1.5 font-bold transition-colors hover:border-accent-red hover:bg-accent-red hover:text-white dark:border-light-secondary",
                onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_9__/* .preventBubbling */ .Db)(openModal),
                disabled: pending,
                "aria-label": `Ne plus suivre @${userTargetUsername}`,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    children: "Abonn\xe9"
                })
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                className: "self-start border border-main-accent bg-main-accent px-4 py-1.5 font-bold text-white hover:bg-main-accent/90 focus-visible:bg-main-accent/90 active:bg-main-accent/75",
                onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_9__/* .preventBubbling */ .Db)(handleFollow),
                disabled: pending,
                "aria-label": `Suivre @${userTargetUsername}`,
                children: pending ? "En cours…" : "Suivre"
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3276:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ ToolTip)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);


function ToolTip({ tip , modal , className , groupInner  }) {
    if (modal) return null;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(`invisible absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#666666] px-1 py-0.5 text-xs
         text-white opacity-0 [transition:visibility_0ms_ease_200ms,opacity_200ms_ease] dark:bg-[#495A69]`, groupInner ? `group-hover/inner:visible group-hover/inner:opacity-100 group-hover/inner:delay-500 
             group-focus-visible/inner:visible group-focus-visible/inner:opacity-100 group-focus-visible/inner:delay-200` : `group-hover:visible group-hover:opacity-100 group-hover:delay-500 group-focus-visible:visible 
             group-focus-visible:opacity-100`, className ?? "translate-y-3"),
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
            children: tip
        })
    });
}


/***/ }),

/***/ 8800:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": () => (/* binding */ AvatarDecoration)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_avatar_shape__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8829);




/* Décorations d'avatar : l'image est posée autour de la photo, comme les
   décorations Discord. Elle mesure une fois et demie la photo (son centre
   transparent laisse le visage bien visible).
   Le parent doit être positionné (`relative` ou `absolute`). */ function AvatarDecoration({ frame , className  }) {
    const { 0: failed , 1: setFailed  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const src = (0,_lib_avatar_shape__WEBPACK_IMPORTED_MODULE_3__/* .getAvatarFrameDecoration */ .nI)(frame);
    // Image indisponible : on n'affiche simplement rien.
    if (!src || failed) return null;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        "aria-hidden": "true",
        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("pointer-events-none absolute -inset-1/4 z-10 select-none", className),
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
            className: "h-full w-full object-contain",
            src: src,
            alt: "",
            draggable: false,
            onError: ()=>setFailed(true)
        })
    });
}


/***/ }),

/***/ 1708:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ UserAvatar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_media__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8540);
/* harmony import */ var _lib_avatar_shape__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8829);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2108);
/* harmony import */ var _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5655);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_5__, _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_6__]);
([_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_5__, _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







function UserAvatar({ src , alt , size , username , className , gender , shape , frame , statusEmoji  }) {
    const { user: currentUser  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_5__/* .useAuth */ .aC)();
    const { avatarShape: globalShape  } = (0,_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_6__/* .useTheme */ .Fg)();
    const pictureSize = size ?? 48;
    const avatarSrc = (0,_lib_media__WEBPACK_IMPORTED_MODULE_3__/* .getAvatarSrc */ .SJ)(src, gender);
    /* La forme et la bordure choisies dans « Personnalisation » sont
     personnelles : elles ne s'appliquent qu'à notre propre avatar. Les
     autres utilisateurs gardent leur forme (ou un cercle par défaut), même
     si nous avons choisi « ovale avec anneau ». */ const isOwnAvatar = Boolean(username && currentUser?.username === username);
    const selectedShape = shape ?? (isOwnAvatar ? globalShape : undefined) ?? "circle";
    const shapeClass = (0,_lib_avatar_shape__WEBPACK_IMPORTED_MODULE_4__/* .getAvatarShapeClass */ ._M)(selectedShape);
    const frameDecoration = (0,_lib_avatar_shape__WEBPACK_IMPORTED_MODULE_4__/* .getAvatarFrameDecoration */ .nI)(frame);
    const getDefaultAvatar = ()=>{
        if (gender === "femme") return "/Avatar femme.png";
        if (gender === "homme") return "/Avatar homme.png";
        return "/Avatar homme.png";
    };
    const fallbackAvatar = getDefaultAvatar();
    const handleImageError = (event)=>{
        const image = event.currentTarget;
        if (image.dataset.fallback) return;
        image.dataset.fallback = "true";
        image.src = fallbackAvatar;
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: username ? `/user/${username}` : "#",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
            "aria-label": alt,
            className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("blur-picture relative flex self-start transition-transform duration-200 active:scale-95", !username && "pointer-events-none", className),
            tabIndex: username ? 0 : -1,
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                    className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("relative block overflow-hidden bg-main-search-background", shapeClass),
                    style: {
                        width: pictureSize,
                        height: pictureSize,
                        // Always show the default avatar behind the picture, so a person
                        // without a photo (or with a broken one) never gets an empty box.
                        backgroundImage: `url("${fallbackAvatar}")`,
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            className: "user-avatar-img block h-full w-full object-cover",
                            src: avatarSrc,
                            /* `alt` reste vide : une image cassée (anciennes photos stockées
               sur un hébergeur indisponible) ne doit jamais afficher le nom
               ou sa première lettre à la place de la photo. Le nom reste
               annoncé aux lecteurs d'écran via l'`aria-label` du lien. */ alt: "",
                            width: pictureSize,
                            height: pictureSize,
                            onError: handleImageError
                        }),
                        frameDecoration && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            className: "absolute inset-0 h-full w-full object-cover pointer-events-none",
                            src: frameDecoration,
                            alt: "",
                            width: pictureSize,
                            height: pictureSize
                        })
                    ]
                }),
                statusEmoji && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-light-border bg-main-background text-[11px] shadow-sm dark:border-dark-border",
                    title: "Statut",
                    children: statusEmoji
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7238:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* binding */ UserCard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1708);
/* harmony import */ var _components_ui_follow_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5122);
/* harmony import */ var _user_name__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4531);
/* harmony import */ var _user_following__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6154);
/* harmony import */ var _user_username__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7876);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_user_user_avatar__WEBPACK_IMPORTED_MODULE_1__, _components_ui_follow_button__WEBPACK_IMPORTED_MODULE_2__, _user_following__WEBPACK_IMPORTED_MODULE_4__]);
([_components_user_user_avatar__WEBPACK_IMPORTED_MODULE_1__, _components_ui_follow_button__WEBPACK_IMPORTED_MODULE_2__, _user_following__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






function UserCard(user) {
    const { id , bio , name , follow , username , verified , photoURL , gender , avatarShape , avatarFrame  } = user;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "accent-tab grid grid-cols-[auto,1fr] items-center gap-3 px-4 py-2 hover:bg-light-primary/5 dark:hover:bg-dark-primary/5",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_avatar__WEBPACK_IMPORTED_MODULE_1__/* .UserAvatar */ .Y, {
                src: photoURL,
                alt: name,
                username: username,
                gender: gender,
                frame: avatarFrame,
                shape: avatarShape
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col gap-1 truncate xs:overflow-visible",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center justify-between gap-2 truncate xs:overflow-visible",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex flex-col justify-center truncate xs:overflow-visible xs:whitespace-normal",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_user_name__WEBPACK_IMPORTED_MODULE_3__/* .UserName */ .v, {
                                        className: "-mb-1",
                                        name: name,
                                        username: username,
                                        verified: verified
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex items-center gap-1 text-light-secondary dark:text-dark-secondary",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_user_username__WEBPACK_IMPORTED_MODULE_5__/* .UserUsername */ .a, {
                                                username: username
                                            }),
                                            follow && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_user_following__WEBPACK_IMPORTED_MODULE_4__/* .UserFollowing */ .y, {
                                                userTargetId: id
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_follow_button__WEBPACK_IMPORTED_MODULE_2__/* .FollowButton */ .e, {
                                userTargetId: id,
                                userTargetUsername: username
                            })
                        ]
                    }),
                    follow && bio && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "whitespace-normal",
                        children: bio
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6154:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ UserFollowing)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2108);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_1__]);
_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function UserFollowing({ userTargetId  }) {
    const { user  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_1__/* .useAuth */ .aC)();
    const followers = user?.followers;
    const isOwner = user?.id !== userTargetId && Array.isArray(followers) && followers.includes(userTargetId);
    if (!isOwner) return null;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
        className: "rounded bg-main-search-background px-1 text-xs",
        children: "Vous suit"
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4531:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v": () => (/* binding */ UserName)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3325);




function UserName({ tag , name , verified , username , className , iconClassName  }) {
    const CustomTag = tag ? tag : "p";
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
        href: username ? `/user/${username}` : "#",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
            className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("flex items-center gap-1 truncate font-bold", username ? "custom-underline" : "pointer-events-none", className),
            tabIndex: username ? 0 : -1,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CustomTag, {
                    className: "truncate",
                    children: name
                }),
                verified && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("text-main-accent", iconClassName ?? "h-5 w-5"),
                        iconName: "verified",
                        solid: true
                    })
                })
            ]
        })
    });
}


/***/ }),

/***/ 7876:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ UserUsername)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);



function UserUsername({ username , className , disableLink  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: `/user/${username}`,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
            className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("truncate text-light-secondary dark:text-dark-secondary", className, disableLink && "pointer-events-none"),
            tabIndex: -1,
            children: [
                "@",
                username
            ]
        })
    });
}


/***/ }),

/***/ 9476:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ useTrends)
/* harmony export */ });
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5941);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_0__]);
swr__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

function useTrends(id, limit, config) {
    const { data , error  } = (0,swr__WEBPACK_IMPORTED_MODULE_0__["default"])(`/api/trends/place/${id}${limit ? `?limit=${limit}` : ""}`, config);
    if (data && "errors" in data) return {
        data: undefined,
        loading: false,
        error: new Error("Sorry we could not find any trends for this place")
    };
    return {
        data,
        error: error,
        loading: !error && !data
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1945:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ startVoiceCapture),
/* harmony export */   "X": () => (/* binding */ unlockVoiceAudio)
/* harmony export */ });
/* harmony import */ var _lib_audio_voice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(913);
/**
 * Capture du microphone pour les messages vocaux.
 *
 * On enregistre les échantillons PCM avec la Web Audio API plutôt qu'avec
 * `MediaRecorder`. Le fichier produit par ce dernier (webm sur Chrome/Firefox,
 * mp4 sur Safari/iOS) n'est pas toujours décodable par `decodeAudioData`, ce
 * qui empêchait l'envoi du message sur plusieurs navigateurs — iOS/Safari en
 * particulier.
 *
 * `AudioWorklet` est utilisé quand il est disponible (pas de perte de son même
 * si l'interface travaille) ; `ScriptProcessorNode` sert de repli pour les
 * navigateurs plus anciens.
 */ 
const WORKLET_URL = "/vendor/voice-worklet.js";
const WORKLET_NAME = "voice-capture";
/* Le module n'est chargé qu'une fois par contexte : certains navigateurs
   refusent d'enregistrer deux fois le même processeur. */ const workletReady = new WeakMap();
function loadWorklet(context) {
    const existing = workletReady.get(context);
    if (existing) return existing;
    const loading = context.audioWorklet.addModule(WORKLET_URL).catch((error)=>{
        workletReady.delete(context);
        throw error;
    });
    workletReady.set(context, loading);
    return loading;
}
function getAudioContextConstructor() {
    if (true) return null;
    const scope = window;
    return window.AudioContext ?? scope.webkitAudioContext ?? null;
}
/*
 * Un seul contexte audio est conservé pour toute la page. Sur iOS/Safari, un
 * contexte créé hors d'un geste utilisateur reste suspendu : on le débloque
 * donc dès le clic sur le bouton micro (`unlockVoiceAudio`), puis on le
 * réutilise pour l'enregistrement.
 */ let sharedContext = null;
/**
 * Crée (ou réveille) le contexte audio pendant un geste utilisateur.
 *
 * À appeler directement dans le `onClick` du bouton d'enregistrement, avant
 * toute opération asynchrone, sinon iOS bloque la capture.
 */ function unlockVoiceAudio() {
    const AudioContextClass = getAudioContextConstructor();
    if (!AudioContextClass) return;
    try {
        if (!sharedContext || sharedContext.state === "closed") sharedContext = new AudioContextClass();
        if (sharedContext.state === "suspended") void sharedContext.resume().catch(()=>undefined);
    } catch  {
        sharedContext = null;
    }
}
async function startWorkletCapture(context, source, onChunk) {
    if (!context.audioWorklet || typeof AudioWorkletNode === "undefined") throw new Error("worklet-unavailable");
    await loadWorklet(context);
    const node = new AudioWorkletNode(context, WORKLET_NAME, {
        numberOfInputs: 1,
        numberOfOutputs: 1,
        channelCount: 1,
        channelCountMode: "explicit",
        channelInterpretation: "speakers"
    });
    const mute = context.createGain();
    mute.gain.value = 0;
    node.port.onmessage = (event)=>{
        const data = event.data;
        if (data instanceof Float32Array && data.length > 0) onChunk(data);
    };
    try {
        source.connect(node);
        node.connect(mute);
        mute.connect(context.destination);
    } catch (error) {
        try {
            node.port.onmessage = null;
            node.disconnect();
            mute.disconnect();
            source.disconnect();
        } catch  {
        /* Les nœuds déjà déconnectés n'ont rien à faire. */ }
        throw error;
    }
    return {
        node,
        mute
    };
}
/**
 * Démarre la capture d'un flux micro.
 *
 * Le flux doit provenir de `getUserMedia({ audio: true })`. L'appelant reste
 * responsable de l'arrêt des pistes du flux.
 */ async function startVoiceCapture(stream) {
    const AudioContextClass = getAudioContextConstructor();
    if (!AudioContextClass) throw new Error("audio-context-unavailable");
    if (!sharedContext || sharedContext.state === "closed") sharedContext = new AudioContextClass();
    const context = sharedContext;
    if (context.state === "suspended") await context.resume();
    const source = context.createMediaStreamSource(stream);
    const chunks = [];
    let stopped = false;
    let stopping = false;
    const collect = (chunk)=>{
        if (!stopped) chunks.push(chunk);
    };
    let worklet = null;
    try {
        worklet = await startWorkletCapture(context, source, collect);
    } catch  {
        worklet = null;
    }
    let processor = null;
    let mute = null;
    if (!worklet) {
        /* Repli pour les navigateurs sans AudioWorklet. Le nœud doit être relié à
       la sortie pour être appelé ; le gain nul évite tout retour du micro. */ processor = context.createScriptProcessor(4096, 1, 1);
        processor.onaudioprocess = (event)=>{
            collect(new Float32Array(event.inputBuffer.getChannelData(0)));
        };
        mute = context.createGain();
        mute.gain.value = 0;
        source.connect(processor);
        processor.connect(mute);
        mute.connect(context.destination);
    }
    const cleanup = ()=>{
        if (worklet) {
            try {
                worklet.node.port.onmessage = null;
                worklet.node.port.postMessage("close");
                worklet.node.disconnect();
                worklet.mute.disconnect();
            } catch  {
            /* Déjà déconnecté. */ }
        }
        if (processor) {
            processor.onaudioprocess = null;
            processor.disconnect();
        }
        mute?.disconnect();
        source.disconnect();
    };
    const flushWorklet = ()=>new Promise((resolve)=>{
            if (!worklet) return resolve();
            const node = worklet.node;
            const timeout = setTimeout(done, 400);
            function done() {
                clearTimeout(timeout);
                node.port.onmessage = null;
                resolve();
            }
            node.port.onmessage = (event)=>{
                const data = event.data;
                if (data === "flushed") done();
                else if (data instanceof Float32Array && data.length > 0) collect(data);
            };
            node.port.postMessage("flush");
        });
    const stop = async ()=>{
        if (stopped || stopping) return null;
        stopping = true;
        /* On récupère d'abord le dernier paquet en attente dans le worklet : il ne
       doit pas être ignoré comme le reste pendant l'arrêt. */ await flushWorklet();
        stopped = true;
        cleanup();
        let total = 0;
        for (const chunk of chunks)total += chunk.length;
        if (!total) return null;
        const samples = new Float32Array(total);
        let offset = 0;
        for (const chunk1 of chunks){
            samples.set(chunk1, offset);
            offset += chunk1.length;
        }
        chunks.length = 0;
        return (0,_lib_audio_voice__WEBPACK_IMPORTED_MODULE_0__/* .encodePcmVoiceNote */ .Rb)(samples, context.sampleRate);
    };
    const cancel = ()=>{
        if (stopped) return;
        stopping = true;
        stopped = true;
        cleanup();
        chunks.length = 0;
    };
    return {
        stop,
        cancel
    };
}


/***/ }),

/***/ 913:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rb": () => (/* binding */ encodePcmVoiceNote),
/* harmony export */   "hr": () => (/* binding */ MAX_RECORD_SECONDS),
/* harmony export */   "w8": () => (/* binding */ blobToBase64)
/* harmony export */ });
/* unused harmony exports MP3_SAMPLE_RATE, MP3_BITRATE */
/**
 * Encodage des messages vocaux.
 *
 * Ce module est partagé par la messagerie et la barre de publication : les
 * deux offrent le même micro, la même conversion en MP3 et les mêmes limites.
 */ /** Durée maximale d'un enregistrement. */ const MAX_RECORD_SECONDS = 120;
/*
 * Le message vocal est converti en MP3 : c'est le seul format à la fois lu par
 * Safari, Chrome, Firefox et Android, et bien plus léger qu'un WAV — ce qui
 * compte pour un fichier envoyé en base64 dans une requête.
 */ const MP3_SAMPLE_RATE = 22050;
const MP3_BITRATE = 48;
/* L'encodeur travaille par blocs de taille fixe. */ const MP3_BLOCK_SIZE = 1152;
/** Convertit un échantillon flottant en entier 16 bits, comme l'attend LAME. */ function toInt16(sample) {
    const clamped = Math.max(-1, Math.min(1, sample));
    return clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
}
/**
 * Produit un WAV mono 16 bits.
 *
 * Secours quand l'encodeur MP3 ne peut pas être chargé (script bloqué, navigateur
 * très ancien) : un WAV est plus lourd, mais il est lu par tous les appareils.
 */ function encodeWav(pcm, sampleRate) {
    const buffer = new ArrayBuffer(44 + pcm.length * 2);
    const view = new DataView(buffer);
    const writeString = (offset, value)=>{
        for(let index = 0; index < value.length; index++)view.setUint8(offset + index, value.charCodeAt(index));
    };
    writeString(0, "RIFF");
    view.setUint32(4, 36 + pcm.length * 2, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, pcm.length * 2, true);
    new Int16Array(buffer, 44).set(pcm);
    return new Blob([
        buffer
    ], {
        type: "audio/wav"
    });
}
/**
 * Convertit des échantillons PCM (mono, flottants) en message vocal.
 *
 * On encode directement le son capturé par le micro au lieu de décoder le
 * fichier produit par `MediaRecorder` : selon le navigateur (Safari et iOS en
 * particulier), ce fichier mp4/webm n'est pas décodable par `decodeAudioData`
 * alors qu'il est parfaitement lisible dans une balise `<audio>`. C'est ce qui
 * provoquait « Ce navigateur ne permet pas d'enregistrer un message vocal. »
 *
 * L'encodage MP3 se fait par blocs entrecoupés d'un temps d'attente : sur un
 * long message, cela évite de figer l'interface pendant plusieurs secondes.
 * Si l'encodeur MP3 est indisponible, on renvoie un WAV : plus lourd, mais
 * lisible partout.
 *
 * Renvoie `null` si aucun échantillon exploitable n'a été capturé.
 */ async function encodePcmVoiceNote(samples, sourceRate) {
    if (!samples.length || !Number.isFinite(sourceRate) || sourceRate <= 0) return null;
    const duration = samples.length / sourceRate;
    if (!Number.isFinite(duration) || duration <= 0) return null;
    /* Ré-échantillonne à la fréquence du MP3, avec une interpolation linéaire
     pour ne pas ajouter de bruit sur les aigus. */ const length = Math.max(1, Math.ceil(duration * MP3_SAMPLE_RATE));
    const pcm = new Int16Array(length);
    for(let index = 0; index < length; index++){
        const position = index / MP3_SAMPLE_RATE * sourceRate;
        const current = Math.min(samples.length - 1, Math.floor(position));
        const next = Math.min(samples.length - 1, current + 1);
        const fraction = position - current;
        const value = samples[current] * (1 - fraction) + samples[next] * fraction;
        pcm[index] = toInt16(value);
    }
    try {
        /* `encodeBuffer` attend un Int16Array : on découpe donc les échantillons en
       sous-chaînes de taille fixe avant d'encoder. */ const blocks = [];
        for(let offset = 0; offset < pcm.length; offset += MP3_BLOCK_SIZE)blocks.push(pcm.subarray(offset, offset + MP3_BLOCK_SIZE));
        const { getMp3Encoder  } = await __webpack_require__.e(/* import() */ 3743).then(__webpack_require__.bind(__webpack_require__, 3743));
        const Mp3Encoder = await getMp3Encoder();
        const encoder = new Mp3Encoder(1, MP3_SAMPLE_RATE, MP3_BITRATE);
        const chunks = [];
        for(let index1 = 0; index1 < blocks.length; index1++){
            const encoded = encoder.encodeBuffer(blocks[index1]);
            /* Un bloc ignoré renvoie un tableau vide : inutile de le stocker. */ if (encoded.length > 0) chunks.push(encoded);
            /* On rend la main au navigateur entre les blocs. */ if (index1 % 16 === 0) await new Promise((resolve)=>setTimeout(resolve, 0));
        }
        const flushed = encoder.flush();
        if (flushed.length > 0) chunks.push(flushed);
        if (chunks.length === 0) throw new Error("mp3-empty");
        return {
            blob: new Blob(chunks, {
                type: "audio/mpeg"
            }),
            duration,
            mimeType: "audio/mpeg",
            extension: "mp3"
        };
    } catch  {
        /* L'encodeur MP3 n'a pas pu être chargé : un WAV reste préférable à un
       message vocal impossible à envoyer. */ return {
            blob: encodeWav(pcm, MP3_SAMPLE_RATE),
            duration,
            mimeType: "audio/wav",
            extension: "wav"
        };
    }
}
/** Convertit un fichier en base64, sans le préfixe data URL. */ function blobToBase64(blob) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onloadend = ()=>{
            const result = typeof reader.result === "string" ? reader.result : "";
            resolve(result.replace(/^data:[^;]+;base64,/, ""));
        };
        reader.onerror = ()=>reject(new Error("read-error"));
        reader.readAsDataURL(blob);
    });
}


/***/ }),

/***/ 6625:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "En": () => (/* binding */ WindowContextProvider),
/* harmony export */   "zY": () => (/* binding */ useWindow)
/* harmony export */ });
/* unused harmony export WindowContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const WindowContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
function WindowContextProvider({ children  }) {
    const { 0: windowSize , 1: setWindowSize  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>({
            width:  false ? 0 : 1200,
            height:  false ? 0 : 800
        }));
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleResize = ()=>setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        window.addEventListener("resize", handleResize);
        return ()=>window.removeEventListener("resize", handleResize);
    }, []);
    const value = {
        ...windowSize,
        isMobile: windowSize.width < 500,
        isTwoPane: windowSize.width >= 768
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(WindowContext.Provider, {
        value: value,
        children: children
    });
}
function useWindow() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(WindowContext);
    if (!context) throw new Error("useWindow must be used within an WindowContextProvider");
    return context;
}


/***/ }),

/***/ 1944:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XC": () => (/* binding */ formatChatTime),
/* harmony export */   "p6": () => (/* binding */ formatDate),
/* harmony export */   "uf": () => (/* binding */ formatNumber)
/* harmony export */ });
const RELATIVE_TIME_FORMATTER = new Intl.RelativeTimeFormat("fr-FR", {
    style: "short",
    numeric: "auto"
});
const UNITS = {
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000
};
function formatDate(targetDate, mode) {
    const date = targetDate.toDate();
    if (mode === "full") return getFullTime(date);
    if (mode === "tweet") return getPostTime(date);
    if (mode === "joined") return getJoinedTime(date);
    return getShortTime(date);
}
function formatNumber(number) {
    return new Intl.NumberFormat("fr-FR", {
        notation: number > 10000 ? "compact" : "standard",
        maximumFractionDigits: 1
    }).format(number);
}
/** Heure courte d'une conversation, à partir d'un horodatage en millisecondes
 *  (comme les messages de la messagerie). */ function formatChatTime(timestamp) {
    const date = new Date(timestamp);
    if (isToday(date)) return date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit"
    });
    if (isYesterday(date)) return "Hier";
    return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "numeric",
        year: isCurrentYear(date) ? undefined : "2-digit"
    }).format(date);
}
function getFullTime(date) {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }).format(date);
}
function getPostTime(date) {
    if (isToday(date)) return getRelativeTime(date);
    if (isYesterday(date)) return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "short"
    }).format(date);
    return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "short",
        year: isCurrentYear(date) ? undefined : "numeric"
    }).format(date);
}
function getJoinedTime(date) {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }).format(date);
}
function getShortTime(date) {
    const isNear = isToday(date) ? "today" : isYesterday(date) ? "yesterday" : null;
    if (!isNear) return getFullTime(date);
    const dayLabel = isNear === "today" ? "Aujourd’hui" : "Hier";
    const time = date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit"
    });
    return `${dayLabel} à ${time}`;
}
function getRelativeTime(date) {
    const relativeTime = calculateRelativeTime(date);
    if (relativeTime === "now") return "\xe0 l’instant";
    return relativeTime;
}
function calculateRelativeTime(date) {
    const elapsed = +date - +new Date();
    if (elapsed > 0) return "now";
    const unitsItems = Object.entries(UNITS);
    for (const [unit, millis] of unitsItems)if (Math.abs(elapsed) > millis) return RELATIVE_TIME_FORMATTER.format(Math.round(elapsed / millis), unit);
    return RELATIVE_TIME_FORMATTER.format(Math.round(elapsed / 1000), "second");
}
function isToday(date) {
    return new Date().toDateString() === date.toDateString();
}
function isYesterday(date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toDateString() === date.toDateString();
}
function isCurrentYear(date) {
    return date.getFullYear() === new Date().getFullYear();
}


/***/ }),

/***/ 7000:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ fetchJSON)
/* harmony export */ });
async function fetchJSON(resource, init) {
    const response = await fetch(resource, init);
    const data = await response.json();
    return data;
}


/***/ }),

/***/ 9969:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R7": () => (/* binding */ markConversationAsRead),
/* harmony export */   "SQ": () => (/* binding */ getChatOwnerId),
/* harmony export */   "T2": () => (/* binding */ getConversationOwnerId),
/* harmony export */   "TP": () => (/* binding */ sendGroupMessage),
/* harmony export */   "Zc": () => (/* binding */ isConversationUnread),
/* harmony export */   "bG": () => (/* binding */ sendMessage),
/* harmony export */   "c": () => (/* binding */ voteOnMessagePoll),
/* harmony export */   "fx": () => (/* binding */ createGroupConversation),
/* harmony export */   "tN": () => (/* binding */ getChatId)
/* harmony export */ });
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1492);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1636);
/* harmony import */ var _collections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5342);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_0__, _app__WEBPACK_IMPORTED_MODULE_1__, _collections__WEBPACK_IMPORTED_MODULE_2__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_0__, _app__WEBPACK_IMPORTED_MODULE_1__, _collections__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



/**
 * Conversations are stored under a deterministic id built from both user ids
 * so that both participants always point to the same document.
 */ function getChatId(firstId, secondId) {
    return [
        firstId,
        secondId
    ].sort().join("_");
}
/**
 * The two users share the same conversation document. It lives in the
 * subtree of the first id (alphabetically) so that no extra Firestore rule
 * is required to let both people read and write it.
 */ function getChatOwnerId(firstId, secondId) {
    return [
        firstId,
        secondId
    ].sort()[0];
}
/**
 * Une conversation est non lue quand son dernier message vient de quelqu'un
 * d'autre et qu'il est plus récent que la dernière ouverture de la discussion.
 * C'est la seule règle utilisée pour les badges (barre latérale et liste).
 */ function isConversationUnread(conversation, userId) {
    const lastMessage = conversation.lastMessage;
    if (!lastMessage || lastMessage.createdBy === userId) return false;
    return lastMessage.createdAt > (conversation.lastReadAt?.[userId] ?? 0);
}
/**
 * Enregistre la dernière lecture d'une conversation.
 *
 * Chaque participant possède sa propre copie de la conversation : la marque
 * doit donc être écrite dans la sienne. L'écrire dans la copie de l'autre
 * personne n'aurait aucun effet sur son badge.
 */ /**
 * Enregistre le vote d'une personne sur un sondage de message.
 *
 * Le message peut être publié par l'un ou l'autre participant : on vise donc
 * toujours le document de messages du propriétaire de la conversation, puis on
 * n'écrit que la clé de ce votant.
 */ async function voteOnMessagePoll({ ownerId , chatId , messageId , userId , choices , voter  }) {
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_2__/* .conversationMessagesCollection */ .WN)(ownerId, chatId), messageId), {
        /* Une liste vide supprime la clé du votant : c'est ce qui permet de
         décocher une case, puis de revoter dans une autre. */ [`pollVotes.${userId}`]: choices.length ? {
            ...voter,
            choices
        } : (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.deleteField)()
    });
}
async function markConversationAsRead(userId, conversationId) {
    try {
        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_2__/* .userConversationsCollection */ .HA)(userId), conversationId), {
            [`lastReadAt.${userId}`]: Date.now()
        });
    } catch  {
    /* La conversation n'existe pas encore dans la boîte de réception :
       il n'y a alors aucun badge à retirer. */ }
}
async function sendMessage({ senderId , recipientId , text , audioURL , audioDuration , imageURL , poll , location , linkPreview  }) {
    const chatId = getChatId(senderId, recipientId);
    const ownerId = getChatOwnerId(senderId, recipientId);
    const participants = [
        senderId,
        recipientId
    ].sort();
    const now = Date.now();
    const messageRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_2__/* .conversationMessagesCollection */ .WN)(ownerId, chatId));
    const message = {
        id: messageRef.id,
        text: text ?? null,
        audioURL: audioURL ?? null,
        audioDuration: audioDuration ?? null,
        imageURL: imageURL ?? null,
        poll: poll ?? null,
        /* Le sondage démarre vierge : chaque participant votera de son côté. */ pollVotes: poll ? {} : null,
        location: location ?? null,
        linkPreview: linkPreview ?? null,
        createdBy: senderId,
        createdAt: now
    };
    const batch = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.writeBatch)(_app__WEBPACK_IMPORTED_MODULE_1__.db);
    batch.set(messageRef, message);
    /* La conversation est copiée dans la boîte de réception des deux
     participants : chacun voit donc le dernier message arriver en temps réel,
     sans ouvrir la conversation ni actualiser la page. */ const conversationData = {
        id: chatId,
        participants,
        updatedAt: now,
        lastMessage: {
            text: text ?? null,
            hasAudio: Boolean(audioURL),
            createdBy: senderId,
            createdAt: now
        }
    };
    const otherId = senderId === ownerId ? recipientId : senderId;
    batch.set((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_2__/* .userConversationsCollection */ .HA)(ownerId), chatId), conversationData, {
        merge: true
    });
    if (otherId !== ownerId) batch.set((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_2__/* .userConversationsCollection */ .HA)(otherId), chatId), conversationData, {
        merge: true
    });
    // Keep the conversation in both inboxes, most recently active first.
    batch.set((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_2__/* .userContactsCollection */ .mk)(senderId), recipientId), {
        id: recipientId,
        addedAt: now
    }, {
        merge: true
    });
    batch.set((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_2__/* .userContactsCollection */ .mk)(recipientId), senderId), {
        id: senderId,
        addedAt: now
    }, {
        merge: true
    });
    await batch.commit();
}
/**
 * Même logique que pour un duo : le document (et les messages) vivent dans le
 * sous-arbre du premier identifiant par ordre alphabétique, ce qui donne un
 * chemin identique pour tous les membres du groupe.
 */ function getConversationOwnerId(participants) {
    return [
        ...participants
    ].sort()[0];
}
/** Crée un groupe et le dépose dans la boîte de réception de chaque membre. */ async function createGroupConversation({ creatorId , memberIds , name , photoURL , description  }) {
    const participants = Array.from(new Set([
        creatorId,
        ...memberIds
    ])).sort();
    const conversationRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_2__/* .userConversationsCollection */ .HA)(creatorId));
    const now = Date.now();
    const conversation = {
        id: conversationRef.id,
        participants,
        updatedAt: now,
        lastMessage: null,
        type: "group",
        name: name.trim(),
        photoURL: photoURL ?? null,
        description: description?.trim() || null,
        createdBy: creatorId
    };
    const batch = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.writeBatch)(_app__WEBPACK_IMPORTED_MODULE_1__.db);
    participants.forEach((participantId)=>{
        batch.set((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_2__/* .userConversationsCollection */ .HA)(participantId), conversation.id), conversation);
    });
    await batch.commit();
    return conversation;
}
/** Envoie un message dans un groupe (texte, vocal, image, sondage, lieu). */ async function sendGroupMessage({ senderId , conversation , text , audioURL , audioDuration , imageURL , poll , location , linkPreview  }) {
    const ownerId = getConversationOwnerId(conversation.participants);
    const now = Date.now();
    const messageRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_2__/* .conversationMessagesCollection */ .WN)(ownerId, conversation.id));
    const message = {
        id: messageRef.id,
        text: text ?? null,
        audioURL: audioURL ?? null,
        audioDuration: audioDuration ?? null,
        imageURL: imageURL ?? null,
        poll: poll ?? null,
        pollVotes: poll ? {} : null,
        location: location ?? null,
        linkPreview: linkPreview ?? null,
        createdBy: senderId,
        createdAt: now
    };
    const batch = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.writeBatch)(_app__WEBPACK_IMPORTED_MODULE_1__.db);
    batch.set(messageRef, message);
    // Le groupe reste dans la boîte de réception de chaque membre.
    conversation.participants.forEach((participantId)=>{
        /* `lastReadAt` est propre à chaque participant : on ne le recopie pas,
       sinon la marque de lecture d'un membre écraserait celle des autres. */ // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { lastReadAt , ...sharedConversation } = conversation;
        batch.set((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_2__/* .userConversationsCollection */ .HA)(participantId), conversation.id), {
            ...sharedConversation,
            updatedAt: now,
            lastMessage: {
                text: text ?? null,
                hasAudio: Boolean(audioURL),
                createdBy: senderId,
                createdAt: now
            }
        }, {
            merge: true
        });
    });
    await batch.commit();
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9494:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S4": () => (/* binding */ getCachedUser),
/* harmony export */   "p_": () => (/* binding */ loadUsers),
/* harmony export */   "yV": () => (/* binding */ saveAiSettings)
/* harmony export */ });
/* unused harmony export clearUsersCache */
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1492);
/* harmony import */ var _collections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5342);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_0__, _collections__WEBPACK_IMPORTED_MODULE_1__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_0__, _collections__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


/* Durée de validité d'un profil en cache (en ms). */ const USER_CACHE_TTL = 60000;
/**
 * Cache des profils.
 *
 * Les profils étaient relus à chaque instantané de la collection (une
 * lecture par publication), puis toute la liste était reconstruite : la page
 * scrollait, la liste clignotait, et le quota Firestore partait très vite.
 * Le cache évite les lectures inutiles et garde les objets stables.
 */ const usersCache = new Map();
/** Charge les profils manquants (ou périmés). */ async function loadUsers(ids) {
    const now = Date.now();
    const missing = ids.filter((id)=>{
        if (!id) return false;
        const cached = usersCache.get(id);
        return !cached || now - cached.at > USER_CACHE_TTL;
    });
    if (!missing.length) return;
    await Promise.all(missing.map(async (id)=>{
        try {
            const user = (await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.getDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_1__/* .usersCollection */ .W$, id))).data();
            if (user) usersCache.set(id, {
                user,
                at: Date.now()
            });
        } catch  {
        /* Profil introuvable ou lecture impossible : la publication est
           affichée sans les informations de son auteur. */ }
    }));
}
/** Profil en cache (sans le recharger). */ function getCachedUser(id) {
    return usersCache.get(id)?.user;
}
/** Vide le cache (déconnexion, changement de compte). */ function clearUsersCache() {
    usersCache.clear();
}
/**
 * Enregistre les réglages d'intelligence artificielle de la personne.
 *
 * Ils sont rangés dans son propre profil : ils ne sont donc visibles que par
 * elle, et elle peut les modifier ou les effacer à tout moment.
 */ async function saveAiSettings(userId, settings) {
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_1__/* .usersCollection */ .W$, userId), {
        aiSettings: settings,
        updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
    });
    /* Le profil est peut-être en cache : on le remplace pour que la nouvelle
     version soit prise en compte immédiatement. */ const cached = usersCache.get(userId);
    if (cached) usersCache.set(userId, {
        user: {
            ...cached.user,
            aiSettings: settings
        },
        at: cached.at
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2322:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": () => (/* binding */ useArrayDocument)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5342);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_2__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



function useArrayDocument(docsId, collection, options) {
    const { 0: data , 1: setData  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const cachedDocsId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>docsId, [
        docsId
    ]);
    const { includeUser , disabled  } = options ?? {};
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (disabled) {
            setLoading(false);
            return;
        }
        if (includeUser && !data) setLoading(true);
        const populateUser = async (currentData)=>{
            const dataWithUser = await Promise.all(currentData.map(async (currentData)=>{
                const user = (await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_2__/* .usersCollection */ .W$, currentData.createdBy))).data();
                return {
                    ...currentData,
                    user
                };
            }));
            setData(dataWithUser);
            setLoading(false);
        };
        const fetchData = async ()=>{
            try {
                const docsSnapshot = await Promise.all(cachedDocsId.map((id)=>(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(collection, id))));
                const docs = docsSnapshot.filter((doc)=>doc.exists()).map((doc)=>doc.data({
                        serverTimestamps: "estimate"
                    }));
                if (!docs.length) {
                    setData(null);
                    setLoading(false);
                    return;
                }
                if (includeUser) void populateUser(docs);
                else {
                    setData(docs);
                    setLoading(false);
                }
            } catch  {
                setData(null);
                setLoading(false);
            }
        };
        void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        cachedDocsId,
        disabled
    ]);
    return {
        data,
        loading
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5651:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ useCacheQuery)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_1__]);
firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function useCacheQuery(query) {
    const { 0: cachedQuery , 1: setCachedQuery  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(query);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.queryEqual)(query, cachedQuery)) setCachedQuery(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        query
    ]);
    return cachedQuery;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3639:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ useCollection)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
/* harmony import */ var _lib_firebase_users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9494);
/* harmony import */ var _useCacheQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5651);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, _lib_firebase_users__WEBPACK_IMPORTED_MODULE_2__, _useCacheQuery__WEBPACK_IMPORTED_MODULE_3__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, _lib_firebase_users__WEBPACK_IMPORTED_MODULE_2__, _useCacheQuery__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




function useCollection(query, options) {
    const { 0: data , 1: setData  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const { 0: fromCache , 1: setFromCache  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    /* La liste a-t-elle déjà été remplie ? Un instantané vide ne vide alors
     plus la liste : c'est ce qui se passe quand la requête change (la
     liste s'agrandit au défilement) et que le cache local n'a pas encore
     la réponse. Vider la liste à cet instant fait-collapse la page : le
     contenu se réduit, le navigateur revient en haut, et la liste revient
     en fondu — un écran blanc à chaque défilement. */ const filled = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    /* Numéro du dernier instantané reçu : sert à ne publier que le plus
     récent (les profils étant chargés de façon asynchrone). */ const latestSnapshot = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
    const cachedQuery = (0,_useCacheQuery__WEBPACK_IMPORTED_MODULE_3__/* .useCacheQuery */ .F)(query);
    const { includeUser , allowNull , disabled  } = options ?? {};
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (disabled) {
            setLoading(false);
            return;
        }
        /* La liste n'est jamais vidée pendant un rafraîchissement : la retirer de
       l'écran fait sauter la page (le contenu se réduit, le navigateur
       revient en haut) et les publications réapparaissent en fondu — un
       écran blanc à chaque changement. */ const publish = (currentData, isFromCache)=>{
            filled.current = true;
            setData(currentData.map((item)=>({
                    ...item,
                    user: (0,_lib_firebase_users__WEBPACK_IMPORTED_MODULE_2__/* .getCachedUser */ .S4)(item.createdBy)
                })));
            setFromCache(isFromCache);
            setLoading(false);
        };
        /* La lecture des profils est asynchrone : deux instantanés peuvent donc
       être publiés dans le désordre (le plus court, celui du cache local,
       après le plus long, celui du serveur). La liste rétrécissait alors
       d'un coup, et le fil sautait sous les yeux du lecteur. On n'ignore
       donc qu'un instantané plus ancien que le dernier reçu. */ const populateUser = async (currentData, isFromCache, snapshotId)=>{
            await (0,_lib_firebase_users__WEBPACK_IMPORTED_MODULE_2__/* .loadUsers */ .p_)(currentData.map((item)=>item.createdBy));
            if (snapshotId !== latestSnapshot.current) return;
            publish(currentData, isFromCache);
        };
        const unsubscribe = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.onSnapshot)(cachedQuery, (snapshot)=>{
            const data = snapshot.docs.map((doc)=>doc.data({
                    serverTimestamps: "estimate"
                }));
            const isFromCache = snapshot.metadata.fromCache;
            const snapshotId = ++latestSnapshot.current;
            if (allowNull && !data.length) {
                /* Instantané vide : on ne vide la liste que si elle ne l'a jamais
             été. Sinon, on attend l'instantané suivant (le cache local n'a
             pas encore répondu). */ if (!filled.current) {
                    setData(null);
                    setFromCache(isFromCache);
                    setLoading(false);
                }
                return;
            }
            if (includeUser) void populateUser(data, isFromCache, snapshotId);
            else {
                filled.current = true;
                setData(data);
                setFromCache(isFromCache);
                setLoading(false);
            }
        }, (err)=>{
            // La liste n'est jamais vidée : la retirer ferait sauter la page (le
            // navigateur reviendrait en haut) et les publications réapparaîtraient
            // en fondu — un écran blanc. L'erreur est journalisée, et la liste
            // déjà affichée reste en place.
            console.error("useCollection error:", err);
            setLoading(false);
        });
        return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        cachedQuery,
        disabled
    ]);
    return {
        data,
        loading,
        fromCache
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3040:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "d": () => (/* binding */ useModal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useModal() {
    const { 0: open , 1: setOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const openModal = ()=>setOpen(true);
    const closeModal = ()=>setOpen(false);
    return {
        open,
        openModal,
        closeModal
    };
}


/***/ }),

/***/ 2843:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Q": () => (/* binding */ useRequireAuth)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2108);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__]);
_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



function useRequireAuth(redirectUrl) {
    const { user , loading  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_2__/* .useAuth */ .aC)();
    const { replace  } = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!loading && !user) void replace(redirectUrl ?? "/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        user,
        loading
    ]);
    return user;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2577:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V": () => (/* binding */ useStatusVideoSrc)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* Une seule requête par session : le serveur met l'autorisation en cache. */ let downloadInfoPromise = null;
function getDownloadInfo() {
    if (!downloadInfoPromise) downloadInfoPromise = fetch("/api/b2/download-token").then((res)=>{
        if (!res.ok) throw new Error("token unavailable");
        return res.json();
    }).catch((error)=>{
        downloadInfoPromise = null;
        throw error;
    });
    return downloadInfoPromise;
}
/** Remplace l'URL passé par le proxy (/api/image/...) par une lecture directe
 *  depuis Backblaze : le proxy serverless est limité en taille (~4,5 Mo) et
 *  tronque les vidéos. En cas d'échec, l'URL d'origine est utilisée. */ function useStatusVideoSrc(src) {
    const { 0: directSrc , 1: setDirectSrc  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        setDirectSrc(null);
        if (!src || !src.startsWith("/api/image/")) return;
        let active = true;
        void getDownloadInfo().then(({ token , baseUrl  })=>{
            if (!active) return;
            const key = src.replace(/^\/api\/image\//, "");
            setDirectSrc(`${baseUrl}/${key}?Authorization=${encodeURIComponent(token)}`);
        }).catch(()=>undefined);
        return ()=>{
            active = false;
        };
    }, [
        src
    ]);
    return directSrc ?? src;
}


/***/ }),

/***/ 3079:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ buildStatusSlides),
/* harmony export */   "u": () => (/* binding */ useStatuses)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5342);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2108);
/* harmony import */ var _useCollection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3639);
/* harmony import */ var _useArrayDocument__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2322);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_2__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__, _useCollection__WEBPACK_IMPORTED_MODULE_4__, _useArrayDocument__WEBPACK_IMPORTED_MODULE_5__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_2__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__, _useCollection__WEBPACK_IMPORTED_MODULE_4__, _useArrayDocument__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






function buildStatusSlides(statuses) {
    return statuses.flatMap((status)=>status.kind === "media" && status.media?.length ? status.media.map((_, mediaIndex)=>({
                status,
                mediaIndex
            })) : [
            {
                status,
                mediaIndex: null
            }
        ]);
}
const toMillis = (timestamp)=>timestamp && typeof timestamp.toMillis === "function" ? timestamp.toMillis() : 0;
/**
 * Récupère les statuts non expirés de l'utilisateur et de ses abonnements,
 * regroupés par auteur. Les documents sont lus via un seul abonnement
 * Firestore, puis complétés par les profils des auteurs (une seule lecture
 * par auteur distinct).
 */ function useStatuses() {
    const { user  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__/* .useAuth */ .aC)();
    const { data , loading  } = (0,_useCollection__WEBPACK_IMPORTED_MODULE_4__/* .useCollection */ .K)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_2__/* .statusesCollection */ .lV, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.orderBy)("createdAt", "desc"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.limit)(60)), {
        preserve: true
    });
    const authorIds = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        if (!data?.length) return [];
        return Array.from(new Set(data.map(({ createdBy  })=>createdBy)));
    }, [
        data
    ]);
    const { data: authors  } = (0,_useArrayDocument__WEBPACK_IMPORTED_MODULE_5__/* .useArrayDocument */ .z)(authorIds, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_2__/* .usersCollection */ .W$);
    const groups = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        if (!user || !data?.length) return [];
        const now = Date.now();
        const allowed = new Set([
            user.id,
            ...user.following ?? []
        ]);
        const authorsById = new Map((authors ?? []).map((a)=>[
                a.id,
                a
            ]));
        const byAuthor = new Map();
        for (const status of data){
            if (!status.media) continue;
            if (!allowed.has(status.createdBy)) continue;
            if (toMillis(status.expiresAt) <= now) continue;
            // Un statut programmé reste invisible jusqu'à l'heure choisie.
            if (toMillis(status.scheduledFor) > now) continue;
            const list = byAuthor.get(status.createdBy);
            if (list) list.push(status);
            else byAuthor.set(status.createdBy, [
                status
            ]);
        }
        const result = [];
        byAuthor.forEach((statuses, authorId)=>{
            const author = authorsById.get(authorId);
            if (!author) return;
            // Lecture du plus ancien au plus récent.
            statuses.sort((a, b)=>toMillis(a.createdAt) - toMillis(b.createdAt));
            result.push({
                user: author,
                statuses,
                slides: buildStatusSlides(statuses),
                latestAt: statuses.reduce((acc, s)=>Math.max(acc, toMillis(s.createdAt)), 0),
                hasUnseen: statuses.some((s)=>!s.viewedBy?.includes(user.id)),
                isOwn: authorId === user.id
            });
        });
        /* Ordre stable : notre statut d'abord, puis les non vus, puis les plus
       récents. L'ordre ne dépend pas de `viewedBy`, ce qui évite que la
       visionneuse se réorganise pendant la lecture. */ return result.sort((a, b)=>{
            if (a.isOwn !== b.isOwn) return a.isOwn ? -1 : 1;
            if (a.hasUnseen !== b.hasUnseen) return a.hasUnseen ? -1 : 1;
            return b.latestAt - a.latestAt;
        });
    }, [
        data,
        authors,
        user
    ]);
    return {
        groups,
        loading
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1565:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mM": () => (/* binding */ splitLinks),
/* harmony export */   "ne": () => (/* binding */ fetchLinkPreview),
/* harmony export */   "s2": () => (/* binding */ findLink)
/* harmony export */ });
/** Détection et récupération des aperçus de liens côté client. */ /* Repère un lien dans un texte : http(s)://… ou www.… jusqu'au premier espace.
   On exclut les points de fin qui feraient partie de la phrase. */ const URL_PATTERN = /\b(?:https?:\/\/|www\.)[^\s<>"']+/gi;
/** Retire la ponctuation collée en fin de lien (« https://x.fr. »). */ function cleanUrl(value) {
    return value.replace(/[.,;:!?)\]}'"]+$/, "");
}
/** Renvoie le premier lien d'un texte, ou `null`. */ function findLink(text) {
    const match = text.match(URL_PATTERN);
    if (!match) return null;
    const cleaned = cleanUrl(match[0]);
    if (!cleaned) return null;
    /* On complète « www. » pour l'appel réseau. */ return cleaned.startsWith("www.") ? `https://${cleaned}` : cleaned;
}
function splitLinks(text) {
    const parts = [];
    let lastIndex = 0;
    URL_PATTERN.lastIndex = 0;
    let match;
    while((match = URL_PATTERN.exec(text)) !== null){
        const raw = match[0];
        const cleaned = cleanUrl(raw);
        if (!cleaned) continue;
        /* Le lien peut se terminer par une ponctuation qu'on exclut : on ne la
       mange pas dans le texte qui suit. */ const trailing = raw.slice(cleaned.length);
        if (match.index > lastIndex) parts.push({
            type: "text",
            value: text.slice(lastIndex, match.index)
        });
        parts.push({
            type: "link",
            value: cleaned
        });
        lastIndex = match.index + raw.length;
        /* On repart après la ponctuation, mais on la rend au texte suivant. */ if (trailing) {
            parts.push({
                type: "text",
                value: trailing
            });
            lastIndex = match.index + raw.length;
        }
    }
    if (lastIndex < text.length) parts.push({
        type: "text",
        value: text.slice(lastIndex)
    });
    return parts;
}
/** Demande l'aperçu d'un lien à notre route serveur. */ async function fetchLinkPreview(url) {
    try {
        const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
        if (!response.ok) return null;
        const data = await response.json();
        /* Sans titre ni image, il n'y a rien à afficher. */ if (!data.title && !data.image && !data.description) return null;
        return data;
    } catch  {
        return null;
    }
}


/***/ }),

/***/ 8402:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UB": () => (/* binding */ getStorageErrorMessage),
/* harmony export */   "e7": () => (/* binding */ uploadVideoFile),
/* harmony export */   "eg": () => (/* binding */ uploadImages),
/* harmony export */   "fY": () => (/* binding */ uploadStatusFiles),
/* harmony export */   "lU": () => (/* binding */ uploadImageFile),
/* harmony export */   "sT": () => (/* binding */ fileToBase64)
/* harmony export */ });
/* unused harmony exports StorageUploadError, isStorageQuotaError */
class StorageUploadError extends Error {
    constructor(message){
        super(message);
        this.name = "StorageUploadError";
    }
}
function isStorageQuotaError(_error) {
    return false;
}
function getStorageErrorMessage(error) {
    if (error instanceof StorageUploadError) return error.message;
    if (error instanceof Error) return error.message;
    return "\xc9chec du t\xe9l\xe9versement de l’image vers Backblaze B2.";
}
function fileToBase64(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>resolve(reader.result);
        reader.onerror = (error)=>reject(error);
    });
}
/** Envoie une image via l'API interne (fichiers légers, base64). */ async function uploadImageFile(userId, file) {
    const base64Data = await fileToBase64(file);
    const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            fileName: file.name,
            contentType: file.type || "image/jpeg",
            base64Data
        })
    });
    if (!res.ok) {
        const errData = await res.json().catch(()=>({}));
        throw new StorageUploadError(errData.error || `Erreur d’envoi (${res.status})`);
    }
    const data = await res.json();
    return {
        id: file.id,
        src: data.url,
        alt: file.name,
        type: file.type
    };
}
/**
 * Envoie une vidéo (mp4, mov…) directement à Backblaze B2 depuis le
 * navigateur : les fonctions serverless limitent la taille des requêtes
 * (4,5 Mo sur Vercel), ce qui bloquait les vidéos.
 */ async function uploadVideoFile(userId, file) {
    try {
        const ticketRes = await fetch("/api/b2/upload-ticket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                fileName: file.name
            })
        });
        if (!ticketRes.ok) throw new StorageUploadError(`Erreur d’envoi (${ticketRes.status})`);
        const { uploadUrl , authorizationToken , key , url  } = await ticketRes.json();
        const encodedKey = key.split("/").map((segment)=>encodeURIComponent(segment)).join("/");
        const uploadRes = await fetch(uploadUrl, {
            method: "POST",
            headers: {
                Authorization: authorizationToken,
                "X-Bz-File-Name": encodedKey,
                "Content-Type": file.type || "video/mp4",
                /* Backblaze peut vérifier lui-même le fichier reçu : inutile de
           hacher une grosse vidéo dans le navigateur. */ "X-Bz-Content-Sha1": "do_not_verify"
            },
            body: file
        });
        if (!uploadRes.ok) throw new StorageUploadError(`Erreur d’envoi (${uploadRes.status})`);
        return {
            id: file.id,
            src: url,
            alt: file.name,
            type: file.type
        };
    } catch (error) {
        throw new StorageUploadError(getStorageErrorMessage(error));
    }
}
/** Médias d'un statut : vidéos en direct vers B2, images via l'API interne. */ async function uploadStatusFiles(userId, files) {
    return Promise.all(files.map((file)=>file.type.startsWith("video/") ? uploadVideoFile(userId, file) : uploadImageFile(userId, file)));
}
async function uploadImages(userId, files, /* Conservé pour compatibilité avec les appels historiques : le bucket est
     choisi côté serveur. */ _bucket = "inspirationcool2") {
    if (!files.length) return null;
    try {
        return await Promise.all(files.map((file)=>uploadImageFile(userId, file)));
    } catch (error) {
        throw new StorageUploadError(getStorageErrorMessage(error));
    }
}


/***/ }),

/***/ 3521:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rv": () => (/* binding */ fillImagesSizes),
/* harmony export */   "t6": () => (/* binding */ getImagesData)
/* harmony export */ });
/* unused harmony exports isValidImage, isValidMedia, isValidUsername */
/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5195);

const IMAGE_EXTENSIONS = [
    "apng",
    "avif",
    "gif",
    "jpg",
    "jpeg",
    "jfif",
    "pjpeg",
    "pjp",
    "png",
    "svg",
    "webp"
];
const MEDIA_EXTENSIONS = [
    ...IMAGE_EXTENSIONS,
    "mp4",
    "mov",
    "avi",
    "mkv",
    "webm"
];
function isValidImageExtension(extension) {
    return IMAGE_EXTENSIONS.includes(extension.split(".").pop()?.toLowerCase());
}
function isValidMediaExtension(extension) {
    return MEDIA_EXTENSIONS.includes(extension.split(".").pop()?.toLowerCase());
}
function isValidImage(name, bytes) {
    return isValidImageExtension(name) && bytes < 20 * Math.pow(1024, 2);
}
function isValidMedia(name, size) {
    return isValidMediaExtension(name) && size < 50 * Math.pow(1024, 2);
}
function isValidUsername(username, value) {
    if (value.length < 4) return "Your username must be longer than 4 characters.";
    if (value.length > 15) return "Your username must be shorter than 15 characters.";
    if (!/^\w+$/i.test(value)) return "Your username can only contain letters, numbers and '_'.";
    if (!/[a-z]/i.test(value)) return "Include a non-number character.";
    if (value === username) return "This is your current username.";
    return null;
}
/* Les dimensions naturelles des images : elles permettent d'afficher l'aperçu
   — et la publication — dans le bon format, la place étant réservée avant
   même le chargement. Sans elles, l'image arrive dans une boîte vide puis
   fait sauter la mise en page. */ async function fillImagesSizes(images) {
    return Promise.all(images.map(async (image)=>{
        if (!image.type?.startsWith("image/")) return image;
        try {
            const response = await fetch(image.src);
            const blob = await response.blob();
            const bitmap = await createImageBitmap(blob);
            const sized = {
                ...image,
                width: bitmap.width,
                height: bitmap.height
            };
            bitmap.close();
            return sized;
        } catch  {
            /* Image non décodable : on la garde quand même, sans ses
           dimensions. L'affichage se fera alors dans un cadre de ratio
           fixe. */ return image;
        }
    }));
}
function getImagesData(files, { currentFiles , allowUploadingVideos  } = {}) {
    if (!files || !files.length) return null;
    const singleEditingMode = currentFiles === undefined;
    const rawImages = singleEditingMode || !(currentFiles === 4 || files.length > 4 - currentFiles) ? Array.from(files).filter(({ name , size  })=>allowUploadingVideos ? isValidMedia(name, size) : isValidImage(name, size)) : null;
    if (!rawImages || !rawImages.length) return null;
    const imagesId = rawImages.map(({ name  })=>{
        const randomId = (0,_random__WEBPACK_IMPORTED_MODULE_0__/* .getRandomId */ .w)();
        return {
            id: randomId,
            name: name === "image.png" ? `${randomId}.png` : null
        };
    });
    const imagesPreviewData = rawImages.map((image, index)=>({
            id: imagesId[index].id,
            src: URL.createObjectURL(image),
            alt: imagesId[index].name ?? image.name,
            type: image.type
        }));
    const selectedImagesData = rawImages.map((image, index)=>renameFile(image, imagesId[index].id, imagesId[index].name));
    return {
        imagesPreviewData,
        selectedImagesData
    };
}
function renameFile(file, newId, newName) {
    return Object.assign(newName ? new File([
        file
    ], newName, {
        type: file.type,
        lastModified: file.lastModified
    }) : file, {
        id: newId
    });
}


/***/ })

};
;