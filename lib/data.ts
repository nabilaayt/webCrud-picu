import { prisma } from "@/lib/prisma";

export const getImages = async () => {
    try {
        const result = await prisma.upload.findMany({
            orderBy: {createdAt: "desc"},
        });
        return result;
    } catch (_error) {
        throw new Error("Failed to fetch data");
    }
};

export const getImageById = async (id: string) => {
    try {
        const result = await prisma.upload.findUnique({
            where:{id}
        });
        return result;
    } catch (_error) {
        throw new Error("Failed to fetch data");
    }
};