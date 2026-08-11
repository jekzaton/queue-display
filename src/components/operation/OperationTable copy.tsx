import {
  CalendarDays,
  Building2,
  Hospital,
  Stethoscope,
  UserRound,
} from "lucide-react";

import OperationStatusBadge from "./OperationStatusBadge";
import { formatPatientName } from "@/lib/mask-patient-name";
import type { OperationQueueItem } from "@/types/operation";

interface OperationTableProps {
  items: OperationQueueItem[];
}

function EmptyOperation() {
  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 shadow-inner sm:h-24 sm:w-24 2xl:h-28 2xl:w-28 min-[2560px]:h-36 min-[2560px]:w-36">
        <CalendarDays className="h-10 w-10 text-slate-300 sm:h-12 sm:w-12 2xl:h-14 2xl:w-14 min-[2560px]:h-20 min-[2560px]:w-20" />
      </div>

      <h2 className="mt-5 text-2xl font-black text-slate-700 sm:text-3xl 2xl:text-4xl min-[2560px]:text-5xl">
        ยังไม่มีรายการวันนี้
      </h2>

      <p className="mt-2 text-sm text-slate-500 sm:text-base 2xl:text-xl min-[2560px]:text-2xl">
        เมื่อมีรายการใหม่ ระบบจะแสดงข้อมูลบนหน้าจอโดยอัตโนมัติ
      </p>
    </div>
  );
}

function DesktopTable({ items }: OperationTableProps) {
  return (
    <div className="hidden w-full overflow-hidden lg:block">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-linear-to-r from-cyan-700 via-blue-700 to-indigo-800 text-white">
            <th className="w-[7%] px-2 py-3 text-center text-base font-bold lg:text-lg xl:text-xl 2xl:py-5 2xl:text-2xl min-[2560px]:py-7 min-[2560px]:text-3xl">
              ลำดับ
            </th>

            <th className="w-[17%] px-3 py-3 text-center text-base font-bold lg:text-lg xl:text-xl 2xl:py-5 2xl:text-2xl min-[2560px]:text-3xl">
              สถานะ
            </th>

            <th className="w-[23%] px-4 py-3 text-left text-base font-bold lg:text-lg xl:text-xl 2xl:py-5 2xl:text-2xl min-[2560px]:text-3xl">
              ชื่อ-สกุล
            </th>

            <th className="w-[21%] px-4 py-3 text-left text-base font-bold lg:text-lg xl:text-xl 2xl:py-5 2xl:text-2xl min-[2560px]:text-3xl">
              แพทย์ผู้สั่ง
            </th>

            <th className="w-[15%] px-4 py-3 text-left text-base font-bold lg:text-lg xl:text-xl 2xl:py-5 2xl:text-2xl min-[2560px]:text-3xl">
              Ward
            </th>

            <th className="w-[17%] px-4 py-3 text-left text-base font-bold lg:text-lg xl:text-xl 2xl:py-5 2xl:text-2xl min-[2560px]:text-3xl">
              แผนก
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => {
            const isOperating = Number(item.statusId) === 2;
            const isCompleted = Number(item.statusId) === 3;
            const isCancelled = Number(item.statusId) === 9;

            return (
              <tr
                key={item.operationId}
                className={[
                  "group border-b border-slate-100 transition-colors duration-200 last:border-b-0",
                  isOperating
                    ? "bg-blue-50/90 hover:bg-blue-100/80"
                    : isCompleted
                      ? "bg-emerald-50/40 hover:bg-emerald-50"
                      : isCancelled
                        ? "bg-rose-50/40 hover:bg-rose-50"
                        : index % 2 === 0
                          ? "bg-white hover:bg-cyan-50/50"
                          : "bg-slate-50/70 hover:bg-cyan-50/50",
                ].join(" ")}
              >
                <td className="px-2 py-3 text-center xl:py-4 2xl:py-5 min-[2560px]:py-7">
                  <span
                    className={[
                      "inline-flex items-center justify-center rounded-2xl px-2 font-black tabular-nums shadow-sm",
                      "h-11 min-w-11 text-lg",
                      "xl:h-14 xl:min-w-14 xl:text-2xl",
                      "2xl:h-16 2xl:min-w-16 2xl:text-3xl",
                      "min-[2560px]:h-20 min-[2560px]:min-w-20 min-[2560px]:rounded-3xl min-[2560px]:text-4xl",
                      isOperating
                        ? "bg-blue-600 text-white shadow-blue-200"
                        : isCompleted
                          ? "bg-emerald-100 text-emerald-800"
                          : isCancelled
                            ? "bg-rose-100 text-rose-700"
                            : "bg-cyan-100 text-cyan-800",
                    ].join(" ")}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </td>

                <td className="px-3 py-3 text-center xl:py-4 2xl:py-5 min-[2560px]:py-7">
                  <OperationStatusBadge
                    statusId={
                      item.statusId === null ? null : Number(item.statusId)
                    }
                    statusName={item.statusName}
                  />
                </td>

                <td className="px-4 py-3 xl:py-4 2xl:py-5 min-[2560px]:py-7">
                  <div className="flex min-w-0 items-center gap-3 2xl:gap-4 min-[2560px]:gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 xl:h-11 xl:w-11 2xl:h-13 2xl:w-13 min-[2560px]:h-16 min-[2560px]:w-16 min-[2560px]:rounded-2xl">
                      <UserRound className="h-5 w-5 text-indigo-600 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7 min-[2560px]:h-9 min-[2560px]:w-9" />
                    </div>

                    <span className="truncate text-lg font-bold text-slate-800 xl:text-xl 2xl:text-2xl min-[2560px]:text-3xl">
                      {formatPatientName(item.patientName)}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 xl:py-4 2xl:py-5 min-[2560px]:py-7">
                  <div className="flex min-w-0 items-center gap-3 2xl:gap-4 min-[2560px]:gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 xl:h-11 xl:w-11 2xl:h-13 2xl:w-13 min-[2560px]:h-16 min-[2560px]:w-16 min-[2560px]:rounded-2xl">
                      <Stethoscope className="h-5 w-5 text-cyan-700 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7 min-[2560px]:h-9 min-[2560px]:w-9" />
                    </div>

                    <span className="truncate text-base font-semibold text-slate-700 xl:text-lg 2xl:text-xl min-[2560px]:text-3xl">
                      {item.requestDoctorName ?? "-"}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 xl:py-4 2xl:py-5 min-[2560px]:py-7">
                  <div className="flex min-w-0 items-center gap-3 2xl:gap-4 min-[2560px]:gap-5">
                    <Hospital className="h-5 w-5 shrink-0 text-sky-600 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7 min-[2560px]:h-9 min-[2560px]:w-9" />

                    <span className="truncate text-base font-medium text-slate-700 xl:text-lg 2xl:text-xl min-[2560px]:text-3xl">
                      {item.wardName ?? item.patientDepartment ?? "-"}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 xl:py-4 2xl:py-5 min-[2560px]:py-7">
                  <div className="flex min-w-0 items-center gap-3 2xl:gap-4 min-[2560px]:gap-5">
                    <Building2 className="h-5 w-5 shrink-0 text-indigo-600 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7 min-[2560px]:h-9 min-[2560px]:w-9" />

                    <span className="truncate text-base font-semibold text-slate-700 xl:text-lg 2xl:text-xl min-[2560px]:text-3xl">
                      {item.specialtyName ?? "-"}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function MobileCards({ items }: OperationTableProps) {
  return (
    <div className="grid gap-3 p-3 sm:gap-4 sm:p-4 lg:hidden">
      {items.map((item, index) => {
        const isOperating = Number(item.statusId) === 2;
        const isCompleted = Number(item.statusId) === 3;
        const isCancelled = Number(item.statusId) === 9;

        return (
          <article
            key={item.operationId}
            className={[
              "overflow-hidden rounded-2xl border bg-white shadow-sm sm:rounded-3xl",
              isOperating
                ? "border-blue-200 ring-2 ring-blue-100"
                : isCompleted
                  ? "border-emerald-200"
                  : isCancelled
                    ? "border-rose-200"
                    : "border-slate-200",
            ].join(" ")}
          >
            <div
              className={[
                "flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between",
                isOperating
                  ? "border-blue-100 bg-blue-50"
                  : isCompleted
                    ? "border-emerald-100 bg-emerald-50"
                    : isCancelled
                      ? "border-rose-100 bg-rose-50"
                      : "border-slate-100 bg-slate-50",
              ].join(" ")}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={[
                    "inline-flex h-12 min-w-12 shrink-0 items-center justify-center rounded-2xl px-2 text-xl font-black tabular-nums",
                    isOperating
                      ? "bg-blue-600 text-white"
                      : isCompleted
                        ? "bg-emerald-100 text-emerald-800"
                        : isCancelled
                          ? "bg-rose-100 text-rose-700"
                          : "bg-cyan-100 text-cyan-800",
                  ].join(" ")}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">
                    ชื่อ-สกุล
                  </p>

                  <p className="truncate text-lg font-black text-slate-800 sm:text-xl">
                    {formatPatientName(item.patientName)}
                  </p>
                </div>
              </div>

              <div className="self-start sm:self-auto">
                <OperationStatusBadge
                  statusId={
                    item.statusId === null ? null : Number(item.statusId)
                  }
                  statusName={item.statusName}
                />
              </div>
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-2">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100">
                  <Stethoscope className="h-5 w-5 text-cyan-700" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">
                    แพทย์ผู้สั่ง
                  </p>

                  <p className="truncate text-base font-semibold text-slate-700">
                    {item.requestDoctorName ?? "-"}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100">
                  <Hospital className="h-5 w-5 text-sky-700" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">Ward</p>

                  <p className="truncate text-base font-semibold text-slate-700">
                    {item.wardName ?? item.patientDepartment ?? "-"}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-start gap-3 sm:col-span-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                  <Building2 className="h-5 w-5 text-indigo-700" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">แผนก</p>

                  <p className="truncate text-base font-semibold text-slate-700">
                    {item.specialtyName ?? "-"}
                  </p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function OperationTable({ items }: OperationTableProps) {
  return (
    <section className="w-full overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-2xl backdrop-blur-xl sm:rounded-3xl">
      {items.length === 0 ? (
        <EmptyOperation />
      ) : (
        <>
          <DesktopTable items={items} />
          <MobileCards items={items} />
        </>
      )}
    </section>
  );
}
