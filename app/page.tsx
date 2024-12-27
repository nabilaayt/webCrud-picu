import Card from "@/components/card";
import Link from "next/link";
import { getImages } from "@/lib/data";

export default async function Home() {
  const images = await getImages();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 screen-lg py-14">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl sm:text-4xl font-bold">Latest Images</h1>
        <Link href="/create" className="text-center py-2 px-5 sm:py-3 sm:px-6 bg-blue-500 hover:bg-blue-400 text-white text-sm rounded-xl">Upload new Image</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {images.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
