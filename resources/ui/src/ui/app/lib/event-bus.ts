const EventBus = {
  on<T>(event: string, callback: Function) {
    window.addEventListener(event, (e: MessageEvent<T>) => callback(e));
  },
  dispatch(event: string, data?: any) {
    document.dispatchEvent(new CustomEvent<any>(event, { detail: data }));
  },
  off(event: string, callback: Function) {
    window.removeEventListener(event, callback);
  },
};
export default EventBus;
