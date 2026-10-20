"use strict";
exports.id = 7713;
exports.ids = [7713];
exports.modules = {

/***/ 7713:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "w": () => (/* binding */ UserHomeLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6197);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2108);
/* harmony import */ var _lib_context_user_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5127);
/* harmony import */ var _components_common_seo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(585);
/* harmony import */ var _components_user_user_home_cover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2230);
/* harmony import */ var _components_user_user_home_avatar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3995);
/* harmony import */ var _components_user_user_details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7616);
/* harmony import */ var _components_user_user_nav__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7993);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_loading__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9570);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3276);
/* harmony import */ var _components_ui_follow_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5122);
/* harmony import */ var _components_user_user_header__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(8162);
/* harmony import */ var _components_user_user_edit_profile__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(7276);
/* harmony import */ var _components_user_user_share__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(8121);
/* harmony import */ var _lib_media__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(8540);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__, _components_user_user_home_cover__WEBPACK_IMPORTED_MODULE_6__, _components_user_user_home_avatar__WEBPACK_IMPORTED_MODULE_7__, _components_user_user_details__WEBPACK_IMPORTED_MODULE_8__, _components_user_user_nav__WEBPACK_IMPORTED_MODULE_9__, _components_ui_follow_button__WEBPACK_IMPORTED_MODULE_14__, _components_user_user_header__WEBPACK_IMPORTED_MODULE_15__, _components_user_user_edit_profile__WEBPACK_IMPORTED_MODULE_16__, _components_user_user_share__WEBPACK_IMPORTED_MODULE_17__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_2__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__, _components_user_user_home_cover__WEBPACK_IMPORTED_MODULE_6__, _components_user_user_home_avatar__WEBPACK_IMPORTED_MODULE_7__, _components_user_user_details__WEBPACK_IMPORTED_MODULE_8__, _components_user_user_nav__WEBPACK_IMPORTED_MODULE_9__, _components_ui_follow_button__WEBPACK_IMPORTED_MODULE_14__, _components_user_user_header__WEBPACK_IMPORTED_MODULE_15__, _components_user_user_edit_profile__WEBPACK_IMPORTED_MODULE_16__, _components_user_user_share__WEBPACK_IMPORTED_MODULE_17__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



















function UserHomeLayout({ children  }) {
    const { user , isAdmin  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_3__/* .useAuth */ .aC)();
    const { user: userData , loading  } = (0,_lib_context_user_context__WEBPACK_IMPORTED_MODULE_4__/* .useUser */ .aF)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const { id  } = router.query;
    const coverData = {
        src: (0,_lib_media__WEBPACK_IMPORTED_MODULE_18__/* .getBannerSrc */ .Xj)(userData?.coverPhotoURL),
        alt: userData?.name ?? "Banni\xe8re Inspiration"
    };
    const profileData = userData ? {
        src: (0,_lib_media__WEBPACK_IMPORTED_MODULE_18__/* .getAvatarSrc */ .SJ)(userData.photoURL, userData.gender),
        alt: userData.name,
        gender: userData.gender,
        avatarShape: userData.avatarShape,
        avatarFrame: userData.avatarFrame
    } : null;
    const { id: userId  } = user ?? {};
    const isOwner = userData?.id === userId;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            userData && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_seo__WEBPACK_IMPORTED_MODULE_5__/* .SEO */ .H, {
                title: `${`${userData.name} (@${userData.username})`} / Inspiration`
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.section, {
                ..._components_user_user_header__WEBPACK_IMPORTED_MODULE_15__/* .variants */ .o,
                exit: undefined,
                children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_loading__WEBPACK_IMPORTED_MODULE_11__/* .Loading */ .g, {
                    className: "mt-5"
                }) : !userData ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_home_cover__WEBPACK_IMPORTED_MODULE_6__/* .UserHomeCover */ .D, {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col gap-8",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "relative flex flex-col gap-3 px-4 py-3",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_home_avatar__WEBPACK_IMPORTED_MODULE_7__/* .UserHomeAvatar */ .b, {}),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "text-xl font-bold",
                                            children: [
                                                "@",
                                                id
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "p-8 text-center",
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
                            ]
                        })
                    ]
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_home_cover__WEBPACK_IMPORTED_MODULE_6__/* .UserHomeCover */ .D, {
                            coverData: coverData
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "relative flex flex-col gap-3 px-4 py-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex justify-between",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_home_avatar__WEBPACK_IMPORTED_MODULE_7__/* .UserHomeAvatar */ .b, {
                                            isOwner: isOwner,
                                            profileData: profileData
                                        }),
                                        isOwner ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_edit_profile__WEBPACK_IMPORTED_MODULE_16__/* .UserEditProfile */ ._, {}) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex gap-2 self-start",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_share__WEBPACK_IMPORTED_MODULE_17__/* .UserShare */ .R, {
                                                    username: userData.username
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                                                    className: "dark-bg-tab group relative border border-light-line-reply p-2 hover:bg-light-primary/10 active:bg-light-primary/20 dark:border-light-secondary dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20",
                                                    /* Ouvre la messagerie directement sur la conversation
                         privée avec cette personne (le pseudo est plus fiable
                         que l'identifiant, absent de certaines fiches). */ onClick: ()=>void router.push(`/messages?user=${encodeURIComponent(userData.username)}`),
                                                    title: "Message",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_12__/* .MaterialIcon */ .O, {
                                                            className: "h-5 w-5",
                                                            iconName: "mail"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_13__/* .ToolTip */ .e, {
                                                            tip: "Message"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_follow_button__WEBPACK_IMPORTED_MODULE_14__/* .FollowButton */ .e, {
                                                    userTargetId: userData.id,
                                                    userTargetUsername: userData.username
                                                }),
                                                isAdmin && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_edit_profile__WEBPACK_IMPORTED_MODULE_16__/* .UserEditProfile */ ._, {
                                                    hide: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_details__WEBPACK_IMPORTED_MODULE_8__/* .UserDetails */ .x, {
                                    ...userData
                                })
                            ]
                        })
                    ]
                })
            }),
            userData && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_nav__WEBPACK_IMPORTED_MODULE_9__/* .UserNav */ .T, {}),
                    children
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7616:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ UserDetails)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_phone_number_input_max__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3113);
/* harmony import */ var _lib_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1944);
/* harmony import */ var _lib_profile_fields__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7309);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3276);
/* harmony import */ var _user_name__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4531);
/* harmony import */ var _user_following__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6154);
/* harmony import */ var _user_follow_stats__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8647);
/* harmony import */ var _website_favicon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7540);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_phone_number_input_max__WEBPACK_IMPORTED_MODULE_1__, _user_following__WEBPACK_IMPORTED_MODULE_6__, _user_follow_stats__WEBPACK_IMPORTED_MODULE_7__]);
([react_phone_number_input_max__WEBPACK_IMPORTED_MODULE_1__, _user_following__WEBPACK_IMPORTED_MODULE_6__, _user_follow_stats__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function formatBirthday(birthDate) {
    if (!birthDate) return null;
    const [year, month, day] = birthDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
    return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}
function UserDetails({ id , bio , name , website , phoneNumber , username , location , birthDate , verified , createdAt , following , followers , customBadge  }) {
    const birthdayLabel = formatBirthday(birthDate);
    /* Plusieurs lieux de résidence et plusieurs sites web sont possibles : ils
     sont enregistrés dans le même champ, séparés par un retour à la ligne. */ const locationEntries = (0,_lib_profile_fields__WEBPACK_IMPORTED_MODULE_9__/* .splitProfileEntries */ .EF)(location);
    const websiteEntries = (0,_lib_profile_fields__WEBPACK_IMPORTED_MODULE_9__/* .splitProfileEntries */ .EF)(website);
    const getWebsiteDetail = (rawWebsite, index)=>{
        const href = /^https?:\/\//i.test(rawWebsite) ? rawWebsite : `https://${rawWebsite}`;
        return {
            key: `website-${index}`,
            label: rawWebsite.replace(/^https?:\/\//i, "").replace(/\/$/, ""),
            icon: "link",
            href,
            favicon: href
        };
    };
    const profileDetails = [
        ...locationEntries.map((entry, index)=>({
                key: `location-${index}`,
                label: entry,
                icon: "location_on"
            })),
        ...websiteEntries.map(getWebsiteDetail),
        {
            key: "phone",
            label: phoneNumber ? (0,react_phone_number_input_max__WEBPACK_IMPORTED_MODULE_1__.formatPhoneNumberIntl)(phoneNumber) : null,
            icon: "call",
            href: phoneNumber ? `tel:${phoneNumber}` : undefined
        },
        {
            key: "birthday",
            label: birthdayLabel ? `Né le ${birthdayLabel}` : null,
            icon: "redeem"
        },
        {
            key: "joined",
            label: `Inscrit le ${(0,_lib_date__WEBPACK_IMPORTED_MODULE_2__/* .formatDate */ .p6)(createdAt, "joined")}`,
            icon: "calendar_month",
            tooltip: (0,_lib_date__WEBPACK_IMPORTED_MODULE_2__/* .formatDate */ .p6)(createdAt, "full")
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col gap-3",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_user_name__WEBPACK_IMPORTED_MODULE_5__/* .UserName */ .v, {
                                className: "-mb-1 text-xl font-bold",
                                name: name,
                                iconClassName: "w-6 h-6",
                                verified: verified
                            }),
                            customBadge && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "rounded-full bg-main-accent/15 px-2.5 py-0.5 text-xs font-semibold text-main-accent",
                                children: customBadge
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-1.5 text-sm text-light-secondary dark:text-dark-secondary",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                children: [
                                    "@",
                                    username
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_user_following__WEBPACK_IMPORTED_MODULE_6__/* .UserFollowing */ .y, {
                                userTargetId: id
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col gap-2",
                children: [
                    bio && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "whitespace-pre-line break-words text-[15px] leading-relaxed",
                        children: bio
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "flex flex-wrap gap-x-4 gap-y-2 text-sm text-light-secondary dark:text-dark-secondary",
                        children: profileDetails.map(({ key , label , icon , href , favicon , tooltip  })=>label && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex min-w-0 items-center gap-1.5",
                                children: [
                                    favicon ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_website_favicon__WEBPACK_IMPORTED_MODULE_8__/* .WebsiteFavicon */ .U, {
                                        href: favicon
                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                                        className: "h-4 w-4 shrink-0",
                                        iconName: icon
                                    }),
                                    href ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        className: "custom-underline truncate text-main-accent",
                                        href: href,
                                        rel: "noreferrer",
                                        target: href.startsWith("http") ? "_blank" : undefined,
                                        children: label
                                    }) : tooltip ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        className: "custom-underline group relative truncate",
                                        type: "button",
                                        children: [
                                            label,
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__/* .ToolTip */ .e, {
                                                className: "translate-y-1",
                                                tip: tooltip
                                            })
                                        ]
                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "break-words",
                                        children: label
                                    })
                                ]
                            }, key))
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_user_follow_stats__WEBPACK_IMPORTED_MODULE_7__/* .UserFollowStats */ .t, {
                following: following,
                followers: followers
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8647:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t": () => (/* binding */ UserFollowStats)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_tweet_number_stats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5072);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_tweet_number_stats__WEBPACK_IMPORTED_MODULE_4__]);
_components_tweet_number_stats__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/* eslint-disable react-hooks/exhaustive-deps */ 




function UserFollowStats({ following , followers  }) {
    const totalFollowing = Array.isArray(following) ? following.length : 0;
    const totalFollowers = Array.isArray(followers) ? followers.length : 0;
    const { 0: { currentFollowers , currentFollowing  } , 1: setCurrentStats  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        currentFollowing: totalFollowing,
        currentFollowers: totalFollowers
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setCurrentStats({
            currentFollowing: totalFollowing,
            currentFollowers: totalFollowers
        });
    }, [
        totalFollowing,
        totalFollowers
    ]);
    const followingMove = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>totalFollowing > currentFollowing ? -25 : 25, [
        totalFollowing
    ]);
    const followersMove = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>totalFollowers > currentFollowers ? -25 : 25, [
        totalFollowers
    ]);
    const { query: { id  }  } = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const userPath = `/user/${id}`;
    const allStats = [
        [
            "Abonnements",
            `${userPath}/following`,
            followingMove,
            currentFollowing
        ],
        [
            "Abonn\xe9",
            `${userPath}/followers`,
            followersMove,
            currentFollowers
        ]
    ];
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "flex gap-4 text-light-secondary dark:text-dark-secondary [&>a>div]:font-bold [&>a>div]:text-light-primary dark:[&>a>div]:text-dark-primary",
        children: allStats.map(([title, link, move, stats], index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                href: link,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                    className: "hover-animation mt-0.5 mb-[3px] flex h-4 items-center gap-1 border-b border-b-transparent outline-none hover:border-b-light-primary focus-visible:border-b-light-primary dark:hover:border-b-dark-primary dark:focus-visible:border-b-dark-primary",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_tweet_number_stats__WEBPACK_IMPORTED_MODULE_4__/* .NumberStats */ .H, {
                            move: move,
                            stats: stats,
                            alwaysShowStats: true
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            children: index === 1 && stats > 1 ? `${title}s` : title
                        })
                    ]
                })
            }, title))
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3995:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ UserHomeAvatar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3040);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4685);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9099);
/* harmony import */ var _components_modal_image_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3644);
/* harmony import */ var _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5655);
/* harmony import */ var _lib_media__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8540);
/* harmony import */ var _lib_avatar_shape__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8829);
/* harmony import */ var _avatar_frame__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8800);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_modal_modal__WEBPACK_IMPORTED_MODULE_4__, _components_modal_image_modal__WEBPACK_IMPORTED_MODULE_5__, _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_6__]);
([_components_modal_modal__WEBPACK_IMPORTED_MODULE_4__, _components_modal_image_modal__WEBPACK_IMPORTED_MODULE_5__, _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function UserHomeAvatar({ profileData , isOwner  }) {
    const { open , openModal , closeModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_2__/* .useModal */ .d)();
    const { avatarShape: globalShape , avatarFrame: globalFrame  } = (0,_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_6__/* .useTheme */ .Fg)();
    /* La forme / cadre choisi dans « Personnalisation » n'est appliqué qu'à
     notre propre profil : sur le profil de quelqu'un d'autre, on affiche sa
     forme à lui (ou un rond par défaut). */ const selectedShape = profileData?.avatarShape ?? (isOwner ? globalShape : undefined) ?? "circle";
    const selectedFrame = profileData?.avatarFrame ?? (isOwner ? globalFrame : undefined) ?? "none";
    const shapeClass = (0,_lib_avatar_shape__WEBPACK_IMPORTED_MODULE_8__/* .getAvatarShapeClass */ ._M)(selectedShape);
    // Avatar par défaut (homme/femme) et repli si la photo choisie est
    // indisponible (anciennes photos hébergées sur un service hors ligne).
    const fallbackAvatar = (0,_lib_media__WEBPACK_IMPORTED_MODULE_7__/* .getAvatarSrc */ .SJ)(null, profileData?.gender);
    const avatarSrc = (0,_lib_media__WEBPACK_IMPORTED_MODULE_7__/* .getAvatarSrc */ .SJ)(profileData?.src, profileData?.gender);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "relative mb-8 xs:mb-14 sm:mb-16",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_4__/* .Modal */ .u_, {
                open: open,
                closeModal: closeModal,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_image_modal__WEBPACK_IMPORTED_MODULE_5__/* .ImageModal */ .y, {
                    imageData: {
                        src: profileData?.src,
                        alt: profileData?.alt
                    },
                    previewCount: 1
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "absolute -mt-3 -translate-y-1/2",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_avatar_frame__WEBPACK_IMPORTED_MODULE_9__/* .AvatarDecoration */ .z, {
                            frame: selectedFrame
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .z, {
                            className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("accent-tab relative aspect-square w-24 overflow-hidden p-0 disabled:cursor-auto disabled:opacity-100 xs:w-32 sm:w-36", shapeClass),
                            onClick: openModal,
                            disabled: !profileData,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                className: "block h-full w-full bg-main-background object-cover",
                                src: avatarSrc,
                                /* Jamais de texte (nom) à la place d'une photo indisponible. */ alt: "",
                                onError: (event)=>{
                                    const image = event.currentTarget;
                                    if (image.dataset.fallback) return;
                                    image.dataset.fallback = "true";
                                    image.src = fallbackAvatar;
                                }
                            })
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

/***/ 2230:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ UserHomeCover)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3040);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4685);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9099);
/* harmony import */ var _components_modal_image_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3644);
/* harmony import */ var _lib_media__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8540);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_modal_modal__WEBPACK_IMPORTED_MODULE_3__, _components_modal_image_modal__WEBPACK_IMPORTED_MODULE_4__]);
([_components_modal_modal__WEBPACK_IMPORTED_MODULE_3__, _components_modal_image_modal__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






function UserHomeCover({ coverData  }) {
    const { open , openModal , closeModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_1__/* .useModal */ .d)();
    const bannerSrc = (0,_lib_media__WEBPACK_IMPORTED_MODULE_5__/* .getBannerSrc */ .Xj)(coverData?.src);
    const bannerData = coverData ?? {
        src: bannerSrc,
        alt: "Banni\xe8re Inspiration"
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "mt-0.5 h-36 xs:h-48 sm:h-52",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_3__/* .Modal */ .u_, {
                open: open,
                closeModal: closeModal,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_image_modal__WEBPACK_IMPORTED_MODULE_4__/* .ImageModal */ .y, {
                    imageData: bannerData,
                    previewCount: 1
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .z, {
                className: "accent-tab relative h-full w-full rounded-none p-0 transition hover:brightness-75",
                onClick: openModal,
                "aria-label": "Afficher la banni\xe8re",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                    className: "block h-full w-full object-cover",
                    src: bannerSrc,
                    /* Idem avatar : jamais de texte (nom) à la place d'une image
             indisponible, on garde la bannière par défaut. */ alt: "",
                    onError: (event)=>{
                        const image = event.currentTarget;
                        if (image.dataset.fallback) return;
                        image.dataset.fallback = "true";
                        image.src = "/Banniere.png";
                    }
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8121:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ UserShare)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1185);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6197);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6201);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6269);
/* harmony import */ var _lib_env__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1923);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3276);
/* harmony import */ var _components_tweet_tweet_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(44);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_headlessui_react__WEBPACK_IMPORTED_MODULE_2__, framer_motion__WEBPACK_IMPORTED_MODULE_3__, react_hot_toast__WEBPACK_IMPORTED_MODULE_4__, _components_tweet_tweet_actions__WEBPACK_IMPORTED_MODULE_9__]);
([_headlessui_react__WEBPACK_IMPORTED_MODULE_2__, framer_motion__WEBPACK_IMPORTED_MODULE_3__, react_hot_toast__WEBPACK_IMPORTED_MODULE_4__, _components_tweet_tweet_actions__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











function UserShare({ username  }) {
    const handleCopy = (closeMenu)=>async ()=>{
            closeMenu();
            await navigator.clipboard.writeText(`${_lib_env__WEBPACK_IMPORTED_MODULE_5__/* .siteURL */ .f7}/user/${username}`);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_4__.toast.success("Lien copi\xe9 dans le presse-papiers");
        };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Popover, {
        className: "relative",
        children: ({ open , close  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Popover.Button, {
                        as: _components_ui_button__WEBPACK_IMPORTED_MODULE_6__/* .Button */ .z,
                        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(`dark-bg-tab group relative border border-light-line-reply p-2
               hover:bg-light-primary/10 active:bg-light-primary/20 dark:border-light-secondary
               dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20`, open && "bg-light-primary/10 dark:bg-dark-primary/10"),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                className: "h-5 w-5",
                                iconName: "more_horiz"
                            }),
                            !open && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_8__/* .ToolTip */ .e, {
                                tip: "Plus"
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.AnimatePresence, {
                        children: open && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Popover.Panel, {
                            className: "menu-container group absolute right-0 top-11 whitespace-nowrap text-light-primary dark:text-dark-primary",
                            as: framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.div,
                            ..._components_tweet_tweet_actions__WEBPACK_IMPORTED_MODULE_9__/* .variants */ .o,
                            static: true,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Popover.Button, {
                                className: "flex w-full gap-3 rounded-md rounded-b-none p-4 hover:bg-main-sidebar-background",
                                as: _components_ui_button__WEBPACK_IMPORTED_MODULE_6__/* .Button */ .z,
                                onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_10__/* .preventBubbling */ .Db)(handleCopy(close)),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                        iconName: "link"
                                    }),
                                    "Copier le lien du profil"
                                ]
                            })
                        })
                    })
                ]
            })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7540:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": () => (/* binding */ WebsiteFavicon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3325);




function WebsiteFavicon({ href , className  }) {
    const { 0: hasError , 1: setHasError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    let faviconURL = null;
    try {
        faviconURL = `${new URL(href).origin}/favicon.ico`;
    } catch  {
        faviconURL = null;
    }
    if (!faviconURL || hasError) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("h-4 w-4 shrink-0", className),
        iconName: "link"
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("h-4 w-4 shrink-0 rounded-sm object-contain", className),
        src: faviconURL,
        alt: "",
        loading: "lazy",
        referrerPolicy: "no-referrer",
        onError: ()=>setHasError(true)
    });
}


/***/ })

};
;