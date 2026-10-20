"use strict";
(() => {
var exports = {};
exports.id = 6041;
exports.ids = [6041];
exports.modules = {

/***/ 5836:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/**
 * Passerelle vers le fournisseur d'intelligence artificielle.
 *
 * Par défaut, c'est OpenRouter : il parle l'API « chat completions »
 * d'OpenAI et donne accès à tous les grands modèles avec une seule clé.
 * L'adresse et le modèle se configurent par variables d'environnement ; la
 * clé peut aussi être fournie par la personne, depuis ses réglages, quand
 * le serveur n'en a pas.
 */ const DEFAULT_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-4o-mini";
/* Au-delà, la demande devient inutilement coûteuse : on la coupe. */ const MAX_INPUT_LENGTH = 12000;
const MAX_HISTORY = 20;
const TIMEOUT_MS = 45000;
/** Première valeur non vide d'une liste. */ function firstNonEmpty(...values) {
    const found = values.find((value)=>Boolean(value?.trim()));
    return found?.trim() ?? "";
}
/** Extrait le texte de la réponse, quel que soit le format du fournisseur. */ function extractReply(payload) {
    const content = payload.choices?.[0]?.message?.content;
    if (typeof content === "string") return content.trim();
    if (Array.isArray(content)) return content.map((part)=>typeof part === "string" ? part : part?.text ?? "").join("").trim();
    return "";
}
/** Consigne système selon la nature de la demande. */ function buildInstruction(body) {
    const language = (body.language ?? "fran\xe7ais").trim() || "fran\xe7ais";
    const text = (body.text ?? "").slice(0, MAX_INPUT_LENGTH).trim();
    if (body.task === "translate") return [
        `Traduis le texte ci-dessous en ${language}.`,
        "Rends uniquement la traduction, sans explication ni guillemets.",
        "Conserve la mise en forme, les sauts de ligne et les hashtags.",
        "",
        text
    ].join("\n");
    if (body.task === "rewrite") return [
        `Réécris le texte ci-dessous en ${language}.`,
        body.instruction?.trim() ? `Consigne : ${body.instruction.trim()}` : "Consigne : rends le texte plus clair, plus court et plus naturel, sans changer son sens.",
        "Rends uniquement le texte r\xe9\xe9crit, sans explication.",
        "",
        text
    ].join("\n");
    if (body.task === "summarize") return [
        `Résume le texte ci-dessous en ${language}.`,
        "Rends un r\xe9sum\xe9 court, en deux ou trois phrases au maximum, sans pr\xe9ambule.",
        "",
        text
    ].join("\n");
    return "";
}
/** Ne conserve que les tours utiles (rôle et contenu). */ function cleanHistory(messages) {
    if (!Array.isArray(messages)) return [];
    return messages.filter((turn)=>Boolean(turn) && (turn.role === "user" || turn.role === "assistant" || turn.role === "system") && typeof turn.content === "string" && turn.content.trim().length > 0).slice(-MAX_HISTORY).map((turn)=>({
            role: turn.role,
            content: turn.content.slice(0, MAX_INPUT_LENGTH)
        }));
}
async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).json({
            error: "M\xe9thode non autoris\xe9e."
        });
        return;
    }
    const body = req.body ?? {};
    const task = body.task ?? "chat";
    const apiKey = firstNonEmpty(body.apiKey, process.env.AI_API_KEY);
    if (!apiKey) {
        res.status(503).json({
            error: "L’intelligence artificielle n’est pas configur\xe9e sur ce serveur. Ajoutez une cl\xe9 dans R\xe9glages › Intelligence artificielle, ou demandez \xe0 l’administration du site d’en configurer une."
        });
        return;
    }
    const endpoint = firstNonEmpty(process.env.AI_API_URL) || DEFAULT_ENDPOINT;
    const model = firstNonEmpty(body.model, process.env.AI_MODEL, DEFAULT_MODEL);
    const history = cleanHistory(body.messages);
    const instruction = buildInstruction(body);
    const messages = [];
    if (instruction) messages.push({
        role: "system",
        content: instruction
    });
    else if (task === "chat") messages.push({
        role: "system",
        content: `Tu es l'assistant d'Inspiration, un réseau social. Tu réponds en ${(body.language ?? "fran\xe7ais").trim() || "fran\xe7ais"}, de façon concise et utile.`
    });
    messages.push(...history);
    if (!messages.length) {
        res.status(400).json({
            error: "La demande est vide."
        });
        return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(), TIMEOUT_MS);
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model,
                messages,
                temperature: task === "chat" ? 0.7 : 0.2
            }),
            signal: controller.signal
        });
        const payload = await response.json().catch(()=>({}));
        if (!response.ok) {
            res.status(response.status >= 400 && response.status < 600 ? response.status : 502).json({
                error: payload.error?.message ?? "Le fournisseur d’intelligence artificielle a refus\xe9 la demande."
            });
            return;
        }
        const reply = extractReply(payload);
        if (!reply) {
            res.status(502).json({
                error: "Le mod\xe8le n’a renvoy\xe9 aucune r\xe9ponse."
            });
            return;
        }
        res.status(200).json({
            reply
        });
    } catch (error) {
        const aborted = error?.name === "AbortError";
        res.status(aborted ? 504 : 502).json({
            error: aborted ? "Le mod\xe8le a mis trop de temps \xe0 r\xe9pondre." : "Impossible de joindre le fournisseur d’intelligence artificielle."
        });
    } finally{
        clearTimeout(timeout);
    }
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5836));
module.exports = __webpack_exports__;

})();