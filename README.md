# @cch137/emitter

## Overview

`@cch137/emitter` is a versatile event emitter package designed to work seamlessly in both browser and Node.js environments. It provides a simple yet powerful interface for managing event-driven architecture in your applications.

## Features

- **Cross-Platform Compatibility**: Works in both browser and Node.js environments.
- **Flexible Event Management**: Easily manage listeners for different event types.
- **One-Time Event Listeners**: Support for listeners that are automatically removed after their first invocation.
- **Event Emission**: Emit events with any number of arguments.
- **Listener Removal**: Remove specific listeners or clear all listeners for an event.

## Usage

### Creating an Emitter

```typescript
import Emitter from "@cch137/emitter";

type MyEvents = {
  event1: [string, number];
  event2: [boolean];
};

const emitter = new Emitter<MyEvents>();
```

### Adding Listeners

#### Regular Listeners

```typescript
emitter.on("event1", (arg1, arg2) => {
  console.log(`event1 received with args: ${arg1}, ${arg2}`);
});
```

#### One-Time Listeners

```typescript
emitter.once("event2", (arg1) => {
  console.log(`event2 received with arg: ${arg1}`);
});
```

### Emitting Events

```typescript
emitter.emit("event1", "hello", 42); // Logs: event1 received with args: hello, 42
emitter.emit("event2", true); // Logs: event2 received with arg: true
```

### Removing Listeners

```typescript
const listener = (arg1, arg2) => {
  console.log(`event1 received with args: ${arg1}, ${arg2}`);
};

emitter.on("event1", listener);
emitter.off("event1", listener);
```

### Clearing All Listeners for an Event

```typescript
emitter.clear("event1");
```
