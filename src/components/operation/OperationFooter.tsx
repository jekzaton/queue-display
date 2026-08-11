import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  Heart,
  RefreshCw,
} from "lucide-react";

interface OperationFooterProps {
  totalItems: number;
  lastUpdated?: Date | null;
  loading?: boolean;
  connected?: boolean;
  developerName?: string;
  version?: string;
}

export default function OperationFooter({
  totalItems,
  lastUpdated = null,
  loading = false,
  connected = true,
  developerName = "TonThanatnin",
  version = "1.0.0",
}: OperationFooterProps) {
  const updatedTime = lastUpdated
    ? lastUpdated.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Bangkok",
      })
    : "--:--:--";

  const currentYear = 2026;

  return (
    <footer className="w-full shrink-0 overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-xl backdrop-blur-xl sm:rounded-3xl min-[2560px]:rounded-4xl">
      <div className="flex flex-col gap-3 px-4 py-3 sm:px-5 sm:py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6 2xl:px-7 min-[2560px]:gap-6 min-[2560px]:px-10 min-[2560px]:py-6">
        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-4 min-[2560px]:gap-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl lg:h-14 lg:w-14 min-[2560px]:h-18 min-[2560px]:w-18 min-[2560px]:rounded-3xl">
            <Clock3 className="h-5 w-5 text-blue-700 sm:h-6 sm:w-6 lg:h-7 lg:w-7 min-[2560px]:h-10 min-[2560px]:w-10" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-800 sm:text-base lg:text-lg 2xl:text-xl min-[2560px]:text-3xl">
              กรุณารอติดตามสถานะบนหน้าจอ
            </p>

            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 sm:text-sm lg:text-base min-[2560px]:mt-2 min-[2560px]:text-xl">
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 shrink-0 animate-spin text-blue-600 min-[2560px]:h-6 min-[2560px]:w-6" />
                  <span>กำลังอัปเดตข้อมูล...</span>
                </>
              ) : connected ? (
                <>
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 min-[2560px]:h-6 min-[2560px]:w-6" />
                  <span>อัปเดตล่าสุด {updatedTime} น.</span>
                </>
              ) : (
                <>
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-rose-500 min-[2560px]:h-4 min-[2560px]:w-4" />
                  <span className="font-medium text-rose-600">
                    ไม่สามารถเชื่อมต่อข้อมูลได้
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT - TOTAL */}
        <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-blue-100 bg-linear-to-r from-blue-50 via-cyan-50 to-indigo-50 px-4 py-3 shadow-sm sm:px-5 min-[2560px]:gap-5 min-[2560px]:rounded-3xl min-[2560px]:px-8 min-[2560px]:py-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-cyan-600 to-blue-700 shadow-md shadow-blue-200 sm:h-12 sm:w-12 lg:h-14 lg:w-14 min-[2560px]:h-18 min-[2560px]:w-18 min-[2560px]:rounded-2xl">
            <CalendarDays className="h-5 w-5 text-white sm:h-6 sm:w-6 lg:h-7 lg:w-7 min-[2560px]:h-10 min-[2560px]:w-10" />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 sm:text-sm lg:text-base min-[2560px]:text-xl">
              จำนวนรายการวันนี้
            </p>

            <div className="flex items-end gap-2 min-[2560px]:gap-3">
              <strong className="text-3xl font-black leading-none tabular-nums text-blue-700 lg:text-4xl min-[2560px]:text-6xl">
                {totalItems}
              </strong>

              <span className="pb-0.5 text-sm font-semibold text-slate-600 sm:text-base lg:text-lg min-[2560px]:text-2xl">
                รายการ
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 min-[2560px]:h-2" />

      {/* CREDIT */}
      <div className="bg-slate-950 px-4 py-2.5 sm:px-6 sm:py-3 min-[2560px]:px-10 min-[2560px]:py-5">
        <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left min-[2560px]:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:justify-start sm:text-sm lg:text-base min-[2560px]:gap-3 min-[2560px]:text-xl">
            <Code2 className="h-4 w-4 text-cyan-400 lg:h-5 lg:w-5 min-[2560px]:h-7 min-[2560px]:w-7" />

            <span className="text-slate-400">Developed with</span>

            <Heart className="h-4 w-4 fill-rose-500 text-rose-500 lg:h-5 lg:w-5 min-[2560px]:h-7 min-[2560px]:w-7" />

            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-sm font-black tracking-wide text-transparent sm:text-base lg:text-lg min-[2560px]:text-2xl">
              {developerName}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500 sm:justify-end sm:text-xs lg:text-sm min-[2560px]:gap-3 min-[2560px]:text-lg">
            <span>YTH Operation Queue Display</span>

            <span className="h-1 w-1 rounded-full bg-slate-600 min-[2560px]:h-1.5 min-[2560px]:w-1.5" />

            <span>Version {version}</span>

            <span className="h-1 w-1 rounded-full bg-slate-600 min-[2560px]:h-1.5 min-[2560px]:w-1.5" />

            <span>© {currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
