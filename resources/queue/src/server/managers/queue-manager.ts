import { queueSort } from '@lib/server';

// let joinDelay = GetGameTimer() + 1.5 * 60 * 1000 // Milliseconds

// if (GetPlayerEndpoint(_source) === '127.0.0.1') {
//   joinDelay = 0
// }

class QueueManager {
  protected static instance: QueueManager;

  static getInstance(): QueueManager {
    if (!QueueManager.instance) {
      QueueManager.instance = new QueueManager();
    }
    return QueueManager.instance;
  }

  protected _handleInterval;
  protected _line: Record<number, LineData> = {};
  protected _sourcePromise: Record<number, Promise<void>> = {};
  protected _sourceResolvers: Record<number, Function> = {};

  constructor() {
    this._handleInterval = setInterval(() => {
      this.handleQueue();
    }, 5000); // TODO: Replace
  }

  get length() {
    return Object.values(this._line).length;
  }

  get line() {
    return this._line;
  }

  handleQueue(): void {
    this.acceptNext();
  }

  joinQueue(source: number, connectTime: number, priority: number): void {
    this._line[source] = {
      source,
      connectTime: connectTime,
      priority: priority,
      boosted: false,
      crashed: false,
      ip: GetPlayerEndpoint(String(source)),
    };

    this._sourcePromise[source] = new Promise((resolve) => {
      this._sourceResolvers[source] = resolve;
    });

    // for (let n = 1; n < 4; n++) {
    //   this._line[source + n] = {
    //     source: source + n,
    //     connectTime: connectTime + n,
    //     priority: priority + (Math.random() * 10 - 5),
    //     ip: '',
    //   };
    // }
  }

  leaveQueue(source: number) {
    delete this._line[source];
    delete this._sourcePromise[source];
    delete this._sourceResolvers[source];
  }

  lineSorted() {
    return Object.values(this._line).sort(queueSort);
  }

  positionInQueue(source: number) {
    return (
      this.lineSorted()
        .map((d) => d.source)
        .indexOf(source) + 1
    );
  }

  async sourceAccepted(source: number): Promise<void> {
    await this._sourcePromise[source];
  }

  acceptNext(): void {
    try {
      if (this.length) {
        const firstInLine = this.lineSorted()[0];

        if (this._sourceResolvers[firstInLine.source]) {
          this._sourceResolvers[firstInLine.source]();
        }

        delete this._line[firstInLine.source];
      }
    } catch (err) {
      console.error(err);
    }
  }
}

const queueManager = QueueManager.getInstance();

export default queueManager;
