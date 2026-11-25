export default function ShopLoading() {
  return (
    <div className="container-editorial animate-pulse py-8 md:py-12">
      <div className="h-3 w-24 bg-sand" />
      <div className="mt-7 grid gap-6 md:grid-cols-12">
        <div className="space-y-4 md:col-span-8">
          <div className="h-3 w-28 bg-sand" />
          <div className="h-14 w-3/4 bg-sand md:h-20" />
          <div className="h-14 w-1/2 bg-sand md:h-20" />
        </div>
        <div className="space-y-3 md:col-span-4 md:pb-2">
          <div className="h-3 w-full bg-sand" />
          <div className="h-3 w-5/6 bg-sand" />
          <div className="h-3 w-4/6 bg-sand" />
        </div>
      </div>

      <div className="mt-10 border-y border-line py-5">
        <div className="h-8 w-2/3 bg-sand" />
        <div className="mt-4 flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-8 w-20 bg-sand" />
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index}>
            <div className="aspect-[4/5] w-full bg-sand" />
            <div className="mt-4 h-3 w-4/5 bg-sand" />
            <div className="mt-2 h-3 w-1/2 bg-sand" />
          </div>
        ))}
      </div>
    </div>
  );
}
