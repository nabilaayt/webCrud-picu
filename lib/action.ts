"use server";
import {z} from "zod";
import {put, del} from "@vercel/blob";
import {prisma} from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getImageById } from "@/lib/data";


const UploadSchema = z.object({
    title: z.string().min(1),
    Image: z
        .instanceof(File)
        .refine((file) => file.size > 0, {message: "Image is required"})
        .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
            message: "Only images are allowed",
        })
        .refine((file) => file.size < 4000000, {
            message: "Image must less than 4MB",
        }),
});

const EditSchema = z.object({
    title: z.string().min(1),
    Image: z
        .instanceof(File)
        .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
            message: "Only images are allowed",
        })
        .refine((file) => file.size < 4000000, {
            message: "Image must less than 4MB",
        })
        .optional(),
});

export const UploadImage = async (prevState: unknown, formData: FormData) => {
    const validatedFields = UploadSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if(!validatedFields.success){
        return{
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { title, Image } = validatedFields.data;
    const { url } = await put(Image.name, Image, {
      access: "public",
      multipart: true,
    });

    try {
        await prisma.upload.create({
            data:{
                title,
                image: url,
            },
        });
    } catch (_error) {
        return {message: "Failed to create data"};
    }

    revalidatePath("/");
    redirect("/");
};

// Update image
export const updateImage = async (
    id:string, 
    prevState: unknown, 
    formData: FormData
) => {
    const validatedFields = EditSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if(!validatedFields.success){
        return{
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const data = await getImageById(id);
    if(!data) return {message: "No data found"};

    const { title, Image } = validatedFields.data;
    let imagePath;
    if(!Image || Image.size <= 0){
        imagePath = data.image;
    } else{
        await del(data.image);
        const { url } = await put(Image.name, Image, {
            access: "public",
            multipart: true,
        });
        imagePath = url;
    }

    try {
        await prisma.upload.update({
            data:{
                title,
                image: imagePath,
            },
            where:{id}
        });
    } catch (_error) {
        return {message: "Failed to update data"};
    }

    revalidatePath("/");
    redirect("/");
};


// Delete image
export const deleteImage = async (id: string) =>{
    const data = await getImageById(id);
    if(!data) return {message: "No data found"};

    await del(data.image);
    try {
        await prisma.upload.delete({
            where: {id},
        })
    } catch (_error) {
        return {message: "Failed to create data"};
    }

    revalidatePath("/");
}