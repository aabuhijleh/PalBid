import { getListings } from "#/server/queries";
import { ListingUploadButton } from "#/components/upload-button";
import { ListingCard, ListingsGrid } from "#/components/listing";

export default async function Page() {
  const listings = await getListings();

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Listings</h1>
          <ListingUploadButton />
        </div>

        {listings.length > 0 ? (
          <ListingsGrid>
            {listings.map((listing) => (
              <ListingCard image={listing.image} key={listing.id} />
            ))}
          </ListingsGrid>
        ) : (
          <p className="mt-8 text-center text-gray-500">No listings found</p>
        )}
      </div>
    </div>
  );
}
