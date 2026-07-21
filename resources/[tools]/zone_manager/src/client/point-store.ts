import { ZonePreview } from './zone-preview';

export class PointStore {
  private points: ZoneManagerNew.Point[] = [];
  private minZ = -50.0;
  private maxZ = 999.0;
  private readonly preview = new ZonePreview();
  private onChange: () => void;

  constructor(onChange: () => void) {
    this.onChange = onChange;
  }

  getPoints(): ZoneManagerNew.Point[] {
    return this.points;
  }

  getBounds(): { minZ: number; maxZ: number } {
    return { minZ: this.minZ, maxZ: this.maxZ };
  }

  seedBoundsFromZ(playerZ: number): void {
    this.minZ = round2(playerZ - 50.0);
    this.maxZ = round2(playerZ + 15.0);
  }

  setBounds(minZ: number, maxZ: number): void {
    this.minZ = round2(minZ);
    this.maxZ = round2(maxZ);
    this.refresh();
  }

  add(point: ZoneManagerNew.Point): void {
    this.points.push(point);
    this.refresh();
  }

  setPosition(index: number, point: ZoneManagerNew.Point): void {
    if (!this.points[index]) return;
    if (typeof point.x !== 'number' || typeof point.y !== 'number' || typeof point.z !== 'number') return;
    this.points[index] = point;
    this.refresh();
  }

  undo(): void {
    this.points.pop();
    this.refresh();
  }

  clear(): void {
    this.points = [];
    this.refresh();
  }

  delete(index: number): void {
    if (!this.points[index]) return;
    this.points.splice(index, 1);
    this.refresh();
  }

  reset(): void {
    this.points = [];
    this.preview.remove();
  }

  private refresh(): void {
    this.preview.refresh(this.points, this.minZ, this.maxZ);
    this.onChange();
  }
}

function round2(n: number): number {
  return Math.floor(n * 100 + 0.5) / 100;
}
