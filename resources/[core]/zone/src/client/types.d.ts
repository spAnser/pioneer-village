declare interface ClientExports {
  zone: Zone.ClientExports;
}

declare namespace Zone {
  type ClientExports = {};
}

// Set any events also in /socket/src/types.d.ts
declare interface UIRPC {}

declare interface UIEvents {}

declare interface ClientForwardEvents {}

declare interface SocketForwardEvents {}
