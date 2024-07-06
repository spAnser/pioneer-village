//@ts-ignore
import Natives from './natives-db';
import { Log } from '@lib/client/comms/ui';

const HexToFloat32 = (str: string) => {
  const int = parseInt(str, 16);
  if (int > 0 || int < 0) {
    const sign = int >>> 31 ? -1 : 1;
    let exp = ((int >>> 23) & 0xff) - 127;
    const mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
    let float32 = 0;
    for (let i = 0; i < mantissa.length; i += 1) {
      float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0;
      exp--;
    }
    return float32 * sign;
  } else return 0;
};

RegisterCommand(
  'test_natives',
  async () => {
    const restrictUnnamed = true;
    const category = 'ENTITY';
    const parameterCount = 2;
    const args = [PlayerPedId(), 0];
    Log('==============');
    for (const [native, data] of Object.entries<any>(Natives[category])) {
      try {
        if (restrictUnnamed && !data.name.startsWith('_0x')) {
          continue;
        }
        if (data.params.length !== parameterCount || data.return_type === 'void') {
          continue;
        }
        const rtn = Citizen.invokeNative(native, ...args) as any;
        if (rtn === args[0] || rtn === false) continue;
        if (data.return_type === 'float') {
          Log(native, HexToFloat32(rtn.toString(16)), restrictUnnamed ? '' : data.name);
        } else {
          Log(native, rtn, restrictUnnamed ? '' : data.name);
        }
      } catch {}
    }
    Log('==============');
  },
  false,
);

RegisterCommand(
  'listMetaPedOutfits',
  async () => {
    const playerPed = PlayerPedId();
    for (let n = 0; n < GetNumMetaPedOutfits(playerPed); n++) {
      // GetMetaPedOutfit
      const rtn = Citizen.invokeNative('0x62FDF4E678E40CC6', playerPed, n);
      Log(`Meta Ped Outfit ${n}:`, rtn);
    }
  },
  false,
);
