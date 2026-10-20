"use strict";
(() => {
var exports = {};
exports.id = 2966;
exports.ids = [2966];
exports.modules = {

/***/ 792:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ locationSuggestEndpoint)
/* harmony export */ });
const POPULAR_FALLBACK_CITIES = [
    "Paris, France",
    "Marseille, France",
    "Lyon, France",
    "Toulouse, France",
    "Nice, France",
    "Nantes, France",
    "Montpellier, France",
    "Strasbourg, France",
    "Bordeaux, France",
    "Lille, France",
    "Rennes, France",
    "Bruxelles, Belgique",
    "Gen\xe8ve, Suisse",
    "Montr\xe9al, Canada",
    "Qu\xe9bec, Canada",
    "Casablanca, Maroc",
    "Alger, Alg\xe9rie",
    "Tunis, Tunisie",
    "Dakar, S\xe9n\xe9gal",
    "Abidjan, C\xf4te d’Ivoire",
    "Londres, Royaume-Uni",
    "Berlin, Allemagne",
    "Madrid, Espagne",
    "Rome, Italie",
    "Tokyo, Japon",
    "New York, \xc9tats-Unis"
];
function cleanPlaceParts(parts) {
    const filtered = parts.map((p)=>p?.trim()).filter(Boolean);
    const unique = Array.from(new Set(filtered));
    return unique.join(", ");
}
async function locationSuggestEndpoint(req, res) {
    const { q , lat , lon  } = req.query;
    const latitude = typeof lat === "string" ? lat : Array.isArray(lat) ? lat[0] : null;
    const longitude = typeof lon === "string" ? lon : Array.isArray(lon) ? lon[0] : null;
    // 1. Reverse geocoding via coordinates (Position)
    if (latitude && longitude) {
        try {
            const response = await fetch(`https://photon.komoot.io/reverse?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`, {
                headers: {
                    "User-Agent": "TwitterClone/1.0"
                }
            });
            if (response.ok) {
                const data = await response.json();
                const p = data.features?.[0]?.properties;
                if (p) {
                    const city = p.city ?? p.name ?? p.locality ?? p.district;
                    const country = p.country;
                    const label = cleanPlaceParts([
                        city,
                        country
                    ]);
                    if (label) {
                        res.status(200).json({
                            location: label
                        });
                        return;
                    }
                }
            }
            // Fallback Nominatim
            const nomRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`, {
                headers: {
                    "User-Agent": "TwitterClone/1.0"
                }
            });
            if (nomRes.ok) {
                const nomData = await nomRes.json();
                const addr = nomData.address;
                const city1 = addr?.city ?? addr?.town ?? addr?.village ?? addr?.municipality;
                const country1 = addr?.country;
                const label1 = cleanPlaceParts([
                    city1,
                    country1
                ]);
                if (label1) {
                    res.status(200).json({
                        location: label1
                    });
                    return;
                }
            }
        } catch  {
        // Ignore network errors and continue
        }
        res.status(200).json({
            location: null
        });
        return;
    }
    // 2. Autocomplete search query
    const query = typeof q === "string" ? q.trim() : "";
    if (!query) {
        res.status(200).json({
            suggestions: POPULAR_FALLBACK_CITIES.slice(0, 8).map((city)=>({
                    label: city
                }))
        });
        return;
    }
    try {
        const response1 = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=7&lang=fr`, {
            headers: {
                "User-Agent": "TwitterClone/1.0"
            }
        });
        if (response1.ok) {
            const data1 = await response1.json();
            const features = data1.features ?? [];
            const suggestions = features.map((f)=>{
                const p = f.properties;
                const city = p?.city ?? p?.name;
                const state = p?.state !== city ? p?.state : undefined;
                const country = p?.country;
                const label = cleanPlaceParts([
                    city,
                    state,
                    country
                ]);
                return {
                    label,
                    city,
                    country
                };
            }).filter((item)=>Boolean(item.label));
            // Remove duplicates by label
            const seen = new Set();
            const uniqueSuggestions = suggestions.filter((item)=>{
                if (seen.has(item.label.toLowerCase())) return false;
                seen.add(item.label.toLowerCase());
                return true;
            });
            if (uniqueSuggestions.length > 0) {
                res.status(200).json({
                    suggestions: uniqueSuggestions
                });
                return;
            }
        }
    } catch  {
    // Network failure, fallback to local search
    }
    // Fallback search
    const filteredFallback = POPULAR_FALLBACK_CITIES.filter((city)=>city.toLowerCase().includes(query.toLowerCase())).map((label)=>({
            label
        }));
    res.status(200).json({
        suggestions: filteredFallback.length > 0 ? filteredFallback : [
            {
                label: query
            }
        ]
    });
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(792));
module.exports = __webpack_exports__;

})();