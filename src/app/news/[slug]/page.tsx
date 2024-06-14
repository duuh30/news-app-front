import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NewsProps } from "@/types/news/types";

interface NewsBySlugProps {
    params: {
        slug: string,
    }
}

export default async function NewsBySlug({ params }: NewsBySlugProps) {

    const newsRequest = await fetch(`${process.env.NEXT_PUBLIC_API_URL}news/${params.slug}`, {
        cache: 'no-store'
      })
      const response = await newsRequest.json();
      const aNew: NewsProps = response.data;

    return (
        <div className="flex justify-center items-center h-screen">
          <Card className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{ aNew.title }</h2>
              <p className="text-gray-700 dark:text-gray-400 text-base mb-4">
                { aNew.description }
              </p>
              {aNew.categories.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-4">
                    <Badge>{ item.name }</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )
}
