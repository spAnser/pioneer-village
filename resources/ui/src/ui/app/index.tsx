import { createRoot } from 'react-dom/client';
import { Socket } from 'socket.io-client';

import { emitClient, onClient } from '@lib/ui';

import App from './app';
import BankingController from './controllers/banking';
import BaseController from './controllers/base';
import CarrierPigeonsController from './controllers/carrier-birds';
import CharacterSelectController from './controllers/character-select';
import DoorController from './controllers/doors';
import InteractController from './controllers/interact';
import InventoryController from './controllers/inventory';
import JobsController from './controllers/jobs';
import StableController from './controllers/stable';
import WeatherController from './controllers/weather';
import animationsStore from './stores/animations-store';
import bankingStore from './stores/banking-store';
import birdStore from './stores/bird-store';
import characterSelectStore from './stores/character-select-store';
import chatStore from './stores/chat-store';
import customizationStore from './stores/customization-store';
import doctorStore from './stores/doctor-store';
import formStore from './stores/form-store';
import hudStore from './stores/hud-store';
import interactStore from './stores/interact-store';
import inventoryStore from './stores/inventory-store';
import jobsStore from './stores/jobs-store';
import logStore from './stores/log-store';
import notificationStore from './stores/notification-store';
import targetStore from './stores/target-store';
import threejsStore from './stores/threejs-store';

export default (socket: Socket<UISocketEvents, SocketServer.Client & SocketServer.ClientEvents>) => {
  // Initialize all stores before rendering
  animationsStore.initialize(socket);
  bankingStore.initialize(socket);
  birdStore.initialize(socket);
  characterSelectStore.initialize(socket);
  chatStore.initialize(socket);
  customizationStore.initialize(socket);
  doctorStore.initialize(socket);
  formStore.initialize(socket);
  hudStore.initialize(socket);
  interactStore.initialize(socket);
  inventoryStore.initialize(socket);
  jobsStore.initialize(socket);
  logStore.initialize(socket);
  notificationStore.initialize(socket);
  targetStore.initialize(socket);
  threejsStore.initialize(socket);

  const root = createRoot(document.body);
  root.render(<App socket={socket} />);

  const restartUI = () => {
    window.location.reload();
  };

  onClient('nui.restart', () => {
    sessionStorage.clear();
    restartUI();
  });

  onClient('__socket__', (name, ...args) => {
    console.log('__socket__', name, ...args);
    // @ts-ignore
    socket.emit(name, ...args);
  });

  socket.on('__client__', (name, ...args) => {
    console.log('__client__', name, ...args);
    // @ts-ignore - Generic forwarding of socket events to client
    emitClient(name as keyof ClientIn.FromSocket, ...args);
  });

  CharacterSelectController(socket);
  DoorController(socket);
  InteractController(socket);
  InventoryController(socket);
  JobsController(socket);
  CarrierPigeonsController(socket);
  BankingController(socket);
  StableController(socket);
  WeatherController(socket);
  BaseController(socket);

  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept('./app', () => {
      console.log('Accepting the updated App module!');
      restartUI();
    });
  }

  emitClient('ui.ready');
};
