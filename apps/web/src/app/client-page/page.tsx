"use client";

import useSWR from "swr";
import { UploadButton } from "#/components/uploadthing";
import { getListings } from "#/lib/queries";
import { authClient } from "#/lib/client-api-utils";
import {
  ListingCard,
  ListingsGrid,
  ListingSkeleton,
} from "#/components/listing";

export default function ClientPage() {
  const {
    data: listings,
    isLoading,
    mutate,
  } = useSWR("api-listings", getListings());

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Listings</h1>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={async (responses) => {
            const [res] = responses;
            const listingRes = await authClient.listings.$post({
              json: {
                image: res.url,
              },
            });
            const listing = await listingRes.json();
            await mutate([...(listings || []), listing]);
          }}
          onUploadError={(uploadError) => {
            console.error(`ERROR! ${uploadError.message}`);
          }}
        />
      </div>

      {(() => {
        if (isLoading) {
          return (
            <ListingsGrid>
              {Array.from({ length: 6 }).map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key -- skeletons have no ids
                <ListingSkeleton key={i} />
              ))}
            </ListingsGrid>
          );
        }

        if (listings && listings.length > 0) {
          return (
            <ListingsGrid>
              {listings.map((listing) => (
                <ListingCard image={listing.image} key={listing.id} />
              ))}
            </ListingsGrid>
          );
        }

        return (
          <p className="mt-8 text-center text-gray-500">No listings found</p>
        );
      })()}
    </div>
  );
}
