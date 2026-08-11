interface OperationStatusBadgeProps {
  statusId: number | null;
  statusName: string | null;
}

type StatusConfig = {
  label: string;
  className: string;
  dotClassName: string;
};

function getStatusStyle(
  statusId: number | null,
  statusName: string | null,
): StatusConfig {
  const label = statusName?.trim() || "ไม่ระบุสถานะ";

  switch (statusId) {
    case 1:
      return {
        label,
        className: "border-amber-300 bg-amber-100 text-amber-800",
        dotClassName: "bg-amber-500",
      };

    case 2:
      return {
        label,
        className: "border-blue-300 bg-blue-100 text-blue-800",
        dotClassName: "bg-blue-500 animate-pulse",
      };

    case 3:
      return {
        label,
        className: "border-emerald-300 bg-emerald-100 text-emerald-800",
        dotClassName: "bg-emerald-500",
      };

    case 9:
      return {
        label,
        className: "border-rose-300 bg-rose-100 text-rose-800",
        dotClassName: "bg-rose-500",
      };

    default:
      return {
        label,
        className: "border-slate-300 bg-slate-100 text-slate-700",
        dotClassName: "bg-slate-500",
      };
  }
}

export default function OperationStatusBadge({
  statusId,
  statusName,
}: OperationStatusBadgeProps) {
  const config = getStatusStyle(statusId, statusName);

  return (
    <span
      className={[
        "inline-flex min-w-44 items-center justify-center gap-3",
        "rounded-full border px-4 py-2",
        "text-lg font-bold shadow-sm",
        config.className,
      ].join(" ")}
    >
      <span
        className={["h-3 w-3 shrink-0 rounded-full", config.dotClassName].join(
          " ",
        )}
      />

      <span className="truncate">{config.label}</span>
    </span>
  );
}
