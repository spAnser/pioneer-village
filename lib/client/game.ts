const zoneSetup = (zone: Zone.SphereData | Zone.BoxData | Zone.PolyData, zoneData: Record<string, any>) => {
  exports.plouffe_lib.Register(zoneData);

  if (zone.onEnter) {
    on(`${zone.name}:enter`, zone.onEnter);
  }

  if (zone.onExit) {
    on(`${zone.name}:exit`, zone.onExit);
  }
};

export const zoneSphereSetup = (zone: Zone.SphereData) => {
  const zoneData = {
    name: zone.name,
    coords: zone.coords,
    maxDst: zone.radius,
    isZone: true,
    zoneMap: {
      inEvent: `${zone.name}:enter`,
      outEvent: `${zone.name}:exit`,
    },
  };
  zoneSetup(zone, zoneData);
};

export const zoneBoxSetup = (zone: Zone.BoxData) => {
  let xTotal = 0;
  let yTotal = 0;

  for (const coord of zone.coords) {
    xTotal += coord.x;
    yTotal += coord.y;
  }
  const xAverage = xTotal / 4;
  const yAverage = yTotal / 4;

  const zoneData = {
    name: zone.name,
    coords: { x: xAverage, y: yAverage, z: zone.minZ },
    maxZ: zone.maxZ - zone.minZ,
    minZ: 0,
    box: zone.coords,
    isZone: true,
    zoneMap: {
      inEvent: `${zone.name}:enter`,
      outEvent: `${zone.name}:exit`,
    },
  };

  zoneSetup(zone, zoneData);
};

export const zonePolySetup = (zone: Zone.PolyData) => {
  let xTotal = 0;
  let yTotal = 0;

  for (const coord of zone.coords) {
    xTotal += coord.x;
    yTotal += coord.y;
  }
  const xAverage = xTotal / 4;
  const yAverage = yTotal / 4;

  const zoneData = {
    name: zone.name,
    coords: { x: xAverage, y: yAverage, z: zone.minZ },
    maxZ: zone.maxZ - zone.minZ,
    minZ: 0,
    box: zone.coords,
    isZone: true,
    zoneMap: {
      inEvent: `${zone.name}:enter`,
      outEvent: `${zone.name}:exit`,
    },
  };

  zoneSetup(zone, zoneData);
};
