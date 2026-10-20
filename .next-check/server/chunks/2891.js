"use strict";
exports.id = 2891;
exports.ids = [2891];
exports.modules = {

/***/ 6640:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ EditTweetModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6197);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6201);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1492);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2108);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5342);
/* harmony import */ var _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7359);
/* harmony import */ var _lib_random__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5195);
/* harmony import */ var _lib_supabase_storage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8402);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3325);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9099);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__, react_hot_toast__WEBPACK_IMPORTED_MODULE_3__, firebase_firestore__WEBPACK_IMPORTED_MODULE_4__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_6__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_7__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_12__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_2__, react_hot_toast__WEBPACK_IMPORTED_MODULE_3__, firebase_firestore__WEBPACK_IMPORTED_MODULE_4__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_6__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_7__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);














const STEPS = [
    "text",
    "media",
    "save"
];
const STEP_TITLES = {
    text: "Modifier le texte",
    media: "Modifier les m\xe9dias",
    save: "Enregistrer"
};
/** Longueur maximale du texte d'une publication. */ const MAX_TEXT = 280;
/** Nombre maximal de médias dans une même publication. */ const MAX_FILES = 4;
const sheetAnimation = {
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
const stepAnimation = {
    initial: {
        opacity: 0,
        x: 24
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            damping: 26,
            stiffness: 260
        }
    },
    exit: {
        opacity: 0,
        x: -24,
        transition: {
            duration: 0.12
        }
    }
};
function StepIndicator({ step  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        "aria-label": `Étape ${step} sur ${STEPS.length}`,
        className: "flex items-center gap-1.5",
        children: [
            STEPS.map((value, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: clsx__WEBPACK_IMPORTED_MODULE_5___default()("h-1 flex-1 rounded-full transition-colors", index < step ? "bg-main-accent" : "bg-light-border dark:bg-dark-border")
                }, value)),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "ml-1 shrink-0 text-[11px] font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary",
                children: [
                    step,
                    "/",
                    STEPS.length
                ]
            })
        ]
    });
}
function EditTweetModal({ open , tweetId , closeModal  }) {
    const { user  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_6__/* .useAuth */ .aC)();
    const fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const dragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_2__.useDragControls)();
    const { 0: step , 1: setStep  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("text");
    const { 0: text , 1: setText  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: location , 1: setLocation  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: images , 1: setImages  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: initialImageCount , 1: setInitialImageCount  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: uploading , 1: setUploading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: saving , 1: setSaving  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: error , 1: setError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    /* La publication est relue à l'ouverture : on modifie toujours la version
     la plus récente, pas celle affichée dans la liste. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        let cancelled = false;
        setStep("text");
        setText("");
        setLocation("");
        setImages([]);
        setInitialImageCount(0);
        setLoading(true);
        setUploading(false);
        setSaving(false);
        setError("");
        void (async ()=>{
            try {
                const snapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.doc)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_7__/* .tweetsCollection */ .VV, tweetId));
                if (cancelled || !snapshot.exists()) return;
                const data = snapshot.data();
                setText(data.text ?? "");
                setLocation(data.location ?? "");
                setImages(data.images ?? []);
                setInitialImageCount(data.images?.length ?? 0);
            } catch  {
                if (!cancelled) setError("Publication introuvable.");
            } finally{
                if (!cancelled) setLoading(false);
            }
        })();
        return ()=>{
            cancelled = true;
        };
    }, [
        open,
        tweetId
    ]);
    const canSave = text.trim().length > 0 || images.length > 0;
    const goToStep = (next)=>{
        setError("");
        setStep(next);
    };
    const goBack = ()=>{
        const index = STEPS.indexOf(step);
        if (index > 0) setStep(STEPS[index - 1]);
    };
    /* Sur téléphone, la feuille se tire vers le bas pour se refermer. */ const handleDragEnd = (_, info)=>{
        if (info.offset.y > 100 || info.velocity.y > 550) closeModal();
    };
    const handleFiles = async (event)=>{
        const selected = event.target.files;
        event.target.value = "";
        if (!selected?.length || !user?.id) return;
        const files = Array.from(selected).filter((file)=>file.type.startsWith("image/") || file.type.startsWith("video/")).map((file)=>Object.assign(file, {
                id: (0,_lib_random__WEBPACK_IMPORTED_MODULE_13__/* .getRandomId */ .w)()
            }));
        if (!files.length) return;
        setUploading(true);
        setError("");
        try {
            const uploaded = await (0,_lib_supabase_storage__WEBPACK_IMPORTED_MODULE_9__/* .uploadImages */ .eg)(user.id, files);
            if (!uploaded?.length) {
                setError("Impossible d'ajouter ces m\xe9dias.");
                return;
            }
            setImages((previous)=>[
                    ...previous,
                    ...uploaded
                ].slice(0, MAX_FILES));
        } catch (uploadError) {
            setError(uploadError instanceof Error ? uploadError.message : "Impossible d'ajouter ces m\xe9dias.");
        } finally{
            setUploading(false);
        }
    };
    const removeImage = (id)=>{
        setImages((previous)=>previous.filter((image)=>image.id !== id));
    };
    const handleSave = async ()=>{
        if (!user?.id || saving) return;
        if (!canSave) {
            setError("Une publication ne peut pas \xeatre vide.");
            return;
        }
        setSaving(true);
        setError("");
        try {
            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.updateDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.doc)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_7__/* .tweetsCollection */ .VV, tweetId), {
                text: text.trim() || null,
                location: location.trim() || null,
                images: images.length ? images : null,
                updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.serverTimestamp)()
            });
            /* Le compteur de photos du profil suit le nombre de médias. */ const added = images.length - initialImageCount;
            if (added > 0) await (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__/* .manageTotalPhotos */ .iq)("increment", user.id);
            if (added < 0) await (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__/* .manageTotalPhotos */ .iq)("decrement", user.id);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_3__.toast.success("Publication modifi\xe9e");
            closeModal();
        } catch  {
            setError("La publication n’a pas pu \xeatre modifi\xe9e. R\xe9essayez.");
        } finally{
            setSaving(false);
        }
    };
    const stepIndex = STEPS.indexOf(step) + 1;
    const preview = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>text.trim() || "Votre texte appara\xeetra ici", [
        text
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_modal_modal__WEBPACK_IMPORTED_MODULE_12__/* .Modal */ .u_, {
        open: open,
        closeModal: closeModal,
        className: "flex items-end justify-center p-0 xs:items-center xs:p-4",
        modalAnimation: sheetAnimation,
        drag: "y",
        dragControls: dragControls,
        dragListener: false,
        dragElastic: 0.5,
        dragMomentum: true,
        dragSnapToOrigin: false,
        dragConstraints: {
            top: 0
        },
        onDragEnd: handleDragEnd,
        modalClassName: "fixed inset-x-0 bottom-0 flex max-h-[92dvh] w-full flex-col overflow-y-auto overscroll-contain rounded-t-2xl border-t border-light-line-reply bg-main-background p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl dark:border-dark-line-reply xs:static xs:max-h-[88vh] xs:max-w-lg xs:rounded-xl xs:border xs:p-6",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                "aria-label": "Faire glisser pour fermer la fen\xeatre de modification",
                className: "-mt-2 flex w-full touch-none justify-center py-3 xs:hidden",
                onPointerDown: (event)=>dragControls.start(event.nativeEvent),
                type: "button",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StepIndicator, {
                step: stepIndex
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mb-4 mt-3 flex items-start justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "text-lg font-bold text-main-accent",
                                children: STEP_TITLES[step]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "mt-1 text-sm text-light-secondary dark:text-dark-secondary",
                                children: step === "text" ? "Le texte et le lieu de la publication." : step === "media" ? "Ajoutez ou retirez les photos et vid\xe9os." : "V\xe9rifiez avant d’enregistrer."
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                        "aria-label": "Fermer",
                        className: "-mr-2 -mt-2 shrink-0 p-2",
                        onClick: closeModal,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                            className: "h-5 w-5",
                            iconName: "close"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.AnimatePresence, {
                mode: "wait",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
                    animate: "animate",
                    exit: "exit",
                    initial: "initial",
                    variants: stepAnimation,
                    children: [
                        loading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "flex justify-center py-8",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "inline-block h-6 w-6 animate-spin rounded-full border-2 border-main-accent border-t-transparent"
                            })
                        }),
                        !loading && step === "text" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "rounded-xl border border-light-line-reply p-4",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "whitespace-pre-wrap break-words text-[15px] leading-relaxed text-light-primary dark:text-dark-primary",
                                        children: preview
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "text-sm font-semibold text-light-primary dark:text-dark-primary",
                                            children: "Texte de la publication"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                            className: "w-full resize-none rounded-lg border border-light-line-reply bg-transparent p-3 text-sm text-light-primary outline-none focus:border-main-accent dark:border-dark-line-reply dark:text-dark-primary",
                                            maxLength: MAX_TEXT,
                                            placeholder: "Que voulez-vous dire ?",
                                            rows: 4,
                                            value: text,
                                            onChange: (event)=>setText(event.target.value)
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: "self-end text-xs text-light-secondary dark:text-dark-secondary",
                                            children: [
                                                text.length,
                                                "/",
                                                MAX_TEXT
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "text-sm font-semibold text-light-primary dark:text-dark-primary",
                                            children: "Lieu (facultatif)"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            className: "w-full rounded-lg border border-light-line-reply bg-transparent p-2.5 text-sm text-light-primary outline-none focus:border-main-accent dark:border-dark-line-reply dark:text-dark-primary",
                                            placeholder: "Paris, France",
                                            value: location,
                                            onChange: (event)=>setLocation(event.target.value)
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex flex-col-reverse gap-2 xs:flex-row xs:justify-end",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                                            className: "rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10",
                                            onClick: closeModal,
                                            children: "Annuler"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                                            className: "rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90",
                                            onClick: ()=>goToStep("media"),
                                            children: "Suivant"
                                        })
                                    ]
                                })
                            ]
                        }),
                        !loading && step === "media" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                images.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: images.map((image)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "relative overflow-hidden rounded-lg bg-black/30",
                                            children: [
                                                image.type?.startsWith("video/") ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("video", {
                                                    className: "h-28 w-full object-cover",
                                                    src: image.src,
                                                    muted: true,
                                                    playsInline: true
                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                    alt: image.alt ?? "",
                                                    className: "h-28 w-full object-cover",
                                                    src: image.src
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                    "aria-label": "Retirer ce m\xe9dia",
                                                    className: "absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white transition hover:bg-black/80",
                                                    onClick: ()=>removeImage(image.id),
                                                    type: "button",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                                                        className: "h-4 w-4",
                                                        iconName: "close"
                                                    })
                                                })
                                            ]
                                        }, image.id))
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    accept: "image/*,video/*",
                                    className: "hidden",
                                    multiple: true,
                                    onChange: handleFiles,
                                    ref: fileInputRef,
                                    type: "file"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                                    className: "accent-tab accent-bg-tab flex items-center justify-center gap-2 rounded-full bg-main-accent/10 px-4 py-2.5 text-sm font-semibold text-main-accent",
                                    disabled: uploading || images.length >= MAX_FILES,
                                    onClick: ()=>fileInputRef.current?.click(),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                                            className: "h-5 w-5",
                                            iconName: "add"
                                        }),
                                        uploading ? "Envoi en cours…" : images.length ? "Ajouter des m\xe9dias" : "Ajouter des photos / vid\xe9os"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "text-xs leading-5 text-light-secondary dark:text-dark-secondary",
                                    children: [
                                        images.length,
                                        "/",
                                        MAX_FILES,
                                        " m\xe9dias. Le sondage et le message vocal ne sont pas modifiables une fois la publication envoy\xe9e."
                                    ]
                                }),
                                error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "text-sm text-accent-red",
                                    role: "alert",
                                    children: error
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex flex-col-reverse gap-2 xs:flex-row xs:items-center xs:justify-between",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                                            className: "inline-flex items-center justify-center gap-1 rounded-lg px-4 py-2 font-bold hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                                            onClick: goBack,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                                                    className: "h-4 w-4",
                                                    iconName: "chevron_left"
                                                }),
                                                "Retour"
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                                            className: "rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90",
                                            onClick: ()=>goToStep("save"),
                                            children: "Suivant"
                                        })
                                    ]
                                })
                            ]
                        }),
                        !loading && step === "save" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex flex-col gap-2 rounded-xl border border-light-line-reply p-4",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-xs font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary",
                                            children: "Texte"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "whitespace-pre-wrap break-words text-[15px] leading-relaxed text-light-primary dark:text-dark-primary",
                                            children: text.trim() || "Aucun texte"
                                        }),
                                        location.trim() && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "mt-1 flex items-center gap-1.5 text-sm text-light-secondary dark:text-dark-secondary",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                                                    className: "h-4 w-4",
                                                    iconName: "location_on"
                                                }),
                                                location.trim()
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                            className: "mt-1 text-xs font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary",
                                            children: [
                                                "M\xe9dias : ",
                                                images.length
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "rounded-xl border border-light-line-reply bg-main-search-background/40 p-3 text-xs leading-5 text-light-secondary dark:border-dark-line-reply dark:text-dark-secondary",
                                    children: "La publication sera mise \xe0 jour : le texte, le lieu et les m\xe9dias seront remplac\xe9s par ce que vous voyez ici."
                                }),
                                error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "text-sm text-accent-red",
                                    role: "alert",
                                    children: error
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex flex-col-reverse gap-2 xs:flex-row xs:items-center xs:justify-between",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                                            className: "inline-flex items-center justify-center gap-1 rounded-lg px-4 py-2 font-bold hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                                            onClick: goBack,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                                                    className: "h-4 w-4",
                                                    iconName: "chevron_left"
                                                }),
                                                "Retour"
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                                            className: "inline-flex items-center justify-center gap-2 rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90",
                                            disabled: saving || !canSave,
                                            onClick: ()=>handleSave(),
                                            children: saving ? "Enregistrement…" : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                                                        className: "h-5 w-5",
                                                        iconName: "check"
                                                    }),
                                                    "Enregistrer"
                                                ]
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }, step)
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7247:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ ReportModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6197);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1492);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2108);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5342);
/* harmony import */ var _lib_supabase_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8402);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3325);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9099);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_5__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_6__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_10__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_2__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_5__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_6__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











const totalSteps = 3;
const maxAttachmentSize = 8 * 1024 * 1024;
const sheetAnimation = {
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
const stepAnimation = {
    initial: {
        opacity: 0,
        x: 24
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            damping: 26,
            stiffness: 260
        }
    },
    exit: {
        opacity: 0,
        x: -24,
        transition: {
            duration: 0.12
        }
    }
};
/* Ce qui peut être signalé. */ const prohibitedContents = [
    "Contenu ill\xe9gal : atteinte \xe0 la vie priv\xe9e, contenus impliquant des mineurs, appel \xe0 la violence, atteinte \xe0 l’int\xe9grit\xe9 physique ou morale d’autrui, encouragement \xe0 des comportements illicites.",
    "Contenu haineux : propos visant une personne ou un groupe en raison de son origine, de sa religion, de son handicap, de son sexe, de son orientation ou de ses opinions.",
    "Photo, GIF, vid\xe9o ou texte interdit : contenus \xe0 caract\xe8re sexuel non consentis, contenus mena\xe7ant la s\xe9curit\xe9 d’autrui, contenus incitant \xe0 la haine ou \xe0 la violence.",
    "Fascisme, nazisme, antis\xe9mitisme et x\xe9nophobie : ces contenus sont interdits et retir\xe9s sans d\xe9lai.",
    "Harc\xe8lement : menaces, harc\xe8lement r\xe9p\xe9t\xe9, publications visant \xe0 humilier ou \xe0 isoler une personne."
];
/* Ce qui ne constitue pas un manquement : on ne signale pas à la légère. */ const toleratedContents = [
    "Une insulte isol\xe9e, une provocation l\xe9g\xe8re ou un d\xe9saccord vif n’est pas, \xe0 lui seul, un contenu interdit : les \xe9changes entre membres restent libres tant qu’ils ne deviennent pas un harc\xe8lement.",
    "Seul un contenu r\xe9ellement grave — violence, haine, mise en danger, contenu ill\xe9gal — justifie un signalement."
];
/* Le signalement abusif : la règle qui protège les personnes innocentées.
   Aucun bannissement automatique n'est prévu : c'est l'équipe de modération
   qui décide, au cas par cas, des suites à donner. */ const abuseWarnings = [
    "Signaler \xe0 tort une personne qui n’a rien fait de grave n’aide personne : ce signalement sera simplement ignor\xe9.",
    "Les signalements r\xe9p\xe9t\xe9s sans motif s\xe9rieux sont \xe9cart\xe9s. Aucune sanction n’est appliqu\xe9e automatiquement : chaque suite donn\xe9e est d\xe9cid\xe9e par une personne, apr\xe8s examen du signalement."
];
const reasons = [
    {
        value: "illegal",
        label: "Contenu ill\xe9gal",
        description: "Vie priv\xe9e, mineurs, appel \xe0 la violence, atteinte \xe0 l’int\xe9grit\xe9 d’autrui."
    },
    {
        value: "hateful",
        label: "Contenu haineux ou mena\xe7ant",
        description: "Propos visant une personne ou un groupe, menaces, mise en danger."
    },
    {
        value: "prohibited_media",
        label: "Photo, GIF, vid\xe9o ou texte interdit",
        description: "Contenu sexuel non consenti ou contenu incitant \xe0 la haine et \xe0 la violence."
    },
    {
        value: "discrimination",
        label: "Fascisme, nazisme, antis\xe9mitisme ou racisme",
        description: "Id\xe9es, symboles ou appels reposant sur une id\xe9ologie de sup\xe9riorit\xe9."
    },
    {
        value: "harassment",
        label: "Harc\xe8lement ou humiliation",
        description: "Harc\xe8lement r\xe9p\xe9t\xe9, stalking, publications visant \xe0 isoler une personne."
    },
    {
        value: "other",
        label: "Autre motif",
        description: "Le motif ne figure pas dans la liste : d\xe9crivez-le \xe0 l’\xe9tape suivante."
    }
];
function StepIndicator({ step  }) {
    if (step === 4) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {});
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        "aria-label": `Étape ${step} sur ${totalSteps}`,
        className: "flex items-center gap-1.5",
        children: [
            Array.from({
                length: totalSteps
            }, (_, index)=>index + 1).map((value)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("h-1 flex-1 rounded-full transition-colors", value <= step ? "bg-main-accent" : "bg-light-border dark:bg-dark-border")
                }, value)),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "ml-1 shrink-0 text-[11px] font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary",
                children: [
                    step,
                    "/",
                    totalSteps
                ]
            })
        ]
    });
}
function Acknowledgement({ checked , onChange , children  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
        className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors", checked ? "border-main-accent/60 bg-main-accent/[0.07]" : "border-light-line-reply hover:bg-main-search-background/60 dark:border-dark-line-reply dark:hover:bg-dark-primary/10"),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                checked: checked,
                className: "mt-0.5 h-4 w-4 shrink-0 accent-main-accent",
                onChange: (event)=>onChange(event.target.checked),
                type: "checkbox"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "text-sm leading-6 text-light-primary dark:text-dark-primary",
                children: children
            })
        ]
    });
}
function ReportModal({ open , tweetId , tweetAuthorId , tweetAuthorUsername , tweetAuthorName , tweetText , tweetPhotoURL , closeModal  }) {
    const { user  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_5__/* .useAuth */ .aC)();
    const { 0: step , 1: setStep  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const { 0: hasRead , 1: setHasRead  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: reason , 1: setReason  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: otherReason , 1: setOtherReason  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: details , 1: setDetails  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: attachment , 1: setAttachment  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: uploading , 1: setUploading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: sending , 1: setSending  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: error , 1: setError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const dragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_2__.useDragControls)();
    /* Sur téléphone, la feuille se tire vers le bas pour se refermer. */ const handleDragEnd = (_, info)=>{
        if (info.offset.y > 100 || info.velocity.y > 550) closeModal();
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!open) return;
        setStep(1);
        setHasRead(false);
        setReason(null);
        setOtherReason("");
        setDetails("");
        setAttachment(null);
        setUploading(false);
        setSending(false);
        setError("");
    }, [
        open
    ]);
    const needsDetails = reason === "other";
    const canSend = !!reason && (!needsDetails || otherReason.trim().length > 0) && !sending;
    const goToStep = (nextStep)=>{
        setError("");
        setStep(nextStep);
    };
    const handleAttachment = async (event)=>{
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file || !user?.id) return;
        if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
            setError("Seules les images et les vid\xe9os peuvent \xeatre jointes.");
            return;
        }
        if (file.size > maxAttachmentSize) {
            setError("Pi\xe8ce jointe trop lourde : 8 Mo maximum.");
            return;
        }
        setUploading(true);
        setError("");
        try {
            const fileWithId = Object.assign(file, {
                id: `report-${Date.now()}`
            });
            const uploaded = file.type.startsWith("video/") ? await (0,_lib_supabase_storage__WEBPACK_IMPORTED_MODULE_7__/* .uploadVideoFile */ .e7)(user.id, fileWithId) : await (0,_lib_supabase_storage__WEBPACK_IMPORTED_MODULE_7__/* .uploadImageFile */ .lU)(user.id, fileWithId);
            setAttachment({
                url: uploaded.src,
                contentType: file.type,
                name: file.name
            });
        } catch  {
            setError("Impossible d’envoyer cette pi\xe8ce jointe. R\xe9essayez.");
        } finally{
            setUploading(false);
        }
    };
    const handleSend = async ()=>{
        if (!user?.id) {
            setError("Vous devez \xeatre connect\xe9 pour envoyer un signalement.");
            return;
        }
        if (!reason) {
            setError("Choisissez un motif pour continuer.");
            return;
        }
        if (needsDetails && !otherReason.trim()) {
            setError("D\xe9crivez le motif de votre signalement.");
            return;
        }
        setSending(true);
        setError("");
        try {
            const reportData = {
                tweetId,
                tweetAuthorId,
                tweetAuthorUsername,
                createdBy: user.id,
                reason,
                details: [
                    otherReason.trim(),
                    details.trim()
                ].filter(Boolean).join("\n\n"),
                attachments: attachment ? [
                    attachment
                ] : [],
                createdAt: Date.now(),
                status: "pending"
            };
            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.addDoc)((0,_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_6__/* .userReportsCollection */ .qx)(user.id), reportData);
            setStep(4);
        } catch  {
            setError("Le signalement n’a pas pu \xeatre envoy\xe9. V\xe9rifiez votre connexion et r\xe9essayez.");
        } finally{
            setSending(false);
        }
    };
    const title = step === 1 ? "Signaler une publication" : step === 2 ? "Quel est le motif ?" : step === 3 ? "Pr\xe9cisions sur le signalement" : "Demande prise en compte";
    const subtitle = step === 1 ? "Lisez les conditions avant de continuer : elles prot\xe8gent aussi les personnes qui n’ont rien fait de grave." : step === 2 ? "Choisissez le motif qui correspond le mieux au contenu signal\xe9." : step === 3 ? "Ajoutez un message ou une pi\xe8ce jointe pour aider la mod\xe9ration." : "Le signalement a bien \xe9t\xe9 transmis \xe0 l’\xe9quipe de mod\xe9ration.";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_modal_modal__WEBPACK_IMPORTED_MODULE_10__/* .Modal */ .u_, {
        open: open,
        closeModal: closeModal,
        className: "flex items-end justify-center p-0 xs:items-center xs:p-4",
        modalAnimation: sheetAnimation,
        modalClassName: "fixed inset-x-0 bottom-0 flex max-h-[92dvh] w-full flex-col overflow-y-auto overscroll-contain rounded-t-2xl border-t border-light-line-reply bg-main-background p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl dark:border-dark-line-reply xs:static xs:max-h-[88vh] xs:max-w-lg xs:rounded-xl xs:border xs:p-6",
        drag: "y",
        dragControls: dragControls,
        dragListener: false,
        dragElastic: 0.5,
        dragMomentum: true,
        dragSnapToOrigin: false,
        dragConstraints: {
            top: 0
        },
        onDragEnd: handleDragEnd,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                "aria-label": "Faire glisser pour fermer la fen\xeatre de signalement",
                className: "-mt-2 flex w-full touch-none justify-center py-3 xs:hidden",
                onPointerDown: (event)=>dragControls.start(event.nativeEvent),
                type: "button",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StepIndicator, {
                step: step
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mb-4 mt-3 flex items-start justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "text-lg font-bold text-main-accent",
                                children: title
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "mt-1 text-sm text-light-secondary dark:text-dark-secondary",
                                children: subtitle
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                        "aria-label": "Fermer",
                        className: "-mr-2 -mt-2 shrink-0 p-2",
                        onClick: closeModal,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                            className: "h-5 w-5",
                            iconName: "close"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.AnimatePresence, {
                mode: "wait",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
                    animate: "animate",
                    exit: "exit",
                    initial: "initial",
                    variants: stepAnimation,
                    children: [
                        step === 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-start gap-3 rounded-xl border border-light-border p-3 dark:border-dark-border",
                                    children: [
                                        tweetPhotoURL && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            alt: "",
                                            className: "h-10 w-10 shrink-0 rounded-full object-cover",
                                            src: tweetPhotoURL
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "min-w-0 flex-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: "truncate text-sm font-bold text-light-primary dark:text-dark-primary",
                                                    children: [
                                                        tweetAuthorName ?? tweetAuthorUsername,
                                                        " ",
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "font-normal text-light-secondary dark:text-dark-secondary",
                                                            children: [
                                                                "@",
                                                                tweetAuthorUsername
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                tweetText && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    className: "mt-0.5 overflow-hidden text-sm leading-5 text-light-secondary [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] dark:text-dark-secondary",
                                                    children: tweetText
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    "aria-label": "Conditions de signalement",
                                    className: "max-h-[38vh] overflow-y-auto overscroll-contain rounded-lg border border-light-line-reply bg-main-search-background/20 p-4 text-sm font-normal leading-6 text-light-secondary dark:border-dark-line-reply dark:bg-dark-primary/[0.04] dark:text-dark-secondary xs:max-h-[36vh]",
                                    role: "region",
                                    tabIndex: 0,
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                            className: "text-sm font-bold text-main-accent",
                                            children: "Ce qui peut \xeatre signal\xe9"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                            className: "mt-2 list-disc space-y-1.5 pl-5",
                                            children: prohibitedContents.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: item
                                                }, item))
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                            className: "mt-4 text-sm font-bold text-main-accent",
                                            children: "Ce qui n’est pas un manquement"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                            className: "mt-2 list-disc space-y-1.5 pl-5",
                                            children: toleratedContents.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: item
                                                }, item))
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                            className: "mt-4 text-sm font-bold text-main-accent",
                                            children: "Le signalement abusif"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                            className: "mt-2 list-disc space-y-1.5 pl-5",
                                            children: abuseWarnings.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    children: item
                                                }, item))
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "mt-4 border-t border-light-line-reply pt-3 text-xs text-main-accent dark:border-dark-line-reply",
                                            children: "Fin des conditions."
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Acknowledgement, {
                                    checked: hasRead,
                                    onChange: setHasRead,
                                    children: "J’ai lu ces conditions et je signale uniquement un contenu qui me para\xeet r\xe9ellement interdit."
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mt-1 flex flex-col-reverse gap-2 xs:flex-row xs:justify-end",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                                            className: "rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10",
                                            onClick: closeModal,
                                            children: "Annuler"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                                            className: "rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90",
                                            disabled: !hasRead,
                                            onClick: ()=>goToStep(2),
                                            children: "Suivant"
                                        })
                                    ]
                                })
                            ]
                        }),
                        step === 2 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "flex flex-col gap-2",
                                    children: reasons.map((item)=>{
                                        const selected = reason === item.value;
                                        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            "aria-pressed": selected,
                                            onClick: ()=>{
                                                setReason(item.value);
                                                setError("");
                                            },
                                            className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors", selected ? "border-main-accent bg-main-accent/[0.08]" : "border-light-line-reply hover:bg-main-search-background/60 dark:border-dark-line-reply dark:hover:bg-dark-primary/10"),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    "aria-hidden": "true",
                                                    className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors", selected ? "border-main-accent bg-main-accent text-white" : "border-light-line-reply bg-transparent dark:border-dark-line-reply"),
                                                    children: selected && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                                        className: "h-3 w-3",
                                                        iconName: "check"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                    className: "min-w-0 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("block text-sm font-semibold", selected ? "text-main-accent" : "text-light-primary dark:text-dark-primary"),
                                                            children: item.label
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            className: "mt-0.5 block text-xs leading-5 text-light-secondary dark:text-dark-secondary",
                                                            children: item.description
                                                        })
                                                    ]
                                                })
                                            ]
                                        }, item.value);
                                    })
                                }),
                                needsDetails && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "text-sm font-semibold text-light-primary dark:text-dark-primary",
                                            children: "D\xe9crivez le motif"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                            value: otherReason,
                                            maxLength: 300,
                                            rows: 3,
                                            placeholder: "En quelques mots, qu’est-ce qui ne respecte pas les r\xe8gles ?",
                                            onChange: (event)=>{
                                                setOtherReason(event.target.value);
                                                setError("");
                                            },
                                            className: "w-full resize-none rounded-lg border border-light-line-reply bg-transparent px-3 py-2 text-sm outline-none transition focus:border-main-accent focus:ring-2 focus:ring-main-accent/20 dark:border-dark-line-reply"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "text-xs leading-5 text-light-secondary dark:text-dark-secondary",
                                            children: otherReason.trim() ? "Merci : votre motif est enregistr\xe9." : "Le bouton \xab Suivant \xbb reste d\xe9sactiv\xe9 tant que le motif n’est pas d\xe9crit. Vous pouvez aussi revenir en arri\xe8re pour choisir un autre motif."
                                        })
                                    ]
                                }),
                                error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "text-sm text-accent-red",
                                    role: "alert",
                                    children: error
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mt-1 flex flex-col-reverse gap-2 xs:flex-row xs:items-center xs:justify-between",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                                            className: "inline-flex items-center justify-center gap-1 rounded-lg px-4 py-2 font-bold hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                                            onClick: ()=>goToStep(1),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                                    className: "h-4 w-4",
                                                    iconName: "chevron_left"
                                                }),
                                                "Retour"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex flex-col-reverse gap-2 xs:flex-row",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                                                    className: "rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10",
                                                    onClick: closeModal,
                                                    children: "Annuler"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                                                    className: "rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90",
                                                    disabled: !reason || needsDetails && !otherReason.trim(),
                                                    onClick: ()=>goToStep(3),
                                                    children: "Suivant"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        step === 3 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: "rounded-xl border border-light-border bg-main-search-background/40 p-3 text-xs leading-5 text-light-secondary dark:border-dark-border dark:text-dark-secondary",
                                    children: [
                                        "La publication signal\xe9e est",
                                        " ",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                            className: "text-main-accent",
                                            children: [
                                                "@",
                                                tweetAuthorUsername
                                            ]
                                        }),
                                        ". D\xe9crivez ce qui pose probl\xe8me, ou joignez une capture : plus votre description est pr\xe9cise, plus le traitement est rapide."
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "text-sm font-semibold text-light-primary dark:text-dark-primary",
                                            children: "Votre message (facultatif)"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                            value: details,
                                            maxLength: 1000,
                                            rows: 4,
                                            placeholder: "Expliquez en quelques lignes ce que vous avez vu.",
                                            onChange: (event)=>setDetails(event.target.value),
                                            className: "w-full resize-none rounded-lg border border-light-border bg-transparent px-3 py-2 text-sm outline-none transition focus:border-main-accent focus:ring-2 focus:ring-main-accent/20 dark:border-dark-line-reply"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex flex-col gap-1.5",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "text-sm font-semibold text-light-primary dark:text-dark-primary",
                                            children: "Pi\xe8ce jointe (facultative)"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            ref: fileInputRef,
                                            accept: "image/*,video/*",
                                            className: "hidden",
                                            onChange: handleAttachment,
                                            type: "file"
                                        }),
                                        attachment ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-3 rounded-lg border border-main-accent/40 bg-main-accent/[0.06] p-3",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                                    className: "h-5 w-5 shrink-0 text-main-accent",
                                                    iconName: attachment.contentType.startsWith("video/") ? "play_arrow" : "image"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "min-w-0 flex-1 truncate text-sm text-light-primary dark:text-dark-primary",
                                                    children: attachment.name
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                                                    "aria-label": "Retirer la pi\xe8ce jointe",
                                                    className: "shrink-0 p-1.5",
                                                    onClick: ()=>setAttachment(null),
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                                        className: "h-4 w-4",
                                                        iconName: "close"
                                                    })
                                                })
                                            ]
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                                            className: "rounded-lg border border-dashed border-light-border px-4 py-3 font-semibold text-main-accent transition hover:bg-main-accent/5 dark:border-dark-line-reply",
                                            disabled: uploading,
                                            onClick: ()=>fileInputRef.current?.click(),
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "inline-flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                                        className: "h-5 w-5",
                                                        iconName: "upload"
                                                    }),
                                                    uploading ? "Envoi en cours…" : "Joindre une image ou une vid\xe9o"
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-xs leading-5 text-light-secondary dark:text-dark-secondary",
                                            children: "Une seule pi\xe8ce jointe, 8 Mo maximum. Les fichiers envoy\xe9s restent dans l’espace priv\xe9 d’Inspiration Inc. pour l’examen de la demande : ils ne sont jamais publi\xe9s."
                                        })
                                    ]
                                }),
                                error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "text-sm text-accent-red",
                                    role: "alert",
                                    children: error
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mt-1 flex flex-col-reverse gap-2 xs:flex-row xs:items-center xs:justify-between",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                                            className: "inline-flex items-center justify-center gap-1 rounded-lg px-4 py-2 font-bold hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                                            onClick: ()=>goToStep(2),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                                    className: "h-4 w-4",
                                                    iconName: "chevron_left"
                                                }),
                                                "Retour"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex flex-col-reverse gap-2 xs:flex-row",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                                                    className: "rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10",
                                                    onClick: closeModal,
                                                    children: "Annuler"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                                                    className: "inline-flex items-center justify-center gap-2 rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90",
                                                    disabled: !canSend,
                                                    onClick: ()=>handleSend(),
                                                    children: sending ? "Envoi en cours…" : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                                                className: "h-5 w-5",
                                                                iconName: "send"
                                                            }),
                                                            "Envoyer la demande"
                                                        ]
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        step === 4 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col items-center gap-4 py-4 text-center",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.span, {
                                    "aria-hidden": "true",
                                    animate: {
                                        scale: [
                                            0.5,
                                            1.12,
                                            1
                                        ],
                                        opacity: [
                                            0,
                                            1,
                                            1
                                        ]
                                    },
                                    className: "relative flex h-20 w-20 items-center justify-center rounded-full bg-main-accent/10 text-main-accent",
                                    initial: {
                                        scale: 0.5,
                                        opacity: 0
                                    },
                                    transition: {
                                        duration: 0.45,
                                        ease: "easeOut"
                                    },
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.span, {
                                            animate: {
                                                scale: [
                                                    1,
                                                    1.35
                                                ],
                                                opacity: [
                                                    0.35,
                                                    0
                                                ]
                                            },
                                            className: "absolute inset-0 rounded-full border-2 border-main-accent",
                                            transition: {
                                                duration: 1.1,
                                                repeat: Infinity,
                                                repeatDelay: 0.35
                                            }
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_9__/* .MaterialIcon */ .O, {
                                            className: "h-10 w-10",
                                            iconName: "check",
                                            solid: true
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                            className: "text-lg font-bold text-main-accent",
                                            children: "Votre demande a \xe9t\xe9 prise en compte"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "mt-2 text-sm leading-6 text-light-secondary dark:text-dark-secondary",
                                            children: "Le signalement a \xe9t\xe9 enregistr\xe9 et sera examin\xe9 par l’\xe9quipe d’Inspiration Inc. dans les meilleurs d\xe9lais. Vous n’avez rien d’autre \xe0 faire : vous pouvez continuer \xe0 utiliser l’application normalement."
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "mt-2 text-xs leading-5 text-light-secondary dark:text-dark-secondary",
                                            children: "La personne signal\xe9e n’est pas inform\xe9e de votre signalement. Aucune mesure n’est appliqu\xe9e automatiquement : chaque suite donn\xe9e est d\xe9cid\xe9e par une personne, apr\xe8s examen du dossier."
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__/* .Button */ .z, {
                                    className: "rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90",
                                    onClick: closeModal,
                                    children: "Fermer"
                                })
                            ]
                        })
                    ]
                }, step)
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2706:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ TweetReplyModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var _lib_context_window_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6625);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9099);
/* harmony import */ var _components_input_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7277);
/* harmony import */ var _components_tweet_tweet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7293);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_3__, _components_input_input__WEBPACK_IMPORTED_MODULE_4__, _components_tweet_tweet__WEBPACK_IMPORTED_MODULE_5__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_1__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_3__, _components_input_input__WEBPACK_IMPORTED_MODULE_4__, _components_tweet_tweet__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






/* Sur téléphone, la réponse s'ouvre comme un menu glissant depuis le bas de
   l'écran (mêmes réglages que la fenêtre « Écrire »). Sur ordinateur, elle
   reste une fenêtre centrée. */ const sheetAnimation = {
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
function TweetReplyModal({ tweet , open , closeModal  }) {
    const { isMobile  } = (0,_lib_context_window_context__WEBPACK_IMPORTED_MODULE_2__/* .useWindow */ .zY)();
    const dragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_1__.useDragControls)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_3__/* .Modal */ .u_, {
        className: "flex items-end justify-center p-0 xs:items-start xs:justify-center xs:p-4",
        modalAnimation: isMobile ? sheetAnimation : undefined,
        modalClassName: "fixed inset-x-0 bottom-0 max-h-[90dvh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-t-lg border-t border-light-border bg-main-background pb-[env(safe-area-inset-bottom)] shadow-2xl dark:border-dark-border xs:static xs:my-8 xs:max-h-[90vh] xs:rounded-lg xs:border",
        drag: "y",
        dragControls: dragControls,
        dragListener: false,
        dragElastic: 0.5,
        dragMomentum: true,
        dragConstraints: {
            top: 0
        },
        onDragEnd: (_, info)=>{
            if (info.offset.y > 200 || info.velocity.y > 1000) closeModal();
        },
        open: open,
        closeModal: closeModal,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_input_input__WEBPACK_IMPORTED_MODULE_4__/* .Input */ .I, {
            modal: true,
            replyModal: true,
            sheetHandle: true,
            dragControls: dragControls,
            parent: {
                id: tweet.id,
                username: tweet.user.username
            },
            closeModal: closeModal,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_tweet_tweet__WEBPACK_IMPORTED_MODULE_5__/* .Tweet */ .t, {
                modal: true,
                parentTweet: true,
                ...tweet
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2661:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ TweetStatsModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_home_main_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3258);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_home_main_header__WEBPACK_IMPORTED_MODULE_1__]);
_components_home_main_header__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function TweetStatsModal({ children , statsType , handleClose  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_home_main_header__WEBPACK_IMPORTED_MODULE_1__/* .MainHeader */ .c, {
                useActionButton: true,
                disableSticky: true,
                tip: "Fermer",
                iconName: "close",
                className: "absolute flex w-full items-center gap-6 rounded-tl-2xl",
                title: `${statsType === "likes" ? "Aim\xe9e" : "Repost\xe9e"} par`,
                action: handleClose
            }),
            children
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5072:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ NumberStats)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6197);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6269);
/* harmony import */ var _lib_date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1944);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__]);
framer_motion__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





function NumberStats({ move , stats , alwaysShowStats  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "overflow-hidden",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.AnimatePresence, {
            mode: "wait",
            initial: false,
            children: (alwaysShowStats || !!stats) && /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.p, {
                className: "text-sm",
                ...(0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__/* .getStatsMove */ .DX)(move),
                key: stats
            }, (0,_lib_date__WEBPACK_IMPORTED_MODULE_3__/* .formatNumber */ .uf)(stats))
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 44:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ variants),
/* harmony export */   "r": () => (/* binding */ TweetActions)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1492);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6201);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6197);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2108);
/* harmony import */ var _lib_context_window_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6625);
/* harmony import */ var _lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3040);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5342);
/* harmony import */ var _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7359);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(6269);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9099);
/* harmony import */ var _components_modal_action_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9253);
/* harmony import */ var _components_modal_edit_tweet_modal__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(6640);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(3276);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(2365);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, react_hot_toast__WEBPACK_IMPORTED_MODULE_5__, framer_motion__WEBPACK_IMPORTED_MODULE_6__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_7__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_10__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_11__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_12__, _components_modal_action_modal__WEBPACK_IMPORTED_MODULE_13__, _components_modal_edit_tweet_modal__WEBPACK_IMPORTED_MODULE_14__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, react_hot_toast__WEBPACK_IMPORTED_MODULE_5__, framer_motion__WEBPACK_IMPORTED_MODULE_6__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_7__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_10__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_11__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_12__, _components_modal_action_modal__WEBPACK_IMPORTED_MODULE_13__, _components_modal_edit_tweet_modal__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




















/** Animation conservée pour le menu de partage du profil. */ const variants = {
    initial: {
        opacity: 0,
        y: -25
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 0.4
        }
    },
    exit: {
        opacity: 0,
        y: -25,
        transition: {
            duration: 0.2
        }
    }
};
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
const menuItemClass = "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-main-sidebar-background";
const tileClass = "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-main-accent/10 text-main-accent";
const pinModalData = [
    {
        title: "\xc9pingler la publication au profil ?",
        description: "Cette publication appara\xeetra en haut de votre profil et remplacera toute publication pr\xe9c\xe9demment \xe9pingl\xe9e.",
        mainBtnLabel: "\xc9pingler"
    },
    {
        title: "D\xe9s\xe9pingler la publication du profil ?",
        description: "Cette publication n’appara\xeetra plus automatiquement en haut de votre profil.",
        mainBtnLabel: "D\xe9s\xe9pingler"
    }
];
function TweetActions({ isOwner , ownerId , tweetId , parentId , username , hasImages , viewTweet , createdBy  }) {
    const { user , isAdmin  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_7__/* .useAuth */ .aC)();
    const { isMobile  } = (0,_lib_context_window_context__WEBPACK_IMPORTED_MODULE_8__/* .useWindow */ .zY)();
    const { push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { 0: menuOpen , 1: setMenuOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const dragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_6__.useDragControls)();
    const { open: removeOpen , openModal: removeOpenModal , closeModal: removeCloseModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_9__/* .useModal */ .d)();
    const { open: pinOpen , openModal: pinOpenModal , closeModal: pinCloseModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_9__/* .useModal */ .d)();
    const { open: editOpen , openModal: editOpenModal , closeModal: editCloseModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_9__/* .useModal */ .d)();
    /* La modification n'est proposée que sur nos propres publications. */ const openEditModal = ()=>{
        closeMenu();
        editOpenModal();
    };
    const { id: userId , following , pinnedTweet  } = user;
    const isInAdminControl = isAdmin && !isOwner;
    const tweetIsPinned = pinnedTweet === tweetId;
    const closeMenu = ()=>setMenuOpen(false);
    /* Sur téléphone, la feuille se tire vers le bas pour se refermer. */ const handleDragEnd = (_, info)=>{
        if (info.offset.y > 100 || info.velocity.y > 550) closeMenu();
    };
    const handleRemove = async ()=>{
        if (viewTweet) if (parentId) {
            const parentSnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_10__/* .tweetsCollection */ .VV, parentId));
            if (parentSnapshot.exists()) {
                await push(`/tweet/${parentId}`, undefined, {
                    scroll: false
                });
                (0,_lib_utils__WEBPACK_IMPORTED_MODULE_19__/* .delayScroll */ .wX)(200)();
                await (0,_lib_utils__WEBPACK_IMPORTED_MODULE_19__/* .sleep */ ._v)(50);
            } else await push("/home");
        } else await push("/home");
        await Promise.all([
            (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_11__/* .removeTweet */ ._A)(tweetId),
            (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_11__/* .manageTotalTweets */ .$1)("decrement", ownerId),
            hasImages && (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_11__/* .manageTotalPhotos */ .iq)("decrement", createdBy),
            parentId && (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_11__/* .manageReply */ .Mq)("decrement", parentId)
        ]);
        react_hot_toast__WEBPACK_IMPORTED_MODULE_5__.toast.success(`${isInAdminControl ? `La publication de @${username}` : "Votre publication"} a été supprimée`);
        removeCloseModal();
    };
    const handlePin = async ()=>{
        await (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_11__/* .managePinnedTweet */ .X_)(tweetIsPinned ? "unpin" : "pin", userId, tweetId);
        react_hot_toast__WEBPACK_IMPORTED_MODULE_5__.toast.success(`Votre publication a été ${tweetIsPinned ? "d\xe9s\xe9pingl\xe9e" : "\xe9pingl\xe9e"} sur votre profil`);
        pinCloseModal();
    };
    const handleFollow = async (type)=>{
        closeMenu();
        await (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_11__/* .manageFollow */ .gL)(type, userId, createdBy);
        react_hot_toast__WEBPACK_IMPORTED_MODULE_5__.toast.success(`${type === "follow" ? "Vous suivez maintenant" : "Vous ne suivez plus"} @${username}`);
    };
    const userIsFollowed = Array.isArray(following) && following.includes(createdBy);
    const currentPinModalData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>pinModalData[+tweetIsPinned], // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        pinOpen
    ]);
    const openRemoveModal = ()=>{
        closeMenu();
        removeOpenModal();
    };
    const openPinModal = ()=>{
        closeMenu();
        pinOpenModal();
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__/* .Button */ .z, {
                "aria-expanded": menuOpen,
                "aria-haspopup": "dialog",
                className: clsx__WEBPACK_IMPORTED_MODULE_4___default()(`main-tab group absolute top-2 right-4 p-2 xs:right-2
           hover:bg-accent-blue/10 focus-visible:bg-accent-blue/10
           focus-visible:!ring-accent-blue/80 active:bg-accent-blue/20`, menuOpen && "bg-accent-blue/10 [&>div>svg]:text-accent-blue"),
                onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_19__/* .preventBubbling */ .Db)(()=>setMenuOpen(true)),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "group relative",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_17__/* .MaterialIcon */ .O, {
                            className: "h-5 w-5 text-light-secondary group-hover:text-accent-blue group-focus-visible:text-accent-blue dark:text-dark-secondary/80",
                            iconName: "more_horiz"
                        }),
                        !menuOpen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_16__/* .ToolTip */ .e, {
                            tip: "Plus"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_modal_modal__WEBPACK_IMPORTED_MODULE_12__/* .Modal */ .u_, {
                className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("justify-center p-0", isMobile ? "flex items-end" : "flex items-center p-4"),
                closeModal: closeMenu,
                closeOnBackdropClick: true,
                modalAnimation: isMobile ? sheetAnimation : undefined,
                drag: isMobile ? "y" : undefined,
                dragControls: dragControls,
                dragListener: false,
                dragElastic: 0.5,
                dragMomentum: true,
                dragSnapToOrigin: false,
                dragConstraints: {
                    top: 0
                },
                onDragEnd: handleDragEnd,
                modalClassName: clsx__WEBPACK_IMPORTED_MODULE_4___default()("flex w-full flex-col overflow-hidden bg-main-background shadow-2xl", isMobile ? "max-h-[80dvh] max-w-lg rounded-t-xl pb-[max(1rem,env(safe-area-inset-bottom))]" : "max-w-sm rounded-lg"),
                open: menuOpen,
                children: [
                    isMobile && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        "aria-label": "Faire glisser pour fermer le menu Options",
                        className: "flex w-full touch-none justify-center py-3",
                        onPointerDown: (event)=>dragControls.start(event.nativeEvent),
                        type: "button",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
                        className: "flex items-center gap-1 px-3 py-3",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "flex-1 px-1 text-lg font-bold",
                                children: "Options"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__/* .Button */ .z, {
                                "aria-label": "Fermer",
                                className: "rounded-full p-2 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                                onClick: closeMenu,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_17__/* .MaterialIcon */ .O, {
                                    className: "h-5 w-5",
                                    iconName: "close"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col px-2 pb-2",
                        children: [
                            isOwner && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__/* .Button */ .z, {
                                className: menuItemClass,
                                onClick: openEditModal,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: tileClass,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_17__/* .MaterialIcon */ .O, {
                                            className: "h-5 w-5",
                                            iconName: "edit_square"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "min-w-0 flex-1",
                                        children: "Modifier"
                                    })
                                ]
                            }),
                            (isAdmin || isOwner) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__/* .Button */ .z, {
                                className: clsx__WEBPACK_IMPORTED_MODULE_4___default()(menuItemClass, "text-accent-red"),
                                onClick: openRemoveModal,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-red/10 text-accent-red",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_17__/* .MaterialIcon */ .O, {
                                            className: "h-5 w-5",
                                            iconName: "delete"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "min-w-0 flex-1",
                                        children: "Supprimer"
                                    })
                                ]
                            }),
                            isOwner ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__/* .Button */ .z, {
                                className: menuItemClass,
                                onClick: openPinModal,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: tileClass,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_18__/* .CustomIcon */ .d, {
                                            className: "h-5 w-5",
                                            iconName: tweetIsPinned ? "PinOffIcon" : "PinIcon"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "min-w-0 flex-1",
                                        children: tweetIsPinned ? "D\xe9s\xe9pingler du profil" : "\xc9pingler sur votre profil"
                                    })
                                ]
                            }) : userIsFollowed ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__/* .Button */ .z, {
                                className: menuItemClass,
                                onClick: ()=>void handleFollow("unfollow"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: tileClass,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_17__/* .MaterialIcon */ .O, {
                                            className: "h-5 w-5",
                                            iconName: "person_remove"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            "Ne plus suivre @",
                                            username
                                        ]
                                    })
                                ]
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__/* .Button */ .z, {
                                className: menuItemClass,
                                onClick: ()=>void handleFollow("follow"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: tileClass,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_17__/* .MaterialIcon */ .O, {
                                            className: "h-5 w-5",
                                            iconName: "person_add"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            "Suivre @",
                                            username
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_edit_tweet_modal__WEBPACK_IMPORTED_MODULE_14__/* .EditTweetModal */ .K, {
                open: editOpen,
                tweetId: tweetId,
                closeModal: editCloseModal
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_12__/* .Modal */ .u_, {
                modalClassName: "max-w-xs bg-main-background w-full p-8 rounded-2xl",
                open: removeOpen,
                closeModal: removeCloseModal,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_action_modal__WEBPACK_IMPORTED_MODULE_13__/* .ActionModal */ .W, {
                    title: "Supprimer la publication ?",
                    description: `Cette action est irréversible et la publication sera supprimée de ${isInAdminControl ? `le profil de @${username}` : "votre"} profil, le fil des comptes qui suivent ${isInAdminControl ? `@${username}` : "vous"} et des résultats de recherche Twitter.`,
                    mainBtnClassName: "bg-accent-red hover:bg-accent-red/90 active:bg-accent-red/75 accent-tab focus-visible:bg-accent-red/90",
                    mainBtnLabel: "Supprimer",
                    focusOnMainBtn: true,
                    action: handleRemove,
                    closeModal: removeCloseModal
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_12__/* .Modal */ .u_, {
                modalClassName: "max-w-xs bg-main-background w-full p-8 rounded-2xl",
                open: pinOpen,
                closeModal: pinCloseModal,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_action_modal__WEBPACK_IMPORTED_MODULE_13__/* .ActionModal */ .W, {
                    ...currentPinModalData,
                    mainBtnClassName: "bg-light-primary hover:bg-light-primary/90 active:bg-light-primary/80 dark:text-light-primary dark:bg-light-border dark:hover:bg-light-border/90 dark:active:bg-light-border/75",
                    focusOnMainBtn: true,
                    action: handlePin,
                    closeModal: pinCloseModal
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 581:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (/* binding */ TweetDate)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1944);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3276);





function TweetDate({ createdAt , tweetLink , viewTweet  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("flex gap-1", viewTweet && "py-4"),
        children: [
            !viewTweet && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                children: "\xb7"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "group relative",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: tweetLink,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("custom-underline peer whitespace-nowrap", viewTweet && "text-light-secondary dark:text-dark-secondary"),
                            children: (0,_lib_date__WEBPACK_IMPORTED_MODULE_3__/* .formatDate */ .p6)(createdAt, viewTweet ? "full" : "tweet")
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_4__/* .ToolTip */ .e, {
                        className: "translate-y-1 peer-focus:opacity-100 peer-focus-visible:visible peer-focus-visible:delay-200",
                        tip: (0,_lib_date__WEBPACK_IMPORTED_MODULE_3__/* .formatDate */ .p6)(createdAt, "full")
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 3686:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ TweetOption)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6269);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3276);
/* harmony import */ var _number_stats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5072);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_number_stats__WEBPACK_IMPORTED_MODULE_4__]);
_number_stats__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






function TweetOption({ tip , move , stats , disabled , iconName , hideStats , className , viewTweet , iconClassName , onClick  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        "aria-label": tip,
        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(`group flex items-center gap-1.5 p-0 transition-none
         disabled:cursor-not-allowed inner:transition inner:duration-200`, disabled && "cursor-not-allowed", className),
        disabled: disabled,
        onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__/* .preventBubbling */ .Db)(onClick),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("i", {
                className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("relative rounded-full p-2 not-italic group-focus-visible:ring-2", iconClassName),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_2__/* .MaterialIcon */ .O, {
                        className: viewTweet ? "h-6 w-6" : "h-5 w-5",
                        iconName: iconName
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_3__/* .ToolTip */ .e, {
                        tip: tip
                    })
                ]
            }),
            !viewTweet && !hideStats && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_number_stats__WEBPACK_IMPORTED_MODULE_4__/* .NumberStats */ .H, {
                move: move,
                stats: stats
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 730:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ TweetPoll)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1492);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6197);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5342);
/* harmony import */ var _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7359);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2108);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3325);
/* harmony import */ var _components_common_voter_stack__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4898);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, framer_motion__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_6__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_7__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, framer_motion__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_6__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










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
/** Les votes de quelqu'un, avec l'essentiel de son profil pour l'avatar. */ function buildVote(user, choices) {
    return {
        choices,
        name: user.name,
        username: user.username,
        photoURL: user.photoURL,
        ...user.gender ? {
            gender: user.gender
        } : {},
        ...user.avatarShape ? {
            avatarShape: user.avatarShape
        } : {},
        ...user.avatarFrame ? {
            avatarFrame: user.avatarFrame
        } : {}
    };
}
function TweetPoll({ tweetId , poll , pollVotes  }) {
    const { user  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_7__/* .useAuth */ .aC)();
    const userId = user?.id ?? "";
    const { 0: votes , 1: setVotes  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(pollVotes ?? {});
    const { 0: pending , 1: setPending  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setVotes(pollVotes ?? {});
    }, [
        pollVotes
    ]);
    /* Temps réel : chaque modification du document (le vote de quelqu'un
     d'autre, par exemple) met les compteurs et les avatars à jour. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const unsubscribe = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.onSnapshot)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__/* .tweetsCollection */ .VV, tweetId), (snapshot)=>{
            const data = snapshot.data();
            setVotes(data?.pollVotes ?? {});
        }, ()=>undefined);
        return unsubscribe;
    }, [
        tweetId
    ]);
    const voteList = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>Object.values(votes ?? {}), [
        votes
    ]);
    /* Ici, un « vote » est une personne : les pourcentages se calculent donc sur
     le nombre de votants, ce qui reste lisible même en choix multiple. */ const totalVoters = voteList.length;
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
    const myChoices = (userId ? votes[userId]?.choices : undefined) ?? [];
    const handleVote = (optionId)=>()=>{
            if (!user || pending) return;
            const current = votes[userId];
            let choices;
            if (!current) choices = [
                optionId
            ];
            else if (poll.multiple) choices = current.choices.includes(optionId) ? current.choices.filter((choice)=>choice !== optionId) : [
                ...current.choices,
                optionId
            ];
            else choices = current.choices.includes(optionId) ? [] : [
                optionId
            ];
            const nextVotes = {
                ...votes
            };
            setPending(true);
            if (!choices.length) {
                delete nextVotes[userId];
                setVotes(nextVotes);
                void (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_6__/* .clearPollVote */ .f$)(tweetId, userId).finally(()=>setPending(false));
                return;
            }
            const vote = buildVote(user, choices);
            nextVotes[userId] = vote;
            setVotes(nextVotes);
            void (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_6__/* .setPollVote */ .MT)(tweetId, userId, vote).finally(()=>setPending(false));
        };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col gap-2",
        children: [
            poll.question && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "whitespace-pre-wrap break-words font-bold",
                children: poll.question
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "flex flex-col gap-1.5",
                children: poll.options.map(({ id , text  })=>{
                    const count = counts[id] ?? 0;
                    const percent = totalVoters ? Math.round(count / totalVoters * 100) : 0;
                    const isChosen = myChoices.includes(id);
                    const voters = votersByOption[id] ?? [];
                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.button, {
                        type: "button",
                        className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("group relative flex min-h-[2.75rem] w-full items-center gap-2 overflow-hidden rounded-lg border px-3 py-2 text-left transition-colors", isChosen ? "border-main-accent" : "border-light-line-reply hover:border-main-accent/60 dark:border-dark-border"),
                        onClick: handleVote(id),
                        "aria-pressed": isChosen,
                        "aria-label": `${text} : ${percent} %`,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.span, {
                                "aria-hidden": "true",
                                className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("absolute inset-y-0 left-0", isChosen ? "bg-main-accent/25" : "bg-main-accent/10"),
                                initial: false,
                                animate: {
                                    width: `${percent}%`
                                },
                                transition: barSpring
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("relative z-10 min-w-0 flex-1 truncate", isChosen && "font-bold"),
                                children: text
                            }),
                            voters.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_voter_stack__WEBPACK_IMPORTED_MODULE_9__/* .VoterStack */ .f, {
                                voters: voters
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: clsx__WEBPACK_IMPORTED_MODULE_4___default()("relative z-10 flex shrink-0 items-center gap-1 text-sm tabular-nums", isChosen ? "text-main-accent" : "text-light-secondary dark:text-dark-secondary"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.AnimatePresence, {
                                        initial: false,
                                        mode: "wait",
                                        children: isChosen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.span, {
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
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_8__/* .MaterialIcon */ .O, {
                                                className: "h-4 w-4",
                                                iconName: "check_circle",
                                                solid: true
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.span, {
                                        initial: {
                                            scale: 1.25
                                        },
                                        animate: {
                                            scale: 1
                                        },
                                        transition: percentSpring,
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
                className: "flex min-h-[1.5rem] flex-wrap items-center gap-x-2 text-sm text-light-secondary dark:text-dark-secondary",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
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
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 396:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P": () => (/* binding */ TweetShare)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6201);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6197);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2108);
/* harmony import */ var _lib_context_window_context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6625);
/* harmony import */ var _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7359);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(6269);
/* harmony import */ var _lib_env__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1923);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3276);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9099);
/* harmony import */ var _components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(2365);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_4__, framer_motion__WEBPACK_IMPORTED_MODULE_5__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_6__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_13__]);
([react_hot_toast__WEBPACK_IMPORTED_MODULE_4__, framer_motion__WEBPACK_IMPORTED_MODULE_5__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_6__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_13__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
















function ShareTargetIcon({ target  }) {
    const { 0: failed , 1: setFailed  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    if (target.appIcon && !failed) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-black/5 dark:ring-white/10",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
            alt: "",
            className: "h-full w-full object-contain",
            loading: "lazy",
            onError: ()=>setFailed(true),
            src: target.appIcon
        })
    });
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", target.iconClassName),
        children: target.customIcon ?? (target.iconName && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
            className: "h-5 w-5",
            iconName: target.iconName
        }))
    });
}
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
const menuItemClass = "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-main-sidebar-background";
const tileClass = "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-main-accent/10 text-main-accent";
function TweetShare({ userId , tweetId , viewTweet , text , name , username , photoURL , previewImage  }) {
    const { userBookmarks  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_6__/* .useAuth */ .aC)();
    const { isMobile  } = (0,_lib_context_window_context__WEBPACK_IMPORTED_MODULE_7__/* .useWindow */ .zY)();
    const { 0: open , 1: setOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: view , 1: setView  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("menu");
    const dragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_5__.useDragControls)();
    const tweetURL = `${_lib_env__WEBPACK_IMPORTED_MODULE_9__/* .siteURL */ .f7}/tweet/${tweetId}`;
    const trimmedText = text?.trim() ?? "";
    const previewText = trimmedText ? trimmedText : "Publication sans texte.";
    const shareText = trimmedText ? trimmedText : "D\xe9couvrez cette publication sur Inspiration.";
    const shareBody = `${shareText}\n\n${tweetURL}`;
    const isApple = typeof navigator !== "undefined" && /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
    const tweetIsBookmarked = !!userBookmarks?.some(({ id  })=>id === tweetId);
    const close = ()=>setOpen(false);
    /* Sur téléphone, la feuille se tire vers le bas pour se refermer. */ const handleDragEnd = (_, info)=>{
        if (info.offset.y > 100 || info.velocity.y > 550) close();
    };
    const openMenu = ()=>{
        setView("menu");
        setOpen(true);
    };
    const handleCopy = async ()=>{
        close();
        await navigator.clipboard.writeText(tweetURL);
        react_hot_toast__WEBPACK_IMPORTED_MODULE_4__.toast.success("Lien copi\xe9 dans le presse-papiers");
    };
    const handleBookmark = async ()=>{
        const type = tweetIsBookmarked ? "unbookmark" : "bookmark";
        close();
        await (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_8__/* .manageBookmark */ .mN)(type, userId, tweetId);
        react_hot_toast__WEBPACK_IMPORTED_MODULE_4__.toast.success(type === "bookmark" ? ()=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "flex gap-2",
                children: [
                    "Publication ajout\xe9e \xe0 vos signets",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: "/bookmarks",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            className: "custom-underline font-bold",
                            children: "Voir"
                        })
                    })
                ]
            }) : "Publication retir\xe9e de vos signets");
    };
    /* Partage natif : c'est le vrai panneau du système (Google Messages sur
     Android, Apple Messages sur iPhone, etc.). Repli sur le presse-papiers
     quand l'appareil ne le propose pas. */ const handleSystemShare = async ()=>{
        if (!navigator.share) {
            await handleCopy();
            return;
        }
        close();
        try {
            await navigator.share({
                title: "Inspiration",
                text: shareText,
                url: tweetURL
            });
        } catch  {
        /* Partage annulé par l'utilisateur. */ }
    };
    const openTarget = (target)=>{
        close();
        if (target.onClick) {
            target.onClick();
            return;
        }
        if (!target.href) return;
        if (target.href.startsWith("http")) {
            window.open(target.href, "_blank", "noopener,noreferrer");
            return;
        }
        /* sms: et mailto: doivent ouvrir l'application native correspondante. */ window.location.href = target.href;
    };
    const shareTargets = [
        {
            id: "system",
            label: "Partage syst\xe8me",
            iconName: "ios_share",
            iconClassName: "bg-main-accent text-white",
            onClick: ()=>void handleSystemShare()
        },
        {
            id: "whatsapp",
            label: "WhatsApp",
            iconName: "chat_bubble",
            iconClassName: "bg-[#25D366] text-white",
            appIcon: "/icons/apps/whatsapp.png",
            href: `https://wa.me/?text=${encodeURIComponent(shareBody)}`
        },
        {
            id: "gmail",
            label: "Gmail",
            iconName: "mail",
            iconClassName: "bg-[#EA4335] text-white",
            appIcon: "/icons/apps/gmail.webp",
            href: `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent("Une publication sur Inspiration")}&body=${encodeURIComponent(shareBody)}`
        },
        {
            id: "messages",
            label: isApple ? "Apple Messages" : "Google Messages",
            iconName: "sms",
            iconClassName: "bg-[#1A73E8] text-white",
            appIcon: isApple ? "/icons/apps/apple-messages.svg" : "/icons/apps/google-messages.webp",
            href: `sms:${isApple ? "&" : "?"}body=${encodeURIComponent(shareBody)}`,
            customIcon: isApple ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_14__/* .CustomIcon */ .d, {
                className: "h-5 w-5",
                iconName: "AppleIcon"
            }) : undefined
        },
        {
            id: "telegram",
            label: "Telegram",
            iconName: "send",
            iconClassName: "bg-[#229ED9] text-white",
            appIcon: "/icons/apps/telegram.png",
            href: `https://t.me/share/url?url=${encodeURIComponent(tweetURL)}&text=${encodeURIComponent(shareText)}`
        },
        {
            id: "facebook",
            label: "Facebook",
            iconName: "public",
            iconClassName: "bg-[#1877F2] text-white",
            appIcon: "/icons/apps/facebook.png",
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tweetURL)}`
        },
        {
            id: "x",
            label: "X",
            iconName: "alternate_email",
            iconClassName: "bg-black text-white",
            appIcon: "/icons/apps/x.jpg",
            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(tweetURL)}&text=${encodeURIComponent(shareText)}`
        },
        {
            id: "linkedin",
            label: "LinkedIn",
            iconName: "person",
            iconClassName: "bg-[#0A66C2] text-white",
            appIcon: "/icons/apps/linkedin.svg",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(tweetURL)}`
        },
        {
            id: "email",
            label: "E-mail",
            iconName: "mail",
            iconClassName: "bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary",
            href: `mailto:?subject=${encodeURIComponent("Une publication sur Inspiration")}&body=${encodeURIComponent(shareBody)}`
        },
        {
            id: "copy",
            label: "Copier le lien",
            iconName: "content_copy",
            iconClassName: "bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary",
            onClick: ()=>void handleCopy()
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                "aria-expanded": open,
                "aria-haspopup": "dialog",
                className: clsx__WEBPACK_IMPORTED_MODULE_3___default()(`group relative flex items-center gap-1 p-0 outline-none
           transition-none hover:text-accent-blue focus-visible:text-accent-blue`, open && "text-accent-blue"),
                onClick: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_15__/* .preventBubbling */ .Db)(openMenu),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("i", {
                    className: "relative rounded-full p-2 not-italic duration-200 group-hover:bg-accent-blue/10 group-focus-visible:bg-accent-blue/10 group-focus-visible:ring-2 group-focus-visible:ring-accent-blue/80 group-active:bg-accent-blue/20",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                            className: viewTweet ? "h-6 w-6" : "h-5 w-5",
                            iconName: "ios_share"
                        }),
                        !open && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_12__/* .ToolTip */ .e, {
                            tip: "Partager"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_modal_modal__WEBPACK_IMPORTED_MODULE_13__/* .Modal */ .u_, {
                className: clsx__WEBPACK_IMPORTED_MODULE_3___default()("justify-center p-0", isMobile ? "flex items-end" : "flex items-center p-4"),
                closeModal: close,
                closeOnBackdropClick: true,
                modalAnimation: isMobile ? sheetAnimation : undefined,
                drag: isMobile ? "y" : undefined,
                dragControls: dragControls,
                dragListener: false,
                dragElastic: 0.5,
                dragMomentum: true,
                dragSnapToOrigin: false,
                dragConstraints: {
                    top: 0
                },
                onDragEnd: handleDragEnd,
                modalClassName: clsx__WEBPACK_IMPORTED_MODULE_3___default()("flex w-full flex-col overflow-hidden bg-main-background shadow-2xl", isMobile ? "max-h-[88dvh] max-w-lg rounded-t-xl pb-[max(1rem,env(safe-area-inset-bottom))]" : "max-h-[85dvh] max-w-md rounded-lg"),
                open: open,
                children: [
                    isMobile && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        "aria-label": "Faire glisser pour fermer le menu Partager",
                        className: "flex w-full touch-none justify-center py-3",
                        onPointerDown: (event)=>dragControls.start(event.nativeEvent),
                        type: "button",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
                        className: "flex items-center gap-1 px-3 py-3",
                        children: [
                            view === "share" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                                "aria-label": "Revenir au menu Partager",
                                className: "rounded-full p-2 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                                onClick: ()=>setView("menu"),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                                    className: "h-5 w-5",
                                    iconName: "arrow_back"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "flex-1 px-1 text-lg font-bold",
                                children: view === "menu" ? "Partager" : "Partager via…"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                                "aria-label": "Fermer",
                                className: "rounded-full p-2 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                                onClick: close,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                                    className: "h-5 w-5",
                                    iconName: "close"
                                })
                            })
                        ]
                    }),
                    view === "menu" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex flex-col px-2 pb-2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                                className: menuItemClass,
                                onClick: ()=>void handleCopy(),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: tileClass,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                                            className: "h-5 w-5",
                                            iconName: "content_copy"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "min-w-0 flex-1",
                                        children: "Copier le lien de la publication"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                                className: menuItemClass,
                                onClick: ()=>void handleBookmark(),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: clsx__WEBPACK_IMPORTED_MODULE_3___default()(tileClass, tweetIsBookmarked && "bg-accent-pink/10 text-accent-pink dark:bg-accent-pink/10"),
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                                            className: "h-5 w-5",
                                            iconName: "favorite",
                                            solid: tweetIsBookmarked
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "min-w-0 flex-1",
                                        children: tweetIsBookmarked ? "Retirer des signets" : "Ajouter aux signets"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                                className: menuItemClass,
                                onClick: ()=>setView("share"),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: tileClass,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                                            className: "h-5 w-5",
                                            iconName: "ios_share"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "min-w-0 flex-1",
                                        children: "Partager via…"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                                        className: "h-4 w-4 shrink-0 text-light-secondary dark:text-dark-secondary",
                                        iconName: "chevron_right"
                                    })
                                ]
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex min-h-0 flex-col gap-3 overflow-y-auto px-4 pb-4",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "rounded-xl border border-light-border bg-main-search-background/50 p-3 dark:border-dark-border",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-start gap-3",
                                    children: [
                                        photoURL ? /* eslint-disable-next-line @next/next/no-img-element */ /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            alt: "",
                                            className: "h-10 w-10 shrink-0 rounded-full object-cover",
                                            src: photoURL
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-main-accent text-sm font-bold text-white",
                                            children: (name ?? "I").charAt(0).toUpperCase()
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "min-w-0 flex-1",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                    className: "truncate text-sm font-bold text-light-primary dark:text-dark-primary",
                                                    children: [
                                                        name ? name : "Publication",
                                                        username && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            className: "ml-1 font-normal text-light-secondary dark:text-dark-secondary",
                                                            children: [
                                                                "@",
                                                                username
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    className: "mt-1 line-clamp-3 whitespace-pre-wrap break-words text-sm text-light-secondary dark:text-dark-secondary",
                                                    children: previewText
                                                })
                                            ]
                                        }),
                                        previewImage && /* eslint-disable-next-line @next/next/no-img-element */ /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            alt: "",
                                            className: "h-12 w-12 shrink-0 rounded-lg object-cover",
                                            src: previewImage
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "flex flex-col",
                                children: shareTargets.map((target)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_10__/* .Button */ .z, {
                                        className: menuItemClass,
                                        onClick: ()=>openTarget(target),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ShareTargetIcon, {
                                                target: target
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "min-w-0 flex-1 truncate font-semibold",
                                                children: target.label
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_11__/* .MaterialIcon */ .O, {
                                                className: "h-4 w-4 shrink-0 text-light-secondary dark:text-dark-secondary",
                                                iconName: "chevron_right"
                                            })
                                        ]
                                    }, target.id))
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

/***/ 1947:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ TweetStatsPanel)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1492);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6197);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9099);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_loading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9570);
/* harmony import */ var _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1708);
/* harmony import */ var _components_user_user_name__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4531);
/* harmony import */ var _components_user_user_username__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7876);
/* harmony import */ var _lib_hooks_useDocument__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6051);
/* harmony import */ var _lib_hooks_useArrayDocument__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(2322);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5342);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, framer_motion__WEBPACK_IMPORTED_MODULE_4__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_5__, _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_9__, _lib_hooks_useDocument__WEBPACK_IMPORTED_MODULE_12__, _lib_hooks_useArrayDocument__WEBPACK_IMPORTED_MODULE_13__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_14__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, framer_motion__WEBPACK_IMPORTED_MODULE_4__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_5__, _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_9__, _lib_hooks_useDocument__WEBPACK_IMPORTED_MODULE_12__, _lib_hooks_useArrayDocument__WEBPACK_IMPORTED_MODULE_13__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);















/** Dimanche → Samedi (`Date.getDay()` commence le dimanche). */ const WEEK_DAYS = [
    "D",
    "L",
    "M",
    "M",
    "J",
    "V",
    "S"
];
const MAX_LIKED_USERS = 8;
/**
 * Construit les 7 derniers jours de vues à partir de `viewsByDay`.
 * Les clés sont au format UTC, identique à celui utilisé pour l'écriture.
 */ function buildWeekStats(viewsByDay) {
    const days = [];
    for(let offset = 6; offset >= 0; offset--){
        const date = new Date();
        date.setDate(date.getDate() - offset);
        const key = date.toISOString().slice(0, 10);
        days.push({
            key,
            label: WEEK_DAYS[date.getDay()],
            value: viewsByDay[key] ?? 0
        });
    }
    return days;
}
function Metric({ iconName , label , value , className  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col items-center gap-1 rounded-2xl border border-light-border p-3 dark:border-dark-border",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("h-5 w-5", className),
                iconName: iconName
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "text-lg font-bold tabular-nums text-light-primary dark:text-dark-primary",
                children: value
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "text-[11px] text-light-secondary dark:text-dark-secondary",
                children: label
            })
        ]
    });
}
/**
 * Statistiques d'une publication (visible par son auteur) : total de vues,
 * graphique des 7 derniers jours, J'aime / réponses / reposts, et la liste
 * des personnes qui ont aimé. Popup centré sur ordinateur, feuille glissante
 * en bas de l'écran sur téléphone.
 */ function TweetStatsPanel({ tweetId , open , closeModal  }) {
    const dragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_4__.useDragControls)();
    const { data: tweet , loading  } = (0,_lib_hooks_useDocument__WEBPACK_IMPORTED_MODULE_12__/* .useDocument */ .k)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_14__/* .tweetsCollection */ .VV, tweetId), {
        disabled: !open
    });
    const likeIds = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>tweet?.userLikes ?? [], [
        tweet?.userLikes
    ]);
    const { data: likedUsers  } = (0,_lib_hooks_useArrayDocument__WEBPACK_IMPORTED_MODULE_13__/* .useArrayDocument */ .z)(likeIds, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_14__/* .usersCollection */ .W$, {
        disabled: !open || !likeIds.length
    });
    const weekStats = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>buildWeekStats(tweet?.viewsByDay ?? {}), [
        tweet?.viewsByDay
    ]);
    const totalViews = tweet?.views ?? 0;
    const totalLikes = likeIds.length;
    const totalReplies = tweet?.userReplies ?? 0;
    const totalRetweets = tweet?.userRetweets?.length ?? 0;
    const weekTotal = weekStats.reduce((total, day)=>total + day.value, 0);
    const maxValue = Math.max(1, ...weekStats.map((day)=>day.value));
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_modal_modal__WEBPACK_IMPORTED_MODULE_5__/* .Modal */ .u_, {
        className: "flex items-end justify-center p-0 xs:items-center xs:p-4",
        modalClassName: "fixed inset-x-0 bottom-0 flex max-h-[92dvh] w-full flex-col overflow-y-auto overscroll-contain rounded-t-3xl border-t border-light-border bg-main-background p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl dark:border-dark-border xs:static xs:max-h-[85vh] xs:max-w-md xs:rounded-2xl xs:border xs:p-6",
        open: open,
        closeModal: closeModal,
        drag: "y",
        dragControls: dragControls,
        dragListener: false,
        dragElastic: 0.25,
        dragMomentum: false,
        dragSnapToOrigin: true,
        onDragEnd: (_, info)=>{
            if (info.offset.y > 150 || info.velocity.y > 900) closeModal();
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                "aria-label": "Faire glisser pour fermer les statistiques",
                className: "mx-auto mb-2 flex w-full touch-none justify-center py-2 xs:hidden",
                onPointerDown: (event)=>dragControls.start(event.nativeEvent),
                type: "button",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
                className: "flex items-start justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "text-lg font-bold text-light-primary dark:text-dark-primary",
                                children: "Statistiques"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "mt-0.5 text-sm text-light-secondary dark:text-dark-secondary",
                                children: "Vues, J’aime et partages de ta publication"
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_6__/* .Button */ .z, {
                        "aria-label": "Fermer les statistiques",
                        className: "-mr-2 -mt-2 p-2",
                        onClick: closeModal,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                            className: "h-5 w-5",
                            iconName: "close"
                        })
                    })
                ]
            }),
            loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_loading__WEBPACK_IMPORTED_MODULE_8__/* .Loading */ .g, {
                className: "py-12",
                iconClassName: "h-8 w-8"
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "mt-5 flex flex-col gap-5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                        className: "flex items-center gap-3 rounded-2xl border border-light-border bg-main-search-background/20 p-4 dark:border-dark-border",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-main-accent/10 text-main-accent",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                    className: "h-6 w-6",
                                    iconName: "visibility"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-2xl font-bold tabular-nums text-light-primary dark:text-dark-primary",
                                        children: totalViews
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-xs text-light-secondary dark:text-dark-secondary",
                                        children: totalViews > 1 ? "personnes ont vu cette publication" : "personne a vu cette publication"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                        className: "flex flex-col gap-3 rounded-2xl border border-light-border p-4 dark:border-dark-border",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex items-baseline justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                        className: "text-sm font-bold text-light-primary dark:text-dark-primary",
                                        children: "Vues des 7 derniers jours"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "text-xs text-light-secondary dark:text-dark-secondary",
                                        children: [
                                            weekTotal,
                                            " cette semaine"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "flex items-end gap-1.5",
                                children: weekStats.map(({ key , label , value  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "flex min-w-0 flex-1 flex-col items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "text-[10px] font-semibold tabular-nums text-light-secondary dark:text-dark-secondary",
                                                children: value
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "flex h-20 w-full items-end",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "w-full rounded-t-md bg-main-accent transition-[height] duration-500",
                                                    style: {
                                                        height: `${Math.max(value ? value / maxValue * 100 : 0, value ? 8 : 2)}%`
                                                    },
                                                    title: `${value} vue(s)`
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "text-[10px] text-light-secondary dark:text-dark-secondary",
                                                children: label
                                            })
                                        ]
                                    }, key))
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                        className: "grid grid-cols-3 gap-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Metric, {
                                className: "text-accent-pink",
                                iconName: "favorite",
                                label: "J’aime",
                                value: totalLikes
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Metric, {
                                className: "text-main-accent",
                                iconName: "chat_bubble",
                                label: "R\xe9ponses",
                                value: totalReplies
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Metric, {
                                className: "text-accent-green",
                                iconName: "repeat",
                                label: "Reposts",
                                value: totalRetweets
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                className: "text-sm font-bold text-light-primary dark:text-dark-primary",
                                children: "Personnes qui ont aim\xe9"
                            }),
                            likedUsers?.length ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex flex-col",
                                children: [
                                    likedUsers.slice(0, MAX_LIKED_USERS).map((user)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-light-primary/5 dark:hover:bg-dark-primary/5",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_avatar__WEBPACK_IMPORTED_MODULE_9__/* .UserAvatar */ .Y, {
                                                    alt: user.name,
                                                    frame: user.avatarFrame,
                                                    gender: user.gender,
                                                    shape: user.avatarShape,
                                                    size: 36,
                                                    src: user.photoURL,
                                                    username: user.username
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "flex min-w-0 flex-col",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_name__WEBPACK_IMPORTED_MODULE_10__/* .UserName */ .v, {
                                                            name: user.name,
                                                            verified: user.verified
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_username__WEBPACK_IMPORTED_MODULE_11__/* .UserUsername */ .a, {
                                                            disableLink: true,
                                                            username: user.username
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_7__/* .MaterialIcon */ .O, {
                                                    className: "ml-auto h-4 w-4 shrink-0 text-accent-pink",
                                                    iconName: "favorite"
                                                })
                                            ]
                                        }, user.id)),
                                    likedUsers.length > MAX_LIKED_USERS && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "px-2 pt-1 text-xs text-light-secondary dark:text-dark-secondary",
                                        children: [
                                            "et ",
                                            likedUsers.length - MAX_LIKED_USERS,
                                            " autre",
                                            likedUsers.length - MAX_LIKED_USERS > 1 ? "s" : ""
                                        ]
                                    })
                                ]
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-sm text-light-secondary dark:text-dark-secondary",
                                children: "Aucun J’aime pour le moment."
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

/***/ 3894:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ TweetStats)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7359);
/* harmony import */ var _components_view_view_tweet_stats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8337);
/* harmony import */ var _components_modal_report_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7247);
/* harmony import */ var _tweet_option__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3686);
/* harmony import */ var _tweet_share__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(396);
/* harmony import */ var _tweet_stats_panel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1947);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_3__, _components_view_view_tweet_stats__WEBPACK_IMPORTED_MODULE_4__, _components_modal_report_modal__WEBPACK_IMPORTED_MODULE_5__, _tweet_option__WEBPACK_IMPORTED_MODULE_6__, _tweet_share__WEBPACK_IMPORTED_MODULE_7__, _tweet_stats_panel__WEBPACK_IMPORTED_MODULE_8__]);
([_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_3__, _components_view_view_tweet_stats__WEBPACK_IMPORTED_MODULE_4__, _components_modal_report_modal__WEBPACK_IMPORTED_MODULE_5__, _tweet_option__WEBPACK_IMPORTED_MODULE_6__, _tweet_share__WEBPACK_IMPORTED_MODULE_7__, _tweet_stats_panel__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* eslint-disable react-hooks/exhaustive-deps */ 








function TweetStats({ reply , userId , isOwner , tweetId , userLikes , views , viewTweet , userRetweets , userReplies: totalReplies , openModal , text , name , username , photoURL , previewImage , authorId  }) {
    const safeLikes = Array.isArray(userLikes) ? userLikes : [];
    const safeRetweets = Array.isArray(userRetweets) ? userRetweets : [];
    const totalLikes = safeLikes.length;
    const totalTweets = safeRetweets.length;
    const totalViews = views ?? 0;
    const { 0: { currentReplies , currentTweets , currentLikes  } , 1: setCurrentStats  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        currentReplies: totalReplies,
        currentLikes: totalLikes,
        currentTweets: totalTweets
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setCurrentStats({
            currentReplies: totalReplies,
            currentLikes: totalLikes,
            currentTweets: totalTweets
        });
    }, [
        totalReplies,
        totalLikes,
        totalTweets
    ]);
    const replyMove = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>totalReplies > currentReplies ? -25 : 25, [
        totalReplies
    ]);
    const likeMove = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>totalLikes > currentLikes ? -25 : 25, [
        totalLikes
    ]);
    const tweetMove = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>totalTweets > currentTweets ? -25 : 25, [
        totalTweets
    ]);
    const tweetIsLiked = safeLikes.includes(userId);
    const tweetIsRetweeted = safeRetweets.includes(userId);
    const isStatsVisible = !!(totalReplies || totalTweets || totalLikes);
    const { 0: statsOpen , 1: setStatsOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: reportOpen , 1: setReportOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Compte une vue (une seule fois par publication et par session). */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        void (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_3__/* .registerTweetView */ .SZ)(tweetId);
    }, [
        tweetId
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            viewTweet && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_view_view_tweet_stats__WEBPACK_IMPORTED_MODULE_4__/* .ViewTweetStats */ .o, {
                likeMove: likeMove,
                userLikes: safeLikes,
                tweetMove: tweetMove,
                replyMove: replyMove,
                userRetweets: safeRetweets,
                currentLikes: currentLikes,
                currentTweets: currentTweets,
                currentReplies: currentReplies,
                isStatsVisible: isStatsVisible
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("flex text-light-secondary inner:outline-none dark:text-dark-secondary", viewTweet ? "justify-around py-2" : "max-w-md justify-between"),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tweet_option__WEBPACK_IMPORTED_MODULE_6__/* .TweetOption */ .J, {
                        className: "hover:text-accent-blue focus-visible:text-accent-blue",
                        iconClassName: "group-hover:bg-accent-blue/10 group-active:bg-accent-blue/20 group-focus-visible:bg-accent-blue/10 group-focus-visible:ring-accent-blue/80",
                        tip: reply ? "R\xe9pondre \xe0 cette r\xe9ponse" : "R\xe9pondre",
                        move: replyMove,
                        stats: currentReplies,
                        iconName: "chat_bubble",
                        viewTweet: viewTweet,
                        onClick: openModal
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tweet_option__WEBPACK_IMPORTED_MODULE_6__/* .TweetOption */ .J, {
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("hover:text-accent-green focus-visible:text-accent-green", tweetIsRetweeted && "text-accent-green [&>i>svg]:[stroke-width:2px]"),
                        iconClassName: "group-hover:bg-accent-green/10 group-active:bg-accent-green/20 group-focus-visible:bg-accent-green/10 group-focus-visible:ring-accent-green/80",
                        tip: tweetIsRetweeted ? "Annuler le repost" : "Reposter",
                        move: tweetMove,
                        stats: currentTweets,
                        iconName: "repeat",
                        viewTweet: viewTweet,
                        onClick: (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_3__/* .manageRetweet */ .aE)(tweetIsRetweeted ? "unretweet" : "retweet", userId, tweetId)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tweet_option__WEBPACK_IMPORTED_MODULE_6__/* .TweetOption */ .J, {
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("hover:text-accent-pink focus-visible:text-accent-pink", tweetIsLiked && "text-accent-pink [&>i>svg]:fill-accent-pink"),
                        iconClassName: "group-hover:bg-accent-pink/10 group-active:bg-accent-pink/20 group-focus-visible:bg-accent-pink/10 group-focus-visible:ring-accent-pink/80",
                        tip: tweetIsLiked ? "Retirer le J’aime" : "J’aime",
                        move: likeMove,
                        stats: currentLikes,
                        iconName: "favorite",
                        viewTweet: viewTweet,
                        onClick: (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_3__/* .manageLike */ .R1)(tweetIsLiked ? "unlike" : "like", userId, tweetId)
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tweet_share__WEBPACK_IMPORTED_MODULE_7__/* .TweetShare */ .P, {
                        userId: userId,
                        tweetId: tweetId,
                        viewTweet: viewTweet,
                        text: text,
                        name: name,
                        username: username,
                        photoURL: photoURL,
                        previewImage: previewImage
                    }),
                    !isOwner && !viewTweet && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tweet_option__WEBPACK_IMPORTED_MODULE_6__/* .TweetOption */ .J, {
                        className: "hover:text-main-accent focus-visible:text-main-accent",
                        iconClassName: "group-hover:bg-main-accent/10 group-active:bg-main-accent/20 group-focus-visible:bg-main-accent/10 group-focus-visible:ring-main-accent/80",
                        tip: "Signaler le contenu",
                        iconName: "flag",
                        viewTweet: viewTweet,
                        hideStats: true,
                        onClick: ()=>setReportOpen(true)
                    }),
                    isOwner && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tweet_option__WEBPACK_IMPORTED_MODULE_6__/* .TweetOption */ .J, {
                        className: "hover:text-main-accent focus-visible:text-main-accent",
                        iconClassName: "group-hover:bg-main-accent/10 group-active:bg-main-accent/20 group-focus-visible:bg-main-accent/10",
                        tip: "Voir les statistiques",
                        move: 25,
                        stats: totalViews,
                        iconName: "pie_chart",
                        viewTweet: viewTweet,
                        onClick: ()=>setStatsOpen(true)
                    })
                ]
            }),
            isOwner && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tweet_stats_panel__WEBPACK_IMPORTED_MODULE_8__/* .TweetStatsPanel */ .M, {
                tweetId: tweetId,
                open: statsOpen,
                closeModal: ()=>setStatsOpen(false)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_report_modal__WEBPACK_IMPORTED_MODULE_5__/* .ReportModal */ .y, {
                open: reportOpen,
                tweetId: tweetId,
                tweetAuthorId: authorId ?? "",
                tweetAuthorUsername: username ?? "",
                tweetAuthorName: name,
                tweetText: text,
                tweetPhotoURL: photoURL,
                closeModal: ()=>setReportOpen(false)
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2400:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v": () => (/* binding */ TweetStatus)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6197);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2365);
/* harmony import */ var _components_input_input_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1273);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_1__, _components_input_input_form__WEBPACK_IMPORTED_MODULE_4__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_1__, _components_input_input_form__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





function TweetStatus({ type , children  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
        className: "col-span-2 grid grid-cols-[48px,1fr] gap-3 text-light-secondary dark:text-dark-secondary",
        ..._components_input_input_form__WEBPACK_IMPORTED_MODULE_4__/* .fromTop */ .TW,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                className: "justify-self-end",
                children: type === "pin" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_custom_icon__WEBPACK_IMPORTED_MODULE_3__/* .CustomIcon */ .d, {
                    className: "h-5 w-5 -rotate-45 fill-light-secondary dark:fill-dark-secondary",
                    iconName: "PinIcon"
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_2__/* .MaterialIcon */ .O, {
                    className: "h-5 w-5",
                    iconName: "repeat"
                })
            }),
            children
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ TweetText)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_common_linkified_text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1471);




/* Nombre de lignes affichées quand une publication est repliée. Au-delà, elle
   affiche « Voir plus » : la page ne prend donc jamais toute la hauteur de
   l'écran à cause d'un seul message. */ const COLLAPSED_LINES = 2;
/* Texte d'une publication. Les longs textes (beaucoup de lignes, ou des
   lignes très longues) sont repliés d'office : c'est la hauteur réellement
   affichée qui décide, une publication courte n'a donc jamais de bouton. */ function TweetText({ text , className , lines =COLLAPSED_LINES  }) {
    const textRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { 0: maxHeight , 1: setMaxHeight  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: expanded , 1: setExpanded  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Première estimation (avant la mesure) : un texte déjà très fourni est
     replié tout de suite, ce qui évite de le voir s'afficher en entier puis
     se réduire. La mesure ci-dessous corrige le tir si besoin. */ const { 0: isLongText , 1: setIsLongText  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>text.length > 200 || text.split("\n").length > lines);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const element = textRef.current;
        if (!element) return;
        const measure = ()=>{
            /* La hauteur d'une ligne vient du style calculé : la coupure tombe donc
         toujours entre deux lignes, jamais au milieu d'une ligne. */ const lineHeight = parseFloat(getComputedStyle(element).lineHeight) || 20;
            const limit = Math.round(lineHeight * lines);
            setMaxHeight(limit);
            setIsLongText(element.scrollHeight > limit + 2);
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(element);
        return ()=>observer.disconnect();
    }, [
        text,
        lines
    ]);
    const collapsed = isLongText && !expanded;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                ref: textRef,
                className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("whitespace-pre-line break-words", collapsed && "overflow-hidden", className),
                style: collapsed && maxHeight ? {
                    maxHeight
                } : undefined,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_linkified_text__WEBPACK_IMPORTED_MODULE_3__/* .LinkifiedText */ ._, {
                    text: text
                })
            }),
            isLongText && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                className: "accent-tab -mt-0.5 self-start py-1 text-sm font-bold text-main-accent outline-none transition-colors hover:underline",
                type: "button",
                onClick: ()=>setExpanded((value)=>!value),
                children: expanded ? "Voir moins" : "Voir plus"
            })
        ]
    });
}


/***/ }),

/***/ 7293:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ variants),
/* harmony export */   "t": () => (/* binding */ Tweet)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6197);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2108);
/* harmony import */ var _lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3040);
/* harmony import */ var _components_modal_tweet_reply_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2706);
/* harmony import */ var _components_input_image_preview__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1400);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3325);
/* harmony import */ var _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1708);
/* harmony import */ var _components_user_user_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7391);
/* harmony import */ var _components_user_user_name__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(4531);
/* harmony import */ var _components_user_user_username__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(7876);
/* harmony import */ var _tweet_actions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(44);
/* harmony import */ var _tweet_date__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(581);
/* harmony import */ var _tweet_status__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(2400);
/* harmony import */ var _tweet_stats__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(3894);
/* harmony import */ var _tweet_text__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(2149);
/* harmony import */ var _tweet_poll__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(730);
/* harmony import */ var _components_modal_location_map_modal__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(8613);
/* harmony import */ var _components_common_audio_player__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(6839);
/* harmony import */ var _components_common_link_preview_card__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(6152);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_4__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_6__, _components_modal_tweet_reply_modal__WEBPACK_IMPORTED_MODULE_8__, _components_input_image_preview__WEBPACK_IMPORTED_MODULE_9__, _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_11__, _tweet_actions__WEBPACK_IMPORTED_MODULE_15__, _tweet_status__WEBPACK_IMPORTED_MODULE_17__, _tweet_stats__WEBPACK_IMPORTED_MODULE_18__, _tweet_poll__WEBPACK_IMPORTED_MODULE_20__, _components_modal_location_map_modal__WEBPACK_IMPORTED_MODULE_21__, _components_common_audio_player__WEBPACK_IMPORTED_MODULE_22__, _components_common_link_preview_card__WEBPACK_IMPORTED_MODULE_23__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_4__, _lib_context_auth_context__WEBPACK_IMPORTED_MODULE_6__, _components_modal_tweet_reply_modal__WEBPACK_IMPORTED_MODULE_8__, _components_input_image_preview__WEBPACK_IMPORTED_MODULE_9__, _components_user_user_avatar__WEBPACK_IMPORTED_MODULE_11__, _tweet_actions__WEBPACK_IMPORTED_MODULE_15__, _tweet_status__WEBPACK_IMPORTED_MODULE_17__, _tweet_stats__WEBPACK_IMPORTED_MODULE_18__, _tweet_poll__WEBPACK_IMPORTED_MODULE_20__, _components_modal_location_map_modal__WEBPACK_IMPORTED_MODULE_21__, _components_common_audio_player__WEBPACK_IMPORTED_MODULE_22__, _components_common_link_preview_card__WEBPACK_IMPORTED_MODULE_23__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
























/* Une publication qui arrive au défilement apparaît directement à sa place.
   Avant, chaque nouvelle publication remontait de 8 px en 220 ms : tout ce
   qui se trouvait en dessous glissait avec elle, et le fil semblait
   « bouger » à chaque page chargée. La publication ne part plus non plus
   d'une opacité nulle, pour que le fil n'apparaisse jamais délavé. */ const variants = {
    initial: {
        opacity: 1,
        y: 0
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.15
        }
    }
};
const Tweet = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(function Tweet(tweet, ref) {
    const { id: tweetId , text , modal , images , parent , pinned , profile , userLikes , createdBy , createdAt , parentTweet , userReplies , userRetweets , views , poll , pollVotes , location , audioURL , audioDuration , linkPreview , user: tweetUserData  } = tweet;
    const { id: ownerId , name , username , verified , photoURL , gender  } = tweetUserData ?? {
        id: "",
        name: "",
        username: "",
        verified: false,
        photoURL: "",
        gender: "autre"
    };
    const { user  } = (0,_lib_context_auth_context__WEBPACK_IMPORTED_MODULE_6__/* .useAuth */ .aC)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { open , openModal , closeModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_7__/* .useModal */ .d)();
    const { 0: mapOpen , 1: setMapOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const tweetLink = `/tweet/${tweetId}`;
    const userId = user?.id;
    const isOwner = userId === createdBy;
    const { id: parentId , username: parentUsername = username  } = parent ?? {};
    const { id: profileId , name: profileName , username: profileUsername  } = profile ?? {};
    const reply = !!parent;
    const safeRetweets = Array.isArray(userRetweets) ? userRetweets : [];
    const tweetIsRetweeted = safeRetweets.includes(profileId ?? "");
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.article, {
        ref: ref,
        role: "link",
        tabIndex: modal ? -1 : 0,
        "aria-label": `Ouvrir la publication de ${name}`,
        className: clsx__WEBPACK_IMPORTED_MODULE_5___default()("accent-tab relative flex cursor-pointer flex-col gap-y-3 px-4 py-3.5 pr-6 outline-none transition-colors duration-150 ease-out hover:bg-light-primary/[0.025] dark:hover:bg-dark-primary/[0.03] active:bg-light-primary/[0.04] dark:active:bg-dark-primary/[0.05] xs:pr-4", parentTweet ? "mt-0.5 pt-2.5 pb-0" : "border-b border-light-border/60 dark:border-dark-border/60"),
        onClick: (event)=>{
            if (event.target.closest("a, button, input, textarea, button.motion-button")) return;
            void router.push(tweetLink, undefined, {
                scroll: !reply
            });
        },
        onKeyDown: (event)=>{
            if (event.key !== "Enter") return;
            if (event.target.closest("a, button, input, textarea")) return;
            void router.push(tweetLink, undefined, {
                scroll: !reply
            });
        },
        ...!modal ? {
            ...variants
        } : {},
        animate: {
            ...variants.animate,
            ...parentTweet && {
                transition: {
                    duration: 0.2
                }
            }
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_tweet_reply_modal__WEBPACK_IMPORTED_MODULE_8__/* .TweetReplyModal */ .h, {
                tweet: tweet,
                open: open,
                closeModal: closeModal
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "grid grid-cols-[auto,1fr] gap-x-3 gap-y-1",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__.AnimatePresence, {
                            initial: false,
                            children: modal ? null : pinned ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tweet_status__WEBPACK_IMPORTED_MODULE_17__/* .TweetStatus */ .v, {
                                type: "pin",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "text-sm font-bold",
                                    children: "Publication \xe9pingl\xe9e"
                                })
                            }) : tweetIsRetweeted && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tweet_status__WEBPACK_IMPORTED_MODULE_17__/* .TweetStatus */ .v, {
                                type: "tweet",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                    href: profileUsername,
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                        className: "custom-underline truncate text-sm font-bold",
                                        children: [
                                            userId === profileId ? "You" : profileName,
                                            " Retweeted"
                                        ]
                                    })
                                })
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col items-center gap-2",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_tooltip__WEBPACK_IMPORTED_MODULE_12__/* .UserTooltip */ .Y, {
                                    modal: modal,
                                    ...tweetUserData,
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_avatar__WEBPACK_IMPORTED_MODULE_11__/* .UserAvatar */ .Y, {
                                        src: photoURL,
                                        alt: name,
                                        username: username,
                                        gender: gender,
                                        shape: tweetUserData?.avatarShape,
                                        frame: tweetUserData?.avatarFrame,
                                        statusEmoji: tweetUserData?.statusEmoji
                                    })
                                }),
                                parentTweet && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                    className: "hover-animation h-full w-0.5 bg-light-line-reply dark:bg-dark-line-reply"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex min-w-0 flex-col",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex justify-between gap-2 text-light-secondary dark:text-dark-secondary",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "flex gap-1 truncate xs:overflow-visible xs:whitespace-normal",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_tooltip__WEBPACK_IMPORTED_MODULE_12__/* .UserTooltip */ .Y, {
                                                    modal: modal,
                                                    ...tweetUserData,
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_name__WEBPACK_IMPORTED_MODULE_13__/* .UserName */ .v, {
                                                        name: name,
                                                        username: username,
                                                        verified: verified,
                                                        className: "text-light-primary dark:text-dark-primary"
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_tooltip__WEBPACK_IMPORTED_MODULE_12__/* .UserTooltip */ .Y, {
                                                    modal: modal,
                                                    ...tweetUserData,
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_username__WEBPACK_IMPORTED_MODULE_14__/* .UserUsername */ .a, {
                                                        username: username
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tweet_date__WEBPACK_IMPORTED_MODULE_16__/* .TweetDate */ .C, {
                                                    tweetLink: tweetLink,
                                                    createdAt: createdAt
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "px-4",
                                            children: !modal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tweet_actions__WEBPACK_IMPORTED_MODULE_15__/* .TweetActions */ .r, {
                                                isOwner: isOwner,
                                                ownerId: ownerId,
                                                tweetId: tweetId,
                                                parentId: parentId,
                                                username: username,
                                                hasImages: !!images,
                                                createdBy: createdBy
                                            })
                                        })
                                    ]
                                }),
                                (reply || modal) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    className: clsx__WEBPACK_IMPORTED_MODULE_5___default()("text-light-secondary dark:text-dark-secondary", modal && "order-1 my-2"),
                                    children: [
                                        "En r\xe9ponse \xe0",
                                        " ",
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                            href: `/user/${parentUsername}`,
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                className: "custom-underline text-main-accent",
                                                children: [
                                                    "@",
                                                    parentUsername
                                                ]
                                            })
                                        })
                                    ]
                                }),
                                text && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tweet_text__WEBPACK_IMPORTED_MODULE_19__/* .TweetText */ .k, {
                                    text: text
                                }),
                                location && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: (event)=>{
                                                event.stopPropagation();
                                                setMapOpen(true);
                                            },
                                            className: "flex w-fit items-center gap-1 rounded-full bg-main-accent/10 px-2.5 py-1 text-sm font-bold text-main-accent transition hover:bg-main-accent/20",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_10__/* .MaterialIcon */ .O, {
                                                    className: "h-4 w-4 shrink-0",
                                                    iconName: "location_on"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "truncate",
                                                    children: location
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_location_map_modal__WEBPACK_IMPORTED_MODULE_21__/* .LocationMapModal */ .D, {
                                            open: mapOpen,
                                            closeModal: ()=>setMapOpen(false),
                                            location: location
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mt-1 flex flex-col gap-2",
                                    children: [
                                        images && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_input_image_preview__WEBPACK_IMPORTED_MODULE_9__/* .ImagePreview */ .e, {
                                            tweet: true,
                                            imagesPreview: images,
                                            previewCount: images.length
                                        }),
                                        poll && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tweet_poll__WEBPACK_IMPORTED_MODULE_20__/* .TweetPoll */ .r, {
                                            tweetId: tweetId,
                                            poll: poll,
                                            pollVotes: pollVotes
                                        }),
                                        linkPreview && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "mt-2",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_link_preview_card__WEBPACK_IMPORTED_MODULE_23__/* .LinkPreviewCard */ .y, {
                                                preview: linkPreview
                                            })
                                        }),
                                        audioURL && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "rounded-2xl bg-main-search-background px-4 py-3",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    className: "mb-2 text-xs font-semibold text-light-secondary dark:text-dark-secondary",
                                                    children: "Message vocal"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_common_audio_player__WEBPACK_IMPORTED_MODULE_22__/* .AudioPlayer */ .zF, {
                                                    duration: audioDuration,
                                                    src: audioURL
                                                })
                                            ]
                                        }),
                                        !modal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tweet_stats__WEBPACK_IMPORTED_MODULE_18__/* .TweetStats */ .b, {
                                            reply: reply,
                                            userId: userId,
                                            isOwner: isOwner,
                                            tweetId: tweetId,
                                            userLikes: userLikes,
                                            userReplies: userReplies,
                                            userRetweets: safeRetweets,
                                            views: views,
                                            openModal: modal ? undefined : openModal,
                                            text: text,
                                            name: name,
                                            username: username,
                                            photoURL: photoURL,
                                            previewImage: images?.[0]?.src,
                                            authorId: ownerId
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7391:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ UserTooltip)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function UserTooltip({ children  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: children
    });
}


/***/ }),

/***/ 8337:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ ViewTweetStats)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_hooks_useArrayDocument__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2322);
/* harmony import */ var _lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3040);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5342);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9099);
/* harmony import */ var _components_modal_tweet_stats_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2661);
/* harmony import */ var _components_tweet_number_stats__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5072);
/* harmony import */ var _components_user_user_cards__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3779);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_hooks_useArrayDocument__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_6__, _components_modal_tweet_stats_modal__WEBPACK_IMPORTED_MODULE_7__, _components_tweet_number_stats__WEBPACK_IMPORTED_MODULE_8__, _components_user_user_cards__WEBPACK_IMPORTED_MODULE_9__]);
([_lib_hooks_useArrayDocument__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_6__, _components_modal_tweet_stats_modal__WEBPACK_IMPORTED_MODULE_7__, _components_tweet_number_stats__WEBPACK_IMPORTED_MODULE_8__, _components_user_user_cards__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function ViewTweetStats({ likeMove , userLikes , tweetMove , replyMove , userRetweets , currentLikes , currentTweets , currentReplies , isStatsVisible  }) {
    const { 0: statsType , 1: setStatsType  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { open , openModal , closeModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_4__/* .useModal */ .d)();
    const { data , loading  } = (0,_lib_hooks_useArrayDocument__WEBPACK_IMPORTED_MODULE_3__/* .useArrayDocument */ .z)(statsType ? statsType === "likes" ? userLikes : userRetweets : [], _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__/* .usersCollection */ .W$, {
        disabled: !statsType
    });
    const handleOpen = (type)=>()=>{
            setStatsType(type);
            openModal();
        };
    const handleClose = ()=>{
        setStatsType(null);
        closeModal();
    };
    const allStats = [
        [
            "R\xe9ponse",
            null,
            replyMove,
            currentReplies
        ],
        [
            "Repost",
            "retweets",
            tweetMove,
            currentTweets
        ],
        [
            "J’aime",
            "likes",
            likeMove,
            currentLikes
        ]
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_6__/* .Modal */ .u_, {
                modalClassName: "relative bg-main-background rounded-2xl max-w-xl w-full h-[672px] overflow-hidden rounded-2xl",
                open: open,
                closeModal: handleClose,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_tweet_stats_modal__WEBPACK_IMPORTED_MODULE_7__/* .TweetStatsModal */ .R, {
                    statsType: statsType,
                    handleClose: handleClose,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_user_cards__WEBPACK_IMPORTED_MODULE_9__/* .UserCards */ .G, {
                        follow: true,
                        type: statsType,
                        data: data,
                        loading: loading
                    })
                })
            }),
            isStatsVisible && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "flex gap-4 px-1 py-4 text-light-secondary dark:text-dark-secondary [&>button>div]:font-bold [&>button>div]:text-light-primary dark:[&>button>div]:text-dark-primary",
                children: allStats.map(([title, type, move, stats], index)=>!!stats && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()(`hover-animation mt-0.5 mb-[3px] flex h-4 items-center gap-1 border-b 
                     border-b-transparent outline-none hover:border-b-light-primary 
                     focus-visible:border-b-light-primary dark:hover:border-b-dark-primary
                     dark:focus-visible:border-b-dark-primary`, index === 0 && "cursor-not-allowed"),
                        onClick: type ? handleOpen(type) : undefined,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_tweet_number_stats__WEBPACK_IMPORTED_MODULE_8__/* .NumberStats */ .H, {
                                move: move,
                                stats: stats
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                children: `${title}${stats > 1 ? index === 0 ? "s" : index === 1 ? "s" : "s" : ""}`
                            })
                        ]
                    }, title))
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;