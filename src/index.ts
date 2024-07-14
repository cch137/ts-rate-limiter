class RateLog {
  readonly timestamp = Date.now();
  readonly points: number;
  constructor(points: number) {
    this.points = points;
  }
}

class RateRecord {
  readonly id: string;
  logs: RateLog[] = [];

  constructor(id: string) {
    this.id = id;
  }

  get points() {
    return this.trim().logs.reduce((prev, curr) => prev + curr.points, 0);
  }

  trim(expireTimestamp: number = Date.now()) {
    this.logs = this.logs
      .splice(0)
      .filter((i) => i.timestamp > expireTimestamp);
    return this;
  }

  in(milliseconds: number, now: number = Date.now()): number {
    const beforeAt = now - milliseconds;
    let i = 0;
    for (const log of this.logs) if (log.timestamp > beforeAt) i += log.points;
    return i;
  }
}

class RateRule {
  readonly milliseconds: number;
  readonly maxPoints: number;

  constructor(milliseconds: number, maxPoints: number) {
    if (milliseconds < 0) throw new Error("milliseconds must be positive");
    if (maxPoints < 0) throw new Error("maxPoints must be positive");
    this.milliseconds = milliseconds;
    this.maxPoints = maxPoints;
  }
}

export default class RateLimiter {
  static rule(milliseconds: number, maxPoints: number) {
    return new RateRule(milliseconds, maxPoints);
  }

  constructor(rules: RateRule[]) {
    this.rules = Object.freeze([...rules]);
    this.maxMilliseconds = rules.reduce((prev, curr) => {
      if (curr.milliseconds > prev) return curr.milliseconds;
      return prev;
    }, 0);
  }

  readonly rules: Readonly<RateRule[]>;
  readonly maxMilliseconds: number;
  readonly records = new Map<string, RateRecord>();

  get expireTimestamp() {
    return Date.now() - this.maxMilliseconds;
  }

  private trimCD = 0;

  check(id: string) {
    if (++this.trimCD > this.records.size) this.trim();
    const record = this.records.get(id);
    if (!record) return true;
    for (const { milliseconds, maxPoints } of this.rules) {
      if (record.in(milliseconds) > maxPoints) return false;
    }
    return true;
  }

  consume(id: string, points: number = 1) {
    const record =
      this.records.get(id) || this.records.set(id, new RateRecord(id)).get(id);
    record?.logs.push(new RateLog(points));
    return this;
  }

  trim() {
    this.trimCD = 0;
    const records = [...this.records.values()];
    const ts = this.expireTimestamp;
    for (const record of records) {
      record.trim(ts);
      if (record.logs.length === 0) this.records.delete(record.id);
    }
  }
}
