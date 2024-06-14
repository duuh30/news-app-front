
import { CategoryProps } from "@/types/categories/types"
import CategoryForm from "@/components/ui/category-form"
import NewsForm from "@/components/ui/news-form";

export default async function CreateNews() {
  const categoriesRequest = await fetch(`${process.env.NEXT_PUBLIC_API_URL}categories`, {
    cache: 'no-store'
  })
  const response = await categoriesRequest.json();
  const categories: CategoryProps[] = response.data;

  return (
    <div className="w-full max-w-md mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">News Management</h1>
      <div className="space-y-6">
        <div>
          <CategoryForm/>
        </div>
        <div>
          <NewsForm
            categories={categories}
          />
        </div>
      </div>
    </div>
  )
}