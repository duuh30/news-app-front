'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { NewFormProps } from "@/types/news/types"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "./use-toast"
import { MultiSelect } from "./multi-select"
import { useState } from "react"

export default function NewsForm({ categories }: NewFormProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const router = useRouter();
    const schema = z.object({
        name: z.string().min(3, {
            message: 'Invalid name',
        }).trim(),
        description: z.string().min(10, {
            message: 'Invalid description',
        }).trim(),
    });
    type ValidationSchema = z.infer<typeof schema>;
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidationSchema>({
        resolver: zodResolver(schema)
    });

    const handleNewsSubmit = async (data: ValidationSchema) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}news`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                title: data.name,
                description: data.description,
                categories: selectedCategories,
            })
        });

        toast({
            title: "Success",
            description: "News was created!",
        })
        reset();
        setSelectedCategories([]);
        router.refresh();
    };

    const categoriesToSelect = categories?.map((item) => ({ 
        value: item.id.toString(),
        label: item.name,
     }));

    return (
        <>
          <form method="POST" onSubmit={handleSubmit(handleNewsSubmit)}>
            <h2 className="text-xl font-semibold mb-2">News</h2>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="news-name">News Name</Label>
                    <Input {...register('name')} id="news-name" type="text" placeholder="Enter news name" />
                    {errors.name && <span className="text-red-500">{ errors.name.message }</span>}
                </div>
                <div>
                    <Label htmlFor="news-description">Description</Label>
                    <Textarea {...register('description')} id="news-description" placeholder="Enter news description" rows={3} />
                    {errors.description && <span className="text-red-500">{ errors.description.message }</span>}
                </div>
                <div>
                <Label htmlFor="news-category">Category</Label>
                <MultiSelect
                    onValueChange={setSelectedCategories}
                    defaultValue={selectedCategories}
                    options={categoriesToSelect}
                    placeholder="Select category"
                />
                </div>
                <Button type="submit">Save News</Button>
            </div>
          </form>  
        </>
    );
};