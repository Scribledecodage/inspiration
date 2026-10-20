"use strict";
exports.id = 7761;
exports.ids = [7761];
exports.modules = {

/***/ 8829:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_M": () => (/* binding */ getAvatarShapeClass),
/* harmony export */   "eA": () => (/* binding */ avatarShapeLabels),
/* harmony export */   "iU": () => (/* binding */ getAvatarFrameLabel),
/* harmony export */   "ln": () => (/* binding */ isMaskedAvatarShape),
/* harmony export */   "nI": () => (/* binding */ getAvatarFrameDecoration),
/* harmony export */   "qm": () => (/* binding */ avatarFrameOptions),
/* harmony export */   "yV": () => (/* binding */ avatarShapeOptions)
/* harmony export */ });
/* Formes d'image de profil proposées : le rond (par défaut), puis les formes
   découpées par les masques de la bibliothèque daisyUI (préfixés « dy- » pour
   ne rien changer au reste du site). */ const avatarShapeOptions = [
    [
        "circle",
        "Rond"
    ],
    [
        "squircle",
        "Squircle"
    ],
    [
        "heart",
        "Cœur"
    ],
    [
        "diamond",
        "Losange"
    ],
    [
        "hexagon",
        "Hexagone"
    ]
];
/* Nom de chaque forme, y compris celles qu'on ne propose plus (les profils
   enregistrés avant gardent leur forme et son nom). */ const avatarShapeLabels = {
    circle: "Rond",
    square: "Carr\xe9",
    squircle: "Squircle",
    heart: "Cœur",
    diamond: "Losange",
    hexagon: "Hexagone"
};
/* Cadres de l'avatar : « Aucun » ou une décoration d'avatar (image PNG posée
   autour de la photo, comme les décorations Discord). */ const avatarFrameOptions = [
    [
        "none",
        "Aucun"
    ],
    [
        "clown",
        "Clown"
    ],
    [
        "warp_helmet",
        "Casque spatial"
    ],
    [
        "mokoko",
        "Mokoko"
    ],
    [
        "sakura_gyoiko",
        "Sakura"
    ],
    [
        "victory_crown",
        "Couronne de vainqueur"
    ],
    [
        "freezer_bunny_lovebug",
        "Lapin des neiges"
    ],
    [
        "tga_controller",
        "Manette TGA"
    ],
    [
        "shield_potion",
        "Bouclier potion"
    ],
    [
        "fuchsia_agent",
        "Agent fuchsia"
    ],
    [
        "wingmans_got_it",
        "Wingman"
    ],
    [
        "heart_to_heart",
        "Cœur \xe0 cœur"
    ],
    [
        "los_santos",
        "Los Santos"
    ],
    [
        "shadow",
        "Ombre"
    ],
    [
        "rec_room_lightning",
        "\xc9clair Rec Room"
    ],
    [
        "new_year_2025",
        "Nouvel an 2025"
    ],
    [
        "bush_camper",
        "Buisson campeur"
    ],
    [
        "hailey",
        "Hailey"
    ]
];
/* Décorations d'avatar : l'image est posée autour de la photo, avec son
   centre transparent au niveau du visage. */ const frameDecorationSrc = {
    clown: "https://img.avatardecoration.com/decorations/im_a_clown.png",
    warp_helmet: "https://img.avatardecoration.com/decorations/warp_helmet.png",
    mokoko: "https://img.avatardecoration.com/decorations/mokoko.png",
    sakura_gyoiko: "https://img.avatardecoration.com/decorations/sakura_gyoiko.png",
    victory_crown: "https://img.avatardecoration.com/decorations/victory_crown.png",
    freezer_bunny_lovebug: "https://img.avatardecoration.com/decorations/freezer_bunny_lovebug.png",
    tga_controller: "https://img.avatardecoration.com/decorations/tga_controller.png",
    shield_potion: "https://img.avatardecoration.com/decorations/shield_potion.png",
    fuchsia_agent: "https://img.avatardecoration.com/decorations/fuchsia_agent.png",
    wingmans_got_it: "https://img.avatardecoration.com/decorations/wingmans_got_it.png",
    heart_to_heart: "https://img.avatardecoration.com/decorations/heart_to_heart.png",
    los_santos: "https://img.avatardecoration.com/decorations/los_santos.png",
    shadow: "https://img.avatardecoration.com/decorations/shadow.png",
    rec_room_lightning: "https://img.avatardecoration.com/decorations/rec_room_lightning.png",
    new_year_2025: "https://img.avatardecoration.com/decorations/new_year_2025.png",
    bush_camper: "https://img.avatardecoration.com/decorations/bush_camper.png",
    hailey: "https://img.avatardecoration.com/decorations/hailey.png"
};
/* Masques daisyUI : ils s'appliquent au conteneur, qui découpe donc à la fois
   la photo et l'avatar de repli placé derrière. Le squircle a son propre
   masque : celui de la bibliothèque est presque un rond, invisible à cette
   taille (voir « .avatar-squircle » dans les styles). */ const shapeMaskClass = {
    square: "dy-mask dy-mask-square",
    squircle: "avatar-squircle",
    heart: "dy-mask dy-mask-heart",
    diamond: "dy-mask dy-mask-diamond",
    hexagon: "dy-mask dy-mask-hexagon-2"
};
/* Anciennes formes : elles donnent le carré (net, sans coins arrondis). */ const legacyShapeClass = "dy-mask dy-mask-square";
/* Classe à poser sur le conteneur de l'avatar (celui qui porte le masque,
   jamais la photo directement). */ function getAvatarShapeClass(shape) {
    if (!shape || shape === "circle") return "avatar-circle";
    return shapeMaskClass[shape] ?? legacyShapeClass;
}
/* Adresse de la décoration d'avatar choisie (aucune si le cadre est vide). */ function getAvatarFrameDecoration(frame) {
    return frame ? frameDecorationSrc[frame] : undefined;
}
/* Nom du cadre affiché (celui de la liste, sinon « Aucun »). */ function getAvatarFrameLabel(frame) {
    return avatarFrameOptions.find(([frameKey])=>frameKey === frame)?.[1] ?? "Aucun";
}
/* La forme est-elle découpée par un masque (et non un simple rond) ? Les
   formes masquées ne supportent ni bordure ni fond supplémentaires : ils
   seraient découpés et laisseraient des vides autour de la photo. */ function isMaskedAvatarShape(shape) {
    return getAvatarShapeClass(shape) !== "avatar-circle";
}


/***/ }),

/***/ 5655:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fg": () => (/* binding */ useTheme),
/* harmony export */   "ze": () => (/* binding */ ThemeContextProvider)
/* harmony export */ });
/* unused harmony export ThemeContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7359);
/* harmony import */ var _lib_avatar_shape__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8829);
/* harmony import */ var _lib_fonts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9449);
/* harmony import */ var _auth_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2108);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_2__, _auth_context__WEBPACK_IMPORTED_MODULE_5__]);
([_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_2__, _auth_context__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* eslint-disable react-hooks/exhaustive-deps */ 





const ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const systemThemeQuery = "(prefers-color-scheme: dark)";
const availableThemes = [
    "auto",
    "light",
    "dim",
    "dark"
];
function normalizeTheme(theme) {
    return availableThemes.includes(theme) ? theme : "auto";
}
/* Thème réellement peint à l'écran. « Automatique » suit le réglage du
   système : bleu nuit la nuit, interface claire le jour. */ function resolveTheme(theme) {
    if (theme !== "auto") return theme;
    const prefersDark =  false && 0;
    return prefersDark ? "dim" : "light";
}
function setInitialTheme() {
    if (true) return "auto";
    /* « Automatique » est le choix par défaut : l'interface suit le réglage
     clair / sombre du système tant que rien n'a été sélectionné. */ return normalizeTheme(localStorage.getItem("theme"));
}
/* Applique le thème directement sur <html>, sans attendre le prochain rendu
   React. Le clic sur Automatique / Clair / Sombre / Noir absolu est donc
   instantané, même si l'interface contient beaucoup d'éléments à repeindre. */ function applyTheme(theme) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const resolvedTheme = resolveTheme(theme);
    const targetTheme = resolvedTheme === "dim" ? "dark" : resolvedTheme;
    /* `data-theme` pilote les tons de texte et de bordure propres à chaque
     ambiance (voir globals.scss), `color-scheme` adapte les contrôles natifs. */ root.setAttribute("data-theme", resolvedTheme);
    root.style.colorScheme = targetTheme === "dark" ? "dark" : "light";
    root.classList.toggle("dark", targetTheme === "dark");
    root.style.setProperty("--main-background", `var(--${resolvedTheme}-background)`);
    root.style.setProperty("--main-search-background", `var(--${resolvedTheme}-search-background)`);
    root.style.setProperty("--main-sidebar-background", `var(--${resolvedTheme}-sidebar-background)`);
    localStorage.setItem("theme", theme);
}
function applyAccent(accent) {
    if (typeof document === "undefined") return;
    document.documentElement.style.setProperty("--main-accent", `var(--accent-${accent})`);
    localStorage.setItem("accent", accent);
}
function applyFont(font) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const stack = _lib_fonts__WEBPACK_IMPORTED_MODULE_4__/* .fontStacks */ .SA[font];
    root.style.setProperty("--font-main", stack);
    root.style.setProperty("--font-title", stack);
    localStorage.setItem("font", font);
}
const availableAccents = [
    "blue",
    "indigo",
    "pink",
    "purple",
    "red",
    "green"
];
function normalizeAccent(accent) {
    if (availableAccents.includes(accent)) return accent;
    /* Anciennes couleurs retirées : le jaune, l'orange et le cyan manquaient
     de contraste ou se confondaient avec le bleu. On les remplace par les
     teintes les plus proches de la palette actuelle. */ if (accent === "yellow" || accent === "cyan") return "indigo";
    if (accent === "orange") return "red";
    return "blue";
}
function setInitialAccent() {
    if (true) return "blue";
    return normalizeAccent(localStorage.getItem("accent"));
}
function setInitialFont() {
    if (true) return _lib_fonts__WEBPACK_IMPORTED_MODULE_4__/* .DEFAULT_FONT */ .Uo;
    return (0,_lib_fonts__WEBPACK_IMPORTED_MODULE_4__/* .normalizeFont */ .kG)(localStorage.getItem("font"));
}
/* Formes encore proposées aujourd'hui. Toutes les anciennes (fleur, nuage,
   ovale, rosette, carré arrondi, étoile, pentagone, décagone, triangle…)
   deviennent le carré : les profils enregistrés avant le changement gardent
   ainsi une forme cohérente. */ const avatarShapes = [
    "circle",
    "square",
    "squircle",
    "heart",
    "diamond",
    "hexagon"
];
function normalizeAvatarShape(shape) {
    if (!shape) return "circle";
    return avatarShapes.includes(shape) ? shape : "square";
}
function setInitialAvatarShape() {
    if (true) return "circle";
    const savedShape = localStorage.getItem("avatarShape");
    return normalizeAvatarShape(savedShape);
}
/* Cadres encore proposés : « aucun » et les décorations d'avatar. Tous les
   anciens cadres (halo, anneau, double, dégradé, pointillé, néon, or) ne
   dessinent plus rien. */ function normalizeAvatarFrame(frame) {
    return _lib_avatar_shape__WEBPACK_IMPORTED_MODULE_3__/* .avatarFrameOptions.some */ .qm.some(([frameKey])=>frameKey === frame) ? frame : "none";
}
function setInitialAvatarFrame() {
    if (true) return "none";
    const savedFrame = localStorage.getItem("avatarFrame");
    return normalizeAvatarFrame(savedFrame);
}
function ThemeContextProvider({ children  }) {
    const { 0: theme , 1: setTheme  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(setInitialTheme);
    const { 0: accent , 1: setAccent  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(setInitialAccent);
    const { 0: font , 1: setFont  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(setInitialFont);
    const { 0: avatarShape , 1: setAvatarShape  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(setInitialAvatarShape);
    const { 0: avatarFrame , 1: setAvatarFrame  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(setInitialAvatarFrame);
    const { user  } = (0,_auth_context__WEBPACK_IMPORTED_MODULE_5__/* .useAuth */ .aC)();
    const { id: userId , theme: userTheme , accent: userAccent , avatarShape: userAvatarShape , avatarFrame: userAvatarFrame , customFont: userCustomFont  } = user ?? {};
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user && userTheme) setTheme(normalizeTheme(userTheme));
    }, [
        userId,
        userTheme
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user && userAccent) setAccent(normalizeAccent(userAccent));
    }, [
        userId,
        userAccent
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user && userAvatarShape) setAvatarShape(normalizeAvatarShape(userAvatarShape));
    }, [
        userId,
        userAvatarShape
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user && userAvatarFrame) setAvatarFrame(normalizeAvatarFrame(userAvatarFrame));
    }, [
        userId,
        userAvatarFrame
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (user && userCustomFont) setFont((0,_lib_fonts__WEBPACK_IMPORTED_MODULE_4__/* .normalizeFont */ .kG)(userCustomFont));
    }, [
        userId,
        userCustomFont
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        applyTheme(theme);
    }, [
        theme
    ]);
    /* En mode « Automatique », on réagit en direct au changement de réglage
     clair / sombre du système. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (theme !== "auto") return undefined;
        const media = window.matchMedia(systemThemeQuery);
        const handleChange = ()=>applyTheme("auto");
        media.addEventListener("change", handleChange);
        return ()=>media.removeEventListener("change", handleChange);
    }, [
        theme
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!user) return undefined;
        /* L'interface a déjà changé : on laisse simplement le temps au clic
       suivant avant d'enregistrer sur le profil. */ const timeoutId = setTimeout(()=>void (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_2__/* .updateUserTheme */ .Zs)(user.id, {
                theme
            }), 400);
        return ()=>clearTimeout(timeoutId);
    }, [
        userId,
        theme
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        applyAccent(accent);
    }, [
        accent
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!user) return undefined;
        const timeoutId = setTimeout(()=>void (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_2__/* .updateUserTheme */ .Zs)(user.id, {
                accent
            }), 400);
        return ()=>clearTimeout(timeoutId);
    }, [
        userId,
        accent
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        applyFont(font);
    }, [
        font
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const root = document.documentElement;
        root.setAttribute("data-avatar-shape", avatarShape);
        localStorage.setItem("avatarShape", avatarShape);
        if (user?.id) void (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_2__/* .updateUserData */ .Al)(user.id, {
            avatarShape
        }).catch(()=>undefined);
    }, [
        userId,
        avatarShape
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const root = document.documentElement;
        root.setAttribute("data-avatar-frame", avatarFrame);
        localStorage.setItem("avatarFrame", avatarFrame);
        if (user?.id) void (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_2__/* .updateUserData */ .Al)(user.id, {
            avatarFrame
        }).catch(()=>undefined);
    }, [
        userId,
        avatarFrame
    ]);
    const selectTheme = (newTheme)=>{
        applyTheme(newTheme);
        setTheme(newTheme);
    };
    const selectAccent = (newAccent)=>{
        applyAccent(newAccent);
        setAccent(newAccent);
    };
    const changeTheme = ({ target: { value  }  })=>selectTheme(value);
    const changeAccent = ({ target: { value  }  })=>selectAccent(value);
    const handleSetFont = (newFont)=>{
        applyFont(newFont);
        setFont(newFont);
        if (user?.id) void (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_2__/* .updateUserData */ .Al)(user.id, {
            customFont: newFont
        }).catch(()=>undefined);
    };
    const value = {
        theme,
        accent,
        font,
        avatarShape,
        avatarFrame,
        changeTheme,
        changeAccent,
        setTheme: selectTheme,
        setAccent: selectAccent,
        setFont: handleSetFont,
        setAvatarShape,
        setAvatarFrame
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ThemeContext.Provider, {
        value: value,
        children: children
    });
}
function useTheme() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);
    if (!context) throw new Error("useTheme must be used within an ThemeContextProvider");
    return context;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9802:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pp": () => (/* binding */ DEFAULT_STATUS_BAR),
/* harmony export */   "R2": () => (/* binding */ STATUS_TEXT_COLORS),
/* harmony export */   "TS": () => (/* binding */ DEFAULT_STATUS_BACKGROUND),
/* harmony export */   "Xl": () => (/* binding */ registerStatusView),
/* harmony export */   "dI": () => (/* binding */ deleteStatus),
/* harmony export */   "i": () => (/* binding */ STATUS_DURATIONS),
/* harmony export */   "le": () => (/* binding */ DEFAULT_STATUS_TEXT_COLOR),
/* harmony export */   "mk": () => (/* binding */ createStatus),
/* harmony export */   "o9": () => (/* binding */ DEFAULT_STATUS_DURATION),
/* harmony export */   "vr": () => (/* binding */ STATUS_BACKGROUNDS),
/* harmony export */   "y6": () => (/* binding */ publishDueScheduledStatuses)
/* harmony export */ });
/* unused harmony exports STATUS_TTL_MS, STATUS_BARS */
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1492);
/* harmony import */ var _collections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5342);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_0__, _collections__WEBPACK_IMPORTED_MODULE_1__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_0__, _collections__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


/** Durée de vie d'un statut : 24 h. */ const STATUS_TTL_MS = 24 * 60 * 60 * 1000;
/** Couleur de fond par défaut : noir. */ const DEFAULT_STATUS_BACKGROUND = "#000000";
/** Couleur de la barre (trait) par défaut. */ const DEFAULT_STATUS_BAR = "#1d9bf0";
/** Couleur du texte par défaut : blanc. */ const DEFAULT_STATUS_TEXT_COLOR = "#ffffff";
/** Durée d'affichage par défaut d'un statut (7 s). */ const DEFAULT_STATUS_DURATION = 7000;
/** Fonds proposés pour un statut (texte comme média). */ const STATUS_BACKGROUNDS = [
    {
        name: "Noir",
        value: "#000000"
    },
    {
        name: "Encre",
        value: "#15202b"
    },
    {
        name: "Bleu",
        value: "#1d9bf0"
    },
    {
        name: "Violet",
        value: "#7856ff"
    },
    {
        name: "Rose",
        value: "#f91880"
    },
    {
        name: "Rouge",
        value: "#f4212e"
    },
    {
        name: "Orange",
        value: "#ff7a00"
    },
    {
        name: "Vert",
        value: "#00ba7c"
    },
    {
        name: "Gris",
        value: "#536471"
    },
    {
        name: "Blanc",
        value: "#ffffff"
    }
];
/** Couleurs proposées pour la barre de progression du statut. */ const STATUS_BARS = [
    {
        name: "Bleu",
        value: "#1d9bf0"
    },
    {
        name: "Vert",
        value: "#00ba7c"
    },
    {
        name: "Jaune",
        value: "#ffd400"
    },
    {
        name: "Orange",
        value: "#ff7a00"
    },
    {
        name: "Rouge",
        value: "#f4212e"
    },
    {
        name: "Rose",
        value: "#f91880"
    },
    {
        name: "Violet",
        value: "#7856ff"
    },
    {
        name: "Blanc",
        value: "#ffffff"
    }
];
/** Couleurs proposées pour le texte du statut. */ const STATUS_TEXT_COLORS = [
    {
        name: "Blanc",
        value: "#ffffff"
    },
    {
        name: "Noir",
        value: "#000000"
    },
    {
        name: "Encre",
        value: "#15202b"
    },
    {
        name: "Bleu",
        value: "#1d9bf0"
    },
    {
        name: "Violet",
        value: "#7856ff"
    },
    {
        name: "Rose",
        value: "#f91880"
    },
    {
        name: "Rouge",
        value: "#f4212e"
    },
    {
        name: "Orange",
        value: "#ff7a00"
    },
    {
        name: "Vert",
        value: "#00ba7c"
    },
    {
        name: "Jaune",
        value: "#ffd400"
    }
];
/** Durées d'affichage proposées pour un statut. */ const STATUS_DURATIONS = [
    {
        name: "3 secondes",
        value: "3000"
    },
    {
        name: "5 secondes",
        value: "5000"
    },
    {
        name: "7 secondes",
        value: "7000"
    },
    {
        name: "10 secondes",
        value: "10000"
    },
    {
        name: "15 secondes",
        value: "15000"
    }
];
async function createStatus(userId, { kind , media , text , link , backgroundColor , barColor , textColor , duration , scheduledFor  }) {
    const statusData = {
        createdBy: userId,
        createdAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)(),
        updatedAt: null,
        kind,
        media,
        text,
        link,
        backgroundColor: backgroundColor || DEFAULT_STATUS_BACKGROUND,
        barColor: barColor || DEFAULT_STATUS_BAR,
        textColor: textColor || DEFAULT_STATUS_TEXT_COLOR,
        duration: duration || DEFAULT_STATUS_DURATION,
        // Un statut programmé reste masqué jusqu'à l'heure choisie.
        scheduledFor: scheduledFor ? firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.Timestamp.fromDate(scheduledFor) : null,
        // L'auteur est considéré comme ayant vu son propre statut.
        viewedBy: [
            userId
        ],
        // Un statut programmé expire 24 h après sa publication, pas après sa
        // création.
        expiresAt: firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.Timestamp.fromMillis((scheduledFor ? scheduledFor.getTime() : Date.now()) + STATUS_TTL_MS)
    };
    const { id  } = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.addDoc)(_collections__WEBPACK_IMPORTED_MODULE_1__/* .statusesCollection */ .lV, statusData);
    return id;
}
/* Statuts programmés dont l'heure est arrivée : ils sont « activés » (date de
   publication mise à jour, programmation effacée) pour apparaître dans le
   fil. */ async function publishDueScheduledStatuses(userId) {
    if (!userId) return 0;
    const snapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.getDocs)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.query)(_collections__WEBPACK_IMPORTED_MODULE_1__/* .statusesCollection */ .lV, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.where)("createdBy", "==", userId), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.limit)(50)));
    const now = Date.now();
    let published = 0;
    for (const docSnapshot of snapshot.docs){
        const data = docSnapshot.data();
        const scheduledFor = data.scheduledFor?.toMillis?.() ?? null;
        if (!scheduledFor || scheduledFor > now) continue;
        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)(docSnapshot.ref, {
            scheduledFor: null,
            createdAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)(),
            updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
        });
        published += 1;
    }
    return published;
}
async function deleteStatus(statusId) {
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.deleteDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_1__/* .statusesCollection */ .lV, statusId));
}
/* Statuts déjà marqués comme vus pendant cette session : évite une écriture
   Firestore à chaque changement de diapositive (comme pour les vues de
   publications). */ const locallyViewedStatuses = new Set();
async function registerStatusView(statusId, userId) {
    if (!statusId || locallyViewedStatuses.has(statusId)) return;
    locallyViewedStatuses.add(statusId);
    try {
        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_1__/* .statusesCollection */ .lV, statusId), {
            viewedBy: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.arrayUnion)(userId),
            updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
        });
    } catch  {
    // Le comptage de vue ne doit jamais empêcher la lecture du statut.
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;