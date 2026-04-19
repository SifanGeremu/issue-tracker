import { notFound } from "next/navigation";
import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { prisma } from "@/prisma/client";
import IssueActions from "./IssueActions";

type Props = {
  params: Promise<{ id: string }>;
};

function statusColor(status: Status): "mint" | "amber" | "gray" {
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

export default async function IssueDetailsPage({ params }: Props) {
  const { id: idParam } = await params;
  const id = Number.parseInt(idParam, 10);
  if (Number.isNaN(id)) notFound();

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Heading size="8" as="h1">
          {issue.title}
        </Heading>
        <Flex align="center" gap="3" mt="2" wrap="wrap">
          <Badge color={statusColor(issue.status)}>{issue.status.replace("_", " ")}</Badge>
          <Text color="gray" size="2">
            Created {issue.createdAt.toLocaleDateString()}
          </Text>
          <Text color="gray" size="2">
            Updated {issue.updatedAt.toLocaleDateString()}
          </Text>
        </Flex>
      </div>

      <Card size="3">
        <Text as="p" className="whitespace-pre-wrap leading-7">
          {issue.description}
        </Text>
      </Card>

      <IssueActions issueId={issue.id} status={issue.status} />
    </div>
  );
}
