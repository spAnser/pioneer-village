declare interface ClientExports {
  init: Init.ClientExports;
}

declare namespace Init {
  type ClientExports = {
    register: register;
    registerResource: registerResource;
    initialized: initialized;
    initializedResource: initializedResource;
    resolve: resolve;
    resolveResource: resolveResource;
    reject: reject;
    rejectResource: rejectResource;
  };
}
