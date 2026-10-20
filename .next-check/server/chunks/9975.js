"use strict";
exports.id = 9975;
exports.ids = [9975];
exports.modules = {

/***/ 91:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "F": () => (/* binding */ SettingsFrame)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "clsx"
var external_clsx_ = __webpack_require__(8103);
var external_clsx_default = /*#__PURE__*/__webpack_require__.n(external_clsx_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/components/ui/material-icon.tsx + 2 modules
var material_icon = __webpack_require__(3325);
;// CONCATENATED MODULE: ./src/components/settings/settings-nav.tsx






const categories = [
    {
        key: "account",
        label: "Votre compte",
        iconName: "person",
        href: "/settings?view=account",
        matches: [
            "/settings",
            "/settings/username",
            "/settings/personalization"
        ]
    },
    {
        key: "monetization",
        label: "Mon\xe9tisation",
        iconName: "payments",
        disabled: true
    },
    {
        key: "premium",
        label: "Premium",
        iconName: "star",
        disabled: true
    },
    {
        key: "creators",
        label: "Abonnements de cr\xe9ateurs",
        iconName: "subscriptions",
        disabled: true
    },
    {
        key: "ai",
        label: "Intelligence artificielle",
        iconName: "auto_awesome_mosaic",
        href: "/settings/ai",
        matches: [
            "/settings/ai"
        ]
    },
    {
        key: "security",
        label: "S\xe9curit\xe9 et acc\xe8s au compte",
        iconName: "key",
        href: "/settings/security",
        matches: [
            "/settings/security"
        ]
    },
    {
        key: "privacy",
        label: "Confidentialit\xe9 et s\xe9curit\xe9",
        iconName: "lock",
        href: "/settings/privacy",
        matches: [
            "/settings/privacy"
        ]
    },
    {
        key: "notifications",
        label: "Notifications",
        iconName: "notifications",
        href: "/settings/notifications",
        matches: [
            "/settings/notifications"
        ]
    },
    {
        key: "accessibility",
        label: "Accessibilit\xe9, affichage et langues",
        iconName: "accessibility",
        href: "/settings/accessibility",
        matches: [
            "/settings/accessibility"
        ]
    },
    {
        key: "resources",
        label: "Ressources suppl\xe9mentaires",
        iconName: "help",
        disabled: true
    },
    {
        key: "help",
        label: "Centre d’aide",
        iconName: "support_agent",
        href: "/settings/help",
        matches: [
            "/settings/help"
        ]
    }
];
function isCategoryActive(category, pathname) {
    if (category.matches) return category.matches.includes(pathname);
    return Boolean(category.href && category.href.split("?")[0] === pathname);
}
function SettingsNav({ className  }) {
    const { pathname  } = (0,router_.useRouter)();
    const { 0: query , 1: setQuery  } = (0,external_react_.useState)("");
    const visibleCategories = (0,external_react_.useMemo)(()=>{
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return categories;
        return categories.filter(({ label  })=>label.toLowerCase().includes(normalizedQuery));
    }, [
        query
    ]);
    const handleQueryChange = (event)=>{
        setQuery(event.target.value);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("aside", {
        className: external_clsx_default()("w-full shrink-0 border-b border-light-border/70 bg-main-background dark:border-dark-border/70 lg:sticky lg:top-0 lg:h-[100dvh] lg:w-[340px] lg:overflow-y-auto lg:border-b-0 lg:border-r", className),
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col gap-4 px-4 py-5 xs:px-5",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex flex-col gap-1",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                className: "text-xl font-bold text-light-primary dark:text-dark-primary",
                                children: "R\xe9glages"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "text-sm text-light-secondary dark:text-dark-secondary",
                                children: "G\xe9rez votre compte et vos pr\xe9f\xe9rences."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        className: "flex items-center gap-2 rounded-full border border-transparent bg-main-search-background px-4 py-2.5 text-light-secondary transition focus-within:border-main-accent focus-within:ring-2 focus-within:ring-main-accent/20 dark:text-dark-secondary",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(material_icon/* MaterialIcon */.O, {
                                className: "h-5 w-5 shrink-0",
                                iconName: "search"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                "aria-label": "Rechercher dans les r\xe9glages",
                                autoComplete: "off",
                                className: "w-full bg-transparent text-sm text-light-primary outline-none placeholder:text-light-secondary dark:text-dark-primary dark:placeholder:text-dark-secondary",
                                onChange: handleQueryChange,
                                placeholder: "Rechercher dans les r\xe9glages",
                                spellCheck: false,
                                type: "search",
                                value: query
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
                "aria-label": "Cat\xe9gories des param\xe8tres",
                className: "flex flex-col gap-0.5 px-2 pb-4 xs:px-3",
                children: [
                    visibleCategories.map((category)=>{
                        const active = isCategoryActive(category, pathname);
                        const content = /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: external_clsx_default()("flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors", active ? "bg-main-accent/10 text-main-accent" : "bg-main-search-background/60 text-light-secondary dark:text-dark-secondary"),
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(material_icon/* MaterialIcon */.O, {
                                        className: "h-5 w-5",
                                        iconName: category.iconName
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "min-w-0 flex-1 truncate text-left",
                                    children: category.label
                                }),
                                category.soon || category.disabled ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "shrink-0 rounded-full bg-main-search-background px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary",
                                    children: "Bient\xf4t"
                                }) : active ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    "aria-hidden": "true",
                                    className: "h-2 w-2 shrink-0 rounded-full bg-main-accent"
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(material_icon/* MaterialIcon */.O, {
                                    className: "h-4 w-4 shrink-0 text-light-secondary/60 dark:text-dark-secondary/60",
                                    iconName: "chevron_right"
                                })
                            ]
                        });
                        if (category.disabled || !category.href) return /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            "aria-disabled": "true",
                            className: "flex cursor-not-allowed items-center gap-3 rounded-lg px-2.5 py-2 text-[15px] text-light-secondary/60 dark:text-dark-secondary/60",
                            title: "Bient\xf4t disponible",
                            children: content
                        }, category.key);
                        return /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: category.href,
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                "aria-current": active ? "page" : undefined,
                                className: external_clsx_default()("group flex items-center gap-3 rounded-lg px-2.5 py-2 text-[15px] transition-colors", active ? "bg-main-search-background font-semibold text-light-primary dark:text-dark-primary" : "text-light-primary hover:bg-main-search-background/60 dark:text-dark-primary dark:hover:bg-dark-primary/10"),
                                children: content
                            })
                        }, category.key);
                    }),
                    visibleCategories.length === 0 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                        className: "px-3 py-6 text-center text-sm text-light-secondary dark:text-dark-secondary",
                        children: [
                            "Aucun r\xe9glage ne correspond \xe0 \xab ",
                            query.trim(),
                            " \xbb."
                        ]
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/components/settings/settings-frame.tsx




/**
 * Cadre commun des paramètres : la colonne de catégories reste visible à
 * gauche et le contenu de la rubrique sélectionnée s'affiche à droite.
 *
 * Sur téléphone, une seule colonne est visible à la fois : la liste des
 * paramètres au départ, puis le détail après un clic. Cela évite d'afficher
 * le compte et toutes les rubriques à la suite sous la liste.
 */ function SettingsFrame({ children  }) {
    const { asPath , pathname  } = (0,router_.useRouter)();
    const isSettingsIndex = pathname === "/settings" && !asPath.includes("?");
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("main", {
        className: "flex min-h-[100dvh] w-full max-w-[1120px] flex-col self-start border-light-border/70 bg-main-background pb-28 dark:border-dark-border/70 xs:border-x xs:pb-12 lg:flex-row lg:pb-0",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(SettingsNav, {
                className: external_clsx_default()(isSettingsIndex ? "block" : "hidden", "lg:block")
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("section", {
                className: external_clsx_default()("min-w-0 flex-1", isSettingsIndex ? "hidden lg:block" : "block"),
                children: children
            })
        ]
    });
}


/***/ }),

/***/ 9975:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MN": () => (/* binding */ settingsPageLayout),
/* harmony export */   "NL": () => (/* binding */ SettingsShell),
/* harmony export */   "QQ": () => (/* binding */ SettingsSection),
/* harmony export */   "ZR": () => (/* binding */ SettingsRow),
/* harmony export */   "we": () => (/* binding */ SettingsCard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_common_seo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(585);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3325);
/* harmony import */ var _components_layout_main_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4415);
/* harmony import */ var _components_layout_common_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3238);
/* harmony import */ var _settings_frame__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(91);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_layout_main_layout__WEBPACK_IMPORTED_MODULE_6__, _components_layout_common_layout__WEBPACK_IMPORTED_MODULE_7__]);
([_components_layout_main_layout__WEBPACK_IMPORTED_MODULE_6__, _components_layout_common_layout__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









/**
 * Contenu d'une rubrique des paramètres. La navigation reste fournie par
 * `SettingsFrame`, ce qui permet de garder les catégories visibles à gauche.
 */ function SettingsShell({ title , seoTitle , description , children  }) {
    const { asPath , push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const handleBack = ()=>{
        void push("/settings");
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_seo__WEBPACK_IMPORTED_MODULE_4__/* .SEO */ .H, {
                title: seoTitle
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("header", {
                        className: "border-b border-light-border/70 px-4 py-5 dark:border-dark-border/70 xs:px-6",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-start gap-3",
                            children: [
                                asPath !== "/settings" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    "aria-label": "Retour aux r\xe9glages",
                                    className: "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-light-secondary transition-colors hover:bg-main-search-background hover:text-light-primary dark:text-dark-secondary dark:hover:bg-dark-primary/10 dark:hover:text-dark-primary",
                                    onClick: handleBack,
                                    title: "Retour aux param\xe8tres",
                                    type: "button",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                        className: "h-5 w-5",
                                        iconName: "arrow_back"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                            className: "text-xl font-bold text-light-primary dark:text-dark-primary",
                                            children: title
                                        }),
                                        description && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "mt-1 text-sm text-light-secondary dark:text-dark-secondary",
                                            children: description
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "flex flex-col gap-5 p-4 xs:p-6",
                        children: children
                    })
                ]
            })
        ]
    });
}
function SettingsCard({ title , description , iconName , danger , className , children  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
        className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("flex flex-col gap-4 rounded-xl border bg-main-background p-4 transition-colors dark:bg-main-background xs:p-5", danger ? "border-accent-red/40" : "border-light-border dark:border-dark-border", className),
        children: [
            (title || iconName) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start gap-3",
                children: [
                    iconName && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full", danger ? "bg-accent-red/10 text-accent-red" : "bg-main-search-background text-light-secondary dark:text-dark-secondary"),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                            className: "h-5 w-5",
                            iconName: iconName
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col gap-1",
                        children: [
                            title && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "text-lg font-bold text-light-primary dark:text-dark-primary",
                                children: title
                            }),
                            description && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-sm text-light-secondary dark:text-dark-secondary",
                                children: description
                            })
                        ]
                    })
                ]
            }),
            children
        ]
    });
}
function SettingsSection({ title , description , children  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
        className: "flex flex-col gap-2",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-1",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        className: "text-base font-bold text-light-primary dark:text-dark-primary",
                        children: title
                    }),
                    description && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "mt-0.5 text-sm text-light-secondary dark:text-dark-secondary",
                        children: description
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "overflow-hidden rounded-xl border border-light-border bg-main-background dark:border-dark-border",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "divide-y divide-light-border dark:divide-dark-border",
                    children: children
                })
            })
        ]
    });
}
function SettingsRow({ iconName , label , description , href , onClick , value , disabled , danger , className  }) {
    const interactive = !disabled && (href !== undefined || onClick !== undefined);
    const rowClassName = clsx__WEBPACK_IMPORTED_MODULE_3___default()("flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors", interactive && "cursor-pointer hover:bg-main-search-background/60 focus-visible:bg-main-search-background/60 focus-visible:outline-none dark:hover:bg-dark-primary/10 dark:focus-visible:bg-dark-primary/10", disabled && "cursor-not-allowed opacity-60", className);
    const content = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", danger ? "bg-accent-red/10 text-accent-red" : "bg-main-search-background text-light-secondary dark:text-dark-secondary"),
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                    className: "h-5 w-5",
                    iconName: iconName
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "flex min-w-0 flex-1 flex-col",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("text-sm font-semibold", danger ? "text-accent-red" : "text-light-primary dark:text-dark-primary"),
                        children: label
                    }),
                    description && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "mt-0.5 text-xs leading-5 text-light-secondary dark:text-dark-secondary",
                        children: description
                    })
                ]
            }),
            value !== undefined ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "max-w-[45%] truncate text-right text-sm font-semibold text-light-secondary dark:text-dark-secondary",
                children: value
            }) : disabled ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "shrink-0 rounded-full bg-main-search-background px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary",
                children: "Bient\xf4t"
            }) : interactive ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                className: "h-5 w-5 shrink-0 text-light-secondary dark:text-dark-secondary",
                iconName: "chevron_right"
            }) : null
        ]
    });
    if (href && !disabled) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: href,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
            className: rowClassName,
            children: content
        })
    });
    if (onClick && !disabled) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        className: rowClassName,
        onClick: onClick,
        type: "button",
        children: content
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: rowClassName,
        children: content
    });
}
function settingsPageLayout(page) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_layout_common_layout__WEBPACK_IMPORTED_MODULE_7__/* .ProtectedLayout */ .IP, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_layout_main_layout__WEBPACK_IMPORTED_MODULE_6__/* .MainLayout */ .Z, {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_settings_frame__WEBPACK_IMPORTED_MODULE_8__/* .SettingsFrame */ .F, {
                children: page
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;