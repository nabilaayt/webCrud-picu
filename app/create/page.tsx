import CreateForm from "@/components/create-form";

const CreatePage = () => {
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-5 sm:px-6 lg:px-8">
            <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold mb-10">Share Your Best Shot with <span className="text-blue-600">PICU!</span></h1>
            <div className="bg-white rounded-sm shadow p-8 w-full max-w-md md:max-w-lg lg:max-w-xl">
                <h1 className="text-2xl font-semibold mb-5">Upload Your Image</h1>
                <CreateForm/>
            </div>
        </div>
    );
};

export default CreatePage;