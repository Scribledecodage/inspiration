"use strict";
exports.id = 5514;
exports.ids = [5514];
exports.modules = {

/***/ 643:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "V": () => (/* binding */ Placeholder)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _seo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(585);


function Placeholder() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
        className: "min-h-screen bg-main-background",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_seo__WEBPACK_IMPORTED_MODULE_1__/* .SEO */ .H, {
            title: "Inspiration — Un r\xe9seau social pens\xe9 pour rapprocher les gens",
            description: "Inspiration, le r\xe9seau social pens\xe9 pour rapprocher les gens.",
            image: "/Discussion.jpg"
        })
    });
}


/***/ }),

/***/ 5439:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ SiteLogo)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ui_next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4664);



function SiteLogo({ size =48 , className , imgClassName  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_next_image__WEBPACK_IMPORTED_MODULE_2__/* .NextImage */ .o, {
        src: "/LogoSite.png",
        alt: "Inspiration",
        width: size,
        height: size,
        className: className,
        imgClassName: clsx__WEBPACK_IMPORTED_MODULE_1___default()("object-contain", imgClassName)
    });
}


/***/ }),

/***/ 9099:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "oC": () => (/* binding */ modal),
/* harmony export */   "u_": () => (/* binding */ Modal),
/* harmony export */   "zi": () => (/* binding */ backdrop)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1185);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__, _headlessui_react__WEBPACK_IMPORTED_MODULE_2__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_1__, _headlessui_react__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const variants = [
    {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        }
    },
    {
        initial: {
            opacity: 0,
            scale: 0.8
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                duration: 0.5,
                bounce: 0.4
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.15
            }
        }
    }
];
const [backdrop, modal] = variants;
/* La bibliothèque qui verrouille la page pose son verrou sur l'élément
   <html> et mémorise la valeur qu'elle trouve. Quand deux fenêtres
   s'enchaînent (le menu « Plus » puis la fenêtre Apparence), la seconde
   mémorise le verrou de la première et le restitue à sa fermeture : la page
   reste alors bloquée, sans aucun défilement possible.

   On garde donc l'état réel du défilement — capturé AVANT l'ouverture, sinon
   le verrou est déjà posé — et on le restaure à la fermeture de la dernière
   fenêtre. */ let openModalCount = 0;
let pageScrollSnapshot = null;
/* Délai après la fermeture avant de restaurer le défilement : laisse le
   temps à la bibliothèque de rendre la main et à l'animation de sortie de se
   terminer. */ const SCROLL_RELEASE_DELAY = 300;
function captureScrollState() {
    if (typeof document === "undefined") return {
        htmlOverflow: "",
        htmlPaddingRight: "",
        bodyOverflow: "",
        bodyPaddingRight: ""
    };
    return {
        htmlOverflow: document.documentElement.style.overflow,
        htmlPaddingRight: document.documentElement.style.paddingRight,
        bodyOverflow: document.body.style.overflow,
        bodyPaddingRight: document.body.style.paddingRight
    };
}
/* Une fenêtre native du navigateur (le sélecteur d'emoji) est ouverte
   par-dessus la fenêtre courante. */ function hasOpenNativePopover() {
    try {
        return Boolean(document.querySelector("[popover]:popover-open"));
    } catch  {
        return false;
    }
}
function restoreScrollState(snapshot) {
    if (typeof document === "undefined") return;
    const state = snapshot ?? {
        htmlOverflow: "",
        htmlPaddingRight: "",
        bodyOverflow: "",
        bodyPaddingRight: ""
    };
    document.documentElement.style.overflow = state.htmlOverflow;
    document.documentElement.style.paddingRight = state.htmlPaddingRight;
    document.body.style.overflow = state.bodyOverflow;
    document.body.style.paddingRight = state.bodyPaddingRight;
}
function Modal({ open , children , className , modalAnimation , modalClassName , closePanelOnClick , drag , dragControls , dragListener , dragUp , dragConstraints , dragElastic , dragMomentum , dragSnapToOrigin , onDragEnd , onDrag , closeOnBackdropClick , closeModal  }) {
    const panelRef = (0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);
    /* L'état du défilement est capturé pendant le rendu, donc AVANT que la
     bibliothèque ne pose son verrou (les effets ne tournent qu'ensuite). */ if (open && !pageScrollSnapshot && typeof document !== "undefined") pageScrollSnapshot = captureScrollState();
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{
        if (!open) {
            /* La fenêtre vient d'être fermée : une fois l'animation de sortie
         terminée, on rend le défilement à la page — sauf si une autre
         fenêtre est encore ouverte. */ const timeout = setTimeout(()=>{
                if (openModalCount > 0) return;
                restoreScrollState(pageScrollSnapshot);
                pageScrollSnapshot = null;
            }, SCROLL_RELEASE_DELAY);
            return ()=>clearTimeout(timeout);
        }
        openModalCount += 1;
        return ()=>{
            openModalCount = Math.max(0, openModalCount - 1);
            // Sécurité : si la fenêtre est démontée alors qu'elle était ouverte, on
            // restaure tout de suite le défilement de la page.
            if (openModalCount === 0) {
                restoreScrollState(pageScrollSnapshot);
                pageScrollSnapshot = null;
            }
        };
    }, [
        open
    ]);
    /* Demande de fermeture du navigateur (clic dehors, touche Échap). Si une
     fenêtre native est ouverte par-dessus — le sélecteur d'emoji —, on
     l'ignore : le clic qui referme cette fenêtre viserait la page en
     dessous, et fermerait cette fenêtre-ci par la même occasion. */ const handleCloseRequest = ()=>{
        if (hasOpenNativePopover()) return;
        closeModal();
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.AnimatePresence, {
        children: open && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Dialog, {
            className: "relative z-50",
            open: open,
            onClose: handleCloseRequest,
            initialFocus: panelRef,
            /* `static` empêche HeadlessUI de fermer au clic sur le fond ou à
             la touche Échap. On ne le garde que pour les fenêtres qui doivent
             rester ouvertes (sélecteur d'emoji). */ static: !closeOnBackdropClick,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
                    className: "hover-animation fixed inset-0 bg-black/40 dark:bg-[#5B7083]/40",
                    "aria-hidden": "true",
                    ...backdrop,
                    /* Le clic sur le fond ferme la fenêtre lorsqu'elle le demande
               (sélecteur d'emoji) ; sinon il reste sans effet, comme avant. */ onClick: (event)=>{
                        if (!closeOnBackdropClick) {
                            event.stopPropagation();
                            return;
                        }
                        event.stopPropagation();
                        closeModal();
                    }
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("fixed inset-0 overflow-y-auto", className ?? "flex items-center justify-center p-4"),
                    /* Les événements React remontent l'arbre des composants, même à
               travers le portail : sans cela, le clic qui ferme la fenêtre
               atteindrait aussi la publication située derrière et l'ouvrirait.
               On laisse quand même remonter le clic pour les fenêtres qui se
               ferment au clic dehors. */ onClick: (event)=>{
                        event.stopPropagation();
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Dialog.Panel, {
                        ref: panelRef,
                        className: modalClassName,
                        tabIndex: -1,
                        as: framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div,
                        drag: drag,
                        dragControls: dragControls,
                        dragListener: dragListener,
                        dragConstraints: /* Vers le haut, la fenêtre est libre de monter sur la distance
                   indiquée ; vers le bas, elle n'a pas de limite (c'est elle
                   qui permet de fermer la fenêtre en la tirant vers le bas). */ drag === "y" ? {
                            top: -(dragUp ?? 0)
                        } : dragConstraints,
                        dragElastic: drag === "y" ? {
                            top: dragUp ? 0.2 : 0,
                            bottom: 0.5
                        } : dragElastic,
                        dragMomentum: dragMomentum,
                        dragSnapToOrigin: dragSnapToOrigin ?? Boolean(drag),
                        onDragEnd: onDragEnd,
                        onDrag: onDrag,
                        ...modalAnimation ?? modal,
                        onClick: closePanelOnClick ? closeModal : undefined,
                        /* Échap ne ferme que la fenêtre du dessus : sans cela, il
                 fermerait aussi la fenêtre qui l'a ouverte (la feuille de
                 publication, par exemple). */ onKeyDown: (event)=>{
                            if (event.key === "Escape") event.stopPropagation();
                        },
                        children: children
                    })
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4664:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ NextImage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_3__);




/**
 *
 * @description Must set width and height, if not add layout='fill'
 * @param useSkeleton show a neutral background under the image until it is
 * loaded (don't use it if image is transparent)
 */ function NextImage({ src , alt , width , height , children , className , useSkeleton , imgClassName , previewCount , blurClassName , ...rest }) {
    /* L'image apparaît dans une zone DÈJÀ réservée : elle se fond sur son
     fond, sans jamais changer de taille.

     Avant, la classe de l'image était remplacée au chargement (fond gris
     pulsé → image) : chaque publication qui arrivait au défilement faisait
     clignoter un rectangle clair, puis l'image se recalait à une autre
     taille. C'était le « flash » et le « ça bouge » du fil.

     On retient l'adresse de l'image qui a fini de charger : l'image n'est
     considérée comme prête que si c'est bien celle qui est affichée (sinon
     une image déjà en cache resterait invisible). */ const { 0: loadedSrc , 1: setLoadedSrc  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const loaded = !useSkeleton || loadedSrc === src;
    const handleLoad = ()=>setLoadedSrc(src);
    /* Si l'appelant a déjà prévu une transition, on ne la remplace pas : la
     transition par défaut de Tailwind inclut déjà l'opacité. */ const hasOwnTransition = imgClassName?.includes("transition") ?? false;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("figure", {
        style: {
            width
        },
        className: clsx__WEBPACK_IMPORTED_MODULE_3___default()(className, "relative", rest.layout === "fill" && "h-full w-full"),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                className: clsx__WEBPACK_IMPORTED_MODULE_3___default()(imgClassName, /* Le cadrage ne change plus au chargement : une image seule garde
             la taille de la zone réservée (elle n'est ni rognée, ni
             redimensionnée quand elle arrive). */ previewCount === 1 ? "!h-full !w-full !object-contain" : "object-cover", !hasOwnTransition && "transition-opacity duration-200 ease-out", loaded ? "opacity-100" : "opacity-0"),
                src: src,
                width: width,
                height: height,
                alt: alt,
                onLoadingComplete: handleLoad,
                ...rest,
                layout: rest.layout ?? "responsive"
            }),
            !loaded && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                "aria-hidden": "true",
                className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("pointer-events-none absolute inset-0", blurClassName ?? "bg-light-secondary/40 dark:bg-dark-secondary/40")
            }),
            children
        ]
    });
}


/***/ }),

/***/ 6269:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DX": () => (/* binding */ getStatsMove),
/* harmony export */   "Db": () => (/* binding */ preventBubbling),
/* harmony export */   "_v": () => (/* binding */ sleep),
/* harmony export */   "uz": () => (/* binding */ isPlural),
/* harmony export */   "wX": () => (/* binding */ delayScroll)
/* harmony export */ });
function preventBubbling(callback, noPreventDefault) {
    return (e)=>{
        e.stopPropagation();
        if (!noPreventDefault) e.preventDefault();
        if (callback) callback();
    };
}
function delayScroll(ms) {
    return ()=>setTimeout(()=>window.scrollTo(0, 0), ms);
}
function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
function getStatsMove(movePixels) {
    return {
        initial: {
            opacity: 0,
            y: -movePixels
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: movePixels
        },
        transition: {
            type: "tween",
            duration: 0.15
        }
    };
}
function isPlural(count) {
    return count > 1 ? "s" : "";
}


/***/ })

};
;