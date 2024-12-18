"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "#/components/ui/button";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">
            Something went wrong!
          </h2>
          <p className="text-gray-600">
            We apologize for the inconvenience. Please try again or contact
            support if the problem persists.
          </p>
        </div>

        <Button
          className="gap-2"
          onClick={() => {
            window.location.reload();
          }}
          size="lg"
          variant="destructive"
        >
          <RefreshCw className="h-5 w-5" />
          Try again
        </Button>
      </div>
    </div>
  );
}
