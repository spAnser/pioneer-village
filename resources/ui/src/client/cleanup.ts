const cleanup = (): void => {
  EnableHudContext(-1679307491); // HIDE Everything ?
  EnableHudContext(2011163970); // HIDE Only action wheel
  EnableHudContext(3141998988); // HIDE RETICLE/crosshair & Achievement notifications
  EnableHudContext(-66088566); // HIDE MP MONEY
  EnableHudContext(1058184710); // Hide Cards (Top right ability loadout)
  EnableHudContext(-2124237476); // honorMoneyCards
  EnableHudContext(474191950); // minimap
  EnableHudContext(-1249243147); // actionWheelWeapons
  EnableHudContext(-2106452847); // actionWheelItems
  SetMinimapHideFow(true);
};

const initTick = setTick(() => {
  if (NetworkIsSessionStarted()) {
    cleanup();
    clearTick(initTick);
  }
});
