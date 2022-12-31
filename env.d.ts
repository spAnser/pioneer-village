declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONNECTION: string;
      DB_NAME: string;
      SOCKET_PORT: string;
      SOCKET_USER_CONNECTION: string;
      SOCKET_SERVER_CONNECTION: string;
      SOCKET_SERVER_KEY: string;
    }
  }
}

export {};
