export class Vector3 {
  public x: number;
  public y: number;
  public z: number;

  constructor(x = 0.0, y = 0.0, z = 0.0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  setFromArray(vectors: Array<number>): this {
    this.x = vectors[0];
    this.y = vectors[1];
    this.z = vectors[2];
    return this;
  }

  setFromObject(vectors: Vector3Format): this {
    this.x = vectors.x;
    this.y = vectors.y;
    this.z = vectors.z;
    return this;
  }

  getArray(): Array<number> {
    return [this.x, this.y, this.z];
  }

  add(vectors: Vector3Format): this {
    this.x += vectors.x;
    this.y += vectors.y;
    this.z += vectors.z;
    return this;
  }

  addScalar(scalar: number): this {
    this.x += scalar;
    this.y += scalar;
    this.z += scalar;
    return this;
  }

  sub(vectors: Vector3Format): this {
    this.x -= vectors.x;
    this.y -= vectors.y;
    this.z -= vectors.z;
    return this;
  }

  cross(vectors: Vector3Format): this {
    const ax = this.x,
      ay = this.y,
      az = this.z;
    const bx = vectors.x,
      by = vectors.y,
      bz = vectors.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
    return this;
  }

  equals(vectors: Vector3Format): boolean {
    return this.x === vectors.x && this.y === vectors.y && this.z === vectors.z;
  }

  subScalar(scalar: number): this {
    this.x -= scalar;
    this.y -= scalar;
    this.z -= scalar;
    return this;
  }

  multiply(vectors: Vector3Format): this {
    this.x *= vectors.x;
    this.y *= vectors.y;
    this.z *= vectors.z;
    return this;
  }

  multiplyScalar(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  round(): this {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    return this;
  }

  floor(): this {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  }

  ceil(): this {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    return this;
  }

  toFixed(precision: number): this {
    this.x = Number(this.x.toFixed(precision));
    this.y = Number(this.y.toFixed(precision));
    this.z = Number(this.z.toFixed(precision));
    return this;
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize(): this {
    let mag = this.magnitude();
    if (isNaN(mag)) mag = 0;
    return this.multiplyScalar(1 / mag);
  }

  forward(): Vector3 {
    const rad = Vector3.fromObject(this).multiplyScalar(Math.PI / 180.0);
    return new Vector3(
      -Math.sin(rad.z) * Math.abs(Math.cos(rad.x)),
      Math.cos(rad.z) * Math.abs(Math.cos(rad.x)),
      Math.sin(rad.x),
    );
  }

  right(): Vector3 {
    const rad = Vector3.fromObject(this).multiplyScalar(Math.PI / 180.0);
    return new Vector3(
      Math.cos(rad.z) * Math.abs(Math.cos(rad.y)),
      Math.sin(rad.z) * Math.abs(Math.cos(rad.y)),
      -Math.sin(rad.y),
    );
  }

  up(): Vector3 {
    return this.right().cross(this.forward());
  }

  up2(): Vector3 {
    return this.forward().cross(this.right());
  }

  angle(vectors: Vector3): number {
    const dot = this.dot(vectors);
    return Math.acos(dot) * (180 / Math.PI);
  }

  dot(vectors: Vector3Format): number {
    return this.x * vectors.x + this.y * vectors.y + this.z * vectors.z;
  }

  getDistance(vectors: Vector3Format): number {
    const [dX, dY, dZ]: Array<number> = [this.x - vectors.x, this.y - vectors.y, this.z - vectors.z];
    return Math.sqrt(dX * dX + dY * dY + dZ * dZ);
  }

  getDistanceFromArray(vectors: Array<number>): number {
    const [dX, dY, dZ]: Array<number> = [this.x - vectors[0], this.y - vectors[1], this.z - vectors[2]];
    return Math.sqrt(dX * dX + dY * dY + dZ * dZ);
  }

  getDistance2D(x: number, y: number): number {
    const [dX, dY]: Array<number> = [this.x - x, this.y - y];
    return Math.sqrt(dX * dX + dY * dY);
  }

  getOffsetFrom(vectors: Vector3Format): Vector3 {
    return new Vector3(this.x - vectors.x, this.y - vectors.y, this.z - vectors.z);
  }

  getOffsetFromArray(vectors: Array<number>): Vector3 {
    return new Vector3(this.x - vectors[0], this.y - vectors[1], this.z - vectors[2]);
  }

  copy(): Vector3 {
    return Vector3.fromArray(this.getArray());
  }

  toObject(): Vector3Format {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
    };
  }

  toArray(): [number, number, number] {
    return [this.x, this.y, this.z];
  }

  toString(precision?: number): string {
    if (precision !== undefined) {
      return `Vector3(${this.x.toFixed(precision)}, ${this.y.toFixed(precision)}, ${this.z.toFixed(precision)})`;
    }
    return `Vector3(${this.x}, ${this.y}, ${this.z})`;
  }

  static fromOrCreate(vectors?: Vector3 | Vector3Format | Array<number>): Vector3 {
    if (vectors instanceof Vector3) {
      return vectors;
    } else if (Array.isArray(vectors)) {
      return Vector3.fromArray(vectors);
    } else if (vectors && typeof vectors === 'object') {
      return Vector3.fromObject(vectors);
    }
    return new Vector3();
  }

  static fromArray(vectors: Array<number>): Vector3 {
    return new Vector3(vectors[0], vectors[1], vectors[2]);
  }

  static fromObject(vectors: Vector3Format): Vector3 {
    return new Vector3(vectors.x, vectors.y, vectors.z);
  }
}
