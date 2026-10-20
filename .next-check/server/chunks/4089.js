"use strict";
exports.id = 4089;
exports.ids = [4089];
exports.modules = {

/***/ 4089:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ useInfiniteScroll)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6197);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1492);
/* harmony import */ var _components_ui_loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9570);
/* harmony import */ var _useCollection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3639);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, _useCollection__WEBPACK_IMPORTED_MODULE_5__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_2__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, _useCollection__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* eslint-disable react-hooks/exhaustive-deps */ 





function useInfiniteScroll(collection, queryConstraints, fetchOptions, options) {
    const { initialSize , stepSize , marginBottom  } = options ?? {};
    const { 0: tweetsLimit , 1: setTweetsLimit  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialSize ?? 20);
    const { 0: reachedLimit , 1: setReachedLimit  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: loadMoreInView , 1: setLoadMoreInView  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: loadingMore , 1: setLoadingMore  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    /* La limite courante est lue via une ref afin que la détection de fin de
     liste ne se relance pas quand la limite augmente (ce qui provoquerait un
     faux positif : l'ancien tableau reste affiché le temps du rechargement). */ const limitRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(tweetsLimit);
    const { data , loading , fromCache  } = (0,_useCollection__WEBPACK_IMPORTED_MODULE_5__/* .useCollection */ .K)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.query)(collection, ...[
        ...queryConstraints ?? [],
        (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.limit)(tweetsLimit)
    ]), fetchOptions);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        limitRef.current = tweetsLimit;
    }, [
        tweetsLimit
    ]);
    const dataCount = data?.length ?? 0;
    /* Détection de la fin de la liste SANS requête d'agrégation.
     On considère qu'il n'y a plus rien à charger quand la page reçue contient
     moins d'éléments que la limite demandée. L'ancien code utilisait
     `getCountFromServer` (runAggregationQuery) à chaque changement de la
     liste, ce qui recomptait toute la collection en boucle et épuisait le
     quota Firestore (erreur 429 « Quota exceeded »).

     On ne se fie QU'AUX instantanés venus du serveur : un instantané du
     cache local ne contient que les documents déjà connus, il est donc
     plus court que la limite demandée alors que la liste n'est pas
     terminée. L'utiliser faisait clignoter l'indicateur de chargement à
     chaque défilement (apparition/disparition d'un bloc de ~80 px), et
     relançait une requête supplémentaire par page chargée. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (loading || fromCache) return;
        if (!data) {
            setReachedLimit(true);
            setLoadingMore(false);
            return;
        }
        const hasMore = dataCount >= limitRef.current;
        setReachedLimit(!hasMore);
        if (!hasMore) setLoadingMore(false);
    }, [
        dataCount,
        data,
        loading,
        fromCache
    ]);
    /* Chargement de la page suivante.
     Deux garde-fous :
     - `dataCount < limitRef.current` : la page demandée n'est pas encore
       arrivée. Sans ce test, chaque réponse déclenchait une nouvelle
       requête, en boucle, et le fil se rechargeait tout seul.
     - `loadingMore` : on ne lance pas deux requêtes pour la même page. */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (reachedLimit) return;
        if (!loadMoreInView) return;
        if (loadingMore) return;
        if (dataCount === 0) return;
        if (dataCount < limitRef.current) return;
        setLoadingMore(true);
        setTweetsLimit((currentLimit)=>currentLimit + (stepSize ?? 20));
    }, [
        loadMoreInView,
        reachedLimit,
        loadingMore,
        dataCount
    ]);
    /* Quand la page arrive, on réarme le chargement si le témoin est encore
     à l'écran (le bas du fil n'est pas loin). */ (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!loadingMore) return;
        if (dataCount >= limitRef.current) setLoadingMore(false);
    }, [
        dataCount,
        loadingMore
    ]);
    const makeItInView = ()=>setLoadMoreInView(true);
    const makeItNotInView = ()=>setLoadMoreInView(false);
    /* Le témoin reste en place en permanence : il n'est JAMAIS retiré du
     flux (pas de `display: none`), sinon le contenu en dessous se décalait
     d'un coup à chaque page chargée. Quand la liste est complète, il
     s'efface simplement. */ const LoadMore = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
            className: "h-20",
            initial: false,
            animate: {
                opacity: reachedLimit ? 0 : 1
            },
            transition: {
                duration: 0.2
            },
            viewport: {
                margin: `0px 0px ${marginBottom ?? 1000}px`
            },
            onViewportEnter: makeItInView,
            onViewportLeave: makeItNotInView,
            "aria-hidden": "true",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: loadingMore ? "opacity-100 transition-opacity duration-200" : "opacity-0 transition-opacity duration-200",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_loading__WEBPACK_IMPORTED_MODULE_4__/* .Loading */ .g, {
                    className: "mt-5"
                })
            })
        }), [
        reachedLimit,
        loadingMore
    ]);
    return {
        data,
        loading,
        LoadMore
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;