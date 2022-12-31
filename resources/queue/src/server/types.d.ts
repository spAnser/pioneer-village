interface LineData {
  source: number;
  connectTime: number;
  priority: number;
  boosted?: boolean;
  crashed?: boolean;
  ip: string;
}

/**
 * @param data - A parsed version of the data sent from the card.
 * @param rawData - A JSON string containing the data sent from the card.
 */
type CardCallback = (data: {}, rawData: string) => void;

interface Deferrals {
  /**
   * will initialize deferrals for the current resource. It is required to wait for at least a tick after calling defer before calling update, presentCard or done.
   */
  defer(): void;
  /**
   * finalizes a deferral. It is required to wait for at least a tick before calling done after calling a prior deferral method.
   * @param failureReason - If specified, the connection will be refused, and the user will see the specified message as a result. If this is not specified, the user will be allowed to connect.
   */
  done(failureReason?: string): void;
  /**
   * Adds handover data for the client to be able to use at a later point
   * @param data - Data to pass to the connecting client.
   */
  handover(data: {}): void;
  /**
   * will send an [Adaptive Card](https://adaptivecards.io/) to the client.
   * @param card - An object containing card data, or a serialized JSON string with the card information.
   * @param cb - If present, will be invoked on an Action.Submit event from the Adaptive Card.
   */
  presentCard(card: string | {}, cb?: CardCallback): void;

  /**
   * will send a progress message to the connecting client.
   * @param message - The string to send to the client.
   */
  update(message: string): void;
}
