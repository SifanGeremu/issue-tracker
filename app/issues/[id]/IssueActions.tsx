"use client";

import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Callout, Select } from "@radix-ui/themes";

type Props = {
  issueId: number;
  status: Status;
};

export default function IssueActions({ issueId, status }: Props) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState<Status>(status);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateStatus(nextStatus: Status) {
    setError(null);
    setCurrentStatus(nextStatus);
    setSaving(true);

    try {
      const res = await fetch(`/api/issues/${issueId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) {
        setError("Could not update issue status.");
      } else {
        router.refresh();
      }
    } catch {
      setError("Network error while updating status.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteIssue() {
    const confirmed = window.confirm(
      "Delete this issue? This action cannot be undone."
    );
    if (!confirmed) return;

    setError(null);
    setDeleting(true);

    try {
      const res = await fetch(`/api/issues/${issueId}`, { method: "DELETE" });
      if (!res.ok) {
        setError("Could not delete issue.");
        return;
      }

      router.push("/issues");
      router.refresh();
    } catch {
      setError("Network error while deleting issue.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-3">
      {error ? (
        <Callout.Root color="red" role="alert">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <Select.Root
          value={currentStatus}
          onValueChange={(value) => updateStatus(value as Status)}
          disabled={saving || deleting}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="OPEN">OPEN</Select.Item>
            <Select.Item value="IN_PROGRESS">IN PROGRESS</Select.Item>
            <Select.Item value="CLOSED">CLOSED</Select.Item>
          </Select.Content>
        </Select.Root>

        <Button
          color="red"
          variant="soft"
          onClick={deleteIssue}
          disabled={saving || deleting}
        >
          {deleting ? "Deleting..." : "Delete issue"}
        </Button>
      </div>
    </div>
  );
}
