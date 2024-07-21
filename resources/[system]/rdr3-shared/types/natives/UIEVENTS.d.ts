/**
 * EVENTS_UI_GET_MESSAGE
 * eventData:
 * struct UI_SCRIPT_EVENT
 * {
 *   alignas(8) eUIScriptEventType eventType; // https://alloc8or.re/rdr3/doc/enums/eUIScriptEventType.txt
 *   alignas(8) int intParam;
 *   alignas(8) Hash hashParam;
 *   alignas(8) Hash datastoreParam;
 * };
 * 
 * Old name: _EVENT_MANAGER_GET_EVENT
 *
 * @param {number} hash
 * @param {DataView} eventData
 * @return {boolean}
 */
declare function EventsUiGetMessage(hash: Hash, eventData: DataView): boolean;

/**
 * EVENTS_UI_IS_PENDING
 * Old name: _EVENT_MANAGER_IS_EVENT_PENDING
 *
 * @param {number} hash
 * @return {boolean}
 */
declare function EventsUiIsPending(hash: Hash): boolean;

/**
 * EVENTS_UI_PEEK_MESSAGE
 * eventData: see EVENTS_UI_GET_MESSAGE
 * 
 * Old name: _EVENT_MANAGER_PEEK_EVENT
 *
 * @param {number} hash
 * @param {DataView} eventData
 * @return {boolean}
 */
declare function EventsUiPeekMessage(hash: Hash, eventData: DataView): boolean;

/**
 * EVENTS_UI_POP_MESSAGE
 * Old name: _EVENT_MANAGER_POP_EVENT
 *
 * @param {number} hash
 * @return {void}
 */
declare function EventsUiPopMessage(hash: Hash): void;