'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d93332d2.js');

/*
 Stencil Client Patch Browser v3.0.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('ifm-hack.cjs.js', document.baseURI).href));
    const opts = {};
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["ifm-stories.cjs",[[1,"ifm-stories",{"first":[1],"middle":[1],"last":[1],"pokemons":[32],"pokemonCount":[32]}]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=ifm-hack.cjs.js.map