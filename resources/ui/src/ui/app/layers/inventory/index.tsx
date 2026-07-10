import { type FC, type MouseEventHandler, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { boolval } from '@lib/functions';
import { getWearableStateOptions } from '@lib/shared/wearable-states';

import ItemThumbnail from '@styled/components/ItemThumbnail';
import ProgressBar from '@styled/components/ProgressBar';
import TimesSvg from '@styled/fa5/solid/times.svg';

import { cloneElement, uiSize } from '@uiLib/helpers';

import { useEscapeKey } from '../../hooks/use-game-events';
import birdStore from '../../stores/bird-store';
import inventoryStore from '../../stores/inventory-store';
import styles from './styles.module.scss';

const progressStyle = { position: 'absolute' as const, left: 0, right: 0, overflow: 'hidden' as const };
const progressStyleTop = { ...progressStyle, top: 0, borderTopLeftRadius: uiSize(4), borderTopRightRadius: uiSize(4) };
const progressStyleBottom = {
  ...progressStyle,
  bottom: 0,
  borderBottomLeftRadius: uiSize(4),
  borderBottomRightRadius: uiSize(4),
};
const progressStyleWeight = { overflow: 'hidden' as const, width: '100%', borderRadius: uiSize(4) };

const itsThumbScale = 1;

const GRID_LAYOUTS: Record<number, string> = {
  1: 'grid-1',
  2: 'grid-2',
  3: 'grid-3',
  4: 'grid-4',
  5: 'grid-5',
  6: 'grid-6',
  8: 'grid-8',
  10: 'grid-10',
  12: 'grid-12',
  16: 'grid-16',
  24: 'grid-24',
  32: 'grid-32',
  48: 'grid-48',
  64: 'grid-64',
};

interface ContextMenuState {
  x: number;
  y: number;
  slot: number;
  inventoryIdentifier: string;
}

interface SplitPopupState {
  x: number;
  y: number;
  slot: number;
  inventoryIdentifier: string;
  maxQuantity: number;
}

const Inventories: FC<UI.BaseProps> = () => {
  // Use store state
  const [state, setState] = useState(inventoryStore.getState());

  // Context menu state
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // Split popup state
  const [splitPopup, setSplitPopup] = useState<SplitPopupState | null>(null);
  const [splitValue, setSplitValue] = useState<number>(1);
  const splitPopupRef = useRef<HTMLDivElement>(null);

  // Local failed images tracking like the original
  const failedImages = useRef(new Set<string>());

  // Bird store state
  const [birdState, setBirdState] = useState(birdStore.getState());

  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = inventoryStore.subscribe(setState);
    return unsubscribe;
  }, []);

  // Subscribe to bird store updates
  useEffect(() => {
    const unsubscribe = birdStore.subscribe(setBirdState);
    return unsubscribe;
  }, []);

  // Get items from store
  const items = inventoryStore.getItems();
  const drawableMap = inventoryStore.getDrawableMap();

  const cancelDrag = useCallback<() => void>(() => {
    const dragItem = document.getElementById('drag-item');
    if (!dragItem) {
      return;
    }
    document.body.removeChild(dragItem);
    const draggedElements = document.getElementsByClassName(styles.draggedSource);
    for (const element of draggedElements) {
      element.classList.remove(styles.draggedSource);
    }
  }, []);

  const onEscape = useCallback<() => void>(() => {
    if (splitPopup) {
      setSplitPopup(null);
    }
    if (contextMenu) {
      setContextMenu(null);
    }
    cancelDrag();
    inventoryStore.closeInventory();
  }, [cancelDrag, contextMenu, splitPopup]);

  useEscapeKey(state.show, onEscape);

  const onmousedown = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      setContextMenu(null);
      setSplitPopup(null);
      if (e.button !== 0) return;
      const target = e.currentTarget;
      if (!boolval(target.dataset.hasItem)) {
        return;
      }

      const slot = Number(target.dataset.slot);
      const inventoryIdentifier = target.dataset.inventoryIdentifier;
      if (!inventoryIdentifier) return;

      // Shift+click: quick transfer between inventories
      if (e.shiftKey && state.targetInventory) {
        const isInTarget = inventoryIdentifier === state.targetInventory;
        const destinationIdentifier = isInTarget ? state.mainInventory : state.targetInventory;
        const sourceInventory = state.inventories.get(inventoryIdentifier);
        const destInventory = state.inventories.get(destinationIdentifier);
        const sourceItem = sourceInventory?.items[slot];

        if (sourceItem && destInventory) {
          const itemDef = items[sourceItem.identifier];
          let stackSlot: number | undefined;
          if (itemDef && itemDef.stackSize > 1) {
            for (let s = 0; s < destInventory.slots; s++) {
              const destItem = destInventory.items[s];
              if (destItem && destItem.identifier === sourceItem.identifier && destItem.quantity < itemDef.stackSize) {
                stackSlot = s;
                break;
              }
            }
          }

          if (stackSlot !== undefined) {
            inventoryStore.stackItem(inventoryIdentifier, slot, destinationIdentifier, stackSlot);
          } else {
            inventoryStore.moveItem(inventoryIdentifier, slot, destinationIdentifier);
          }
        }
        return;
      }

      // Start drag
      const dragItem = cloneElement(target, true);
      target.classList.add(styles.draggedSource);
      dragItem.classList.add(styles.draggedItem);
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

      // Ctrl+drag: split in half
      if (e.ctrlKey) {
        const inventory = state.inventories.get(inventoryIdentifier);
        if (inventory) {
          const itemData = inventory.items[slot];
          if (itemData && itemData.quantity > 1) {
            const splitQuantity = Math.ceil(itemData.quantity / 2);
            dragItem.dataset.splitQuantity = String(splitQuantity);
            const quantitySpan = dragItem.querySelector(`.${styles.quantity}`);
            if (quantitySpan) {
              quantitySpan.textContent = `x${splitQuantity}`;
            }
          }
        }
      }

      document.body.appendChild(dragItem);
    },
    [state.targetInventory, state.mainInventory, state.inventories],
  );

  const onmousemove = useCallback<(e: MouseEvent) => void>((e) => {
    const dragItem = document.getElementById('drag-item');
    if (!dragItem) {
      return;
    }
    dragItem.style.left = `${e.clientX}px`;
    dragItem.style.top = `${e.clientY}px`;

    const targetEl = document.elementFromPoint(e.clientX, e.clientY);
    if (targetEl instanceof HTMLElement && targetEl?.dataset?.inventoryIdentifier) {
      dragItem.classList.remove(styles.willDrop);
    } else {
      dragItem.classList.add(styles.willDrop);
    }
  }, []);

  const onmouseup = useCallback<(e: MouseEvent) => void>(
    (e) => {
      const dragItem = document.getElementById('drag-item');
      if (!dragItem) {
        return;
      }
      const targetEl = document.elementFromPoint(e.clientX, e.clientY);
      if (!(targetEl instanceof HTMLElement)) {
        return;
      }
      if (!targetEl) {
        return;
      }

      if (dragItem.dataset.inventoryIdentifier && targetEl?.dataset?.inventoryIdentifier && targetEl?.dataset?.slot) {
        const oldSlot = Number(dragItem.dataset.slot);
        const newSlot = Number(targetEl.dataset.slot);

        const sourceInventory = state.inventories.get(dragItem.dataset.inventoryIdentifier);
        const targetInventory = state.inventories.get(targetEl.dataset.inventoryIdentifier);

        // Check if Source Item Still Exists
        if (sourceInventory?.items[oldSlot]?.identifier) {
          const itemData = items[sourceInventory.items[oldSlot].identifier];

          // Clear failed images for the slots being affected
          failedImages.current.delete(`${dragItem.dataset.inventoryIdentifier}::${oldSlot}`);
          failedImages.current.delete(`${targetEl.dataset.inventoryIdentifier}::${newSlot}`);

          const splitQuantity = dragItem.dataset.splitQuantity ? Number(dragItem.dataset.splitQuantity) : undefined;

          // Check if target slot has a container item — drop inside it
          const targetSlotItem = targetInventory?.items[newSlot];
          if (targetSlotItem && targetSlotItem.identifier !== sourceInventory.items[oldSlot].identifier) {
            const targetItemDef = items[targetSlotItem.identifier];
            const sourceItemDef = items[sourceInventory.items[oldSlot].identifier];
            if (
              targetItemDef?.containerType &&
              sourceItemDef?.containerType !== targetItemDef.containerType &&
              sourceItemDef?.restriction !== undefined &&
              targetItemDef.containerRestrictions !== undefined &&
              (targetItemDef.containerRestrictions === 0 ||
                targetItemDef.containerRestrictions & sourceItemDef.restriction)
            ) {
              const containerIdentifier = `${targetItemDef.containerType}:${targetSlotItem.ids[0]}`;
              inventoryStore.moveItem(
                dragItem.dataset.inventoryIdentifier,
                oldSlot,
                containerIdentifier,
                undefined,
                true,
                splitQuantity,
              );
              cancelDrag();
              return;
            }
          }

          // Check if Target is same and stack or move
          if (
            sourceInventory.items[oldSlot].identifier === targetInventory?.items[newSlot]?.identifier &&
            itemData.stackSize > 1
          ) {
            inventoryStore.stackItem(
              dragItem.dataset.inventoryIdentifier,
              oldSlot,
              targetEl.dataset.inventoryIdentifier,
              newSlot,
            );
          } else {
            inventoryStore.moveItem(
              dragItem.dataset.inventoryIdentifier,
              oldSlot,
              targetEl.dataset.inventoryIdentifier,
              newSlot,
              false,
              splitQuantity,
            );
          }
        }
      } else if (dragItem.dataset.inventoryIdentifier && !targetEl?.dataset?.inventoryIdentifier) {
        inventoryStore.dropItem(dragItem.dataset.inventoryIdentifier, Number(dragItem.dataset.slot));
      }

      cancelDrag();
    },
    [state.inventories, items, cancelDrag],
  );

  const onmouseenter = useCallback<React.MouseEventHandler<HTMLElement>>(
    (e) => {
      const dragItem = document.getElementById('drag-item');
      if (dragItem) {
        return;
      }
      const target = e.currentTarget;
      if (!boolval(target.dataset.hasItem)) {
        return;
      }
      const slot = Number(target.dataset.slot);
      const inventoryIdentifier = target.dataset.inventoryIdentifier;
      if (!inventoryIdentifier) {
        return;
      }
      const inventory = state.inventories.get(inventoryIdentifier);
      if (!inventory) {
        return;
      }
      const item = inventory.items[slot];
      if (!item) {
        return;
      }
      const rect = target.getBoundingClientRect();
      inventoryStore.setTooltip(item, rect.y < window.innerHeight / 2, rect.x, rect.y);
    },
    [state.inventories],
  );

  const onmouseleave = useCallback<() => void>(() => {
    inventoryStore.setTooltip(null);
  }, []);

  const oncontextmenu = useCallback<MouseEventHandler<HTMLElement>>((e) => {
    e.preventDefault();
    const target = e.currentTarget;
    if (!boolval(target.dataset.hasItem)) {
      return;
    }
    const slot = Number(target.dataset.slot);
    const inventoryIdentifier = target.dataset.inventoryIdentifier;
    if (!inventoryIdentifier) {
      return;
    }
    inventoryStore.setTooltip(null);
    const x = Math.min(e.clientX, window.innerWidth - 160);
    const y = Math.min(e.clientY, window.innerHeight - 120);
    setContextMenu({ x, y, slot, inventoryIdentifier });
  }, []);

  const handleBirdSend = useCallback<(birdId: number) => void>(
    (birdId) => {
      const birdInventory = state.inventories.get(`bird:${birdId}`);
      if (!birdInventory) {
        return;
      }
      const letterItem = Object.values(birdInventory.items)[0];
      if (!letterItem) {
        return;
      }
      birdStore.sendBird(birdId, 50);
    },
    [state.inventories],
  );

  const handleContextMenuAction = useCallback<(action: string) => void>(
    (action) => {
      if (!contextMenu) return;
      const { inventoryIdentifier, slot } = contextMenu;

      switch (action) {
        case 'use':
          inventoryStore.useItemInSlot(inventoryIdentifier, slot);
          break;
        case 'open':
          inventoryStore.openContainer(inventoryIdentifier, slot);
          break;
        case 'drop':
          inventoryStore.dropItem(inventoryIdentifier, slot);
          break;
        case 'take':
          inventoryStore.moveItem(inventoryIdentifier, slot, state.mainInventory);
          break;
        case 'split': {
          const inventory = state.inventories.get(inventoryIdentifier);
          if (inventory) {
            const slotItem = inventory.items[slot];
            if (slotItem && slotItem.quantity > 1) {
              setSplitPopup({
                x: contextMenu.x,
                y: contextMenu.y,
                slot,
                inventoryIdentifier,
                maxQuantity: slotItem.quantity,
              });
              setSplitValue(Math.floor(slotItem.quantity / 2));
            }
          }
          break;
        }
      }

      setContextMenu(null);
    },
    [contextMenu, state.mainInventory, state.inventories],
  );

  // Close context menu on outside click
  useEffect(() => {
    if (!contextMenu) return;

    const handleOutsideClick = (e: MouseEvent): void => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [contextMenu]);

  // Close split popup on outside click
  useEffect(() => {
    if (!splitPopup) return;

    const handleOutsideClick = (e: MouseEvent): void => {
      if (splitPopupRef.current && !splitPopupRef.current.contains(e.target as Node)) {
        setSplitPopup(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [splitPopup]);

  const handleSplitConfirm = useCallback<() => void>(() => {
    if (!splitPopup) return;
    inventoryStore.moveItem(
      splitPopup.inventoryIdentifier,
      splitPopup.slot,
      splitPopup.inventoryIdentifier,
      undefined,
      false,
      splitValue,
    );
    setSplitPopup(null);
  }, [splitPopup, splitValue]);

  // Component mount/unmount
  useEffect(() => {
    document.addEventListener('mouseup', onmouseup);
    document.addEventListener('mousemove', onmousemove);

    // Initialize inventory like the original constructor
    inventoryStore.startup();

    return () => {
      document.removeEventListener('mouseup', onmouseup);
      document.removeEventListener('mousemove', onmousemove);
    };
  }, [onmouseup, onmousemove]);

  const renderTint = useCallback<(palette: string, tint0: number, tint1: number, tint2: number) => React.ReactNode>(
    (palette, tint0, tint1, tint2) => {
      const tints = [tint0, tint0, tint0, tint0, tint1, tint1, tint2];

      return (
        <div className={styles.itsThumbs}>
          {tints.map((tint, i) => (
            <div
              className={styles.itsThumb}
              key={i}
              style={{
                backgroundImage: `url(https://p--v.b-cdn.net/customization/palettes/${palette}_thumbs.png)`,
                backgroundPosition: `-${uiSize((tint % 8) * 8 * itsThumbScale)} -${uiSize(
                  Math.floor(tint / 8) * 8 * itsThumbScale,
                )}`,
              }}
            />
          ))}
        </div>
      );
    },
    [],
  );

  const renderItem = useCallback<
    (itemData: UI.Inventory.ItemData, i: number, identifier: string, inventory: UI.Inventory.LoadData) => ReactNode
  >(
    (itemData, i, identifier, inventory) => {
      const item = items[itemData.identifier];

      let durabilityProgress = null;
      if (item?.maxDurability) {
        const durability = itemData.durabilities[0] || 0;
        durabilityProgress = durability / item.maxDurability;
      }

      const firstMetadata: Inventory.AnyItemMetadata = itemData.metadatas[0];
      const isClothing = firstMetadata && 'shopItem' in firstMetadata;
      const shopItemHash = isClothing
        ? String(
            (typeof firstMetadata.shopItem === 'string'
              ? GetHashKey(firstMetadata.shopItem)
              : firstMetadata.shopItem) >>> 0,
          )
        : undefined;
      const drawableEntry = shopItemHash ? drawableMap[shopItemHash] : undefined;

      return (
        <>
          <ItemThumbnail
            image={firstMetadata?.image || item?.image}
            name={item?.name}
            drawableData={drawableEntry ? { drawable: drawableEntry[0], swatchTexture: drawableEntry[1] } : undefined}
            palette={isClothing ? firstMetadata.palette : undefined}
            tint0={isClothing ? firstMetadata.tint0 : undefined}
            tint1={isClothing ? firstMetadata.tint1 : undefined}
            tint2={isClothing ? firstMetadata.tint2 : undefined}
          />
          <span className={styles.weight}>{Math.round((item?.weight ?? 0) * itemData.quantity * 100) / 100}</span>
          <span className={styles.quantity}>x{itemData.quantity}</span>
          {durabilityProgress !== null && (
            <div style={progressStyleTop}>
              <ProgressBar
                progress={durabilityProgress}
                source="left"
                color={durabilityProgress > 0.6 ? 'green' : durabilityProgress > 0.2 ? 'orange' : 'red'}
                backgroundColor="transparent"
                height={uiSize(2)}
                width="100%"
              />
            </div>
          )}
          {firstMetadata &&
            'palette' in firstMetadata &&
            typeof firstMetadata.palette === 'string' &&
            firstMetadata.palette !== 'NONE' &&
            renderTint(
              firstMetadata.palette,
              firstMetadata.tint0 - 1,
              firstMetadata.tint1 - 1,
              firstMetadata.tint2 - 1,
            )}
        </>
      );
    },
    [renderTint, items],
  );

  const renderSlot = useCallback<
    (i: number, identifier: string, inventory: UI.Inventory.LoadData, disabled?: boolean) => React.ReactNode
  >(
    (i, identifier, inventory, disabled = false) => {
      let isBroken = false;
      if (i in inventory.items) {
        const item = items[inventory.items[i]?.identifier];
        if (item?.maxDurability) {
          const durability = inventory.items[i]?.durabilities[0] || 0;
          if (durability <= 0) {
            isBroken = true;
          }
        }
      }
      return (
        <div
          className={`${styles.inventorySlot} ${disabled ? styles.slotDisabled : ''}`}
          key={`${identifier}:${i}`}
          onMouseEnter={disabled ? undefined : onmouseenter}
          onMouseLeave={disabled ? undefined : onmouseleave}
          onMouseDown={disabled ? undefined : onmousedown}
          onContextMenu={disabled ? undefined : oncontextmenu}
          data-inventory-identifier={disabled ? undefined : identifier}
          data-slot={i}
          data-has-item={!disabled && !!inventory.items[i]}
          data-broken={isBroken}
        >
          {inventory.items[i] && renderItem(inventory.items[i], i, identifier, inventory)}
        </div>
      );
    },
    [onmouseenter, onmouseleave, onmousedown, oncontextmenu, renderItem, items],
  );

  const renderInventory = useCallback<(identifier: string, inventory: UI.Inventory.LoadData) => React.ReactNode>(
    (identifier, inventory) => {
      const weight = state.inventoriesWeight.get(identifier) || 0;
      const InventoryDetails = state.targetInventory === identifier ? styles.inventoryFooter : styles.inventoryHeader;
      const InventoryStats = state.targetInventory === identifier ? styles.inventoryHeader : styles.inventoryFooter;
      const isScrollable = inventory.slots > 32;
      const InventoryWrapper = identifier.startsWith('birds:')
        ? styles.inventoryWrapperOneCol
        : `${styles.inventoryWrapper}${isScrollable ? ` ${styles.scrollable}` : ''}`;
      return (
        <>
          <div className={InventoryDetails}>
            <div style={progressStyleWeight}>
              <ProgressBar
                progress={weight}
                source="left"
                color={weight > 1 ? 'red' : 'gray75'}
                height={uiSize(3)}
                width="100%"
              />
            </div>
          </div>
          <div className={InventoryStats}>
            <code>{identifier}</code>
          </div>
          <div className={InventoryWrapper} data-inventory-identifier={identifier}>
            {new Array(inventory.slots).fill(0).map((_, i) => {
              const isBirdsInv = identifier.startsWith('birds:');
              const birdItem = isBirdsInv ? inventory.items[i] : null;
              const birdDisabled = birdItem ? birdStore.getBirdState(birdItem.ids[0]).status !== 'available' : false;
              return renderSlot(i, identifier, inventory, birdDisabled);
            })}
          </div>
        </>
      );
    },
    [state.inventoriesWeight, state.targetInventory, birdState, renderSlot],
  );

  const hasLetter = useCallback<(inventoryIdentifier: string) => boolean>(
    (inventoryIdentifier) => {
      const inventory = state.inventories.get(inventoryIdentifier);
      if (!inventory) {
        return false;
      }

      return Object.keys(inventory.items).length > 0;
    },
    [state.inventories],
  );

  const renderBirdStatus = useCallback<(inventory?: UI.Inventory.LoadData) => React.ReactNode>(
    (inventory) => {
      if (!inventory) {
        return null;
      }
      return (
        <div className={styles.birdStatus}>
          {new Array(inventory.slots).fill(0).map((_, i) => (
            <div className={styles.birdStatusRow} key={i}>
              {inventory.items[i] &&
                (() => {
                  const birdId = inventory.items[i].ids[0];
                  const bird = birdStore.getBirdState(birdId);
                  const statusLabel =
                    bird.status === 'delivering'
                      ? 'Delivering'
                      : bird.status === 'returning'
                        ? 'Returning'
                        : 'Available';
                  const isDisabled = bird.sendLocked || bird.status !== 'available' || !hasLetter(`bird:${birdId}`);
                  return (
                    <>
                      <p>{statusLabel}</p>
                      <p>
                        <button onClick={() => handleBirdSend(birdId)} disabled={isDisabled}>
                          Send
                        </button>
                      </p>
                    </>
                  );
                })()}
            </div>
          ))}
        </div>
      );
    },
    [state.inventories, birdState, hasLetter, handleBirdSend],
  );

  const renderBirdSlots = useCallback<(inventory?: UI.Inventory.LoadData) => React.ReactNode>(
    (inventory) => {
      if (!inventory) {
        return null;
      }
      return (
        <div className={styles.inventoryWrapperOneCol}>
          {new Array(inventory.slots).fill(0).map((_, i) => {
            if (!inventory.items[i]) {
              return <div className={styles.inventorySlotLetterFake} key={i} />;
            }
            const birdId = inventory.items[i].ids[0];
            const birdIdentifier = `bird:${birdId}`;
            const birdInventory = state.inventories.get(birdIdentifier) || {
              identifier: birdIdentifier,
              slots: 1,
              maxWeight: 0,
              container: {
                locked: false,
                sealed: 'NONE',
              },
              items: {},
            };
            const birdDisabled = birdStore.getBirdState(birdId).status !== 'available';
            return renderSlot(0, birdIdentifier, birdInventory, birdDisabled);
          })}
        </div>
      );
    },
    [state.inventories, birdState, renderSlot],
  );

  const renderTooltip = useCallback<() => React.ReactNode>(() => {
    const itemData = state.tooltipItem;
    if (!itemData) {
      return null;
    }
    const item = items[itemData.identifier];
    if (!item) {
      return null;
    }
    let name = item.name;
    if (itemData.metadatas?.length) {
      for (const metadata of itemData.metadatas) {
        if (metadata.name) {
          name += ` (${metadata.name})`;
          break;
        }
      }
    }
    return (
      <div
        className={`${styles.inventoryTooltip} ${state.tooltipBelow ? styles.below : styles.above}`}
        style={{ top: state.tooltipY, left: state.tooltipX }}
      >
        <h1>{name}</h1>
        {item.description && <p>{item.description}</p>}
        <ul>
          <li>These</li>
          <li>Are</li>
          <li>Tags</li>
        </ul>
      </div>
    );
  }, [state.tooltipItem, state.tooltipBelow, state.tooltipX, state.tooltipY, items]);

  const renderContextMenu = useCallback<() => React.ReactNode>(() => {
    if (!contextMenu) return null;

    const inventory = state.inventories.get(contextMenu.inventoryIdentifier);
    if (!inventory) return null;

    const slotItem = inventory.items[contextMenu.slot];
    if (!slotItem) return null;

    const item = items[slotItem.identifier];
    if (!item) return null;

    const isTargetInventory = contextMenu.inventoryIdentifier === state.targetInventory;
    const metadata = slotItem.metadatas[0];
    const wearableOptions = metadata?.category
      ? getWearableStateOptions(metadata.category, metadata.wearableState)
      : [];

    return (
      <div ref={contextMenuRef} className={styles.contextMenu} style={{ left: contextMenu.x, top: contextMenu.y }}>
        {isTargetInventory ? (
          <button className={styles.contextMenuItem} onClick={() => handleContextMenuAction('take')}>
            Take
          </button>
        ) : (
          <>
            {item.hasUseEvent && (
              <button className={styles.contextMenuItem} onClick={() => handleContextMenuAction('use')}>
                Use
              </button>
            )}
            {item.containerType && !contextMenu.inventoryIdentifier.startsWith('birds:') && (
              <button className={styles.contextMenuItem} onClick={() => handleContextMenuAction('open')}>
                Open
              </button>
            )}
            {wearableOptions.map((option) => (
              <button
                key={option.state}
                className={styles.contextMenuItem}
                onClick={() => {
                  inventoryStore.updateItemMetadata(contextMenu.inventoryIdentifier, contextMenu.slot, {
                    wearableState: option.state,
                  });
                  setContextMenu(null);
                }}
              >
                {option.label}
              </button>
            ))}
            {slotItem.quantity > 1 && (
              <button className={styles.contextMenuItem} onClick={() => handleContextMenuAction('split')}>
                Split
              </button>
            )}
            <button
              className={`${styles.contextMenuItem} ${styles.contextMenuDanger}`}
              onClick={() => handleContextMenuAction('drop')}
            >
              Drop
            </button>
          </>
        )}
      </div>
    );
  }, [contextMenu, state.inventories, state.targetInventory, items, handleContextMenuAction]);

  const renderSplitPopup = useCallback<() => React.ReactNode>(() => {
    if (!splitPopup) return null;

    return (
      <div ref={splitPopupRef} className={styles.splitPopup} style={{ left: splitPopup.x, top: splitPopup.y }}>
        <span className={styles.splitPopupLabel}>Split Stack</span>
        <input
          type="range"
          className={styles.splitPopupSlider}
          min={1}
          max={splitPopup.maxQuantity - 1}
          value={splitValue}
          onChange={(e) => setSplitValue(Number(e.target.value))}
        />
        <span className={styles.splitPopupValue}>
          {splitValue} / {splitPopup.maxQuantity}
        </span>
        <button className={styles.splitPopupConfirm} onClick={handleSplitConfirm}>
          Confirm
        </button>
      </div>
    );
  }, [splitPopup, splitValue, handleSplitConfirm]);

  const getGridClass = useCallback<(inventory: UI.Inventory.LoadData) => string>((inventory) => {
    if (!inventory?.slots) return '';
    if (GRID_LAYOUTS[inventory.slots]) return styles[GRID_LAYOUTS[inventory.slots]];

    const cols = Math.min(inventory.slots, 8);
    const adjustedCols =
      inventory.slots > 8 ? Math.min(Math.ceil(inventory.slots / Math.ceil(inventory.slots / 8)), 8) : cols;
    const _rows = Math.min(Math.ceil(inventory.slots / adjustedCols), 4);
    const closestSlots =
      Object.keys(GRID_LAYOUTS)
        .map(Number)
        .sort((a, b) => a - b)
        .find((s) => s >= inventory.slots) || 32;
    return styles[GRID_LAYOUTS[closestSlots]];
  }, []);

  const { clothingInventory, mainInventory, birdsInventory, targetInventory } = state;
  const inventories = Object.fromEntries(state.inventories.entries());

  return (
    state.show && (
      <>
        <div className={styles.globalStyle} />
        {state.tooltipItem && renderTooltip()}
        {contextMenu && renderContextMenu()}
        {splitPopup && renderSplitPopup()}
        {state.targetInventory && (
          <div className={`${styles.targetInventoryContainer} ${getGridClass(inventories[targetInventory])}`}>
            {state.targetContainerItemId > 0 && (
              <button className={styles.closeTargetButton} onClick={() => inventoryStore.closeTargetInventory()}>
                <TimesSvg width={14} height={14} />
              </button>
            )}
            {inventories[targetInventory] && renderInventory(targetInventory, inventories[targetInventory])}
          </div>
        )}
        <div className={styles.mainInventoryContainer}>
          {inventories[mainInventory] && renderInventory(mainInventory, inventories[mainInventory])}
        </div>
        <div className={styles.clothingInventoryContainer}>
          {inventories[clothingInventory] && renderInventory(clothingInventory, inventories[clothingInventory])}
        </div>
        <div className={styles.secondaryInventoryContainer}>
          <div className={styles.inventoryHeader}>
            <div style={progressStyleWeight}>
              <ProgressBar progress={0} source="left" color="gray75" height={uiSize(3)} width="100%" />
            </div>
          </div>

          {inventories[birdsInventory] && renderInventory(birdsInventory, inventories[birdsInventory])}
          {renderBirdStatus(inventories[birdsInventory])}
          {renderBirdSlots(inventories[birdsInventory])}
        </div>
      </>
    )
  );
};

export default Inventories;
