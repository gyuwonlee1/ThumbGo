export default function Loading() {
  return (
    <div className="mx-auto min-h-dvh max-w-md bg-white px-4 py-6">
      <div className="h-8 w-32 animate-pulse rounded bg-gray-100" />
      <div className="mt-5 h-36 animate-pulse rounded-2xl bg-gray-100" />
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
        <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
        <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}
