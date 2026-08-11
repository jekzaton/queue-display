import mysql from "mysql2/promise";

const requiredEnv = [
  "HIS_DB_HOST",
  "HIS_DB_USER",
  "HIS_DB_PASSWORD",
  "HIS_DB_NAME",
] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`ไม่พบ Environment: ${key}`);
  }
}

const db = mysql.createPool({
  host: process.env.HIS_DB_HOST,
  port: Number(process.env.HIS_DB_PORT ?? 3306),
  user: process.env.HIS_DB_USER,
  password: process.env.HIS_DB_PASSWORD,
  database: process.env.HIS_DB_NAME,

  waitForConnections: true,

  // จำกัดภาระต่อ HIS
  connectionLimit: 2,
  maxIdle: 1,
  idleTimeout: 30_000,
  queueLimit: 10,

  enableKeepAlive: true,
  keepAliveInitialDelay: 0,

  // HOSxP รุ่นเก่าบางแห่งใช้ TIS-620
  charset: "tis620",
  dateStrings: true,
});

export default db;
