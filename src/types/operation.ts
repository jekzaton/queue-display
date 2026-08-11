import type { RowDataPacket } from "mysql2";

export interface OperationQueueRow extends RowDataPacket {
  operationId: number;
  statusId: number | null;
  requestOperationDate: string;
  requestOperationTime: string;
  hn: string;
  patientDepartment: string | null;
  patientName: string;
  statusName: string | null;
  requestDoctorName: string | null;
  wardName: string | null;
  specialtyName: string | null;
}

export interface OperationQueueItem {
  operationId?: number;
  statusId?: number | null;
  requestOperationDate: string;
  requestOperationTime: string;
  hn?: string;
  patientDepartment?: string | null;
  patientName: string;
  statusName: string | null;
  requestDoctorName: string | null;
  wardName: string | null;
  specialtyName: string | null;
}
