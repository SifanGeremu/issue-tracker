import Link from "next/link";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [open, inProgress, closed, total] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
    prisma.issue.count(),
  ]);
  const recentIssues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "Open", value: open },
    { label: "In progress", value: inProgress },
    { label: "Closed", value: closed },
    { label: "Total", value: total },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Heading size="8" as="h1">
          Issue tracker
        </Heading>
        <Text color="gray" size="3" mt="2">
          Create, triage, and close issues in one place.
        </Text>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((s) => (
          <Card key={s.label} size="2">
            <Flex direction="column" gap="1">
              <Text size="2" color="gray" weight="medium">
                {s.label}
              </Text>
              <Text size="6" weight="bold">
                {s.value}
              </Text>
            </Flex>
          </Card>
        ))}
      </div>

      <Flex gap="3" wrap="wrap">
        <Link
          href="/issues"
          className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          View all issues
        </Link>
        <Link
          href="/issues/new"
          className="inline-flex rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          New issue
        </Link>
      </Flex>

      <Card size="2">
        <Text size="3" weight="medium">
          Recent issues
        </Text>
        <div className="mt-3 space-y-2">
          {recentIssues.length === 0 ? (
            <Text size="2" color="gray">
              No recent issues yet.
            </Text>
          ) : (
            recentIssues.map((issue) => (
              <Link
                key={issue.id}
                href={`/issues/${issue.id}`}
                className="block rounded-md px-2 py-1 text-sm hover:bg-muted"
              >
                {issue.title}
              </Link>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
