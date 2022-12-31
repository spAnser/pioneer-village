import Doors from './data/doors';

setInterval(() => {
  if (NetworkGetSessionHost() === PlayerId()) {
    for (const doorData in Doors) {
      const [doorHash, modelHash, modelName, x, y, z] = doorData;
      const doorEntity = GetEntityByDoorhash(doorHash);
      if (!IsDoorRegisteredWithSystem(doorData[0])) {
        // print('Register Door', doorHash)
        AddDoorToSystemNew(doorData[0], true, true, false, 0, 0, false);
      }
    }
  }
}, 30e3);
