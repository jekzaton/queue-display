"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import type { OperationQueueItem } from "@/types/operation";
import OperationFooter from "./OperationFooter";
import OperationTable from "./OperationTable";
import Header from "../layout/Header";

interface OperationApiResponse {
  success: boolean;
  source?: "his" | "cache";
  total?: number;
  data?: OperationQueueItem[];
  serverTime?: string;
  message?: string;
}

export default function OperationBoard() {
  const [items, setItems] = useState<OperationQueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadOperations = useCallback(async () => {
    try {
      const response = await fetch("/api/operations", {
        method: "GET",
        cache: "no-store",
      });

      const result = (await response.json()) as OperationApiResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "โหลดข้อมูลไม่สำเร็จ");
      }

      setItems(result.data ?? []);
      setConnected(true);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Load operation error:", error);
      setConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadOperations();

    const refreshTimer = window.setInterval(() => {
      void loadOperations();
    }, 5_000);

    return () => {
      window.clearInterval(refreshTimer);
    };
  }, [loadOperations]);

  useEffect(() => {
    setCurrentTime(new Date());

    const clockTimer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1_000);

    return () => {
      window.clearInterval(clockTimer);
    };
  }, []);

  const thaiDate = useMemo(() => {
    if (!currentTime) return "";

    return new Intl.DateTimeFormat("th-TH", {
      dateStyle: "full",
      timeZone: "Asia/Bangkok",
    }).format(currentTime);
  }, [currentTime]);

  const thaiTime = useMemo(() => {
    if (!currentTime) return "--:--:--";

    return new Intl.DateTimeFormat("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Bangkok",
    }).format(currentTime);
  }, [currentTime]);

  return (
    <main className="min-h-dvh w-full overflow-x-hidden bg-linear-to-br from-cyan-50 via-slate-50 to-blue-100">
      <div
        className="
          flex min-h-dvh w-full flex-col

          p-2
          sm:p-3
          lg:p-4
          xl:p-5
          2xl:p-6

          min-[2560px]:p-7
          min-[3200px]:p-8
        "
      >
        <Header
          thaiDate={thaiDate}
          thaiTime={thaiTime}
          connected={connected}
          lastUpdated={lastUpdated}
        />

        <section className="min-h-0 w-full flex-1">
          {loading ? (
            <div className="flex h-full min-h-100 w-full items-center justify-center rounded-3xl border border-white bg-white/95 shadow-xl">
              <div className="text-center">
                <RefreshCw
                  className="
                    mx-auto h-12 w-12 animate-spin text-blue-600
                    lg:h-16 lg:w-16
                    2xl:h-20 2xl:w-20
                    min-[2560px]:h-24
                    min-[2560px]:w-24
                  "
                />

                <p
                  className="
                    mt-5 text-xl font-bold text-slate-700
                    lg:text-2xl
                    2xl:text-3xl
                    min-[2560px]:text-4xl
                  "
                >
                  กำลังโหลดข้อมูล...
                </p>
              </div>
            </div>
          ) : (
            <OperationTable items={items} />
          )}
        </section>

        <div
          className="
            mt-auto w-full
            pt-2
            lg:pt-3
            2xl:pt-4
            min-[2560px]:pt-5
          "
        >
          <OperationFooter
            totalItems={items.length}
            lastUpdated={lastUpdated}
            loading={loading}
            connected={connected}
            developerName="TonThanatnin"
            version="1.0.0"
          />
        </div>
      </div>
    </main>
  );
}
