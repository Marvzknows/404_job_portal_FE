import { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  formatDate,
  formatDistanceToNow,
  formatLabel,
  formatSalary,
  formatSize,
  formatToPesos,
  getErrorMessage,
  timeAgo,
} from "./helpers";
import { ApiErrorResponse } from "@/lib/axios";

// #region formatSalary
describe("formatSalary", () => {
  it("formats min and max salary with PHP currency", () => {
    expect(formatSalary("50000", "100000")).toBe("₱50,000 – ₱100,000");
  });

  it("handles small numbers", () => {
    expect(formatSalary("1000", "2000")).toBe("₱1,000 – ₱2,000");
  });

  it("handles large salary values", () => {
    expect(formatSalary("100000", "500000")).toBe("₱100,000 – ₱500,000");
  });

  it("rounds down decimal values (maximumFractionDigits: 0)", () => {
    expect(formatSalary("30000.75", "50000.49")).toBe("₱30,001 – ₱50,000");
  });
});
// #endregion formatSalary

// #region formatToPesos
describe("formatToPesos", () => {
  it("formats a number as PHP currency", () => {
    expect(formatToPesos(15000)).toBe("₱15,000");
  });

  it("formats zero", () => {
    expect(formatToPesos(0)).toBe("₱0");
  });

  it("formats large numbers with commas", () => {
    expect(formatToPesos(1000000)).toBe("₱1,000,000");
  });

  it("rounds decimals (maximumFractionDigits: 0)", () => {
    expect(formatToPesos(999.9)).toBe("₱1,000");
  });
});
// #endregion formatToPesos

// #region formatDate
describe("formatDate", () => {
  it("formats a date string to long US format", () => {
    expect(formatDate("2024-01-15")).toBe("January 15, 2024");
  });

  it("formats another valid date string", () => {
    expect(formatDate("2023-12-31")).toBe("December 31, 2023");
  });

  it("handles ISO datetime strings", () => {
    expect(formatDate("2024-06-01T00:00:00.000Z")).toMatch(/June \d+, 2024/);
  });
});
// #endregion

// #region formatLabel
describe("formatLabel", () => {
  it("replaces underscores with spaces and capitalizes words", () => {
    expect(formatLabel("full_time")).toBe("Full Time");
  });

  it("handles single word", () => {
    expect(formatLabel("remote")).toBe("Remote");
  });

  it("handles multiple underscores", () => {
    expect(formatLabel("work_from_home")).toBe("Work From Home");
  });

  it("handles already capitalized input", () => {
    expect(formatLabel("Full_Time")).toBe("Full Time");
  });

  it("handles empty string", () => {
    expect(formatLabel("")).toBe("");
  });
});
// #endregion formatLabel

// #region formatSize
describe("formatSize", () => {
  it("formats bytes less than 1 MB as KB", () => {
    expect(formatSize(512 * 1024)).toBe("512 KB");
  });

  it("formats bytes equal to or more than 1 MB as MB", () => {
    expect(formatSize(1024 * 1024)).toBe("1.0 MB");
  });

  it("formats 2.5 MB correctly", () => {
    expect(formatSize(2.5 * 1024 * 1024)).toBe("2.5 MB");
  });

  it("formats small byte count as KB", () => {
    expect(formatSize(2048)).toBe("2 KB");
  });
});
// #endregion formatSize

// #region timeAgo
describe("timeAgo", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-06-10T12:00:00.000Z").getTime());
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns "Today" for dates within the same day', () => {
    expect(timeAgo("2024-06-10T08:00:00.000Z")).toBe("Today");
  });

  it('returns "Yesterday" for dates exactly 1 day ago', () => {
    expect(timeAgo("2024-06-09T12:00:00.000Z")).toBe("Yesterday");
  });

  it("returns N days ago for older dates", () => {
    expect(timeAgo("2024-06-07T12:00:00.000Z")).toBe("3 days ago");
  });
});
// #endregion timeAgo

// #region formatDistanceToNow
describe("formatDistanceToNow", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns "just now" for less than 60 seconds ago', () => {
    const date = new Date(Date.now() - 30 * 1000);
    expect(formatDistanceToNow(date)).toBe("just now");
  });

  it("returns singular minute", () => {
    const date = new Date(Date.now() - 60 * 1000);
    expect(formatDistanceToNow(date)).toBe("1 minute ago");
  });

  it("returns plural minutes", () => {
    const date = new Date(Date.now() - 5 * 60 * 1000);
    expect(formatDistanceToNow(date)).toBe("5 minutes ago");
  });

  it("returns singular hour", () => {
    const date = new Date(Date.now() - 60 * 60 * 1000);
    expect(formatDistanceToNow(date)).toBe("1 hour ago");
  });

  it("returns plural hours", () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000);
    expect(formatDistanceToNow(date)).toBe("3 hours ago");
  });

  it("returns singular day", () => {
    const date = new Date(Date.now() - 24 * 60 * 60 * 1000);
    expect(formatDistanceToNow(date)).toBe("1 day ago");
  });

  it("returns plural days", () => {
    const date = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    expect(formatDistanceToNow(date)).toBe("10 days ago");
  });

  it("returns singular month", () => {
    const date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    expect(formatDistanceToNow(date)).toBe("1 month ago");
  });

  it("returns plural months", () => {
    const date = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    expect(formatDistanceToNow(date)).toBe("2 months ago");
  });

  it("returns singular year", () => {
    const date = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    expect(formatDistanceToNow(date)).toBe("1 year ago");
  });

  it("returns plural years", () => {
    const date = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000);
    expect(formatDistanceToNow(date)).toBe("2 years ago");
  });
});
// #endregion formatDistanceToNow

// #region getErrorMessage
const makeAxiosError = (data?: object): AxiosError<ApiErrorResponse> => {
  const error = new AxiosError(
    "Request failed",
  ) as AxiosError<ApiErrorResponse>;

  error.response = {
    data: data as ApiErrorResponse,
    status: 422,
    statusText: "Unprocessable Entity",
    headers: {},
    config: {} as InternalAxiosRequestConfig,
  };

  return error;
};
// #endregion getErrorMessage

describe("getErrorMessage", () => {
  it("returns the first field error from errors object", () => {
    const error = makeAxiosError({
      errors: { email: ["Email is invalid", "Email is taken"] },
      message: "Validation failed",
    });
    expect(getErrorMessage(error)).toBe("Email is invalid");
  });

  it("returns the data.message if no errors object", () => {
    const error = makeAxiosError({ message: "Unauthorized" });
    expect(getErrorMessage(error)).toBe("Unauthorized");
  });

  it("returns the fallback message if no data.message and no errors", () => {
    const error = makeAxiosError({});
    expect(getErrorMessage(error, "Custom fallback")).toBe("Custom fallback");
  });

  it('returns "Something went wrong." if nothing is available', () => {
    const error = makeAxiosError({});
    expect(getErrorMessage(error)).toBe("Something went wrong.");
  });

  it("returns the first error across multiple fields", () => {
    const error = makeAxiosError({
      errors: {
        name: ["Name is required"],
        email: ["Email is invalid"],
      },
    });
    // Object.values order is insertion order
    expect(getErrorMessage(error)).toBe("Name is required");
  });

  it("handles missing response data gracefully using fallback", () => {
    const error = new AxiosError(
      "Network Error",
    ) as AxiosError<ApiErrorResponse>;
    expect(getErrorMessage(error, "Network error occurred")).toBe(
      "Network error occurred",
    );
  });
});
