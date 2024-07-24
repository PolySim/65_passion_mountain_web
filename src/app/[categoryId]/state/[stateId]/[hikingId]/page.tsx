import { getHiking } from "@/utils/hiking/hikingAction";
import HeaderHiking from "@/components/hikes/hearderHinkig";

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
      </div>
    </main>
  );
}
