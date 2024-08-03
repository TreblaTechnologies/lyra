import { TimeDurations } from "../../enums/time-duration.enum";

describe("TimeDurations Enum", () => {
  it("should have correct values", () => {
    expect(TimeDurations.HalfSecond).toBe(500);
    expect(TimeDurations.OneMinute).toBe(60000);
    expect(TimeDurations.TwoMinutes).toBe(120000);
    expect(TimeDurations.FiveMinutes).toBe(300000);
    expect(TimeDurations.OneDay).toBe(86400000);
  });
});
