// Icon Registry - Manually add icons as needed to reduce bundle size
// Icons are organized by style (light, regular, solid, duotone)
// Regular icons (add as needed)
// Duotone icons
import BadgeSheriffDuotone from '@fa/5/duotone/badge-sheriff.svg';
import CashRegisterDuotone from '@fa/5/duotone/cash-register.svg';
import GarageDuotone from '@fa/5/duotone/garage.svg';
// Light icons
import EyeLight from '@fa/5/light/eye.svg';
// Solid icons
import CashRegisterSolid from '@fa/5/solid/cash-register.svg';
import ClockSolid from '@fa/5/solid/clock.svg';
import CloudMeatballSolid from '@fa/5/solid/cloud-meatball.svg';
import DoorClosedSolid from '@fa/5/solid/door-closed.svg';
import DoorOpenSolid from '@fa/5/solid/door-open.svg';
import EyeSolid from '@fa/5/solid/eye.svg';
import FillSolid from '@fa/5/solid/fill.svg';
import HandPaperSolid from '@fa/5/solid/hand-paper.svg';
import HorseSaddleSolid from '@fa/5/solid/horse-saddle.svg';
import HorseSolid from '@fa/5/solid/horse.svg';
import LassoSolid from '@fa/5/solid/lasso.svg';
import MaleSolid from '@fa/5/solid/male.svg';
import PawSolid from '@fa/5/solid/paw.svg';
import RecycleSolid from '@fa/5/solid/recycle.svg';
import SackSolid from '@fa/5/solid/sack.svg';
import WagonCoveredSolid from '@fa/5/solid/wagon-covered.svg';
import GemSolid from '@fa/5/solid/gem.svg';
import CoinsSolid from '@fa/5/solid/coins.svg';
import ArchiveSolid from '@fa/5/solid/archive.svg';
import EnvelopeSolid from '@fa/5/solid/envelope.svg';
import { ComponentType } from 'react';

// Icon registry mapping
export const iconRegistry: Record<string, Record<string, ComponentType<any>>> = {
  solid: {
    'cash-register': CashRegisterSolid,
    'cloud-meatball': CloudMeatballSolid,
    'door-closed': DoorClosedSolid,
    'door-open': DoorOpenSolid,
    eye: EyeSolid,
    fill: FillSolid,
    'hand-paper': HandPaperSolid,
    'horse-saddle': HorseSaddleSolid,
    male: MaleSolid,
    recycle: RecycleSolid,
    badge: BadgeSheriffDuotone,
    'wagon-covered': WagonCoveredSolid,
    sack: SackSolid,
    lasso: LassoSolid,
    horse: HorseSolid,
    paw: PawSolid,
    clock: ClockSolid,
    gem: GemSolid,
    coins: CoinsSolid,
    vault: ArchiveSolid,
    inbox: EnvelopeSolid,
  },
  light: {
    eye: EyeLight,
  },
  regular: {
    // Add regular icons as needed
  },
  duotone: {
    'cash-register': CashRegisterDuotone,
    garage: GarageDuotone,
  },
};

export function getIcon(style: string, name: string): ComponentType<any> | null {
  const styleIcons = iconRegistry[style];
  if (!styleIcons) {
    console.error(`Icon style "${style}" not found in registry`);
    return null;
  }

  const icon = styleIcons[name];
  if (!icon) {
    console.error(`Icon "${name}" not found in style "${style}". Add it to icon-registry.ts`);
    return null;
  }

  return icon;
}

export function getIconAny(name: string): ComponentType<any> | null {
  // Check all styles for the icon
  for (const style in iconRegistry) {
    const icon = getIcon(style, name);
    if (icon) {
      return icon;
    }
  }
  console.error(`Icon "${name}" not found in any style. Add it to icon-registry.ts`);
  return null;
}
