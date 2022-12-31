interface SocketDetails {
  socketUrl: string;
  token: string;
}

declare interface RPC {
  getSocketDetails: (useCache?: boolean) => SocketDetails;
}
