"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export function Submit({ children }: { children?: React.ReactNode }) {
  const data = useFormStatus();

  return (
    <Button disabled={data.pending} type="submit">
      {data.pending ? <Loader2 className="animate-spin" /> : null}
      {children ?? "Submit"}
    </Button>
  );
}
