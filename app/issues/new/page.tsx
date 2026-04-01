"use client";

import { ChangeEvent, FormEvent, startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextArea, TextField } from "@radix-ui/themes";

export default function NewIssuePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setError(body?.errors ? "Please fill in both fields correctly." : "Could not create the issue.");
        return;
      }

      startTransition(() => {
        router.push("/issues");
        router.refresh();
      });
    } catch {
      setError("Something went wrong while creating the issue.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold">Create New Issue</h1>
          <p className="text-sm text-muted-foreground">
            Add a title and description, then submit it to your issue tracker.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField.Root
            size="3"
            placeholder="Title"
            value={title}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
          />

          <TextArea
            placeholder="Description"
            size="3"
            value={description}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(event.target.value)
            }
          />

          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : null}

          <div className="flex justify-end">
            <Button type="submit" size="3" loading={isSubmitting}>
              Submit New Issue
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
