import { Socket } from 'socket.io-client';

import { onClientCall } from '@lib/ui';

export default (socket: Socket<SocketIO.Events, SocketIn.FromClient & SocketOut.ToClient>) => {
  type socketForward = keyof SocketIn.FromClient;

  const forwards: socketForward[] = [
    'banking.get-accounts',
    'banking.get-cash-on-hand',
    'banking.deposit',
    'banking.withdraw',
    'banking.wire-transfer',
    'banking.collect-transfers',
    'banking.take-loan',
    'banking.repay-loan',
    'banking.get-loans',
    'banking.rent-safety-box',
    'banking.get-safety-box',
    'banking.get-transactions',
    'banking.get-mineral-prices',
    'banking.sell-minerals',
  ];

  for (const forward of forwards) {
    // console.log(`[Banking][diag] registering onClientCall forward: ${forward}`);
    // @ts-ignore
    onClientCall(forward, (...args) => {
      return new Promise((resolve) => {
        // @ts-ignore
        socket.emit(forward, ...args, (data) => {
          resolve(data);
        });
      });
    });
  }
  // console.log('[Banking][diag] BankingController forward registration complete');
};
