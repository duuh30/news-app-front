import { NewsProps } from "@/types/news/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function Home({ searchParams }: any) {
  const queryString = new URLSearchParams(searchParams).toString();
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}news?${queryString}`;
  const newsRequest = await fetch(apiUrl, {
    cache: 'no-store'
  })
  const response = await newsRequest.json();
  const news: NewsProps[] = response.data;

  return (
    <main className="grid grid-cols-3 gap-4 p-4">
      {news?.map((item, index) => (
        <Card key={index} className="bg-white p-4">
        <CardHeader>
          <CardTitle>{ item.title }</CardTitle>
          <div className="flex items-center gap-2">
            {item.categories.map((item, index) => (
              <Badge key={index}>{item.name}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{ item.description }</p>
        </CardContent>
        <CardFooter>
          <Link href={`news/${item.slug}`}> 
              <Button variant="outline">Acessar</Button>
          </Link>
        </CardFooter>
      </Card>
      ))}
    </main>
  );
}