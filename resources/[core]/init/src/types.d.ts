declare namespace Init {
  type Options = {
    reset?: boolean;
    resolveAfter?: number;
    rejectAfter?: number;
  };

  type register = (name: string, options?: Init.Options) => void;
  type registerResource = (resourceName: string, options?: Init.Options) => void;
  type initialized = (name: string) => Promise<void> | undefined;
  type initializedResource = (resourceName: string) => Promise<void> | undefined;
  type resolve = (name: string) => void;
  type resolveResource = (resourceName: string) => void;
  type reject = (name: string) => void;
  type rejectResource = (resourceName: string) => void;
}

declare interface RPC {}
