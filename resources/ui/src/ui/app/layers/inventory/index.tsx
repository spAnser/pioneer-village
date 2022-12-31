import { Socket } from 'socket.io-client';

import { emitClient, onClient, onClientCall } from '@lib/ui';
import UIComponent from '@uiLib/ui-component';

import PlaceholderSvg from '@styled/components/PlaceholderSvg';

import { InventoryContainer, InventoryWrapper, InventorySlot } from './styles';

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
      inventories: new Map(),
    };

    onClient('inventory.state', (event) => {
      this.onEvent(event);

      if (event.mainInventory) {
        context.socket.emit('inventorySubscribe', event.mainInventory);
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
    this.setState({
      show: false,
    });
  }

  useSlot(slot: number) {
    console.log('useSlot', slot);

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

  eventLoad(data: UI.Inventory.LoadData) {
    // console.log('inventoryLoad', data);
    const inventories = this.state.inventories;
    inventories.set(data.identifier, data);

    if (this.state.mainInventory === data.identifier) {
      emitClient('inventory.main-inventory', data);
    }
    this.setState({ inventories });
  }

  eventAdd(data: UI.Inventory.AddData) {
    console.log('inventoryAdd', data);

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
    }
  }

  eventMove(data: UI.Inventory.MoveData) {
    // console.log('inventoryMove', data);
    const { inventories } = this.state;
    const inventory = inventories.get(data.identifier);
    if (inventory) {
      for (const [slot, item] of Object.entries(data.items)) {
        inventory.items[slot] = item;
      }

      for (const slot of data.emptySlots) {
        delete inventory.items[slot];
      }

      // inventories.set(data.identifier, inventory);
      this.setState({ inventories });
    }
  }

  moveItem(oldSlot: number, newSlot: number) {
    if (oldSlot === newSlot) {
      return;
    }

    this.failedImages.delete(`${this.state.mainInventory}::${oldSlot}`);
    this.failedImages.delete(`${this.state.mainInventory}::${newSlot}`);

    /*
      TODO: Setup move request id to track success/failed moves
            to filter out an inventoryUpdate so it doesn't double move
            on the client that requested the move.
     */
    this.context.socket.emit('inventoryMove', 'character:1', oldSlot, 'character:1', newSlot);

    const { inventories } = this.state;
    const inventory = inventories.get(this.state.mainInventory);
    if (!inventory) {
      return;
    }
    const oldItem = inventory.items[oldSlot];
    const newItem = inventory.items[newSlot];

    if (oldItem) {
      inventory.items[newSlot] = oldItem;
    } else {
      delete inventory.items[newSlot];
    }

    if (newItem) {
      inventory.items[oldSlot] = newItem;
    } else {
      delete inventory.items[oldSlot];
    }

    this.setState({ inventories });
  }

  onmousedown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.dataset.hasItem) {
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
    if (targetEl?.dataset?.slot) {
      const oldSlot = Number(dragItem.dataset.slot);
      const newSlot = Number(targetEl.dataset.slot);
      this.moveItem(oldSlot, newSlot);
    } else {
      // TODO: Drop Item?
    }
    document.body.removeChild(dragItem);
    const draggedElements = document.getElementsByClassName('dragged-source');
    for (const element of draggedElements) {
      element.classList.remove('dragged-source');
    }
  }

  render() {
    const { mainInventory } = this.state;
    const inventories = Object.fromEntries(this.state.inventories.entries());

    return (
      this.state.show && (
        <InventoryContainer>
          {inventories[mainInventory] && (
            <InventoryWrapper>
              {new Array(48).fill(0).map((_, i) => (
                <InventorySlot
                  key={i}
                  onMousedown={this.onmousedown}
                  data-inventoryIdentifier={this.state.mainInventory}
                  data-slot={i}
                  data-has-item={!!inventories[mainInventory]?.items[i]}
                >
                  {inventories[mainInventory]?.items[i] ? (
                    <>
                      {!this.failedImages.has(`${mainInventory}::${i}`) && (
                        <img
                          src={`https://p--v.b-cdn.net/inventory/${
                            this.items[inventories[mainInventory].items[i].identifier]?.image
                          }.png`}
                          onError={(e) => {
                            this.failedImages.add(`${mainInventory}::${i}`);
                            this.forceUpdate();
                          }}
                        />
                      )}

                      {this.failedImages.has(`${mainInventory}::${i}`) && (
                        <PlaceholderSvg text={this.items[inventories[mainInventory].items[i].identifier]?.name} />
                      )}
                      <span className="quantity">x{inventories[mainInventory].items[i].quantity}</span>
                    </>
                  ) : null}
                </InventorySlot>
              ))}
            </InventoryWrapper>
          )}
        </InventoryContainer>
      )
    );
  }
}
