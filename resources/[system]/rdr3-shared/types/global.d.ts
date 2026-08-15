/** Additional Natives */
declare function SetTextCentre(align: boolean): void;
declare function SetTextDropshadow(distance: number, r: number, g: number, b: number, a: number): void;
declare function SetTextFontForCurrentCommand(fontId: number): void;
declare function SetTextScale(scale: number, size: number): void;
declare function RemoveTexture(textureId: number): void;
declare function DoesTextureExist(textureId: number): boolean;
declare function DoorSystemGetActive(): any;
declare function DoorSystemGetSize(): number;
declare function GetGamePool(poolName: 'CPed' | 'CObject' | 'CNetObject' | 'CVehicle' | 'CPickup' | string): any;
declare function GetPlayerServerId(player: number): number;
declare function SetWeatherOwnedByNetwork(network: boolean): void;
