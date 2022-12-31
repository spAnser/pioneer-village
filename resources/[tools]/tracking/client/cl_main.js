function buf2hex(buffer) {
  // buffer is an ArrayBuffer
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
}

const showObjective = (text, duration) => {
  // int32 x4
  const struct1 = new DataView(new ArrayBuffer(4 * 4));
  struct1.setInt32(0, duration, true); // duration

  const string = CreateVarString(10, "LITERAL_STRING", text);

  // int32 (weird padding) + int32 + uint64
  const struct2 = new DataView(new ArrayBuffer(4 * 2 + 8));
  struct2.setBigInt64(8, BigInt(string), true);

  Citizen.invokeNative("0xCEDBF17EFCC0E4A4", struct1, struct2, 1);
};

RegisterCommand(
  "card_peek",
  async (src, args) => {
    const struct1 = new DataView(new ArrayBuffer(256));
    struct1.setInt32(
      0,
      Citizen.invokeNative(
        "0xD8402B858F4DDD88",
        "clipset@mini_games@poker_mg@base",
        GetLengthOfLiteralString("clipset@mini_games@poker_mg@base")
      )
    );
    // 'peek_idle_card1'
    // const animDict = "clipset@mini_games@poker_mg@base";
    // for (let n = 0; n < animDict.length; n++) {
    //   struct1.setInt8(n, animDict.charCodeAt(n));
    // }
    // const anim = "peek_idle_card1";
    // for (let n = 0; n < anim.length; n++) {
    //   struct1.setInt8(64 + n, anim.charCodeAt(n));
    // }

    const entity = 1382664;

    const string1 = CreateVarString(
      10,
      "LITERAL_STRING",
      "mini_games@poker_mg@base"
    );
    const string2 = CreateVarString(10, "LITERAL_STRING", "peek_idle_card1");

    struct1.setBigInt64(0, BigInt(string1), true);
    struct1.setBigInt64(8, BigInt(string2), true);
    const offset = 16;
    struct1.setFloat32(offset, 0.0); // 3
    struct1.setFloat32(offset + 4, 1.0); // 4
    struct1.setFloat32(offset + 8, 1.0); // 5
    struct1.setInt32(offset + 12, 0); // 6
    struct1.setInt32(offset + 16, 0); // 7
    struct1.setInt32(offset + 20, 0); // 8
    struct1.setFloat32(offset + 24, 1.0); // 9
    struct1.setFloat32(offset + 28, 0.0); // 10
    struct1.setInt32(offset + 32, 0); // 11
    struct1.setInt32(offset + 36, 0); // 12
    struct1.setInt32(offset + 40, 0); // 13
    struct1.setFloat32(offset + 44, 1.0); // 14
    struct1.setFloat32(offset + 48, 0.0); // 15
    struct1.setInt32(offset + 52, 0); // 16
    struct1.setFloat32(offset + 56, 0.0); // 17
    struct1.setFloat32(offset + 60, 0.0); // 18
    struct1.setInt32(offset + 64, -1); // 19
    struct1.setInt32(offset + 68, 0); // 20
    struct1.setInt32(offset + 72, 536870912); // 21
    struct1.setInt32(offset + 76, 1); // 22
    struct1.setInt32(offset + 80, 0); // 23
    struct1.setInt32(offset + 84, 0); // 24
    struct1.setInt32(offset + 88, 0); // 25
    struct1.setFloat32(offset + 92, -1.0); // 26
    const entityCoords = GetEntityCoords(entity);
    struct1.setFloat32(offset + 96, entityCoords[0]); // 27 x
    struct1.setFloat32(offset + 100, entityCoords[1]); // 28 y
    struct1.setFloat32(offset + 104, entityCoords[2]); // 29 z
    struct1.setFloat32(offset + 108, 0.0); // 30 pitch
    struct1.setFloat32(offset + 112, 0.0); // 31 roll
    struct1.setFloat32(offset + 116, 0.0); // 32 yaw
    struct1.setInt32(offset + 120, 1); // 33
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    PlayEntityScriptedAnim(entity, struct1);
    ForceEntityAiAndAnimationUpdate(entity, true);
  },
  false
);

const showTooltip = (text, duration) => {
  const str = CreateVarString(10, "LITERAL_STRING", text);

  const struct1 = new DataView(new ArrayBuffer(8 * 4));
  struct1.setUint32(0, duration, true);

  const struct2 = new DataView(new ArrayBuffer(8 * 2));
  struct2.setBigUint64(8, BigInt(str), true);

  Citizen.invokeNative("0x049D5C615BD38BAD", struct1, struct2, 1);
};

const displayTopCenterNotification = (text, town, duration) => {
  const struct1 = new DataView(new ArrayBuffer(4 * 4));
  struct1.setInt32(0, duration, true);

  const string = CreateVarString(10, "LITERAL_STRING", town);
  const string2 = CreateVarString(10, "LITERAL_STRING", text);

  const struct2 = new DataView(new ArrayBuffer(24));
  struct2.setBigInt64(8, BigInt(string), true);
  struct2.setBigInt64(16, BigInt(string2), true);
  console.log(buf2hex(struct2.buffer));

  Citizen.invokeNative("0xD05590C1AB38F068", struct1, struct2, 1, 1);
};

const displayRightText = (text, duration) => {
  // int32 x4
  const struct1 = new DataView(new ArrayBuffer(4 * 4));
  struct1.setInt32(0, duration, true); // duration

  const string = CreateVarString(10, "LITERAL_STRING", text);

  // int32 (weird padding) + int32 + uint64
  const struct2 = new DataView(new ArrayBuffer(4 * 2 + 8));
  struct2.setBigInt64(8, BigInt(string), true);

  Citizen.invokeNative("0xB2920B9760F0F36B", struct1, struct2, 1);
};

// showObjective("Test", 2500);
// showTooltip("Hello from JavaScript :]", 2500);
// displayTopCenterNotification("asdasd", "TOWN_VALENTINE", 2500);
// displayRightText("Test", 2500);

// const SetPedComponentEnabled = (pedId, componentHash) => {
//   Citizen.invokeNative('0xD3A7B003ED343FD9', pedId, componentHash, true, true, true)
// }

// let bodyShapes = 124
// const bodyShapesTest = setInterval(() => {
//   console.log(`Testing Shape: ${bodyShapes}`)
//   Citizen.invokeNative('0x283978A15512B2FE', PlayerPedId(), true)
//   Citizen.invokeNative('0xA5BAE410B03E7371' ,PlayerPedId(), bodyShapes, true, true)
//   bodyShapes++
//   if (bodyShapes > 128) {
//     clearInterval(bodyShapesTest)
//   }
// }, 500)

// let faceShapes = 110
// const faceShapesTest = setInterval(() => {
//   console.log(`Testing Shape: ${faceShapes}`)
//   Citizen.invokeNative('0x283978A15512B2FE', PlayerPedId(), true)
//   Citizen.invokeNative('0xA5BAE410B03E7371' ,PlayerPedId(), faceShapes, true, true)
//   faceShapes++
//   if (faceShapes > 123) {
//     clearInterval(faceShapesTest)
//   }
// }, 500)

// let clothShapes = 0;
// const clothShapesTest = setInterval(() => {
//   console.log(`Testing Shape: ${clothShapes}`);
//   Citizen.invokeNative("0x283978A15512B2FE", PlayerPedId(), true);
//   Citizen.invokeNative(
//     "0xA5BAE410B03E7371",
//     PlayerPedId(),
//     clothShapes,
//     true,
//     true
//   );
//   clothShapes++;
//   if (clothShapes > 109) {
//     clearInterval(clothShapesTest);
//   }
// }, 500);
