export default class Stable {
  id: string;
  name: string;
  // horses: Horse[] = [];
  horses: any[] = [];
  stalls: Vector4Format[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  addStalls(stalls: Vector4Format[]) {
    this.stalls.push(...stalls);
  }

  addStall(stall: Vector4Format) {
    this.stalls.push(stall);
  }
}
