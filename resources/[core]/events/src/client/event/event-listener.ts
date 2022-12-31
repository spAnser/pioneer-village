import { eventNames, observedEvents } from '../data';
import { EventManager } from '../managers/event-manager';
import { KeyManager } from '../managers/key-manager';

const eventManager = EventManager.getInstance();
const keyManager = KeyManager.getInstance();

const seenUnobserved = new Set();

export class EventListener {
  protected static instance: EventListener;

  static getInstance(): EventListener {
    if (!EventListener.instance) {
      EventListener.instance = new EventListener();
    }
    return EventListener.instance;
  }

  protected listenerInterval;

  constructor() {
    this.listenerInterval = setTick(() => {
      this.listenerHandler();
    });
  }

  currentRightHandWeapon: number = 0;
  currentLeftHandWeapon: number = 0;

  destroy(): void {
    clearTick(this.listenerInterval);
  }

  restartListener(): void {
    clearTick(this.listenerInterval);

    this.listenerInterval = setTick(() => {
      this.listenerHandler();
    });
  }

  listenerHandler() {
    const size = GetNumberOfEvents(0);

    if (size > 0) {
      for (let i = 0; i < size; i++) {
        const eventAtIndex = GetEventAtIndex(0, i);

        if (observedEvents.has(eventAtIndex)) {
          const observedEvent = observedEvents.get(eventAtIndex);
          // console.log('observed event', eventNames.get(eventAtIndex) ?? eventAtIndex, observedEvent)

          const [dataViewInts, dataViewFloats] = this.getEventData(0, i, observedEvent['dataSize']);
          // console.log('dataview: ', dataView)
          const returns: number[] = [];
          observedEvent.dataIndexes.forEach((key: number) => {
            returns.push(dataViewInts[key]);
          });
          observedEvent.dataFloats.forEach((key: number) => {
            returns.push(dataViewFloats[key]);
          });
          // console.log('returns', returns)
          // console.log('trigger:', observedEvent['eventTrigger']);
          eventManager.trigger(observedEvent['eventTrigger'], ...returns);
        } else {
          if (!seenUnobserved.has(eventAtIndex)) {
            console.log('unobserved event', eventNames.get(eventAtIndex) ?? eventAtIndex);
            seenUnobserved.add(eventAtIndex);
          }
        }
      }
    }

    const [hasRightHandWeapon, rightHandWeapon] = GetCurrentPedWeapon(PlayerPedId(), true, 0, false);
    const [hasLeftHandWeapon, leftHandWeapon] = GetCurrentPedWeapon(PlayerPedId(), true, 1, false);

    if (this.currentRightHandWeapon !== rightHandWeapon) {
      this.currentRightHandWeapon = rightHandWeapon;
      eventManager.trigger('weaponChanged', rightHandWeapon, leftHandWeapon);
    }
    if (this.currentLeftHandWeapon !== leftHandWeapon) {
      this.currentLeftHandWeapon = leftHandWeapon;
      eventManager.trigger('weaponChanged', rightHandWeapon, leftHandWeapon);
    }

    keyManager.tick();
  }

  getEventData(eventGroup: number, index: number, argStructSize: number): [Int32Array, Float32Array] {
    const buffer = new ArrayBuffer(256);
    const view = new DataView(buffer);

    // GetEventData(eventGroup, index, view, argStructSize);
    Citizen.invokeNative('0x57EC5FA4D4D6AFCA', eventGroup, index, view, argStructSize, Citizen.returnResultAnyway());

    // const floats = new Float32Array(buffer);
    // const ints = new Int32Array(buffer);
    // let n = 0;
    // for (const float of floats) {
    //     console.log(n, ints[n], float);
    //     n++;
    // }

    return [new Int32Array(buffer), new Float32Array(buffer)];
  }
}

const eventListener = EventListener.getInstance();

export default eventListener;
