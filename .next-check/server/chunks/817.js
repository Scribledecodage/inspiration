"use strict";
exports.id = 817;
exports.ids = [817];
exports.modules = {

/***/ 817:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dw": () => (/* binding */ getB2UploadTicket),
/* harmony export */   "UR": () => (/* binding */ uploadToB2),
/* harmony export */   "_2": () => (/* binding */ getB2DownloadInfo),
/* harmony export */   "vA": () => (/* binding */ buildPublicUrl)
/* harmony export */ });
/* unused harmony exports B2_BUCKET, B2_BUCKET_ID */
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);

const B2_ACCOUNT_ID = process.env.B2_ACCESS_KEY_ID ?? "1a1dec339876";
const B2_APPLICATION_KEY = process.env.B2_SECRET_ACCESS_KEY ?? "005e6cbd9162ae7f1656e753cc81dc52d9f0988e42";
const B2_BUCKET = process.env.B2_BUCKET ?? "inspirationcool2";
const B2_BUCKET_ID = process.env.B2_BUCKET_ID ?? "010a31ad4eac4363a9180716";
const B2_PUBLIC_URL = process.env.B2_PUBLIC_URL ?? "https://f005.backblazeb2.com/file/inspirationcool2";
let cachedAuth = null;
async function getB2Auth() {
    const now = Date.now();
    if (cachedAuth && cachedAuth.expiresAt > now + 60000) {
        return cachedAuth;
    }
    const basicAuth = Buffer.from(`${B2_ACCOUNT_ID}:${B2_APPLICATION_KEY}`).toString("base64");
    const res = await fetch("https://api.backblazeb2.com/b2api/v2/b2_authorize_account", {
        headers: {
            Authorization: `Basic ${basicAuth}`
        }
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`B2 authorize failed (${res.status}): ${errorText}`);
    }
    const data = await res.json();
    cachedAuth = {
        apiUrl: data.apiUrl,
        authorizationToken: data.authorizationToken,
        downloadUrl: data.downloadUrl,
        expiresAt: now + 23 * 3600 * 1000
    };
    return cachedAuth;
}
async function getUploadUrl(auth, bucketId) {
    const res = await fetch(`${auth.apiUrl}/b2api/v2/b2_get_upload_url`, {
        method: "POST",
        headers: {
            Authorization: auth.authorizationToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            bucketId
        })
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`B2 get_upload_url failed (${res.status}): ${errorText}`);
    }
    return await res.json();
}
function buildPublicUrl(key) {
    const sanitized = key.replace(/^\/+/, "");
    // Use local API proxy to serve images from private B2 bucket
    return `/api/image/${sanitized}`;
}
async function uploadToB2(key, body, contentType = "image/jpeg") {
    const auth = await getB2Auth();
    const { uploadUrl , authorizationToken  } = await getUploadUrl(auth, B2_BUCKET_ID);
    const uint8Data = new Uint8Array(body.buffer, body.byteOffset, body.length);
    const sha1 = crypto__WEBPACK_IMPORTED_MODULE_0___default().createHash("sha1").update(uint8Data).digest("hex");
    const sanitizedKey = key.split("/").map((seg)=>encodeURIComponent(seg)).join("/");
    const res = await fetch(uploadUrl, {
        method: "POST",
        headers: {
            Authorization: authorizationToken,
            "X-Bz-File-Name": sanitizedKey,
            "Content-Type": contentType,
            "Content-Length": body.length.toString(),
            "X-Bz-Content-Sha1": sha1
        },
        body: uint8Data
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`B2 upload failed (${res.status}): ${errorText}`);
    }
    return buildPublicUrl(key);
}
/* Une seule autorisation à la fois : valable 7 jours pour tout le bucket. */ let cachedDownloadInfo = null;
/** Autorisation de téléchargement direct : permet de lire les vidéos depuis
 *  Backblaze sans passer par la fonction serverless (pensée pour être mise en
 *  cache, elle vaut pour tout le bucket pendant une semaine). */ async function getB2DownloadInfo() {
    const now = Date.now();
    if (cachedDownloadInfo && cachedDownloadInfo.expiresAt > now) return cachedDownloadInfo.info;
    const auth = await getB2Auth();
    const res = await fetch(`${auth.apiUrl}/b2api/v2/b2_get_download_authorization`, {
        method: "POST",
        headers: {
            Authorization: auth.authorizationToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            bucketId: B2_BUCKET_ID,
            fileNamePrefix: "",
            validDurationInSeconds: 7 * 24 * 3600
        })
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`B2 get_download_authorization failed (${res.status}): ${errorText}`);
    }
    const data = await res.json();
    const info = {
        token: data.authorizationToken,
        baseUrl: `${auth.downloadUrl}/file/${B2_BUCKET}`
    };
    cachedDownloadInfo = {
        info,
        expiresAt: now + 6 * 24 * 3600 * 1000
    };
    return info;
}
/** Billet d'upload direct : le navigateur envoie le fichier à Backblaze
 *  lui-même, ce qui évite la limite de taille des fonctions serverless. */ async function getB2UploadTicket() {
    const auth = await getB2Auth();
    return getUploadUrl(auth, B2_BUCKET_ID);
}



/***/ })

};
;