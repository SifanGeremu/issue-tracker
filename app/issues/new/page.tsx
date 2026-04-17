"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Callout, Heading, Text, TextArea, TextField } from "@radix-ui/themes";

export default function NewIssuePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: description.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data?.message === "string" ? data.message : "Could not create issue.");
        return;
      }
      router.push("/issues");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <Heading size="8" as="h1">
          New issue
        </Heading>
        <Text color="gray" size="3" mt="1">
          Add a title and description. You can refine status from the list later.
        </Text>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {error ? (
          <Callout.Root color="red" role="alert">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        ) : null}

        <label className="block space-y-2">
          <Text size="2" weight="medium" as="span">
            Title
          </Text>
          <TextField.Root
            placeholder="Short summary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={255}
            disabled={loading}
          />
        </label>

        <label className="block space-y-2">
          <Text size="2" weight="medium" as="span">
            Description
          </Text>
          <TextArea
            placeholder="Steps, expected vs actual, links…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={6}
            disabled={loading}
          />
        </label>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating…" : "Create issue"}
          </Button>
          <Button type="button" variant="soft" asChild disabled={loading}>
            <Link href="/issues">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
