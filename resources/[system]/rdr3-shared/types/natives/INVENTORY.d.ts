/**
   * INVENTORY_COPY_MP_INVENTORY_TO_MISSION_INVENTORY
   *
   * @param {boolean} p0
   * @param {boolean} p1
   * @param {boolean} bCopySatchelItems
   * @param {boolean} bCopyEmotes
   * @param {boolean} bCopyHorse
   * @param {boolean} p5
   * @return {void}
   */
declare function InventoryCopyMpInventoryToMissionInventory(p0: boolean, p1: boolean, bCopySatchelItems: boolean, bCopyEmotes: boolean, bCopyHorse: boolean, p5: boolean): void;

/**
   * INVENTORY_DISABLE_MISSION_INVENTORY_PICKUPS
   *
  
   * @return {void}
   */
declare function InventoryDisableMissionInventoryPickups(): void;

/**
   * INVENTORY_GET_CHILDREN_IN_SLOT_COUNT
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @param {number} slotId
   * @return {number}
   */
declare function InventoryGetChildrenInSlotCount(inventoryId: number, guid: DataView, slotId: Hash): number;

/**
   * INVENTORY_GET_GUID_FROM_ITEMID
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @param {number} p2
   * @param {number} slotId
   * @param {DataView} outGuid
   * @return {boolean}
   */
declare function InventoryGetGuidFromItemid(inventoryId: number, guid: DataView, p2: Hash, slotId: Hash, outGuid: DataView): boolean;

/**
   * INVENTORY_GET_INVENTORY_ITEM
   *
   * @param {number} inventoryId
   * @param {DataView} inData
   * @param {DataView} outData
   * @param {boolean} p3
   * @return {boolean}
   */
declare function InventoryGetInventoryItem(inventoryId: number, inData: DataView, outData: DataView, p3: boolean): boolean;

/**
   * _0x0349404A22736740
   * Params: p0 is only 0 or 1
   * Only used in R* SP Scripts
   *
   * @param {boolean} p0
   * @param {number} inventoryId
   * @param {DataView} guid
   * @return {void}
   */
declare function N_0x0349404A22736740(p0: boolean, inventoryId: number, guid: DataView): void;

/**
   * _0x112BCA290D2EB53C
   * Only used in R* SP Scripts
   *
   * @param {number} inventoryId
   * @param {number} p1
   * @return {[boolean, number, number, number, number, number, number]}
   */
declare function N_0x112BCA290D2EB53C(inventoryId: number, p1: Hash): [boolean, number, number, number, number, number, number];

/**
   * _INVENTORY_USE_SATCHEL_ITEM
   * eInventoryItem: CLOTHING_FANCY_SUIT, CLOTHING_GUNSLINGER_OUTFIT, etc.
   * Only used in R* SP Scripts
   *
   * @param {number} inventoryId
   * @param {number} eInventoryItem
   * @param {boolean} p2
   * @return {void}
   */
declare function InventoryUseSatchelItem(inventoryId: number, eInventoryItem: Hash, p2: boolean): void;

/**
   * _0x46DB71883EE9D5AF
   * Returns databindingEntryId to be used with 0x951847CEF3D829FF (p0)
   *
   * @param {any} data
   * @param {string | number} stats
   * @param {DataView} guid
   * @param {number} ped
   * @return {number}
   */
declare function N_0x46DB71883EE9D5AF(data: any, stats: string | number, guid: DataView, ped: Ped): number;

/**
   * _INVENTORY_REMOVE_INVENTORY_ITEMS
   * removeReason: REMOVE_REASON_DEFAULT (eRemoveItemReason)
   * Example: INVENTORY::_0x5D6182F3BCE1333B(1, joaat("REMOVE_REASON_DEFAULT")); -> clears weapon wheel
   * Only used in R* SP Scripts
   *
   * @param {number} inventoryId
   * @param {number} removeReason
   * @return {boolean}
   */
declare function InventoryRemoveInventoryItems(inventoryId: number, removeReason: Hash): boolean;

/**
   * _0x6862E4D93F64CF01
   * Only used in R* SP Scripts
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @param {number} p2
   * @param {DataView} p3
   * @return {boolean}
   */
declare function N_0x6862E4D93F64CF01(inventoryId: number, guid: DataView, p2: Hash, p3: DataView): boolean;

/**
   * _0x6968CE7AC32F6788
   * Only used in R* SP Scripts
   *
   * @param {number} inventoryId
   * @return {void}
   */
declare function N_0x6968CE7AC32F6788(inventoryId: number): void;

/**
   * _INVENTORY_APPLY_WEAPON_STATS_TO_ENTRY
   * Apply the weapon stats to the CatalogItemInspection stats entry id. get entryId with _INVENTORY_GET_CATALOG_ITEM_INSPECTION_STATS_ENTRY
   *
   * @param {number} entryId
   * @param {number} weapon
   * @param {number} ped
   * @return {void}
   */
declare function InventoryApplyWeaponStatsToEntry(entryId: number, weapon: Hash, ped: Ped): void;

/**
   * _0x75CFAC49301E134F
   * p1, p2: 0
   *
   * @param {number} databindingEntryId
   * @param {boolean} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function N_0x75CFAC49301E134F(databindingEntryId: Hash, p1: boolean, p2: boolean): void;

/**
   * _0x951847CEF3D829FF
   * p0: value returned by 0x46DB71883EE9D5AF
   *
   * @param {any} p0
   * @param {DataView} outGuid
   * @param {number} ped
   * @return {void}
   */
declare function N_0x951847CEF3D829FF(p0: any, outGuid: DataView, ped: Ped): void;

/**
   * _0x9AC53CB6907B4428
   * p1 (out) and p2 (in) are both script arrays?
   * item: can be a component item, see SHOP_CATALOG_BUILD_LIST_OF_WEAPON_COMPONENTS
   *
   * @param {number} item
   * @param {DataView} p1
   * @param {DataView} p2
   * @return {boolean}
   */
declare function N_0x9AC53CB6907B4428(item: Hash, p1: DataView, p2: DataView): boolean;

/**
   * _0x9B4E793B1CB6550A
   * Used in function SET_SHOP_BEING_ROBBED and many other shop related scripts and functions.
   * INVENTORY_A*
   *
  
   * @return {void}
   */
declare function N_0x9B4E793B1CB6550A(): void;

/**
   * _INVENTORY_GET_CATALOG_ITEM_INSPECTION_EFFECTS_ENTRY
   * Returns effects entry id of CatalogItemInspection container.
   *
   * @param {number} entryId
   * @param {string | number} name
   * @param {boolean} unk1
   * @param {boolean} unk2
   * @return {number}
   */
declare function InventoryGetCatalogItemInspectionEffectsEntry(entryId: number, name: string | number, unk1: boolean, unk2: boolean): number;

/**
   * _INVENTORY_GET_CATALOG_ITEM_INSPECTION_STATS_ENTRY
   * Returns stats entry id of CatalogItemInspection container
   *
   * @param {number} entryId
   * @param {string | number} name
   * @param {number} unk1
   * @param {number} playerid
   * @return {number}
   */
declare function InventoryGetCatalogItemInspectionStatsEntry(entryId: number, name: string | number, unk1: number, playerid: Player): number;

/**
   * _0x9E58207B194488AC
   *
   * @param {number} ped
   * @param {number} p1
   * @return {void}
   */
declare function N_0x9E58207B194488AC(ped: Ped, p1: number): void;

/**
   * _0xB1DD74A1F5536622
   *
   * @param {number} inventoryId
   * @param {DataView} itemGuid
   * @return {boolean}
   */
declare function N_0xB1DD74A1F5536622(inventoryId: number, itemGUID: DataView): boolean;

/**
   * _0xD08685BA892DBFAB
   * Params: p3 returns an int between 0 and 20 (?)
   * Only used in R* SP Scripts
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @return {[boolean, number, number]}
   */
declare function N_0xD08685BA892DBFAB(inventoryId: number, guid: DataView): [boolean, number, number];

/**
   * _0xE1F45A67A9F0DCBC
   * Only used in R* SP Scripts
   *
   * @param {number} inventoryId
   * @return {void}
   */
declare function N_0xE1F45A67A9F0DCBC(inventoryId: number): void;

/**
   * _INVENTORY_USE_BACKUP_INVENTORY
   * Only used in R* SP Scripts
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function InventoryUseBackupInventory(p0: boolean): void;

/**
   * _GET_DEFAULT_ITEM_SLOT_INFO
   * p1: WARDROBE, KIT_CAMP, CHARACTER, KIT_MOONSHINER_PROPERTY
   * Returns slot hash
   *
   * @param {number} item
   * @param {number} p1
   * @return {number}
   */
declare function GetDefaultItemSlotInfo(item: Hash, p1: Hash): number;

/**
   * _GET_ITEM_ROLE_MAX_LEVEL_COUNT
   *
   * @param {number} inventoryId
   * @param {number} eRoleMaxLevel
   * @return {number}
   */
declare function GetItemRoleMaxLevelCount(inventoryId: number, eRoleMaxLevel: Hash): number;

/**
   * _GET_ITEM_SLOT_MAX_COUNT
   *
   * @param {number} provision
   * @param {number} slotId
   * @return {number}
   */
declare function GetItemSlotMaxCount(provision: Hash, slotId: Hash): number;

/**
   * _INVENTORY_ADD_ITEM_WITH_GUID
   * inventoryItemSlotHash: https://pastebin.com/P6fyr3vr
   *
   * @param {number} inventoryId
   * @param {DataView} guid1
   * @param {DataView} guid2
   * @param {number} item
   * @param {number} inventoryItemSlot
   * @param {number} p5
   * @param {number} addReason
   * @return {boolean}
   */
declare function InventoryAddItemWithGuid(inventoryId: number, guid1: DataView, guid2: DataView, item: Hash, inventoryItemSlot: Hash, p5: number, addReason: Hash): boolean;

/**
   * _INVENTORY_ARE_LOCAL_CHANGES_ALLOWED
   * inventoryId: see _INVENTORY_GET_PED_INVENTORY_ID
   *
   * @param {number} inventoryId
   * @return {boolean}
   */
declare function InventoryAreLocalChangesAllowed(inventoryId: number): boolean;

/**
   * _INVENTORY_COMPARE_GUIDS
   *
   * @param {DataView} guid1
   * @param {DataView} guid2
   * @return {boolean}
   */
declare function InventoryCompareGuids(guid1: DataView, guid2: DataView): boolean;

/**
   * _INVENTORY_COPY_ITEM_TO_INVENTORY
   *
   * @param {number} inventoryId
   * @param {number} inventoryIdCloned
   * @param {DataView} p2
   * @param {any} p3
   * @return {void}
   */
declare function InventoryCopyItemToInventory(inventoryId: number, inventoryIdCloned: number, p2: DataView, p3: any): void;

/**
   * _INVENTORY_COPY_ITEM_TO_MISSION_INVENTORY
   *
   * @param {DataView} guid
   * @param {boolean} p1
   * @return {void}
   */
declare function InventoryCopyItemToMissionInventory(guid: DataView, p1: boolean): void;

/**
   * _INVENTORY_CREATE_ITEM_COLLECTION
   * filterName (collections): "ALL", "ALL SATCHEL", "ALL HORSES", "ALL COACHES", "ALL MOUNTS", "ALL CLOTHING", "ALL WEAPONS", "ALL SATCHEL EXCLUDING CLOTHING", "ALL EXCLUDING CLOTHING"
   * slotId: -1591664384
   * p3: outCollectionSize (?)
   * Returns collectionId
   *
   * @param {number} inventoryId
   * @param {string | number} filterName
   * @param {number} slotId
   * @return {[number, number]}
   */
declare function InventoryCreateItemCollection(inventoryId: number, filterName: string | number, slotId: Hash): [number, number];

/**
   * _INVENTORY_CREATE_ITEM_COLLECTION_2
   * Returns collectionId
   *
  
   * @return {[number, number]}
   */
declare function InventoryCreateItemCollection_2(): [number, number];

/**
   * _INVENTORY_CREATE_ITEM_COLLECTION_WITH_FILTER
   *
   * @param {number} inventoryId
   * @param {DataView} filter
   * @return {[number, number]}
   */
declare function InventoryCreateItemCollectionWithFilter(inventoryId: number, filter: DataView): [number, number];

/**
   * _INVENTORY_CREATE_SORTED_COLLECTION
   * p1: 32
   * Returns collectionId
   *
   * @param {number} inventoryId
   * @param {number} p1
   * @return {[number, number]}
   */
declare function InventoryCreateSortedCollection(inventoryId: number, p1: number): [number, number];

/**
   * _INVENTORY_DISABLE_ITEM
   * Example: (1, WEAPON_REVOLVER_CATTLEMAN, 0) - disables cattleman revolver on weapon wheel
   *
   * @param {number} inventoryId
   * @param {number} item
   * @param {number} gtxReason
   * @return {void}
   */
declare function InventoryDisableItem(inventoryId: number, item: Hash, gtxReason: Hash): void;

/**
   * _INVENTORY_DISABLE_WEAPONS
   * Params: p1 = 0
   *
   * @param {number} inventoryId
   * @param {any} p1
   * @return {void}
   */
declare function InventoryDisableWeapons(inventoryId: number, p1: any): void;

/**
   * _INVENTORY_DOES_ITEM_OWN_EQUIPMENT
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @param {number} item
   * @return {boolean}
   */
declare function InventoryDoesItemOwnEquipment(inventoryId: number, guid: DataView, item: Hash): boolean;

/**
   * _INVENTORY_ENABLE_ITEM
   *
   * @param {number} inventoryId
   * @param {number} item
   * @return {void}
   */
declare function InventoryEnableItem(inventoryId: number, item: Hash): void;

/**
   * _INVENTORY_ENABLE_WEAPONS
   *
   * @param {number} inventoryId
   * @return {void}
   */
declare function InventoryEnableWeapons(inventoryId: number): void;

/**
   * _INVENTORY_EQUIP_ITEM_WITH_GUID
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @param {boolean} bEquipped
   * @return {boolean}
   */
declare function InventoryEquipItemWithGuid(inventoryId: number, guid: DataView, bEquipped: boolean): boolean;

/**
   * _INVENTORY_FITS_SLOT_ID
   *
   * @param {number} item
   * @param {number} slotId
   * @return {boolean}
   */
declare function InventoryFitsSlotId(item: Hash, slotId: Hash): boolean;

/**
   * _INVENTORY_GET_CHILDREN_COUNT
   *
   * @param {number} inventoryId
   * @param {DataView} parentGuid
   * @return {number}
   */
declare function InventoryGetChildrenCount(inventoryId: number, parentGuid: DataView): number;

/**
   * _INVENTORY_GET_FULL_INVENTORY_ITEM_DATA
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @param {DataView} p2
   * @param {number} p3
   * @param {number} p4
   * @return {boolean}
   */
declare function InventoryGetFullInventoryItemData(inventoryId: number, guid: DataView, p2: DataView, p3: number, p4: number): boolean;

/**
   * _INVENTORY_GET_INVENTORY_ID_FROM_PED
   * Returns a unique inventory ID for this ped.
   * For the local player ped, it is an eInventories value.
   * For other peds, it is the inventory address casted to unsigned int.
   * 
   * enum eInventories
   * {
   *   INVENTORY_INVALID,
   *   INVENTORY_SP_PLAYER,
   *   INVENTORY_MP_PLAYER,
   *   INVENTORY_MP_MISSION,
   *   INVENTORY_SECOND_SCREEN,
   *   INVENTORY_SP_BACKUP,
   *   INVENTORY_SP_SNAPSHOT,
   *   INVENTORY_0xDE2AE452,
   *   INVENTORY_0x399D9B3A,
   *   INVENTORY_0x4BD43FA7,
   *   INVENTORY_0x9529D251,
   *   INVENTORY_0xA75776AC,
   *   INVENTORY_MAX_ID = 11,
   *   INVENTORY_IDS_COUNT
   * };
   *
   * @param {number} ped
   * @return {number}
   */
declare function InventoryGetInventoryIdFromPed(ped: Ped): number;

/**
   * _INVENTORY_GET_INVENTORY_ITEM_CHILD
   *
   * @param {number} inventoryId
   * @param {DataView} parentGuid
   * @param {any} childIndex
   * @param {DataView} outInventoryItem
   * @return {boolean}
   */
declare function InventoryGetInventoryItemChild(inventoryId: number, parentGuid: DataView, childIndex: any, outInventoryItem: DataView): boolean;

/**
   * _INVENTORY_GET_INVENTORY_ITEM_COUNT_WITH_GUID
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @param {boolean} p2
   * @return {number}
   */
declare function InventoryGetInventoryItemCountWithGuid(inventoryId: number, guid: DataView, p2: boolean): number;

/**
   * _INVENTORY_GET_INVENTORY_ITEM_COUNT_WITH_ITEMID
   *
   * @param {number} inventoryId
   * @param {number} eInventoryItem
   * @param {boolean} p2
   * @return {number}
   */
declare function InventoryGetInventoryItemCountWithItemid(inventoryId: number, eInventoryItem: Hash, p2: boolean): number;

/**
   * _INVENTORY_GET_INVENTORY_ITEM_DESCRIPTION_HASH
   *
   * @param {number} item
   * @return {number}
   */
declare function InventoryGetInventoryItemDescriptionHash(item: Hash): number;

/**
   * _INVENTORY_GET_INVENTORY_ITEM_EQUIPPED_IN_SLOT
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @param {number} slotId
   * @param {number} p3
   * @param {DataView} p4
   * @return {number}
   */
declare function InventoryGetInventoryItemEquippedInSlot(inventoryId: number, guid: DataView, slotId: Hash, p3: number, p4: DataView): number;

/**
   * _INVENTORY_GET_INVENTORY_ITEM_EQUIPPED_IN_SLOT_BY_REF
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @param {number} slotId
   * @param {DataView} outGuid
   * @return {boolean}
   */
declare function InventoryGetInventoryItemEquippedInSlotByRef(inventoryId: number, guid: DataView, slotId: Hash, outGuid: DataView): boolean;

/**
   * _INVENTORY_GET_INVENTORY_ITEM_FIT_SLOT
   *
   * @param {number} p0
   * @param {DataView} p1
   * @param {number} p2
   * @return {boolean}
   */
declare function InventoryGetInventoryItemFitSlot(p0: Hash, p1: DataView, p2: number): boolean;

/**
   * _INVENTORY_GET_INVENTORY_ITEM_HIDDEN
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @return {boolean}
   */
declare function InventoryGetInventoryItemHidden(inventoryId: number, guid: DataView): boolean;

/**
   * _INVENTORY_GET_INVENTORY_ITEM_INSPECTION_INFO
   *
   * @param {number} item
   * @param {DataView} info
   * @return {boolean}
   */
declare function InventoryGetInventoryItemInspectionInfo(item: Hash, info: DataView): boolean;

/**
   * _INVENTORY_GET_INVENTORY_ITEM_IN_USE
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @return {boolean}
   */
declare function InventoryGetInventoryItemInUse(inventoryId: number, guid: DataView): boolean;

/**
   * _INVENTORY_GET_INVENTORY_ITEM_IS_ANIMAL_PELT
   *
   * @param {number} item
   * @return {boolean}
   */
declare function InventoryGetInventoryItemIsAnimalPelt(item: Hash): boolean;

/**
   * _INVENTORY_GET_INVENTORY_ITEM_SOUND
   * soundType: see 0x2BAE4880DCDD560B
   * Returns item Hash to be used with _IS_SCRIPTED_AUDIO_CUSTOM and _PLAY_SOUND_FROM_ITEM (p0)
   *
   * @param {number} item
   * @param {number} soundType
   * @return {number}
   */
declare function InventoryGetInventoryItemSound(item: Hash, soundType: number): number;

/**
   * _INVENTORY_GET_INVENTORY_ITEM_WEAPON_COPY_ID
   * Returns CopyID
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @return {number}
   */
declare function InventoryGetInventoryItemWeaponCopyId(inventoryId: number, guid: DataView): number;

/**
   * _INVENTORY_GET_IS_INVENTORY_ITEM_SOUND_VALID
   * soundType: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/CItemInfoSoundsInterface__sSoundsInfo__eSoundType
   *
   * @param {number} item
   * @param {number} soundType
   * @return {boolean}
   */
declare function InventoryGetIsInventoryItemSoundValid(item: Hash, soundType: number): boolean;

/**
   * _INVENTORY_GET_ITEM_EXPIRY_TIME
   *
   * @param {DataView} itemGuid
   * @return {number}
   */
declare function InventoryGetItemExpiryTime(itemGUID: DataView): number;

/**
   * _INVENTORY_GET_ITEM_FROM_COLLECTION_INDEX
   * collectionId is < outCollectionSize
   *
   * @param {number} collectionId
   * @param {number} itemIndex
   * @param {DataView} itemData
   * @return {boolean}
   */
declare function InventoryGetItemFromCollectionIndex(collectionId: number, itemIndex: number, itemData: DataView): boolean;

/**
   * _INVENTORY_IS_GUID_VALID
   *
   * @param {DataView} guid
   * @return {boolean}
   */
declare function InventoryIsGuidValid(guid: DataView): boolean;

/**
   * _INVENTORY_IS_INVENTORY_ITEM_EQUIPPED
   * Alternative Name: _INVENTORY_IS_ITEM_DISABLED
   *
   * @param {number} inventoryId
   * @param {number} item
   * @param {boolean} p2
   * @return {boolean}
   */
declare function InventoryIsInventoryItemEquipped(inventoryId: number, item: Hash, p2: boolean): boolean;

/**
   * _INVENTORY_IS_INVENTORY_ITEM_FLAG_ENABLED
   * flag: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/ItemDatabaseItemFlags
   * 2097152 (is item read?), 8388608 (is item sent/received/mailable?), 16777216 (is item consumable?)
   *
   * @param {number} item
   * @param {number} flag
   * @return {boolean}
   */
declare function InventoryIsInventoryItemFlagEnabled(item: Hash, flag: number): boolean;

/**
   * _INVENTORY_IS_ITEM_EXPIRED
   *
   * @param {DataView} itemGuid
   * @return {boolean}
   */
declare function InventoryIsItemExpired(itemGUID: DataView): boolean;

/**
   * _INVENTORY_IS_PLAYER_INVENTORY_MIRRORING_TRANSACTIONS
   *
  
   * @return {boolean}
   */
declare function InventoryIsPlayerInventoryMirroringTransactions(): boolean;

/**
   * _INVENTORY_MOVE_INVENTORY_ITEM
   * guid1: old parent GUID
   * guid2: new parent GUID
   * guid3: new item GUID (out param)
   *
   * @param {number} inventoryId
   * @param {DataView} guid1
   * @param {DataView} guid2
   * @param {number} slotId
   * @param {number} quantity
   * @param {DataView} outGuid
   * @return {boolean}
   */
declare function InventoryMoveInventoryItem(inventoryId: number, guid1: DataView, guid2: DataView, slotId: Hash, quantity: number, outGuid: DataView): boolean;

/**
   * _INVENTORY_RELEASE_ITEM_COLLECTION
   * Max num of collections is 5, so release your unused ones.
   *
   * @param {number} collectionId
   * @return {boolean}
   */
declare function InventoryReleaseItemCollection(collectionId: number): boolean;

/**
   * _INVENTORY_REMOVE_INVENTORY_ITEM_WITH_GUID
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @param {number} quantity
   * @param {number} removeReason
   * @return {boolean}
   */
declare function InventoryRemoveInventoryItemWithGuid(inventoryId: number, guid: DataView, quantity: number, removeReason: Hash): boolean;

/**
   * _INVENTORY_REMOVE_INVENTORY_ITEM_WITH_ITEMID
   *
   * @param {number} inventoryId
   * @param {number} item
   * @param {number} quantity
   * @param {number} removeReason
   * @return {boolean}
   */
declare function InventoryRemoveInventoryItemWithItemid(inventoryId: number, item: Hash, quantity: number, removeReason: Hash): boolean;

/**
   * _INVENTORY_SET_INVENTORY_ITEM_HIDDEN
   * Used with CClothingItem
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @param {boolean} hidden
   * @return {void}
   */
declare function InventorySetInventoryItemHidden(inventoryId: number, guid: DataView, hidden: boolean): void;

/**
   * _INVENTORY_SET_INVENTORY_ITEM_HIDDEN_2
   * Used with CSatchelItem, R* Script usage: fisihing_core
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @param {boolean} hidden
   * @return {void}
   */
declare function InventorySetInventoryItemHidden_2(inventoryId: number, guid: DataView, hidden: boolean): void;

/**
   * _INVENTORY_SET_INVENTORY_ITEM_INSPECTION_ENABLED
   *
   * @param {number} inventoryId
   * @param {DataView} p1
   * @param {boolean} enabled
   * @return {boolean}
   */
declare function InventorySetInventoryItemInspectionEnabled(inventoryId: number, p1: DataView, enabled: boolean): boolean;

/**
   * _INVENTORY_SET_INVENTORY_ITEM_IN_USE
   * Only works on CClothingItem
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @param {boolean} inUse
   * @return {void}
   */
declare function InventorySetInventoryItemInUse(inventoryId: number, guid: DataView, inUse: boolean): void;

/**
   * _INVENTORY_SET_INVENTORY_ITEM_WEATHER_EFFECTIVENESS
   * OWE_INVALID = -1,
   * OWE_GOOD_IN_HOT
   * OWE_GOOD_IN_NONE
   * OWE_GOOD_IN_COLD
   * OWE_GOOD_IN_ALL
   *
   * @param {number} inventoryId
   * @param {DataView} guid
   * @param {number} weatherEffectiveness
   * @return {void}
   */
declare function InventorySetInventoryItemWeatherEffectiveness(inventoryId: number, guid: DataView, weatherEffectiveness: number): void;

/**
   * _INVENTORY_SWAP_INVENTORY_ITEM
   *
   * @param {number} inventoryId
   * @param {DataView} guid1
   * @param {DataView} guid2
   * @return {boolean}
   */
declare function InventorySwapInventoryItem(inventoryId: number, guid1: DataView, guid2: DataView): boolean;

/**
   * _INVENTORY_UPDATE_INVENTORY_ITEM
   * Getter: _INVENTORY_GET_FULL_INVENTORY_ITEM_DATA
   *
   * @param {number} inventoryId
   * @param {DataView} guid1
   * @param {DataView} guid2
   * @param {number} p3
   * @return {boolean}
   */
declare function InventoryUpdateInventoryItem(inventoryId: number, guid1: DataView, guid2: DataView, p3: number): boolean;

/**
   * _INVENTORY_USE_MISSION_INVENTORY
   *
   * @param {boolean} enable
   * @param {boolean} mirrorTransactions
   * @return {void}
   */
declare function InventoryUseMissionInventory(enable: boolean, mirrorTransactions: boolean): void;

/**
   * _INVENTORY_IS_USING_BACKUP_INVENTORY
   * old name _INVENTORY_USE_SP_BACKUP
   *
  
   * @return {boolean}
   */
declare function InventoryIsUsingBackupInventory(): boolean;

/**
   * _SET_CARRIABLE_CARRY_ACTION_PROMPT_OVERRIDE
   *
   * @param {DataView} data
   * @return {void}
   */
declare function SetCarriableCarryActionPromptOverride(data: DataView): void;

/**
   * _SET_ITEM_PROMPT_INFO_REQUEST
   *
   * @param {DataView} p0
   * @return {void}
   */
declare function SetItemPromptInfoRequest(p0: DataView): void;

/**
   * _SET_USE_MISSION_INVENTORY
   * This native has no functionality.
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetUseMissionInventory(toggle: boolean): void;