"use strict";
exports.id = 9907;
exports.ids = [9907];
exports.modules = {

/***/ 1471:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ LinkifiedText)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_link_preview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1565);





/**
 * Texte dans lequel les liens deviennent cliquables et colorés.
 *
 * Sur une bulle de couleur (message envoyé), le bleu de l'accent se confondrait
 * avec le fond : le lien passe alors en blanc souligné, comme dans WhatsApp.
 */ function LinkifiedText({ text , className , mine =false  }) {
    const parts = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>(0,_lib_link_preview__WEBPACK_IMPORTED_MODULE_4__/* .splitLinks */ .mM)(text), [
        text
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: className,
        children: parts.map((part, index)=>part.type === "link" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                href: part.value,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    className: clsx__WEBPACK_IMPORTED_MODULE_3___default()(/* Le lien reste sur une seule ligne : une URL complète est
                   illisible et ferait déborder la bulle. Le titre complet reste
                   accessible via l'attribut `title`. */ "inline-block max-w-full truncate align-bottom font-medium underline underline-offset-2", mine ? "text-white decoration-white/60 hover:decoration-white" : "text-main-accent decoration-main-accent/40 hover:decoration-main-accent"),
                    title: part.value,
                    rel: "noopener noreferrer nofollow",
                    target: "_blank",
                    children: part.value
                })
            }, `${part.value}-${index}`) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                children: part.value
            }, `text-${index}`))
    });
}


/***/ }),

/***/ 4898:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ VoterStack)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_media__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8540);
/* harmony import */ var _lib_avatar_shape__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8829);
/* harmony import */ var _components_user_avatar_frame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8800);





/** Nombre d'avatars superposés au maximum. */ const MAX_AVATARS = 3;
/**
 * Avatars des personnes ayant coché un choix : empilés et légèrement
 * chevauchés. Utilisé par les sondages des publications et des messages, pour
 * qu'ils se ressemblent.
 */ function VoterStack({ voters , className , size =20 , countClassName  }) {
    const shown = voters.slice(0, MAX_AVATARS);
    const extra = voters.length - shown.length;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("flex shrink-0 items-center", className),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "flex",
                children: shown.map((vote, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("relative block overflow-hidden bg-main-search-background", (0,_lib_avatar_shape__WEBPACK_IMPORTED_MODULE_3__/* .getAvatarShapeClass */ ._M)(vote.avatarShape)),
                        style: {
                            width: size,
                            height: size,
                            marginLeft: index === 0 ? 0 : -Math.round(size * 0.4),
                            zIndex: shown.length - index
                        },
                        title: vote.name || `@${vote.username}`,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                className: "block h-full w-full object-cover",
                                src: (0,_lib_media__WEBPACK_IMPORTED_MODULE_2__/* .getAvatarSrc */ .SJ)(vote.photoURL, vote.gender),
                                alt: `Avatar de ${vote.name || vote.username}`,
                                height: size,
                                width: size,
                                loading: "lazy"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_avatar_frame__WEBPACK_IMPORTED_MODULE_4__/* .AvatarDecoration */ .z, {
                                frame: vote.avatarFrame
                            })
                        ]
                    }, `${vote.username}-${index}`))
            }),
            extra > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("ml-1 text-xs", countClassName ?? "text-light-secondary dark:text-dark-secondary"),
                children: [
                    "+",
                    extra
                ]
            })
        ]
    });
}


/***/ }),

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

/***/ 8613:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ LocationMapModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_context_window_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6625);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9099);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_modal__WEBPACK_IMPORTED_MODULE_4__]);
_modal__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/* eslint-disable @typescript-eslint/no-unsafe-assignment */ /* eslint-disable @typescript-eslint/no-unsafe-member-access */ /* eslint-disable @typescript-eslint/no-unsafe-call */ /* eslint-disable @typescript-eslint/no-unsafe-argument */ /* eslint-disable @typescript-eslint/no-explicit-any */ 






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
/* Charge Leaflet (gratuit, sans clé) depuis le CDN si nécessaire. */ function loadLeaflet() {
    if (true) return Promise.reject(new Error("no window"));
    if (window.L) return Promise.resolve(window.L);
    return new Promise((resolve, reject)=>{
        if (!document.querySelector("link[data-leaflet]")) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            link.setAttribute("data-leaflet", "1");
            document.head.appendChild(link);
        }
        const existing = document.querySelector("script[data-leaflet]");
        if (existing) {
            existing.addEventListener("load", ()=>resolve(window.L));
            existing.addEventListener("error", reject);
            return;
        }
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.setAttribute("data-leaflet", "1");
        script.async = true;
        script.onload = ()=>resolve(window.L);
        script.onerror = ()=>reject(new Error("Leaflet load failed"));
        document.head.appendChild(script);
    });
}
/* Fenêtre qui affiche un vrai plan (OpenStreetMap / Esri satellite) pour le
   lieu d'une publication. Sur mobile elle s'ouvre comme un menu collé au bas. */ function LocationMapModal({ open , closeModal , location  }) {
    const { isMobile  } = (0,_lib_context_window_context__WEBPACK_IMPORTED_MODULE_3__/* .useWindow */ .zY)();
    const mapContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const mapRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const layersRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({});
    const { 0: mode , 1: setMode  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("standard");
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { 0: error , 1: setError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        let cancelled = false;
        const setup = async ()=>{
            setLoading(true);
            setError(null);
            try {
                const L = await loadLeaflet();
                if (cancelled || !mapContainerRef.current) return;
                // Géocodage du lieu pour centrer la carte.
                let lat = 0;
                let lon = 0;
                try {
                    const res = await fetch(`/api/location/geocode?q=${encodeURIComponent(location)}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.lat != null && data.lon != null) {
                            lat = data.lat;
                            lon = data.lon;
                        }
                    }
                } catch  {
                // on garde 0,0
                }
                if (cancelled || !mapContainerRef.current) return;
                const map = L.map(mapContainerRef.current, {
                    zoomControl: true
                });
                const standard = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "\xa9 OpenStreetMap"
                });
                const satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
                    attribution: "\xa9 Esri"
                });
                standard.addTo(map);
                layersRef.current = {
                    standard,
                    satellite
                };
                const startZoom = lat && lon ? 13 : 2;
                map.setView([
                    lat || 20,
                    lon || 0
                ], startZoom);
                if (lat && lon) {
                    L.marker([
                        lat,
                        lon
                    ]).addTo(map).bindPopup(location).openPopup();
                }
                mapRef.current = map;
            } catch  {
                if (!cancelled) setError("Impossible de charger la carte.");
            } finally{
                if (!cancelled) setLoading(false);
            }
        };
        // Laisser le DOM s'afficher avant d'initialiser Leaflet.
        const timer = window.setTimeout(()=>void setup(), 50);
        return ()=>{
            cancelled = true;
            window.clearTimeout(timer);
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
            layersRef.current = {};
        };
    }, [
        open,
        location
    ]);
    // Bascule de couche (plan / satellite).
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const map = mapRef.current;
        const layers = layersRef.current;
        if (!map || !layers.standard || !layers.satellite) return;
        if (mode === "standard") {
            map.removeLayer(layers.satellite);
            layers.standard.addTo(map);
        } else {
            map.removeLayer(layers.standard);
            layers.satellite.addTo(map);
        }
    }, [
        mode
    ]);
    const useGPS = ()=>{
        if (!navigator.geolocation) {
            setError("G\xe9olocalisation indisponible.");
            return;
        }
        navigator.geolocation.getCurrentPosition(({ coords  })=>{
            const map = mapRef.current;
            const L = window.L;
            if (map && L) {
                map.setView([
                    coords.latitude,
                    coords.longitude
                ], 15);
                L.marker([
                    coords.latitude,
                    coords.longitude
                ]).addTo(map).bindPopup("Ma position").openPopup();
            }
        }, ()=>setError("Acc\xe8s \xe0 la position refus\xe9."), {
            timeout: 10000
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_modal__WEBPACK_IMPORTED_MODULE_4__/* .Modal */ .u_, {
        open: open,
        closeModal: closeModal,
        className: isMobile ? "flex items-end !p-0" : undefined,
        modalAnimation: isMobile ? sheetAnimation : undefined,
        modalClassName: isMobile ? "w-full overflow-hidden rounded-t-3xl border-t border-light-border bg-main-background pb-[env(safe-area-inset-bottom)] dark:border-dark-border" : "w-full max-w-2xl overflow-hidden rounded-lg bg-main-background shadow-xl",
        drag: isMobile ? "y" : undefined,
        onDragEnd: (_, info)=>{
            if (isMobile && info.offset.y > 80) closeModal();
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between border-b border-light-border px-4 py-3 dark:border-dark-border",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("font-bold", isMobile ? "mt-4 text-lg" : "text-xl"),
                        children: location
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
                className: "relative",
                children: [
                    loading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "absolute inset-0 z-[1000] flex items-center justify-center bg-main-background/70",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "inline-block h-6 w-6 animate-spin rounded-full border-2 border-main-accent border-t-transparent"
                        })
                    }),
                    error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "px-4 py-2 text-sm text-accent-red",
                        children: error
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        ref: mapContainerRef,
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("w-full", isMobile ? "h-[45vh]" : "h-[60vh]")
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-wrap items-center gap-2 border-t border-light-border px-4 py-3 dark:border-dark-border",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("rounded-full px-3 py-1.5 text-sm font-bold", mode === "standard" ? "bg-main-accent text-white" : "hover:bg-main-accent/10 text-main-accent"),
                        onClick: ()=>setMode("standard"),
                        children: "Plan"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("rounded-full px-3 py-1.5 text-sm font-bold", mode === "satellite" ? "bg-main-accent text-white" : "hover:bg-main-accent/10 text-main-accent"),
                        onClick: ()=>setMode("satellite"),
                        children: "Satellite"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .z, {
                        className: "rounded-full px-3 py-1.5 text-sm font-bold text-main-accent hover:bg-main-accent/10",
                        onClick: useGPS,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_6__/* .MaterialIcon */ .O, {
                                className: "mr-1 inline h-4 w-4",
                                iconName: "location_on"
                            }),
                            "Ma position"
                        ]
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;