import { p as promiseResolve, b as bootstrapLazy } from './index-9e432217.js';
export { s as setNonce } from './index-9e432217.js';

/*
 Stencil Client Patch Browser v3.0.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["ifm-stories",[[1,"ifm-stories",{"first":[1],"middle":[1],"last":[1],"pokemons":[32],"pokemonCount":[32]}]]]], options);
});

//# sourceMappingURL=ifm-hack.js.map