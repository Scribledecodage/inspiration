"use strict";
exports.id = 9449;
exports.ids = [9449];
exports.modules = {

/***/ 9449:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SA": () => (/* binding */ fontStacks),
/* harmony export */   "Uo": () => (/* binding */ DEFAULT_FONT),
/* harmony export */   "kG": () => (/* binding */ normalizeFont),
/* harmony export */   "yf": () => (/* binding */ fontOptions)
/* harmony export */ });
/**
 * Polices proposées dans le menu Apparence.
 *
 * Quatre familles professionnelles, dessinées pour les interfaces et
 * parfaitement lisibles en français. Les anciennes valeurs enregistrées
 * (« outfit », « chirp ») sont converties automatiquement par
 * `normalizeFont` afin de ne jamais casser un profil existant.
 */ const DEFAULT_FONT = "inter";
const fontStacks = {
    inter: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
    manrope: "'Manrope', 'Inter', system-ui, sans-serif",
    jakarta: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
    plex: "'IBM Plex Sans', 'Inter', system-ui, sans-serif"
};
const fontOptions = [
    {
        key: "inter",
        label: "Inter",
        description: "Neutre et pr\xe9cise, la r\xe9f\xe9rence des interfaces modernes."
    },
    {
        key: "manrope",
        label: "Manrope",
        description: "G\xe9om\xe9trique et contemporaine, avec beaucoup de caract\xe8re."
    },
    {
        key: "jakarta",
        label: "Plus Jakarta Sans",
        description: "Chaleureuse et \xe9ditoriale, agr\xe9able \xe0 lire au quotidien."
    },
    {
        key: "plex",
        label: "IBM Plex Sans",
        description: "Technique et soign\xe9e, pens\xe9e pour les longs contenus."
    }
];
const availableFonts = fontOptions.map(({ key  })=>key);
function normalizeFont(font) {
    if (availableFonts.includes(font)) return font;
    /* Anciens choix : Outfit était la police des titres, Chirp la police
     « maison ». On les remplace par les équivalents les plus proches. */ if (font === "outfit") return "manrope";
    if (font === "chirp") return "inter";
    return DEFAULT_FONT;
}


/***/ })

};
;