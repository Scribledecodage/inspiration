"use strict";
exports.id = 3779;
exports.ids = [3779];
exports.modules = {

/***/ 6781:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Q": () => (/* binding */ StatsEmpty)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ui_next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4664);



function StatsEmpty({ title , titleClassName , modal , imageData , imageWidth , imageHeight , description  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("flex justify-center p-8", modal && "mt-[52px]"),
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "w-full max-w-sm",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col items-center gap-6",
                children: [
                    imageData && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_next_image__WEBPACK_IMPORTED_MODULE_2__/* .NextImage */ .o, {
                        width: imageWidth ?? 336,
                        height: imageHeight ?? 168,
                        src: imageData.src,
                        alt: imageData.alt
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col gap-2 text-center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: titleClassName ?? "text-3xl font-extrabold",
                                children: title
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-light-secondary dark:text-dark-secondary",
                                children: description
                            })
                        ]
                    })
                ]
            })
        })
    });
}


/***/ }),

/***/ 3779:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G": () => (/* binding */ UserCards)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6197);
/* harmony import */ var _components_tweet_stats_empty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6781);
/* harmony import */ var _components_ui_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9570);
/* harmony import */ var _components_user_user_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8162);
/* harmony import */ var _user_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7238);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__, _components_user_user_header__WEBPACK_IMPORTED_MODULE_5__, _user_card__WEBPACK_IMPORTED_MODULE_6__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_2__, _components_user_user_header__WEBPACK_IMPORTED_MODULE_5__, _user_card__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const allNoStatsData = {
    retweets: {
        title: "Partagez les publications que vous aimez",
        imageData: {
            src: "/assets/no-retweets.png",
            alt: "Aucun repost"
        },
        description: "Partagez la publication de quelqu’un d’autre sur votre fil en la repostant. Elle appara\xeetra ensuite ici."
    },
    likes: {
        title: "Aucun J’aime pour le moment",
        imageData: {
            src: "/assets/no-likes.png",
            alt: "Aucun J’aime"
        },
        description: "Les publications que vous aimez appara\xeetront ici."
    },
    following: {
        title: "Restez inform\xe9",
        description: "Suivre des comptes est un moyen simple de personnaliser votre fil et de rester inform\xe9 des sujets et des personnes qui vous int\xe9ressent."
    },
    followers: {
        title: "Vous cherchez des abonn\xe9s\xa0?",
        imageData: {
            src: "/assets/no-followers.png",
            alt: "Aucun abonn\xe9"
        },
        description: "Les personnes qui suivent ce compte appara\xeetront ici. Publier et interagir avec les autres vous aidera \xe0 gagner des abonn\xe9s."
    }
};
function UserCards({ data , type , follow , loading  }) {
    const noStatsData = allNoStatsData[type];
    const modal = [
        "retweets",
        "likes"
    ].includes(type);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(modal && "h-full overflow-y-auto [&>div:first-child>a]:mt-[52px]", loading && "flex items-center justify-center"),
        children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_loading__WEBPACK_IMPORTED_MODULE_4__/* .Loading */ .g, {
            className: modal ? "mt-[52px]" : "mt-5"
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.AnimatePresence, {
            initial: false,
            children: data?.length ? data.map((userData)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
                    layout: "position",
                    ..._components_user_user_header__WEBPACK_IMPORTED_MODULE_5__/* .variants */ .o,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_user_card__WEBPACK_IMPORTED_MODULE_6__/* .UserCard */ .O, {
                        ...userData,
                        follow: follow,
                        modal: modal
                    })
                }, userData.id)) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_tweet_stats_empty__WEBPACK_IMPORTED_MODULE_3__/* .StatsEmpty */ .Q, {
                ...noStatsData,
                modal: modal
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8162:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ variants),
/* harmony export */   "w": () => (/* binding */ UserHeader)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1492);
/* harmony import */ var _lib_hooks_useDocument__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6051);
/* harmony import */ var _lib_context_user_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5127);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6269);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5342);
/* harmony import */ var _user_name__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4531);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, _lib_hooks_useDocument__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, _lib_hooks_useDocument__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.4
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2
        }
    }
};
function UserHeader() {
    const { pathname , query: { id  }  } = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const { user , loading  } = (0,_lib_context_user_context__WEBPACK_IMPORTED_MODULE_4__/* .useUser */ .aF)();
    const userId = user ? user.id : null;
    const { data: statsData , loading: statsLoading  } = (0,_lib_hooks_useDocument__WEBPACK_IMPORTED_MODULE_3__/* .useDocument */ .k)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)((0,_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__/* .userStatsCollection */ .bR)(userId ?? "null"), "stats"), {
        allowNull: true,
        disabled: !userId
    });
    const { tweets , likes  } = statsData ?? {};
    const [totalTweets, totalPhotos, totalLikes] = [
        (user?.totalTweets ?? 0) + (tweets?.length ?? 0),
        user?.totalPhotos,
        likes?.length
    ];
    const currentPage = pathname.split("/").pop() ?? "";
    const isInTweetPage = [
        "[id]",
        "with_replies"
    ].includes(currentPage);
    const isInFollowPage = [
        "following",
        "followers"
    ].includes(currentPage);
    if (loading || statsLoading) return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "-mb-1 inner:animate-pulse inner:rounded-lg inner:bg-light-secondary dark:inner:bg-dark-secondary",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "mb-1 -mt-1 h-5 w-24"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "h-4 w-12"
            })
        ]
    });
    if (!user) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
        className: "text-xl font-bold",
        children: isInFollowPage ? `@${id}` : "Utilisateur"
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "-mb-1 truncate",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_user_name__WEBPACK_IMPORTED_MODULE_6__/* .UserName */ .v, {
                tag: "h2",
                name: user.name,
                className: "-mt-1 text-xl",
                iconClassName: "w-6 h-6",
                verified: user.verified
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "text-xs text-light-secondary dark:text-dark-secondary",
                children: isInFollowPage ? `@${user.username}` : isInTweetPage ? totalTweets ? `${totalTweets} publication${(0,_lib_utils__WEBPACK_IMPORTED_MODULE_7__/* .isPlural */ .uz)(totalTweets) ? "s" : ""}` : "Aucune publication" : currentPage === "media" ? totalPhotos ? `${totalPhotos} photo${(0,_lib_utils__WEBPACK_IMPORTED_MODULE_7__/* .isPlural */ .uz)(totalPhotos) ? "s" : ""} et GIF${(0,_lib_utils__WEBPACK_IMPORTED_MODULE_7__/* .isPlural */ .uz)(totalPhotos) ? "s" : ""}` : "Aucune photo ni GIF" : totalLikes ? `${totalLikes} J’aime${(0,_lib_utils__WEBPACK_IMPORTED_MODULE_7__/* .isPlural */ .uz)(totalLikes) ? "s" : ""}` : "Aucun J’aime"
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5127:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aF": () => (/* binding */ useUser),
/* harmony export */   "fS": () => (/* binding */ UserContextProvider)
/* harmony export */ });
/* unused harmony export UserContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const UserContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
function UserContextProvider({ value , children  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(UserContext.Provider, {
        value: value,
        children: children
    });
}
function useUser() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(UserContext);
    if (!context) throw new Error("useUser must be used within an UserContextProvider");
    return context;
}


/***/ }),

/***/ 7243:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ useCacheRef)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_1__]);
firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function useCacheRef(ref) {
    const { 0: cachedRef , 1: setCachedRef  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(ref);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.refEqual)(ref, cachedRef)) setCachedRef(ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        ref
    ]);
    return cachedRef;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6051:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ useDocument)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
/* harmony import */ var _lib_firebase_users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9494);
/* harmony import */ var _useCacheRef__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7243);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, _lib_firebase_users__WEBPACK_IMPORTED_MODULE_2__, _useCacheRef__WEBPACK_IMPORTED_MODULE_3__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, _lib_firebase_users__WEBPACK_IMPORTED_MODULE_2__, _useCacheRef__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




function useDocument(docRef, options) {
    const { 0: data , 1: setData  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const cachedDocRef = (0,_useCacheRef__WEBPACK_IMPORTED_MODULE_3__/* .useCacheRef */ .o)(docRef);
    const { includeUser , allowNull , disabled  } = options ?? {};
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (disabled) {
            setLoading(false);
            return;
        }
        setData(null);
        setLoading(true);
        const populateUser = async (currentData)=>{
            /* Le profil vient du cache : il n'est relu que s'il est absent ou
         périmé. */ await (0,_lib_firebase_users__WEBPACK_IMPORTED_MODULE_2__/* .loadUsers */ .p_)([
                currentData.createdBy
            ]);
            setData({
                ...currentData,
                user: (0,_lib_firebase_users__WEBPACK_IMPORTED_MODULE_2__/* .getCachedUser */ .S4)(currentData.createdBy)
            });
            setLoading(false);
        };
        const unsubscribe = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.onSnapshot)(docRef, (snapshot)=>{
            const data = snapshot.data({
                serverTimestamps: "estimate"
            });
            if (allowNull && !data) {
                setData(null);
                setLoading(false);
                return;
            }
            if (includeUser) void populateUser(data);
            else {
                setData(data);
                setLoading(false);
            }
        });
        return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        cachedDocRef,
        disabled
    ]);
    return {
        data,
        loading
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;