import EditForm from "@/components/edit-form ";
import { getImageById } from "@/lib/data";
import { notFound } from "next/navigation";


const EditPage = async ({params}:{params:{id:string}}) =>{
    const data = await getImageById(params.id);
    if(!data) return notFound();

    return(
        <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-sm shadow p-6 sm:p-8 lg:p-10 w-full max-w-md sm:max-w-lg">
            <h1 className="text-2xl font-bold mb-5">Update Image</h1>
            <EditForm data={data}/>
        </div>
    </div>
    )
}

export default EditPage;