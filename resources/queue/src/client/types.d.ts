declare namespace Queue {}

declare interface UIRPC {
  getSocketDetails: (useCache?: boolean) => SocketDetails;
}
