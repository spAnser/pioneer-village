//
// char*
// const char*
// Any
// Any*
// Object
// Object*

type Blip = number;
type Cam = number;
type Entity = number;
type FireId = number;
type Interior = number;
type ItemSet = number;
type Ped = number;
type Pickup = number;
type Player = number;
type Vehicle = number;
type AnimScene = number;
type PersChar = number;
type PopZone = number;
type Prompt = number;
type PropSet = number;
type Volume = number;
type Hash = number | string;
type ScrHandle = [number, number];
type Vector3 = [number, number, number];

/** Additional Natives */
declare function SetTextCentre(align: boolean): void;

declare function SetTextDropshadow(distance: number, r: number, g: number, b: number, a: number): void;

declare function SetTextFontForCurrentCommand(fontId: number): void;

declare function SetTextScale(scale: number, size: number): void;
