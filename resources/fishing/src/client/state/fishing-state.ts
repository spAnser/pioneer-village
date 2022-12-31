export default class FishingState {
  protected data: DataView;
  modified: boolean = false;

  constructor() {
    this.data = new DataView(new ArrayBuffer(0xe0));
  }

  getState(): DataView {
    return this.data;
  }

  get theData() {
    return this.data;
  }

  // 0
  get status(): number {
    return this.data.getInt32(0x00, true);
  }
  set status(value) {
    if (this.data.getInt32(0x00, true) !== value) {
      this.modified = true;
      this.data.setInt32(0x00, value, true);
    }
  }

  // 1
  get maxLineLength(): number {
    return this.data.getFloat32(0x08, true);
  }
  set maxLineLength(value) {
    if (this.data.getFloat32(0x08, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0x08, value, true);
    }
  }

  // 2
  get lineLength(): number {
    return this.data.getFloat32(0x10, true);
  }
  set lineLength(value) {
    if (this.data.getFloat32(0x10, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0x10, value, true);
    }
  }

  // 3
  get lineSlack(): number {
    return this.data.getFloat32(0x18, true);
  }
  set lineSlack(value) {
    if (this.data.getFloat32(0x18, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0x18, value, true);
    }
  }

  // 4
  get reelSpeed(): number {
    return this.data.getFloat32(0x20, true);
  }
  set reelSpeed(value) {
    if (this.data.getFloat32(0x20, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0x20, value, true);
    }
  }

  // 5
  get codeSig(): number {
    return this.data.getInt32(0x28, true);
  }
  set codeSig(value) {
    if (this.data.getInt32(0x28, true) !== value) {
      this.modified = true;
      this.data.setInt32(0x28, value, true);
    }
  }

  // 6
  get request(): number {
    return this.data.getInt32(0x30, true);
  }
  set request(value) {
    if (this.data.getInt32(0x30, true) !== value) {
      this.modified = true;
      this.data.setInt32(0x30, value, true);
    }
  }

  // 7
  get hookedEntity(): number {
    return this.data.getInt32(0x38, true);
  }
  set hookedEntity(value) {
    if (this.data.getInt32(0x38, true) !== value) {
      this.modified = true;
      this.data.setInt32(0x38, value, true);
    }
  }

  // 8
  get fishWeight(): number {
    return this.data.getFloat32(0x40, true);
  }
  set fishWeight(value) {
    if (this.data.getFloat32(0x40, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0x40, value, true);
    }
  }

  // 9
  get fishPower(): number {
    return this.data.getFloat32(0x48, true);
  }
  set fishPower(value) {
    if (this.data.getFloat32(0x48, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0x48, value, true);
    }
  }

  // 10
  get scriptTimer(): number {
    return this.data.getInt32(0x50, true);
  }
  set scriptTimer(value) {
    if (this.data.getInt32(0x50, true) !== value) {
      this.modified = true;
      this.data.setInt32(0x50, value, true);
    }
  }

  // 11
  get bobberEntity(): number {
    return this.data.getInt32(0x58, true);
  }
  set bobberEntity(value) {
    if (this.data.getInt32(0x58, true) !== value) {
      this.modified = true;
      this.data.setInt32(0x58, value, true);
    }
  }

  // 12
  get hookEntity(): number {
    return this.data.getInt32(0x60, true);
  }
  set hookEntity(value) {
    if (this.data.getInt32(0x60, true) !== value) {
      this.modified = true;
      this.data.setInt32(0x60, value, true);
    }
  }

  // 13
  get rodShakeMultiplier(): number {
    return this.data.getFloat32(0x68, true);
  }
  set rodShakeMultiplier(value) {
    if (this.data.getFloat32(0x68, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0x68, value, true);
    }
  }

  // 14
  get unk1(): number {
    return this.data.getFloat32(0x70, true);
  }
  set unk1(value) {
    if (this.data.getFloat32(0x70, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0x70, value, true);
    }
  }

  // 15
  get unk2(): number {
    return this.data.getFloat32(0x78, true);
  }
  set unk2(value) {
    if (this.data.getFloat32(0x78, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0x78, value, true);
    }
  }

  // 16
  get errorCode(): number {
    return this.data.getInt32(0x80, true);
  }
  set errorCode(value) {
    if (this.data.getInt32(0x80, true) !== value) {
      this.modified = true;
      this.data.setInt32(0x80, value, true);
    }
  }

  // 17
  get shakeFightMultiplier(): number {
    return this.data.getFloat32(0x88, true);
  }
  set shakeFightMultiplier(value) {
    if (this.data.getFloat32(0x88, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0x88, value, true);
    }
  }

  // 18
  get fishSizeIndex(): number {
    return this.data.getInt32(0x90, true);
  }
  set fishSizeIndex(value) {
    if (this.data.getInt32(0x90, true) !== value) {
      this.modified = true;
      this.data.setInt32(0x90, value, true);
    }
  }

  // 19
  get unk4(): number {
    return this.data.getFloat32(0x98, true);
  }
  set unk4(value) {
    if (this.data.getFloat32(0x98, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0x98, value, true);
    }
  }

  // 20
  get unk5(): number {
    return this.data.getFloat32(0xa0, true);
  }
  set unk5(value) {
    if (this.data.getFloat32(0xa0, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0xa0, value, true);
    }
  }

  // 21
  get tension(): number {
    return this.data.getFloat32(0xa8, true);
  }
  set tension(value) {
    if (this.data.getFloat32(0xa8, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0xa8, value, true);
    }
  }

  // 22
  get rodDirX(): number {
    return this.data.getFloat32(0xb0, true);
  }
  set rodDirX(value) {
    if (this.data.getFloat32(0xb0, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0xb0, value, true);
    }
  }

  // 23
  get rodDirY(): number {
    return this.data.getFloat32(0xb8, true);
  }
  set rodDirY(value) {
    if (this.data.getFloat32(0xb8, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0xb8, value, true);
    }
  }

  // 24
  get minCastDistanceOverride(): number {
    return this.data.getFloat32(0xc0, true);
  }
  set minCastDistanceOverride(value) {
    if (this.data.getFloat32(0xc0, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0xc0, value, true);
    }
  }

  // 25
  get maxCastDistanceOverride(): number {
    return this.data.getFloat32(0xc8, true);
  }
  set maxCastDistanceOverride(value) {
    if (this.data.getFloat32(0xc8, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0xc8, value, true);
    }
  }

  // 26
  get unk6(): number {
    return this.data.getFloat32(0xd0, true);
  }
  set unk6(value) {
    if (this.data.getFloat32(0xd0, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0xd0, value, true);
    }
  }

  // 27
  get unk7(): number {
    return this.data.getFloat32(0xd8, true);
  }
  set unk7(value) {
    if (this.data.getFloat32(0xd8, true) !== value) {
      this.modified = true;
      this.data.setFloat32(0xd8, value, true);
    }
  }
}
