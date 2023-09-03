import { PVGame } from '@lib/client';
import { bindingTypes, dataContainers, dataTypes, listBindingTypes, rootBindingTypes, rootDataTypes } from '../data';
import { Delay } from '@lib/functions';
import { Log } from '@lib/client/comms/ui';

class DataManager {
  protected static instance: DataManager;

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  protected containers: Map<string, number> = new Map();
  protected bindings: Map<string, Record<string, number | Record<string, number>>> = new Map();

  loadContainer(container: string): number | undefined {
    if (this.containers.has(container)) {
      return this.containers.get(container);
    }

    const containerId = DatabindingAddDataContainerFromPath('', container);
    if (containerId) {
      this.containers.set(container, containerId);
    }
    return containerId;
  }

  getRootTypes(index: keyof Databindings.RootBindings): Databindings.RootBindingTypes[keyof Databindings.RootTypes] {
    return rootBindingTypes[rootDataTypes[index]];
  }

  getTypes(index: keyof Databindings.Bindings): Databindings.BindingTypes[keyof Databindings.Types] {
    return bindingTypes[dataTypes[index]];
  }

  getContainer(index: keyof Databindings.Bindings): string {
    return dataContainers[dataTypes[index]];
  }

  addDataBinding(
    _type: Databindings.BindingType,
    container: number,
    key: string,
    value: Record<string, any> | Record<string, any>[],
  ): number | Record<string, number | Record<string, number>> | Record<string, number>[] {
    switch (_type) {
      case 'bool':
        return DatabindingAddDataBool(container, key, false);
      case 'int':
        return DatabindingAddDataInt(container, key, 0);
      case 'float':
        return DatabindingAddDataFloat(container, key, 0);
      case 'string':
        return DatabindingAddDataString(container, key, '');
      case 'hash':
        return DatabindingAddDataHash(container, key, 0);
      case 'container':
        return this.addContainer(container, key, value);
      case 'container[]':
        return this.addContainerArray(container, key, value as Record<string, any>[]);
      case 'list':
        return this.addListItems(container, key, value);
      default:
        Log('Unknown type', _type);
        return 0;
    }
  }

  writeDataBinding(
    _type: Databindings.BindingType,
    container: number | Record<string, number> | Record<string, number>[],
    key: string,
    value: any,
  ) {
    switch (_type) {
      case 'bool':
        return DatabindingWriteDataBool(container as number, Boolean(value));
      case 'int':
        return DatabindingWriteDataInt(container as number, Number(value));
      case 'float':
        return DatabindingWriteDataFloat(container as number, Number(value));
      case 'string':
        return DatabindingWriteDataString(container as number, String(value));
      case 'hash':
        // @ts-ignore
        return DatabindingWriteDataHashString(container as number, value);
      case 'container':
        return this.bindContainer(key, container as Record<string, number>, value);
      case 'container[]':
        return this.bindContainerArray(key, container as Record<string, number>[], value);
      case 'list':
        // @ts-ignore
        return this.bindListItems(key, container as Record<string, number>, value);
      default:
        Log('Unknown type', _type);
    }
  }

  getRootBindings<T extends keyof Databindings.RootBindings>(
    index: T,
    data: Databindings.RootBindings[T],
  ): Record<string, number | Record<string, number>> | undefined {
    const types = this.getRootTypes(index);

    const containerId = this.loadContainer(index);
    if (!containerId) {
      return;
    }

    const binding: Record<string, number | Record<string, number>> = {};

    binding.container = containerId;

    for (const [key, _type] of Object.entries(types)) {
      const value = data[key as keyof Databindings.RootBindings[T]];
      if (value === undefined || value === null) {
        continue;
      }
      // @ts-ignore
      binding[key] = this.addDataBinding(_type, containerId, key, value);
    }

    this.bindings.set(index, binding);

    return binding;
  }

  async bindRootData<T extends keyof Databindings.RootBindings>(
    index: T,
    data: Databindings.RootBindings[T],
  ): Promise<void> {
    const types = this.getRootTypes(index);
    // Log('types', types);

    const binding = this.getRootBindings(index, data);
    if (!binding) {
      return;
    }

    for (const [key, _type] of Object.entries(types)) {
      const value = data[key as keyof Databindings.RootBindings[T]];
      if (value === undefined || value === null) {
        continue;
      }
      this.writeDataBinding(_type, binding[key], key, value);
    }

    this.bindings.set(index, binding);

    // if ('txd' in data) {
    //   await PVGame.requestTxd(data.txd);
    //   await PVGame.requestTxd('BOUNTY_HUNTER_EXPANSION');
    //   SetStreamedTxdAsNoLongerNeeded(data.txd);
    // }
  }

  getBindings<T extends keyof Databindings.Bindings>(
    index: T,
    container: string,
    data: Databindings.Bindings[T],
  ): Record<string, number | Record<string, number>> | undefined {
    const types = this.getTypes(index);

    const containerId = this.loadContainer(container);
    if (!containerId) {
      return;
    }

    const binding: Record<string, number | Record<string, number>> = {};

    binding.container = DatabindingAddDataContainer(containerId, index);
    DatabindingRemoveDataEntry(binding.container);
    binding.container = DatabindingAddDataContainer(containerId, index);

    for (const [key, _type] of Object.entries(types)) {
      const value = data[key as keyof Databindings.Bindings[T]];
      if (value === undefined || value === null) {
        continue;
      }
      // @ts-ignore
      binding[key] = this.addDataBinding(_type, binding.container, key, value);
    }

    this.bindings.set(index, binding);

    return binding;
  }

  async bindData<T extends keyof Databindings.Bindings>(index: T, data: Databindings.Bindings[T]): Promise<void> {
    const types = this.getTypes(index);
    // Log('types', types);

    const container = this.getContainer(index);
    const binding = this.getBindings(index, container, data);
    if (!binding) {
      return;
    }

    for (const [key, _type] of Object.entries(types)) {
      const value = data[key as keyof Databindings.Bindings[T]];
      if (value === undefined || value === null) {
        continue;
      }
      this.writeDataBinding(_type, binding[key], key, value);
    }

    this.bindings.set(index, binding);

    if ('txd' in data) {
      await PVGame.requestTxd(data.txd);
      await PVGame.requestTxd('BOUNTY_HUNTER_EXPANSION');
      SetStreamedTxdAsNoLongerNeeded(data.txd);
    }
  }

  addContainer(container: number, key: string, value: Record<string, any>): Record<string, number> {
    DatabindingRemoveDataEntry(DatabindingAddDataContainer(container, key));
    const subContainer = DatabindingAddDataContainer(container, key);
    const rtnValue: Record<string, number> = { container: subContainer };
    // Log('subContainer', subContainer);

    if (key.startsWith('textField')) {
      if (typeof value.text === 'string') {
        rtnValue.text = DatabindingAddDataString(subContainer, 'text', '');
      } else {
        rtnValue.text = DatabindingAddDataHash(subContainer, 'text', 0);
      }
      rtnValue.style = DatabindingAddDataInt(subContainer, 'style', 0);
    } else if (key.startsWith('divider')) {
      rtnValue.isVisible = DatabindingAddDataBool(subContainer, 'isVisible', false);
    } else if (key === 'price_details') {
      rtnValue.purchasePrice = DatabindingAddDataInt(subContainer, 'purchasePrice', 0);
      rtnValue.isGoldPrice = DatabindingAddDataBool(subContainer, 'isGoldPrice', false);
      rtnValue.modifiedPriceVisible = DatabindingAddDataBool(subContainer, 'modifiedPriceVisible', false);
      rtnValue.modifiedPriceGold = DatabindingAddDataBool(subContainer, 'modifiedPriceGold', false);
      rtnValue.purchaseModifiedPrice = DatabindingAddDataInt(subContainer, 'purchaseModifiedPrice', 0);
    } else if (key === 'Title') {
      rtnValue.Heading = DatabindingAddDataString(subContainer, 'Heading', '');
      rtnValue.HeadingColor = DatabindingAddDataInt(subContainer, 'HeadingColor', 0);
      rtnValue.Stat1 = DatabindingAddDataString(subContainer, 'Stat1', '');
      rtnValue.Stat1Color = DatabindingAddDataInt(subContainer, 'Stat1Color', 0);
      rtnValue.Stat2 = DatabindingAddDataString(subContainer, 'Stat2', '');
      rtnValue.Stat2Color = DatabindingAddDataInt(subContainer, 'Stat2Color', 0);
      rtnValue.Stat3 = DatabindingAddDataString(subContainer, 'Stat3', '');
      rtnValue.Stat3Color = DatabindingAddDataInt(subContainer, 'Stat3Color', 0);
    }
    return rtnValue;
  }

  bindContainer(key: string, binding: Record<string, number>, value: Record<string, any>): void {
    Log('bindContainer', key, binding, value);
    if (key.startsWith('textField')) {
      if (typeof value.text === 'string') {
        DatabindingWriteDataString(binding.text, value.text);
      } else {
        DatabindingWriteDataHashString(binding.text, value.text);
      }
      DatabindingWriteDataInt(binding.style, value.style);
    } else if (key.startsWith('divider')) {
      DatabindingWriteDataBool(binding.isVisible, value.isVisible);
    } else if (key === 'price_details') {
      DatabindingWriteDataInt(binding.purchasePrice, value.purchasePrice);
      DatabindingWriteDataBool(binding.isGoldPrice, value.isGoldPrice);
      DatabindingWriteDataBool(binding.modifiedPriceVisible, value.modifiedPriceVisible);
      DatabindingWriteDataBool(binding.modifiedPriceGold, value.modifiedPriceGold);
      DatabindingWriteDataInt(binding.purchaseModifiedPrice, value.purchaseModifiedPrice);
    } else if (key === 'Title') {
      Log(`DatabindingWriteDataString(${binding.Heading}, ${value.Heading});`);
      DatabindingWriteDataString(binding.Heading, value.Heading);
      DatabindingWriteDataInt(binding.HeadingColor, value.HeadingColor);
      DatabindingWriteDataString(binding.Stat1, value.Stat1);
      DatabindingWriteDataInt(binding.Stat1Color, value.Stat1Color);
      DatabindingWriteDataString(binding.Stat2, value.Stat2);
      DatabindingWriteDataInt(binding.Stat2Color, value.Stat2Color);
      DatabindingWriteDataString(binding.Stat3, value.Stat3);
      DatabindingWriteDataInt(binding.Stat3Color, value.Stat3Color);
    }
  }

  addListItems(
    container: number,
    key: string,
    data: Record<string, any>,
  ): Record<string, number | Record<string, number>> {
    // Log('addListItems', container, key, data);

    const types = listBindingTypes[key];

    const binding: Record<string, number | Record<string, number>> = {};

    // DatabindingRemoveDataEntry(DatabindingAddUiItemList(container, key));
    binding.container = DatabindingAddUiItemList(container, key);
    DatabindingClearBindingArray(binding.container);

    for (const [key, _type] of Object.entries(types)) {
      const value = data[key];
      if (value === undefined || value === null) {
        continue;
      }
      // @ts-ignore
      binding[key] = this.addDataBinding(_type, binding.container, key, value);
    }

    return binding;
  }

  bindListItems(key: string, binding: Record<string, number>, data: Record<string, any>): void {
    const types = listBindingTypes[key];

    for (const [key, _type] of Object.entries(types)) {
      const container = binding[key];
      const value = data[key];
      if (value === undefined || value === null) {
        continue;
      }
      this.writeDataBinding(_type, container, key, value);
    }
  }

  addContainerArray(container: number, key: string, data: Record<string, any>[]): Record<string, number>[] {
    // Log('addContainerArray', container, key, data);

    let rootContainer = container;
    if (key === 'LeaderboardListItem') {
      rootContainer = DatabindingAddDataContainerFromPath('', 'PostMatchAndLeaderboard');
    } else if (key === 'Fast_Travel_Location') {
      rootContainer = DatabindingAddDataContainerFromPath('', 'FastTravel');
    }

    const types = listBindingTypes[key];

    const bindings: Record<string, number>[] = [];

    for (const [index, dataValue] of data.entries()) {
      const binding: Record<string, number> = {};
      binding.container = DatabindingAddDataContainer(rootContainer, `${key}_${index}`);

      for (const [subKey, _type] of Object.entries(types)) {
        const value = dataValue[subKey];
        if (value === undefined || value === null) {
          continue;
        }
        // @ts-ignore
        binding[subKey] = this.addDataBinding(_type, binding.container, subKey, value);
      }

      let insertKey = key;
      if (key === 'Fast_Travel_Location') {
        insertKey = dataValue._type;
      }

      DatabindingInsertUiItemToListFromContextStringAlias(container, -1, insertKey, binding.container);
      bindings.push(binding);
    }

    return bindings;
  }

  bindContainerArray(key: string, binding: Record<string, number>[], data: Record<string, any>[]): void {
    // Log('bindContainerArray', key, binding);

    const types = listBindingTypes[key];

    for (const [index, dataValue] of binding.entries()) {
      const value = data[index];
      for (const [key, _type] of Object.entries(types)) {
        const container = dataValue[key];
        const itemValue = value[key];
        if (itemValue === undefined || itemValue === null) {
          continue;
        }
        this.writeDataBinding(_type, container, key, itemValue);
      }
    }
  }
}

const dataManager = DataManager.getInstance();

export default dataManager;

/**

     //     "SHOP_H_LOCKED",      10000,           0,           0,           0,           1
 int func_369(char* sParam0, int iParam1, int iParam2, int iParam3, int iParam4, int iParam5)
{
	struct<4> Var0;
	struct<2> Var13;
	int iVar15;

	Var0 = -2;
	Var0 = iParam1;
	Var0.f_1 = iParam2;
	Var0.f_2 = iParam3;
	Var0.f_3 = iParam4;
	Var13.f_1 = sParam0;
	iVar15 = UIFEED::_SHOW_TOOLTIP(&Var0, &Var13, iParam5);
	return iVar15;
}

 */
