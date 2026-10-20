"use strict";
exports.id = 7276;
exports.ids = [7276];
exports.modules = {

/***/ 2050:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": () => (/* binding */ InputField)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);


function InputField({ label , inputId , inputValue , inputLimit , useTextArea , inputType ="text" , inputPlaceholder , errorMessage , handleChange , handleKeyboardShortcut  }) {
    const slicedInputValue = inputValue?.slice(0, inputLimit) ?? "";
    const inputLength = slicedInputValue.length;
    const isHittingInputLimit = inputLimit && inputLength > inputLimit;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col gap-1",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("relative rounded ring-1 transition-shadow duration-200", errorMessage ? "ring-accent-red" : `ring-light-line-reply focus-within:ring-2 
                 focus-within:!ring-main-accent dark:ring-dark-border`),
                children: [
                    useTextArea ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                        className: "peer mt-6 w-full resize-none bg-inherit px-3 pb-1 placeholder-transparent outline-none transition",
                        id: inputId,
                        placeholder: inputPlaceholder ?? inputId,
                        onChange: !isHittingInputLimit ? handleChange : undefined,
                        onKeyUp: handleKeyboardShortcut,
                        value: slicedInputValue,
                        rows: 3
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        className: "peer mt-6 w-full bg-inherit px-3 pb-1 placeholder-transparent outline-none transition",
                        id: inputId,
                        type: inputType,
                        placeholder: inputPlaceholder ?? inputId,
                        onChange: !isHittingInputLimit ? handleChange : undefined,
                        value: slicedInputValue,
                        onKeyUp: handleKeyboardShortcut
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("group-peer absolute left-3 top-1.5 text-xs font-semibold text-light-secondary dark:text-dark-secondary", errorMessage ? "!text-accent-red peer-focus:text-accent-red" : "peer-focus:text-main-accent"),
                        htmlFor: inputId,
                        children: label
                    }),
                    inputLimit && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(`absolute right-3 top-0 translate-y-1 text-sm text-light-secondary transition-opacity 
               duration-200 peer-focus:visible peer-focus:opacity-100 dark:text-dark-secondary`, errorMessage ? "visible opacity-100" : "invisible opacity-0"),
                        children: [
                            inputLength,
                            " / ",
                            inputLimit
                        ]
                    })
                ]
            }),
            errorMessage && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "text-sm text-accent-red",
                children: errorMessage
            })
        ]
    });
}


/***/ }),

/***/ 7903:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ EditProfileModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6197);
/* harmony import */ var _lib_media__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8540);
/* harmony import */ var _lib_avatar_shape__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8829);
/* harmony import */ var _components_home_main_header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3258);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4685);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3325);
/* harmony import */ var _components_ui_next_image__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4664);
/* harmony import */ var _components_user_avatar_frame__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8800);
/* harmony import */ var _components_ui_tooltip__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3276);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9099);
/* harmony import */ var _image_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3644);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_3__, _components_home_main_header__WEBPACK_IMPORTED_MODULE_6__, _modal__WEBPACK_IMPORTED_MODULE_12__, _image_modal__WEBPACK_IMPORTED_MODULE_13__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_3__, _components_home_main_header__WEBPACK_IMPORTED_MODULE_6__, _modal__WEBPACK_IMPORTED_MODULE_12__, _image_modal__WEBPACK_IMPORTED_MODULE_13__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);














const profileMenuAnimation = {
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
function EditProfileModal({ name , gender , avatarShape ="circle" , avatarFrame ="none" , pageMode , dragControls , loading , photoURL , children , coverPhotoURL , inputNameError , editImage , closeModal , updateData , removeCoverImage , removeProfileImage  }) {
    const shapeClass = (0,_lib_avatar_shape__WEBPACK_IMPORTED_MODULE_5__/* .getAvatarShapeClass */ ._M)(avatarShape);
    const coverInputFileRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const profileInputFileRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const profileMenuDragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_3__.useDragControls)();
    const { 0: profileMenuOpen , 1: setProfileMenuOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: profilePreviewOpen , 1: setProfilePreviewOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: bannerPreviewOpen , 1: setBannerPreviewOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const avatarSrc = (0,_lib_media__WEBPACK_IMPORTED_MODULE_4__/* .getAvatarSrc */ .SJ)(photoURL, gender);
    const hasCustomAvatar = Boolean(photoURL && avatarSrc !== (0,_lib_media__WEBPACK_IMPORTED_MODULE_4__/* .getAvatarSrc */ .SJ)(null, gender));
    const handleClick = (type)=>()=>{
            if (type === "cover") coverInputFileRef.current?.click();
            else profileInputFileRef.current?.click();
        };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            !pageMode && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                "aria-label": "Faire glisser pour agrandir ou fermer la modification du profil",
                className: "absolute left-0 top-0 z-20 flex w-full touch-none justify-center py-3 xs:hidden",
                onPointerDown: (event)=>dragControls.start(event.nativeEvent),
                type: "button",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_home_main_header__WEBPACK_IMPORTED_MODULE_6__/* .MainHeader */ .c, {
                useActionButton: true,
                disableSticky: !pageMode,
                iconName: pageMode ? "arrow_back" : "close",
                tip: pageMode ? "Retour aux param\xe8tres" : "Fermer",
                className: pageMode ? "flex items-center gap-6" : "absolute flex w-full items-center gap-6 rounded-tl-md",
                title: pageMode ? "Personnalisation" : "Modifier",
                action: closeModal,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "ml-auto flex items-center gap-3",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .z, {
                        className: "bg-main-accent px-4 py-2 font-bold text-white focus-visible:bg-main-accent/90 enabled:hover:bg-main-accent/90 enabled:active:bg-main-accent/80 disabled:brightness-75",
                        onClick: updateData,
                        disabled: !!inputNameError,
                        loading: loading,
                        children: "Enregistrer"
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("transition-opacity", !pageMode && "min-h-0 flex-1 overflow-y-auto", loading && "pointer-events-none opacity-50"),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_modal__WEBPACK_IMPORTED_MODULE_12__/* .Modal */ .u_, {
                        open: profilePreviewOpen,
                        closeModal: ()=>setProfilePreviewOpen(false),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_image_modal__WEBPACK_IMPORTED_MODULE_13__/* .ImageModal */ .y, {
                            imageData: {
                                src: avatarSrc,
                                alt: name
                            },
                            previewCount: 1
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_modal__WEBPACK_IMPORTED_MODULE_12__/* .Modal */ .u_, {
                        open: bannerPreviewOpen,
                        closeModal: ()=>setBannerPreviewOpen(false),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_image_modal__WEBPACK_IMPORTED_MODULE_13__/* .ImageModal */ .y, {
                            imageData: {
                                src: (0,_lib_media__WEBPACK_IMPORTED_MODULE_4__/* .getBannerSrc */ .Xj)(coverPhotoURL),
                                alt: name
                            },
                            previewCount: 1
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_modal__WEBPACK_IMPORTED_MODULE_12__/* .Modal */ .u_, {
                        open: profileMenuOpen,
                        closeModal: ()=>setProfileMenuOpen(false),
                        className: "flex items-end justify-center p-0 xs:items-center xs:p-4",
                        modalAnimation: profileMenuAnimation,
                        modalClassName: "fixed inset-x-0 bottom-0 max-h-[75dvh] w-full overflow-y-auto overscroll-contain rounded-t-3xl border-t border-light-border bg-main-background p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl dark:border-dark-border xs:static xs:max-h-[90vh] xs:max-w-sm xs:rounded-lg xs:border xs:p-6",
                        drag: "y",
                        dragControls: profileMenuDragControls,
                        dragListener: false,
                        dragElastic: 0.5,
                        dragMomentum: true,
                        dragSnapToOrigin: false,
                        dragConstraints: {
                            top: 0
                        },
                        onDragEnd: (_, info)=>{
                            if (info.offset.y > 200 || info.velocity.y > 1000) setProfileMenuOpen(false);
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                "aria-label": "Faire glisser pour fermer le menu des photos",
                                className: "mb-2 flex w-full touch-none justify-center py-2 xs:hidden",
                                onPointerDown: (event)=>profileMenuDragControls.start(event.nativeEvent),
                                type: "button",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mb-4 flex items-start justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                                className: "text-lg font-bold",
                                                children: "Photo de profil"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: "mt-1 text-sm text-light-secondary dark:text-dark-secondary",
                                                children: "Choisissez une action."
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .z, {
                                        className: "-mr-2 -mt-2 p-2",
                                        onClick: ()=>setProfileMenuOpen(false),
                                        "aria-label": "Fermer le menu de la photo de profil",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_8__/* .MaterialIcon */ .O, {
                                            className: "h-5 w-5",
                                            iconName: "close"
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .z, {
                                        className: "accent-tab flex min-h-12 w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[15px] hover:bg-light-primary/5 dark:hover:bg-dark-primary/10",
                                        onClick: ()=>{
                                            setProfileMenuOpen(false);
                                            setProfilePreviewOpen(true);
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_8__/* .MaterialIcon */ .O, {
                                                className: "h-5 w-5 shrink-0",
                                                iconName: "visibility"
                                            }),
                                            "Voir votre photo de profil"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .z, {
                                        className: "accent-tab flex min-h-12 w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[15px] hover:bg-light-primary/5 dark:hover:bg-dark-primary/10",
                                        onClick: ()=>{
                                            setProfileMenuOpen(false);
                                            handleClick("profile")();
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_8__/* .MaterialIcon */ .O, {
                                                className: "h-5 w-5 shrink-0",
                                                iconName: "photo_camera"
                                            }),
                                            "Changer la photo de profil"
                                        ]
                                    }),
                                    hasCustomAvatar && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .z, {
                                        className: "accent-tab flex min-h-12 w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[15px] text-red-600 hover:bg-red-500/5 dark:hover:bg-red-500/10",
                                        onClick: ()=>{
                                            setProfileMenuOpen(false);
                                            removeProfileImage();
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_8__/* .MaterialIcon */ .O, {
                                                className: "h-5 w-5 shrink-0",
                                                iconName: "close"
                                            }),
                                            "Supprimer l’image de profil"
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("group relative h-36 xs:h-44 sm:h-48", !pageMode && "mt-[52px]"),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                className: "hidden",
                                type: "file",
                                accept: "image/*",
                                ref: coverInputFileRef,
                                onChange: editImage("cover")
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_next_image__WEBPACK_IMPORTED_MODULE_9__/* .NextImage */ .o, {
                                useSkeleton: true,
                                className: "relative h-full w-full",
                                imgClassName: "object-cover transition group-hover:brightness-75 duration-200 group-focus-within:brightness-75",
                                src: (0,_lib_media__WEBPACK_IMPORTED_MODULE_4__/* .getBannerSrc */ .Xj)(coverPhotoURL),
                                alt: name,
                                layout: "fill"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "absolute left-1/2 top-1/2 flex -translate-y-1/2 -translate-x-1/2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .z, {
                                        className: "group/inner relative flex h-10 w-10 items-center justify-center rounded-full bg-light-primary/60 p-0 hover:bg-image-preview-hover/70 focus-visible:bg-image-preview-hover/70",
                                        onClick: ()=>setBannerPreviewOpen(true),
                                        "aria-label": "Voir la banni\xe8re",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_8__/* .MaterialIcon */ .O, {
                                                className: "hover-animation h-5 w-5 text-dark-primary group-hover:text-white",
                                                iconName: "visibility"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_11__/* .ToolTip */ .e, {
                                                groupInner: true,
                                                tip: "Voir la banni\xe8re"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .z, {
                                        className: "group/inner relative flex h-10 w-10 items-center justify-center rounded-full bg-light-primary/60 p-0 hover:bg-image-preview-hover/70 focus-visible:bg-image-preview-hover/70",
                                        onClick: handleClick("cover"),
                                        "aria-label": "Changer la banni\xe8re",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_8__/* .MaterialIcon */ .O, {
                                                className: "hover-animation h-5 w-5 text-dark-primary group-hover:text-white",
                                                iconName: "photo_camera"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_11__/* .ToolTip */ .e, {
                                                groupInner: true,
                                                tip: "Ajouter une photo"
                                            })
                                        ]
                                    }),
                                    coverPhotoURL && (0,_lib_media__WEBPACK_IMPORTED_MODULE_4__/* .getBannerSrc */ .Xj)(coverPhotoURL) !== "/Banniere.png" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .z, {
                                        className: "group/inner relative flex h-10 w-10 items-center justify-center rounded-full bg-light-primary/60 p-0 hover:bg-image-preview-hover/70 focus-visible:bg-image-preview-hover/70",
                                        onClick: removeCoverImage,
                                        "aria-label": "Supprimer la banni\xe8re",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_8__/* .MaterialIcon */ .O, {
                                                className: "hover-animation h-5 w-5 text-dark-primary group-hover:text-white",
                                                iconName: "close"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_tooltip__WEBPACK_IMPORTED_MODULE_11__/* .ToolTip */ .e, {
                                                groupInner: true,
                                                tip: "Supprimer la photo"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "relative flex flex-col gap-6 px-4 py-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "mb-8 xs:mb-12 sm:mb-14",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        className: "hidden",
                                        type: "file",
                                        accept: "image/*",
                                        ref: profileInputFileRef,
                                        onChange: editImage("profile")
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "absolute z-10 -translate-y-1/2 p-6 xs:p-8 sm:p-9",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "group relative",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_7__/* .Button */ .z, {
                                                    className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("main-tab relative aspect-square w-24 overflow-hidden bg-white !p-0 focus-visible:ring-2 focus-visible:ring-main-accent xs:w-32 sm:w-36", shapeClass, !(0,_lib_avatar_shape__WEBPACK_IMPORTED_MODULE_5__/* .isMaskedAvatarShape */ .ln)(avatarShape) && "border-4 border-white dark:border-dark-background"),
                                                    onClick: ()=>setProfileMenuOpen(true),
                                                    "aria-label": "Ouvrir les options de la photo de profil",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_next_image__WEBPACK_IMPORTED_MODULE_9__/* .NextImage */ .o, {
                                                        useSkeleton: true,
                                                        className: "h-full w-full",
                                                        imgClassName: "!h-full !w-full object-cover transition group-hover:brightness-75",
                                                        src: avatarSrc,
                                                        alt: name,
                                                        layout: "fill"
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_avatar_frame__WEBPACK_IMPORTED_MODULE_10__/* .AvatarDecoration */ .z, {
                                                    frame: avatarFrame
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white shadow-md",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_8__/* .MaterialIcon */ .O, {
                                                        className: "h-6 w-6",
                                                        iconName: "photo_camera"
                                                    })
                                                })
                                            ]
                                        })
                                    })
                                ]
                            }),
                            children
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

/***/ 1157:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ UserEditBirthday)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);



/* Date de naissance : trois cases simples (jour, mois, année), avec
   l'étiquette au-dessus et une saisie qui passe toute seule à la case
   suivante. L'année s'écrit sur 2 ou 4 chiffres (95 → 1995). */ function UserEditBirthday({ birthdayParts , setBirthdayParts , birthdayError  }) {
    const dayRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const monthRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const yearRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const handleDayChange = (e)=>{
        const raw = e.target.value.replace(/\D/g, "").slice(0, 2);
        setBirthdayParts({
            ...birthdayParts,
            day: raw
        });
        if (raw.length === 2) monthRef.current?.focus();
    };
    const handleMonthChange = (e)=>{
        const raw = e.target.value.replace(/\D/g, "").slice(0, 2);
        setBirthdayParts({
            ...birthdayParts,
            month: raw
        });
        if (raw.length === 2) yearRef.current?.focus();
    };
    const handleYearChange = (e)=>{
        const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
        setBirthdayParts({
            ...birthdayParts,
            year: raw
        });
    };
    const handleKeyDown = (field)=>(e)=>{
            if (e.key === "Backspace") {
                if (field === "month" && !birthdayParts.month) dayRef.current?.focus();
                else if (field === "year" && !birthdayParts.year) monthRef.current?.focus();
            }
        };
    const inputClass = clsx__WEBPACK_IMPORTED_MODULE_2___default()(`w-full rounded-xl border bg-main-background px-3 py-2.5 text-center text-[15px]
     font-semibold tabular-nums outline-none transition
     placeholder:font-normal placeholder:text-light-secondary/50
     focus:border-main-accent focus:ring-1 focus:ring-main-accent`, birthdayError ? "border-accent-red" : "border-light-line-reply dark:border-dark-border");
    const fields = [
        {
            id: "birth-day",
            label: "Jour",
            placeholder: "JJ",
            value: birthdayParts.day,
            maxLength: 2,
            ref: dayRef,
            onChange: handleDayChange,
            onKeyDown: handleKeyDown("day"),
            ariaLabel: "Jour de naissance (JJ)"
        },
        {
            id: "birth-month",
            label: "Mois",
            placeholder: "MM",
            value: birthdayParts.month,
            maxLength: 2,
            ref: monthRef,
            onChange: handleMonthChange,
            onKeyDown: handleKeyDown("month"),
            ariaLabel: "Mois de naissance (MM)"
        },
        {
            id: "birth-year",
            label: "Ann\xe9e",
            placeholder: "AAAA",
            value: birthdayParts.year,
            maxLength: 4,
            ref: yearRef,
            onChange: handleYearChange,
            onKeyDown: handleKeyDown("year"),
            ariaLabel: "Ann\xe9e de naissance (AA ou AAAA)"
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col gap-1.5",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "text-sm font-semibold text-light-secondary dark:text-dark-secondary",
                children: "Date de naissance"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "grid grid-cols-3 gap-2",
                children: fields.map((field)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                        htmlFor: field.id,
                        className: "flex min-w-0 flex-col gap-1",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "pl-0.5 text-[11px] font-medium text-light-secondary dark:text-dark-secondary",
                                children: field.label
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                ref: field.ref,
                                id: field.id,
                                type: "text",
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                                autoComplete: "off",
                                maxLength: field.maxLength,
                                placeholder: field.placeholder,
                                value: field.value,
                                onChange: field.onChange,
                                onKeyDown: field.onKeyDown,
                                "aria-label": field.ariaLabel,
                                className: inputClass
                            })
                        ]
                    }, field.id))
            }),
            birthdayError ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "text-xs text-accent-red",
                children: birthdayError
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "text-[11px] text-light-secondary dark:text-dark-secondary",
                children: "L’ann\xe9e peut s’\xe9crire sur 2 ou 4 chiffres (ex. 95 ou 1995)."
            })
        ]
    });
}


/***/ }),

/***/ 2191:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ UserEditLocation)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_profile_fields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7309);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3325);





/* Lieu de résidence : une ou plusieurs cases, chacune avec la recherche de
   vraies villes. Le bouton « Ma position » et le « Tout supprimer » ont été
   retirés : chaque case se retire toute seule avec sa petite croix. */ function UserEditLocation({ locations , onChange  }) {
    const rows = locations.length > 0 ? locations : [
        ""
    ];
    const { 0: suggestions , 1: setSuggestions  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: isSearching , 1: setIsSearching  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: openIndex , 1: setOpenIndex  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const activeValue = openIndex === null ? "" : rows[openIndex] ?? "";
    // Un clic à l'extérieur referme la liste de villes.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleClickOutside = (e)=>{
            if (containerRef.current && !containerRef.current.contains(e.target)) setOpenIndex(null);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    // Recherche (différée) des villes réelles pour la case sélectionnée.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const query = activeValue.trim();
        if (openIndex === null || query.length < 2) {
            setSuggestions([]);
            return;
        }
        const timer = setTimeout(()=>{
            void (async ()=>{
                setIsSearching(true);
                try {
                    const res = await fetch(`/api/location/suggest?q=${encodeURIComponent(query)}`);
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
        activeValue,
        openIndex
    ]);
    const updateRow = (index, value)=>onChange(rows.map((row, rowIndex)=>rowIndex === index ? value : row));
    const removeRow = (index)=>{
        const nextRows = rows.filter((_, rowIndex)=>rowIndex !== index);
        onChange(nextRows.length > 0 ? nextRows : [
            ""
        ]);
        setSuggestions([]);
        setOpenIndex(null);
    };
    const addRow = ()=>{
        if (rows.length >= _lib_profile_fields__WEBPACK_IMPORTED_MODULE_4__/* .MAX_PROFILE_ENTRIES */ .pj) return;
        onChange([
            ...rows,
            ""
        ]);
        setOpenIndex(rows.length);
    };
    const handleSelect = (index, value)=>{
        updateRow(index, value);
        setSuggestions([]);
        setOpenIndex(null);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: containerRef,
        className: "flex flex-col gap-1.5",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "text-sm font-semibold text-light-secondary dark:text-dark-secondary",
                children: "Lieu de r\xe9sidence"
            }),
            rows.map((row, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "relative flex items-center",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "pointer-events-none absolute left-3 flex items-center text-light-secondary/70 dark:text-dark-secondary/70",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                                iconName: "location_on",
                                className: "h-4 w-4"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            type: "text",
                            maxLength: 60,
                            autoComplete: "off",
                            placeholder: index === 0 ? "Ex. Paris, France" : "Autre lieu…",
                            value: row,
                            onChange: (e)=>updateRow(index, e.target.value),
                            onFocus: ()=>setOpenIndex(index),
                            "aria-label": index === 0 ? "Lieu de r\xe9sidence" : `Lieu de résidence ${index + 1}`,
                            className: "w-full rounded-xl border border-light-line-reply bg-main-background py-2.5 pr-16 pl-9 text-sm outline-none transition focus:border-main-accent dark:border-dark-border"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "absolute right-2 flex items-center gap-0.5",
                            children: [
                                isSearching && openIndex === index && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-main-accent border-t-transparent"
                                }),
                                (row.trim().length > 0 || rows.length > 1) && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    type: "button",
                                    onClick: ()=>removeRow(index),
                                    title: "Retirer ce lieu",
                                    "aria-label": "Retirer ce lieu",
                                    className: "rounded-full p-1.5 text-light-secondary transition hover:bg-accent-red/10 hover:text-accent-red dark:text-dark-secondary",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                                        iconName: "close",
                                        className: "h-4 w-4"
                                    })
                                })
                            ]
                        }),
                        openIndex === index && suggestions.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "absolute top-full left-0 z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border border-light-border bg-main-background shadow-xl dark:border-dark-border",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                className: "divide-y divide-light-border dark:divide-dark-border",
                                children: suggestions.map((item, itemIndex)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                            type: "button",
                                            onClick: ()=>handleSelect(index, item.label),
                                            className: "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition hover:bg-main-accent/10",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                                                    iconName: "location_on",
                                                    className: "h-4 w-4 shrink-0 text-light-secondary"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "min-w-0 flex-1 truncate font-medium text-light-primary dark:text-dark-primary",
                                                    children: item.label
                                                })
                                            ]
                                        })
                                    }, `${item.label}-${itemIndex}`))
                            })
                        })
                    ]
                }, index)),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between pt-0.5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: addRow,
                        disabled: rows.length >= _lib_profile_fields__WEBPACK_IMPORTED_MODULE_4__/* .MAX_PROFILE_ENTRIES */ .pj,
                        className: clsx__WEBPACK_IMPORTED_MODULE_2___default()("inline-flex items-center gap-1 text-xs font-medium text-main-accent transition hover:underline", rows.length >= _lib_profile_fields__WEBPACK_IMPORTED_MODULE_4__/* .MAX_PROFILE_ENTRIES */ .pj && "cursor-not-allowed opacity-50"),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_3__/* .MaterialIcon */ .O, {
                                iconName: "add",
                                className: "h-3.5 w-3.5"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: "Ajouter un lieu"
                            })
                        ]
                    }),
                    rows.length >= _lib_profile_fields__WEBPACK_IMPORTED_MODULE_4__/* .MAX_PROFILE_ENTRIES */ .pj && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "text-[11px] text-light-secondary dark:text-dark-secondary",
                        children: [
                            _lib_profile_fields__WEBPACK_IMPORTED_MODULE_4__/* .MAX_PROFILE_ENTRIES */ .pj,
                            " lieux maximum"
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 7276:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ UserEditProfile)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_phone_number_input_max__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3113);
/* harmony import */ var react_phone_number_input_locale_fr_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4771);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6201);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6197);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lib_context_user_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5127);
/* harmony import */ var _lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3040);
/* harmony import */ var _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7359);
/* harmony import */ var _lib_supabase_storage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8402);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(6269);
/* harmony import */ var _lib_media__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8540);
/* harmony import */ var _lib_validation__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3521);
/* harmony import */ var _lib_profile_fields__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(7309);
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(9099);
/* harmony import */ var _components_modal_edit_profile_modal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(7903);
/* harmony import */ var _components_modal_camera_modal__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(789);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(4685);
/* harmony import */ var _components_input_input_field__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(2050);
/* harmony import */ var _user_edit_birthday__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(1157);
/* harmony import */ var _user_edit_location__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(2191);
/* harmony import */ var _user_edit_websites__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(5573);
/* harmony import */ var _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(5655);
/* harmony import */ var _lib_avatar_shape__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(8829);
/* harmony import */ var _components_user_avatar_frame__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(8800);
/* harmony import */ var _components_user_avatar_picker_modal__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(7915);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_phone_number_input_max__WEBPACK_IMPORTED_MODULE_3__, react_phone_number_input_locale_fr_json__WEBPACK_IMPORTED_MODULE_4__, react_hot_toast__WEBPACK_IMPORTED_MODULE_5__, framer_motion__WEBPACK_IMPORTED_MODULE_6__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_10__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_14__, _components_modal_edit_profile_modal__WEBPACK_IMPORTED_MODULE_15__, _components_modal_camera_modal__WEBPACK_IMPORTED_MODULE_16__, _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_22__, _components_user_avatar_picker_modal__WEBPACK_IMPORTED_MODULE_25__]);
([react_phone_number_input_max__WEBPACK_IMPORTED_MODULE_3__, react_phone_number_input_locale_fr_json__WEBPACK_IMPORTED_MODULE_4__, react_hot_toast__WEBPACK_IMPORTED_MODULE_5__, framer_motion__WEBPACK_IMPORTED_MODULE_6__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_10__, _components_modal_modal__WEBPACK_IMPORTED_MODULE_14__, _components_modal_edit_profile_modal__WEBPACK_IMPORTED_MODULE_15__, _components_modal_camera_modal__WEBPACK_IMPORTED_MODULE_16__, _lib_context_theme_context__WEBPACK_IMPORTED_MODULE_22__, _components_user_avatar_picker_modal__WEBPACK_IMPORTED_MODULE_25__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

























/* La photo prise avec l'appareil photo arrive en fichier seul : on la présente
   comme la liste de fichiers qu'attend le reste du formulaire. */ function fileListFromFile(file) {
    if (typeof DataTransfer === "undefined") return {
        0: file,
        length: 1,
        item: (index)=>index === 0 ? file : null
    };
    const transfer = new DataTransfer();
    transfer.items.add(file);
    return transfer.files;
}
function normalizeYear(yearStr) {
    const trimmed = yearStr.trim();
    if (!trimmed) return "";
    if (trimmed.length === 2) {
        const yNum = Number(trimmed);
        const curr2Digits = new Date().getFullYear() % 100;
        return String(yNum <= curr2Digits ? 2000 + yNum : 1900 + yNum);
    }
    return trimmed;
}
function getBirthdayParts(birthDate) {
    const [year = "", month = "", day = ""] = birthDate?.split("-") ?? [];
    return {
        day,
        month,
        year
    };
}
function normalizeWebsite(value) {
    const trimmedValue = value?.trim();
    if (!trimmedValue) return null;
    try {
        const url = new URL(/^https?:\/\//i.test(trimmedValue) ? trimmedValue : `https://${trimmedValue}`);
        if (![
            "http:",
            "https:"
        ].includes(url.protocol)) return null;
        if (!url.hostname.includes(".") && url.hostname !== "localhost") return null;
        return url.toString().replace(/\/$/, "");
    } catch  {
        return null;
    }
}




/* Exemples de numéros : le format affiché dans la case change selon le pays
   choisi, comme le font les applications de messagerie. */ const PHONE_PLACEHOLDERS = {
    FR: "06 12 34 56 78",
    BE: "0470 12 34 56",
    CH: "078 123 45 67",
    LU: "621 123 456",
    CA: "514 555 0123",
    US: "201 555 0123",
    GB: "07400 123456",
    DE: "0151 23456789",
    ES: "612 34 56 78",
    IT: "312 345 6789",
    PT: "912 345 678",
    NL: "06 12345678",
    MA: "0612 345678",
    DZ: "0551 23 45 67",
    TN: "20 123 456",
    SN: "77 123 45 67",
    CI: "01 23 45 67 89",
    CM: "6 71 23 45 67"
};
function UserEditProfile({ hide , pageMode  }) {
    const { user  } = (0,_lib_context_user_context__WEBPACK_IMPORTED_MODULE_8__/* .useUser */ .aF)();
    const { push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { avatarShape: globalShape , avatarFrame: globalFrame , setAvatarShape , setAvatarFrame  } = (0,_lib_context_theme_context__WEBPACK_IMPORTED_MODULE_22__/* .useTheme */ .Fg)();
    const { open , openModal , closeModal  } = (0,_lib_hooks_useModal__WEBPACK_IMPORTED_MODULE_9__/* .useModal */ .d)();
    const dragControls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_6__.useDragControls)();
    const { 0: expanded , 1: setExpanded  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Listes complètes des formes, des cadres et des photos : fenêtre sur
     ordinateur, menu qui remonte du bas sur téléphone. */ const { 0: shapesOpen , 1: setShapesOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: framesOpen , 1: setFramesOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: photosOpen , 1: setPhotosOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Fenêtre de prise de photo : elle utilise la vraie caméra de l'appareil. */ const { 0: cameraOpen , 1: setCameraOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* Entrée de fichier cachée, pour « Télécharger votre photo de profil ». */ const uploadPhotoRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    /* Pays du numéro de téléphone : sert uniquement à proposer le bon exemple
     de numéro, la saisie s'adapte toute seule au pays choisi. */ const { 0: phoneCountry , 1: setPhoneCountry  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("FR");
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { bio , name , website , phoneNumber , location , birthDate , photoURL , coverPhotoURL , gender , avatarShape , avatarFrame , userStatus , statusEmoji , pronouns , customBadge  } = user;
    const { 0: editUserData , 1: setEditUserData  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        bio,
        name,
        website,
        phoneNumber: phoneNumber ?? null,
        birthDate: birthDate ?? null,
        photoURL: (0,_lib_media__WEBPACK_IMPORTED_MODULE_12__/* .getAvatarSrc */ .SJ)(photoURL, gender),
        location,
        coverPhotoURL: (0,_lib_media__WEBPACK_IMPORTED_MODULE_12__/* .getBannerSrc */ .Xj)(coverPhotoURL),
        avatarShape: avatarShape ?? globalShape ?? "circle",
        avatarFrame: avatarFrame ?? globalFrame ?? "none",
        userStatus: userStatus ?? null,
        statusEmoji: statusEmoji ?? null,
        pronouns: pronouns ?? null,
        customBadge: customBadge ?? null
    });
    const { 0: userImages , 1: setUserImages  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        photoURL: [],
        coverPhotoURL: []
    });
    const { 0: birthdayParts , 1: setBirthdayParts  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(getBirthdayParts(birthDate));
    /* Lieux de résidence et sites web : une ou plusieurs entrées chacun, avec
     leurs cases d'ajout. On garde les cases vides pendant la saisie, elles
     sont simplement ignorées à l'enregistrement. */ const { 0: locationEntries , 1: setLocationEntries  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>(0,_lib_profile_fields__WEBPACK_IMPORTED_MODULE_26__/* .splitProfileEntries */ .EF)(location));
    const { 0: websiteEntries , 1: setWebsiteEntries  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(()=>(0,_lib_profile_fields__WEBPACK_IMPORTED_MODULE_26__/* .splitProfileEntries */ .EF)(website));
    const handleCloseModal = ()=>{
        [
            editUserData.photoURL,
            editUserData.coverPhotoURL
        ].forEach((image)=>URL.revokeObjectURL(image ?? ""));
        setEditUserData({
            bio,
            name,
            website,
            phoneNumber: phoneNumber ?? null,
            birthDate: birthDate ?? null,
            photoURL: (0,_lib_media__WEBPACK_IMPORTED_MODULE_12__/* .getAvatarSrc */ .SJ)(photoURL, gender),
            location,
            coverPhotoURL: (0,_lib_media__WEBPACK_IMPORTED_MODULE_12__/* .getBannerSrc */ .Xj)(coverPhotoURL),
            avatarShape: avatarShape ?? globalShape ?? "circle",
            avatarFrame: avatarFrame ?? globalFrame ?? "none",
            userStatus: userStatus ?? null,
            statusEmoji: statusEmoji ?? null,
            pronouns: pronouns ?? null,
            customBadge: customBadge ?? null
        });
        setUserImages({
            photoURL: [],
            coverPhotoURL: []
        });
        setBirthdayParts(getBirthdayParts(birthDate));
        setLocationEntries((0,_lib_profile_fields__WEBPACK_IMPORTED_MODULE_26__/* .splitProfileEntries */ .EF)(location));
        setWebsiteEntries((0,_lib_profile_fields__WEBPACK_IMPORTED_MODULE_26__/* .splitProfileEntries */ .EF)(website));
        setShapesOpen(false);
        setFramesOpen(false);
        setPhotosOpen(false);
        setCameraOpen(false);
        setExpanded(false);
        closeModal();
    };
    const handlePageClose = ()=>{
        handleCloseModal();
        void push("/settings");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>cleanImage, []);
    const inputNameError = !editUserData.name?.trim() ? "Saisissez un nom pour votre profil." : "";
    const websiteError = websiteEntries.map((entry)=>entry.trim()).filter(Boolean).some((entry)=>!normalizeWebsite(entry)) ? "Saisissez une URL valide, par exemple exemple.com." : "";
    const phoneNumberError = editUserData.phoneNumber && !(0,react_phone_number_input_max__WEBPACK_IMPORTED_MODULE_3__.isValidPhoneNumber)(editUserData.phoneNumber) ? "Saisissez un num\xe9ro valide pour le pays choisi." : "";
    const normalizedYear = normalizeYear(birthdayParts.year);
    const hasBirthdayPart = Boolean(birthdayParts.day || birthdayParts.month || birthdayParts.year);
    const hasCompleteBirthday = Boolean(birthdayParts.day && birthdayParts.month && normalizedYear && normalizedYear.length === 4);
    const birthdayDate = hasCompleteBirthday ? new Date(Number(normalizedYear), Number(birthdayParts.month) - 1, Number(birthdayParts.day)) : null;
    const isValidBirthday = birthdayDate !== null && birthdayDate.getFullYear() === Number(normalizedYear) && birthdayDate.getMonth() === Number(birthdayParts.month) - 1 && birthdayDate.getDate() === Number(birthdayParts.day) && birthdayDate <= new Date() && birthdayDate.getFullYear() >= 1900;
    const birthdayError = hasBirthdayPart && !isValidBirthday ? "Saisissez une date d’anniversaire valide (JJ / MM / AA ou AAAA)." : "";
    const removeProfileImage = ()=>{
        setEditUserData({
            ...editUserData,
            photoURL: (0,_lib_media__WEBPACK_IMPORTED_MODULE_12__/* .getAvatarSrc */ .SJ)(null, gender)
        });
        setUserImages({
            ...userImages,
            photoURL: []
        });
        URL.revokeObjectURL(editUserData.photoURL ?? "");
    };
    /* Choix d'une photo de profil toute prête (avatars par défaut du site ou
     portraits proposés) : elle remplace la photo actuelle, sans envoi de
     fichier à l'enregistrement. */ const chooseAvatarImage = (src)=>{
        URL.revokeObjectURL(editUserData.photoURL ?? "");
        setEditUserData({
            ...editUserData,
            photoURL: src
        });
        setUserImages({
            ...userImages,
            photoURL: []
        });
    };
    const updateData = async ()=>{
        if (inputNameError || websiteError || phoneNumberError || birthdayError) return;
        setLoading(true);
        const userId = user?.id;
        const { photoURL , coverPhotoURL: coverURL  } = userImages;
        try {
            const [newPhotoURL, newCoverPhotoURL] = await Promise.all([
                photoURL,
                coverURL
            ].map((image)=>(0,_lib_supabase_storage__WEBPACK_IMPORTED_MODULE_11__/* .uploadImages */ .eg)(userId, image, "Infini")));
            const newImages = {};
            // Only overwrite the stored images when a new file was actually
            // uploaded, otherwise saving the profile would erase the current
            // picture and banner.
            if (newPhotoURL?.[0]?.src) newImages.photoURL = newPhotoURL[0].src;
            if (newCoverPhotoURL?.[0]?.src) newImages.coverPhotoURL = newCoverPhotoURL[0].src;
            const trimmedKeys = [
                "name",
                "bio",
                "location",
                "website",
                "phoneNumber",
                "userStatus",
                "statusEmoji",
                "pronouns",
                "customBadge"
            ];
            const trimmedTexts = {
                ...trimmedKeys.reduce((acc, curr)=>({
                        ...acc,
                        [curr]: editUserData[curr]?.trim() ?? null
                    }), {}),
                website: (0,_lib_profile_fields__WEBPACK_IMPORTED_MODULE_26__/* .joinProfileEntries */ .b5)(websiteEntries.map((entry)=>normalizeWebsite(entry.trim()) ?? "")),
                location: (0,_lib_profile_fields__WEBPACK_IMPORTED_MODULE_26__/* .joinProfileEntries */ .b5)(locationEntries)
            };
            const newUserData = {
                ...editUserData,
                photoURL: (0,_lib_media__WEBPACK_IMPORTED_MODULE_12__/* .getAvatarSrc */ .SJ)(editUserData.photoURL, gender),
                coverPhotoURL: (0,_lib_media__WEBPACK_IMPORTED_MODULE_12__/* .getBannerSrc */ .Xj)(editUserData.coverPhotoURL),
                avatarShape: editUserData.avatarShape,
                avatarFrame: editUserData.avatarFrame,
                ...trimmedTexts,
                birthDate: isValidBirthday ? `${normalizedYear}-${birthdayParts.month.padStart(2, "0")}-${birthdayParts.day.padStart(2, "0")}` : null,
                ...newImages
            };
            if (editUserData.avatarShape) setAvatarShape(editUserData.avatarShape);
            if (editUserData.avatarFrame) setAvatarFrame(editUserData.avatarFrame);
            await (0,_lib_utils__WEBPACK_IMPORTED_MODULE_27__/* .sleep */ ._v)(500);
            await (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_10__/* .updateUserData */ .Al)(userId, newUserData);
            setEditUserData(newUserData);
            setLocationEntries((0,_lib_profile_fields__WEBPACK_IMPORTED_MODULE_26__/* .splitProfileEntries */ .EF)(newUserData.location));
            setWebsiteEntries((0,_lib_profile_fields__WEBPACK_IMPORTED_MODULE_26__/* .splitProfileEntries */ .EF)(newUserData.website));
            cleanImage();
            if (!pageMode) closeModal();
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__.toast.success("Photo et profil mis \xe0 jour");
        } catch (error) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__.toast.error(error instanceof Error ? error.message : (0,_lib_supabase_storage__WEBPACK_IMPORTED_MODULE_11__/* .getStorageErrorMessage */ .UB)(error));
        } finally{
            setLoading(false);
        }
    };
    /* Photo de profil choisie depuis l'appareil, ou prise avec l'appareil
     photo : l'aperçu s'affiche tout de suite, l'envoi du fichier se fait à
     l'enregistrement du profil. */ const applyProfilePhoto = (files)=>{
        const imagesData = (0,_lib_validation__WEBPACK_IMPORTED_MODULE_13__/* .getImagesData */ .t6)(files);
        if (!imagesData) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__.toast.error("Choisissez une image ou un GIF valide (20 Mo maximum).");
            return;
        }
        setEditUserData({
            ...editUserData,
            photoURL: imagesData.imagesPreviewData[0].src
        });
        setUserImages({
            ...userImages,
            photoURL: imagesData.selectedImagesData
        });
    };
    const editImage = (type)=>({ target: { files  }  })=>{
            if (type === "profile") {
                applyProfilePhoto(files);
                return;
            }
            const imagesData = (0,_lib_validation__WEBPACK_IMPORTED_MODULE_13__/* .getImagesData */ .t6)(files);
            if (!imagesData) {
                react_hot_toast__WEBPACK_IMPORTED_MODULE_5__.toast.error("Choisissez une image ou un GIF valide (20 Mo maximum).");
                return;
            }
            const { imagesPreviewData , selectedImagesData  } = imagesData;
            const newImage = imagesPreviewData[0].src;
            setEditUserData({
                ...editUserData,
                coverPhotoURL: newImage
            });
            setUserImages({
                ...userImages,
                coverPhotoURL: selectedImagesData
            });
        };
    /* Choix d'une photo déjà présente sur l'appareil : la photo est mise en
     aperçu, puis la fenêtre se referme pour laisser voir le grand aperçu. La
     case est vidée, pour pouvoir choisir deux fois la même photo. */ const pickPhotoFromDevice = (event)=>{
        const { files  } = event.target;
        if (!files?.length) return;
        applyProfilePhoto(files);
        setPhotosOpen(false);
        event.target.value = "";
    };
    /* Photo prise à l'instant avec l'appareil photo. */ const captureCameraPhoto = (file)=>{
        setCameraOpen(false);
        applyProfilePhoto(fileListFromFile(file));
    };
    const removeCoverImage = ()=>{
        setEditUserData({
            ...editUserData,
            coverPhotoURL: null
        });
        setUserImages({
            ...userImages,
            coverPhotoURL: []
        });
        URL.revokeObjectURL(editUserData.coverPhotoURL ?? "");
    };
    const cleanImage = ()=>{
        const imagesKey = [
            "photoURL",
            "coverPhotoURL"
        ];
        imagesKey.forEach((image)=>URL.revokeObjectURL(editUserData[image] ?? ""));
        setUserImages({
            photoURL: [],
            coverPhotoURL: []
        });
    };
    const handleChange = (key)=>({ target: { value  }  })=>setEditUserData({
                ...editUserData,
                [key]: value
            });
    const handleKeyboardShortcut = ({ key , target , ctrlKey  })=>{
        if (ctrlKey && key === "Enter" && !inputNameError && !websiteError && !phoneNumberError && !birthdayError) {
            target.blur();
            void updateData();
        }
    };
    const handleDragEnd = (_event, info)=>{
        if (info.offset.y < -60) {
            setExpanded(true);
            return;
        }
        if (expanded && info.offset.y > 70) {
            setExpanded(false);
            return;
        }
        if (info.offset.y > 120 || info.velocity.y > 550) handleCloseModal();
    };
    const handleOpenModal = ()=>{
        setExpanded(false);
        openModal();
    };
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
    const inputFields = [
        {
            label: "Nom",
            inputId: "name",
            inputValue: editUserData.name,
            inputLimit: 50,
            errorMessage: inputNameError
        },
        {
            label: "Biographie",
            inputId: "bio",
            inputValue: editUserData.bio,
            inputLimit: 160,
            useTextArea: true
        }
    ];
    /* Toutes les anciennes formes (fleur, nuage, étoile, pentagone, carré…)
     s'affichent encore avec leur nom, même si elles ne sont plus proposées. */ const currentShape = editUserData.avatarShape ?? "circle";
    const currentShapeLabel = _lib_avatar_shape__WEBPACK_IMPORTED_MODULE_23__/* .avatarShapeLabels */ .eA[currentShape] ?? "Rond";
    const currentFrame = editUserData.avatarFrame ?? "none";
    const currentFrameLabel = (0,_lib_avatar_shape__WEBPACK_IMPORTED_MODULE_23__/* .getAvatarFrameLabel */ .iU)(currentFrame);
    /* Photo utilisée par les aperçus (forme, cadre, choix de la photo). */ const avatarPreviewSrc = (0,_lib_media__WEBPACK_IMPORTED_MODULE_12__/* .getAvatarSrc */ .SJ)(editUserData.photoURL, gender);
    /* Photo réellement enregistrée sur le profil : elle sert à la case « Votre
     photo de profil actuelle », qui permet d'y revenir pendant la
     modification. */ const savedAvatarSrc = (0,_lib_media__WEBPACK_IMPORTED_MODULE_12__/* .getAvatarSrc */ .SJ)(photoURL, gender);
    const avatarFallbackSrc = (0,_lib_media__WEBPACK_IMPORTED_MODULE_12__/* .getAvatarSrc */ .SJ)(null, gender);
    /* Aperçu d'une photo dans une forme donnée : la photo découpée, avec
     l'avatar par défaut derrière au cas où la photo ne se charge pas. */ const renderAvatarPreview = (src, sizeClass, shape)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
            className: clsx__WEBPACK_IMPORTED_MODULE_7___default()("block overflow-hidden bg-main-search-background", sizeClass, (0,_lib_avatar_shape__WEBPACK_IMPORTED_MODULE_23__/* .getAvatarShapeClass */ ._M)(shape)),
            style: {
                backgroundImage: `url("${avatarFallbackSrc}")`,
                backgroundPosition: "center",
                backgroundSize: "cover"
            },
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                alt: "",
                className: "h-full w-full object-cover",
                src: src,
                onError: (event)=>{
                    const image = event.currentTarget;
                    if (image.dataset.fallback) return;
                    image.dataset.fallback = "true";
                    image.src = avatarFallbackSrc;
                }
            })
        });
    /* Aperçu de la photo actuelle dans une forme (les formes proposées). */ const renderShapePreview = (shapeKey, sizeClass)=>renderAvatarPreview(avatarPreviewSrc, sizeClass, shapeKey);
    /* Aperçu d'une photo proposée, dans la forme choisie. */ const renderPhotoPreview = (src)=>renderAvatarPreview(src, "h-10 w-10", currentShape);
    /* Aperçu d'un cadre : la décoration posée autour de la photo. */ const renderFramePreview = (frameKey)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: "relative block h-10 w-10",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_avatar_frame__WEBPACK_IMPORTED_MODULE_24__/* .AvatarDecoration */ .z, {
                    frame: frameKey
                }),
                renderShapePreview(currentShape, "h-10 w-10")
            ]
        });
    /* Nom de la photo affichée aujourd'hui (celui d'une photo proposée, sinon
     « Photo actuelle »). */ const currentPhotoLabel = _lib_media__WEBPACK_IMPORTED_MODULE_12__/* .avatarImageOptions.find */ .z3.find(({ src  })=>src === avatarPreviewSrc)?.name ?? "Photo actuelle";
    /* Photos proposées : les deux avatars par défaut du site et trois
     portraits. Choisir une photo remplace celle du profil, sans envoi de
     fichier à l'enregistrement. */ const photoOptions = _lib_media__WEBPACK_IMPORTED_MODULE_12__/* .avatarImageOptions.map */ .z3.map(({ name: photoName , src: photoSrc  })=>[
            photoSrc,
            photoName
        ]);
    /* Actions de la fenêtre des photos : revenir à la photo enregistrée (case
     mise en couleur), choisir une image de l'appareil, ou se prendre en photo
     avec l'appareil photo. */ const photoActions = [
        {
            key: "current",
            label: "Votre photo de profil actuelle",
            description: "Revenir \xe0 la photo enregistr\xe9e",
            preview: renderPhotoPreview(savedAvatarSrc),
            accent: true,
            selected: avatarPreviewSrc === savedAvatarSrc,
            onSelect: ()=>chooseAvatarImage(savedAvatarSrc)
        },
        {
            key: "upload",
            label: "T\xe9l\xe9charger votre photo de profil",
            description: "Choisir une image dans votre appareil",
            iconName: "upload",
            onSelect: ()=>uploadPhotoRef.current?.click()
        },
        {
            key: "camera",
            label: "Se prendre en photo",
            description: "Utiliser l’appareil photo",
            iconName: "photo_camera",
            onSelect: ()=>{
                setPhotosOpen(false);
                setCameraOpen(true);
            }
        }
    ];
    /* Case d'une section (forme, cadre, photo) : une case rectangle avec
     l'aperçu et le nom du choix actuel, et le bouton qui ouvre la liste
     complète dans une fenêtre (menu qui remonte du bas sur téléphone). */ const choiceCard = ({ label , description , preview , buttonLabel , onOpen  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center gap-3 rounded-md border border-light-border p-3 dark:border-dark-border",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "relative block h-10 w-10 shrink-0",
                    children: preview
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex min-w-0 flex-1 flex-col",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "truncate text-sm font-semibold text-light-primary dark:text-dark-primary",
                            children: label
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "truncate text-[11px] text-light-secondary dark:text-dark-secondary",
                            children: description
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    type: "button",
                    onClick: onOpen,
                    className: "shrink-0 rounded-full border border-light-line-reply px-3 py-1.5 text-xs font-bold text-light-primary transition hover:bg-light-primary/10 dark:border-dark-border dark:text-dark-primary dark:hover:bg-dark-primary/10",
                    children: buttonLabel
                })
            ]
        });
    const editProfileContent = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_modal_edit_profile_modal__WEBPACK_IMPORTED_MODULE_15__/* .EditProfileModal */ .y, {
        pageMode: pageMode,
        name: name,
        loading: loading,
        photoURL: editUserData.photoURL,
        gender: gender,
        avatarShape: editUserData.avatarShape,
        avatarFrame: editUserData.avatarFrame,
        coverPhotoURL: editUserData.coverPhotoURL,
        inputNameError: inputNameError || websiteError || phoneNumberError || birthdayError,
        editImage: editImage,
        closeModal: pageMode ? handlePageClose : handleCloseModal,
        updateData: updateData,
        removeCoverImage: removeCoverImage,
        removeProfileImage: removeProfileImage,
        dragControls: dragControls,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "text-xs font-semibold text-light-secondary dark:text-dark-secondary",
                        children: "Forme de l’image de profil"
                    }),
                    choiceCard({
                        label: currentShapeLabel,
                        description: "Forme donn\xe9e \xe0 votre photo",
                        preview: renderShapePreview(currentShape, "h-10 w-10"),
                        buttonLabel: "Voir toutes les formes",
                        onOpen: ()=>setShapesOpen(true)
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "text-xs font-semibold text-light-secondary dark:text-dark-secondary",
                        children: "Cadre de l’avatar"
                    }),
                    choiceCard({
                        label: currentFrameLabel,
                        description: "D\xe9coration pos\xe9e autour de la photo",
                        preview: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                            className: "relative block h-10 w-10",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_avatar_frame__WEBPACK_IMPORTED_MODULE_24__/* .AvatarDecoration */ .z, {
                                    frame: currentFrame
                                }),
                                renderShapePreview(currentShape, "h-10 w-10")
                            ]
                        }),
                        buttonLabel: "Voir tous les cadres",
                        onOpen: ()=>setFramesOpen(true)
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "text-xs font-semibold text-light-secondary dark:text-dark-secondary",
                        children: "Photo de profil"
                    }),
                    choiceCard({
                        label: currentPhotoLabel,
                        description: "Photo affich\xe9e sur votre profil",
                        preview: renderShapePreview(currentShape, "h-10 w-10"),
                        buttonLabel: "Choisir une photo",
                        onOpen: ()=>setPhotosOpen(true)
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_avatar_picker_modal__WEBPACK_IMPORTED_MODULE_25__/* .AvatarPickerModal */ .F, {
                open: shapesOpen,
                title: "Forme de l’image de profil",
                subtitle: "Choisissez la forme donn\xe9e \xe0 votre photo.",
                options: _lib_avatar_shape__WEBPACK_IMPORTED_MODULE_23__/* .avatarShapeOptions */ .yV,
                value: currentShape,
                gridClass: "grid-cols-2 xs:grid-cols-3",
                onClose: ()=>setShapesOpen(false),
                onSelect: (shapeKey)=>setEditUserData({
                        ...editUserData,
                        avatarShape: shapeKey
                    }),
                renderPreview: (shapeKey)=>renderShapePreview(shapeKey, "h-10 w-10")
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_avatar_picker_modal__WEBPACK_IMPORTED_MODULE_25__/* .AvatarPickerModal */ .F, {
                open: framesOpen,
                title: "Cadre de l’avatar",
                subtitle: "Choisissez la d\xe9coration pos\xe9e autour de votre photo.",
                options: _lib_avatar_shape__WEBPACK_IMPORTED_MODULE_23__/* .avatarFrameOptions */ .qm,
                value: currentFrame,
                gridClass: "grid-cols-2 xs:grid-cols-3",
                onClose: ()=>setFramesOpen(false),
                onSelect: (frameKey)=>setEditUserData({
                        ...editUserData,
                        avatarFrame: frameKey
                    }),
                renderPreview: renderFramePreview
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                className: "hidden",
                type: "file",
                accept: "image/*",
                ref: uploadPhotoRef,
                onChange: pickPhotoFromDevice
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_camera_modal__WEBPACK_IMPORTED_MODULE_16__/* .CameraModal */ .T, {
                open: cameraOpen,
                onClose: ()=>setCameraOpen(false),
                onCapture: captureCameraPhoto,
                onPickFile: ()=>{
                    setCameraOpen(false);
                    uploadPhotoRef.current?.click();
                }
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_user_avatar_picker_modal__WEBPACK_IMPORTED_MODULE_25__/* .AvatarPickerModal */ .F, {
                open: photosOpen,
                title: "Photo de profil",
                subtitle: "Choisissez la photo affich\xe9e sur votre profil.",
                options: photoOptions,
                value: avatarPreviewSrc,
                gridClass: "grid-cols-2 xs:grid-cols-3",
                actions: photoActions,
                optionsTitle: "Photos propos\xe9es",
                onClose: ()=>setPhotosOpen(false),
                onSelect: chooseAvatarImage,
                renderPreview: renderPhotoPreview
            }),
            inputFields.map((inputData)=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_input_input_field__WEBPACK_IMPORTED_MODULE_18__/* .InputField */ .U, {
                    ...inputData,
                    handleChange: handleChange(inputData.inputId),
                    handleKeyboardShortcut: handleKeyboardShortcut,
                    key: inputData.inputId
                })),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_user_edit_location__WEBPACK_IMPORTED_MODULE_20__/* .UserEditLocation */ .M, {
                locations: locationEntries,
                onChange: setLocationEntries
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_user_edit_websites__WEBPACK_IMPORTED_MODULE_21__/* .UserEditWebsites */ .m, {
                websites: websiteEntries,
                errorMessage: websiteError,
                onChange: setWebsiteEntries
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_user_edit_birthday__WEBPACK_IMPORTED_MODULE_19__/* .UserEditBirthday */ .$, {
                birthdayParts: birthdayParts,
                setBirthdayParts: setBirthdayParts,
                birthdayError: birthdayError
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col gap-1.5",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                        className: "text-sm font-semibold text-light-secondary dark:text-dark-secondary",
                        htmlFor: "phoneNumber",
                        children: "Num\xe9ro de t\xe9l\xe9phone"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_phone_number_input_max__WEBPACK_IMPORTED_MODULE_3__["default"], {
                        id: "phoneNumber",
                        className: "profile-phone-input",
                        defaultCountry: "FR",
                        labels: react_phone_number_input_locale_fr_json__WEBPACK_IMPORTED_MODULE_4__["default"],
                        international: false,
                        value: editUserData.phoneNumber ?? undefined,
                        onChange: (value)=>setEditUserData({
                                ...editUserData,
                                phoneNumber: value ?? null
                            }),
                        onCountryChange: (value)=>{
                            if (value) setPhoneCountry(value);
                        },
                        countrySelectProps: {
                            "aria-label": "Pays du num\xe9ro de t\xe9l\xe9phone"
                        },
                        placeholder: PHONE_PLACEHOLDERS[phoneCountry] ?? "",
                        autoComplete: "off"
                    }),
                    phoneNumberError && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-sm text-accent-red",
                        children: phoneNumberError
                    })
                ]
            })
        ]
    });
    if (pageMode) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "flex flex-1 flex-col",
        children: editProfileContent
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
        className: clsx__WEBPACK_IMPORTED_MODULE_7___default()(hide && "hidden md:block"),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_modal_modal__WEBPACK_IMPORTED_MODULE_14__/* .Modal */ .u_, {
                className: "flex items-end justify-center p-0 xs:items-center xs:p-4",
                modalAnimation: sheetAnimation,
                modalClassName: `fixed inset-x-0 bottom-0 flex w-full max-w-xl flex-col overflow-hidden border-t border-light-border bg-main-background shadow-2xl dark:border-dark-border xs:relative xs:my-auto xs:max-h-[85vh] xs:rounded-md xs:border xs:shadow-2xl ${expanded ? "h-[100dvh] max-h-[100dvh] rounded-none pt-[max(1rem,env(safe-area-inset-top))] xs:h-auto" : "h-[88dvh] max-h-[88dvh] rounded-t-md xs:h-auto"}`,
                drag: false,
                open: open,
                closeModal: handleCloseModal,
                children: editProfileContent
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_button__WEBPACK_IMPORTED_MODULE_17__/* .Button */ .z, {
                className: "dark-bg-tab self-start border border-light-line-reply px-4 py-1.5 font-bold hover:bg-light-primary/10 active:bg-light-primary/20 dark:border-light-secondary dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20",
                onClick: handleOpenModal,
                children: "Modifier"
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5573:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "m": () => (/* binding */ UserEditWebsites)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_profile_fields__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7309);
/* harmony import */ var _components_ui_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3325);




/* Site web : une ou plusieurs cases (elles s'affichent toutes, les unes sous
   les autres, sur la page de profil). Les propositions automatiques du
   navigateur sont désactivées : plus de « https://google.com » qui traîne. */ function UserEditWebsites({ websites , onChange , errorMessage  }) {
    const rows = websites.length > 0 ? websites : [
        ""
    ];
    const updateRow = (index, value)=>onChange(rows.map((row, rowIndex)=>rowIndex === index ? value : row));
    const removeRow = (index)=>{
        const nextRows = rows.filter((_, rowIndex)=>rowIndex !== index);
        onChange(nextRows.length > 0 ? nextRows : [
            ""
        ]);
    };
    const addRow = ()=>{
        if (rows.length >= _lib_profile_fields__WEBPACK_IMPORTED_MODULE_3__/* .MAX_PROFILE_ENTRIES */ .pj) return;
        onChange([
            ...rows,
            ""
        ]);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col gap-1.5",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "text-sm font-semibold text-light-secondary dark:text-dark-secondary",
                children: "Site web"
            }),
            rows.map((row, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "relative flex items-center",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "pointer-events-none absolute left-3 flex items-center text-light-secondary/70 dark:text-dark-secondary/70",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_2__/* .MaterialIcon */ .O, {
                                iconName: "link",
                                className: "h-4 w-4"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            type: "text",
                            inputMode: "url",
                            spellCheck: false,
                            autoComplete: "off",
                            autoCorrect: "off",
                            autoCapitalize: "off",
                            maxLength: 100,
                            placeholder: index === 0 ? "https://exemple.com" : "https://autre-site.com",
                            value: row,
                            onChange: (e)=>updateRow(index, e.target.value),
                            "aria-label": index === 0 ? "Site web" : `Site web numéro ${index + 1}`,
                            className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("w-full rounded-xl border bg-main-background py-2.5 pr-11 pl-9 text-sm outline-none transition focus:border-main-accent", errorMessage ? "border-accent-red" : "border-light-line-reply dark:border-dark-border")
                        }),
                        (row.trim().length > 0 || rows.length > 1) && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            type: "button",
                            onClick: ()=>removeRow(index),
                            title: "Retirer ce site",
                            "aria-label": "Retirer ce site",
                            className: "absolute right-2 rounded-full p-1.5 text-light-secondary transition hover:bg-accent-red/10 hover:text-accent-red dark:text-dark-secondary",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_2__/* .MaterialIcon */ .O, {
                                iconName: "close",
                                className: "h-4 w-4"
                            })
                        })
                    ]
                }, index)),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between pt-0.5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        type: "button",
                        onClick: addRow,
                        disabled: rows.length >= _lib_profile_fields__WEBPACK_IMPORTED_MODULE_3__/* .MAX_PROFILE_ENTRIES */ .pj,
                        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()("inline-flex items-center gap-1 text-xs font-medium text-main-accent transition hover:underline", rows.length >= _lib_profile_fields__WEBPACK_IMPORTED_MODULE_3__/* .MAX_PROFILE_ENTRIES */ .pj && "cursor-not-allowed opacity-50"),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_material_icon__WEBPACK_IMPORTED_MODULE_2__/* .MaterialIcon */ .O, {
                                iconName: "add",
                                className: "h-3.5 w-3.5"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: "Ajouter un site web"
                            })
                        ]
                    }),
                    rows.length >= _lib_profile_fields__WEBPACK_IMPORTED_MODULE_3__/* .MAX_PROFILE_ENTRIES */ .pj && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "text-[11px] text-light-secondary dark:text-dark-secondary",
                        children: [
                            _lib_profile_fields__WEBPACK_IMPORTED_MODULE_3__/* .MAX_PROFILE_ENTRIES */ .pj,
                            " sites maximum"
                        ]
                    })
                ]
            }),
            errorMessage && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "text-sm text-accent-red",
                children: errorMessage
            })
        ]
    });
}


/***/ }),

/***/ 7309:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EF": () => (/* binding */ splitProfileEntries),
/* harmony export */   "b5": () => (/* binding */ joinProfileEntries),
/* harmony export */   "pj": () => (/* binding */ MAX_PROFILE_ENTRIES)
/* harmony export */ });
/* Les champs « Lieu de résidence » et « Site web » acceptent plusieurs
   entrées : elles sont enregistrées dans le même champ (une seule valeur en
   base), séparées par un retour à la ligne. Les profils enregistrés avant, qui
   ne contiennent qu'une seule valeur, restent donc lisibles tels quels. */ const MAX_PROFILE_ENTRIES = 6;
/* Découpe la valeur enregistrée en une liste de valeurs propres. */ function splitProfileEntries(value) {
    if (!value) return [];
    return value.split("\n").map((entry)=>entry.trim()).filter(Boolean);
}
/* Rassemble la liste en une seule valeur ; `null` quand tout est vide. */ function joinProfileEntries(entries) {
    const cleaned = entries.map((entry)=>entry.trim()).filter(Boolean);
    return cleaned.length > 0 ? cleaned.join("\n") : null;
}


/***/ })

};
;