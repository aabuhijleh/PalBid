"use client";

import { useRouter } from "next/navigation";
import { UploadButton } from "#/components/uploadthing";
import { authClient } from "#/lib/client-api-utils";

export function ListingUploadButton() {
  const router = useRouter();

  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={async (responses) => {
        const [res] = responses;
        await authClient.listings.$post({
          json: {
            image: res.url,
          },
        });
        router.refresh();
      }}
      onUploadError={(error) => {
        console.error(`ERROR! ${error.message}`);
      }}
    />
  );
}
