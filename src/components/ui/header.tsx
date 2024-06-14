'use client';

import Link from "next/link";
import { Button } from "./button";
import { Input } from "./input";
import { RssIcon } from "lucide-react";
import { useState } from "react";
import { OnKeyDownEvent } from "@/types/news/types";
import { useRouter } from "next/navigation";

export function Header() {
   const router = useRouter();
   const [searchTerm, setSearchTerm] = useState("")
   const handleSearch = (e: OnKeyDownEvent) => {
      if (e.key === "Enter") {
         router.push(`/?filter[title]=${searchTerm}`)
      }
    }

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded bg-black flex items-center justify-center">
          <RssIcon className="text-white" size={18} />
        </div>
        <h1 className="font-bold text-xl">NewsApp</h1>
      </div>
      <div className="ml-4 flex space-x-4">
        <Link href="/create-news">
          <Button variant="outline">CADASTRAR NOTÍCIAS</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">EXIBIR NOTÍCIAS</Button>
        </Link>
      </div>
      <Input 
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
        className="w-full pr-10"
      />
    </header>
  );
}