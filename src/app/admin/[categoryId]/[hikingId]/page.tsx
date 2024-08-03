import AdminHeader from "@/components/admin/header/AdminHeader";
import { getHiking } from "@/utils/hiking/hikingAction";

export default async function AdminHikePage({
  params,
}: {
  params: { categoryId: string; hikingId: string };
}) {
  const hiking = await getHiking({ hikingId: params.hikingId });
  return (
    <div className="w-full max-w-7xl rounded-2xl overflow-hidden mx-auto shadow-md bg-white">
      <AdminHeader hiking={hiking} params={params} />
    </div>
  );
}
