export class EventEmitter {
  constructor() {
    this.listeners = [];
  }

  getSubscriptionIndex(event, cb) {
    return this.listeners.findIndex((listener) => {
      const [registeredEvent, registeredCb] = listener;
      return event === registeredEvent && cb === registeredCb;
    });
  }

  subscribe(event, cb) {
    if (this.getSubscriptionIndex(event, cb) === -1) {
      this.listeners.push([event, cb]);
    }
  }

  subscribeAll(cb) {
    this.subscribe("*", cb);
  }

  unsubscribe(event, cb) {
    const index = this.getSubscriptionIndex(event, cb);

    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }

  emit(event, ...params) {
    console.log(`Event ${event} emitted`, params);

    for (const listener of this.listeners) {
      const [registeredEvent, cb] = listener;
      if (event === registeredEvent || registeredEvent === "*") {
        cb(event, ...params);
      }
    }
  }
}
