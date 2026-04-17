import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET() {
  const [open, inProgress, closed, total] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
    prisma.issue.count(),
  ]);

  return NextResponse.json({
    open,
    inProgress,
    closed,
    total,
  });
}
