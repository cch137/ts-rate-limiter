import RateLimiter from "./index.js";

const rl = new RateLimiter([RateLimiter.rule(1000, 5)]);

rl.consume("a", 5);
rl.consume("a", 5);

console.log(rl.check("a"));

setTimeout(() => console.log(rl.check("a")), 900);
setTimeout(() => console.log(rl.check("a")), 1000);
setTimeout(() => console.log(rl.check("a")), 1100);
setTimeout(() => console.log(rl), 1200);
