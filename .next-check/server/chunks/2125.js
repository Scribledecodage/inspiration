"use strict";
exports.id = 2125;
exports.ids = [2125];
exports.modules = {

/***/ 2125:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ET": () => (/* binding */ summarizeWithAi),
/* harmony export */   "Ih": () => (/* binding */ withAiDefaults),
/* harmony export */   "Tt": () => (/* binding */ chatWithAi),
/* harmony export */   "Us": () => (/* binding */ rewriteWithAi),
/* harmony export */   "k0": () => (/* binding */ translateWithAi)
/* harmony export */ });
/* unused harmony exports AiError, isKnownAiLanguage, aiRequest, buildHistory */
/* harmony import */ var _lib_types_ai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(800);

/** Erreur renvoyée par l'API d'intelligence artificielle. */ class AiError extends Error {
    constructor(message, status){
        super(message);
        this.status = status;
        this.name = "AiError";
    }
}
/** Complète les réglages avec les valeurs par défaut. */ function withAiDefaults(settings) {
    return {
        ..._lib_types_ai__WEBPACK_IMPORTED_MODULE_0__/* .DEFAULT_AI_SETTINGS */ .Kx,
        ...settings ?? {}
    };
}
/** La langue demandée fait-elle partie de la liste proposée ? */ function isKnownAiLanguage(language) {
    return _lib_types_ai__WEBPACK_IMPORTED_MODULE_0__/* .AI_LANGUAGES.includes */ .Cz.includes(language);
}
/**
 * Envoie une demande au modèle et renvoie sa réponse.
 *
 * Le modèle est appelé par notre serveur (route `/api/ai`) : la clé du
 * fournisseur ne transite donc jamais par une requête faite depuis le
 * navigateur vers un tiers.
 */ async function aiRequest(payload) {
    let response;
    try {
        response = await fetch("/api/ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    } catch  {
        throw new AiError("Impossible de joindre le service d’intelligence artificielle.");
    }
    const data = await response.json().catch(()=>({}));
    if (!response.ok) throw new AiError(data.error ?? "Le service d’intelligence artificielle a renvoy\xe9 une erreur.", response.status);
    return (data.reply ?? "").trim();
}
/** Consigne de base, commune à toutes les demandes. */ function baseInstruction(settings) {
    const language = isKnownAiLanguage(settings.language) ? settings.language : _lib_types_ai__WEBPACK_IMPORTED_MODULE_0__/* .DEFAULT_AI_SETTINGS.language */ .Kx.language;
    const custom = settings.systemPrompt.trim();
    return [
        `Tu es l'assistant d'Inspiration, un réseau social. Tu réponds en ${language}.`,
        "Tes r\xe9ponses sont courtes, concr\xe8tes et bien structur\xe9es.",
        "Si tu ne sais pas, tu le dis : tu n’inventes jamais de fait.",
        custom ? `Consigne supplémentaire de la personne : ${custom}` : ""
    ].filter(Boolean).join(" ");
}
/** Historique de la conversation, prêt à être envoyé au modèle. */ function buildHistory(turns) {
    return turns.map((turn)=>({
            role: turn.role,
            content: turn.content
        }));
}
/** Dialogue avec l'assistant. */ async function chatWithAi(history, settings) {
    const reply = await aiRequest({
        task: "chat",
        apiKey: settings.apiKey,
        language: settings.language,
        model: settings.model,
        messages: [
            {
                role: "system",
                content: baseInstruction(settings)
            },
            ...buildHistory(history)
        ]
    });
    if (!reply) throw new AiError("Le mod\xe8le n’a rien r\xe9pondu.");
    return reply;
}
/** Traduit un texte dans la langue choisie. */ async function translateWithAi(text, settings) {
    const reply = await aiRequest({
        task: "translate",
        apiKey: settings.apiKey,
        language: settings.translateLanguage,
        model: settings.model,
        text
    });
    if (!reply) throw new AiError("La traduction est vide.");
    return reply;
}
/** Reformule un texte (amélioration, ton, longueur…). */ async function rewriteWithAi(text, settings, instruction) {
    const reply = await aiRequest({
        task: "rewrite",
        apiKey: settings.apiKey,
        instruction,
        language: settings.language,
        model: settings.model,
        text
    });
    if (!reply) throw new AiError("La reformulation est vide.");
    return reply;
}
/** Résume un texte. */ async function summarizeWithAi(text, settings) {
    const reply = await aiRequest({
        task: "summarize",
        apiKey: settings.apiKey,
        language: settings.language,
        model: settings.model,
        text
    });
    if (!reply) throw new AiError("Le r\xe9sum\xe9 est vide.");
    return reply;
}


/***/ }),

/***/ 800:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cz": () => (/* binding */ AI_LANGUAGES),
/* harmony export */   "Kx": () => (/* binding */ DEFAULT_AI_SETTINGS),
/* harmony export */   "jd": () => (/* binding */ AI_MODELS)
/* harmony export */ });
/**
 * Réglages des fonctions d'intelligence artificielle.
 *
 * Ils sont stockés dans le profil de l'utilisateur : chaque personne garde
 * la main sur ce qui est envoyé à un modèle, et sur la langue de réponse.
 */ const DEFAULT_AI_SETTINGS = {
    enabled: true,
    assistantEnabled: true,
    translateEnabled: true,
    language: "fran\xe7ais",
    translateLanguage: "fran\xe7ais",
    model: "",
    systemPrompt: "",
    apiKey: ""
};
/** Langues proposées pour la traduction et les réponses. */ const AI_LANGUAGES = [
    "fran\xe7ais",
    "anglais",
    "espagnol",
    "allemand",
    "italien",
    "portugais",
    "n\xe9erlandais",
    "polonais",
    "russe",
    "ukrainien",
    "turc",
    "arabe",
    "h\xe9breu",
    "chinois simplifi\xe9",
    "japonais",
    "cor\xe9en",
    "hindi",
    "tha\xef"
];
/** Modèles proposés, quand le serveur n'en impose aucun. */ const AI_MODELS = [
    "",
    "gpt-4o-mini",
    "gpt-4o",
    "gpt-4.1-mini",
    "claude-3-5-haiku-latest",
    "claude-3-5-sonnet-latest",
    "llama-3.3-70b-versatile",
    "mistral-small-latest",
    "gemini-2.0-flash"
];


/***/ })

};
;