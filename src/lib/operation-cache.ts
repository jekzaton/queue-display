import type { OperationQueueItem } from "@/types/operation";

type CacheData = {
  data: OperationQueueItem[];
  expiresAt: number;
};

let operationCache: CacheData | null = null;

export function getOperationCache(): OperationQueueItem[] | null {
  if (!operationCache) {
    return null;
  }

  if (Date.now() >= operationCache.expiresAt) {
    operationCache = null;
    return null;
  }

  return operationCache.data;
}

export function setOperationCache(
  data: OperationQueueItem[],
  ttlSeconds = 5,
): void {
  operationCache = {
    data,
    expiresAt: Date.now() + ttlSeconds * 1000,
  };
}
