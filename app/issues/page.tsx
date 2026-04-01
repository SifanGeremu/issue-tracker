import Link from "next/link";
import { prisma } from "@/prisma/client";

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Issues</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage the issues in your project.
          </p>
        </div>

        <Link
          href="/issues/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          New Issue
        </Link>
      </div>

      {issues.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
          <h2 className="text-lg font-medium">No issues yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your first issue to start tracking work.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/70">
              <tr className="text-left text-sm text-muted-foreground">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {issues.map((issue) => (
                <tr key={issue.id} className="text-sm">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {issue.title}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {issue.status.replace("_", " ")}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {issue.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
