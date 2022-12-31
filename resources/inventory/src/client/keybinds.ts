import { emitUI, focusUI } from '@lib/client';

const Inputs = {
  ToggleHolster: GetHashKey('ToggleHolster'),
  QuickUseItem: GetHashKey('INPUT_QUICK_USE_ITEM'),
  SelectQuickselectSidearmsLeft: GetHashKey('INPUT_SELECT_QUICKSELECT_SIDEARMS_LEFT'),
  SelectQuickselectSidearmsRight: GetHashKey('INPUT_SELECT_QUICKSELECT_SIDEARMS_RIGHT'),
  SelectQuickselectDualwield: GetHashKey('INPUT_SELECT_QUICKSELECT_DUALWIELD'),
  // Keys
  KeyI: GetHashKey('INPUT_QUICK_USE_ITEM'),
};

setTick(() => {
  DisableControlAction(0, Inputs.ToggleHolster, true);

  DisableControlAction(0, Inputs.SelectQuickselectSidearmsRight, true);
  DisableControlAction(0, Inputs.SelectQuickselectSidearmsLeft, true);
  DisableControlAction(0, Inputs.SelectQuickselectDualwield, true);
  DisableControlAction(0, 0x8f9f9e58, true);
  DisableControlAction(0, 0xab62e997, true);
  DisableControlAction(0, 0xbe22bfeb, true);
  DisableControlAction(0, 0x819d1c85, true);
  DisableControlAction(0, 0xb03a913b, true);
  DisableControlAction(0, 0x417914ef, true);

  if (IsDisabledControlJustReleased(0, 0xe6f612e4)) {
    // 1
    emitUI('inventory.use-slot', 0);
  }
  if (IsDisabledControlJustReleased(0, 0x1ce6d9eb)) {
    // 2
    emitUI('inventory.use-slot', 1);
  }
  if (IsDisabledControlJustReleased(0, 0x4f49cc4c)) {
    // 3
    emitUI('inventory.use-slot', 2);
  }
  if (IsDisabledControlJustReleased(0, 0x8f9f9e58)) {
    // 4
    emitUI('inventory.use-slot', 3);
  }
  if (IsDisabledControlJustReleased(0, 0xab62e997)) {
    // 5
    emitUI('inventory.use-slot', 4);
  }
  if (IsDisabledControlJustReleased(0, Inputs.KeyI)) {
    console.log('KeyI');
    emitUI('inventory.state', { show: true });
    focusUI(true, true);
  }
});
