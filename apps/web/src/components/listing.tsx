import Image from "next/image";

export function ListingCard({ image }: { image: string }) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100">
      <Image
        alt="Listing image"
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        fill
        src={image}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

export function ListingsGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

export function ListingSkeleton() {
  return <div className="aspect-square animate-pulse rounded-lg bg-gray-200" />;
}
