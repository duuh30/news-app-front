'use client';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "./use-toast";

export default function CategoryForm() {
    const router = useRouter();

    const schema = z.object({
        name: z.string().min(3, {
            message: 'Invalid category name'
        }).trim()
    });
    type ValidationSchema = z.infer<typeof schema>;
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidationSchema>({
        resolver: zodResolver(schema)
    });

    const handleCategorySubmit = async (data: ValidationSchema) => {
        await fetch(`/api/create-category`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
            })
        });

        toast({
            title: "Success",
            description: "Category was created!",
        })
        reset();
        router.refresh();
    };

    return (
        <form method="POST" onSubmit={handleSubmit(handleCategorySubmit)} >
            <h2 className="text-xl font-semibold mb-2">Category</h2>
            <div className="flex items-center space-x-2">
                <Input {...register('name')} type="text" placeholder="Enter category name" className="flex-1" />
                <Button type="submit">Submit</Button>
            </div>
            {errors.name && <span className="text-red-500">{ errors.name.message }</span>}
        </form>
    );
};