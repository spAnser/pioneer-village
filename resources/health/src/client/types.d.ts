declare namespace Health {}

declare interface UIEvents {
  ['doctor.state']: (event: UI.Doctor.Event) => void;
}

declare interface SocketForwardEvents {
  ['character-update.food-drink']: (food: number, water: number) => void;
  ['character-update.health-status']: (
    boneHealth: any[],
    boneStatus: any[],
    sick: boolean,
    activeTonic: boolean,
    health: number,
    stamina: number,
    litersOfBlood: number,
  ) => void;
}
