"use strict";
exports.id = 1934;
exports.ids = [1934];
exports.modules = {

/***/ 6514:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "l": () => (/* binding */ ChannelAvatar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_avatar_shape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8829);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3325);




/**
 * Avatar d'une chaîne : la photo de la chaîne, découpée dans la forme
 * choisie à sa création. Sans photo, l'icône d'information remplace l'emoji
 * micro : elle indique que la chaîne n'a pas encore d'image.
 */ function ChannelAvatar({ photoURL , name , size =48 , shape ="circle" , className  }) {
    const shapeClass = (0,_lib_avatar_shape__WEBPACK_IMPORTED_MODULE_2__/* .getAvatarShapeClass */ ._M)(shape);
    const boxStyle = {
        width: size,
        height: size
    };
    if (photoURL) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
            className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("block shrink-0 overflow-hidden bg-main-search-background", shapeClass, className),
            style: boxStyle,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                alt: name,
                className: "block h-full w-full object-cover",
                height: size,
                src: photoURL,
                width: size
            })
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("flex shrink-0 items-center justify-center bg-main-accent/10 text-main-accent", shapeClass, className),
        style: boxStyle,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
            className: "h-1/2 w-1/2",
            iconName: "info"
        })
    });
}


/***/ }),

/***/ 5260:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ AiAvatar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3325);



/**
 * Avatar de l'assistant d'intelligence artificielle.
 *
 * L'assistant n'a pas de photo : on lui montre une étiquette, comme pour
 * une chaîne sans image.
 */ function AiAvatar({ size =36 , className  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        "aria-hidden": "true",
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("flex shrink-0 items-center justify-center rounded-full bg-main-accent/10 text-main-accent", className),
        style: {
            width: size,
            height: size
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_2__/* .MaterialIcon */ .O, {
            className: "h-1/2 w-1/2",
            iconName: "smart_toy"
        })
    });
}


/***/ }),

/***/ 141:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ AiMessageTools)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6201);
/* harmony import */ var _lib_ai__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2125);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2365);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_3__]);
react_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







/**
 * Actions d'intelligence artificielle sur un message : traduction et résumé.
 *
 * Le résultat est affiché sous la bulle. Rien n'est écrit dans la
 * messagerie : la traduction est une aide de lecture, elle ne modifie pas le
 * message d'origine.
 */ function AiMessageTools({ message , settings , mine  }) {
    const { 0: busy , 1: setBusy  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: results , 1: setResults  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    if (!settings.enabled) return null;
    if (!message.text?.trim()) return null;
    if (message.fromAI) return null;
    if (message.id.startsWith("pending-")) return null;
    const hasTranslation = results.some((result)=>result.tool === "translate");
    const hasSummary = results.some((result)=>result.tool === "summarize");
    const run = async (tool)=>{
        setBusy(tool);
        try {
            const text = tool === "translate" ? await (0,_lib_ai__WEBPACK_IMPORTED_MODULE_4__/* .translateWithAi */ .k0)(message.text, settings) : await (0,_lib_ai__WEBPACK_IMPORTED_MODULE_4__/* .summarizeWithAi */ .ET)(message.text, settings);
            setResults((current)=>[
                    ...current.filter((result)=>result.tool !== tool),
                    {
                        tool,
                        text
                    }
                ]);
        } catch (error) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_3__.toast.error(error?.message ?? "Impossible de contacting le service d’intelligence artificielle.");
        } finally{
            setBusy(null);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("mt-1 flex items-center gap-2 text-xs", mine ? "justify-end" : "justify-start"),
                children: [
                    settings.translateEnabled && !hasTranslation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        className: "flex items-center gap-1 rounded-full px-1.5 py-0.5 font-semibold text-light-secondary transition hover:bg-light-primary/5 hover:text-main-accent disabled:opacity-50 dark:text-dark-secondary dark:hover:bg-dark-primary/5",
                        disabled: busy !== null,
                        onClick: ()=>void run("translate"),
                        type: "button",
                        children: [
                            busy === "translate" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_6__/* .CustomIcon */ .d, {
                                className: "h-3.5 w-3.5",
                                iconName: "SpinnerIcon"
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                className: "h-3.5 w-3.5",
                                iconName: "translate"
                            }),
                            "Traduire"
                        ]
                    }),
                    !hasSummary && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        className: "flex items-center gap-1 rounded-full px-1.5 py-0.5 font-semibold text-light-secondary transition hover:bg-light-primary/5 hover:text-main-accent disabled:opacity-50 dark:text-dark-secondary dark:hover:bg-dark-primary/5",
                        disabled: busy !== null,
                        onClick: ()=>void run("summarize"),
                        type: "button",
                        children: [
                            busy === "summarize" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_6__/* .CustomIcon */ .d, {
                                className: "h-3.5 w-3.5",
                                iconName: "SpinnerIcon"
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                className: "h-3.5 w-3.5",
                                iconName: "auto_awesome_mosaic"
                            }),
                            "R\xe9sumer"
                        ]
                    })
                ]
            }),
            results.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("mt-1 flex w-full flex-col gap-1.5", mine ? "items-end" : "items-start"),
                children: results.map((result)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "max-w-[85%] rounded-xl border border-light-border bg-main-search-background/50 px-3 py-2 text-sm leading-5 text-light-primary dark:border-dark-border dark:bg-dark-primary/[0.06] dark:text-dark-primary",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "mb-0.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_5__/* .MaterialIcon */ .O, {
                                        className: "h-3.5 w-3.5",
                                        iconName: result.tool === "translate" ? "translate" : "auto_awesome_mosaic"
                                    }),
                                    result.tool === "translate" ? "Traduction" : "R\xe9sum\xe9"
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "whitespace-pre-wrap break-words",
                                children: result.text
                            })
                        ]
                    }, result.tool))
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1934:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ Conversation)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1492);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6197);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(649);
/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_textarea_autosize__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6201);
/* harmony import */ var _lib_audio_recorder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1945);
/* harmony import */ var _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3639);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5342);
/* harmony import */ var _lib_firebase_chat__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9969);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(2365);
/* harmony import */ var _components_ui_loading__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(9570);
/* harmony import */ var _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1708);
/* harmony import */ var _components_user_user_name__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(4531);
/* harmony import */ var _components_user_user_username__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(7876);
/* harmony import */ var _components_modal_gif_picker_modal__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(8251);
/* harmony import */ var _components_ui_emoji_picker__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(6344);
/* harmony import */ var _components_modal_poll_modal__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(4914);
/* harmony import */ var _components_modal_location_modal__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(8286);
/* harmony import */ var _components_modal_location_map_modal__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(8613);
/* harmony import */ var _components_modal_schedule_modal__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(5447);
/* harmony import */ var _components_input_poll_preview__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(5025);
/* harmony import */ var _components_input_location_preview__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(1817);
/* harmony import */ var _components_input_schedule_preview__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(793);
/* harmony import */ var _components_common_link_preview_card__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(6152);
/* harmony import */ var _components_common_composer_text__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(8780);
/* harmony import */ var _components_common_linkified_text__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(1471);
/* harmony import */ var _lib_link_preview__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(1565);
/* harmony import */ var _message_poll__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(7528);
/* harmony import */ var _group_avatar__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(5755);
/* harmony import */ var _components_channel_channel_avatar__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(6514);
/* harmony import */ var _ai_avatar__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(5260);
/* harmony import */ var _ai_message_tools__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(141);
/* harmony import */ var _lib_ai_bot__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(4407);
/* harmony import */ var _lib_ai__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(2125);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, framer_motion__WEBPACK_IMPORTED_MODULE_3__, react_hot_toast__WEBPACK_IMPORTED_MODULE_6__, _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_8__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_9__, _lib_firebase_chat__WEBPACK_IMPORTED_MODULE_10__, _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_15__, _components_modal_gif_picker_modal__WEBPACK_IMPORTED_MODULE_18__, _components_modal_poll_modal__WEBPACK_IMPORTED_MODULE_20__, _components_modal_location_modal__WEBPACK_IMPORTED_MODULE_21__, _components_modal_location_map_modal__WEBPACK_IMPORTED_MODULE_22__, _components_modal_schedule_modal__WEBPACK_IMPORTED_MODULE_23__, _components_input_poll_preview__WEBPACK_IMPORTED_MODULE_24__, _components_input_location_preview__WEBPACK_IMPORTED_MODULE_25__, _components_input_schedule_preview__WEBPACK_IMPORTED_MODULE_26__, _components_common_link_preview_card__WEBPACK_IMPORTED_MODULE_27__, _message_poll__WEBPACK_IMPORTED_MODULE_30__, _ai_message_tools__WEBPACK_IMPORTED_MODULE_34__, _lib_ai_bot__WEBPACK_IMPORTED_MODULE_35__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, framer_motion__WEBPACK_IMPORTED_MODULE_3__, react_hot_toast__WEBPACK_IMPORTED_MODULE_6__, _lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_8__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_9__, _lib_firebase_chat__WEBPACK_IMPORTED_MODULE_10__, _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_15__, _components_modal_gif_picker_modal__WEBPACK_IMPORTED_MODULE_18__, _components_modal_poll_modal__WEBPACK_IMPORTED_MODULE_20__, _components_modal_location_modal__WEBPACK_IMPORTED_MODULE_21__, _components_modal_location_map_modal__WEBPACK_IMPORTED_MODULE_22__, _components_modal_schedule_modal__WEBPACK_IMPORTED_MODULE_23__, _components_input_poll_preview__WEBPACK_IMPORTED_MODULE_24__, _components_input_location_preview__WEBPACK_IMPORTED_MODULE_25__, _components_input_schedule_preview__WEBPACK_IMPORTED_MODULE_26__, _components_common_link_preview_card__WEBPACK_IMPORTED_MODULE_27__, _message_poll__WEBPACK_IMPORTED_MODULE_30__, _ai_message_tools__WEBPACK_IMPORTED_MODULE_34__, _lib_ai_bot__WEBPACK_IMPORTED_MODULE_35__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






































const MAX_RECORD_SECONDS = 120;
/** Taille maximale d'une image jointe dans un message. */ const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
/* Le menu d'options reprend les mêmes entrées que la barre de publication. */ const ATTACH_OPTIONS = [
    {
        name: "Media",
        iconName: "image"
    },
    {
        name: "GIF",
        iconName: "gif_box"
    },
    {
        name: "Sondage",
        iconName: "bar_chart"
    },
    {
        name: "Emoji",
        iconName: "mood"
    },
    {
        name: "Schedule",
        iconName: "calendar_month"
    },
    {
        name: "Location",
        iconName: "location_on"
    }
];
/* Les entrées d'assistance n'apparaissent que si la personne a laissé
   l'intelligence artificielle active. */ const AI_ATTACH_OPTIONS = [
    {
        name: "Traduire",
        iconName: "translate"
    },
    {
        name: "R\xe9\xe9crire",
        iconName: "auto_awesome_mosaic"
    }
];
/* Questions proposées à l'ouverture d'une conversation avec l'assistant. */ const AI_SUGGESTIONS = [
    "Aide-moi \xe0 \xe9crire une publication",
    "R\xe9sume ce texte en trois points",
    "Traduis ce message en anglais"
];
/* Le menu se déplie au-dessus de la barre de saisie : la hauteur s'anime pour
   « soulever » la barre, comme dans Google Messages. */ const attachMenuAnimation = {
    initial: {
        height: 0,
        opacity: 0
    },
    animate: {
        height: "auto",
        opacity: 1,
        transition: {
            type: "spring",
            damping: 30,
            stiffness: 300
        }
    },
    exit: {
        height: 0,
        opacity: 0,
        transition: {
            duration: 0.2
        }
    }
};
/** Decorative waveform used both for the button icon and the audio player. */ const WAVE_BARS = [
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
function formatTime(totalSeconds) {
    if (!Number.isFinite(totalSeconds) || totalSeconds < 0) totalSeconds = 0;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
function AudioWaveIcon({ className  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        "aria-hidden": "true",
        className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("h-5 w-5", className),
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeWidth: "2",
        viewBox: "0 0 24 24",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M3.5 10v4"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M7.75 7.5v9"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M12 4.5v15"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M16.25 7.5v9"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M20.5 10v4"
            })
        ]
    });
}
/** Types MIME audio par extension, pour savoir si l'appareil sait les lire. */ const AUDIO_MIME_BY_EXTENSION = {
    webm: "audio/webm;codecs=opus",
    m4a: "audio/mp4",
    ogg: "audio/ogg;codecs=opus",
    opus: "audio/ogg;codecs=opus",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    aac: "audio/aac"
};
function AudioMessage({ src , duration , mine  }) {
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
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("Ce message vocal ne peut pas \xeatre lu sur cet appareil.");
        });
        else audio.pause();
    };
    if (unsupported || failed) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: "flex items-center gap-2",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_12__/* .MaterialIcon */ .O, {
                    className: "h-5 w-5",
                    iconName: "volume_up"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("text-sm", mine ? "text-white/90" : "text-light-secondary dark:text-dark-secondary"),
                    children: failed ? "Lecture impossible sur cet appareil." : "Format audio non pris en charge sur cet appareil."
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("text-sm font-semibold underline", mine ? "text-white" : "text-main-accent"),
                    href: src,
                    rel: "noreferrer",
                    target: "_blank",
                    children: "Ouvrir"
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-3",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                "aria-label": playing ? "Mettre en pause" : "Lire le message vocal",
                className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition active:scale-95", mine ? "hover:bg-white/35 bg-white/25 text-white" : "bg-main-accent text-white hover:brightness-90"),
                onClick: togglePlay,
                type: "button",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_12__/* .MaterialIcon */ .O, {
                    className: "h-4 w-4",
                    iconName: playing ? "pause" : "play_arrow",
                    solid: true
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                "aria-hidden": "true",
                className: "flex h-8 items-center gap-[3px]",
                children: WAVE_BARS.map((height, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("w-[3px] rounded-full transition-colors", index < playedBars ? mine ? "bg-white" : "bg-main-accent" : mine ? "bg-white/40" : "bg-light-secondary/40 dark:bg-dark-secondary/40"),
                        style: {
                            height
                        }
                    }, index))
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("min-w-[2.25rem] text-xs tabular-nums", mine ? "text-white/90" : "text-light-secondary dark:text-dark-secondary"),
                children: formatTime(playing || currentTime > 0 ? totalDuration - currentTime : totalDuration)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("audio", {
                ref: audioRef,
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
                src: src
            })
        ]
    });
}
function Conversation({ user , contact , group , members =[] , onBack , standalone =false  }) {
    const isGroup = Boolean(group);
    /* Dans une chaîne, seul l'auteur peut publier : les autres sont en lecture
     seule. Pour les groupes et les conversations privées, tout le monde écrit. */ const canPost = !group || group.type !== "channel" || group.createdBy === user.id;
    const directId = contact?.id ?? "";
    /* Conversation avec l'assistant : elle est rangée dans la boîte de la
     personne qui l'utilise, donc les messages sont toujours chez elle. */ const isAi = group?.type === "ai";
    const chatId = group ? group.id : (0,_lib_firebase_chat__WEBPACK_IMPORTED_MODULE_10__/* .getChatId */ .tN)(user.id, directId);
    const chatOwnerId = group ? isAi ? user.id : (0,_lib_firebase_chat__WEBPACK_IMPORTED_MODULE_10__/* .getConversationOwnerId */ .T2)(group.participants) : (0,_lib_firebase_chat__WEBPACK_IMPORTED_MODULE_10__/* .getChatOwnerId */ .SQ)(user.id, directId);
    /* Réglages d'intelligence artificielle de la personne. */ const aiSettings = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_lib_ai__WEBPACK_IMPORTED_MODULE_36__/* .withAiDefaults */ .Ih)(user.aiSettings), [
        user.aiSettings
    ]);
    const aiEnabled = aiSettings.enabled;
    const membersById = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>new Map(members.map((member)=>[
                member.id,
                member
            ])), [
        members
    ]);
    const { data: messages , loading  } = (0,_lib_hooks_useCollection__WEBPACK_IMPORTED_MODULE_8__/* .useCollection */ .K)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)((0,_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_9__/* .conversationMessagesCollection */ .WN)(chatOwnerId, chatId), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.orderBy)("createdAt", "asc")), {
        allowNull: true
    });
    const { 0: text , 1: setText  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: sending , 1: setSending  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Messages en cours d'envoi : leur bulle s'affiche tout de suite, tout en
     bas de la conversation, sans attendre la réponse du serveur. */ const { 0: pendingMessages , 1: setPendingMessages  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: recording , 1: setRecording  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: recordSeconds , 1: setRecordSeconds  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: voiceBusy , 1: setVoiceBusy  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Menu d'options : il se soulève au-dessus de la barre de saisie et se
     referme dès qu'on écrit ou qu'on clique ailleurs. */ const { 0: attachOpen , 1: setAttachOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: gifOpen , 1: setGifOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: emojiOpen , 1: setEmojiOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Curseur du message en cours : il est repris en aperçu dans le sélecteur
     d'emoji. */ const { 0: emojiCaret , 1: setEmojiCaret  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    /* Image jointe, en attente d'envoi : l'aperçu vit au-dessus de la barre. */ const { 0: attachedImage , 1: setAttachedImage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: imageBusy , 1: setImageBusy  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Aperçu du lien collé dans la zone de texte : il se met à jour à la
     frappe et disparaît dès que le lien est effacé. */ const { 0: linkPreview , 1: setLinkPreview  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const previewUrlRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    /* Sondage, lieu et programmation : mêmes objets que pour une publication. */ const { 0: poll , 1: setPoll  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: pollOpen , 1: setPollOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: locationOpen , 1: setLocationOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: messageLocation , 1: setMessageLocation  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    /* Lieu affiché sur la carte : il ne s'agit pas forcément du message courant. */ const { 0: mapLocation , 1: setMapLocation  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: scheduleOpen , 1: setScheduleOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Date d'envoi choisie : le message attend qu'elle soit atteinte. */ const { 0: scheduledDate , 1: setScheduledDate  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const listRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const isAtBottomRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(true);
    const textAreaRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const attachInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const sessionRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const streamRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const startingRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    const startedAtRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const timerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const scrollToBottom = ()=>{
        const list = listRef.current;
        if (list) list.scrollTop = list.scrollHeight;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // New conversation opened: jump straight to the latest message.
        isAtBottomRef.current = true;
        scrollToBottom();
    }, [
        chatId
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isAtBottomRef.current) scrollToBottom();
    }, [
        messages?.length,
        pendingMessages.length
    ]);
    /* Tant que la conversation est ouverte, les nouveaux messages sont lus :
     on repousse la marque de lecture pour que le badge reste éteint, y
     compris après être revenu dans une autre section. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!messages?.length) return;
        void (0,_lib_firebase_chat__WEBPACK_IMPORTED_MODULE_10__/* .markConversationAsRead */ .R7)(user.id, chatId);
    }, [
        messages?.length,
        user.id,
        chatId
    ]);
    /* La conversation avec l'assistant est créée à la première ouverture : elle
     n'existe pas tant que la personne ne l'a jamais utilisée. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isAi) return;
        void (0,_lib_ai_bot__WEBPACK_IMPORTED_MODULE_35__/* .ensureAiConversation */ .q_)(user.id).catch(()=>undefined);
    }, [
        isAi,
        user.id
    ]);
    /* Les messages en cours d'envoi s'ajoutent à la suite de la conversation :
     ils occupent donc le bas de la liste pendant l'envoi. */ const visibleMessages = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>[
            ...messages ?? [],
            ...pendingMessages
        ], [
        messages,
        pendingMessages
    ]);
    /* La bulle d'un message en cours d'envoi s'efface dès que le vrai message
     est arrivé, pour qu'il ne disparaisse jamais entre les deux. Un envoi
     resté sans réponse est oublié au bout de vingt secondes, afin de ne pas
     laisser une bulle bloquée à l'écran. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!pendingMessages.length) return;
        const confirmed = [
            ...messages ?? []
        ];
        setPendingMessages((current)=>{
            const remaining = current.filter((pending)=>{
                if (Date.now() - pending.createdAt > 20000) return false;
                const index = confirmed.findIndex((message)=>message.createdBy === pending.createdBy && message.text === pending.text && Math.abs(message.createdAt - pending.createdAt) < 30000);
                if (index === -1) return true;
                confirmed.splice(index, 1);
                return false;
            });
            return remaining.length === current.length ? current : remaining;
        });
    }, [
        messages,
        pendingMessages
    ]);
    const stopRecordTimer = ()=>{
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };
    /* À chaque frappe, on cherche un lien : l'aperçu est demandé une seule fois
     par lien, et disparaît dès que le lien disparaît du texte. */ const handleTextChange = (value)=>{
        setText(value);
        const link = (0,_lib_link_preview__WEBPACK_IMPORTED_MODULE_37__/* .findLink */ .s2)(value);
        if (!link) {
            previewUrlRef.current = null;
            setLinkPreview(null);
            return;
        }
        if (link === previewUrlRef.current) return;
        previewUrlRef.current = link;
        setLinkPreview(null);
        void (0,_lib_link_preview__WEBPACK_IMPORTED_MODULE_37__/* .fetchLinkPreview */ .ne)(link).then((data)=>{
            /* Le lien a pu changer entre-temps : on n'affiche plus rien. */ if (previewUrlRef.current !== link) return;
            setLinkPreview(data);
        });
    };
    /* Le menu se referme si on clique dehors, et dès qu'on revient dans la barre
     de texte : la frappe doit rester au premier plan. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!attachOpen) return;
        const handleClickOutside = (event)=>{
            const target = event.target;
            if (target?.closest("[data-attach-menu]") || target?.closest("[data-attach-toggle]")) return;
            setAttachOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>document.removeEventListener("mousedown", handleClickOutside);
    }, [
        attachOpen
    ]);
    /* Envoyer une image passe par la même API que les messages vocaux. */ const uploadImage = async (blob, fileName)=>{
        const base64Data = await blobToBase64(blob);
        const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fileName,
                contentType: blob.type || "image/jpeg",
                base64Data,
                userId: user.id
            })
        });
        if (!response.ok) throw new Error("upload-failed");
        const { url  } = await response.json();
        if (!url) throw new Error("upload-failed");
        return url;
    };
    const attachImage = async (blob, fileName)=>{
        setImageBusy(true);
        const preview =  false ? 0 : null;
        try {
            const url = await uploadImage(blob, fileName);
            setAttachedImage({
                url,
                src: preview ?? url
            });
            setAttachOpen(false);
        } catch  {
            if (preview) URL.revokeObjectURL(preview);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("Impossible d'ajouter cette image.");
        } finally{
            setImageBusy(false);
        }
    };
    const handleImageSelect = (event)=>{
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file) return Promise.resolve();
        if (file.size > MAX_IMAGE_BYTES) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("Image trop lourde : 8 Mo maximum.");
            return Promise.resolve();
        }
        return attachImage(file, file.name || `image-${Date.now()}.jpg`);
    };
    const handleImagePaste = (event)=>{
        const file = Array.from(event.clipboardData.files).find((item)=>item.type.startsWith("image/"));
        if (!file) return;
        event.preventDefault();
        if (file.size > MAX_IMAGE_BYTES) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("Image trop lourde : 8 Mo maximum.");
            return;
        }
        void attachImage(file, file.name || `image-${Date.now()}.png`);
    };
    const removeAttachedImage = ()=>{
        setAttachedImage((current)=>{
            if (current?.src.startsWith("blob:")) URL.revokeObjectURL(current.src);
            return null;
        });
    };
    const handleGifSelect = (gif)=>{
        /* Le GIF arrive déjà sous forme d'adresse : on l'affiche directement,
       l'API d'upload n'est pas nécessaire pour lui. */ setAttachedImage({
            url: gif.src,
            src: gif.src
        });
        setGifOpen(false);
        setAttachOpen(false);
    };
    const handleEmojiSelect = (emoji)=>{
        /* Le sélecteur reste ouvert : on peut enchaîner plusieurs emojis.
       Il se ferme au clic dehors ou avec la croix. L'emoji est inséré à
       l'endroit du curseur, pas à la fin du message. */ const area = textAreaRef.current;
        if (!area) {
            setText((current)=>current + emoji);
            return;
        }
        const start = area.selectionStart ?? area.value.length;
        const end = area.selectionEnd ?? start;
        setText((current)=>current.slice(0, start) + emoji + current.slice(end));
        /* Le curseur avance : l'aperçu du sélecteur suit. */ setEmojiCaret(start + emoji.length);
        requestAnimationFrame(()=>{
            area.focus();
            const position = start + emoji.length;
            area.setSelectionRange(position, position);
        });
    };
    const stopStream = ()=>{
        streamRef.current?.getTracks().forEach((track)=>track.stop());
        streamRef.current = null;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>()=>{
            // Leaving the conversation stops any ongoing recording.
            stopRecordTimer();
            sessionRef.current?.cancel();
            sessionRef.current = null;
            stopStream();
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const blobToBase64 = (blob)=>new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.onloadend = ()=>{
                const result = typeof reader.result === "string" ? reader.result : "";
                resolve(result.replace(/^data:[^;]+;base64,/, ""));
            };
            reader.onerror = ()=>reject(new Error("read-error"));
            reader.readAsDataURL(blob);
        });
    const sendVoiceMessage = async (note)=>{
        setVoiceBusy(true);
        try {
            /* Jamais de durée nulle : elle ferait afficher « 0 s » au destinataire
         alors que le son est parfaitement audible. */ const audioDuration = Math.max(1, Math.round(note.duration || 1));
            const base64Data = await blobToBase64(note.blob);
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fileName: `voice-${Date.now()}.${note.extension}`,
                    contentType: note.mimeType,
                    base64Data,
                    userId: user.id
                })
            });
            if (!response.ok) throw new Error("upload-failed");
            const { url  } = await response.json();
            if (!url) throw new Error("upload-failed");
            if (group) await (0,_lib_firebase_chat__WEBPACK_IMPORTED_MODULE_10__/* .sendGroupMessage */ .TP)({
                senderId: user.id,
                conversation: group,
                audioURL: url,
                audioDuration
            });
            else await (0,_lib_firebase_chat__WEBPACK_IMPORTED_MODULE_10__/* .sendMessage */ .bG)({
                senderId: user.id,
                recipientId: directId,
                audioURL: url,
                audioDuration
            });
        } catch  {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("Impossible d'envoyer le message vocal.");
        } finally{
            setVoiceBusy(false);
        }
    };
    const startRecording = async ()=>{
        if (voiceBusy || startingRef.current || sessionRef.current) return;
        if (!navigator.mediaDevices?.getUserMedia) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("Les messages vocaux ne sont pas pris en charge par ce navigateur.");
            return;
        }
        startingRef.current = true;
        try {
            /* Débloque l'audio dans le geste utilisateur (iOS/Safari). */ (0,_lib_audio_recorder__WEBPACK_IMPORTED_MODULE_7__/* .unlockVoiceAudio */ .X)();
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
            streamRef.current = stream;
            const session = await (0,_lib_audio_recorder__WEBPACK_IMPORTED_MODULE_7__/* .startVoiceCapture */ .E)(stream);
            sessionRef.current = session;
            startedAtRef.current = Date.now();
            setRecordSeconds(0);
            setRecording(true);
            timerRef.current = setInterval(()=>{
                const elapsed = Math.round((Date.now() - startedAtRef.current) / 1000);
                setRecordSeconds(elapsed);
                if (elapsed >= MAX_RECORD_SECONDS) stopRecording(false);
            }, 250);
        } catch  {
            sessionRef.current?.cancel();
            sessionRef.current = null;
            stopStream();
            setRecording(false);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("Impossible d'acc\xe9der au microphone.");
        } finally{
            startingRef.current = false;
        }
    };
    /* Arrête la capture. Un enregistrement annulé n'est ni envoyé ni converti. */ const finishRecording = async (cancelled)=>{
        const session = sessionRef.current;
        if (!session) return;
        sessionRef.current = null;
        stopRecordTimer();
        if (cancelled) {
            session.cancel();
            stopStream();
            setRecording(false);
            return;
        }
        const note = await session.stop();
        stopStream();
        setRecording(false);
        if (!note) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("L'enregistrement est vide : aucun message envoy\xe9.");
            return;
        }
        await sendVoiceMessage(note);
    };
    const stopRecording = (cancelled)=>{
        void finishRecording(cancelled);
    };
    const sendCurrent = async (payload)=>{
        if (group) await (0,_lib_firebase_chat__WEBPACK_IMPORTED_MODULE_10__/* .sendGroupMessage */ .TP)({
            senderId: user.id,
            conversation: group,
            ...payload
        });
        else await (0,_lib_firebase_chat__WEBPACK_IMPORTED_MODULE_10__/* .sendMessage */ .bG)({
            senderId: user.id,
            recipientId: directId,
            ...payload
        });
    };
    const clearComposer = ()=>{
        setText("");
        setPoll(null);
        setMessageLocation(null);
        setScheduledDate(null);
        setLinkPreview(null);
        previewUrlRef.current = null;
        removeAttachedImage();
    };
    /* Demande une réponse à l'assistant et l'écrit dans la conversation. */ const askAssistant = async (question)=>{
        const history = [
            ...messages ?? []
        ].filter((message)=>message.text?.trim()).slice(-12).map((message)=>({
                role: message.fromAI ? "assistant" : "user",
                content: message.text.trim()
            }));
        try {
            const reply = await (0,_lib_ai__WEBPACK_IMPORTED_MODULE_36__/* .chatWithAi */ .Tt)([
                ...history,
                {
                    role: "user",
                    content: question
                }
            ], aiSettings);
            await (0,_lib_ai_bot__WEBPACK_IMPORTED_MODULE_35__/* .appendAiMessage */ .hO)(user.id, reply);
            isAtBottomRef.current = true;
        } catch (error) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error(error?.message ?? "L’assistant n’a pas pu r\xe9pondre. V\xe9rifiez vos r\xe9glages.");
        }
    };
    /* Traduit le brouillon : la traduction remplace le texte tapé. */ const handleTranslateDraft = async ()=>{
        const value = text.trim();
        if (!value) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("\xc9crivez d’abord votre message.");
            return;
        }
        try {
            setText(await (0,_lib_ai__WEBPACK_IMPORTED_MODULE_36__/* .translateWithAi */ .k0)(value, aiSettings));
        } catch (error) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error(error?.message ?? "Impossible de traduire le message.");
        }
    };
    /* Réécrit le brouillon pour le rendre plus clair et plus court. */ const handleRewriteDraft = async ()=>{
        const value = text.trim();
        if (!value) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("\xc9crivez d’abord votre message.");
            return;
        }
        try {
            setText(await (0,_lib_ai__WEBPACK_IMPORTED_MODULE_36__/* .rewriteWithAi */ .Us)(value, aiSettings));
        } catch (error) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error(error?.message ?? "Impossible de reformuler le message.");
        }
    };
    const handleSubmit = async ()=>{
        const value = text.trim();
        const image = attachedImage;
        /* Un message peut ne porter qu'une image, un sondage ou un lieu : le
       texte reste facultatif. */ if (!value && !image && !poll && !messageLocation || sending || imageBusy) return;
        const payload = {
            text: value || null,
            imageURL: image?.url ?? null,
            poll,
            location: messageLocation,
            linkPreview
        };
        /* Envoi programmé : le message part quand l'heure choisie est atteinte,
       à condition que la conversation reste ouverte. */ if (scheduledDate) {
            const delay = scheduledDate.getTime() - Date.now();
            if (delay > 0) {
                clearComposer();
                react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.success(`Message programmé pour ${scheduledDate.toLocaleString("fr-FR")}`);
                setTimeout(()=>{
                    void sendCurrent(payload).catch(()=>react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("Impossible d'envoyer le message programm\xe9."));
                }, delay);
                return;
            }
        }
        /* La bulle apparaît tout de suite en bas de la conversation : on n'attend
       pas la réponse du serveur pour la voir. Elle sera remplacée par le vrai
       message dès son arrivée. */ const pending = {
            id: `pending-${Date.now()}`,
            text: payload.text,
            audioURL: null,
            audioDuration: null,
            imageURL: payload.imageURL,
            poll: payload.poll,
            pollVotes: null,
            location: payload.location,
            linkPreview: payload.linkPreview,
            createdBy: user.id,
            createdAt: Date.now()
        };
        clearComposer();
        setPendingMessages((current)=>[
                ...current,
                pending
            ]);
        isAtBottomRef.current = true;
        setSending(true);
        try {
            await sendCurrent(payload);
            /* L'assistant répond après chaque message : sa réponse arrive dans la
         conversation comme un message de plus. */ if (isAi && aiSettings.assistantEnabled && value) void askAssistant(value);
        } catch  {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("Impossible d'envoyer le message.");
            /* Le message retourne dans la zone de saisie : il n'est pas perdu. */ setText((current)=>current || value);
            if (image) setAttachedImage(image);
            setPoll(poll);
            setMessageLocation(messageLocation);
            setPendingMessages((current)=>current.filter(({ id  })=>id !== pending.id));
        } finally{
            setSending(false);
        }
    };
    const handleKeyDown = (event)=>{
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            void handleSubmit();
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("z-40 flex flex-col bg-main-background", /* En page autonome (chaîne), la conversation reste dans le flux de la
           page : elle ne recouvre plus l'en-tête, qui porte le titre, la
           description et la flèche de retour. Sur téléphone, la conversation
           occupait tout l'écran (`fixed inset-0`) et cet en-tête
           disparaissait complètement. */ standalone ? "relative min-h-0 flex-1" : clsx__WEBPACK_IMPORTED_MODULE_4___default()("fixed inset-0", "md:sticky md:top-[57px] md:z-auto md:h-[calc(100dvh-57px)] md:min-w-0 md:flex-1 md:self-start md:border-l md:border-light-border md:dark:border-dark-border")),
        "data-no-section-swipe": true,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_gif_picker_modal__WEBPACK_IMPORTED_MODULE_18__/* .GifPickerModal */ .Y, {
                open: gifOpen,
                closeModal: ()=>setGifOpen(false),
                onSelect: handleGifSelect
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_emoji_picker__WEBPACK_IMPORTED_MODULE_19__/* .EmojiPicker */ .h, {
                caret: emojiCaret,
                open: emojiOpen,
                closeModal: ()=>setEmojiOpen(false),
                onSelect: handleEmojiSelect,
                value: text
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_poll_modal__WEBPACK_IMPORTED_MODULE_20__/* .PollModal */ .w, {
                open: pollOpen,
                poll: poll,
                closeModal: ()=>setPollOpen(false),
                onApply: (value)=>{
                    setPoll(value);
                    setPollOpen(false);
                }
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_location_modal__WEBPACK_IMPORTED_MODULE_21__/* .LocationModal */ .F, {
                open: locationOpen,
                closeModal: ()=>setLocationOpen(false),
                onSelect: (value)=>{
                    setMessageLocation(value);
                    setLocationOpen(false);
                },
                current: messageLocation,
                onClear: ()=>setMessageLocation(null)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_schedule_modal__WEBPACK_IMPORTED_MODULE_23__/* .ScheduleModal */ .h, {
                open: scheduleOpen,
                closeModal: ()=>setScheduleOpen(false),
                onSchedule: (date)=>{
                    setScheduledDate(date);
                    setScheduleOpen(false);
                }
            }),
            !standalone && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "glass-header flex items-center gap-3 border-b border-light-border px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] dark:border-dark-border md:pt-3",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        "aria-label": "Retour \xe0 la bo\xeete de r\xe9ception",
                        className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-light-primary transition hover:bg-light-primary/10 active:bg-light-primary/20 dark:text-dark-primary dark:hover:bg-dark-primary/10",
                        onClick: onBack,
                        type: "button",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_12__/* .MaterialIcon */ .O, {
                            className: "h-5 w-5",
                            iconName: "arrow_back"
                        })
                    }),
                    isAi ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ai_avatar__WEBPACK_IMPORTED_MODULE_33__/* .AiAvatar */ .R, {
                                className: "!self-center",
                                size: 40
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "truncate text-[15px] font-bold text-light-primary dark:text-dark-primary",
                                        children: _lib_ai_bot__WEBPACK_IMPORTED_MODULE_35__/* .AI_BOT_NAME */ .sV
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "truncate text-sm text-light-secondary dark:text-dark-secondary",
                                        children: group?.description ?? "Posez votre question."
                                    })
                                ]
                            })
                        ]
                    }) : !isGroup && contact?.username ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_11___default()), {
                        href: `/user/${contact.username}`,
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                            className: "flex min-w-0 items-center gap-3 transition-opacity hover:opacity-80",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_avatar__WEBPACK_IMPORTED_MODULE_15__/* .UserAvatar */ .Y, {
                                    alt: contact?.name ?? "",
                                    className: "!self-center",
                                    frame: contact?.avatarFrame,
                                    gender: contact?.gender,
                                    shape: contact?.avatarShape,
                                    size: 40,
                                    src: contact?.photoURL ?? ""
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_name__WEBPACK_IMPORTED_MODULE_16__/* .UserName */ .v, {
                                            className: "text-[15px]",
                                            name: contact?.name ?? "",
                                            verified: contact?.verified ?? false
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_username__WEBPACK_IMPORTED_MODULE_17__/* .UserUsername */ .a, {
                                            disableLink: true,
                                            className: "text-sm",
                                            username: contact?.username ?? ""
                                        })
                                    ]
                                })
                            ]
                        })
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            isGroup ? group?.type === "channel" ? /* La chaîne garde la taille de son vignette dans « Découvrir »
                     (48 px) : l'icône reste au même endroit quand on ouvre la
                     chaîne, sur téléphone comme sur ordinateur. */ /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_channel_channel_avatar__WEBPACK_IMPORTED_MODULE_32__/* .ChannelAvatar */ .l, {
                                className: "!self-center",
                                name: group?.name ?? "Cha\xeene",
                                photoURL: group?.photoURL,
                                shape: group?.avatarShape,
                                size: 48
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_group_avatar__WEBPACK_IMPORTED_MODULE_31__/* .GroupAvatar */ .N, {
                                className: "!self-center",
                                members: members,
                                photoURL: group?.photoURL,
                                size: 40
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_avatar__WEBPACK_IMPORTED_MODULE_15__/* .UserAvatar */ .Y, {
                                alt: contact?.name ?? "",
                                className: "!self-center",
                                frame: contact?.avatarFrame,
                                gender: contact?.gender,
                                shape: contact?.avatarShape,
                                size: 40,
                                src: contact?.photoURL ?? ""
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "min-w-0",
                                children: isGroup ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "truncate text-[15px] font-bold text-light-primary dark:text-dark-primary",
                                            children: group?.name || "Groupe"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "truncate text-sm text-light-secondary dark:text-dark-secondary",
                                            children: group?.description || `${group?.participants.length ?? 0} membres`
                                        })
                                    ]
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_name__WEBPACK_IMPORTED_MODULE_16__/* .UserName */ .v, {
                                            className: "text-[15px]",
                                            name: contact?.name ?? "",
                                            verified: contact?.verified ?? false
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_username__WEBPACK_IMPORTED_MODULE_17__/* .UserUsername */ .a, {
                                            disableLink: true,
                                            className: "text-sm",
                                            username: contact?.username ?? ""
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("overscroll-contain px-4 pt-6 pb-6", standalone ? "min-h-0 flex-1 overflow-y-auto" : "min-h-0 flex-1 overflow-y-auto"),
                onScroll: (event)=>{
                    const list = event.currentTarget;
                    isAtBottomRef.current = list.scrollHeight - list.scrollTop - list.clientHeight < 80;
                },
                ref: listRef,
                children: loading && !messages ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_loading__WEBPACK_IMPORTED_MODULE_14__/* .Loading */ .g, {
                    className: "mt-8"
                }) : !visibleMessages.length ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex h-full flex-col items-center justify-center gap-4 px-6 text-center",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "flex w-full justify-center",
                            children: isAi ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ai_avatar__WEBPACK_IMPORTED_MODULE_33__/* .AiAvatar */ .R, {
                                className: "!self-center",
                                size: 72
                            }) : isGroup ? group?.type === "channel" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_channel_channel_avatar__WEBPACK_IMPORTED_MODULE_32__/* .ChannelAvatar */ .l, {
                                name: group?.name ?? "Cha\xeene",
                                photoURL: group?.photoURL,
                                shape: group?.avatarShape,
                                size: 72
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_group_avatar__WEBPACK_IMPORTED_MODULE_31__/* .GroupAvatar */ .N, {
                                members: members,
                                photoURL: group?.photoURL,
                                size: 72
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_avatar__WEBPACK_IMPORTED_MODULE_15__/* .UserAvatar */ .Y, {
                                alt: contact?.name ?? "",
                                frame: contact?.avatarFrame,
                                gender: contact?.gender,
                                shape: contact?.avatarShape,
                                size: 72,
                                src: contact?.photoURL ?? ""
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "text-lg font-bold text-light-primary dark:text-dark-primary",
                            children: isAi ? "Posez votre question" : "Commencez la discussion"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "max-w-xs text-sm leading-5 text-light-secondary dark:text-dark-secondary",
                            children: isAi ? "L’assistant r\xe9pond dans la langue de votre choix. Demandez-lui une id\xe9e, une correction, un r\xe9sum\xe9…" : isGroup ? "Envoyez votre premier message dans ce groupe." : `Envoyez votre premier message à @${contact?.username ?? ""}.`
                        }),
                        isAi && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "mt-2 flex max-w-sm flex-wrap justify-center gap-2",
                            children: AI_SUGGESTIONS.map((suggestion)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "rounded-full border border-light-border px-3 py-1.5 text-xs font-semibold text-light-secondary transition hover:border-main-accent hover:text-main-accent dark:border-dark-border dark:text-dark-secondary",
                                    onClick: ()=>{
                                        setText(suggestion);
                                        textAreaRef.current?.focus();
                                    },
                                    type: "button",
                                    children: suggestion
                                }, suggestion))
                        })
                    ]
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "flex flex-col",
                    children: visibleMessages.map((message, index)=>{
                        const mine = message.createdBy === user.id;
                        /* Message qui vient d'être envoyé : sa bulle est déjà en bas de
                 la conversation, en attendant que le serveur confirme. */ const isPending = message.id.startsWith("pending-");
                        /* Dans un groupe, l'auteur d'un message reçu peut être n'importe
                 quel membre : on affiche alors son avatar et son nom. */ const sender = mine ? user : message.fromAI ? _lib_ai_bot__WEBPACK_IMPORTED_MODULE_35__/* .aiBotUser */ .Q8 : isGroup ? membersById.get(message.createdBy) : contact;
                        const previous = visibleMessages[index - 1];
                        const next = visibleMessages[index + 1];
                        const isFirstOfGroup = !previous || previous.createdBy !== message.createdBy;
                        const isLastOfGroup = !next || next.createdBy !== message.createdBy;
                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("flex w-full flex-col", isFirstOfGroup ? "mt-4 first:mt-0" : "mt-0.5"),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("flex w-full items-end gap-2", mine ? "justify-end" : "justify-start"),
                                    children: [
                                        !mine && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("w-9 shrink-0", !isLastOfGroup && "invisible"),
                                            children: sender && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_avatar__WEBPACK_IMPORTED_MODULE_15__/* .UserAvatar */ .Y, {
                                                alt: sender.name,
                                                frame: sender.avatarFrame,
                                                gender: sender.gender,
                                                shape: sender.avatarShape,
                                                size: 36,
                                                src: sender.photoURL
                                            })
                                        }),
                                        mine && isPending && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_13__/* .CustomIcon */ .d, {
                                            className: "mb-1.5 h-4 w-4 shrink-0 text-light-secondary dark:text-dark-secondary",
                                            iconName: "SpinnerIcon"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("relative flex min-w-0 max-w-[75%] flex-col", mine ? "items-end" : "items-start"),
                                            children: [
                                                isGroup && !mine && isFirstOfGroup && sender && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "mb-0.5 px-2 text-xs font-semibold text-light-secondary dark:text-dark-secondary",
                                                    children: sender.name
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("whitespace-pre-wrap break-words px-4 py-2.5 text-[15px] leading-[1.45]", "rounded-2xl transition-colors duration-150", mine ? "rounded-br-md bg-main-accent text-white" : "rounded-bl-md bg-main-search-background text-light-primary dark:text-dark-primary", isPending && "opacity-70"),
                                                    title: new Date(message.createdAt).toLocaleString("fr-FR"),
                                                    children: [
                                                        message.audioURL ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AudioMessage, {
                                                            duration: message.audioDuration,
                                                            mine: mine,
                                                            src: message.audioURL
                                                        }) : message.imageURL && /* eslint-disable-next-line @next/next/no-img-element */ /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                            alt: "Pi\xe8ce jointe",
                                                            className: "max-h-72 w-full max-w-[260px] rounded-xl object-cover",
                                                            loading: "lazy",
                                                            src: message.imageURL
                                                        }),
                                                        message.imageURL && message.text && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            className: "mt-1 block",
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_linkified_text__WEBPACK_IMPORTED_MODULE_29__/* .LinkifiedText */ ._, {
                                                                mine: mine,
                                                                text: message.text
                                                            })
                                                        }),
                                                        !message.audioURL && !message.imageURL && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_linkified_text__WEBPACK_IMPORTED_MODULE_29__/* .LinkifiedText */ ._, {
                                                            mine: mine,
                                                            text: message.text ?? ""
                                                        }),
                                                        message.poll && !isPending && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_message_poll__WEBPACK_IMPORTED_MODULE_30__/* .MessagePoll */ .M, {
                                                            currentUserId: user.id,
                                                            mine: mine,
                                                            onVote: async (choices)=>{
                                                                try {
                                                                    await (0,_lib_firebase_chat__WEBPACK_IMPORTED_MODULE_10__/* .voteOnMessagePoll */ .c)({
                                                                        ownerId: chatOwnerId,
                                                                        chatId,
                                                                        messageId: message.id,
                                                                        userId: user.id,
                                                                        choices,
                                                                        voter: {
                                                                            name: user.name,
                                                                            username: user.username,
                                                                            photoURL: user.photoURL,
                                                                            gender: user.gender,
                                                                            avatarShape: user.avatarShape,
                                                                            avatarFrame: user.avatarFrame
                                                                        }
                                                                    });
                                                                } catch  {
                                                                    react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("Impossible d’enregistrer votre vote.");
                                                                }
                                                            },
                                                            poll: message.poll,
                                                            votes: message.pollVotes ?? {}
                                                        }),
                                                        message.location && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                    className: "mt-1 flex w-full max-w-full items-center gap-1 rounded-full bg-main-accent/10 px-2.5 py-1 text-sm font-bold text-main-accent transition hover:bg-main-accent/20",
                                                                    onClick: (event)=>{
                                                                        event.stopPropagation();
                                                                        setMapLocation(message.location ?? null);
                                                                    },
                                                                    type: "button",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_12__/* .MaterialIcon */ .O, {
                                                                            className: "h-4 w-4 shrink-0",
                                                                            iconName: "location_on"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                            className: "min-w-0 truncate",
                                                                            children: message.location
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_location_map_modal__WEBPACK_IMPORTED_MODULE_22__/* .LocationMapModal */ .D, {
                                                                    closeModal: ()=>setMapLocation(null),
                                                                    location: mapLocation ?? "",
                                                                    open: mapLocation === message.location
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                isLastOfGroup && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("absolute top-full mt-0.5 px-2 text-[11px] text-light-secondary dark:text-dark-secondary", mine ? "right-0 text-right" : "left-0 text-left"),
                                                    children: new Date(message.createdAt).toLocaleTimeString("fr-FR", {
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })
                                                })
                                            ]
                                        }),
                                        mine && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("w-9 shrink-0", !isLastOfGroup && "invisible"),
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_avatar__WEBPACK_IMPORTED_MODULE_15__/* .UserAvatar */ .Y, {
                                                alt: user.name,
                                                frame: user.avatarFrame,
                                                gender: user.gender,
                                                shape: user.avatarShape,
                                                size: 36,
                                                src: user.photoURL
                                            })
                                        })
                                    ]
                                }),
                                message.linkPreview && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_link_preview_card__WEBPACK_IMPORTED_MODULE_27__/* .LinkPreviewCard */ .y, {
                                    className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("mt-1", mine ? "self-end" : "self-start"),
                                    preview: message.linkPreview
                                }),
                                aiEnabled && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ai_message_tools__WEBPACK_IMPORTED_MODULE_34__/* .AiMessageTools */ .a, {
                                    message: message,
                                    mine: mine,
                                    settings: aiSettings
                                })
                            ]
                        }, message.id);
                    })
                })
            }),
            canPost ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "mt-auto border-t border-light-border px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] dark:border-dark-border md:px-4",
                children: recording || voiceBusy ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "flex items-center gap-3 rounded-3xl bg-main-search-background px-4 py-2",
                    children: voiceBusy ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_13__/* .CustomIcon */ .d, {
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
                                children: formatTime(recordSeconds)
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "flex-1 truncate text-right text-xs text-light-secondary dark:text-dark-secondary",
                                children: "Message vocal en cours…"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                "aria-label": "Annuler le message vocal",
                                className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-light-secondary transition hover:bg-black/5 dark:text-dark-secondary dark:hover:bg-white/5",
                                onClick: ()=>stopRecording(true),
                                type: "button",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_12__/* .MaterialIcon */ .O, {
                                    className: "h-5 w-5",
                                    iconName: "close"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                "aria-label": "Envoyer le message vocal",
                                className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-main-accent text-white transition hover:brightness-90 active:scale-95",
                                onClick: ()=>stopRecording(false),
                                type: "button",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_12__/* .MaterialIcon */ .O, {
                                    className: "h-4 w-4",
                                    iconName: "send",
                                    solid: true
                                })
                            })
                        ]
                    })
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex flex-col gap-2",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.AnimatePresence, {
                            initial: false,
                            children: poll && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_input_poll_preview__WEBPACK_IMPORTED_MODULE_24__/* .PollPreview */ .z, {
                                poll: poll,
                                onEdit: ()=>setPollOpen(true),
                                onRemove: ()=>setPoll(null)
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.AnimatePresence, {
                            initial: false,
                            children: messageLocation && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_input_location_preview__WEBPACK_IMPORTED_MODULE_25__/* .LocationPreview */ .J, {
                                location: messageLocation,
                                onEdit: ()=>setLocationOpen(true),
                                onRemove: ()=>setMessageLocation(null)
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.AnimatePresence, {
                            initial: false,
                            children: scheduledDate && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_input_schedule_preview__WEBPACK_IMPORTED_MODULE_26__/* .SchedulePreview */ .G, {
                                date: scheduledDate,
                                onEdit: ()=>setScheduleOpen(true),
                                onRemove: ()=>setScheduledDate(null)
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.AnimatePresence, {
                            initial: false,
                            children: attachOpen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.div, {
                                animate: attachMenuAnimation.animate,
                                className: "overflow-hidden",
                                "data-attach-menu": true,
                                exit: attachMenuAnimation.exit,
                                initial: attachMenuAnimation.initial,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "flex flex-wrap items-center gap-1 rounded-3xl bg-main-search-background px-2 py-2",
                                    children: [
                                        ...ATTACH_OPTIONS,
                                        ...aiEnabled ? AI_ATTACH_OPTIONS : []
                                    ].map(({ name , iconName  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            "aria-label": name,
                                            className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-main-accent transition hover:bg-main-accent/10 active:bg-main-accent/20 disabled:opacity-40",
                                            disabled: imageBusy,
                                            onClick: (event)=>{
                                                setAttachOpen(false);
                                                if (name === "Media") attachInputRef.current?.click();
                                                else if (name === "GIF") setGifOpen(true);
                                                else if (name === "Traduire") void handleTranslateDraft();
                                                else if (name === "R\xe9\xe9crire") void handleRewriteDraft();
                                                else if (name === "Emoji") {
                                                    const area = textAreaRef.current;
                                                    setEmojiCaret(area?.selectionStart ?? text.length);
                                                    setEmojiOpen(true);
                                                } else if (name === "Sondage") setPollOpen(true);
                                                else if (name === "Schedule") setScheduleOpen(true);
                                                else if (name === "Location") setLocationOpen(true);
                                            },
                                            title: name,
                                            type: "button",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_12__/* .MaterialIcon */ .O, {
                                                className: "h-5 w-5",
                                                iconName: iconName
                                            })
                                        }, name))
                                })
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.AnimatePresence, {
                            initial: false,
                            children: linkPreview && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_link_preview_card__WEBPACK_IMPORTED_MODULE_27__/* .LinkPreviewCard */ .y, {
                                preview: linkPreview
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.AnimatePresence, {
                            initial: false,
                            children: attachedImage && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.div, {
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                className: "flex items-center gap-3 rounded-2xl bg-main-search-background p-2",
                                exit: {
                                    opacity: 0,
                                    y: 8,
                                    transition: {
                                        duration: 0.15
                                    }
                                },
                                initial: {
                                    opacity: 0,
                                    y: 8
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        alt: "Image jointe",
                                        className: "h-16 w-16 shrink-0 rounded-xl object-cover",
                                        src: attachedImage.src
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: "text-sm font-semibold text-light-primary dark:text-dark-primary",
                                                children: "Image jointe"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: "text-xs text-light-secondary dark:text-dark-secondary",
                                                children: "Envoy\xe9e avec le prochain message."
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        "aria-label": "Retirer l’image",
                                        className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-light-secondary transition hover:bg-black/5 dark:text-dark-secondary dark:hover:bg-white/5",
                                        onClick: removeAttachedImage,
                                        title: "Retirer l’image",
                                        type: "button",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_12__/* .MaterialIcon */ .O, {
                                            className: "h-5 w-5",
                                            iconName: "close"
                                        })
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "relative flex items-center gap-2 rounded-3xl bg-main-search-background px-3 py-1.5 focus-within:ring-2 focus-within:ring-main-accent",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    "aria-expanded": attachOpen,
                                    "aria-label": "Ouvrir le menu des options",
                                    className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white", "transition hover:brightness-90 active:scale-95", attachOpen ? "bg-main-accent/90" : "bg-main-accent"),
                                    "data-attach-toggle": true,
                                    onClick: ()=>setAttachOpen((open)=>!open),
                                    onMouseDown: (event)=>event.stopPropagation(),
                                    title: "Options",
                                    type: "button",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_12__/* .MaterialIcon */ .O, {
                                        className: "h-4 w-4 text-white",
                                        iconName: "description"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "relative min-w-0 flex-1 self-center",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_textarea_autosize__WEBPACK_IMPORTED_MODULE_5___default()), {
                                            className: "relative z-10 block w-full resize-none break-all bg-transparent py-1.5 text-[15px] leading-[1.45] text-transparent caret-light-primary outline-none placeholder:text-transparent dark:caret-dark-primary",
                                            maxRows: 5,
                                            minRows: 1,
                                            onChange: (event)=>handleTextChange(event.target.value),
                                            /* Revenir dans la barre de texte referme le menu. */ onFocus: ()=>setAttachOpen(false),
                                            onKeyDown: handleKeyDown,
                                            onPaste: handleImagePaste,
                                            placeholder: "\xc9crivez un message…",
                                            ref: textAreaRef,
                                            value: text
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "pointer-events-none absolute inset-0 py-1.5",
                                            children: !text ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "text-[15px] leading-[1.45] text-light-secondary dark:text-dark-secondary",
                                                children: scheduledDate ? `Programmé pour le ${scheduledDate.toLocaleString("fr-FR")}…` : "\xc9crivez un message…"
                                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_composer_text__WEBPACK_IMPORTED_MODULE_28__/* .ComposerText */ .z, {
                                                className: "block break-all text-[15px] leading-[1.45] text-light-primary dark:text-dark-primary",
                                                text: text
                                            })
                                        })
                                    ]
                                }),
                                imageBusy ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_13__/* .CustomIcon */ .d, {
                                    className: "h-5 w-5 shrink-0 animate-spin text-main-accent",
                                    iconName: "SpinnerIcon"
                                }) : text.trim() || attachedImage || poll || messageLocation ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    "aria-label": scheduledDate ? "Programmer le message" : "Envoyer le message",
                                    className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-main-accent text-white transition hover:brightness-90 active:scale-95 disabled:opacity-60",
                                    disabled: sending,
                                    onClick: ()=>void handleSubmit(),
                                    type: "button",
                                    children: scheduledDate ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_12__/* .MaterialIcon */ .O, {
                                        className: "h-4 w-4",
                                        iconName: "calendar_month",
                                        solid: true
                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_12__/* .MaterialIcon */ .O, {
                                        className: "h-4 w-4",
                                        iconName: "send",
                                        solid: true
                                    })
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    "aria-label": "Enregistrer un message vocal",
                                    className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-main-accent text-white transition hover:brightness-90 active:scale-95",
                                    onClick: ()=>void startRecording(),
                                    type: "button",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AudioWaveIcon, {
                                        className: "h-4 w-4"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            accept: "image/*",
                            className: "hidden",
                            onChange: (event)=>void handleImageSelect(event),
                            ref: attachInputRef,
                            type: "file"
                        })
                    ]
                })
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "border-t border-light-border px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] dark:border-dark-border md:px-4",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "mx-auto max-w-md rounded-xl bg-main-search-background px-4 py-3 text-center text-sm text-light-secondary dark:text-dark-secondary",
                    children: "Ceci est une cha\xeene, vous ne pouvez pas \xe9crire"
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5755:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ GroupAvatar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_media__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8540);




/** Nombre d'avatars superposés au maximum. */ const MAX_STACKED = 3;
/** Disposition des avatars superposés selon leur nombre. */ function getLayout(count) {
    if (count === 2) return [
        {
            top: 0,
            left: 0
        },
        {
            bottom: 0,
            right: 0
        }
    ];
    return [
        {
            top: 0,
            left: 0
        },
        {
            top: 0,
            right: 0
        },
        {
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)"
        }
    ];
}
/**
 * Avatar d'un membre : sa photo si elle se charge, sinon l'avatar par défaut
 * du site placé en arrière-plan (comme partout ailleurs dans le site, y compris
 * quand l'ancienne photo n'est plus disponible).
 */ function MemberAvatar({ member , size  }) {
    const defaultSrc = (0,_lib_media__WEBPACK_IMPORTED_MODULE_3__/* .getAvatarSrc */ .SJ)(null, member.gender);
    const src = (0,_lib_media__WEBPACK_IMPORTED_MODULE_3__/* .getAvatarSrc */ .SJ)(member.photoURL, member.gender);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: "group-avatar-member relative block h-full w-full bg-cover bg-center",
        style: {
            backgroundImage: `url("${defaultSrc}")`
        },
        children: src === defaultSrc ? null : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
            alt: "",
            className: "block h-full w-full object-cover",
            height: size,
            onError: (event)=>{
                /* Photo cassée : on la masque, l'avatar par défaut reste visible. */ event.currentTarget.style.opacity = "0";
            },
            src: src,
            width: size
        })
    });
}
function GroupAvatar({ photoURL , members =[] , size =44 , className  }) {
    const { 0: photoBroken , 1: setPhotoBroken  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Les membres ayant une vraie photo passent en premier : ils sont ainsi
     toujours visibles, même si le groupe compte beaucoup de monde. */ const ordered = [
        ...members
    ].sort((first, second)=>Number(Boolean(second.photoURL?.trim())) - Number(Boolean(first.photoURL?.trim())));
    const stacked = ordered.slice(0, MAX_STACKED);
    const showPhoto = Boolean(photoURL) && !photoBroken;
    if (showPhoto) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
            className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("relative block shrink-0 overflow-hidden rounded-xl bg-main-search-background", className),
            style: {
                width: size,
                height: size
            },
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                alt: "",
                className: "block h-full w-full object-cover",
                height: size,
                onError: ()=>setPhotoBroken(true),
                src: photoURL,
                width: size
            })
        });
    }
    /* Aucun membre à afficher : rond neutre et vide. */ if (!stacked.length) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
            "aria-hidden": "true",
            className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("relative block shrink-0 rounded-full border border-light-border bg-main-search-background dark:border-dark-border", className),
            style: {
                width: size,
                height: size
            }
        });
    }
    if (stacked.length === 1) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
            className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("relative block shrink-0 overflow-hidden rounded-full bg-main-search-background", className),
            style: {
                width: size,
                height: size
            },
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MemberAvatar, {
                member: stacked[0],
                size: size
            })
        });
    }
    const layout = getLayout(stacked.length);
    const avatarSize = stacked.length === 2 ? "62%" : "56%";
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        "aria-hidden": "true",
        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("relative block shrink-0", className),
        style: {
            width: size,
            height: size
        },
        children: stacked.map((member, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "group-avatar-stack absolute block overflow-hidden rounded-full ring-2 ring-main-background",
                style: {
                    width: avatarSize,
                    height: avatarSize,
                    ...layout[index]
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MemberAvatar, {
                    member: member,
                    size: size
                })
            }, member.id))
    });
}


/***/ }),

/***/ 7528:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ MessagePoll)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6197);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3325);
/* harmony import */ var _components_common_voter_stack__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4898);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__]);
framer_motion__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const barSpring = {
    type: "spring",
    stiffness: 170,
    damping: 22
};
const percentSpring = {
    type: "spring",
    stiffness: 140,
    damping: 20
};
/**
 * Sondage de conversation.
 *
 * Chaque participant peut changer d'avis autant de fois qu'il veut : cliquer
 * sur une case la coche, recliquer la décoche, et un choix unique remplace
 * l'éventuelle case cochée précédemment. Les résultats se mettent à jour en
 * direct, car les votes sont écrits dans le document du message.
 *
 * L'affichage reprend celui des sondages de publication : barre de
 * proportion animée derrière le libellé, pourcentage, avatars des votants et
 * coche sur le choix coché. Les couleurs s'adaptent à la bulle (bleue pour un
 * message envoyé, blanche pour un message reçu).
 */ function MessagePoll({ poll , votes , currentUserId , mine =false , onVote  }) {
    const currentChoices = votes[currentUserId]?.choices ?? [];
    const voteList = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>Object.values(votes ?? {}), [
        votes
    ]);
    /* Comme pour les publications, un « vote » est une personne : les
     pourcentages se calculent sur le nombre de votants. */ const totalVoters = voteList.length;
    const counts = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const result = {};
        poll.options.forEach(({ id  })=>result[id] = 0);
        voteList.forEach(({ choices  })=>(choices ?? []).forEach((choice)=>{
                if (choice in result) result[choice] += 1;
            }));
        return result;
    }, [
        poll.options,
        voteList
    ]);
    const votersByOption = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const result = {};
        poll.options.forEach(({ id  })=>result[id] = []);
        voteList.forEach((vote)=>(vote.choices ?? []).forEach((choice)=>{
                if (result[choice]) result[choice].push(vote);
            }));
        return result;
    }, [
        poll.options,
        voteList
    ]);
    const toggle = (optionId)=>{
        /* Choix unique : on coche la case, ou on la décoche si elle l'est déjà. */ if (!poll.multiple) void onVote(currentChoices.length === 1 && currentChoices[0] === optionId ? [] : [
            optionId
        ]);
        else void onVote(poll.options.map(({ id  })=>id).filter((id)=>currentChoices.includes(id) ? id !== optionId : id === optionId));
    };
    return(/* Sur ordinateur, le sondage garde une largeur minimale : les options
       restent lisibles et la bulle ne se réduit pas à la largeur du libellé.
       Sur téléphone, il s'adapte à la largeur de l'écran. */ /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex w-full min-w-0 max-w-full flex-col gap-2.5 sm:min-w-[20rem]",
        children: [
            poll.question && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "whitespace-pre-wrap break-words font-bold leading-snug",
                children: poll.question
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "flex flex-col gap-1.5",
                children: poll.options.map(({ id , text  })=>{
                    const count = counts[id] ?? 0;
                    const percent = totalVoters ? Math.round(count / totalVoters * 100) : 0;
                    const isChosen = currentChoices.includes(id);
                    const voters = votersByOption[id] ?? [];
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.button, {
                        type: "button",
                        className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("group relative flex min-h-[2.5rem] w-full min-w-0 items-center gap-2.5 overflow-hidden rounded-xl border px-3 py-2 text-left transition-colors", isChosen ? mine ? "border-white/70" : "border-main-accent" : mine ? "border-white/25" : "border-light-line-reply hover:border-main-accent/60 dark:border-dark-border"),
                        onClick: ()=>toggle(id),
                        "aria-pressed": isChosen,
                        "aria-label": `${text} : ${percent} %`,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.span, {
                                "aria-hidden": "true",
                                className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("absolute inset-y-0 left-0", mine ? isChosen ? "bg-white/30" : "bg-white/10" : isChosen ? "bg-main-accent/25" : "bg-main-accent/10"),
                                initial: false,
                                animate: {
                                    width: `${percent}%`
                                },
                                transition: barSpring
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("relative z-10 min-w-0 flex-1 truncate", isChosen && "font-bold"),
                                children: text
                            }),
                            voters.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_voter_stack__WEBPACK_IMPORTED_MODULE_5__/* .VoterStack */ .f, {
                                countClassName: "opacity-80",
                                size: 16,
                                voters: voters
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "relative z-10 flex shrink-0 items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.AnimatePresence, {
                                        initial: false,
                                        mode: "wait",
                                        children: isChosen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.span, {
                                            initial: {
                                                scale: 0,
                                                opacity: 0
                                            },
                                            animate: {
                                                scale: 1,
                                                opacity: 1
                                            },
                                            exit: {
                                                scale: 0,
                                                opacity: 0
                                            },
                                            transition: {
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 22
                                            },
                                            className: "flex",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_4__/* .MaterialIcon */ .O, {
                                                className: "h-4 w-4",
                                                iconName: "check_circle",
                                                solid: true
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.span, {
                                        initial: {
                                            scale: 1.25
                                        },
                                        animate: {
                                            scale: 1
                                        },
                                        transition: percentSpring,
                                        className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("rounded-full px-2 py-0.5 text-xs font-bold tabular-nums", mine ? isChosen ? "bg-white/25" : "bg-white/10" : isChosen ? "bg-main-accent/20 text-main-accent" : "bg-main-search-background/60 text-light-secondary dark:bg-dark-primary/20 dark:text-dark-secondary"),
                                        children: [
                                            percent,
                                            "%"
                                        ]
                                    }, percent)
                                ]
                            })
                        ]
                    }, id);
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex min-h-[1.25rem] flex-wrap items-center gap-x-1.5 text-xs opacity-80",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "font-bold",
                        children: [
                            totalVoters,
                            " vote",
                            totalVoters > 1 ? "s" : ""
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        "aria-hidden": "true",
                        children: "\xb7"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: poll.multiple ? "Plusieurs r\xe9ponses" : "Une seule r\xe9ponse"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "text-[11px] opacity-70",
                children: currentChoices.length ? "Cliquez \xe0 nouveau pour changer." : "Cliquez sur une r\xe9ponse pour voter."
            })
        ]
    }));
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4407:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P7": () => (/* binding */ AI_CONVERSATION_ID),
/* harmony export */   "Q8": () => (/* binding */ aiBotUser),
/* harmony export */   "Wi": () => (/* binding */ AI_BOT_DESCRIPTION),
/* harmony export */   "hO": () => (/* binding */ appendAiMessage),
/* harmony export */   "q_": () => (/* binding */ ensureAiConversation),
/* harmony export */   "sV": () => (/* binding */ AI_BOT_NAME)
/* harmony export */ });
/* unused harmony exports AI_BOT_ID, isAiConversation, touchAiConversation */
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1492);
/* harmony import */ var _firebase_collections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5342);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_0__, _firebase_collections__WEBPACK_IMPORTED_MODULE_1__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_0__, _firebase_collections__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


/** Identifiant du participant « intelligence artificielle ». */ const AI_BOT_ID = "inspiration-ai";
/**
 * Identifiant de la conversation avec l'assistant.
 *
 * La conversation est rangée dans la boîte de la personne qui l'utilise :
 * `users/{uid}/conversations/ai`. Aucun tri entre participants n'est donc
 * nécessaire, et elle n'apparaît chez personne d'autre.
 */ const AI_CONVERSATION_ID = "ai";
/** Nom affiché de l'assistant. */ const AI_BOT_NAME = "Assistant IA";
/** Description affichée sous le nom de l'assistant. */ const AI_BOT_DESCRIPTION = "Posez une question, demandez une traduction ou un r\xe9sum\xe9.";
/** Profil de l'assistant, utilisé pour son avatar et son nom. */ const aiBotUser = {
    id: AI_BOT_ID,
    bio: AI_BOT_DESCRIPTION,
    name: AI_BOT_NAME,
    theme: null,
    accent: null,
    website: null,
    phoneNumber: null,
    location: null,
    birthDate: null,
    username: "assistant_ia",
    photoURL: "",
    verified: true,
    following: [],
    followers: [],
    createdAt: null,
    updatedAt: null,
    totalTweets: 0,
    totalPhotos: 0,
    pinnedTweet: null,
    coverPhotoURL: null,
    gender: "autre"
};
/** La conversation est-elle celle de l'assistant ? */ function isAiConversation(conversation) {
    return conversation?.type === "ai";
}
/**
 * Crée (ou remet à jour) la conversation avec l'assistant.
 *
 * Elle est rangée dans la boîte de réception de la personne : elle apparaît
 * donc en haut de la liste, et les messages sont stockés chez elle.
 */ async function ensureAiConversation(userId) {
    const now = Date.now();
    const conversation = {
        id: AI_CONVERSATION_ID,
        participants: [
            userId
        ],
        updatedAt: now,
        lastMessage: null,
        type: "ai",
        name: AI_BOT_NAME,
        photoURL: null,
        description: AI_BOT_DESCRIPTION,
        createdBy: userId
    };
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_firebase_collections__WEBPACK_IMPORTED_MODULE_1__/* .userConversationsCollection */ .HA)(userId), AI_CONVERSATION_ID), conversation);
    return conversation;
}
/** Ajoute un message envoyé par l'assistant. */ async function appendAiMessage(userId, text) {
    const now = Date.now();
    const message = {
        id: "",
        text,
        audioURL: null,
        audioDuration: null,
        imageURL: null,
        poll: null,
        pollVotes: null,
        location: null,
        linkPreview: null,
        createdBy: AI_BOT_ID,
        createdAt: now,
        fromAI: true
    };
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.addDoc)((0,_firebase_collections__WEBPACK_IMPORTED_MODULE_1__/* .conversationMessagesCollection */ .WN)(userId, AI_CONVERSATION_ID), message);
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_firebase_collections__WEBPACK_IMPORTED_MODULE_1__/* .userConversationsCollection */ .HA)(userId), AI_CONVERSATION_ID), {
        updatedAt: now,
        lastMessage: {
            text,
            hasAudio: false,
            createdBy: AI_BOT_ID,
            createdAt: now
        }
    }, {
        merge: true
    });
}
/** Met à jour le résumé de la conversation après un message de la personne. */ async function touchAiConversation(userId, text) {
    const now = Date.now();
    await setDoc(doc(userConversationsCollection(userId), AI_CONVERSATION_ID), {
        updatedAt: now,
        lastMessage: {
            text,
            hasAudio: false,
            createdBy: userId,
            createdAt: now
        }
    }, {
        merge: true
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;