import { NextResponse } from "next/server";

const startTime = Date.now();

export async function GET() {
  const uptime = Math.floor((Date.now() - startTime) / 1000); // seconds

  return NextResponse.json({
    status: "ok",
    uptime,
    version: "0.1.0",
    timestamp: new Date().toISOString(),
  });
}
