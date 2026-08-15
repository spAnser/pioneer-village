import BankingController from './controllers/banking';
import JobsController from './controllers/jobs';
import PigeonController from './controllers/birds';
import CharacterController from './controllers/characters';
import ChatController from './controllers/chat';
import CronController from './controllers/cron';
import DoorController from './controllers/doors';
import InventoryController from './controllers/inventory';
import StableController from './controllers/stables';
import UserController from './controllers/user';
import WeatherController from './controllers/weather';
import WorldController from './controllers/world';
import './events';
import { seedDB } from './seed';
import server, { userAccessKey } from './server';

seedDB();

CronController();
UserController(userAccessKey);
CharacterController(userAccessKey);
ChatController();
DoorController();
InventoryController();
StableController();
WorldController();
PigeonController();
BankingController();
JobsController();
WeatherController();

server.listen(Number(process.env.SOCKET_PORT), () => {
  const serverAddress = server.address();
  if (typeof serverAddress === 'string') {
    console.log(`Server listening on ${serverAddress}`);
  } else if (serverAddress) {
    console.log(`Server listening on ${serverAddress.address}:${serverAddress.port}`);
  } else {
    console.log('Server listening');
  }
});
