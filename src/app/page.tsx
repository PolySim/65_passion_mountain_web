import CarouselContainer from "@/components/home/CarouselContainer";
import Image from "next/image";
import { getHikes } from "@/utils/hikes/hikesAction";
import SearchBar from "@/components/home/SearchBar";

export default async function Home() {
  const imageIds = [1, 2, 3, 4];
  const hikes = await getHikes();

  return (
    <main className="flex-1 overflow-hidden relative">
      <CarouselContainer>
        {imageIds.map((id) => (
          <Image
            src={`/Home/${id}.jpg`}
            alt={`Home screen ${id}`}
            key={id}
            className="h-full w-screen min-w-screen object-cover"
            width={1080}
            height={720}
          />
        ))}
      </CarouselContainer>
      <div className="flex flex-col justify-center items-center gap-4 absolute top-0 left-0 size-full z-10">
        <div className="absolute top-0 left-0 size-full bg-black/50" />
        <h1 className="text-yellow-light z-10 font-rubik font-semibold text-3xl md:text-5xl text-center">
          Trouve ton bonheur
        </h1>
        <SearchBar hikes={hikes} />
      </div>
    </main>
  );
}
