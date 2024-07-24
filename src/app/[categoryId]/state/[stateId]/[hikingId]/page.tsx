import { getHiking } from "@/utils/hiking/hikingAction";
import HeaderHiking from "@/components/hikes/hearderHinkig";
import Image from "next/image";

export default async function HikingPage({
  params,
}: {
  params: { categoryId: string; hikingId: string };
}) {
  const hiking = await getHiking({ hikingId: params.hikingId });
  return (
    <main className="flex-1 bg-yellow-light py-16 px-8">
      <div className="w-full max-w-7xl rounded-2xl overflow-hidden mx-auto shadow-md bg-white">
        <HeaderHiking hiking={hiking} />
        <div className="flex flex-col lg:flex-row w-full">
          <div className="flex-1 "></div>
          <div className="flex flex-col gap-4 lg:border-l lg:border-gray-300 w-full lg:w-4/12 p-4">
            {(hiking.images || []).map((image) => (
              <Image
                key={image}
                src={`${process.env.API_URL}/hiking/getImage/${image}`}
                alt={`image ${hiking.title} ${image}`}
                width={500}
                height={281}
                className="aspect-video w-full object-cover rounded-lg cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
