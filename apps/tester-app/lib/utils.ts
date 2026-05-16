import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCoins(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

export function createAppSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return "00000000-0000-4000-8000-000000000000";
}

export function createDeviceFingerprint() {
  if (typeof navigator === "undefined" || typeof screen === "undefined") {
    return "server-fixture-device";
  }

  const source = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth
  ].join("|");

  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash << 5) - hash + source.charCodeAt(index);
    hash |= 0;
  }

  return `web-${Math.abs(hash).toString(36)}`;
}
