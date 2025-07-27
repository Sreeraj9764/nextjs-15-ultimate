import { ActionResponse } from "../../../types/global";
import { RequestError } from "../http-errors";
import logger from "../logger";
import handleError from "./error";

interface FetchOptions extends RequestInit {
  timeOut?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeOut = 5000,
    headers: customHeaders = {},
    ...restOptions
  } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeOut);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = {
    ...defaultHeaders,
    ...customHeaders,
  };

  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new RequestError(
        response.status,
        `HTTP ERROR: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown error occurred");
    if (error.name === "AbortError") {
      logger.error(`Request to ${url} timed out`);
    } else {
      logger.error(`Error fetching data from ${url}: ${error.message}`);
    }
    return handleError(error, "api") as ActionResponse<T>;
  } finally {
    clearTimeout(timeoutId);
  }
}
