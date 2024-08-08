import { getCategories } from "@/utils/categories/categoriesAction";
import Grid from "@/components/ui/Grid";
import { AdminCategoryId } from "@/routes";
import Card from "@/components/ui/Card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const categories = await getCategories();

  return (
    <Grid>
      {categories.map((category) => (
        <AdminCategoryId.Link
          categoryId={category.id.toString()}
          key={category.id}
          legacyBehavior
        >
          <Card>
            <Image
              src={`${process.env.API_URL}/categories/getImage/${category.id}`}
              alt={category.name}
              width={240}
              height={300}
              className="w-full h-[240px] object-cover"
            />
            <div className="flex flex-col justify-center items-center gap-8 py-8 px-4">
              <h3 className="text-green-dark font-bebas text-xl tracking-[3px] font-bold">
                {category.name}
              </h3>
              <Button variant="secondary">Sélectionner la catégorie</Button>
            </div>
          </Card>
        </AdminCategoryId.Link>
      ))}
    </Grid>
  );
}
