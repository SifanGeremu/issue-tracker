import { NextRequest, NextResponse } from "next/server";
import { Status } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/prisma/client";

const updateIssueSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(16_000).optional(),
  status: z.nativeEnum(Status).optional(),
});

function parseIssueId(idParam: string) {
  const id = Number.parseInt(idParam, 10);
  return Number.isNaN(id) ? null : id;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = parseIssueId(idParam);

  if (!id) {
    return NextResponse.json({ message: "Invalid issue id" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) {
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  }

  return NextResponse.json(issue);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = parseIssueId(idParam);

  if (!id) {
    return NextResponse.json({ message: "Invalid issue id" }, { status: 400 });
  }

  const body = await request.json();
  const validation = updateIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: validation.error.flatten() },
      { status: 400 }
    );
  }

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) {
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  }

  const updated = await prisma.issue.update({
    where: { id },
    data: validation.data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = parseIssueId(idParam);

  if (!id) {
    return NextResponse.json({ message: "Invalid issue id" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) {
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.delete({ where: { id } });
  return NextResponse.json({ message: "Issue deleted" });
}
