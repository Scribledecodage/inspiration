"use strict";
exports.id = 7915;
exports.ids = [7915];
exports.modules = {

/***/ 7915:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ AvatarPickerModal)
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






/* Choix de l'avatar (forme, cadre ou photo) : une fenêtre centrée sur
   ordinateur, un menu qui remonte du bas sur téléphone. Le contenu est affiché
   dans le corps de la page (portail), pour ne jamais être rogné par la fenêtre
   de modification du profil dans laquelle il est ouvert. */ function AvatarPickerModal({ open , title , subtitle , options , value , gridClass , actions , optionsTitle , onClose , onSelect , renderPreview  }) {
    const { 0: mounted , 1: setMounted  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>setMounted(true), []);
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
                    "aria-label": title,
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
                                            children: title
                                        }),
                                        subtitle && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "mt-0.5 text-sm text-light-secondary dark:text-dark-secondary",
                                            children: subtitle
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    type: "button",
                                    onClick: onClose,
                                    "aria-label": "Fermer",
                                    className: "-mr-2 -mt-2 rounded-full p-2 text-light-primary transition hover:bg-light-primary/10 dark:text-dark-primary dark:hover:bg-dark-primary/10",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                        className: "h-5 w-5",
                                        iconName: "close"
                                    })
                                })
                            ]
                        }),
                        actions && actions.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "mb-4 flex flex-col gap-2",
                            children: actions.map((action)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    "aria-pressed": action.selected,
                                    onClick: action.onSelect,
                                    className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition", action.accent ? "border-main-accent/40 bg-main-accent/[0.07] hover:border-main-accent/70 hover:bg-main-accent/[0.14]" : "border-light-border hover:border-light-line-reply hover:bg-light-primary/[0.03] dark:border-dark-border dark:hover:border-dark-line-reply dark:hover:bg-dark-primary/[0.04]"),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("relative flex h-11 w-11 shrink-0 items-center justify-center", action.accent ? "text-main-accent" : "rounded-full bg-light-primary/[0.06] text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary"),
                                            children: action.preview ?? (action.iconName && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                                className: "h-5 w-5",
                                                iconName: action.iconName
                                            }))
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "flex min-w-0 flex-1 flex-col gap-0.5",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "truncate text-sm font-bold text-light-primary dark:text-dark-primary",
                                                    children: action.label
                                                }),
                                                action.description && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "truncate text-xs text-light-secondary dark:text-dark-secondary",
                                                    children: action.description
                                                })
                                            ]
                                        }),
                                        action.selected ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-main-accent text-white",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                                className: "h-3 w-3",
                                                iconName: "check"
                                            })
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                            className: "h-4 w-4 shrink-0 text-light-secondary transition group-hover:translate-x-0.5 dark:text-dark-secondary",
                                            iconName: "chevron_right"
                                        })
                                    ]
                                }, action.key))
                        }),
                        optionsTitle && options.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-light-secondary dark:text-dark-secondary",
                            children: optionsTitle
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("grid gap-3", gridClass ?? "grid-cols-2 xs:grid-cols-3"),
                            children: options.map(([key, label])=>{
                                const isSelected = value === key;
                                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    "aria-pressed": isSelected,
                                    onClick: ()=>onSelect(key),
                                    className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("flex flex-col items-center gap-2 rounded-md border px-2 py-4 text-center text-[11px] leading-none transition-colors duration-150", isSelected ? "border-main-accent bg-main-accent/10 font-bold text-main-accent" : "border-light-border text-light-secondary hover:bg-light-primary/5 hover:text-light-primary dark:border-dark-border dark:text-dark-secondary dark:hover:bg-dark-primary/5 dark:hover:text-dark-primary"),
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "relative flex h-12 items-center justify-center",
                                            children: [
                                                renderPreview(key),
                                                isSelected && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "absolute -right-1.5 -top-0.5 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-main-accent text-white ring-2 ring-main-background",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                                        className: "h-2.5 w-2.5",
                                                        iconName: "check"
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "max-w-full truncate",
                                            children: label
                                        })
                                    ]
                                }, key);
                            })
                        })
                    ]
                })
            ]
        })
    }), document.body);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;