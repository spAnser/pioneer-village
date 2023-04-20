export enum VegModifierFlag {
  Debris = 1,
  Grass = 2,
  Bush = 4,
  Weed = 8,
  Flower = 16,
  Sapling = 32,
  Tree = 64,
  Rock = 128,
  LongGrass = 256,
  All = Debris + Grass + Bush + Weed + Flower + Sapling + Tree + Rock + LongGrass,
}

export const VegModifierType = {
  Cull: 1,
  Flatten: 2,
  FlattenDeepSurface: 4,
  Explode: 8,
  Push: 16,
  Decal: 32,
};
