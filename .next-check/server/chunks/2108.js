"use strict";
exports.id = 2108;
exports.ids = [2108];
exports.modules = {

/***/ 2108:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HD": () => (/* binding */ AuthContextProvider),
/* harmony export */   "aC": () => (/* binding */ useAuth)
/* harmony export */ });
/* unused harmony export AuthContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(401);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1492);
/* harmony import */ var _lib_firebase_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1636);
/* harmony import */ var _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5342);
/* harmony import */ var _lib_random__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5195);
/* harmony import */ var _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7359);
/* harmony import */ var _lib_media__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8540);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_auth__WEBPACK_IMPORTED_MODULE_2__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase_app__WEBPACK_IMPORTED_MODULE_4__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_6__]);
([firebase_auth__WEBPACK_IMPORTED_MODULE_2__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, _lib_firebase_app__WEBPACK_IMPORTED_MODULE_4__, _lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__, _lib_firebase_utils__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
function AuthContextProvider({ children  }) {
    const { 0: user , 1: setUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: userBookmarks , 1: setUserBookmarks  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: error , 1: setError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const pendingSignupProfile = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Older Firestore profiles may not contain every field introduced later.
    // Normalize them before rendering so mobile-only components cannot crash on
    // missing arrays such as `followers` and `following`.
    const normalizeUser = (data)=>({
            ...data,
            id: data.id ?? "",
            name: data.name ?? "Utilisateur",
            username: data.username ?? "user",
            bio: data.bio ?? null,
            theme: data.theme ?? null,
            accent: data.accent ?? null,
            website: data.website ?? null,
            phoneNumber: data.phoneNumber ?? null,
            location: data.location ?? null,
            birthDate: data.birthDate ?? null,
            photoURL: (0,_lib_media__WEBPACK_IMPORTED_MODULE_7__/* .getAvatarSrc */ .SJ)(data.photoURL, data.gender),
            gender: data.gender ?? "homme",
            coverPhotoURL: (0,_lib_media__WEBPACK_IMPORTED_MODULE_7__/* .getBannerSrc */ .Xj)(data.coverPhotoURL),
            verified: data.verified ?? false,
            following: Array.isArray(data.following) ? data.following : [],
            followers: Array.isArray(data.followers) ? data.followers : [],
            totalTweets: data.totalTweets ?? 0,
            totalPhotos: data.totalPhotos ?? 0,
            pinnedTweet: data.pinnedTweet ?? null,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt ?? null
        });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let redirectChecked = false;
        const manageUser = async (authUser)=>{
            try {
                const { uid , displayName , photoURL  } = authUser;
                const userSnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__/* .usersCollection */ .W$, uid));
                if (!userSnapshot.exists()) {
                    const signupProfile = pendingSignupProfile.current;
                    let available = false;
                    let randomUsername = "";
                    const normalizeName = (displayName ?? authUser.email?.split("@")[0] ?? "user").replace(/\s/g, "").toLowerCase();
                    if (signupProfile) {
                        try {
                            available = await (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_6__/* .checkUsernameAvailability */ .EJ)(signupProfile.username);
                        } catch  {
                            pendingSignupProfile.current = null;
                            setError(new Error("Impossible de v\xe9rifier le nom d’utilisateur. R\xe9essayez."));
                            // A temporary Firestore error must never delete a valid Firebase
                            // account or sign the person out.
                            return;
                        }
                        if (!available) {
                            pendingSignupProfile.current = null;
                            setError(new Error("Ce nom d’utilisateur est d\xe9j\xe0 pris."));
                            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.deleteUser)(authUser);
                            return;
                        }
                        randomUsername = signupProfile.username;
                    } else while(!available){
                        const randomInt = (0,_lib_random__WEBPACK_IMPORTED_MODULE_8__/* .getRandomInt */ .X)(1, 10000);
                        randomUsername = `${normalizeName}${randomInt}`;
                        available = await (0,_lib_firebase_utils__WEBPACK_IMPORTED_MODULE_6__/* .checkUsernameAvailability */ .EJ)(randomUsername);
                    }
                    const userData = {
                        id: uid,
                        bio: null,
                        name: signupProfile?.name ?? displayName ?? authUser.email?.split("@")[0] ?? "Utilisateur",
                        theme: null,
                        accent: null,
                        website: null,
                        phoneNumber: null,
                        location: null,
                        birthDate: null,
                        photoURL: photoURL ?? (signupProfile?.gender === "femme" ? "/Avatar femme.png" : "/Avatar homme.png"),
                        gender: signupProfile?.gender ?? "homme",
                        username: randomUsername,
                        verified: false,
                        following: [],
                        followers: [],
                        createdAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.serverTimestamp)(),
                        updatedAt: signupProfile ? (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.serverTimestamp)() : null,
                        totalTweets: 0,
                        totalPhotos: 0,
                        pinnedTweet: null,
                        coverPhotoURL: null
                    };
                    const userStatsData = {
                        likes: [],
                        tweets: [],
                        updatedAt: null
                    };
                    await Promise.all([
                        (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__/* .usersCollection */ .W$, uid), userData),
                        (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)((0,_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__/* .userStatsCollection */ .bR)(uid), "stats"), userStatsData)
                    ]);
                    const newUser = (await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__/* .usersCollection */ .W$, uid))).data();
                    setUser(normalizeUser(newUser));
                    pendingSignupProfile.current = null;
                } else {
                    const existingUser = userSnapshot.data();
                    setUser(normalizeUser(existingUser));
                }
            } catch (error) {
                setError(error);
            } finally{
                setLoading(false);
            }
        };
        const handleUserAuth = (authUser)=>{
            setLoading(true);
            if (authUser) void manageUser(authUser);
            else if (redirectChecked) {
                setUser(null);
                setLoading(false);
            }
        };
        const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.onAuthStateChanged)(_lib_firebase_app__WEBPACK_IMPORTED_MODULE_4__/* .auth */ .I8, handleUserAuth);
        void (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getRedirectResult)(_lib_firebase_app__WEBPACK_IMPORTED_MODULE_4__/* .auth */ .I8).then(()=>{
            redirectChecked = true;
            if (!_lib_firebase_app__WEBPACK_IMPORTED_MODULE_4__/* .auth.currentUser */ .I8.currentUser) setLoading(false);
        }).catch((error)=>{
            redirectChecked = true;
            setError(error);
            setLoading(false);
        });
        return unsubscribe;
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!user) return;
        const { id  } = user;
        const unsubscribeUser = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.onSnapshot)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__/* .usersCollection */ .W$, id), (doc)=>{
            const updatedUser = doc.data();
            if (updatedUser) setUser(normalizeUser(updatedUser));
        });
        const unsubscribeBookmarks = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.onSnapshot)((0,_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__/* .userBookmarksCollection */ .we)(id), (snapshot)=>{
            const bookmarks = snapshot.docs.map((doc)=>doc.data());
            setUserBookmarks(bookmarks);
        });
        return ()=>{
            unsubscribeUser();
            unsubscribeBookmarks();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        user?.id
    ]);
    const signInWithGoogle = async ()=>{
        setError(null);
        try {
            const provider = new firebase_auth__WEBPACK_IMPORTED_MODULE_2__.GoogleAuthProvider();
            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithRedirect)(_lib_firebase_app__WEBPACK_IMPORTED_MODULE_4__/* .auth */ .I8, provider);
        } catch (error) {
            setError(error);
        }
    };
    const signInWithEmail = async (email, password)=>{
        setError(null);
        try {
            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithEmailAndPassword)(_lib_firebase_app__WEBPACK_IMPORTED_MODULE_4__/* .auth */ .I8, email, password);
        } catch (error) {
            setError(error);
        }
    };
    const signUpWithEmail = async (name, username, gender, email, password)=>{
        setError(null);
        try {
            pendingSignupProfile.current = {
                name,
                username,
                gender
            };
            const credential = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.createUserWithEmailAndPassword)(_lib_firebase_app__WEBPACK_IMPORTED_MODULE_4__/* .auth */ .I8, email, password);
            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.updateProfile)(credential.user, {
                displayName: name
            });
        } catch (error) {
            pendingSignupProfile.current = null;
            setError(error);
        }
    };
    const signOut = async ()=>{
        try {
            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signOut)(_lib_firebase_app__WEBPACK_IMPORTED_MODULE_4__/* .auth */ .I8);
        } catch (error) {
            setError(error);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!user) return;
        const { id , createdAt  } = user;
        const welcomeId = "welcome";
        const ensureWelcome = async ()=>{
            const ref = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)((0,_lib_firebase_collections__WEBPACK_IMPORTED_MODULE_5__/* .userNotificationsCollection */ .CC)(id), welcomeId);
            const snap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDoc)(ref);
            if (snap.exists()) return;
            const createdMs = typeof createdAt === "number" ? createdAt : createdAt && typeof createdAt.toMillis === "function" ? createdAt.toMillis() : Date.now();
            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.setDoc)(ref, {
                id: welcomeId,
                title: "Bienvenue sur Inspiration",
                body: "Merci d’avoir cr\xe9\xe9 votre compte sur Inspiration.\n\nInspiration est un r\xe9seau social pens\xe9 pour partager vos id\xe9es, vos passions et vos moments dans un espace simple, rapide et respectueux. Vous pouvez publier du texte, des photos, des GIFs, des sondages et des vid\xe9os, programmer vos publications, ajouter un lieu, et \xe9changer en messages priv\xe9s ou en groupes.\n\nPour bien d\xe9marrer : compl\xe9tez votre profil (photo, bio, lieu, th\xe8me), publiez votre premier message, explorez la page \xab D\xe9couvrir \xbb pour trouver des comptes \xe0 suivre, cr\xe9ez un statut \xe9ph\xe9m\xe8re (24 h), lancez une cha\xeene pour diffuser du contenu dont vous \xeates le seul auteur, et personnalisez vos pr\xe9f\xe9rences dans les param\xe8tres.\n\nVos donn\xe9es restent les v\xf4tres. Nous ne vendons jamais vos informations personnelles. Vous gardez le contr\xf4le total de votre contenu et de votre exp\xe9rience.\n\nBesoin d’aide ? Consultez les param\xe8tres ou contactez-nous. Bonne exploration sur Inspiration !",
                type: "welcome",
                createdAt: createdMs,
                read: false
            });
        };
        void ensureWelcome().catch(()=>undefined);
    }, [
        user?.id
    ]);
    const randomSeed = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(_lib_random__WEBPACK_IMPORTED_MODULE_8__/* .getRandomId */ .w, [
        user?.id
    ]);
    const isAdmin = user ? user.username === "ccrsxx" : false;
    const value = {
        user,
        error,
        loading,
        isAdmin,
        randomSeed,
        userBookmarks,
        signOut,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AuthContext.Provider, {
        value: value,
        children: children
    });
}
function useAuth() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthContextProvider");
    return context;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1636:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I8": () => (/* binding */ auth),
/* harmony export */   "db": () => (/* binding */ db)
/* harmony export */ });
/* unused harmony exports getFirebase, storage */
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3745);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(401);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1492);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3392);
/* harmony import */ var firebase_functions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8937);
/* harmony import */ var _lib_env__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1923);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(630);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, firebase_storage__WEBPACK_IMPORTED_MODULE_3__, firebase_functions__WEBPACK_IMPORTED_MODULE_4__]);
([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, firebase_storage__WEBPACK_IMPORTED_MODULE_3__, firebase_functions__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







function initialize() {
    // Reuse the default app when Next.js reloads modules in development. Creating
    // a second app can leave Auth and Firestore bound to different SDK instances.
    const firebaseApp = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps)().length ? (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApp)() : (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)((0,_config__WEBPACK_IMPORTED_MODULE_6__/* .getFirebaseConfig */ .d)());
    const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(firebaseApp);
    const storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.getStorage)(firebaseApp);
    const firestore = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(firebaseApp);
    const functions = (0,firebase_functions__WEBPACK_IMPORTED_MODULE_4__.getFunctions)(firebaseApp);
    return {
        firebaseApp,
        auth,
        firestore,
        storage,
        functions
    };
}
function connectToEmulator({ auth , storage , firestore , functions , firebaseApp  }) {
    (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.connectAuthEmulator)(auth, "http://localhost:9099", {
        disableWarnings: true
    });
    (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.connectStorageEmulator)(storage, "localhost", 9199);
    (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.connectFirestoreEmulator)(firestore, "localhost", 8080);
    (0,firebase_functions__WEBPACK_IMPORTED_MODULE_4__.connectFunctionsEmulator)(functions, "localhost", 5001);
    return {
        firebaseApp,
        auth,
        firestore,
        storage,
        functions
    };
}
function getFirebase() {
    const firebase = initialize();
    if (_lib_env__WEBPACK_IMPORTED_MODULE_5__/* .isUsingEmulator */ .nc) return connectToEmulator(firebase);
    return firebase;
}
const { firestore: db , auth , storage  } = getFirebase();

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5342:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CC": () => (/* binding */ userNotificationsCollection),
/* harmony export */   "HA": () => (/* binding */ userConversationsCollection),
/* harmony export */   "VV": () => (/* binding */ tweetsCollection),
/* harmony export */   "W$": () => (/* binding */ usersCollection),
/* harmony export */   "WN": () => (/* binding */ conversationMessagesCollection),
/* harmony export */   "bR": () => (/* binding */ userStatsCollection),
/* harmony export */   "lV": () => (/* binding */ statusesCollection),
/* harmony export */   "mk": () => (/* binding */ userContactsCollection),
/* harmony export */   "qx": () => (/* binding */ userReportsCollection),
/* harmony export */   "rN": () => (/* binding */ userScheduledTweetsCollection),
/* harmony export */   "tn": () => (/* binding */ channelsCollection),
/* harmony export */   "we": () => (/* binding */ userBookmarksCollection)
/* harmony export */ });
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1492);
/* harmony import */ var _lib_types_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3771);
/* harmony import */ var _lib_types_tweet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9144);
/* harmony import */ var _lib_types_bookmark__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1524);
/* harmony import */ var _lib_types_contact__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6713);
/* harmony import */ var _lib_types_stats__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7831);
/* harmony import */ var _lib_types_message__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2424);
/* harmony import */ var _lib_types_notification__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9396);
/* harmony import */ var _lib_types_report__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2901);
/* harmony import */ var _lib_types_status__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(102);
/* harmony import */ var _lib_types_channel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7997);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1636);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_0__, _app__WEBPACK_IMPORTED_MODULE_11__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_0__, _app__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












const usersCollection = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_app__WEBPACK_IMPORTED_MODULE_11__.db, "users").withConverter(_lib_types_user__WEBPACK_IMPORTED_MODULE_1__/* .userConverter */ .x);
const tweetsCollection = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_app__WEBPACK_IMPORTED_MODULE_11__.db, "tweets").withConverter(_lib_types_tweet__WEBPACK_IMPORTED_MODULE_2__/* .tweetConverter */ .f);
const statusesCollection = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_app__WEBPACK_IMPORTED_MODULE_11__.db, "statuses").withConverter(_lib_types_status__WEBPACK_IMPORTED_MODULE_9__/* .statusConverter */ .H);
const channelsCollection = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_app__WEBPACK_IMPORTED_MODULE_11__.db, "channels").withConverter(_lib_types_channel__WEBPACK_IMPORTED_MODULE_10__/* .channelConverter */ .q);
/* Signalements de contenu : rangés dans l'espace privé de la personne qui
   signale. Rien n'est transmis à la personne signalée et aucune mesure n'est
   appliquée automatiquement : la décision reste humaine. */ function userReportsCollection(id) {
    return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_app__WEBPACK_IMPORTED_MODULE_11__.db, `users/${id}/reports`).withConverter(_lib_types_report__WEBPACK_IMPORTED_MODULE_8__/* .reportConverter */ .I);
}
function userBookmarksCollection(id) {
    return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_app__WEBPACK_IMPORTED_MODULE_11__.db, `users/${id}/bookmarks`).withConverter(_lib_types_bookmark__WEBPACK_IMPORTED_MODULE_3__/* .bookmarkConverter */ .N);
}
function userScheduledTweetsCollection(id) {
    return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_app__WEBPACK_IMPORTED_MODULE_11__.db, `users/${id}/scheduledTweets`).withConverter(_lib_types_tweet__WEBPACK_IMPORTED_MODULE_2__/* .scheduledTweetConverter */ .d);
}
function userNotificationsCollection(id) {
    return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_app__WEBPACK_IMPORTED_MODULE_11__.db, `users/${id}/notifications`).withConverter(_lib_types_notification__WEBPACK_IMPORTED_MODULE_7__/* .notificationConverter */ .w);
}
function userContactsCollection(id) {
    return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_app__WEBPACK_IMPORTED_MODULE_11__.db, `users/${id}/contacts`).withConverter(_lib_types_contact__WEBPACK_IMPORTED_MODULE_4__/* .contactConverter */ .P);
}
function userStatsCollection(id) {
    return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_app__WEBPACK_IMPORTED_MODULE_11__.db, `users/${id}/stats`).withConverter(_lib_types_stats__WEBPACK_IMPORTED_MODULE_5__/* .statsConverter */ .Y);
}
function userConversationsCollection(userId) {
    return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_app__WEBPACK_IMPORTED_MODULE_11__.db, `users/${userId}/conversations`).withConverter(_lib_types_message__WEBPACK_IMPORTED_MODULE_6__/* .conversationConverter */ .N);
}
function conversationMessagesCollection(userId, conversationId) {
    return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.collection)(_app__WEBPACK_IMPORTED_MODULE_11__.db, `users/${userId}/conversations/${conversationId}/messages`).withConverter(_lib_types_message__WEBPACK_IMPORTED_MODULE_6__/* .chatMessageConverter */ .h);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 630:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "d": () => (/* binding */ getFirebaseConfig)
/* harmony export */ });
const config = {
    apiKey: "AIzaSyD7ybB8jjqNyV4SQ38hEVK71AuJUuf1h8E",
    authDomain: "mont2-tweet.firebaseapp.com",
    projectId: "mont2-tweet",
    storageBucket: "mont2-tweet.firebasestorage.app",
    messagingSenderId: "261870386503",
    appId: "1:261870386503:web:63092e30b24fb6b88b6062",
    measurementId: "G-23TKH2B6S8"
};
function getFirebaseConfig() {
    if (Object.values(config).some((value)=>!value)) throw new Error("Firebase config is not set or incomplete");
    return config;
}


/***/ }),

/***/ 7359:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$1": () => (/* binding */ manageTotalTweets),
/* harmony export */   "Al": () => (/* binding */ updateUserData),
/* harmony export */   "EJ": () => (/* binding */ checkUsernameAvailability),
/* harmony export */   "MT": () => (/* binding */ setPollVote),
/* harmony export */   "Mq": () => (/* binding */ manageReply),
/* harmony export */   "R1": () => (/* binding */ manageLike),
/* harmony export */   "SZ": () => (/* binding */ registerTweetView),
/* harmony export */   "X_": () => (/* binding */ managePinnedTweet),
/* harmony export */   "Zs": () => (/* binding */ updateUserTheme),
/* harmony export */   "_A": () => (/* binding */ removeTweet),
/* harmony export */   "_D": () => (/* binding */ publishDueScheduledTweets),
/* harmony export */   "_S": () => (/* binding */ updateUsername),
/* harmony export */   "aE": () => (/* binding */ manageRetweet),
/* harmony export */   "as": () => (/* binding */ clearAllBookmarks),
/* harmony export */   "f$": () => (/* binding */ clearPollVote),
/* harmony export */   "gL": () => (/* binding */ manageFollow),
/* harmony export */   "iq": () => (/* binding */ manageTotalPhotos),
/* harmony export */   "mN": () => (/* binding */ manageBookmark),
/* harmony export */   "yg": () => (/* binding */ scheduleTweet)
/* harmony export */ });
/* unused harmony exports getCollectionCount, uploadImages, getPendingScheduledTweets, publishScheduledTweet, cancelScheduledTweet */
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1492);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3392);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1636);
/* harmony import */ var _collections__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5342);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_0__, firebase_storage__WEBPACK_IMPORTED_MODULE_1__, _app__WEBPACK_IMPORTED_MODULE_2__, _collections__WEBPACK_IMPORTED_MODULE_3__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_0__, firebase_storage__WEBPACK_IMPORTED_MODULE_1__, _app__WEBPACK_IMPORTED_MODULE_2__, _collections__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




async function checkUsernameAvailability(username) {
    const { empty  } = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.getDocs)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.query)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .usersCollection */ .W$, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.where)("username", "==", username), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.limit)(1)));
    return empty;
}
async function getCollectionCount(collection) {
    const snapshot = await getCountFromServer(collection);
    return snapshot.data().count;
}
async function updateUserData(userId, userData) {
    const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .usersCollection */ .W$, userId);
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)(userRef, {
        ...userData,
        updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
    });
}
async function updateUserTheme(userId, themeData) {
    const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .usersCollection */ .W$, userId);
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)(userRef, {
        ...themeData
    });
}
async function updateUsername(userId, username) {
    const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .usersCollection */ .W$, userId);
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)(userRef, {
        ...username && {
            username
        },
        updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
    });
}
async function managePinnedTweet(type, userId, tweetId) {
    const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .usersCollection */ .W$, userId);
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)(userRef, {
        updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)(),
        pinnedTweet: type === "pin" ? tweetId : null
    });
}
async function manageFollow(type, userId, targetUserId) {
    const batch = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.writeBatch)(_app__WEBPACK_IMPORTED_MODULE_2__.db);
    const userDocRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .usersCollection */ .W$, userId);
    const targetUserDocRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .usersCollection */ .W$, targetUserId);
    if (type === "follow") {
        batch.update(userDocRef, {
            following: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.arrayUnion)(targetUserId),
            updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
        });
        batch.update(targetUserDocRef, {
            followers: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.arrayUnion)(userId),
            updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
        });
    } else {
        batch.update(userDocRef, {
            following: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.arrayRemove)(targetUserId),
            updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
        });
        batch.update(targetUserDocRef, {
            followers: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.arrayRemove)(userId),
            updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
        });
    }
    await batch.commit();
}
async function removeTweet(tweetId) {
    const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .tweetsCollection */ .VV, tweetId);
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.deleteDoc)(userRef);
}
/* Publications déjà comptées dans cette session : une vue ne doit être
   enregistrée qu'une seule fois par publication et par visite, sinon chaque
   re-render (ou un simple rafraîchissement de page) gonflerait le compteur. */ const viewedTweetIds = new Set();
const VIEW_STORAGE_PREFIX = "inspiration:view:";
function hasAlreadyViewed(tweetId) {
    if (viewedTweetIds.has(tweetId)) return true;
    try {
        return sessionStorage.getItem(VIEW_STORAGE_PREFIX + tweetId) === "1";
    } catch  {
        return false;
    }
}
function markAsViewed(tweetId) {
    viewedTweetIds.add(tweetId);
    try {
        sessionStorage.setItem(VIEW_STORAGE_PREFIX + tweetId, "1");
    } catch  {
    // Stockage indisponible (navigation privée) : le Set suffit.
    }
}
async function registerTweetView(tweetId) {
    if (!tweetId || hasAlreadyViewed(tweetId)) return;
    markAsViewed(tweetId);
    const dayKey = new Date().toISOString().slice(0, 10);
    try {
        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .tweetsCollection */ .VV, tweetId), {
            views: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.increment)(1),
            [`viewsByDay.${dayKey}`]: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.increment)(1)
        });
    } catch  {
    // Le compteur de vues ne doit jamais empêcher l'affichage du tweet.
    }
}
/* Les dimensions naturelles de l'image sont enregistrées avec elle : elles
   permettent de réserver la place exacte de l'image AVANT son chargement.
   Sans elles, la publication change de hauteur quand l'image arrive, et le
   fil bouge sous les yeux du lecteur à chaque page chargée. */ async function getImageSize(file) {
    if (!file.type?.startsWith("image/")) return {};
    try {
        const bitmap = await createImageBitmap(file);
        const size = {
            width: bitmap.width,
            height: bitmap.height
        };
        bitmap.close();
        return size;
    } catch  {
        /* Format non décodable (SVG, HEIC…) : on garde l'image, sans ses
       dimensions. L'affichage se fera alors dans un cadre de ratio fixe. */ return {};
    }
}
async function uploadImages(userId, files) {
    if (!files.length) return null;
    const imagesPreview = await Promise.all(files.map(async (file)=>{
        const { id , name: alt , type  } = file;
        const storageRef = ref(storage, `images/${userId}/${id}`);
        await uploadBytesResumable(storageRef, file);
        const src = await getDownloadURL(storageRef);
        const size = await getImageSize(file);
        return {
            id,
            src,
            alt,
            type,
            ...size
        };
    }));
    return imagesPreview;
}
async function manageReply(type, tweetId) {
    const tweetRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .tweetsCollection */ .VV, tweetId);
    try {
        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)(tweetRef, {
            userReplies: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.increment)(type === "increment" ? 1 : -1),
            updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
        });
    } catch  {
    // do nothing, because parent tweet was already deleted
    }
}
async function manageTotalTweets(type, userId) {
    const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .usersCollection */ .W$, userId);
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)(userRef, {
        totalTweets: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.increment)(type === "increment" ? 1 : -1),
        updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
    });
}
async function manageTotalPhotos(type, userId) {
    const userRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .usersCollection */ .W$, userId);
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)(userRef, {
        totalPhotos: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.increment)(type === "increment" ? 1 : -1),
        updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
    });
}
function manageRetweet(type, userId, tweetId) {
    return async ()=>{
        const batch = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.writeBatch)(_app__WEBPACK_IMPORTED_MODULE_2__.db);
        const tweetRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .tweetsCollection */ .VV, tweetId);
        const userStatsRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_3__/* .userStatsCollection */ .bR)(userId), "stats");
        if (type === "retweet") {
            batch.update(tweetRef, {
                userRetweets: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.arrayUnion)(userId),
                updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
            });
            batch.update(userStatsRef, {
                tweets: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.arrayUnion)(tweetId),
                updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
            });
        } else {
            batch.update(tweetRef, {
                userRetweets: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.arrayRemove)(userId),
                updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
            });
            batch.update(userStatsRef, {
                tweets: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.arrayRemove)(tweetId),
                updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
            });
        }
        await batch.commit();
    };
}
function manageLike(type, userId, tweetId) {
    return async ()=>{
        const batch = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.writeBatch)(_app__WEBPACK_IMPORTED_MODULE_2__.db);
        const userStatsRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_3__/* .userStatsCollection */ .bR)(userId), "stats");
        const tweetRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .tweetsCollection */ .VV, tweetId);
        if (type === "like") {
            batch.update(tweetRef, {
                userLikes: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.arrayUnion)(userId),
                updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
            });
            batch.update(userStatsRef, {
                likes: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.arrayUnion)(tweetId),
                updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
            });
        } else {
            batch.update(tweetRef, {
                userLikes: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.arrayRemove)(userId),
                updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
            });
            batch.update(userStatsRef, {
                likes: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.arrayRemove)(tweetId),
                updatedAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
            });
        }
        await batch.commit();
    };
}
async function manageBookmark(type, userId, tweetId) {
    const bookmarkRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_3__/* .userBookmarksCollection */ .we)(userId), tweetId);
    if (type === "bookmark") {
        const bookmarkData = {
            id: tweetId,
            createdAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)()
        };
        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.setDoc)(bookmarkRef, bookmarkData);
    } else await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.deleteDoc)(bookmarkRef);
}
/* --- Sondages ------------------------------------------------------------
   Un vote est rangé directement dans le document de la publication, sous
   `pollVotes.<identifiantUtilisateur>`. Le document étant écouté en temps réel
   par l'affichage du sondage, les votes des autres arrivent tout seuls. */ /** Retire les clés sans valeur : Firestore refuse `undefined`. */ function withoutUndefined(value) {
    return Object.fromEntries(Object.entries(value).filter(([, entry])=>entry !== undefined));
}
async function setPollVote(tweetId, userId, vote) {
    /* La surcharge `updateDoc(ref, chemin, valeur)` accepte un chemin pointé
     (`pollVotes.<id>`) sans exiger le typage des champs imbriqués. */ await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .tweetsCollection */ .VV, tweetId), `pollVotes.${userId}`, withoutUndefined(vote));
}
async function clearPollVote(tweetId, userId) {
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.updateDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .tweetsCollection */ .VV, tweetId), {
        [`pollVotes.${userId}`]: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.deleteField)()
    });
}
async function clearAllBookmarks(userId) {
    const bookmarksRef = (0,_collections__WEBPACK_IMPORTED_MODULE_3__/* .userBookmarksCollection */ .we)(userId);
    const bookmarksSnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.getDocs)(bookmarksRef);
    const batch = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.writeBatch)(_app__WEBPACK_IMPORTED_MODULE_2__.db);
    bookmarksSnapshot.forEach(({ ref  })=>batch.delete(ref));
    await batch.commit();
}
async function scheduleTweet(data) {
    const scheduledData = {
        text: data.text,
        images: data.images,
        parent: data.parent,
        poll: data.poll,
        createdBy: data.createdBy,
        scheduledAt: firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.Timestamp.fromDate(data.scheduledAt),
        status: "pending",
        createdAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)(),
        location: data.location ?? null
    };
    const ref = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.addDoc)((0,_collections__WEBPACK_IMPORTED_MODULE_3__/* .userScheduledTweetsCollection */ .rN)(data.createdBy), scheduledData);
    return ref.id;
}
/** Publications programmées encore en attente, pour un utilisateur donné. */ async function getPendingScheduledTweets(userId) {
    const snapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.getDocs)((0,_collections__WEBPACK_IMPORTED_MODULE_3__/* .userScheduledTweetsCollection */ .rN)(userId));
    return snapshot.docs.map((document)=>document.data()).filter((scheduled)=>scheduled.status === "pending");
}
/** Transforme une publication programmée en vraie publication. */ async function publishScheduledTweet(scheduled) {
    const { text , images , parent , poll , createdBy  } = scheduled;
    const tweetData = {
        text,
        parent,
        images,
        poll: poll ?? null,
        pollVotes: poll ? {} : null,
        location: scheduled.location ?? null,
        userLikes: [],
        createdBy,
        createdAt: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.serverTimestamp)(),
        updatedAt: null,
        userReplies: 0,
        userRetweets: []
    };
    await Promise.all([
        (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.addDoc)(_collections__WEBPACK_IMPORTED_MODULE_3__/* .tweetsCollection */ .VV, tweetData),
        manageTotalTweets("increment", createdBy),
        tweetData.images ? manageTotalPhotos("increment", createdBy) : null,
        parent?.id ? manageReply("increment", parent.id) : null
    ]);
    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.deleteDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)((0,_collections__WEBPACK_IMPORTED_MODULE_3__/* .userScheduledTweetsCollection */ .rN)(createdBy), scheduled.id));
}
/**
 * Publie toutes les publications programmées arrivées à échéance.
 * Renvoie le nombre de publications envoyées.
 */ async function publishDueScheduledTweets(userId) {
    const pending = await getPendingScheduledTweets(userId);
    const now = Date.now();
    const due = pending.filter(({ scheduledAt  })=>{
        const date = scheduledAt?.toDate?.() ?? null;
        return date !== null && date.getTime() <= now;
    });
    let published = 0;
    for (const scheduled of due){
        try {
            await publishScheduledTweet(scheduled);
            published += 1;
        } catch  {
        // On laisse la publication « en attente » : nouvel essai plus tard.
        }
    }
    return published;
}
async function cancelScheduledTweet(userId, id) {
    await deleteDoc(doc(userScheduledTweetsCollection(userId), id));
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8540:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SJ": () => (/* binding */ getAvatarSrc),
/* harmony export */   "Xj": () => (/* binding */ getBannerSrc),
/* harmony export */   "z3": () => (/* binding */ avatarImageOptions)
/* harmony export */ });
/* unused harmony exports DEFAULT_AVATAR, DEFAULT_BANNER */
const DEFAULT_AVATAR = "/Avatar homme.png";
const DEFAULT_BANNER = "/Banniere.png";
function isLegacyAsset(src, assetName) {
    if (!src) return true;
    const normalized = src.toLowerCase();
    return normalized.includes(assetName) || normalized.includes("firebasestorage.googleapis.com");
}
function isFallbackErrorSrc(src) {
    if (!src) return false;
    const assetName = src.split(/[?#]/, 1)[0].split("/").pop()?.toLowerCase();
    return assetName === "banniere.avif" || assetName === "banniere.png";
}
function getAvatarSrc(src, gender) {
    const fallback = gender === "femme" ? "/Avatar femme.png" : DEFAULT_AVATAR;
    if (!src) return fallback;
    const value = src.trim();
    if (!value) return fallback;
    if (isLegacyAsset(value, "twitter-avatar")) return fallback;
    const fileName = value.split(/[?#]/, 1)[0].split("/").pop()?.toLowerCase();
    // Old default placeholder shipped with the clone.
    if (fileName === "user.jpg") return fallback;
    const isRemote = /^(https?:)?\/\//i.test(value);
    const isLocal = value.startsWith("/") || value.startsWith("data:") || value.startsWith("blob:");
    // Anything that is not a real remote/local address (bare file name,
    // "null", "undefined", an expired "blob:" URL, ...) would render a broken
    // image, so fall back to the default avatar instead.
    if (!isRemote && !isLocal) return fallback;
    return value;
}
function getBannerSrc(src) {
    if (!src || isFallbackErrorSrc(src)) return DEFAULT_BANNER;
    const normalized = src.toLowerCase();
    return normalized.includes("twitter-banner") || normalized.includes("firebasestorage.googleapis.com") || normalized.endsWith("/banniere2.png") ? DEFAULT_BANNER : src;
}
/* Photos de profil toutes prêtes : les deux avatars par défaut du site, puis
   quelques portraits dessinés que l'on peut choisir si on veut. */ const avatarImageOptions = [
    {
        name: "Avatar homme",
        src: DEFAULT_AVATAR
    },
    {
        name: "Avatar femme",
        src: "/Avatar femme.png"
    },
    {
        name: "Froge",
        src: "https://img.avatardecoration.com/avatars/froge_8.png"
    },
    {
        name: "Grimma",
        src: "https://img.avatardecoration.com/avatars/grimma_1.png"
    },
    {
        name: "Klayden",
        src: "https://img.avatardecoration.com/avatars/klayden_1.png"
    },
    {
        name: "Scena",
        src: "https://img.avatardecoration.com/avatars/scena_1.png"
    },
    {
        name: "Megatron",
        src: "https://img.avatardecoration.com/avatars/megatron_1.png"
    },
    {
        name: "House",
        src: "https://img.avatardecoration.com/avatars/house_1.png"
    },
    {
        name: "L\xe9on",
        src: "https://img.avatardecoration.com/avatars/leon_2.png"
    }
];


/***/ }),

/***/ 5195:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ getRandomInt),
/* harmony export */   "w": () => (/* binding */ getRandomId)
/* harmony export */ });
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function getRandomId() {
    return Array.from({
        length: 20
    }).reduce((acc)=>acc + CHARS[~~(Math.random() * CHARS.length)], "");
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/***/ }),

/***/ 1524:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ bookmarkConverter)
/* harmony export */ });
const bookmarkConverter = {
    toFirestore (bookmark) {
        return {
            ...bookmark
        };
    },
    fromFirestore (snapshot, options) {
        const data = snapshot.data(options);
        return {
            ...data
        };
    }
};


/***/ }),

/***/ 7997:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ channelConverter)
/* harmony export */ });
const channelConverter = {
    toFirestore (channel) {
        return {
            ...channel
        };
    },
    fromFirestore (snapshot, options) {
        const { id  } = snapshot;
        const data = snapshot.data(options);
        return {
            id,
            ...data
        };
    }
};


/***/ }),

/***/ 6713:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P": () => (/* binding */ contactConverter)
/* harmony export */ });
const contactConverter = {
    toFirestore (contact) {
        return {
            ...contact
        };
    },
    fromFirestore (snapshot, options) {
        const data = snapshot.data(options);
        return {
            ...data
        };
    }
};


/***/ }),

/***/ 2424:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ conversationConverter),
/* harmony export */   "h": () => (/* binding */ chatMessageConverter)
/* harmony export */ });
const chatMessageConverter = {
    toFirestore (message) {
        return {
            ...message
        };
    },
    fromFirestore (snapshot, options) {
        const data = snapshot.data(options);
        return {
            ...data
        };
    }
};
const conversationConverter = {
    toFirestore (conversation) {
        return {
            ...conversation
        };
    },
    fromFirestore (snapshot, options) {
        const data = snapshot.data(options);
        return {
            ...data
        };
    }
};


/***/ }),

/***/ 9396:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "w": () => (/* binding */ notificationConverter)
/* harmony export */ });
const notificationConverter = {
    toFirestore (notification) {
        return {
            ...notification
        };
    },
    fromFirestore (snapshot, options) {
        const { id  } = snapshot;
        const data = snapshot.data(options);
        return {
            id,
            ...data
        };
    }
};


/***/ }),

/***/ 2901:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ reportConverter)
/* harmony export */ });
const reportConverter = {
    toFirestore (report) {
        return {
            ...report
        };
    },
    fromFirestore (snapshot, options) {
        const { id  } = snapshot;
        const data = snapshot.data(options);
        return {
            id,
            ...data
        };
    }
};


/***/ }),

/***/ 7831:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ statsConverter)
/* harmony export */ });
const statsConverter = {
    toFirestore (bookmark) {
        return {
            ...bookmark
        };
    },
    fromFirestore (snapshot, options) {
        const data = snapshot.data(options);
        return {
            ...data
        };
    }
};


/***/ }),

/***/ 102:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ statusConverter),
/* harmony export */   "q": () => (/* binding */ isVideoMedia)
/* harmony export */ });
function isVideoMedia(media) {
    return media.kind === "video" || media.type?.includes("video") === true;
}
const statusConverter = {
    toFirestore (status) {
        return {
            ...status
        };
    },
    fromFirestore (snapshot, options) {
        const { id  } = snapshot;
        const data = snapshot.data(options);
        return {
            id,
            ...data
        };
    }
};


/***/ }),

/***/ 9144:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "d": () => (/* binding */ scheduledTweetConverter),
/* harmony export */   "f": () => (/* binding */ tweetConverter)
/* harmony export */ });
const scheduledTweetConverter = {
    toFirestore (scheduledTweet) {
        return {
            ...scheduledTweet
        };
    },
    fromFirestore (snapshot, options) {
        const { id  } = snapshot;
        return {
            id,
            ...snapshot.data(options)
        };
    }
};
const tweetConverter = {
    toFirestore (tweet) {
        return {
            ...tweet
        };
    },
    fromFirestore (snapshot, options) {
        const { id  } = snapshot;
        const data = snapshot.data(options);
        return {
            id,
            ...data
        };
    }
};


/***/ }),

/***/ 3771:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ userConverter)
/* harmony export */ });
const userConverter = {
    toFirestore (user) {
        return {
            ...user
        };
    },
    fromFirestore (snapshot, options) {
        const data = snapshot.data(options);
        return {
            ...data
        };
    }
};


/***/ })

};
;