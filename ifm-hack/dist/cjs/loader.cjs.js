'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d93332d2.js');

/*
 Stencil Client Patch Esm v3.0.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["ifm-stories.cjs",[[1,"ifm-stories",{"first":[1],"middle":[1],"last":[1],"pokemons":[32],"pokemonCount":[32]}]]]], options);
  });
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map