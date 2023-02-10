import { p as promiseResolve, b as bootstrapLazy } from './index-9e432217.js';
export { s as setNonce } from './index-9e432217.js';

/*
 Stencil Client Patch Esm v3.0.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["ifm-stories",[[1,"ifm-stories",{"first":[1],"middle":[1],"last":[1],"pokemons":[32],"pokemonCount":[32]}]]]], options);
  });
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map