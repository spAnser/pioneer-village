import { Socket } from 'socket.io-client';

import { emitClient, onClient, onClientCall } from '@lib/ui';
import UIComponent from '@uiLib/ui-component';

import PlaceholderSvg from '@styled/components/PlaceholderSvg';

import {
  MainInventoryContainer,
  TargetInventoryContainer,
  InventoryWrapper,
  InventorySlot,
  InventoryTooltip,
  InventoryFooter,
  InventoryHeader,
  InventoryGlobalStyle,
} from './styles';
import { boolval } from '@lib/functions';
import ProgressBar from '@styled/components/ProgressBar';
import { uiSize } from '@uiLib/helpers';
import theme from '@styled/theme';

const progressStyle = { position: 'absolute', left: 0, right: 0, overflow: 'hidden' };
const progressStyleTop = { ...progressStyle, top: 0, borderTopLeftRadius: uiSize(4), borderTopRightRadius: uiSize(4) };
const progressStyleBottom = {
  ...progressStyle,
  bottom: 0,
  borderBottomLeftRadius: uiSize(4),
  borderBottomRightRadius: uiSize(4),
};
const progressStyleWeight = { overflow: 'hidden', width: '100%', borderRadius: uiSize(4) };

export default class Inventories extends UIComponent<UI.BaseProps, UI.Inventory.State, {}> {
  closeOnEscape = true;

  items: Inventory.UIItems = {};

  failedImages = new Set<string>();

  mouseupBinding = this.onmouseup.bind(this);
  mousemoveBinding = this.onmousemove.bind(this);

  constructor(
    props: UI.BaseProps,
    context: { socket: Socket<UISocketEvents, SocketServer.Client & SocketServer.ClientEvents> },
  ) {
    super();

    this.state = {
      show: false,
      mainInventory: '',
      targetInventory: '',
      inventories: new Map(),
      inventoriesWeight: new Map(),
      tooltipItem: null,
      tooltipBelow: false,
      tooltipX: 0,
      tooltipY: 0,
    };

    onClient('inventory.state', (event) => {
      this.onEvent(event);

      if (event.mainInventory) {
        context.socket.emit('inventorySubscribe', event.mainInventory);
      }

      if (this.state.targetInventory && this.state.targetInventory !== event.targetInventory) {
        context.socket.emit('inventoryUnsubscribe', this.state.targetInventory);
      }

      if (event.targetInventory) {
        context.socket.emit('inventorySubscribe', event.targetInventory);
      }
    });

    onClient('inventory.items', (items) => {
      this.items = items;
    });

    onClient('inventory.use-slot', this.useSlot.bind(this));

    onClientCall('inventory.player-get-items', this.playerGetItems.bind(this));

    context.socket.on('inventoryLoad', this.eventLoad.bind(this));
    context.socket.on('inventoryAdd', this.eventAdd.bind(this));
    context.socket.on('inventoryMove', this.eventMove.bind(this));
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.mouseupBinding);
    document.addEventListener('mousemove', this.mousemoveBinding);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.mouseupBinding);
    document.removeEventListener('mousemove', this.mousemoveBinding);
  }

  onEvent(event: UI.Inventory.Event) {
    this.setState(event);
  }

  onEscape() {
    this.cancelDrag();
    this.setState({
      show: false,
    });
  }

  useSlot(slot: number) {
    console.log('[useSlot] slot', slot);

    const inventory = this.state.inventories.get(this.state.mainInventory);
    if (!inventory) {
      return;
    }
    const slotItem = inventory.items[slot];
    if (!slotItem) {
      return;
    }

    emitClient('inventory.use-item', slotItem);
  }

  playerGetItems(itemId: number): UI.Inventory.ItemData[] {
    const inventory = this.state.inventories.get(this.state.mainInventory);

    return Object.values(inventory?.items || []).filter((item) => item.identifier === itemId);
  }

  computeInventoryWeight() {
    const inventoriesWeight = this.state.inventoriesWeight;
    let updated = false;

    for (const [identifier, data] of this.state.inventories) {
      let weight = 0;
      for (const item of Object.values(data.items)) {
        const itemData = this.items[item.identifier];
        if (itemData && itemData.weight && item.quantity > 0) {
          weight += itemData.weight * item.quantity;
        }
      }
      if (weight !== inventoriesWeight.get(identifier)) {
        inventoriesWeight.set(data.identifier, weight / data.maxWeight);
        updated = true;
      }
    }
    if (updated) {
      this.setState({ inventoriesWeight });
    }
  }

  eventLoad(data: UI.Inventory.LoadData) {
    // console.log('[eventLoad] data', data);
    const inventories = this.state.inventories;
    inventories.set(data.identifier, data);

    if (this.state.mainInventory === data.identifier) {
      emitClient('inventory.main-inventory', data);
    }

    if (this.state.targetInventory === data.identifier) {
      emitClient('inventory.target-inventory', data);
    }
    this.setState({ inventories });
    this.computeInventoryWeight();
  }

  eventAdd(data: UI.Inventory.AddData) {
    console.log('[eventAdd] data', data);

    const { inventories } = this.state;
    const inventory = inventories.get(data.identifier);
    if (inventory) {
      for (const [slot, item] of Object.entries(data.items)) {
        if (inventory.items[slot]) {
          inventory.items[slot].ids.push(...item.ids);
          inventory.items[slot].metadatas.push(...item.metadatas);
          inventory.items[slot].quantity += item.quantity;
        } else {
          inventory.items[slot] = item;
        }
      }

      // inventories.set(data.identifier, inventory);
      this.setState({ inventories });
      this.computeInventoryWeight();
    }
  }

  eventMove(data: UI.Inventory.MoveData) {
    // console.log('[eventMove] data', data);

    const { inventories } = this.state;
    const inventory = inventories.get(data.identifier);
    if (inventory) {
      const dragItem = document.getElementById('drag-item');

      if (dragItem) {
        console.log('dragItem.dataset', dragItem.dataset);
        const dragItemSlot = Number(dragItem.dataset.slot);
        console.log('dragItem.dataset.inventoryIdentifier', dragItem.dataset.inventoryIdentifier);
        console.log('data.identifier', data.identifier);
        console.log('data.emptySlots.includes(dragItemSlot)', data.emptySlots.includes(dragItemSlot));
        console.log('data.emptySlots', data.emptySlots);
        console.log('dragItemSlot', dragItemSlot);
        if (dragItem.dataset.inventoryIdentifier === data.identifier && data.emptySlots.includes(dragItemSlot)) {
          this.cancelDrag();
        }
      }

      for (const [slot, item] of Object.entries(data.items)) {
        inventory.items[slot] = item;
      }

      for (const slot of data.emptySlots) {
        delete inventory.items[slot];
      }

      // inventories.set(data.identifier, inventory);
      this.setState({ inventories });
      this.computeInventoryWeight();
    }
  }

  stackItem(sourceIdentifier: string, oldSlot: number, targetIdentifier: string, newSlot: number) {
    if (sourceIdentifier === targetIdentifier && oldSlot === newSlot) {
      return;
    }

    this.failedImages.delete(`${sourceIdentifier}::${oldSlot}`);
    this.failedImages.delete(`${targetIdentifier}::${newSlot}`);

    this.context.socket.emit('inventoryStack', sourceIdentifier, oldSlot, targetIdentifier, newSlot);

    const { inventories } = this.state;
    const sourceInventory = inventories.get(sourceIdentifier);
    const targetInventory = inventories.get(targetIdentifier);
    if (!sourceInventory || !targetInventory) {
      return;
    }
    const oldItem = sourceInventory.items[oldSlot];
    const newItem = targetInventory.items[newSlot];

    if (oldItem.identifier !== newItem.identifier) {
      return;
    }

    const itemData = this.items[oldItem.identifier];

    if (oldItem.quantity + newItem.quantity <= itemData.stackSize) {
      newItem.ids.push(...oldItem.ids);
      newItem.metadatas.push(...oldItem.metadatas);
      newItem.quantity += oldItem.quantity;
      delete sourceInventory.items[oldSlot];
    } else {
      const diff = itemData.stackSize - newItem.quantity;
      newItem.ids.push(...oldItem.ids.slice(0, diff));
      newItem.metadatas.push(...oldItem.metadatas.slice(0, diff));
      newItem.quantity += diff;
      oldItem.ids = oldItem.ids.slice(diff);
      oldItem.metadatas = oldItem.metadatas.slice(diff);
      oldItem.quantity -= diff;
    }

    this.setState({ inventories });
  }

  moveItem(sourceIdentifier: string, oldSlot: number, targetIdentifier: string, newSlot: number) {
    if (sourceIdentifier === targetIdentifier && oldSlot === newSlot) {
      return;
    }

    this.failedImages.delete(`${sourceIdentifier}::${oldSlot}`);
    this.failedImages.delete(`${targetIdentifier}::${newSlot}`);

    /*
      TODO: Setup move request id to track success/failed moves
            to filter out an inventoryUpdate so it doesn't double move
            on the client that requested the move.

            Not sure if this is needed I'm not seeing the requests being doubled up.
     */
    this.context.socket.emit('inventoryMove', sourceIdentifier, oldSlot, targetIdentifier, newSlot);

    const { inventories } = this.state;
    const sourceInventory = inventories.get(sourceIdentifier);
    const targetInventory = inventories.get(targetIdentifier);
    if (!sourceInventory || !targetInventory) {
      return;
    }
    const oldItem = sourceInventory.items[oldSlot];
    const newItem = targetInventory.items[newSlot];

    if (oldItem) {
      targetInventory.items[newSlot] = oldItem;
    } else {
      delete targetInventory.items[newSlot];
    }

    if (newItem) {
      sourceInventory.items[oldSlot] = newItem;
    } else {
      delete sourceInventory.items[oldSlot];
    }

    this.setState({ inventories });
    this.computeInventoryWeight();
  }

  onmousedown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!boolval(target.dataset.hasItem)) {
      return;
    }
    const dragItem = target.cloneNode(true) as HTMLElement;
    target.classList.add('dragged-source');
    dragItem.classList.add('dragged-item');
    dragItem.id = 'drag-item';
    dragItem.style.position = 'fixed';
    dragItem.style.zIndex = '1000';
    dragItem.style.pointerEvents = 'none';
    const rect = target.getBoundingClientRect();
    dragItem.style.width = `${rect.width}px`;
    dragItem.style.height = `${rect.height}px`;
    dragItem.style.left = `${e.clientX}px`;
    dragItem.style.top = `${e.clientY}px`;
    dragItem.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(dragItem);
  }

  onmousemove(e: MouseEvent) {
    const dragItem = document.getElementById('drag-item');
    if (!dragItem) {
      return;
    }
    dragItem.style.left = `${e.clientX}px`;
    dragItem.style.top = `${e.clientY}px`;
  }

  onmouseup(e: MouseEvent) {
    const dragItem = document.getElementById('drag-item');
    if (!dragItem) {
      return;
    }
    const targetEl = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
    if (!targetEl) {
      return;
    }

    if (dragItem.dataset.inventoryIdentifier && targetEl?.dataset?.inventoryIdentifier && targetEl?.dataset?.slot) {
      // console.log('[onmouseup] dragItem.dataset', dragItem.dataset);
      const oldSlot = Number(dragItem.dataset.slot);
      const newSlot = Number(targetEl.dataset.slot);

      const { inventories } = this.state;
      const sourceInventory = inventories.get(dragItem.dataset.inventoryIdentifier);
      const targetInventory = inventories.get(targetEl.dataset.inventoryIdentifier);

      // Check if Source Item Still Exists
      if (sourceInventory?.items[oldSlot]?.identifier) {
        // Check if Target is same and stack or move
        if (sourceInventory?.items[oldSlot]?.identifier === targetInventory?.items[newSlot]?.identifier) {
          this.stackItem(dragItem.dataset.inventoryIdentifier, oldSlot, targetEl.dataset.inventoryIdentifier, newSlot);
        } else {
          this.moveItem(dragItem.dataset.inventoryIdentifier, oldSlot, targetEl.dataset.inventoryIdentifier, newSlot);
        }
      }
    } else {
      // TODO: Drop Item on Ground
    }
    document.body.removeChild(dragItem);
    const draggedElements = document.getElementsByClassName('dragged-source');
    for (const element of draggedElements) {
      element.classList.remove('dragged-source');
    }
  }

  cancelDrag() {
    const dragItem = document.getElementById('drag-item');
    if (!dragItem) {
      return;
    }
    document.body.removeChild(dragItem);
    const draggedElements = document.getElementsByClassName('dragged-source');
    for (const element of draggedElements) {
      element.classList.remove('dragged-source');
    }
  }

  onmouseenter(e: MouseEvent) {
    const dragItem = document.getElementById('drag-item');
    if (dragItem) {
      return;
    }
    const target = e.target as HTMLElement;
    if (!boolval(target.dataset.hasItem)) {
      return;
    }
    const slot = Number(target.dataset.slot);
    const inventoryIdentifier = target.dataset.inventoryIdentifier;
    if (!inventoryIdentifier) {
      return;
    }
    const { inventories } = this.state;
    const inventory = inventories.get(inventoryIdentifier);
    if (!inventory) {
      return;
    }
    const item = inventory.items[slot];
    if (!item) {
      return;
    }
    const rect = target.getBoundingClientRect();
    this.setState({
      tooltipItem: item,
      tooltipBelow: rect.y < window.innerHeight / 2,
      tooltipX: rect.x,
      tooltipY: rect.y,
    });
  }

  onmouseleave() {
    this.setState({ tooltipItem: null });
  }

  renderItem(itemData: UI.Inventory.ItemData, i: number, identifier: string, inventory: UI.Inventory.LoadData) {
    const item = this.items[itemData.identifier];

    // console.log('[renderItem] itemData', itemData);
    // console.log('[renderItem] item', item);

    return (
      <>
        {/*{itemData.durability <= 0 && (*/}
        {/*  <InventorySlotBackground style={{ backgroundColor: `rgba(${theme.colors.red.rgb}, 0.15)` }} />*/}
        {/*)}*/}

        {!this.failedImages.has(`${identifier}::${i}`) && (
          <img
            src={`https://p--v.b-cdn.net/inventory/${item?.image}.png`}
            onError={(e) => {
              this.failedImages.add(`${identifier}::${i}`);
              // this.forceUpdate();
            }}
          />
        )}

        {this.failedImages.has(`${identifier}::${i}`) && <PlaceholderSvg text={item?.name} />}
        <span className="weight">{item?.weight * itemData.quantity}</span>
        <span className="quantity">x{itemData.quantity}</span>
        <div style={progressStyleTop}>
          <ProgressBar
            progress={itemData.durability}
            source="left"
            color={itemData.durability > 0.6 ? 'green' : itemData.durability > 0.2 ? 'orange' : 'red'}
            backgroundColor="transparent"
            height={uiSize(2)}
            width="100%"
          />
        </div>
      </>
    );
  }

  renderSlot(i: number, identifier: string, inventory: UI.Inventory.LoadData) {
    return (
      <InventorySlot
        key={i}
        onMouseEnter={this.onmouseenter.bind(this)}
        onMouseLeave={this.onmouseleave.bind(this)}
        onMousedown={this.onmousedown}
        data-inventory-identifier={identifier}
        data-slot={i}
        data-has-item={!!inventory.items[i]}
        data-broken={inventory.items[i]?.durability <= 0}
      >
        {inventory.items[i] && this.renderItem(inventory.items[i], i, identifier, inventory)}
      </InventorySlot>
    );
  }

  renderInventory(identifier: string, inventory: UI.Inventory.LoadData) {
    const weight = this.state.inventoriesWeight.get(identifier) || 0;
    const InventoryDetails = this.state.mainInventory === identifier ? InventoryHeader : InventoryFooter;
    const InventoryStats = this.state.mainInventory === identifier ? InventoryFooter : InventoryHeader;
    return (
      <>
        <InventoryDetails>
          <div style={progressStyleWeight}>
            <ProgressBar
              progress={weight}
              source="left"
              color={weight > 1 ? 'red' : 'gray75'}
              height={uiSize(3)}
              width="100%"
            />
          </div>
          {/*<div>*/}
          {/*  {Math.round(weight * inventory.maxWeight)} / {inventory.maxWeight}*/}
          {/*</div>*/}
        </InventoryDetails>
        <InventoryStats>
          <code>{identifier}</code>
        </InventoryStats>
        <InventoryWrapper>
          {new Array(inventory.slots).fill(0).map((_, i) => this.renderSlot(i, identifier, inventory))}
        </InventoryWrapper>
      </>
    );
  }

  renderTooltip() {
    const itemData = this.state.tooltipItem;
    if (!itemData) {
      return null;
    }
    const item = this.items[itemData.identifier];
    if (!item) {
      return null;
    }
    return (
      <InventoryTooltip
        className={this.state.tooltipBelow ? 'below' : 'above'}
        style={{ top: this.state.tooltipY, left: this.state.tooltipX }}
      >
        <h1>{item.name}</h1>
        {item.description && <p>{item.description}</p>}
        <ul>
          <li>These</li>
          <li>Are</li>
          <li>Tags</li>
        </ul>
      </InventoryTooltip>
    );
  }

  rowsColumns(inventory: UI.Inventory.LoadData) {
    if (!inventory?.slots) {
      return;
    }
    if (inventory.slots < 8) {
      return `rows--1 columns--${inventory.slots}`;
    }
    if (inventory.slots <= 3 * 8) {
      return `rows--${Math.ceil(inventory.slots / 8)}`;
    }
  }

  render() {
    const { mainInventory, targetInventory } = this.state;
    const inventories = Object.fromEntries(this.state.inventories.entries());

    return (
      this.state.show && (
        <>
          <InventoryGlobalStyle />
          {this.state.tooltipItem && this.renderTooltip()}
          {this.state.targetInventory && (
            <TargetInventoryContainer className={this.rowsColumns(inventories[targetInventory])}>
              {inventories[targetInventory] && this.renderInventory(targetInventory, inventories[targetInventory])}
            </TargetInventoryContainer>
          )}
          <MainInventoryContainer>
            {inventories[mainInventory] && this.renderInventory(mainInventory, inventories[mainInventory])}
          </MainInventoryContainer>
        </>
      )
    );
  }
}
