// async function loadScaleform(scaleform: any) {
//   let scaleformHandle = RequestScaleformMovie(scaleform);
//
//   return new Promise((resolve) => {
//     const tick = setTick(() => {
//       // console.log('tick', scaleformHandle);
//       if (HasScaleformMovieLoaded(scaleformHandle)) {
//         clearTick(tick);
//         resolve(scaleformHandle);
//       } else {
//         scaleformHandle = RequestScaleformMovie(scaleform);
//       }
//     });
//   });
// }

// const url = 'https://via.placeholder.com/1280x720/000000/FFFFFF/?text=[E]%20Grab';
// const scale = 0.1;
// const sfName = 'generic_texture_renderer';
//
// const width = 480;
// const height = 270;
//
// let sfHandle: any = null;
// let txdHasBeenSet = false;
// let duiObj: any = null;
//
// setTick(() => {
//   const ped = PlayerPedId();
//   const pos = GetEntityCoords(ped, false);
//
//   // console.log('sfHandle', sfHandle);
//   if (sfHandle !== null && !txdHasBeenSet) {
//     PushScaleformMovieFunction(sfHandle, 'SET_TEXTURE');
//
//     PushScaleformMovieMethodParameterString('meows'); // txd
//     PushScaleformMovieMethodParameterString('woof'); // txn
//
//     PushScaleformMovieFunctionParameterInt(0); // x
//     PushScaleformMovieFunctionParameterInt(0); // y
//     PushScaleformMovieFunctionParameterInt(width);
//     PushScaleformMovieFunctionParameterInt(height);
//
//     PopScaleformMovieFunctionVoid();
//
//     txdHasBeenSet = true;
//   }
//
//   if (sfHandle !== null && HasScaleformMovieLoaded(sfHandle)) {
//     DrawScaleformMovieFullscreen(sfHandle, 255, 255, 255, 0, 0);
//     DrawScaleformMovie_3dSolid(
//       sfHandle,
//       pos[0] - 1,
//       pos[1],
//       pos[2] + 2,
//       0,
//       0,
//       0,
//       2,
//       2,
//       2,
//       scale * 1,
//       scale * (9 / 16),
//       1,
//       2,
//     );
//   }
// });
//
// let runtimeTxd;
//
// on('onClientResourceStart', async (resName: string) => {
//   if (resName === GetCurrentResourceName()) {
//     sfHandle = await loadScaleform(sfName);
//     console.log('sfHandle', sfHandle);
//
//     runtimeTxd = 'meows';
//
//     const txd = CreateRuntimeTxd('meows');
//     const duiObj = CreateDui(url, width, height);
//     const dui = GetDuiHandle(duiObj);
//     const tx = CreateRuntimeTextureFromDuiHandle(txd, 'woof', dui);
//   }
// });
//
// on('onResourceStop', (resName: string) => {
//   if (resName === GetCurrentResourceName()) {
//     DestroyDui(duiObj);
//     // @ts-ignore
//     SetScaleformMovieAsNoLongerNeeded(sfName);
//   }
// });
