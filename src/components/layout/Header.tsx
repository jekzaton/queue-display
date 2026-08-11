"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Clock3,
  Expand,
  Minimize,
  Wifi,
  WifiOff,
} from "lucide-react";

interface HeaderProps {
  thaiDate: string;
  thaiTime: string;
  connected: boolean;
  lastUpdated?: Date | null;
  hospitalName?: string;
  provinceName?: string;
  title?: string;
  logoSrc?: string;
}

export default function Header({
  thaiDate,
  thaiTime,
  connected,
  lastUpdated = null,
  hospitalName = "โรงพยาบาลยางตลาด",
  provinceName = "จังหวัดกาฬสินธุ์",
  title = "ระบบแสดงสถานะผู้รับบริการห้องผ่าตัด",
  logoSrc = "/images/yth-logo.png",
}: HeaderProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const updatedTime = lastUpdated
    ? lastUpdated.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Bangkok",
      })
    : "--:--:--";

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  return (
    <header
      className="
        relative
        mb-2
        w-full
        shrink-0
        overflow-hidden
        rounded-2xl
        border border-white/20
        bg-linear-to-br
        from-cyan-700
        via-blue-700
        to-indigo-900
        text-white
        shadow-2xl

        sm:mb-3
        sm:rounded-3xl

        lg:mb-4

        min-[2560px]:rounded-4xl
      "
    >
      {/* Background */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl min-[2560px]:h-120 min-[2560px]:w-120" />

      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl min-[2560px]:h-120 min-[2560px]:w-120" />

      {/* Content */}
      <div
        className="
          relative
          p-3
          sm:p-4
          lg:p-5
          2xl:p-6
          min-[2560px]:p-8
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4

            xl:flex-row
            xl:items-center
            xl:justify-between

            min-[2560px]:gap-8
          "
        >
          {/* LEFT */}
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4 lg:gap-5 min-[2560px]:gap-7">
            {/* Logo */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-3xl bg-cyan-300/30 blur-xl" />

              <div
                className="
                  relative
                  flex
                  h-16 w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border border-white/80
                  bg-white
                  p-1.5
                  shadow-2xl

                  sm:h-20 sm:w-20 sm:rounded-3xl sm:p-2

                  lg:h-24 lg:w-24

                  2xl:h-28 2xl:w-28

                  min-[2560px]:h-36
                  min-[2560px]:w-36
                  min-[2560px]:rounded-4xl
                  min-[2560px]:p-3
                "
              >
                <img
                  src={logoSrc}
                  alt={hospitalName}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Hospital info */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 min-[2560px]:gap-3">
                <span
                  className="
                    inline-flex
                    rounded-full
                    border border-cyan-300/30
                    bg-cyan-300/10
                    px-3 py-1
                    text-xs
                    font-semibold
                    text-cyan-100
                    backdrop-blur

                    sm:text-sm

                    2xl:text-base

                    min-[2560px]:px-5
                    min-[2560px]:py-2
                    min-[2560px]:text-xl
                  "
                >
                  YTH Operation Room
                </span>

                <span className="hidden h-1 w-1 rounded-full bg-cyan-300 sm:block" />

                <p
                  className="
                    truncate
                    text-sm
                    font-medium
                    text-cyan-100

                    sm:text-base
                    lg:text-lg
                    2xl:text-xl
                    min-[2560px]:text-2xl
                  "
                >
                  {hospitalName} {provinceName}
                </p>
              </div>

              <h1
                className="
                  mt-1
                  text-2xl
                  font-black
                  leading-tight
                  tracking-tight

                  sm:mt-2
                  sm:text-3xl

                  lg:text-4xl

                  2xl:text-5xl

                  min-[2560px]:mt-3
                  min-[2560px]:text-6xl
                "
              >
                {title}
              </h1>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-blue-100

                  sm:text-base

                  lg:mt-3
                  lg:text-lg

                  2xl:text-xl

                  min-[2560px]:mt-5
                  min-[2560px]:gap-3
                  min-[2560px]:text-2xl
                "
              >
                <div
                  className="
                    flex
                    h-6 w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/10

                    min-[2560px]:h-10
                    min-[2560px]:w-10
                    min-[2560px]:rounded-xl
                  "
                >
                  <Activity className="h-4 w-4 min-[2560px]:h-6 min-[2560px]:w-6" />
                </div>

                <span className="truncate">
                  ข้อมูลการรับบริการห้องผ่าตัด วันที่{" "}
                  <strong className="font-bold text-white">
                    {thaiDate || "กำลังโหลดวันที่..."}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              grid
              shrink-0
              gap-2

              sm:grid-cols-2
              sm:gap-3

              xl:flex
              xl:items-stretch

              min-[2560px]:gap-5
            "
          >
            {/* CLOCK */}
            <section
              className="
                rounded-2xl
                border border-white/15
                bg-white/10
                px-4 py-3
                shadow-xl
                backdrop-blur-xl

                sm:px-5 sm:py-4

                xl:min-w-55

                2xl:min-w-64

                min-[2560px]:min-w-90
                min-[2560px]:rounded-3xl
                min-[2560px]:px-7
                min-[2560px]:py-6
              "
            >
              <div className="flex h-full items-center gap-3 min-[2560px]:gap-5">
                <div
                  className="
                    flex
                    h-11 w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border border-white/10
                    bg-white/10

                    sm:h-12 sm:w-12

                    2xl:h-14 2xl:w-14

                    min-[2560px]:h-18
                    min-[2560px]:w-18
                    min-[2560px]:rounded-2xl
                  "
                >
                  <Clock3 className="h-6 w-6 text-cyan-100 sm:h-7 sm:w-7 2xl:h-8 2xl:w-8 min-[2560px]:h-10 min-[2560px]:w-10" />
                </div>

                <div>
                  <p className="text-xs font-medium text-blue-100 sm:text-sm 2xl:text-base min-[2560px]:text-xl">
                    เวลาปัจจุบัน
                  </p>

                  <p
                    className="
                      whitespace-nowrap
                      text-2xl
                      font-black
                      tracking-wide
                      tabular-nums

                      sm:text-3xl

                      2xl:text-4xl

                      min-[2560px]:text-5xl
                    "
                  >
                    {thaiTime || "--:--:--"}

                    <span className="ml-1 text-base font-semibold text-blue-100 2xl:text-xl min-[2560px]:text-2xl">
                      น.
                    </span>
                  </p>
                </div>
              </div>
            </section>

            {/* CONNECTION */}
            <section
              className={[
                `
                rounded-2xl
                border
                px-4 py-3
                shadow-xl
                backdrop-blur-xl

                sm:px-5 sm:py-4

                xl:min-w-60

                2xl:min-w-72

                min-[2560px]:min-w-100
                min-[2560px]:rounded-3xl
                min-[2560px]:px-7
                min-[2560px]:py-6
                `,
                connected
                  ? "border-emerald-300/30 bg-emerald-500/90"
                  : "border-rose-300/30 bg-rose-500/90",
              ].join(" ")}
            >
              <div className="flex h-full items-center gap-3 min-[2560px]:gap-5">
                <div
                  className="
                    relative
                    flex
                    h-11 w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/15

                    sm:h-12 sm:w-12

                    2xl:h-14 2xl:w-14

                    min-[2560px]:h-18
                    min-[2560px]:w-18
                    min-[2560px]:rounded-2xl
                  "
                >
                  {connected ? (
                    <>
                      <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-white min-[2560px]:h-4 min-[2560px]:w-4" />

                      <Wifi className="h-6 w-6 sm:h-7 sm:w-7 2xl:h-8 2xl:w-8 min-[2560px]:h-10 min-[2560px]:w-10" />
                    </>
                  ) : (
                    <WifiOff className="h-6 w-6 sm:h-7 sm:w-7 2xl:h-8 2xl:w-8 min-[2560px]:h-10 min-[2560px]:w-10" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold sm:text-base 2xl:text-lg min-[2560px]:text-2xl">
                    {connected ? "ระบบเชื่อมต่อปกติ" : "ไม่สามารถเชื่อมต่อระบบ"}
                  </p>

                  <p className="truncate text-xs text-white/80 sm:text-sm 2xl:text-base min-[2560px]:text-xl">
                    อัปเดตล่าสุด {updatedTime} น.
                  </p>
                </div>
              </div>
            </section>

            {/* FULLSCREEN */}
            <button
              type="button"
              onClick={toggleFullscreen}
              title={isFullscreen ? "ออกจากโหมดเต็มหน้าจอ" : "แสดงเต็มหน้าจอ"}
              className="
                group
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                border border-white/15
                bg-white/10
                px-4 py-3
                font-bold
                text-white
                shadow-xl
                backdrop-blur-xl
                transition
                duration-200

                hover:bg-white/20

                active:scale-[0.98]

                sm:px-5 sm:py-4

                xl:min-w-38

                2xl:min-w-44

                min-[2560px]:min-w-64
                min-[2560px]:gap-5
                min-[2560px]:rounded-3xl
                min-[2560px]:px-7
                min-[2560px]:py-6
              "
            >
              <div
                className="
                  flex
                  h-10 w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/10

                  2xl:h-12
                  2xl:w-12

                  min-[2560px]:h-16
                  min-[2560px]:w-16
                  min-[2560px]:rounded-2xl
                "
              >
                {isFullscreen ? (
                  <Minimize className="h-5 w-5 2xl:h-7 2xl:w-7 min-[2560px]:h-9 min-[2560px]:w-9" />
                ) : (
                  <Expand className="h-5 w-5 2xl:h-7 2xl:w-7 min-[2560px]:h-9 min-[2560px]:w-9" />
                )}
              </div>

              <div className="text-left">
                <p className="text-xs font-medium text-blue-100 2xl:text-sm min-[2560px]:text-lg">
                  Display
                </p>

                <p className="whitespace-nowrap text-sm font-bold sm:text-base 2xl:text-lg min-[2560px]:text-2xl">
                  {isFullscreen ? "ออกเต็มจอ" : "เต็มหน้าจอ"}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="h-1 bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 min-[2560px]:h-2" />
    </header>
  );
}
