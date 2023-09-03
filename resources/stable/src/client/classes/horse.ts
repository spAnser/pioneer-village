import { Log } from '@lib/client/comms/ui';

export default class Horse {
  id: number;
  name: string;
  ownerId: number;
  stable: string | null;
  brandId: number | null;
  breeds: Record<Horse.Breed, number> | null;
  components: number[] | any;
  model: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  age: number;
  weight: number;
  food: number;
  water: number;
  health: number;
  cleanliness: number;
  neuteredFixed: boolean;
  statOffRoad: number;
  statHealth: number;
  statEndurance: number;
  statFertility: number;
  statHandling: number;
  statSpeed: number;
  statAcceleration: number;
  statBonding: Record<number, number>; // Record<CharacterId, Bonding>
  hooves: number;
  horseshoes: number;
  metadata: Record<string, any> | null;
  lastX: number;
  lastY: number;
  lastZ: number;
  createdAt: Date;

  constructor(data: Horse.Data) {
    this.id = data.id;
    this.name = data.name;
    this.ownerId = data.ownerId;
    this.stable = data.stable;
    this.brandId = data.brandId;
    this.breeds = data.breeds;
    this.components = data.components;
    this.model = data.model;
    this.gender = data.gender;
    this.age = data.age;
    this.weight = data.weight;
    this.food = data.food;
    this.water = data.water;
    this.health = data.health;
    this.cleanliness = data.cleanliness;
    this.neuteredFixed = data.neuteredFixed;
    this.statOffRoad = data.statOffRoad;
    this.statHealth = data.statHealth;
    this.statEndurance = data.statEndurance;
    this.statFertility = data.statFertility;
    this.statHandling = data.statHandling;
    this.statSpeed = data.statSpeed;
    this.statAcceleration = data.statAcceleration;
    this.statBonding = data.statBonding;
    this.hooves = data.hooves;
    this.horseshoes = data.horseshoes;
    this.metadata = data.metadata;
    this.lastX = data.lastX;
    this.lastY = data.lastY;
    this.lastZ = data.lastZ;
    this.createdAt = new Date(data.createdAt);
  }

  save() {
    Log(`Saving Horse: ${this.name}`);
  }
}
