# @cch137/rate-limiter

## Overview

`@cch137/rate-limiter` is a module designed to help manage rate limiting for various applications. It allows you to define rules for how many points an identifier (e.g., a user or an IP address) can accumulate within a specified time window. The `RateLimiter` class is the primary export of this module.

## Installation

You can install the `@cch137/rate-limiter` module via npm:

```sh
npm install @cch137/rate-limiter
```

## Usage

Here's a basic example to get you started with the `RateLimiter` class.

```javascript
import RateLimiter from "@cch137/rate-limiter";

// Create a rate limiter with a rule that allows a maximum of 5 points per second
const rl = new RateLimiter([RateLimiter.rule(1000, 5)]);

// Consume points for identifier "a"
rl.consume("a", 5);
rl.consume("a", 5);

// Check if identifier "a" exceeds the rate limit
console.log(rl.check("a")); // false, because 10 points are consumed within 1 second

// Check again after 900 milliseconds
setTimeout(() => console.log(rl.check("a")), 900); // false, because 10 points are still within 1 second

// Check after 1000 milliseconds
setTimeout(() => console.log(rl.check("a")), 1000); // true, because the initial points are now outside the 1-second window

// Check after 1100 milliseconds
setTimeout(() => console.log(rl.check("a")), 1100); // true, because the points are outside the 1-second window

// Log the current state of the rate limiter
setTimeout(() => console.log(rl), 1200);
```

## API

### `RateLimiter`

#### `constructor(rules: RateRule[])`

Creates a new `RateLimiter` instance with the specified rules.

- `rules`: An array of `RateRule` objects defining the rate limiting rules.

#### `static rule(milliseconds: number, maxPoints: number): RateRule`

Creates a new `RateRule` instance.

- `milliseconds`: The time window in milliseconds.
- `maxPoints`: The maximum points allowed within the specified time window.

#### `check(id: string): boolean`

Checks if the given identifier is within the rate limit based on the defined rules.

- `id`: The identifier to check (e.g., a user ID or IP address).
- Returns `true` if the identifier is within the rate limit, `false` otherwise.

#### `consume(id: string, points: number = 1): this`

Consumes points for the given identifier. If the identifier does not exist, it is created.

- `id`: The identifier to consume points for.
- `points`: The number of points to consume (default is 1).
- Returns the `RateLimiter` instance for chaining.

#### `trim()`

Trims expired logs from all records based on the maximum time window defined in the rules.
