import { NextResponse } from "next/server";

import hisPool from "@/lib/his-db";
import { getOperationCache, setOperationCache } from "@/lib/operation-cache";
import type { OperationQueueItem, OperationQueueRow } from "@/types/operation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPERATION_QUERY = `
  SELECT o.operation_id AS operationId,o.status_id AS statusId,
  o.request_operation_date AS requestOperationDate,
  o.request_operation_time AS requestOperationTime,
  o.hn,o.patient_department AS patientDepartment,
  CONCAT(
    COALESCE(pt.pname, ''),
    COALESCE(pt.fname, ''),
    ' ',
    COALESCE(pt.lname, '')
  ) AS patientName,
  s.status_name AS statusName,
  d.name AS requestDoctorName,
  w.name AS wardName,
  sp.name AS specialtyName
FROM operation_list o
LEFT JOIN patient pt ON pt.hn = o.hn
LEFT JOIN operation_status s ON s.status_id = o.status_id
LEFT JOIN doctor d ON d.code = o.request_doctor
LEFT JOIN ipt t ON t.an = o.an
LEFT JOIN ward w ON w.ward = t.ward
LEFT JOIN spclty sp ON sp.spclty = o.spclty
WHERE o.request_operation_date = CURRENT_DATE()
ORDER BY o.request_operation_time,o.operation_id
LIMIT 100
`;

export async function GET() {
  try {
    const cachedData = getOperationCache();

    if (cachedData) {
      return NextResponse.json(
        {
          success: true,
          source: "cache",
          total: cachedData.length,
          data: cachedData,
          serverTime: new Date().toISOString(),
        },
        {
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const [rows] = await hisPool.query<OperationQueueRow[]>(OPERATION_QUERY);

    const data: OperationQueueItem[] = rows.map((row) => ({
      operationId: Number(row.operationId),
      statusId: row.statusId === null ? null : Number(row.statusId),
      requestOperationDate: row.requestOperationDate,
      requestOperationTime: row.requestOperationTime,
      hn: row.hn,
      patientDepartment: row.patientDepartment,
      patientName: row.patientName.trim(),
      statusName: row.statusName,
      requestDoctorName: row.requestDoctorName,
      wardName: row.wardName,
      specialtyName: row.specialtyName,
    }));

    setOperationCache(data, 5);

    return NextResponse.json(
      {
        success: true,
        source: "his",
        total: data.length,
        data,
        serverTime: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("GET /api/operations error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "ไม่สามารถโหลดข้อมูลรายการผ่าตัดได้",
      },
      { status: 500 },
    );
  }
}
