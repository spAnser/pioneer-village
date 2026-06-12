import { addZone, onResourceInit } from '@lib/client';

import BankData from '../shared/data/bankData';
import { ZonePrefix } from './config';
import bankController from './controllers/bank-controller';
import { despawnTeller, spawnTeller } from './tellers';

const registerBankZones = async () => {
  for (const bank of BankData) {
    addZone({
      _type: 'poly',
      name: `${ZonePrefix}${bank.identifier}`,
      coords: bank.zones.interior,
      minZ: -50,
      maxZ: 999,
      options: { debug: false, delayExit: 2000 },
      async onEnter() {
        console.log(`[Banking] Entered ${bank.name}`);
        bankController.setCurrentBank(bank.identifier);
        await spawnTeller(bank.identifier);
      },
      onExit() {
        console.log(`[Banking] Exited ${bank.name}`);
        bankController.clearCurrentBank(bank.identifier);
        despawnTeller(bank.identifier);
      },
    });
  }
};

onResourceInit('zones', registerBankZones);
