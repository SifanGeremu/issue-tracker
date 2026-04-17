import Link from "next/link";
import { Badge, Button, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import type { Issue, Status } from "@prisma/client";
import { prisma } from "@/prisma/client";

export const dynamic = "force-dynamic";

function statusBadgeVariant(status: Status): "mint" | "amber" | "gray" {
  switch (status) {
    case "OPEN":
      return "mint";
    case "IN_PROGRESS":
      return "amber";
    case "CLOSED":
      return "gray";
    default:
      return "gray";
  }
}

export default async function IssuesPage() {
  const issues: Issue[] = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Flex align="center" justify="between" gap="4" wrap="wrap">
        <div>
          <Heading size="8" as="h1">
            Issues
          </Heading>
          <Text color="gray" size="3" mt="1">
            {issues.length === 0
              ? "No issues yet — create the first one."
              : `${issues.length} issue${issues.length === 1 ? "" : "s"}`}
          </Text>
        </div>
        <Button asChild>
          <Link href="/issues/new">New issue</Link>
        </Button>
      </Flex>

      {issues.length === 0 ? (
        <Card size="2">
          <Text color="gray">Get started by creating an issue.</Text>
        </Card>
      ) : (
        <Table.Root variant="surface" size="2">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Updated</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Text weight="medium">{issue.title}</Text>
                  <Text as="p" size="2" color="gray" className="line-clamp-2 mt-1">
                    {issue.description}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Badge color={statusBadgeVariant(issue.status)} size="1">
                    {issue.status.replace("_", " ")}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Text size="2" color="gray">
                    {issue.updatedAt.toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })}
                  </Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
}
